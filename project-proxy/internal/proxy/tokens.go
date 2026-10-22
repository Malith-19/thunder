// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"
)

// tokenRefreshMargin is how long before expiry a cached token is replaced.
const tokenRefreshMargin = 30 * time.Second

// TokenSource obtains ThunderID access tokens for the proxy's client.
type TokenSource interface {
	// ProjectToken returns a token that acts in the given organization unit.
	ProjectToken(ctx context.Context, ouID string) (string, error)
}

type cachedToken struct {
	value     string
	expiresAt time.Time
}

// clientCredentialsSource obtains tokens with the client credentials grant from the organization unit
// scoped token endpoint, /ou/{ouId}/oauth2/token. ThunderID issues such a token with that organization
// unit as its ouId and authorizes it against that unit alone.
type clientCredentialsSource struct {
	baseURL string
	client  ClientConfig
	http    *http.Client
	now     func() time.Time

	mu    sync.Mutex
	cache map[string]cachedToken
}

// NewClientCredentialsSource returns a token source for the configured client.
func NewClientCredentialsSource(baseURL string, client ClientConfig, httpClient *http.Client) TokenSource {
	return &clientCredentialsSource{
		baseURL: strings.TrimSuffix(baseURL, "/"),
		client:  client,
		http:    httpClient,
		now:     time.Now,
		cache:   map[string]cachedToken{},
	}
}

func (s *clientCredentialsSource) ProjectToken(ctx context.Context, ouID string) (string, error) {
	s.mu.Lock()
	cached, ok := s.cache[ouID]
	s.mu.Unlock()
	if ok && s.now().Add(tokenRefreshMargin).Before(cached.expiresAt) {
		return cached.value, nil
	}

	form := url.Values{"grant_type": {"client_credentials"}}
	if len(s.client.Scopes) > 0 {
		form.Set("scope", strings.Join(s.client.Scopes, " "))
	}
	if s.client.Resource != "" {
		form.Set("resource", s.client.Resource)
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost,
		s.baseURL+"/ou/"+url.PathEscape(ouID)+"/oauth2/token", strings.NewReader(form.Encode()))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(url.QueryEscape(s.client.ClientID), url.QueryEscape(s.client.ClientSecret))

	resp, err := s.http.Do(req)
	if err != nil {
		return "", fmt.Errorf("request token: %w", err)
	}
	defer resp.Body.Close()
	var body struct {
		AccessToken      string `json:"access_token"`
		ExpiresIn        int64  `json:"expires_in"`
		Error            string `json:"error"`
		ErrorDescription string `json:"error_description"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		return "", fmt.Errorf("decode token response: %w", err)
	}
	if resp.StatusCode != http.StatusOK || body.AccessToken == "" {
		return "", fmt.Errorf("token request refused: status %d: %s %s", resp.StatusCode, body.Error,
			body.ErrorDescription)
	}

	s.mu.Lock()
	s.cache[ouID] = cachedToken{
		value:     body.AccessToken,
		expiresAt: s.now().Add(time.Duration(body.ExpiresIn) * time.Second),
	}
	s.mu.Unlock()
	return body.AccessToken, nil
}
