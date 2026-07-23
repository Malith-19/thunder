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
 * Encrypted, HttpOnly session for the BFF.
 *
 * Tokens obtained from the token exchange are stored here, server-side, inside
 * an iron-session cookie. The browser receives only an opaque encrypted cookie
 * it cannot read; the sanitized `user` object is the only identity data ever
 * returned to client code.
 */

import { getIronSession, type IronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { sessionPassword } from "./config";
import type { TokenResponse } from "./thunderid";

export interface SessionUser {
  sub?: string;
  username?: string;
  displayName?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
}

export interface SessionData {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  user?: SessionUser;
}

const COOKIE_NAME = "wf_native_session";

function sessionOptions(): SessionOptions {
  return {
    password: sessionPassword(),
    cookieName: COOKIE_NAME,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  };
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions());
}

/** Persist tokens and a sanitized user profile into the session. */
export async function saveTokens(tokens: TokenResponse): Promise<SessionUser> {
  const session = await getSession();
  session.accessToken = tokens.access_token;
  session.idToken = tokens.id_token;
  session.refreshToken = tokens.refresh_token;
  session.user = buildUser(tokens.id_token || tokens.access_token);
  await session.save();
  return session.user;
}

export async function destroySession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}

/** Decode a JWT into a small, display-safe user object. */
export function buildUser(token?: string): SessionUser {
  const claims = decodeJwt(token);
  if (!claims) return {};
  return {
    sub: asString(claims.sub),
    username: asString(claims.username) || asString(claims.preferred_username),
    displayName: asString(claims.displayName) || asString(claims.name),
    email: asString(claims.email),
    given_name: asString(claims.given_name),
    family_name: asString(claims.family_name),
  };
}

function decodeJwt(token?: string): Record<string, unknown> | null {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
  } catch {
    return null;
  }
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
