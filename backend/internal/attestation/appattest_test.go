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
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/base64"
	"encoding/binary"
	"math/big"
	"testing"
	"time"

	"github.com/fxamacker/cbor/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"
)

// NOTE: these fixtures are self-consistent (built and verified using this package's own encoding
// choices, e.g. the X9.63 uncompressed-point credential-ID hash input) rather than derived from a
// real Apple-issued attestation object. Cross-check against a genuine sample/device attestation
// object before relying on this in production, per the design note on verifyKeyIdentifier.

const (
	testTeamID   = "ABCDE12345"
	testBundleID = "com.example.myapp"
)

func appleConfig() *providers.AttestationConfig {
	return &providers.AttestationConfig{
		Apple: &providers.AppleAttestationConfig{TeamID: testTeamID, BundleID: testBundleID},
	}
}

// testChain is a synthetic self-signed root + leaf certificate pair standing in for Apple's real
// App Attest root, so the whole chain-verification path can be exercised offline.
type testChain struct {
	rootPool *x509.CertPool
	leafDER  []byte
	leafCert *x509.Certificate
}

func generateTestChain(t *testing.T) *testChain {
	t.Helper()

	rootKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	require.NoError(t, err)
	rootTemplate := &x509.Certificate{
		SerialNumber:          big.NewInt(1),
		Subject:               pkix.Name{CommonName: "Test App Attest Root"},
		NotBefore:             time.Now().Add(-time.Hour),
		NotAfter:              time.Now().Add(time.Hour),
		KeyUsage:              x509.KeyUsageCertSign | x509.KeyUsageDigitalSignature,
		BasicConstraintsValid: true,
		IsCA:                  true,
	}
	rootDER, err := x509.CreateCertificate(rand.Reader, rootTemplate, rootTemplate, &rootKey.PublicKey, rootKey)
	require.NoError(t, err)
	rootCert, err := x509.ParseCertificate(rootDER)
	require.NoError(t, err)

	leafKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	require.NoError(t, err)
	leafTemplate := &x509.Certificate{
		SerialNumber: big.NewInt(2),
		Subject:      pkix.Name{CommonName: "Test credCert"},
		NotBefore:    time.Now().Add(-time.Hour),
		NotAfter:     time.Now().Add(time.Hour),
	}
	leafDER, err := x509.CreateCertificate(rand.Reader, leafTemplate, rootCert, &leafKey.PublicKey, rootKey)
	require.NoError(t, err)
	leafCert, err := x509.ParseCertificate(leafDER)
	require.NoError(t, err)

	rootPool := x509.NewCertPool()
	rootPool.AddCert(rootCert)

	return &testChain{rootPool: rootPool, leafDER: leafDER, leafCert: leafCert}
}

// credentialIDFor computes the expected credential ID for cert's public key, matching
// verifyKeyIdentifier's encoding.
func credentialIDFor(t *testing.T, cert *x509.Certificate) []byte {
	t.Helper()
	pub, ok := cert.PublicKey.(*ecdsa.PublicKey)
	require.True(t, ok)
	ecdhPub, err := pub.ECDH()
	require.NoError(t, err)
	sum := sha256.Sum256(ecdhPub.Bytes())
	return sum[:]
}

// authDataOpts customizes the synthetic authenticator data built by buildAuthData.
type authDataOpts struct {
	rpIDHash     []byte
	flags        byte
	signCount    uint32
	aaguid       [16]byte
	credentialID []byte
	truncateTo   int // if > 0, truncate the final authData to this length
}

func buildAuthData(o authDataOpts) []byte {
	buf := make([]byte, 0, authDataMinLen+len(o.credentialID))
	buf = append(buf, o.rpIDHash...)
	buf = append(buf, o.flags)
	sc := make([]byte, 4)
	binary.BigEndian.PutUint32(sc, o.signCount)
	buf = append(buf, sc...)
	buf = append(buf, o.aaguid[:]...)
	idLen := make([]byte, 2)
	binary.BigEndian.PutUint16(idLen, uint16(len(o.credentialID))) //nolint:gosec // test data, small length
	buf = append(buf, idLen...)
	buf = append(buf, o.credentialID...)
	if o.truncateTo > 0 && o.truncateTo < len(buf) {
		buf = buf[:o.truncateTo]
	}
	return buf
}

func appIDHash(teamID string) []byte {
	sum := sha256.Sum256([]byte(teamID + "." + testBundleID))
	return sum[:]
}

