// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package config

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"math/big"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func writeTestCACertificate(t *testing.T, dir string) string {
	t.Helper()
	key, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	require.NoError(t, err)
	template := &x509.Certificate{
		SerialNumber:          big.NewInt(1),
		Subject:               pkix.Name{CommonName: "localhost"},
		NotBefore:             time.Now(),
		NotAfter:              time.Now().Add(time.Hour),
		IsCA:                  true,
		BasicConstraintsValid: true,
	}
	der, err := x509.CreateCertificate(rand.Reader, template, template, &key.PublicKey, key)
	require.NoError(t, err)
	certPath := filepath.Join(dir, "ca.cert")
	require.NoError(t, os.WriteFile(certPath, pem.EncodeToMemory(&pem.Block{Type: "CERTIFICATE", Bytes: der}),
		0o600))
	return certPath
}

func TestTrustedIssuerConfig_ReadCACertificate(t *testing.T) {
	t.Run("not configured", func(t *testing.T) {
		pemData, err := (&TrustedIssuerConfig{}).ReadCACertificate(t.TempDir())
		assert.NoError(t, err)
		assert.Empty(t, pemData)
	})

	t.Run("relative path resolves against the server home", func(t *testing.T) {
		home := t.TempDir()
		writeTestCACertificate(t, home)
		pemData, err := (&TrustedIssuerConfig{CACertFile: "ca.cert"}).ReadCACertificate(home)
		assert.NoError(t, err)
		assert.Contains(t, pemData, "BEGIN CERTIFICATE")
	})

	t.Run("absolute path", func(t *testing.T) {
		certPath := writeTestCACertificate(t, t.TempDir())
		pemData, err := (&TrustedIssuerConfig{CACertFile: certPath}).ReadCACertificate("/elsewhere")
		assert.NoError(t, err)
		assert.NotEmpty(t, pemData)
	})

	t.Run("missing file", func(t *testing.T) {
		_, err := (&TrustedIssuerConfig{CACertFile: "missing.cert"}).ReadCACertificate(t.TempDir())
		assert.ErrorContains(t, err, "failed to read trusted_issuer.ca_cert_file")
	})

	t.Run("not a certificate", func(t *testing.T) {
		home := t.TempDir()
		require.NoError(t, os.WriteFile(filepath.Join(home, "ca.cert"), []byte("not a certificate"), 0o600))
		_, err := (&TrustedIssuerConfig{CACertFile: "ca.cert"}).ReadCACertificate(home)
		assert.ErrorContains(t, err, "holds no PEM certificate")
	})
}
