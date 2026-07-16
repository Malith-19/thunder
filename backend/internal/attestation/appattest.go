/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package attestation

import (
	"context"
	"crypto/ecdsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/binary"
	"fmt"

	"github.com/fxamacker/cbor/v2"

	"github.com/thunder-id/thunderid/internal/system/log"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"
)

// attestationObject is the CBOR-encoded structure produced by DCAppAttestService.attestKey.
type attestationObject struct {
	Fmt     string `cbor:"fmt"`
	AttStmt struct {
		X5C [][]byte `cbor:"x5c"`
		// Receipt is an App Store receipt unrelated to binary identity; intentionally unused.
		Receipt []byte `cbor:"receipt"`
	} `cbor:"attStmt"`
	AuthData []byte `cbor:"authData"`
}

// appAttestVerifier verifies Apple App Attest attestation objects for iOS clients.
//
// Verification is performed entirely on the server, with no outbound call: it establishes that a
// genuine Secure Enclave on a real Apple device produced the attested key for the registered app, by
// validating the attestation certificate chain against Apple's App Attest root and matching the
// attested app identifier and key. It deliberately does not verify the App Attest nonce extension
// (OID 1.2.840.113635.100.8.2), which binds the attestation to a server-issued challenge: that
// requires a challenge mechanism this verifier does not yet have, and is a known, accepted limitation
// (mirroring the request-freshness gap in the Play Integrity verifier). Without it, a captured
// attestation object could in principle be replayed; a future challenge mechanism should close this
// gap. Assertion (the per-request, counter-signed phase that follows attestation) is out of scope.
//
// Because verification never leaves the process, there is no transient/operational failure mode: any
// problem with the presented token is a definitive rejection. Only a missing or incomplete
// configuration is reported as an operational error.
type appAttestVerifier struct {
	rootPool *x509.CertPool
	logger   *log.Logger
}

// newAppAttestVerifier creates a platform attestation verifier backed by Apple's App Attest
// certificate chain, trusted against Apple's public App Attestation Root CA.
func newAppAttestVerifier() providers.AttestationProvider {
	pool := x509.NewCertPool()
	if !pool.AppendCertsFromPEM([]byte(appleAppAttestRootPEM)) {
		panic("attestation: failed to parse embedded Apple App Attestation Root CA")
	}
	return newAppAttestVerifierWithRoots(pool)
}

// newAppAttestVerifierWithRoots creates a verifier trusting the given root pool instead of Apple's
// real root. This is a test seam so unit tests can verify the whole chain offline against a
// self-signed test root.
func newAppAttestVerifierWithRoots(rootPool *x509.CertPool) *appAttestVerifier {
	return &appAttestVerifier{
		rootPool: rootPool,
		logger:   log.GetLogger().With(log.String(log.LoggerKeyComponentName, "AppAttestVerifier")),
	}
}

// Verify decodes the App Attest attestation object and checks that the attested app identifier and
// key match the application's registered Team ID and Bundle ID. It returns true only when every check
// passes; a definitive rejection (malformed object, invalid chain, or identity mismatch) is reported
// as (false, nil), while a missing or incomplete configuration is reported as (false, ServiceError).
func (v *appAttestVerifier) Verify(ctx context.Context, cfg *providers.AttestationConfig, token string) (
	bool, *tidcommon.ServiceError) {
	if cfg == nil || cfg.Apple == nil {
		v.logger.Error(ctx, "Attestation requested without an Apple attestation configuration")
		return false, &tidcommon.InternalServerError
	}

	// A configured application must register both a Team ID and a Bundle ID; without them the binary
	// identity cannot be verified. Reject an incomplete configuration up front.
	apple := cfg.Apple
	if apple.TeamID == "" || apple.BundleID == "" {
		v.logger.Error(ctx, "Apple attestation configuration is incomplete")
		return false, &tidcommon.InternalServerError
	}

	if err := v.verifyAttestation(apple, token); err != nil {
		v.logger.Debug(ctx, "Attestation token rejected", log.Error(err))
		return false, nil
	}
	return true, nil
}

// verifyAttestation decodes and validates the attestation object against the registered Apple config,
// returning a non-nil error describing the first check that fails.
func (v *appAttestVerifier) verifyAttestation(apple *providers.AppleAttestationConfig, token string) error {
	raw, err := base64.StdEncoding.DecodeString(token)
	if err != nil {
		// Attestation objects may also be presented URL-safe; try that before failing.
		raw, err = base64.URLEncoding.DecodeString(token)
		if err != nil {
			return fmt.Errorf("%w: %w", errInvalidPayload, err)
		}
	}

	var obj attestationObject
	if err := cbor.Unmarshal(raw, &obj); err != nil {
		return fmt.Errorf("%w: %w", errInvalidPayload, err)
	}
	if obj.Fmt != appAttestFormat || len(obj.AttStmt.X5C) == 0 {
		return errInvalidPayload
	}

	leaf, err := v.verifyCertificateChain(obj.AttStmt.X5C)
	if err != nil {
		return err
	}

	authData, err := parseAuthData(obj.AuthData)
	if err != nil {
		return err
	}

	if err := verifyAppIdentifier(authData.rpIDHash, apple); err != nil {
		return err
	}
	if !isRecognizedAAGUID(authData.aaguid) {
		return errEnvironmentUnrecognized
	}
	if authData.signCount != 0 {
		return errSignCountNonZero
	}
	return verifyKeyIdentifier(leaf, authData.credentialID)
}

