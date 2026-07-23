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
 * ThunderID native-flow client. Runs ONLY on the server (the BFF).
 *
 * This is where the confidential-client secrets live. The BFF:
 *   1. initiates an app-native flow with the `Flow-Secret` header,
 *   2. drives each step of the Flow Execution API, then
 *   3. exchanges the completion assertion for OAuth tokens using the
 *      RFC 8693 token-exchange grant with confidential client authentication.
 *
 * A browser SPA cannot do step 1 (it is a public client and cannot hold the
 * Flow Secret), which is the entire reason this sample uses a BFF.
 */

import { config } from "./config";

// ThunderID ships a self-signed certificate in local development. Node rejects
// self-signed certs by default, so we relax verification for the whole process
// (which also covers the global fetch/undici dispatcher). Local development
// only, gated by an explicit env flag. NEVER enable this in production.
if (config.allowSelfSigned) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const FETCH_TIMEOUT_MS = 15000;

export type FlowType = "AUTHENTICATION" | "REGISTRATION" | "RECOVERY";

export interface FlowInput {
  ref?: string;
  identifier: string;
  type: string;
  required?: boolean;
}

export interface FlowAction {
  ref: string;
  nextNode?: string;
}

export interface FlowStepData {
  inputs?: FlowInput[];
  actions?: FlowAction[];
  redirectURL?: string;
  additionalData?: Record<string, unknown>;
  fieldErrors?: unknown[];
}

export interface FlowResponse {
  executionId?: string;
  flowStatus?: "COMPLETE" | "INCOMPLETE" | "ERROR";
  type?: "VIEW" | "REDIRECTION";
  challengeToken?: string;
  data?: FlowStepData;
  assertion?: string;
  failureReason?: string;
  error?: { code?: string; message?: string; description?: string };
}

export interface TokenResponse {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Start a new flow. The `Flow-Secret` header authenticates this backend client
 * to ThunderID. It is required to initiate an AUTHENTICATION flow directly and
 * is harmlessly ignored for REGISTRATION / RECOVERY flows.
 */
export async function initiateFlow(flowType: FlowType): Promise<FlowResponse> {
  const body: Record<string, unknown> = {
    applicationId: config.appId,
    flowType,
  };
  if (flowType === "AUTHENTICATION" || flowType === "REGISTRATION") {
    body.inputs = { requested_permissions: config.scopes };
  }

  const res = await fetchWithTimeout(`${config.thunderBaseUrl}/flow/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Flow-Secret": config.flowSecret,
    },
    body: JSON.stringify(body),
  });
  return parseFlowResponse(res, "Flow initiation failed");
}

/**
 * Continue an in-progress flow. Continuation requests carry the `executionId`
 * and `challengeToken` returned by the previous step and do not need the
 * Flow Secret.
 */
export async function submitFlowStep(params: {
  executionId: string;
  action?: string;
  inputs?: Record<string, string>;
  challengeToken?: string;
}): Promise<FlowResponse> {
  const payload: Record<string, unknown> = { executionId: params.executionId };
  if (params.action) payload.action = params.action;
  if (params.inputs && Object.keys(params.inputs).length > 0) payload.inputs = params.inputs;
  if (params.challengeToken) payload.challengeToken = params.challengeToken;

  const res = await fetchWithTimeout(`${config.thunderBaseUrl}/flow/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseFlowResponse(res, "Flow step failed");
}

/**
 * Exchange the completion assertion for OAuth tokens using the RFC 8693
 * token-exchange grant. Because this client is confidential, it authenticates
 * with HTTP Basic (client_secret_basic).
 */
export async function exchangeAssertion(assertion: string): Promise<TokenResponse> {
  const basic = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
  const res = await fetchWithTimeout(`${config.thunderBaseUrl}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      subject_token: assertion,
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      client_id: config.clientId,
      scope: config.scopes,
    }),
  });
  if (!res.ok) {
    const detail = await safeErrorText(res);
    throw new Error(`Token exchange failed (${res.status})${detail ? `: ${detail}` : ""}`);
  }
  return (await res.json()) as TokenResponse;
}

/** Read the authenticated user's own profile from ThunderID with a bearer token. */
export async function fetchUserProfile(accessToken: string): Promise<Record<string, unknown>> {
  const res = await fetchWithTimeout(`${config.thunderBaseUrl}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to load profile (${res.status})`);
  }
  return (await res.json()) as Record<string, unknown>;
}

async function parseFlowResponse(res: Response, failureMessage: string): Promise<FlowResponse> {
  const body = (await res.json().catch(() => ({}))) as FlowResponse;
  if (!res.ok) {
    const message =
      body?.error?.message ||
      body?.error?.description ||
      body?.failureReason ||
      `${failureMessage} (${res.status})`;
    throw new Error(message);
  }
  return body;
}

async function safeErrorText(res: Response): Promise<string> {
  try {
    const body = await res.json();
    return body?.error_description || body?.error || "";
  } catch {
    return "";
  }
}
