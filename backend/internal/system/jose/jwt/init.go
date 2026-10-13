// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package jwt provides functionalities for handling JSON Web Tokens (JWTs).
package jwt

import (
	"crypto/x509"
	"errors"
	"time"

	httpservice "github.com/thunder-id/thunderid/internal/system/http"
	joseconfig "github.com/thunder-id/thunderid/internal/system/jose/config"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"
)

// jwksFetchTimeout bounds one JWKS fetch.
const jwksFetchTimeout = 10 * time.Second

// Initialize initializes the JWT service.
func Initialize(
	runtimeProvider providers.RuntimeCryptoProvider, cfg joseconfig.Config,
) (JWTServiceInterface, error) {
	httpClient := httpservice.NewHTTPClientWithTimeout(jwksFetchTimeout)
	if cfg.JWKSCACertificate != "" {
		roots, err := x509.SystemCertPool()
		if err != nil || roots == nil {
			roots = x509.NewCertPool()
		}
		if !roots.AppendCertsFromPEM([]byte(cfg.JWKSCACertificate)) {
			return nil, errors.New("the JWKS certificate authority is not a PEM certificate")
		}
		httpClient = httpservice.NewHTTPClientWithRootCAs(jwksFetchTimeout, roots)
	}
	return newJWTService(httpClient, runtimeProvider, cfg)
}
