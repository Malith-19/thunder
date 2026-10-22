// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"context"
	"crypto"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"math/big"
	"net/http"
	"strings"
	"sync"
	"time"
)

const (
	clockSkew = 30 * time.Second
	// jwksMinRefresh bounds how often an unknown key ID makes the verifier fetch the key set again.
	jwksMinRefresh = time.Minute
)

var errInvalidToken = errors.New("invalid token")

// Claims are the verified claims of a platform token.
type Claims struct {
	Subject string
	Raw     map[string]any
}

// TokenVerifier verifies a platform token and returns its claims.
type TokenVerifier interface {
	Verify(ctx context.Context, token string) (*Claims, error)
}

// jwksVerifier verifies RS256 and ES256 signed JWTs against a JWKS endpoint.
type jwksVerifier struct {
	issuer   string
	audience string
	jwksURL  string
	client   *http.Client
	now      func() time.Time

	mu        sync.Mutex
	keys      map[string]crypto.PublicKey
	fetchedAt time.Time
}

// NewJWKSVerifier returns a verifier for tokens from the given issuer.
func NewJWKSVerifier(cfg PlatformIssuerConfig, client *http.Client) TokenVerifier {
	return &jwksVerifier{
		issuer:   cfg.Issuer,
		audience: cfg.Audience,
		jwksURL:  cfg.JWKSURL,
		client:   client,
		now:      time.Now,
	}
}

type jwtHeader struct {
	Alg string `json:"alg"`
	Kid string `json:"kid"`
}

func (v *jwksVerifier) Verify(ctx context.Context, token string) (*Claims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errInvalidToken
	}
	var header jwtHeader
	if err := decodeSegment(parts[0], &header); err != nil {
		return nil, errInvalidToken
	}
	signature, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, errInvalidToken
	}
	key, err := v.key(ctx, header.Kid)
	if err != nil {
		return nil, err
	}
	digest := sha256.Sum256([]byte(parts[0] + "." + parts[1]))
	if !verifySignature(header.Alg, key, digest[:], signature) {
		return nil, errInvalidToken
	}

	var raw map[string]any
	if err := decodeSegment(parts[1], &raw); err != nil {
		return nil, errInvalidToken
	}
	if err := v.validateClaims(raw); err != nil {
		return nil, err
	}
	sub, _ := raw["sub"].(string)
	if sub == "" {
		return nil, errInvalidToken
	}
	return &Claims{Subject: sub, Raw: raw}, nil
}

func (v *jwksVerifier) validateClaims(raw map[string]any) error {
	if iss, _ := raw["iss"].(string); iss != v.issuer {
		return errInvalidToken
	}
	if !hasAudience(raw["aud"], v.audience) {
		return errInvalidToken
	}
	now := v.now()
	exp, ok := raw["exp"].(float64)
	if !ok || now.After(time.Unix(int64(exp), 0).Add(clockSkew)) {
		return errInvalidToken
	}
	if nbf, ok := raw["nbf"].(float64); ok && now.Add(clockSkew).Before(time.Unix(int64(nbf), 0)) {
		return errInvalidToken
	}
	return nil
}

func hasAudience(aud any, want string) bool {
	switch a := aud.(type) {
	case string:
		return a == want
	case []any:
		for _, v := range a {
			if s, _ := v.(string); s == want {
				return true
			}
		}
	}
	return false
}

func verifySignature(alg string, key crypto.PublicKey, digest, signature []byte) bool {
	switch alg {
	case "RS256":
		pub, ok := key.(*rsa.PublicKey)
		return ok && rsa.VerifyPKCS1v15(pub, crypto.SHA256, digest, signature) == nil
	case "ES256":
		pub, ok := key.(*ecdsa.PublicKey)
		if !ok || len(signature) != 64 {
			return false
		}
		r := new(big.Int).SetBytes(signature[:32])
		s := new(big.Int).SetBytes(signature[32:])
		return ecdsa.Verify(pub, digest, r, s)
	}
	return false
}

// key returns the signing key with the given ID, fetching the key set again when the ID is unknown.
func (v *jwksVerifier) key(ctx context.Context, kid string) (crypto.PublicKey, error) {
	v.mu.Lock()
	defer v.mu.Unlock()
	if key, ok := v.keys[kid]; ok {
		return key, nil
	}
	if v.keys != nil && v.now().Sub(v.fetchedAt) < jwksMinRefresh {
		return nil, errInvalidToken
	}
	keys, err := v.fetch(ctx)
	if err != nil {
		return nil, err
	}
	v.keys, v.fetchedAt = keys, v.now()
	if key, ok := keys[kid]; ok {
		return key, nil
	}
	return nil, errInvalidToken
}

type jwk struct {
	Kty string `json:"kty"`
	Kid string `json:"kid"`
	N   string `json:"n"`
	E   string `json:"e"`
	Crv string `json:"crv"`
	X   string `json:"x"`
	Y   string `json:"y"`
}

func (v *jwksVerifier) fetch(ctx context.Context) (map[string]crypto.PublicKey, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, v.jwksURL, nil)
	if err != nil {
		return nil, err
	}
	resp, err := v.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("fetch jwks: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("fetch jwks: status %d", resp.StatusCode)
	}
	var set struct {
		Keys []jwk `json:"keys"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&set); err != nil {
		return nil, fmt.Errorf("decode jwks: %w", err)
	}
	keys := make(map[string]crypto.PublicKey, len(set.Keys))
	for _, k := range set.Keys {
		if pub, err := k.publicKey(); err == nil {
			keys[k.Kid] = pub
		}
	}
	return keys, nil
}

func (k jwk) publicKey() (crypto.PublicKey, error) {
	switch k.Kty {
	case "RSA":
		n, err := base64.RawURLEncoding.DecodeString(k.N)
		if err != nil {
			return nil, err
		}
		e, err := base64.RawURLEncoding.DecodeString(k.E)
		if err != nil {
			return nil, err
		}
		return &rsa.PublicKey{N: new(big.Int).SetBytes(n), E: int(new(big.Int).SetBytes(e).Int64())}, nil
	case "EC":
		if k.Crv != "P-256" {
			return nil, errors.New("unsupported curve")
		}
		x, err := base64.RawURLEncoding.DecodeString(k.X)
		if err != nil {
			return nil, err
		}
		y, err := base64.RawURLEncoding.DecodeString(k.Y)
		if err != nil {
			return nil, err
		}
		return &ecdsa.PublicKey{Curve: elliptic.P256(), X: new(big.Int).SetBytes(x), Y: new(big.Int).SetBytes(y)}, nil
	}
	return nil, errors.New("unsupported key type")
}

func decodeSegment(segment string, v any) error {
	data, err := base64.RawURLEncoding.DecodeString(segment)
	if err != nil {
		return err
	}
	return json.Unmarshal(data, v)
}
