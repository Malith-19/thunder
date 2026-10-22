// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"context"
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"math/big"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

type testIssuer struct {
	key *rsa.PrivateKey
	srv *httptest.Server
}

func newTestIssuer(t *testing.T) *testIssuer {
	t.Helper()
	key, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		t.Fatal(err)
	}
	ti := &testIssuer{key: key}
	ti.srv = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		_ = json.NewEncoder(w).Encode(map[string]any{"keys": []map[string]string{{
			"kty": "RSA", "kid": "k1",
			"n": base64.RawURLEncoding.EncodeToString(key.N.Bytes()),
			"e": base64.RawURLEncoding.EncodeToString(big.NewInt(int64(key.E)).Bytes()),
		}}})
	}))
	t.Cleanup(ti.srv.Close)
	return ti
}

func (ti *testIssuer) sign(t *testing.T, kid string, claims map[string]any) string {
	t.Helper()
	header, _ := json.Marshal(map[string]string{"alg": "RS256", "kid": kid})
	payload, _ := json.Marshal(claims)
	input := base64.RawURLEncoding.EncodeToString(header) + "." + base64.RawURLEncoding.EncodeToString(payload)
	digest := sha256.Sum256([]byte(input))
	sig, err := rsa.SignPKCS1v15(rand.Reader, ti.key, crypto.SHA256, digest[:])
	if err != nil {
		t.Fatal(err)
	}
	return input + "." + base64.RawURLEncoding.EncodeToString(sig)
}

func (ti *testIssuer) verifier() TokenVerifier {
	return NewJWKSVerifier(PlatformIssuerConfig{Issuer: "iss", Audience: "aud", JWKSURL: ti.srv.URL},
		ti.srv.Client())
}

func validClaims() map[string]any {
	return map[string]any{"iss": "iss", "aud": "aud", "sub": "alice", "exp": time.Now().Add(time.Hour).Unix()}
}

func TestJWKSVerifierAcceptsValidToken(t *testing.T) {
	ti := newTestIssuer(t)
	claims, err := ti.verifier().Verify(context.Background(), ti.sign(t, "k1", validClaims()))
	if err != nil {
		t.Fatalf("Verify() error = %v", err)
	}
	if claims.Subject != "alice" {
		t.Errorf("Subject = %q, want alice", claims.Subject)
	}
}

func TestJWKSVerifierAcceptsAudienceList(t *testing.T) {
	ti := newTestIssuer(t)
	c := validClaims()
	c["aud"] = []string{"other", "aud"}
	if _, err := ti.verifier().Verify(context.Background(), ti.sign(t, "k1", c)); err != nil {
		t.Fatalf("Verify() error = %v", err)
	}
}

func TestJWKSVerifierRejects(t *testing.T) {
	ti := newTestIssuer(t)
	other := newTestIssuer(t)
	tests := []struct {
		name  string
		token func() string
	}{
		{"wrong issuer", func() string { c := validClaims(); c["iss"] = "x"; return ti.sign(t, "k1", c) }},
		{"wrong audience", func() string { c := validClaims(); c["aud"] = "x"; return ti.sign(t, "k1", c) }},
		{"expired", func() string {
			c := validClaims()
			c["exp"] = time.Now().Add(-time.Hour).Unix()
			return ti.sign(t, "k1", c)
		}},
		{"not yet valid", func() string {
			c := validClaims()
			c["nbf"] = time.Now().Add(time.Hour).Unix()
			return ti.sign(t, "k1", c)
		}},
		{"no subject", func() string { c := validClaims(); delete(c, "sub"); return ti.sign(t, "k1", c) }},
		{"unknown key", func() string { return ti.sign(t, "k2", validClaims()) }},
		{"foreign signature", func() string { return other.sign(t, "k1", validClaims()) }},
		{"malformed", func() string { return "a.b" }},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if _, err := ti.verifier().Verify(context.Background(), tt.token()); err == nil {
				t.Fatal("Verify() succeeded, want an error")
			}
		})
	}
}
