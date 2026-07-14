import { ThunderIDAuthException, ThunderIDNodeClient, ThunderIDRuntimeError, executeEmbeddedSignInFlowV2, logger } from "@thunderid/node";
import { v4 } from "uuid";

export * from "@thunderid/node"

//#region src/constants/CookieConfig.ts
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
/** Session cookie name used across the Express SDK. */
const SESSION_COOKIE_NAME = "THUNDERID_SESSION_ID";
/** Default cookie configuration values. */
const CookieConfig = {
	defaultExpirySeconds: 86400,
	defaultHttpOnly: true,
	defaultSameSite: "lax",
	defaultSecure: false
};
var CookieConfig_default = CookieConfig;

//#endregion
//#region src/utils/expressUtils.ts
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
const AUTH_ERROR_REGEXP = /[?&]error=[^&]+/;
/**
* Returns `true` if the given URL contains an OAuth error query parameter.
*
* @param url - The URL to inspect.
*/
const hasErrorInURL = (url) => AUTH_ERROR_REGEXP.test(url);
var expressUtils_default = hasErrorInURL;

//#endregion
//#region src/ThunderIDExpressClient.ts
var ThunderIDExpressClient = class extends ThunderIDNodeClient {
	_expressConfig;
	constructor() {
		super();
	}
	async initialize(config, storage) {
		this._expressConfig = config;
		return super.initialize(config, storage);
	}
	get expressConfig() {
		return this._expressConfig;
	}
	async getUserFromRequest(req) {
		const sessionId = req.cookies?.[SESSION_COOKIE_NAME];
		return this.getUser(sessionId);
	}
	async signIn(req, res, next, signInConfig) {
		if (expressUtils_default(req.originalUrl)) return Promise.reject(new ThunderIDAuthException("EXPRESS-CLIENT-SI-IV01", "Invalid login request URL", "Login request contains an error query parameter in the URL"));
		let userId = req.cookies?.[SESSION_COOKIE_NAME];
		if (!userId) userId = v4();
		const sc = this._expressConfig?.sessionCookie;
		const authRedirectCallback = (url) => {
			if (!url) return;
			res.cookie(SESSION_COOKIE_NAME, userId, {
				httpOnly: sc?.httpOnly ?? CookieConfig_default.defaultHttpOnly,
				maxAge: (sc?.expiryTime ?? CookieConfig_default.defaultExpirySeconds) * 1e3,
				sameSite: sc?.sameSite ?? CookieConfig_default.defaultSameSite,
				secure: sc?.secure ?? CookieConfig_default.defaultSecure
			});
			res.redirect(url);
			if (typeof next === "function") next();
		};
		const authResponse = await super.signIn(authRedirectCallback, userId, req.query["code"], req.query["session_state"], req.query["state"], signInConfig);
		if (authResponse.accessToken || authResponse.idToken) return authResponse;
		return {
			accessToken: "",
			createdAt: 0,
			expiresIn: "",
			idToken: "",
			refreshToken: "",
			scope: "",
			tokenType: ""
		};
	}
	async signOut(userId) {
		return super.signOut(userId);
	}
};
var ThunderIDExpressClient_default = ThunderIDExpressClient;

//#endregion
//#region src/middleware/authentication.ts
/**
* Returns Express middleware that initialises the ThunderID client and attaches
* it to `req.thunderIDAuth` for use in route handlers and `protect()`.
*
* Unlike the old `thunderID()` router, this function does **not** mount any
* routes automatically. Register sign-in and sign-out handlers explicitly:
*
* ```ts
* app.use(thunderID(config));
* app.get('/login',  handleSignIn());
* app.get('/logout', handleSignOut());
* ```
*
* @param config - ThunderID Express configuration.
*/
const thunderID = (config) => {
	const client = new ThunderIDExpressClient_default();
	let initPromise;
	const getInitPromise = (req) => {
		if (initPromise === void 0) {
			const origin = `${req.protocol}://${req.get("host")}`;
			initPromise = client.initialize({
				...config,
				afterSignInUrl: config.afterSignInUrl ?? `${origin}/login`,
				afterSignOutUrl: config.afterSignOutUrl ?? `${origin}/logout`
			});
		}
		return initPromise;
	};
	return async (req, res, next) => {
		await getInitPromise(req);
		req.thunderIDAuth = client;
		res.thunderIDAuth = client;
		next();
	};
};
/**
* Returns an Express route handler for the sign-in path.
*
* - If the request has no `?code` query param, initiates the OAuth 2.0 redirect.
* - If the request has `?code`, exchanges the authorization code for tokens,
*   sets the session cookie, and calls `onSignIn`.
*
* Must be used after `thunderID()` middleware so that `req.thunderIDAuth` is set.
*
* ```ts
* app.get('/login', handleSignIn());
* ```
*/
const handleSignIn = () => {
	return async (req, res, next) => {
		const client = req.thunderIDAuth;
		if (!client) {
			logger.error("thunderID() middleware must be mounted before handleSignIn()");
			res.status(500).end();
			return;
		}
		const config = client.expressConfig;
		const onSignIn = config?.onSignIn ?? ((r) => r.end());
		const onError = config?.onError ?? ((r, e) => {
			logger.error(e.message);
			r.status(500).end();
		});
		try {
			const response = await client.signIn(req, res, next, config?.signInOptions);
			if (response.accessToken || response.idToken) onSignIn(res, response);
		} catch (e) {
			logger.error(e.message);
			onError(res, e);
		}
	};
};
/**
* Returns an Express route handler for the sign-out path.
*
* - Clears the session cookie and redirects to the identity provider's
*   end-session endpoint.
* - When the identity provider redirects back with `?state=sign_out_success`,
*   calls `onSignOut`.
*
* Must be used after `thunderID()` middleware so that `req.thunderIDAuth` is set.
*
* ```ts
* app.get('/logout', handleSignOut());
* ```
*/
const handleSignOut = () => {
	return async (req, res) => {
		const client = req.thunderIDAuth;
		if (!client) {
			logger.error("thunderID() middleware must be mounted before handleSignOut()");
			res.status(500).end();
			return;
		}
		const config = client.expressConfig;
		const onSignOut = config?.onSignOut ?? ((r) => r.end());
		const onError = config?.onError ?? ((r, e) => {
			logger.error(e.message);
			r.status(500).end();
		});
		if (req.query.state === "sign_out_success") {
			onSignOut(res);
			return;
		}
		const sessionId = req.cookies?.[SESSION_COOKIE_NAME];
		if (!sessionId) {
			onError(res, new ThunderIDRuntimeError("No cookie found in the request", "EXPRESS-AUTH_MW-LOGOUT-NF01", "express"));
			return;
		}
		try {
			const signOutURL = await client.signOut(sessionId);
			if (signOutURL) {
				res.cookie(SESSION_COOKIE_NAME, null, { maxAge: 0 });
				res.redirect(signOutURL);
			}
		} catch (e) {
			onError(res, e);
		}
	};
};

