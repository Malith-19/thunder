// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Command devissuer stands in for the cloud platform's identity provider during local development.
// It serves a JWKS and issues signed tokens for any subject it is asked for. Never run it anywhere
// but a developer machine.
package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"flag"
	"log"
	"math/big"
	"net/http"
	"strings"
	"time"
)

const keyID = "devissuer"

func main() {
	addr := flag.String("addr", "localhost:8096", "address to listen on")
	issuer := flag.String("issuer", "http://localhost:8096", "issuer of the tokens")
	audience := flag.String("audience", "project-proxy", "audience of the tokens")
	flag.Parse()

	key, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /jwks", func(w http.ResponseWriter, _ *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{"keys": []map[string]string{{
			"kty": "RSA",
			"kid": keyID,
			"alg": "RS256",
			"use": "sig",
			"n":   base64.RawURLEncoding.EncodeToString(key.N.Bytes()),
			"e":   base64.RawURLEncoding.EncodeToString(big.NewInt(int64(key.E)).Bytes()),
		}}})
	})
	// GET /token?sub=alice&projects=p1,p2 issues a one hour token for the subject, listing the projects
	// it may act on in the "projects" claim.
	mux.HandleFunc("GET /token", func(w http.ResponseWriter, r *http.Request) {
		sub := r.URL.Query().Get("sub")
		if sub == "" {
			http.Error(w, "sub is required", http.StatusBadRequest)
			return
		}
		projects := []string{}
		if p := r.URL.Query().Get("projects"); p != "" {
			projects = strings.Split(p, ",")
		}
		now := time.Now()
		token, err := sign(key, map[string]any{
			"iss":      *issuer,
			"aud":      *audience,
			"sub":      sub,
			"projects": projects,
			"iat":      now.Unix(),
			"exp":      now.Add(time.Hour).Unix(),
		})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]string{"access_token": token})
	})

	log.Printf("Development issuer listening on %s", *addr)
	srv := &http.Server{Addr: *addr, Handler: mux, ReadHeaderTimeout: 10 * time.Second}
	log.Fatal(srv.ListenAndServe())
}

func sign(key *rsa.PrivateKey, claims map[string]any) (string, error) {
	header, err := json.Marshal(map[string]string{"alg": "RS256", "typ": "JWT", "kid": keyID})
	if err != nil {
		return "", err
	}
	payload, err := json.Marshal(claims)
	if err != nil {
		return "", err
	}
	signingInput := base64.RawURLEncoding.EncodeToString(header) + "." +
		base64.RawURLEncoding.EncodeToString(payload)
	digest := sha256.Sum256([]byte(signingInput))
	signature, err := rsa.SignPKCS1v15(rand.Reader, key, crypto.SHA256, digest[:])
	if err != nil {
		return "", err
	}
	return signingInput + "." + base64.RawURLEncoding.EncodeToString(signature), nil
}
