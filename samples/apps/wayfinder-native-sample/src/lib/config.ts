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

/**
 * Server-only configuration for the Backend-for-Frontend.
 *
 * These values are read from the environment and used exclusively inside route
 * handlers. The Flow Secret and client secret must never be sent to the browser.
 */

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  /** Base URL of the ThunderID backend, e.g. https://localhost:8090. */
  thunderBaseUrl: (process.env.THUNDERID_BASE_URL || "https://localhost:8090").replace(/\/$/, ""),

  /** applicationId passed to /flow/execute. */
  appId: process.env.THUNDERID_APP_ID || "WAYFINDER-NATIVE",

  /** client_id used for the token-exchange grant on /oauth2/token. */
  clientId: process.env.THUNDERID_CLIENT_ID || "WAYFINDER-NATIVE",

  /** Confidential client secret (token endpoint auth). Server-only. */
  clientSecret: process.env.THUNDERID_CLIENT_SECRET || "",

  /** Per-application Flow Secret (Flow Execution API). Server-only. */
  flowSecret: process.env.THUNDERID_FLOW_SECRET || "",

  /** Scopes requested on the access token. */
  scopes: (process.env.THUNDERID_SCOPES || "openid profile email").trim(),

  /** Allow ThunderID's self-signed cert in local development only. */
  allowSelfSigned: process.env.THUNDERID_ALLOW_SELF_SIGNED === "true",
};

/** iron-session cookie password. Must be at least 32 characters. */
export function sessionPassword(): string {
  return required("SESSION_PASSWORD");
}