//#endregion
//#region src/middleware/protect.ts
/**
* Returns Express middleware that blocks unauthenticated requests.
* Requires `thunderID()` to be mounted before this middleware so that
* `req.thunderIDAuth` is populated.
*
* @param onUnauthenticated - Called when the session is missing or invalid.
*   Defaults to sending a 401 response.
*/
const protect = (onUnauthenticated) => {
	return async (req, res, next) => {
		const client = req.thunderIDAuth;
		const sessionId = req.cookies?.[SESSION_COOKIE_NAME];
		const reject = () => {
			if (onUnauthenticated) onUnauthenticated(res);
			else res.status(401).end();
		};
		if (!client || !sessionId) {
			logger.error("No session ID found in the request cookies");
			reject();
			return;
		}
		if (await client.isSignedIn(sessionId) ?? false) return next();
		logger.error("Invalid session ID found in the request cookies");
		reject();
	};
};
var protect_default = protect;

//#endregion
//#region src/middleware/flow.ts
/**
* Returns an Express route handler that drives the embedded sign-in flow loop.
*
* Requires `thunderID()` middleware with `mode: 'embedded'` to be mounted first.
* On each POST, the handler advances the flow one step and returns JSON.
*
* **First call** — no `executionId`:
* ```json
* { "applicationId": "app-id", "flowType": "SIGN_IN" }
* ```
* Response includes `executionId`, `challengeToken`, `authId`, and `components`
* (the UI elements to render).
*
* **Subsequent calls** — continue the flow:
* ```json
* { "executionId": "...", "challengeToken": "...", "authId": "...", "inputs": { ... } }
* ```
*
* **On completion** — flow returns `{ "done": true, "redirectUrl": "/login?code=..." }`.
* The client navigates to `redirectUrl`, which is handled by `handleSignIn()` to
* exchange the code and set the session cookie.
*
* ```ts
* app.use(thunderID({ ..., mode: 'embedded' }));
* app.get('/login',          handleSignIn());
* app.post('/flow/sign-in',  handleFlow());
* app.get('/logout',         handleSignOut());
* ```
*/
const handleFlow = () => {
	return async (req, res) => {
		const client = req.thunderIDAuth;
		if (!client) {
			logger.error("thunderID() middleware must be mounted before handleFlow()");
			res.status(500).json({ error: "SDK not initialised" });
			return;
		}
		const baseUrl = client.expressConfig?.baseUrl;
		if (!baseUrl) {
			res.status(500).json({ error: "baseUrl is not configured" });
			return;
		}
		const { applicationId, flowType, executionId, challengeToken, authId, inputs } = req.body ?? {};
		try {
			let resolvedAuthId = authId;
			if (!executionId && !resolvedAuthId) {
				const authUrl = await client.getSignInUrl();
				resolvedAuthId = new URL(authUrl).searchParams.get("authId") ?? void 0;
			}
			const flowResponse = await executeEmbeddedSignInFlowV2({
				authId: resolvedAuthId,
				baseUrl,
				payload: executionId ? {
					action: "submit",
					challengeToken,
					executionId,
					inputs
				} : {
					applicationId,
					flowType: flowType ?? "SIGN_IN"
				}
			});
			if (flowResponse.redirectUrl) {
				res.json({
					done: true,
					redirectUrl: flowResponse.redirectUrl
				});
				return;
			}
			res.json({
				authId: resolvedAuthId,
				challengeToken: flowResponse.challengeToken,
				components: flowResponse.data?.meta?.components ?? [],
				executionId: flowResponse.executionId,
				flowStatus: flowResponse.flowStatus
			});
		} catch (e) {
			logger.error(e.message);
			res.status(500).json({ error: e.message ?? "Flow execution failed" });
		}
	};
};
var flow_default = handleFlow;

//#endregion
export { CookieConfig_default as CookieConfig, SESSION_COOKIE_NAME, ThunderIDExpressClient_default as ThunderIDExpressClient, flow_default as handleFlow, handleSignIn, handleSignOut, protect_default as protect, thunderID };