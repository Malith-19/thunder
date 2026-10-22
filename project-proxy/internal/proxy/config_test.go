// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

const testConfig = `{
  "listenAddress": "localhost:8097",
  "thunderidUrl": "https://localhost:8090",
  "platformIssuer": {"issuer": "iss", "jwksUrl": "http://jwks", "audience": "aud"},
  "projectsClaim": "projects",
  "client": {"clientId": "project-proxy"%s}
}`

func writeConfig(t *testing.T, secretField string) string {
	t.Helper()
	path := filepath.Join(t.TempDir(), "config.json")
	if err := os.WriteFile(path, []byte(strings.Replace(testConfig, "%s", secretField, 1)), 0o600); err != nil {
		t.Fatal(err)
	}
	return path
}

func TestLoadConfigReadsSecretFromEnvironment(t *testing.T) {
	t.Setenv(EnvClientSecret, "from-env")
	cfg, err := LoadConfig(writeConfig(t, ""))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Client.ClientSecret != "from-env" {
		t.Errorf("ClientSecret = %q, want from-env", cfg.Client.ClientSecret)
	}
}

func TestLoadConfigPrefersSecretInFile(t *testing.T) {
	t.Setenv(EnvClientSecret, "from-env")
	cfg, err := LoadConfig(writeConfig(t, `, "clientSecret": "from-file"`))
	if err != nil {
		t.Fatal(err)
	}
	if cfg.Client.ClientSecret != "from-file" {
		t.Errorf("ClientSecret = %q, want from-file", cfg.Client.ClientSecret)
	}
}

func TestLoadConfigRequiresSecret(t *testing.T) {
	t.Setenv(EnvClientSecret, "")
	_, err := LoadConfig(writeConfig(t, ""))
	if err == nil || !strings.Contains(err.Error(), EnvClientSecret) {
		t.Fatalf("LoadConfig() error = %v, want one naming %s", err, EnvClientSecret)
	}
}
