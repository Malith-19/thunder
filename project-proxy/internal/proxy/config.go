// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
)

// Config is the proxy configuration.
type Config struct {
	// ListenAddress is the address the proxy listens on, such as "localhost:8097".
	ListenAddress string `json:"listenAddress"`
	// ThunderIDURL is the base URL of the ThunderID server the proxy fronts.
	ThunderIDURL string `json:"thunderidUrl"`
	// InsecureSkipVerify skips TLS verification of ThunderID and the platform JWKS endpoint. For
	// local development against self-signed certificates only.
	InsecureSkipVerify bool `json:"insecureSkipVerify"`
	// PlatformIssuer is the identity provider whose tokens callers present to the proxy.
	PlatformIssuer PlatformIssuerConfig `json:"platformIssuer"`
	// ProjectsClaim is the platform token claim that lists the project IDs the caller may act on.
	ProjectsClaim string `json:"projectsClaim"`
	// Client is the ThunderID OAuth client the proxy obtains tokens with.
	Client ClientConfig `json:"client"`
}

// PlatformIssuerConfig identifies the identity provider that issues the caller's token.
type PlatformIssuerConfig struct {
	Issuer   string `json:"issuer"`
	JWKSURL  string `json:"jwksUrl"`
	Audience string `json:"audience"`
}

// ClientConfig is the ThunderID OAuth client the proxy authenticates as. The client must be shared
// with every organization unit, so it can obtain a token for any project's root organization unit,
// and must not hold the system permission, so that token reaches that organization unit alone.
type ClientConfig struct {
	ClientID string `json:"clientId"`
	// ClientSecret is the client's secret. When empty, it is read from the environment variable named
	// by EnvClientSecret.
	ClientSecret string `json:"clientSecret"`
	// Resource is the RFC 8707 resource indicator the tokens are bound to: the identifier of the
	// ThunderID resource server that defines the permissions in Scopes.
	Resource string `json:"resource"`
	// Scopes are the permissions requested for a token that acts in a project.
	Scopes []string `json:"scopes"`
}

// EnvClientSecret is the environment variable the client secret is read from when the configuration
// file does not set it.
const EnvClientSecret = "PROJECT_PROXY_CLIENT_SECRET"

// LoadConfig reads and validates the configuration file at path.
func LoadConfig(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read config: %w", err)
	}
	var cfg Config
	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("parse config: %w", err)
	}
	if cfg.Client.ClientSecret == "" {
		cfg.Client.ClientSecret = os.Getenv(EnvClientSecret)
	}
	if err := cfg.validate(); err != nil {
		return nil, err
	}
	return &cfg, nil
}

func (c *Config) validate() error {
	switch {
	case c.ListenAddress == "":
		return errors.New("listenAddress is required")
	case c.ThunderIDURL == "":
		return errors.New("thunderidUrl is required")
	case c.PlatformIssuer.Issuer == "" || c.PlatformIssuer.JWKSURL == "" || c.PlatformIssuer.Audience == "":
		return errors.New("platformIssuer.issuer, jwksUrl and audience are required")
	case c.ProjectsClaim == "":
		return errors.New("projectsClaim is required")
	case c.Client.ClientID == "":
		return errors.New("client.clientId is required")
	case c.Client.ClientSecret == "":
		return errors.New("client.clientSecret is required: set it in the file or in " + EnvClientSecret)
	}
	return nil
}