// buildToken CBOR-encodes and base64-encodes an attestation object for the given chain and
// authData, as presented in the Attestation-Token header.
func buildToken(t *testing.T, format string, x5c [][]byte, authData []byte) string {
	t.Helper()
	obj := attestationObject{Fmt: format}
	obj.AttStmt.X5C = x5c
	obj.AuthData = authData
	raw, err := cbor.Marshal(obj)
	require.NoError(t, err)
	return base64.StdEncoding.EncodeToString(raw)
}

// assertRejected asserts a definitive rejection: not verified, with no operational error (mapped to
// 401 by the flow layer).
func assertRejected(t *testing.T, v providers.AttestationProvider, cfg *providers.AttestationConfig, token string) {
	t.Helper()
	ok, svcErr := v.Verify(context.Background(), cfg, token)
	assert.False(t, ok)
	assert.Nil(t, svcErr)
}

// assertOperationalError asserts an operational failure: not verified, with a service error (mapped
// to 500 by the flow layer).
func assertOperationalError(t *testing.T, v providers.AttestationProvider, cfg *providers.AttestationConfig,
	token string) {
	t.Helper()
	ok, svcErr := v.Verify(context.Background(), cfg, token)
	assert.False(t, ok)
	assert.NotNil(t, svcErr)
}

func TestAppAttestVerify_Success(t *testing.T) {
	chain := generateTestChain(t)
	opts := authDataOpts{
		rpIDHash:     appIDHash(testTeamID),
		flags:        authDataFlagAttestedCD,
		signCount:    0,
		aaguid:       aaguidProduction,
		credentialID: credentialIDFor(t, chain.leafCert),
	}
	token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))

	verifier := newAppAttestVerifierWithRoots(chain.rootPool)
	ok, svcErr := verifier.Verify(context.Background(), appleConfig(), token)
	assert.True(t, ok)
	assert.Nil(t, svcErr)
}

func TestAppAttestVerify_DevelopmentAAGUIDAccepted(t *testing.T) {
	chain := generateTestChain(t)
	opts := authDataOpts{
		rpIDHash:     appIDHash(testTeamID),
		flags:        authDataFlagAttestedCD,
		signCount:    0,
		aaguid:       aaguidDevelopment,
		credentialID: credentialIDFor(t, chain.leafCert),
	}
	token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))

	verifier := newAppAttestVerifierWithRoots(chain.rootPool)
	ok, svcErr := verifier.Verify(context.Background(), appleConfig(), token)
	assert.True(t, ok)
	assert.Nil(t, svcErr)
}

// A missing or empty attestation configuration is an operational error, not a token rejection.
func TestAppAttestVerify_NotConfigured(t *testing.T) {
	chain := generateTestChain(t)
	verifier := newAppAttestVerifierWithRoots(chain.rootPool)

	assertOperationalError(t, verifier, nil, "anything")
	assertOperationalError(t, verifier, &providers.AttestationConfig{}, "anything")
}

// An incomplete configuration (missing Team ID or Bundle ID) is an operational error.
func TestAppAttestVerify_IncompleteConfig(t *testing.T) {
	chain := generateTestChain(t)
	verifier := newAppAttestVerifierWithRoots(chain.rootPool)

	cases := map[string]*providers.AppleAttestationConfig{
		"missing team id":   {BundleID: testBundleID},
		"missing bundle id": {TeamID: testTeamID},
	}
	for name, apple := range cases {
		t.Run(name, func(t *testing.T) {
			assertOperationalError(t, verifier, &providers.AttestationConfig{Apple: apple}, "anything")
		})
	}
}

