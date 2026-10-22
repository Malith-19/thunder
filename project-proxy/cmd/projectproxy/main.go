// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Command projectproxy fronts ThunderID for a platform that groups resources into projects. A project
// is one root organization unit, and every proxied request acts in the project it names.
package main

import (
	"crypto/tls"
	"flag"
	"log/slog"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/thunder-id/thunderid/project-proxy/internal/proxy"
)

func main() {
	configPath := flag.String("config", "config.json", "path to the configuration file")
	debug := flag.Bool("debug", false, "enable debug logging")
	flag.Parse()

	level := slog.LevelInfo
	if *debug {
		level = slog.LevelDebug
	}
	logger := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: level}))

	cfg, err := proxy.LoadConfig(*configPath)
	if err != nil {
		logger.Error("Failed to load configuration", "error", err)
		os.Exit(1)
	}
	target, err := url.Parse(cfg.ThunderIDURL)
	if err != nil {
		logger.Error("Invalid thunderidUrl", "error", err)
		os.Exit(1)
	}

	transport := http.DefaultTransport.(*http.Transport).Clone()
	if cfg.InsecureSkipVerify {
		transport.TLSClientConfig = &tls.Config{InsecureSkipVerify: true} //nolint:gosec // development only
	}
	httpClient := &http.Client{Transport: transport, Timeout: 30 * time.Second}

	server := proxy.NewServer(
		target,
		proxy.NewJWKSVerifier(cfg.PlatformIssuer, httpClient),
		proxy.NewClaimDecider(cfg.ProjectsClaim),
		proxy.NewClientCredentialsSource(cfg.ThunderIDURL, cfg.Client, httpClient),
		transport,
		logger,
	)

	logger.Info("Project proxy listening", "address", cfg.ListenAddress, "thunderid", cfg.ThunderIDURL)
	srv := &http.Server{Addr: cfg.ListenAddress, Handler: server, ReadHeaderTimeout: 10 * time.Second}
	if err := srv.ListenAndServe(); err != nil {
		logger.Error("Server stopped", "error", err)
		os.Exit(1)
	}
}
