import fetch, { Headers, Request, Response } from "cross-fetch";
import { ThunderIDAuthException, ThunderIDJavaScriptClient, VendorConstants } from "@thunderid/javascript";
import cache from "memory-cache";
import base64url from "base64url";
import sha256 from "fast-sha256";
import * as jose from "jose";
import randombytes from "secure-random-bytes";
import { v4, validate, version } from "uuid";

export * from "@thunderid/javascript"

//#region src/stores/MemoryCacheStore.ts
/**
* In-memory key-value store backed by `memory-cache`.
* Used as the default storage when no custom store is provided to `ThunderIDNodeClient`.
*/
var MemoryCacheStore = class {
	async setData(key, value) {
		cache.put(key, value);
	}
	async getData(key) {
		return cache.get(key) ?? "{}";
	}
	async removeData(key) {
		cache.del(key);
	}
};
var MemoryCacheStore_default = MemoryCacheStore;

//#endregion
//#region src/utils/NodeCryptoUtils.ts
/**
* Node.js crypto utilities implementing the `Crypto` interface.
* Uses `jose`, `base64url`, `fast-sha256`, and `secure-random-bytes`.
*/
var NodeCryptoUtils = class {
	base64URLEncode(value) {
		return base64url.encode(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	}
	base64URLDecode(value) {
		return base64url.decode(value).toString();
	}
	hashSha256(data) {
		return Buffer.from(sha256(new TextEncoder().encode(data)));
	}
	generateRandomBytes(length) {
		return randombytes(length);
	}
	async verifyJwt(idToken, jwk, algorithms, clientId, issuer, subject, clockTolerance) {
		const key = await jose.importJWK(jwk);
		return jose.jwtVerify(idToken, key, {
			algorithms,
			audience: [clientId],
			clockTolerance,
			issuer,
			subject
		}).then(() => Promise.resolve(true));
	}
};
var NodeCryptoUtils_default = NodeCryptoUtils;

//#endregion
//#region src/utils/SessionUtils.ts
const UUID_VERSION = 4;
/**
* Utility class for session validation and UUID management.
*/
var SessionUtils = class {
	constructor() {}
	/**
	* Generates a new UUID v4 string.
	*
	* @returns A new UUID string.
	*/
	static createUUID() {
		return v4();
	}
	/**
	* Returns `true` if the given string is a valid UUID v4.
	*
	* @param uuid - The UUID string to validate.
	*/
	static validateUUID(uuid) {
		if (validate(uuid) && version(uuid) === UUID_VERSION) return Promise.resolve(true);
		return Promise.resolve(false);
	}
	/**
	* Returns `true` if the session token is still within its validity window.
	*
	* @param sessionData - The session data to check.
	*/
	static validateSession(sessionData) {
		const currentTime = Date.now();
		const expiryTimeStamp = sessionData.created_at + parseInt(sessionData.expires_in, 10) * 60 * 1e3;
		return Promise.resolve(currentTime < expiryTimeStamp);
	}
};
var SessionUtils_default = SessionUtils;

//#endregion
//#region src/ThunderIDNodeClient.ts
var ThunderIDNodeClient = class extends ThunderIDJavaScriptClient {
	_nodeInstanceId = 0;
	constructor(instanceId = 0) {
		super(void 0, new NodeCryptoUtils_default());
		this._nodeInstanceId = instanceId;
	}
	async initialize(config, storage) {
		const merged = {
			...config,
			instanceId: this._nodeInstanceId
		};
		const store = storage ?? new MemoryCacheStore_default();
		return super.initialize(merged, store);
	}
	getInstanceId() {
		return this._nodeInstanceId;
	}
	async signIn(...args) {
		const [authURLCallback, userId, authorizationCode, sessionState, state, signInConfig] = args;
		if (!userId) return Promise.reject(new ThunderIDAuthException("NODE-AUTH_CLIENT-SI-NF01", "No user ID was provided.", "Unable to sign in the user as no user ID was provided."));
		if (await this.isSignedIn(userId)) {
			const sessionData$1 = await this.getStorageManager().getSessionData(userId);
			return Promise.resolve({
				accessToken: sessionData$1.access_token,
				createdAt: sessionData$1.created_at,
				expiresIn: sessionData$1.expires_in,
				idToken: sessionData$1.id_token,
				refreshToken: sessionData$1.refresh_token ?? "",
				scope: sessionData$1.scope,
				tokenType: sessionData$1.token_type
			});
		}
		if (!authorizationCode || !state) {
			if (!authURLCallback || typeof authURLCallback !== "function") return Promise.reject(new ThunderIDAuthException("NODE-AUTH_CLIENT-SI-NF02", "Invalid AuthURLCallback function.", "The AuthURLCallback is not defined or is not a function."));
			authURLCallback(await this.getSignInUrl(signInConfig, userId));
			return Promise.resolve({
				accessToken: "",
				createdAt: 0,
				expiresIn: "",
				idToken: "",
				refreshToken: "",
				scope: "",
				tokenType: ""
			});
		}
		await this.requestAccessToken(authorizationCode, sessionState ?? "", state, userId);
		const sessionData = await this.getStorageManager().getSessionData(userId);
		return Promise.resolve({
			accessToken: sessionData.access_token,
			createdAt: sessionData.created_at,
			expiresIn: sessionData.expires_in,
			idToken: sessionData.id_token,
			refreshToken: sessionData.refresh_token ?? "",
			scope: sessionData.scope,
			tokenType: sessionData.token_type
		});
	}
	async getSignInUrl(requestConfig, userId) {
		const url = await super.getSignInUrl(requestConfig, userId);
		if (!url) return Promise.reject(new ThunderIDAuthException("NODE-AUTH_CLIENT-GSIU-NF01", "Getting authorization URL failed.", "No authorization URL was returned."));
		return url;
	}
	async signOut(...args) {
		const userId = typeof args[0] === "string" ? args[0] : void 0;
		const signOutUrl = await this.getSignOutUrl(userId);
		if (!signOutUrl) return Promise.reject(new ThunderIDAuthException("NODE-AUTH_CLIENT-SO-NF01", "Signing out the user failed.", "Could not obtain the sign-out URL from the server."));
		return signOutUrl;
	}
	async isSignedIn(userId) {
		try {
			if (!await super.isSignedIn(userId)) return false;
			const sm = this.getStorageManager();
			const sessionData = await sm.getSessionData(userId);
			if (await SessionUtils_default.validateSession(sessionData)) return true;
			if (await this.refreshAccessToken(userId)) return true;
			await sm.removeSessionData(userId);
			return false;
		} catch {
			return false;
		}
	}
	async getIdToken(userId) {
		if (!await this.isSignedIn(userId)) return Promise.reject(new ThunderIDAuthException("NODE-AUTH_CLIENT-GIT-NF01", "The user is not logged in.", "No session was found for the requested user."));
		return super.getIdToken(userId);
	}
	async refreshAccessToken(userId) {
		return super.refreshAccessToken(userId);
	}
	async revokeAccessToken(userId) {
		return super.revokeAccessToken(userId);
	}
	async getDecodedIdToken(userId, idToken) {
		return super.getDecodedIdToken(userId, idToken);
	}
	async getAccessToken(userId) {
		return super.getAccessToken(userId);
	}
	async getUser(userId) {
		return super.getUser(userId);
	}
	async getOpenIDProviderEndpoints() {
		return super.getOpenIDProviderEndpoints();
	}
	async exchangeToken(config, userId) {
		return super.exchangeToken(config, userId);
	}
};
var ThunderIDNodeClient_default = ThunderIDNodeClient;

//#endregion
//#region src/constants/CookieConfig.ts
var CookieConfig = class {
	static SESSION_COOKIE_NAME = `__${VendorConstants.VENDOR_PREFIX}__session`;
	static TEMP_SESSION_COOKIE_NAME = `__${VendorConstants.VENDOR_PREFIX}__temp.session`;
	static DEFAULT_MAX_AGE = 3600;
	static DEFAULT_HTTP_ONLY = true;
	static DEFAULT_SAME_SITE = "lax";
	static DEFAULT_SECURE = true;
	constructor() {}
};
var CookieConfig_default = CookieConfig;

//#endregion
//#region src/utils/generateSessionId.ts
/**
* Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
const generateSessionId = () => (/* @__PURE__ */ new Date()).getTime().toString(36) + Math.random().toString(36).substring(2);
var generateSessionId_default = generateSessionId;

//#endregion
//#region src/utils/getSessionCookieOptions.ts
const getSessionCookieOptions = (options) => ({
	httpOnly: options.httpOnly ?? CookieConfig_default.DEFAULT_HTTP_ONLY,
	sameSite: options.sameSite ?? CookieConfig_default.DEFAULT_SAME_SITE,
	secure: options.secure ?? CookieConfig_default.DEFAULT_SECURE
});
var getSessionCookieOptions_default = getSessionCookieOptions;

//#endregion
//#region src/index.ts
if (!globalThis.fetch) {
	globalThis.fetch = fetch;
	globalThis.Headers = Headers;
	globalThis.Request = Request;
	globalThis.Response = Response;
}

//#endregion
export { CookieConfig_default as CookieConfig, MemoryCacheStore_default as MemoryCacheStore, NodeCryptoUtils_default as NodeCryptoUtils, SessionUtils_default as SessionUtils, ThunderIDNodeClient_default as ThunderIDNodeClient, generateSessionId_default as generateSessionId, getSessionCookieOptions_default as getSessionCookieOptions };