// A malformed or mismatched token is a definitive rejection, since App Attest is verified offline.
func TestAppAttestVerify_InvalidPayload(t *testing.T) {
	chain := generateTestChain(t)
	verifier := newAppAttestVerifierWithRoots(chain.rootPool)

	t.Run("not base64", func(t *testing.T) {
		assertRejected(t, verifier, appleConfig(), "***not-base64***")
	})

	t.Run("not cbor", func(t *testing.T) {
		token := base64.StdEncoding.EncodeToString([]byte("not cbor"))
		assertRejected(t, verifier, appleConfig(), token)
	})

	t.Run("wrong format", func(t *testing.T) {
		opts := authDataOpts{
			rpIDHash: appIDHash(testTeamID), flags: authDataFlagAttestedCD,
			aaguid: aaguidProduction, credentialID: credentialIDFor(t, chain.leafCert),
		}
		token := buildToken(t, "packed", [][]byte{chain.leafDER}, buildAuthData(opts))
		assertRejected(t, verifier, appleConfig(), token)
	})

	t.Run("missing x5c", func(t *testing.T) {
		opts := authDataOpts{
			rpIDHash: appIDHash(testTeamID), flags: authDataFlagAttestedCD,
			aaguid: aaguidProduction, credentialID: credentialIDFor(t, chain.leafCert),
		}
		token := buildToken(t, appAttestFormat, nil, buildAuthData(opts))
		assertRejected(t, verifier, appleConfig(), token)
	})

	t.Run("attested credential data flag not set", func(t *testing.T) {
		opts := authDataOpts{
			rpIDHash: appIDHash(testTeamID), flags: 0x00,
			aaguid: aaguidProduction, credentialID: credentialIDFor(t, chain.leafCert),
		}
		token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))
		assertRejected(t, verifier, appleConfig(), token)
	})

	t.Run("truncated authData does not panic", func(t *testing.T) {
		opts := authDataOpts{
			rpIDHash: appIDHash(testTeamID), flags: authDataFlagAttestedCD,
			aaguid: aaguidProduction, credentialID: credentialIDFor(t, chain.leafCert),
			truncateTo: 10,
		}
		token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))
		assert.NotPanics(t, func() {
			assertRejected(t, verifier, appleConfig(), token)
		})
	})
}

func TestAppAttestVerify_CertificateChainInvalid(t *testing.T) {
	chain := generateTestChain(t)
	otherChain := generateTestChain(t) // untrusted root, not in verifier's pool

	opts := authDataOpts{
		rpIDHash: appIDHash(testTeamID), flags: authDataFlagAttestedCD,
		aaguid: aaguidProduction, credentialID: credentialIDFor(t, otherChain.leafCert),
	}
	token := buildToken(t, appAttestFormat, [][]byte{otherChain.leafDER}, buildAuthData(opts))

	verifier := newAppAttestVerifierWithRoots(chain.rootPool)
	assertRejected(t, verifier, appleConfig(), token)
}

func TestAppAttestVerify_AppIdentifierMismatch(t *testing.T) {
	chain := generateTestChain(t)
	opts := authDataOpts{
		rpIDHash: appIDHash("WRONGTEAM"), flags: authDataFlagAttestedCD,
		aaguid: aaguidProduction, credentialID: credentialIDFor(t, chain.leafCert),
	}
	token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))

	verifier := newAppAttestVerifierWithRoots(chain.rootPool)
	assertRejected(t, verifier, appleConfig(), token)
}

func TestAppAttestVerify_EnvironmentUnrecognized(t *testing.T) {
	chain := generateTestChain(t)
	var bogusAAGUID [16]byte
	copy(bogusAAGUID[:], "not-app-attest!!")

	opts := authDataOpts{
		rpIDHash: appIDHash(testTeamID), flags: authDataFlagAttestedCD,
		aaguid: bogusAAGUID, credentialID: credentialIDFor(t, chain.leafCert),
	}
	token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))

	verifier := newAppAttestVerifierWithRoots(chain.rootPool)
	assertRejected(t, verifier, appleConfig(), token)
}

func TestAppAttestVerify_SignCountNonZero(t *testing.T) {
	chain := generateTestChain(t)
	opts := authDataOpts{
		rpIDHash: appIDHash(testTeamID), flags: authDataFlagAttestedCD,
		signCount: 1, aaguid: aaguidProduction, credentialID: credentialIDFor(t, chain.leafCert),
	}
	token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))

	verifier := newAppAttestVerifierWithRoots(chain.rootPool)
	assertRejected(t, verifier, appleConfig(), token)
}

func TestAppAttestVerify_KeyIdentifierMismatch(t *testing.T) {
	chain := generateTestChain(t)
	tamperedCredentialID := make([]byte, 32) // all-zero, does not match the leaf's public key

	opts := authDataOpts{
		rpIDHash: appIDHash(testTeamID), flags: authDataFlagAttestedCD,
		aaguid: aaguidProduction, credentialID: tamperedCredentialID,
	}
	token := buildToken(t, appAttestFormat, [][]byte{chain.leafDER}, buildAuthData(opts))

	verifier := newAppAttestVerifierWithRoots(chain.rootPool)
	assertRejected(t, verifier, appleConfig(), token)
}

func TestNewAppAttestVerifier_ParsesEmbeddedRoot(t *testing.T) {
	assert.NotPanics(t, func() {
		assert.NotNil(t, newAppAttestVerifier())
	})
}