// verifyCertificateChain verifies the credCert (x5c[0]) chains to the trusted root, through any
// intermediates presented in x5c[1:]. It returns the parsed leaf certificate on success.
func (v *appAttestVerifier) verifyCertificateChain(x5c [][]byte) (*x509.Certificate, error) {
	leaf, err := x509.ParseCertificate(x5c[0])
	if err != nil {
		return nil, fmt.Errorf("%w: %w", errInvalidPayload, err)
	}

	intermediates := x509.NewCertPool()
	for _, der := range x5c[1:] {
		cert, err := x509.ParseCertificate(der)
		if err != nil {
			return nil, fmt.Errorf("%w: %w", errInvalidPayload, err)
		}
		intermediates.AddCert(cert)
	}

	// Apple's App Attest certificates are not TLS server certificates, so the default
	// ExtKeyUsageServerAuth requirement must be relaxed to ExtKeyUsageAny.
	opts := x509.VerifyOptions{
		Roots:         v.rootPool,
		Intermediates: intermediates,
		KeyUsages:     []x509.ExtKeyUsage{x509.ExtKeyUsageAny},
	}
	if _, err := leaf.Verify(opts); err != nil {
		return nil, fmt.Errorf("%w: %w", errCertificateChainInvalid, err)
	}
	return leaf, nil
}

// parsedAuthData holds the authenticator data fields relevant to attestation verification.
type parsedAuthData struct {
	rpIDHash     []byte
	signCount    uint32
	aaguid       [16]byte
	credentialID []byte
}

// parseAuthData parses the fixed-layout authenticator data fields, with explicit bounds checks so
// a short or malformed value returns an error instead of panicking.
func parseAuthData(data []byte) (*parsedAuthData, error) {
	if len(data) < authDataMinLen {
		return nil, errInvalidPayload
	}

	rpIDHash := data[0:authDataRPIDHashLen]
	flags := data[authDataRPIDHashLen]
	if flags&authDataFlagAttestedCD == 0 {
		return nil, errInvalidPayload
	}

	signCountOffset := authDataRPIDHashLen + authDataFlagsLen
	signCount := binary.BigEndian.Uint32(data[signCountOffset : signCountOffset+authDataSignCountLen])

	aaguidOffset := signCountOffset + authDataSignCountLen
	var aaguid [16]byte
	copy(aaguid[:], data[aaguidOffset:aaguidOffset+authDataAAGUIDLen])

	credIDLenOffset := aaguidOffset + authDataAAGUIDLen
	credIDLen := int(binary.BigEndian.Uint16(data[credIDLenOffset : credIDLenOffset+authDataCredIDLenLen]))

	credIDOffset := credIDLenOffset + authDataCredIDLenLen
	if len(data) < credIDOffset+credIDLen {
		return nil, errInvalidPayload
	}
	credentialID := data[credIDOffset : credIDOffset+credIDLen]

	return &parsedAuthData{
		rpIDHash:     rpIDHash,
		signCount:    signCount,
		aaguid:       aaguid,
		credentialID: credentialID,
	}, nil
}

// verifyAppIdentifier checks that the authenticator data's RP ID hash matches the SHA-256 hash of
// the registered Team ID and Bundle ID, as Apple's App Attest spec defines the App ID.
func verifyAppIdentifier(rpIDHash []byte, apple *providers.AppleAttestationConfig) error {
	expected := sha256.Sum256([]byte(apple.TeamID + "." + apple.BundleID))
	if string(rpIDHash) != string(expected[:]) {
		return errAppIdentifierMismatch
	}
	return nil
}

// isRecognizedAAGUID reports whether aaguid identifies a genuine App Attest key, in either the
// production or development environment.
func isRecognizedAAGUID(aaguid [16]byte) bool {
	return aaguid == aaguidProduction || aaguid == aaguidDevelopment
}

// verifyKeyIdentifier checks that the authenticator data's credential ID equals the SHA-256 hash of
// the credCert's public key, encoded as an ANSI X9.63 uncompressed point (0x04 || X || Y), not the
// DER SubjectPublicKeyInfo.
func verifyKeyIdentifier(leaf *x509.Certificate, credentialID []byte) error {
	pub, ok := leaf.PublicKey.(*ecdsa.PublicKey)
	if !ok {
		return errInvalidPayload
	}
	ecdhPub, err := pub.ECDH()
	if err != nil {
		return fmt.Errorf("%w: %w", errInvalidPayload, err)
	}
	expected := sha256.Sum256(ecdhPub.Bytes())
	if string(credentialID) != string(expected[:]) {
		return errKeyIdentifierMismatch
	}
	return nil
}
