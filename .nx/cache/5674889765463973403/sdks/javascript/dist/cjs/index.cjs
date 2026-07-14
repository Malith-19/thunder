//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (all) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let jose = require("jose");
jose = __toESM(jose);

//#region src/constants/TokenConstants.ts
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
/**
* Constants related to OIDC token management and storage.
* This object contains configuration values and storage keys
* used in token validation and management processes.
*
* @remarks
* The constants are organized into two main sections:
* 1. SignatureValidation - Contains supported algorithms for token validation
* 2. Storage - Contains keys used for storing token-related data
*
* @example
* ```typescript
* // Using signature validation algorithms
* const algorithms = TokenConstants.SignatureValidation.SUPPORTED_ALGORITHMS;
*
* // Using storage keys
* const timerKey = TokenConstants.Storage.StorageKeys.REFRESH_TOKEN_TIMER;
* ```
*/
const TokenConstants = {
	SignatureValidation: { SUPPORTED_ALGORITHMS: [
		"RS256",
		"RS512",
		"RS384",
		"PS256"
	] },
	Storage: { StorageKeys: { REFRESH_TOKEN_TIMER: "refresh_token_timer" } }
};
var TokenConstants_default = TokenConstants;

//#endregion
//#region src/errors/exception.ts
/**
* Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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
/**
* @deprecated Use `ThunderIDRuntimeError` for runtime errors and `ThunderIDAPIError` for API errors.
*/
var ThunderIDAuthException = class {
	name;
	code;
	message;
	constructor(code, name, message) {
		this.message = message;
		this.name = name;
		this.code = code;
		Object.setPrototypeOf(this, new.target.prototype);
	}
};

//#endregion
//#region src/IsomorphicCrypto.ts
var IsomorphicCrypto = class {
	cryptoUtils;
	constructor(cryptoUtils) {
		this.cryptoUtils = cryptoUtils;
	}
	/**
	* Generate code verifier.
	*
	* @returns code verifier.
	*/
	getCodeVerifier() {
		return this.cryptoUtils.base64URLEncode(this.cryptoUtils.generateRandomBytes(32));
	}
	/**
	* Derive code challenge from the code verifier.
	*
	* @param verifier - Code verifier.
	*
	* @returns - code challenge.
	*/
	async getCodeChallenge(verifier) {
		const hashed = await this.cryptoUtils.hashSha256(verifier);
		return this.cryptoUtils.base64URLEncode(hashed);
	}
	/**
	* Get JWK used for the id_token
	*
	* @param jwtHeader - header of the id_token.
	* @param keys - jwks response.
	*
	* @returns public key.
	*
	* @throws
	*/
	getJWKForTheIdToken(jwtHeader, keys) {
		const headerJSON = JSON.parse(this.cryptoUtils.base64URLDecode(jwtHeader));
		const matchingKey = keys.find((key) => headerJSON["kid"] === key.kid);
		if (matchingKey) return matchingKey;
		throw new ThunderIDAuthException("JS-CRYPTO_UTIL-GJFTIT-IV01", "kid not found.", `Failed to find the 'kid' specified in the id_token. 'kid' found in the header : ${headerJSON["kid"]}, Expected values: ${keys.map((key) => key.kid).join(", ")}`);
	}
	/**
	* Verify id token.
	*
	* @param idToken - id_token received from the IdP.
	* @param jwk - public key used for signing.
	* @param clientId - app identification.
	* @param issuer - id_token issuer.
	* @param username - Username.
	* @param clockTolerance - Allowed leeway for id_tokens (in seconds).
	*
	* @returns whether the id_token is valid.
	*
	* @throws
	*/
	isValidIdToken(idToken, jwk, clientId, issuer, username, clockTolerance, validateJwtIssuer) {
		return this.cryptoUtils.verifyJwt(idToken, jwk, TokenConstants_default.SignatureValidation.SUPPORTED_ALGORITHMS, clientId, issuer, username, clockTolerance, validateJwtIssuer).then((response) => {
			if (response) return Promise.resolve(true);
			return Promise.reject(new ThunderIDAuthException("JS-CRYPTO_HELPER-IVIT-IV01", "Invalid ID token.", "ID token validation returned false"));
		}).catch((error$1) => Promise.reject(error$1));
	}
	decodeJwtToken(token) {
		try {
			const utf8String = this.cryptoUtils.base64URLDecode(token?.split(".")[1]);
			return JSON.parse(utf8String);
		} catch (error$1) {
			throw new ThunderIDAuthException("JS-CRYPTO_UTIL-DIT-IV02", "Decoding token failed.", error$1);
		}
	}
};

//#endregion
//#region src/errors/ThunderIDError.ts
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
/**
* Base class for all ThunderID errors. This class extends the native Error class
* and adds support for error codes and proper stack traces. Each error is prefixed
* with a lightning emoji and the SDK name for easy identification.
*
* @example
* ```typescript
* // Create a new error with a message and code
* throw new ThunderIDError(
*   "Invalid authentication response",
*   "AUTH_ERROR"
* );
*
* // Or with a specific SDK name
* throw new ThunderIDError(
*   "Invalid authentication response",
*   "AUTH_ERROR",
*   "@thunderid/react"
* );
*
* // The error message will be formatted as:
* // ⚡ ThunderID - @thunderid/react: Invalid authentication response
* //
* // (code="AUTH_ERROR")
*/
var ThunderIDError = class ThunderIDError extends Error {
	code;
	origin;
	static resolveOrigin(origin) {
		if (!origin) return "@thunderid/javascript";
		return `@thunderid/${origin}`;
	}
	constructor(message, code, origin) {
		const resolvedOrigin = ThunderIDError.resolveOrigin(origin);
		super(message);
		this.name = new.target.name;
		this.code = code;
		this.origin = resolvedOrigin;
		if (Error.captureStackTrace) Error.captureStackTrace(this, new.target);
	}
	toString() {
		const prefix = `⚡ ThunderID - ${this.origin}:`;
		return `[${this.name}]\n${prefix} ${this.message}\n(code="${this.code}")`;
	}
};

//#endregion
//#region src/utils/parseApiErrorMessage.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
/**
* Attempts to extract a human-readable message from a structured API error response body.
*
* The backend returns errors in the following form:
* {"code":"...","message":{"key":"...","defaultValue":"..."},"description":{"key":"...","defaultValue":"..."}}
*
* Returns `description.defaultValue` if present, then `message.defaultValue`, and falls back
* to the raw `errorText` when the response is not a recognised structured error.
*/
const parseApiErrorMessage = (errorText) => {
	try {
		const parsed = JSON.parse(errorText);
		const description = parsed["description"];
		const message = parsed["message"];
		if (description?.defaultValue) return description.defaultValue;
		if (message?.defaultValue) return message.defaultValue;
	} catch {}
	return errorText;
};
var parseApiErrorMessage_default = parseApiErrorMessage;

//#endregion
//#region src/errors/ThunderIDAPIError.ts
/**
* Base class for all API-related errors in ThunderID. This class extends ThunderIDError
* and adds support for HTTP status codes and status text.
*
* The `message` parameter may be either a plain string or a raw JSON error body from the
* ThunderID API — the constructor will extract a human-readable message automatically.
* An optional `prefix` is prepended to the resolved message (e.g. "Failed to fetch user profile").
*
* @example
* ```typescript
* throw new ThunderIDAPIError(
*   "Failed to fetch user data",
*   "API_FETCH_ERROR",
*   "javascript",
*   404,
*   "Not Found"
* );
* ```
*/
var ThunderIDAPIError = class extends ThunderIDError {
	/**
	* Creates an instance of ThunderIDAPIError.
	*
	* @param message - Human-readable description or raw API error response body
	* @param code - A unique error code that identifies the error type
	* @param origin - The SDK origin (e.g. 'react', 'vue')
	* @param statusCode - HTTP status code of the failed request
	* @param statusText - HTTP status text of the failed request
	* @param prefix - Optional prefix prepended to the resolved message
	* @constructor
	*/
	constructor(message, code, origin, statusCode, statusText, prefix) {
		const parsed = parseApiErrorMessage_default(message);
		const resolvedMessage = prefix ? `${prefix}: ${parsed}` : parsed;
		super(resolvedMessage, code, origin);
		this.statusCode = statusCode;
		this.statusText = statusText;
		Object.defineProperty(this, "name", {
			configurable: true,
			value: "ThunderIDAPIError",
			writable: true
		});
	}
	/**
	* Returns a string representation of the API error
	* @returns Formatted error string with name, code, status, and message
	*/
	toString() {
		const status = this.statusCode ? ` (HTTP ${this.statusCode} - ${this.statusText})` : "";
		return `[${this.name}] (code="${this.code}")${status}\nMessage: ${this.message}`;
	}
};

//#endregion
//#region src/api/initializeEmbeddedSignInFlow.ts
/**
* Sends an authorization request to the specified OAuth2/OIDC authorization endpoint.
*
* @param requestConfig - Request configuration object containing URL and payload.
* @returns A promise that resolves with the authorization response.
* @throws ThunderIDAPIError when the request fails or URL is invalid.
*
* @example
* ```typescript
* try {
*   const authResponse = await initializeEmbeddedSignInFlow({
*     url: "https://localhost:8090/oauth2/authorize",
*     payload: {
*       response_type: "code",
*       client_id: "your-client-id",
*       redirect_uri: "https://your-app.com/callback",
*       scope: "openid profile email",
*       state: "random-state-value",
*       code_challenge: "your-pkce-challenge",
*       code_challenge_method: "S256"
*     }
*   });
*   console.log(authResponse);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Authorization failed:', error.message);
*   }
* }
* ```
*/
const initializeEmbeddedSignInFlow = async ({ url, baseUrl, payload,...requestConfig }) => {
	try {
		new URL(url ?? baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid URL provided. ${error$1?.toString()}`, "getSchemas-ValidationError-001", "javascript", 400, "The provided `url` or `baseUrl` path does not adhere to the URL schema.");
	}
	if (!payload) throw new ThunderIDAPIError("Authorization payload is required", "initializeEmbeddedSignInFlow-ValidationError-002", "javascript", 400, "If an authorization payload is not provided, the request cannot be constructed correctly.");
	const searchParams = new URLSearchParams();
	Object.entries(payload).forEach(([key, value]) => {
		if (value !== void 0 && value !== null) searchParams.append(key, String(value));
	});
	try {
		const response = await fetch(url ?? `${baseUrl}/oauth2/authorize`, {
			...requestConfig,
			body: searchParams.toString(),
			headers: {
				...requestConfig.headers,
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: requestConfig.method || "POST"
		});
		if (!response.ok) throw new ThunderIDAPIError(await response.text(), "initializeEmbeddedSignInFlow-ResponseError-001", "javascript", response.status, response.statusText, "Authorization request failed");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "initializeEmbeddedSignInFlow-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var initializeEmbeddedSignInFlow_default = initializeEmbeddedSignInFlow;

//#endregion
//#region src/api/executeEmbeddedSignInFlow.ts
const executeEmbeddedSignInFlow = async ({ url, baseUrl, payload,...requestConfig }) => {
	try {
		new URL(url ?? baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid URL provided. ${error$1?.toString()}`, "executeEmbeddedSignInFlow-ValidationError-001", "javascript", 400, "The provided `url` or `baseUrl` path does not adhere to the URL schema.");
	}
	if (!payload) throw new ThunderIDAPIError("Authorization payload is required", "executeEmbeddedSignInFlow-ValidationError-002", "javascript", 400, "If an authorization payload is not provided, the request cannot be constructed correctly.");
	try {
		const response = await fetch(url ?? `${baseUrl}/oauth2/authn`, {
			...requestConfig,
			body: JSON.stringify(payload),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				...requestConfig.headers
			},
			method: requestConfig.method || "POST"
		});
		if (!response.ok) throw new ThunderIDAPIError(await response.text(), "initializeEmbeddedSignInFlow-ResponseError-001", "javascript", response.status, response.statusText, "Authorization request failed");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "executeEmbeddedSignInFlow-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var executeEmbeddedSignInFlow_default = executeEmbeddedSignInFlow;

//#endregion
//#region src/models/embedded-flow.ts
/**
* Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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
let EmbeddedFlowType = /* @__PURE__ */ function(EmbeddedFlowType$1) {
	EmbeddedFlowType$1["Authentication"] = "AUTHENTICATION";
	EmbeddedFlowType$1["Recovery"] = "RECOVERY";
	EmbeddedFlowType$1["Registration"] = "REGISTRATION";
	EmbeddedFlowType$1["UserOnboarding"] = "USER_ONBOARDING";
	return EmbeddedFlowType$1;
}({});
let EmbeddedFlowStatus = /* @__PURE__ */ function(EmbeddedFlowStatus$1) {
	EmbeddedFlowStatus$1["Complete"] = "COMPLETE";
	EmbeddedFlowStatus$1["Incomplete"] = "INCOMPLETE";
	return EmbeddedFlowStatus$1;
}({});
let EmbeddedFlowResponseType = /* @__PURE__ */ function(EmbeddedFlowResponseType$1) {
	EmbeddedFlowResponseType$1["Redirection"] = "REDIRECTION";
	EmbeddedFlowResponseType$1["View"] = "VIEW";
	return EmbeddedFlowResponseType$1;
}({});
let EmbeddedFlowComponentType = /* @__PURE__ */ function(EmbeddedFlowComponentType$2) {
	EmbeddedFlowComponentType$2["Button"] = "BUTTON";
	EmbeddedFlowComponentType$2["Checkbox"] = "CHECKBOX";
	EmbeddedFlowComponentType$2["Divider"] = "DIVIDER";
	EmbeddedFlowComponentType$2["Form"] = "FORM";
	EmbeddedFlowComponentType$2["Image"] = "IMAGE";
	EmbeddedFlowComponentType$2["Input"] = "INPUT";
	EmbeddedFlowComponentType$2["Radio"] = "RADIO";
	EmbeddedFlowComponentType$2["Select"] = "SELECT";
	EmbeddedFlowComponentType$2["Typography"] = "TYPOGRAPHY";
	return EmbeddedFlowComponentType$2;
}({});

//#endregion
//#region src/api/executeEmbeddedSignUpFlow.ts
/**
* Executes an embedded signup flow by sending a request to the specified flow execution endpoint.
*
* @param requestConfig - Request configuration object containing URL and payload.
* @returns A promise that resolves with the flow execution response.
* @throws ThunderIDAPIError when the request fails or URL is invalid.
*
* @example
* ```typescript
* try {
*   const embeddedSignUpResponse = await executeEmbeddedSignUpFlow({
*     url: "https://localhost:8090/api/server/v1/flow/execute",
*     payload: {
*       flowType: "REGISTRATION"
*     }
*   });
*   console.log(embeddedSignUpResponse);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Embedded SignUp flow execution failed:', error.message);
*   }
* }
* ```
*/
const executeEmbeddedSignUpFlow = async ({ url, baseUrl, payload,...requestConfig }) => {
	if (!baseUrl && !url) throw new ThunderIDAPIError("Embedded SignUp flow execution failed: Base URL or URL is not provided.", "javascript-executeEmbeddedSignUpFlow-ValidationError-001", "javascript", 400, "At least one of the baseUrl or url must be provided to execute the embedded sign up flow.");
	try {
		new URL(url ?? baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid URL provided. ${error$1?.toString()}`, "executeEmbeddedSignUpFlow-ValidationError-001", "javascript", 400, "The provided `url` or `baseUrl` path does not adhere to the URL schema.");
	}
	try {
		const response = await fetch(url ?? `${baseUrl}/api/server/v1/flow/execute`, {
			...requestConfig,
			body: JSON.stringify({
				...payload ?? {},
				flowType: EmbeddedFlowType.Registration
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				...requestConfig.headers
			},
			method: requestConfig.method || "POST"
		});
		if (!response.ok) throw new ThunderIDAPIError(await response.text(), "javascript-executeEmbeddedSignUpFlow-ResponseError-100", "javascript", response.status, response.statusText, "Embedded SignUp flow execution failed");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "executeEmbeddedSignUpFlow-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var executeEmbeddedSignUpFlow_default = executeEmbeddedSignUpFlow;

//#endregion
//#region src/api/getUserInfo.ts
/**
* Retrieves the user information from the specified OIDC userinfo endpoint.
*
* @param requestConfig - Request configuration object.
* @returns A promise that resolves with the user information.
* @throw
*   const userInfo = await getUserInfo({
*     url: "https://localhost:8090/oauth2/userinfo",
*   });
*   console.log(userInfo);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get user info:', error.message);
*   }
* }
* ```
*/
const getUserInfo = async ({ url,...requestConfig }) => {
	try {
		new URL(url);
	} catch (error$1) {
		throw new ThunderIDAPIError("Invalid endpoint URL provided", "getUserInfo-ValidationError-001", "javascript", 400, "Invalid Request");
	}
	try {
		const response = await fetch(url, {
			...requestConfig,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				...requestConfig.headers
			},
			method: "GET"
		});
		if (!response.ok) throw new ThunderIDAPIError(await response.text(), "getUserInfo-ResponseError-001", "javascript", response.status, response.statusText, "Failed to fetch user info");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "getUserInfo-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var getUserInfo_default = getUserInfo;

//#endregion
//#region src/utils/processUsername.ts
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
/**
* Regular expression to match userstore prefixes in usernames.
* Matches patterns like "DEFAULT/", "ASGARDEO_USER/", "PRIMARY/", etc.
* The pattern matches any uppercase letters, numbers, and underscores followed by a forward slash.
*/
const USERSTORE_PREFIX_REGEX = /^[A-Z_][A-Z0-9_]*\//;
/**
* Removes userstore prefixes from a username if they exist.
* This is commonly used to clean usernames returned from SCIM2 endpoints
* that include userstore prefixes like "DEFAULT/", "ASGARDEO_USER/", "PRIMARY/", etc.
*
* @param username - The username string to process
* @returns The username without the userstore prefix, or the original username if no prefix exists
*
* @example
* ```typescript
* const cleanUsername = removeUserstorePrefix("DEFAULT/john.doe");
* console.log(cleanUsername); // "john.doe"
*
* const thunderidUser = removeUserstorePrefix("ASGARDEO_USER/jane.doe");
* console.log(thunderidUser); // "jane.doe"
*
* const primaryUser = removeUserstorePrefix("PRIMARY/admin");
* console.log(primaryUser); // "admin"
*
* const alreadyClean = removeUserstorePrefix("user.name");
* console.log(alreadyClean); // "user.name"
*
* const emptyInput = removeUserstorePrefix("");
* console.log(emptyInput); // ""
* ```
*/
const removeUserstorePrefix = (username) => {
	if (!username) return "";
	return username.replace(USERSTORE_PREFIX_REGEX, "");
};
/**
* Processes a user object to remove userstore prefixes from username fields.
* This is a helper function for processing user objects returned from SCIM2 endpoints.
* Handles various username field variations: username, userName, and user_name.
*
* @param user - The user object to process
* @returns The user object with processed username fields
*
* @example
* ```typescript
* const user = { username: "DEFAULT/john.doe", email: "john@example.com" };
* const processedUser = processUserUsername(user);
* console.log(processedUser.username); // "john.doe"
*
* const camelCaseUser = { userName: "ASGARDEO_USER/jane.doe", email: "jane@example.com" };
* const processedCamelCaseUser = processUserUsername(camelCaseUser);
* console.log(processedCamelCaseUser.userName); // "jane.doe"
*
* const snakeCaseUser = { user_name: "PRIMARY/admin", email: "admin@example.com" };
* const processedSnakeCaseUser = processUserUsername(snakeCaseUser);
* console.log(processedSnakeCaseUser.user_name); // "admin"
* ```
*/
const processUsername = (user) => {
	if (!user) return user;
	const processedUser = { ...user };
	if (processedUser.username) processedUser.username = removeUserstorePrefix(processedUser.username);
	if (processedUser.userName) processedUser.userName = removeUserstorePrefix(processedUser.userName);
	if (processedUser.user_name) processedUser.user_name = removeUserstorePrefix(processedUser.user_name);
	return processedUser;
};
var processUsername_default = processUsername;

//#endregion
//#region src/api/getScim2Me.ts
/**
* Retrieves the user profile information from the specified SCIM2 /Me endpoint.
*
* @param config - Request configuration object.
* @returns A promise that resolves with the user profile information.
* @example
* ```typescript
* // Using default fetch
* try {
*   const userProfile = await getScim2Me({
*     url: "https://localhost:8090/scim2/Me",
*   });
*   console.log(userProfile);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get user profile:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* try {
*   const userProfile = await getScim2Me({
*     url: "https://localhost:8090/scim2/Me",
*     fetcher: async (url, config) => {
*       const response = await httpClient({
*         url,
*         method: config.method,
*         headers: config.headers,
*         ...config
*       });
*       // Convert axios-like response to fetch-like Response
*       return {
*         ok: response.status >= 200 && response.status < 300,
*         status: response.status,
*         statusText: response.statusText,
*         json: () => Promise.resolve(response.data),
*         text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*       } as Response;
*     }
*   });
*   console.log(userProfile);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get user profile:', error.message);
*   }
* }
* ```
*/
const getScim2Me = async ({ url, baseUrl, fetcher,...requestConfig }) => {
	try {
		new URL(url ?? baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid URL provided. ${error$1?.toString()}`, "getScim2Me-ValidationError-001", "javascript", 400, "The provided `url` or `baseUrl` path does not adhere to the URL schema.");
	}
	const fetchFn = fetcher || fetch;
	const resolvedUrl = url ?? `${baseUrl}/scim2/Me`;
	const requestInit = {
		...requestConfig,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/scim+json",
			...requestConfig.headers
		},
		method: "GET"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "getScim2Me-ResponseError-001", "javascript", response.status, response.statusText, "Failed to fetch user profile");
		return processUsername_default(await response.json());
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "getScim2Me-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var getScim2Me_default = getScim2Me;

//#endregion
//#region src/api/getSchemas.ts
/**
* Retrieves the SCIM2 schemas from the specified endpoint.
*
* @param config - Request configuration object.
* @returns A promise that resolves with the SCIM2 schemas information.
* @example
* ```typescript
* // Using default fetch
* try {
*   const schemas = await getSchemas({
*     url: "https://localhost:8090/scim2/Schemas",
*   });
*   console.log(schemas);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get schemas:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* try {
*   const schemas = await getSchemas({
*     url: "https://localhost:8090/scim2/Schemas",
*     fetcher: async (url, config) => {
*       const response = await httpClient({
*         url,
*         method: config.method,
*         headers: config.headers,
*         ...config
*       });
*       // Convert axios-like response to fetch-like Response
*       return {
*         ok: response.status >= 200 && response.status < 300,
*         status: response.status,
*         statusText: response.statusText,
*         json: () => Promise.resolve(response.data),
*         text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*       } as Response;
*     }
*   });
*   console.log(schemas);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get schemas:', error.message);
*   }
* }
* ```
*/
const getSchemas = async ({ url, baseUrl, fetcher,...requestConfig }) => {
	try {
		new URL(url ?? baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid URL provided. ${error$1?.toString()}`, "getSchemas-ValidationError-001", "javascript", 400, "The provided `url` or `baseUrl` path does not adhere to the URL schema.");
	}
	const fetchFn = fetcher || fetch;
	const resolvedUrl = url ?? `${baseUrl}/scim2/Schemas`;
	const requestInit = {
		...requestConfig,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: "GET"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "getSchemas-ResponseError-001", "javascript", response.status, response.statusText, "Failed to fetch SCIM2 schemas");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "getSchemas-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var getSchemas_default = getSchemas;

//#endregion
//#region src/api/getAllOrganizations.ts
/**
* Retrieves all organizations with pagination support.
*
* @param config - Configuration object containing baseUrl, optional query parameters, and request config.
* @returns A promise that resolves with the paginated organizations information.
* @example
* ```typescript
* // Using default fetch
* try {
*   const response = await getAllOrganizations({
*     baseUrl: "https://localhost:8090",
*     filter: "",
*     limit: 10,
*     recursive: false
*   });
*   console.log(response.organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* try {
*   const response = await getAllOrganizations({
*     baseUrl: "https://localhost:8090",
*     filter: "",
*     limit: 10,
*     recursive: false,
*     fetcher: async (url, config) => {
*       const response = await httpClient({
*         url,
*         method: config.method,
*         headers: config.headers,
*         ...config
*       });
*       // Convert axios-like response to fetch-like Response
*       return {
*         ok: response.status >= 200 && response.status < 300,
*         status: response.status,
*         statusText: response.statusText,
*         json: () => Promise.resolve(response.data),
*         text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*       } as Response;
*     }
*   });
*   console.log(response.organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*/
const getAllOrganizations = async ({ baseUrl, filter = "", limit = 10, recursive = false, fetcher,...requestConfig }) => {
	try {
		new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid base URL provided. ${error$1?.toString()}`, "getAllOrganizations-ValidationError-001", "javascript", 400, "The provided `baseUrl` does not adhere to the URL schema.");
	}
	const queryParams = new URLSearchParams(Object.fromEntries(Object.entries({
		filter,
		limit: limit.toString(),
		recursive: recursive.toString()
	}).filter(([, value]) => Boolean(value))));
	const fetchFn = fetcher || fetch;
	const resolvedUrl = `${baseUrl}/api/server/v1/organizations?${queryParams.toString()}`;
	const requestInit = {
		...requestConfig,
		headers: {
			...requestConfig.headers,
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "GET"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "getAllOrganizations-ResponseError-001", "javascript", response.status, response.statusText, "Failed to get organizations");
		const data = await response.json();
		return {
			hasMore: data.hasMore,
			nextCursor: data.nextCursor,
			organizations: data.organizations || [],
			totalCount: data.totalCount
		};
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "getAllOrganizations-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var getAllOrganizations_default = getAllOrganizations;

//#endregion
//#region src/api/createOrganization.ts
/**
* Creates a new organization.
*
* @param config - Configuration object containing baseUrl, payload and optional request config.
* @returns A promise that resolves with the created organization information.
* @example
* ```typescript
* // Using default fetch
* try {
*   const organization = await createOrganization({
*     baseUrl: "https://localhost:8090",
*     payload: {
*       description: "Share your screens",
*       name: "Team Viewer",
*       orgHandle: "team-viewer",
*       parentId: "f4825104-4948-40d9-ab65-a960eee3e3d5",
*       type: "TENANT"
*     }
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to create organization:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* try {
*   const organization = await createOrganization({
*     baseUrl: "https://localhost:8090",
*     payload: {
*       description: "Share your screens",
*       name: "Team Viewer",
*       orgHandle: "team-viewer",
*       parentId: "f4825104-4948-40d9-ab65-a960eee3e3d5",
*       type: "TENANT"
*     },
*     fetcher: async (url, config) => {
*       const response = await httpClient({
*         url,
*         method: config.method,
*         headers: config.headers,
*         data: config.body,
*         ...config
*       });
*       // Convert axios-like response to fetch-like Response
*       return {
*         ok: response.status >= 200 && response.status < 300,
*         status: response.status,
*         statusText: response.statusText,
*         json: () => Promise.resolve(response.data),
*         text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*       } as Response;
*     }
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to create organization:', error.message);
*   }
* }
* ```
*/
const createOrganization = async ({ baseUrl, payload, fetcher,...requestConfig }) => {
	try {
		new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid base URL provided. ${error$1?.toString()}`, "createOrganization-ValidationError-001", "javascript", 400, "The provided `baseUrl` does not adhere to the URL schema.");
	}
	if (!payload) throw new ThunderIDAPIError("Organization payload is required", "createOrganization-ValidationError-002", "javascript", 400, "Invalid Request");
	const organizationPayload = {
		...payload,
		type: "TENANT"
	};
	const fetchFn = fetcher || fetch;
	const resolvedUrl = `${baseUrl}/api/server/v1/organizations`;
	const requestInit = {
		...requestConfig,
		body: JSON.stringify(organizationPayload),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: "POST"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "createOrganization-ResponseError-001", "javascript", response.status, response.statusText, "Failed to create organization");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "createOrganization-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var createOrganization_default = createOrganization;

//#endregion
//#region src/api/getMeOrganizations.ts
/**
* Retrieves the organizations associated with the current user.
*
* @param config - Configuration object containing baseUrl, optional query parameters, and request config.
* @returns A promise that resolves with the organizations information.
* @example
* ```typescript
* // Using default fetch
* try {
*   const organizations = await getMeOrganizations({
*     baseUrl: "https://localhost:8090",
*     after: "",
*     before: "",
*     filter: "",
*     limit: 10,
*     recursive: false
*   });
*   console.log(organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* try {
*   const organizations = await getMeOrganizations({
*     baseUrl: "https://localhost:8090",
*     after: "",
*     before: "",
*     filter: "",
*     limit: 10,
*     recursive: false,
*     fetcher: async (url, config) => {
*       const response = await httpClient({
*         url,
*         method: config.method,
*         headers: config.headers,
*         ...config
*       });
*       // Convert axios-like response to fetch-like Response
*       return {
*         ok: response.status >= 200 && response.status < 300,
*         status: response.status,
*         statusText: response.statusText,
*         json: () => Promise.resolve(response.data),
*         text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*       } as Response;
*     }
*   });
*   console.log(organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*/
const getMeOrganizations = async ({ baseUrl, after = "", authorizedAppName = "", before = "", filter = "", limit = 10, recursive = false, fetcher,...requestConfig }) => {
	try {
		new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid base URL provided. ${error$1?.toString()}`, "getMeOrganizations-ValidationError-001", "javascript", 400, "The provided `baseUrl` does not adhere to the URL schema.");
	}
	const queryParams = new URLSearchParams(Object.fromEntries(Object.entries({
		after,
		authorizedAppName,
		before,
		filter,
		limit: limit.toString(),
		recursive: recursive.toString()
	}).filter(([, value]) => Boolean(value))));
	const fetchFn = fetcher || fetch;
	const resolvedUrl = `${baseUrl}/api/users/v1/me/organizations?${queryParams.toString()}`;
	const requestInit = {
		...requestConfig,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: "GET"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "getMeOrganizations-ResponseError-001", "javascript", response.status, response.statusText, "Failed to fetch associated organizations of the user");
		return (await response.json())["organizations"] || [];
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "getMeOrganizations-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var getMeOrganizations_default = getMeOrganizations;

//#endregion
//#region src/api/getOrganization.ts
/**
* Retrieves detailed information for a specific organization.
*
* @param config - Configuration object containing baseUrl, organizationId, and request config.
* @returns A promise that resolves with the organization details.
* @example
* ```typescript
* // Using default fetch
* try {
*   const organization = await getOrganization({
*     baseUrl: "https://localhost:8090",
*     organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organization:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* try {
*   const organization = await getOrganization({
*     baseUrl: "https://localhost:8090",
*     organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*     fetcher: async (url, config) => {
*       const response = await httpClient({
*         url,
*         method: config.method,
*         headers: config.headers,
*         ...config
*       });
*       // Convert axios-like response to fetch-like Response
*       return {
*         ok: response.status >= 200 && response.status < 300,
*         status: response.status,
*         statusText: response.statusText,
*         json: () => Promise.resolve(response.data),
*         text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*       } as Response;
*     }
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organization:', error.message);
*   }
* }
* ```
*/
const getOrganization = async ({ baseUrl, organizationId, fetcher,...requestConfig }) => {
	try {
		new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid base URL provided. ${error$1?.toString()}`, "getOrganization-ValidationError-001", "javascript", 400, "The provided `baseUrl` does not adhere to the URL schema.");
	}
	if (!organizationId) throw new ThunderIDAPIError("Organization ID is required", "getOrganization-ValidationError-002", "javascript", 400, "Invalid Request");
	const fetchFn = fetcher || fetch;
	const resolvedUrl = `${baseUrl}/api/server/v1/organizations/${organizationId}`;
	const requestInit = {
		...requestConfig,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: "GET"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "getOrganization-ResponseError-001", "javascript", response.status, response.statusText, "Failed to fetch organization details");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "getOrganization-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var getOrganization_default = getOrganization;

//#endregion
//#region src/utils/isEmpty.ts
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
/**
* Checks if a value is considered empty.
*
* A value is considered empty if it is:
* - null
* - undefined
* - empty string ("")
* - string containing only whitespace characters
* - empty array ([])
* - empty object ({})
*
* @param value - The value to check
* @returns true if the value is empty, false otherwise
*
* @example
* ```typescript
* isEmpty(null);              // true
* isEmpty(undefined);         // true
* isEmpty("");                // true
* isEmpty("   ");             // true
* isEmpty("hello");           // false
* isEmpty([]);                // true
* isEmpty([1, 2, 3]);         // false
* isEmpty({});                // true
* isEmpty({ name: "John" });  // false
* isEmpty(0);                 // false
* isEmpty(false);             // false
* ```
*/
const isEmpty = (value) => {
	if (value === null || value === void 0) return true;
	if (typeof value === "string") return value.trim() === "";
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === "object" && value.constructor === Object) return Object.keys(value).length === 0;
	return false;
};
var isEmpty_default = isEmpty;

//#endregion
//#region src/api/updateOrganization.ts
/**
* Updates the organization information using the Organizations Management API.
*
* @param config - Configuration object with baseUrl, organizationId, operations and optional request config.
* @returns A promise that resolves with the updated organization information.
* @example
* ```typescript
* // Using the helper function to create operations automatically
* const operations = createPatchOperations({
*   name: "Updated Organization Name",      // Will use REPLACE
*   description: "",                        // Will use REMOVE (empty string)
*   customField: "Some value"              // Will use REPLACE
* });
*
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations
* });
*
* // Or manually specify operations
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations: [
*     { operation: "REPLACE", path: "/name", value: "Updated Organization Name" },
*     { operation: "REMOVE", path: "/description" }
*   ]
* });
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations: [
*     { operation: "REPLACE", path: "/name", value: "Updated Organization Name" }
*   ],
*   fetcher: async (url, config) => {
*     const response = await httpClient({
*       url,
*       method: config.method,
*       headers: config.headers,
*       data: config.body,
*       ...config
*     });
*     // Convert axios-like response to fetch-like Response
*     return {
*       ok: response.status >= 200 && response.status < 300,
*       status: response.status,
*       statusText: response.statusText,
*       json: () => Promise.resolve(response.data),
*       text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*     } as Response;
*   }
* });
* ```
*/
const updateOrganization = async ({ baseUrl, organizationId, operations, fetcher,...requestConfig }) => {
	try {
		new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid base URL provided. ${error$1?.toString()}`, "updateOrganization-ValidationError-001", "javascript", 400, "The provided `baseUrl` does not adhere to the URL schema.");
	}
	if (!organizationId) throw new ThunderIDAPIError("Organization ID is required", "updateOrganization-ValidationError-002", "javascript", 400, "Invalid Request");
	if (!operations || !Array.isArray(operations) || operations.length === 0) throw new ThunderIDAPIError("Operations array is required and cannot be empty", "updateOrganization-ValidationError-003", "javascript", 400, "Invalid Request");
	const fetchFn = fetcher || fetch;
	const resolvedUrl = `${baseUrl}/api/server/v1/organizations/${organizationId}`;
	const requestInit = {
		...requestConfig,
		body: JSON.stringify(operations),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: "PATCH"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "updateOrganization-ResponseError-001", "javascript", response.status, response.statusText, "Failed to update organization");
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "updateOrganization-NetworkError-001", "javascript", 0, "Network Error");
	}
};
/**
* Helper function to convert field updates to patch operations format.
* Uses REMOVE operation when the value is empty, otherwise uses REPLACE.
*
* @param payload - Object containing field updates
* @returns Array of patch operations
*/
const createPatchOperations = (payload) => Object.entries(payload).map(([key, value]) => {
	if (isEmpty_default(value)) return {
		operation: "REMOVE",
		path: `/${key}`
	};
	return {
		operation: "REPLACE",
		path: `/${key}`,
		value
	};
});
var updateOrganization_default = updateOrganization;

//#endregion
//#region src/api/updateMeProfile.ts
/**
* Updates the user profile information at the specified SCIM2 Me endpoint.
*
* @param config - Configuration object with URL, payload and optional request config.
* @returns A promise that resolves with the updated user profile information.
* @example
* ```typescript
* // Using default fetch
* await updateMeProfile({
*   url: "https://localhost:8090/scim2/Me",
*   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } }
* });
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* await updateMeProfile({
*   url: "https://localhost:8090/scim2/Me",
*   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } },
*   fetcher: async (url, config) => {
*     const response = await httpClient({
*       url,
*       method: config.method,
*       headers: config.headers,
*       data: config.body,
*       ...config
*     });
*     // Convert axios-like response to fetch-like Response
*     return {
*       ok: response.status >= 200 && response.status < 300,
*       status: response.status,
*       statusText: response.statusText,
*       json: () => Promise.resolve(response.data),
*       text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*     } as Response;
*   }
* });
* ```
*/
const updateMeProfile = async ({ url, baseUrl, payload, fetcher,...requestConfig }) => {
	try {
		new URL(url ?? baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid URL provided. ${error$1?.toString()}`, "updateMeProfile-ValidationError-001", "javascript", 400, "The provided `url` or `baseUrl` path does not adhere to the URL schema.");
	}
	const data = {
		Operations: [{
			op: "replace",
			value: payload
		}],
		schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]
	};
	const fetchFn = fetcher || fetch;
	const resolvedUrl = url ?? `${baseUrl}/scim2/Me`;
	const requestInit = {
		method: "PATCH",
		...requestConfig,
		body: JSON.stringify(data),
		headers: {
			...requestConfig.headers,
			Accept: "application/json",
			"Content-Type": "application/scim+json"
		}
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) throw new ThunderIDAPIError(await response.text(), "updateMeProfile-ResponseError-001", "javascript", response.status, response.statusText, "Failed to update user profile");
		return processUsername_default(await response.json());
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(error$1?.response?.data?.detail || "An error occurred while updating the user profile. Please try again.", "updateMeProfile-NetworkError-001", "javascript", error$1?.data?.status, "Network Error");
	}
};
var updateMeProfile_default = updateMeProfile;

//#endregion
//#region src/models/platforms.ts
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
/**
* Enumeration of supported identity platforms.
*
* - `ThunderID`: Represents the ThunderID identity platform.
* - `IdentityServer`: Represents WSO2 Identity Server (on-prem or custom domains).
* - `Unknown`: Used when the platform cannot be determined from the configuration.
*/
let Platform = /* @__PURE__ */ function(Platform$1) {
	/** ThunderID identity platform */
	Platform$1["ThunderID"] = "THUNDERID";
	/** WSO2 Identity Server (on-prem or custom domains) */
	Platform$1["IdentityServer"] = "IDENTITY_SERVER";
	/** Unknown or unsupported platform */
	Platform$1["Unknown"] = "UNKNOWN";
	return Platform$1;
}({});

//#endregion
//#region src/utils/logger.ts
const PREFIX = "⚡ ThunderID";
/**
* Default logger configuration
*/
const DEFAULT_CONFIG$1 = {
	level: "info",
	prefix: `${PREFIX}`,
	showLevel: true,
	timestamps: true
};
/**
* Environment detection utilities
*/
const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const isNode = () => typeof process !== "undefined" && process.versions && process.versions.node;
/**
* Color codes for terminal output (Node.js)
*/
const COLORS = {
	blue: "\x1B[34m",
	bright: "\x1B[1m",
	cyan: "\x1B[36m",
	dim: "\x1B[2m",
	gray: "\x1B[90m",
	green: "\x1B[32m",
	magenta: "\x1B[35m",
	red: "\x1B[31m",
	reset: "\x1B[0m",
	white: "\x1B[37m",
	yellow: "\x1B[33m"
};
/**
* Browser console styling
*/
const BROWSER_STYLES = {
	debug: "color: #6b7280; font-weight: normal;",
	error: "color: #dc2626; font-weight: bold;",
	info: "color: #2563eb; font-weight: bold;",
	prefix: "color: #7c3aed; font-weight: bold;",
	timestamp: "color: #6b7280; font-size: 0.9em;",
	warn: "color: #d97706; font-weight: bold;"
};
const LOG_LEVEL_ORDER = {
	debug: 0,
	error: 3,
	info: 1,
	warn: 2
};
/**
* Universal logger class that works in both browser and Node.js environments
*/
var Logger = class Logger {
	config;
	constructor(config = {}) {
		this.config = {
			...DEFAULT_CONFIG$1,
			...config
		};
	}
	/**
	* Update logger configuration
	*/
	configure(config) {
		this.config = {
			...this.config,
			...config
		};
	}
	/**
	* Get current configuration
	*/
	getConfig() {
		return { ...this.config };
	}
	/**
	* Check if a log level should be output
	*/
	shouldLog(level) {
		return LOG_LEVEL_ORDER[level] >= LOG_LEVEL_ORDER[this.config.level];
	}
	/**
	* Get timestamp string
	*/
	static getTimestamp() {
		return (/* @__PURE__ */ new Date()).toISOString();
	}
	/**
	* Get log level string
	*/
	static getLevelString(level) {
		switch (level) {
			case "debug": return "DEBUG";
			case "info": return "INFO";
			case "warn": return "WARN";
			case "error": return "ERROR";
			default: return "UNKNOWN";
		}
	}
	/**
	* Format message for Node.js terminal
	*/
	formatForNode(level, message) {
		const parts = [];
		if (this.config.timestamps) parts.push(`${COLORS.gray}[${Logger.getTimestamp()}]${COLORS.reset}`);
		if (this.config.prefix) parts.push(`${COLORS.magenta}${this.config.prefix}${COLORS.reset}`);
		if (this.config.showLevel) {
			const levelStr = Logger.getLevelString(level);
			let coloredLevel;
			switch (level) {
				case "debug":
					coloredLevel = `${COLORS.gray}[${levelStr}]${COLORS.reset}`;
					break;
				case "info":
					coloredLevel = `${COLORS.blue}[${levelStr}]${COLORS.reset}`;
					break;
				case "warn":
					coloredLevel = `${COLORS.yellow}[${levelStr}]${COLORS.reset}`;
					break;
				case "error":
					coloredLevel = `${COLORS.red}[${levelStr}]${COLORS.reset}`;
					break;
				default: coloredLevel = `[${levelStr}]`;
			}
			parts.push(coloredLevel);
		}
		parts.push(message);
		return parts.join(" ");
	}
	/**
	* Log message using appropriate method
	*/
	logMessage(level, message, ...args) {
		if (!this.shouldLog(level)) return;
		if (this.config.formatter) {
			this.config.formatter(level, message, ...args);
			return;
		}
		if (isBrowser()) this.logToBrowser(level, message, ...args);
		else if (isNode()) this.logToNode(level, message, ...args);
		else console.log(message, ...args);
	}
	/**
	* Log to browser console with styling
	*/
	logToBrowser(level, message, ...args) {
		const parts = [];
		const styles = [];
		if (this.config.timestamps) {
			parts.push(`%c[${Logger.getTimestamp()}]`);
			styles.push(BROWSER_STYLES.timestamp);
		}
		if (this.config.prefix) {
			parts.push(`%c${this.config.prefix}`);
			styles.push(BROWSER_STYLES.prefix);
		}
		if (this.config.showLevel) {
			const levelStr = Logger.getLevelString(level);
			parts.push(`%c[${levelStr}]`);
			switch (level) {
				case "debug":
					styles.push(BROWSER_STYLES.debug);
					break;
				case "info":
					styles.push(BROWSER_STYLES.info);
					break;
				case "warn":
					styles.push(BROWSER_STYLES.warn);
					break;
				case "error":
					styles.push(BROWSER_STYLES.error);
					break;
				default: styles.push("");
			}
		}
		parts.push(`%c${message}`);
		styles.push("color: inherit; font-weight: normal;");
		const formattedMessage = parts.join(" ");
		switch (level) {
			case "debug":
				console.debug(formattedMessage, ...styles, ...args);
				break;
			case "info":
				console.info(formattedMessage, ...styles, ...args);
				break;
			case "warn":
				console.warn(formattedMessage, ...styles, ...args);
				break;
			case "error":
				console.error(formattedMessage, ...styles, ...args);
				break;
			default: console.log(formattedMessage, ...styles, ...args);
		}
	}
	/**
	* Log to Node.js console
	*/
	logToNode(level, message, ...args) {
		const formattedMessage = this.formatForNode(level, message);
		switch (level) {
			case "debug":
				console.debug(formattedMessage, ...args);
				break;
			case "info":
				console.info(formattedMessage, ...args);
				break;
			case "warn":
				console.warn(formattedMessage, ...args);
				break;
			case "error":
				console.error(formattedMessage, ...args);
				break;
			default: console.log(formattedMessage, ...args);
		}
	}
	/**
	* Log debug message
	*/
	debug(message, ...args) {
		this.logMessage("debug", message, ...args);
	}
	/**
	* Log info message
	*/
	info(message, ...args) {
		this.logMessage("info", message, ...args);
	}
	/**
	* Log warning message
	*/
	warn(message, ...args) {
		this.logMessage("warn", message, ...args);
	}
	/**
	* Log error message
	*/
	error(message, ...args) {
		this.logMessage("error", message, ...args);
	}
	/**
	* Create a child logger with additional prefix
	*/
	child(prefix) {
		const childPrefix = this.config.prefix ? `${this.config.prefix} - ${prefix}` : prefix;
		return new Logger({
			...this.config,
			prefix: childPrefix
		});
	}
	/**
	* Set log level
	*/
	setLevel(level) {
		this.config.level = level;
	}
	/**
	* Get current log level
	*/
	getLevel() {
		return this.config.level;
	}
};
/**
* Default logger instance
*/
const logger = new Logger();
/**
* Create a new logger instance with custom configuration
*/
const createLogger = (config) => new Logger(config);
/**
* Default export - global logger instance
*/
var logger_default = logger;
/**
* Named exports for convenience
*/
const debug = (message, ...args) => logger.debug(message, ...args);
const info = (message, ...args) => logger.info(message, ...args);
const warn = (message, ...args) => logger.warn(message, ...args);
const error = (message, ...args) => logger.error(message, ...args);
/**
* Configure the default logger
*/
const configure = (config) => logger.configure(config);
/**
* Create component-specific loggers
*/
const createComponentLogger = (component) => logger.child(component);
/**
* Create package-specific logger
*/
const createPackageLogger = (packageName) => createLogger({
	level: "info",
	prefix: `${PREFIX} - ${packageName}`,
	showLevel: true,
	timestamps: true
});
/**
* Create package component logger (package + component)
*/
const createPackageComponentLogger = (packageName, component) => {
	return createPackageLogger(packageName).child(component);
};

//#endregion
//#region src/errors/ThunderIDRuntimeError.ts
/**
* Base class for all runtime errors in ThunderID. This class extends ThunderIDError
* and adds support for additional error details. Use this class for errors that occur
* during runtime execution that are not related to API calls.
*
* @example
* ```typescript
* throw new ThunderIDRuntimeError(
*   "Failed to parse configuration",
*   "CONFIG_PARSE_ERROR",
*   { invalidField: "redirectUri" }
* );
* ```
*/
var ThunderIDRuntimeError = class extends ThunderIDError {
	/**
	* Creates an instance of ThunderIDRuntimeError.
	*
	* @param message - Human-readable description of the error
	* @param code - A unique error code that identifies the error type
	* @param details - Additional details about the error that might be helpful for debugging
	* @param origin - Optional. The SDK origin (e.g. 'react', 'vue'). Defaults to generic 'ThunderID'
	* @constructor
	*/
	constructor(message, code, origin, details) {
		super(message, code, origin);
		this.details = details;
		Object.defineProperty(this, "name", {
			configurable: true,
			value: "ThunderIDRuntimeError",
			writable: true
		});
	}
	/**
	* Returns a string representation of the runtime error
	* @returns Formatted error string with name, code, details, and message
	*/
	toString() {
		const details = this.details ? `\nDetails: ${JSON.stringify(this.details, null, 2)}` : "";
		return `[${this.name}] (code="${this.code}")${details}\nMessage: ${this.message}`;
	}
};

//#endregion
//#region src/utils/isRecognizedBaseUrlPattern.ts
/**
* Utility to determine if sensible ThunderID fallbacks can be used based on the given base URL.
*
* This checks if the URL follows the standard ThunderID pattern: /t/{orgHandle}
* Returns true if sensible fallbacks (like deriving organization handle, tenant, etc.) can be used, false otherwise.
*
* @param baseUrl - The base URL of the ThunderID identity server (string or undefined)
* @returns boolean - true if sensible fallbacks can be used, false otherwise
*
* @example
* isRecognizedBaseUrlPattern('https://localhost:8090/t/dxlab'); // true
* isRecognizedBaseUrlPattern('https://custom.example.com/auth'); // false
*/
const isRecognizedBaseUrlPattern = (baseUrl) => {
	if (!baseUrl) throw new ThunderIDRuntimeError("Base URL is required to derive if the `baseUrl` is recognized.", "isRecognizedBaseUrlPattern-ValidationError-001", "javascript", "A valid base URL must be provided to derive if the `baseUrl` is recognized to use the sensible fallbacks.");
	let parsedUrl;
	try {
		parsedUrl = new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDRuntimeError(`Invalid base URL format: ${baseUrl}`, "isRecognizedBaseUrlPattern-ValidationError-002", "javascript", "The provided base URL does not conform to valid URL syntax.");
	}
	const pathSegments = parsedUrl.pathname?.split("/")?.filter((segment) => segment?.length > 0);
	if (pathSegments.length < 2 || pathSegments[0] !== "t") {
		logger_default.warn("[isRecognizedBaseUrlPattern] The provided base URL does not follow the expected URL pattern (/t/{orgHandle}).");
		return false;
	}
	return true;
};
var isRecognizedBaseUrlPattern_default = isRecognizedBaseUrlPattern;

//#endregion
//#region src/utils/identifyPlatform.ts
/**
* Identifies the platform based on the given base URL.
*
* If the URL is recognized and matches the ThunderID domain, returns Platform.ThunderID.
* Otherwise, returns Platform.IdentityServer.
*
* @param baseUrl - The base URL to check
* @returns Platform enum value
*/
const identifyPlatform = (config) => {
	const { baseUrl } = config;
	try {
		if (isRecognizedBaseUrlPattern_default(baseUrl)) {
			try {
				const url = new URL(baseUrl);
				if (/\.thunderid\.io$/i.test(url.hostname) || /thunderid\.io$/i.test(url.hostname)) return Platform.ThunderID;
			} catch {
				logger_default.debug(`[identifyPlatform] Could not identify platform from the base URL: ${baseUrl}. Defaulting to WSO2 Identity Server as the platform.`);
			}
			return Platform.IdentityServer;
		}
		return Platform.Unknown;
	} catch (error$1) {
		logger_default.debug(`[identifyPlatform] Error identifying platform from base URL: ${baseUrl}. Error: ${error$1.message}`);
		return Platform.Unknown;
	}
};
var identifyPlatform_default = identifyPlatform;

//#endregion
//#region src/api/getBrandingPreference.ts
/**
* Retrieves branding preference configuration.
*
* @param config - Configuration object containing baseUrl, optional query parameters, and request config.
* @returns A promise that resolves with the branding preference information.
* @example
* ```typescript
* // Using default fetch
* try {
*   const response = await getBrandingPreference({
*     baseUrl: "https://localhost:8090",
*     locale: "en-US",
*     name: "my-branding",
*     type: "org"
*   });
*   console.log(response.theme);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get branding preference:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher (e.g., axios-based httpClient)
* try {
*   const response = await getBrandingPreference({
*     baseUrl: "https://localhost:8090",
*     locale: "en-US",
*     name: "my-branding",
*     type: "org",
*     fetcher: async (url, config) => {
*       const response = await httpClient({
*         url,
*         method: config.method,
*         headers: config.headers,
*         ...config
*       });
*       // Convert axios-like response to fetch-like Response
*       return {
*         ok: response.status >= 200 && response.status < 300,
*         status: response.status,
*         statusText: response.statusText,
*         json: () => Promise.resolve(response.data),
*         text: () => Promise.resolve(typeof response.data === 'string' ? response.data : JSON.stringify(response.data))
*       } as Response;
*     }
*   });
*   console.log(response.theme);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get branding preference:', error.message);
*   }
* }
* ```
*/
const getBrandingPreference = async ({ baseUrl, locale, name, type, fetcher,...requestConfig }) => {
	try {
		new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDAPIError(`Invalid base URL provided. ${error$1?.toString()}`, "getBrandingPreference-ValidationError-001", "javascript", 400, "The provided `baseUrl` does not adhere to the URL schema.");
	}
	const queryParams = new URLSearchParams(Object.fromEntries(Object.entries({
		locale: locale || "",
		name: name || "",
		type: type || ""
	}).filter(([, value]) => Boolean(value))));
	const fetchFn = fetcher || fetch;
	const resolvedUrl = `${baseUrl}/api/server/v1/branding-preference/resolve${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
	const requestInit = {
		...requestConfig,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: "GET"
	};
	try {
		const response = await fetchFn(resolvedUrl, requestInit);
		if (!response?.ok) {
			const errorText = await response.text();
			const platform = identifyPlatform_default({ baseUrl });
			let errorDescription;
			try {
				const errorBody = JSON.parse(errorText);
				errorDescription = errorBody?.description || errorBody?.message || errorText;
			} catch {
				errorDescription = errorText;
			}
			let platformConsoleGuidance;
			if (platform === Platform.ThunderID) platformConsoleGuidance = "configure branding preferences in the ThunderID console";
			else if (platform === Platform.IdentityServer) platformConsoleGuidance = "configure branding preferences in the WSO2 Identity Server console";
			else platformConsoleGuidance = "configure branding preferences in the platform console";
			logger_default.warn(`[BrandingError] ${errorDescription} To resolve this issue, please ${platformConsoleGuidance}. If you want to suppress this warning and stop fetching branding preferences, set \`<ThunderIDProvider>\` -> \`preferences\` -> \`theme\` -> \`inheritFromBranding\` to false.`);
			throw new ThunderIDAPIError(errorText, "getBrandingPreference-ResponseError-001", "javascript", response.status, response.statusText, "Failed to get branding preference");
		}
		return await response.json();
	} catch (error$1) {
		if (error$1 instanceof ThunderIDAPIError) throw error$1;
		throw new ThunderIDAPIError(`Network or parsing error: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "getBrandingPreference-NetworkError-001", "javascript", 0, "Network Error");
	}
};
var getBrandingPreference_default = getBrandingPreference;

//#endregion
//#region src/models/v2/embedded-signin-flow-v2.ts
/**
* Status enumeration for ThunderID embedded sign-in flow operations.
*
* These statuses indicate the current state of the sign-in flow and determine
* the next action required by the client application. Each status provides
* specific guidance on how to proceed with the authentication process.
*
* @example
* ```typescript
* switch (response.flowStatus) {
*   case EmbeddedSignInFlowStatus.Incomplete:
*     // More user input needed - render form components
*     break;
*   case EmbeddedSignInFlowStatus.Complete:
*     // Authentication successful - handle completion
*     break;
*   case EmbeddedSignInFlowStatus.Error:
*     // Authentication failed - show error message
*     break;
* }
* ```
*
* @experimental Part of the new ThunderID API
*/
let EmbeddedSignInFlowStatus$1 = /* @__PURE__ */ function(EmbeddedSignInFlowStatus$2) {
	/**
	* Sign-in flow completed successfully.
	*
	* The user has been authenticated and the flow can proceed to
	* OAuth2 completion or redirection. Check for redirectUrl or
	* assertion data in the response.
	*/
	EmbeddedSignInFlowStatus$2["Complete"] = "COMPLETE";
	/**
	* Sign-in flow encountered an error.
	*
	* Authentication failed due to invalid credentials, system error,
	* or other issues. Check error details in the response and handle
	* appropriately (retry, show error message, etc.).
	*/
	EmbeddedSignInFlowStatus$2["Error"] = "ERROR";
	/**
	* Sign-in flow requires additional user input.
	*
	* More authentication steps are needed. The response will contain
	* components in data.meta.components that should be rendered to
	* collect additional user input (e.g., MFA, password, etc.).
	*/
	EmbeddedSignInFlowStatus$2["Incomplete"] = "INCOMPLETE";
	return EmbeddedSignInFlowStatus$2;
}({});
/**
* Type enumeration for ThunderID embedded sign-in flow responses.
*
* Determines the nature of the flow response and how the client should
* handle the returned data. This affects both UI rendering and flow
* continuation logic.
*
* @experimental Part of the new ThunderID API
*/
let EmbeddedSignInFlowType$1 = /* @__PURE__ */ function(EmbeddedSignInFlowType$2) {
	/**
	* Response requires external redirection.
	*
	* Used for social login providers, external identity providers,
	* or other flows that require navigating to an external URL.
	* The response will contain redirection information.
	*/
	EmbeddedSignInFlowType$2["Redirection"] = "REDIRECTION";
	/**
	* Response contains view components for rendering.
	*
	* Standard embedded flow response containing UI components
	* that should be rendered within the current application
	* context. Most common type for embedded authentication.
	*/
	EmbeddedSignInFlowType$2["View"] = "VIEW";
	return EmbeddedSignInFlowType$2;
}({});

//#endregion
//#region src/api/v2/executeEmbeddedSignInFlowV2.ts
const executeEmbeddedSignInFlowV2 = async ({ url, baseUrl, payload, authId,...requestConfig }) => {
	if (!payload) throw new ThunderIDAPIError("Authorization payload is required", "executeEmbeddedSignInFlow-ValidationError-002", "javascript", 400, "If an authorization payload is not provided, the request cannot be constructed correctly.");
	const endpoint = url ?? `${baseUrl}/flow/execute`;
	const cleanPayload = typeof payload === "object" && payload !== null ? Object.fromEntries(Object.entries(payload).filter(([key]) => key !== "verbose")) : payload;
	const hasOnlyAppIdAndFlowType = typeof cleanPayload === "object" && cleanPayload !== null && "applicationId" in cleanPayload && "flowType" in cleanPayload && Object.keys(cleanPayload).length === 2;
	const hasOnlyFlowId = typeof cleanPayload === "object" && cleanPayload !== null && "executionId" in cleanPayload && Object.keys(cleanPayload).length === 1;
	const requestPayload = hasOnlyAppIdAndFlowType || hasOnlyFlowId ? {
		...cleanPayload,
		verbose: true
	} : cleanPayload;
	const response = await fetch(endpoint, {
		...requestConfig,
		body: JSON.stringify(requestPayload),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: requestConfig.method || "POST"
	});
	if (!response.ok) throw new ThunderIDAPIError(await response.text(), "executeEmbeddedSignInFlow-ResponseError-001", "javascript", response.status, response.statusText, "Authorization request failed");
	const flowResponse = await response.json();
	if (flowResponse.flowStatus === EmbeddedSignInFlowStatus$1.Complete && flowResponse.assertion && authId) try {
		const oauth2Response = await fetch(`${baseUrl}/oauth2/auth/callback`, {
			body: JSON.stringify({
				assertion: flowResponse.assertion,
				authId
			}),
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				...requestConfig.headers
			},
			method: "POST"
		});
		if (!oauth2Response.ok) throw new ThunderIDAPIError(`OAuth2 authorization failed: ${await oauth2Response.text()}`, "executeEmbeddedSignInFlow-OAuth2Error-002", "javascript", oauth2Response.status, oauth2Response.statusText);
		const oauth2Result = await oauth2Response.json();
		return {
			flowStatus: flowResponse.flowStatus,
			redirectUrl: oauth2Result["redirect_uri"]
		};
	} catch (authError) {
		throw new ThunderIDAPIError(`OAuth2 authorization failed: ${authError instanceof Error ? authError.message : "Unknown error"}`, "executeEmbeddedSignInFlow-OAuth2Error-001", "javascript", 500, "Failed to complete OAuth2 authorization after successful embedded sign-in flow.");
	}
	return flowResponse;
};
var executeEmbeddedSignInFlowV2_default = executeEmbeddedSignInFlowV2;

//#endregion
//#region src/models/v2/embedded-signup-flow-v2.ts
/**
* Status enumeration for ThunderID embedded sign-up flow operations.
*
* These statuses indicate the current state of the registration flow and determine
* the next action required by the client application. Each status provides specific
* guidance on how to proceed with the user registration process.
*
* @example
* ```typescript
* switch (response.flowStatus) {
*   case EmbeddedSignUpFlowStatus.Incomplete:
*     // More user input needed - render registration form components
*     break;
*   case EmbeddedSignUpFlowStatus.Complete:
*     // Registration successful - handle completion
*     break;
*   case EmbeddedSignUpFlowStatus.Error:
*     // Registration failed - show detailed error message
*     const errorResponse = response as EmbeddedSignUpFlowErrorResponse;
*     showError(errorResponse.failureReason);
*     break;
* }
* ```
*
* @experimental Part of the new ThunderID API
*/
let EmbeddedSignUpFlowStatus = /* @__PURE__ */ function(EmbeddedSignUpFlowStatus$1) {
	/**
	* Sign-up flow completed successfully.
	*
	* The user has successfully registered and the flow can proceed to
	* OAuth2 completion or redirection. Check for redirectUrl or assertion
	* data in the response for next steps.
	*/
	EmbeddedSignUpFlowStatus$1["Complete"] = "COMPLETE";
	/**
	* Sign-up flow encountered an error and cannot proceed.
	*
	* Registration failed due to validation errors, duplicate user,
	* system errors, or other issues. The response will be of type
	* `EmbeddedSignUpFlowErrorResponse` containing detailed failure
	* information that can be displayed to the user.
	*
	* @see {@link EmbeddedSignUpFlowErrorResponse} for error response structure
	*/
	EmbeddedSignUpFlowStatus$1["Error"] = "ERROR";
	/**
	* Sign-up flow requires additional user input.
	*
	* More registration steps are needed. The response will contain
	* components in data.meta.components that should be rendered to
	* collect additional user information (e.g., profile data, verification).
	*/
	EmbeddedSignUpFlowStatus$1["Incomplete"] = "INCOMPLETE";
	return EmbeddedSignUpFlowStatus$1;
}({});
/**
* Type enumeration for ThunderID embedded sign-up flow responses.
*
* Determines the nature of the registration flow response and how the client
* should handle the returned data. This affects both UI rendering and flow
* continuation logic during the user registration process.
*
* @experimental Part of the new ThunderID API
*/
let EmbeddedSignUpFlowType = /* @__PURE__ */ function(EmbeddedSignUpFlowType$1) {
	/**
	* Response requires external redirection.
	*
	* Used for social registration providers, external identity providers,
	* or other flows that require navigating to an external URL during
	* the registration process. The response will contain redirection information.
	*/
	EmbeddedSignUpFlowType$1["Redirection"] = "REDIRECTION";
	/**
	* Response contains view components for rendering.
	*
	* Standard embedded registration flow response containing UI components
	* that should be rendered within the current application context.
	* Most common type for embedded user registration.
	*/
	EmbeddedSignUpFlowType$1["View"] = "VIEW";
	return EmbeddedSignUpFlowType$1;
}({});

//#endregion
//#region src/api/v2/executeEmbeddedSignUpFlowV2.ts
const executeEmbeddedSignUpFlowV2 = async ({ url, baseUrl, payload, authId,...requestConfig }) => {
	if (!payload) throw new ThunderIDAPIError("Registration payload is required", "executeEmbeddedSignUpFlow-ValidationError-002", "javascript", 400, "If a registration payload is not provided, the request cannot be constructed correctly.");
	const endpoint = url ?? `${baseUrl}/flow/execute`;
	const cleanPayload = typeof payload === "object" && payload !== null ? Object.fromEntries(Object.entries(payload).filter(([key]) => key !== "verbose")) : payload;
	const hasOnlyAppIdAndFlowType = typeof cleanPayload === "object" && cleanPayload !== null && "applicationId" in cleanPayload && "flowType" in cleanPayload && Object.keys(cleanPayload).length === 2;
	const hasOnlyFlowId = typeof cleanPayload === "object" && cleanPayload !== null && "executionId" in cleanPayload && Object.keys(cleanPayload).length === 1;
	const requestPayload = hasOnlyAppIdAndFlowType || hasOnlyFlowId ? {
		...cleanPayload,
		verbose: true
	} : cleanPayload;
	const response = await fetch(endpoint, {
		...requestConfig,
		body: JSON.stringify(requestPayload),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: requestConfig.method || "POST"
	});
	if (!response.ok) throw new ThunderIDAPIError(await response.text(), "executeEmbeddedSignUpFlow-ResponseError-001", "javascript", response.status, response.statusText, "Registration request failed");
	const flowResponse = await response.json();
	if (flowResponse.flowStatus === EmbeddedSignUpFlowStatus.Complete && flowResponse.assertion && authId) try {
		const oauth2Response = await fetch(`${baseUrl}/oauth2/auth/callback`, {
			body: JSON.stringify({
				assertion: flowResponse.assertion,
				authId
			}),
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				...requestConfig.headers
			},
			method: "POST"
		});
		if (!oauth2Response.ok) throw new ThunderIDAPIError(`OAuth2 authorization failed: ${await oauth2Response.text()}`, "executeEmbeddedSignUpFlow-OAuth2Error-002", "javascript", oauth2Response.status, oauth2Response.statusText);
		const oauth2Result = await oauth2Response.json();
		return {
			flowStatus: flowResponse.flowStatus,
			redirectUrl: oauth2Result["redirect_uri"]
		};
	} catch (authError) {
		throw new ThunderIDAPIError(`OAuth2 authorization failed: ${authError instanceof Error ? authError.message : "Unknown error"}`, "executeEmbeddedSignUpFlow-OAuth2Error-001", "javascript", 500, "Failed to complete OAuth2 authorization after successful embedded sign-up flow.");
	}
	return flowResponse;
};
var executeEmbeddedSignUpFlowV2_default = executeEmbeddedSignUpFlowV2;

//#endregion
//#region src/api/v2/executeEmbeddedRecoveryFlowV2.ts
/**
* Executes an embedded recovery flow by sending a request to the flow execution endpoint.
*
* This function handles password-recovery and account-recovery flows driven by the
* ThunderID server. The server returns UI components for each step (e.g. username
* collection, OTP verification, password reset) and this function forwards the
* user's responses back to the server.
*
* @param requestConfig - Request configuration containing URL, payload, and optional headers.
* @returns A promise that resolves with the flow execution response.
* @throws ThunderIDAPIError when the request fails or a payload is missing.
*
* @example
* ```typescript
* // Initiate recovery flow
* const response = await executeEmbeddedRecoveryFlowV2({
*   baseUrl: 'https://localhost:8090',
*   payload: {
*     flowType: 'RECOVERY',
*     applicationId: 'my-app-id',
*   },
* });
*
* // Continue recovery flow with user input
* const nextResponse = await executeEmbeddedRecoveryFlowV2({
*   baseUrl: 'https://localhost:8090',
*   payload: {
*     executionId: response.executionId,
*     action: 'submit',
*     inputs: { username: 'user@example.com' },
*     challengeToken: response.challengeToken,
*   },
* });
* ```
*/
const executeEmbeddedRecoveryFlowV2 = async ({ url, baseUrl, payload,...requestConfig }) => {
	if (!payload) throw new ThunderIDAPIError("Recovery payload is required", "executeEmbeddedRecoveryFlow-ValidationError-002", "javascript", 400, "If a recovery payload is not provided, the request cannot be constructed correctly.");
	const endpoint = url ?? `${baseUrl}/flow/execute`;
	const cleanPayload = typeof payload === "object" && payload !== null ? Object.fromEntries(Object.entries(payload).filter(([key]) => key !== "verbose")) : payload;
	const hasOnlyAppIdAndFlowType = typeof cleanPayload === "object" && cleanPayload !== null && "applicationId" in cleanPayload && "flowType" in cleanPayload && Object.keys(cleanPayload).length === 2;
	const hasOnlyFlowId = typeof cleanPayload === "object" && cleanPayload !== null && "executionId" in cleanPayload && Object.keys(cleanPayload).length === 1;
	const requestPayload = hasOnlyAppIdAndFlowType || hasOnlyFlowId ? {
		...cleanPayload,
		verbose: true
	} : cleanPayload;
	const response = await fetch(endpoint, {
		...requestConfig,
		body: JSON.stringify(requestPayload),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: requestConfig.method || "POST"
	});
	if (!response.ok) throw new ThunderIDAPIError(`Recovery request failed: ${await response.text()}`, "executeEmbeddedRecoveryFlow-ResponseError-001", "javascript", response.status, response.statusText);
	return await response.json();
};
var executeEmbeddedRecoveryFlowV2_default = executeEmbeddedRecoveryFlowV2;

//#endregion
//#region src/api/v2/executeEmbeddedUserOnboardingFlowV2.ts
/**
* Executes an embedded user onboarding flow by sending a request to the flow execution endpoint.
*
* This function handles both:
* - Admin flow: Initiates onboarding, collects user details, generates invite link
* - End-user flow: Validates invite token and allows password setting
*
* @param requestConfig - Request configuration object containing URL, payload, and optional auth token.
* @returns A promise that resolves with the flow execution response.
* @throws ThunderIDAPIError when the request fails or URL is invalid.
*
* @example
* ```typescript
* // Admin initiating user onboarding (requires auth token)
* const response = await executeEmbeddedUserOnboardingFlowV2({
*   baseUrl: "https://api.thunder.io",
*   payload: {
*     flowType: "USER_ONBOARDING"
*   },
*   headers: {
*     Authorization: `Bearer ${accessToken}`
*   }
* });
*
* // End-user accepting invite (no auth required)
* const response = await executeEmbeddedUserOnboardingFlowV2({
*   baseUrl: "https://api.thunder.io",
*   payload: {
*     executionId: "flow-id-from-url",
*     inputs: { inviteToken: "token-from-url" }
*   }
* });
* ```
*/
const executeEmbeddedUserOnboardingFlowV2 = async ({ url, baseUrl, payload,...requestConfig }) => {
	if (!payload) throw new ThunderIDAPIError("User onboarding payload is required", "executeEmbeddedUserOnboardingFlow-ValidationError-002", "javascript", 400, "If a user onboarding payload is not provided, the request cannot be constructed correctly.");
	const endpoint = url ?? `${baseUrl}/flow/execute`;
	const cleanPayload = typeof payload === "object" && payload !== null ? Object.fromEntries(Object.entries(payload).filter(([key]) => key !== "verbose")) : payload;
	const hasOnlyFlowType = typeof cleanPayload === "object" && cleanPayload !== null && "flowType" in cleanPayload && Object.keys(cleanPayload).length === 1;
	const hasOnlyFlowId = typeof cleanPayload === "object" && cleanPayload !== null && "executionId" in cleanPayload && Object.keys(cleanPayload).length === 1;
	const hasFlowIdWithInputs = typeof cleanPayload === "object" && cleanPayload !== null && "executionId" in cleanPayload && "inputs" in cleanPayload;
	const requestPayload = hasOnlyFlowType || hasOnlyFlowId || hasFlowIdWithInputs ? {
		...cleanPayload,
		verbose: true
	} : cleanPayload;
	if ("flowType" in requestPayload && requestPayload["flowType"] !== EmbeddedFlowType.UserOnboarding) requestPayload["flowType"] = EmbeddedFlowType.UserOnboarding;
	const response = await fetch(endpoint, {
		...requestConfig,
		body: JSON.stringify(requestPayload),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			...requestConfig.headers
		},
		method: requestConfig.method || "POST"
	});
	if (!response.ok) throw new ThunderIDAPIError(await response.text(), "executeEmbeddedUserOnboardingFlow-ResponseError-001", "javascript", response.status, response.statusText, "User onboarding request failed");
	return await response.json();
};
var executeEmbeddedUserOnboardingFlowV2_default = executeEmbeddedUserOnboardingFlowV2;

//#endregion
//#region src/api/v2/getFlowMetaV2.ts
/**
* Fetches aggregated flow metadata from the `GET /flow/meta` endpoint.
*
* The response includes:
* - Application or OU details depending on the `type` parameter
* - Resolved design configuration (theme and layout)
* - i18n translations filtered by `language` and `namespace`
* - Registration flow enablement status
*
* @param config - Request configuration including `baseUrl`/`url`, and optional
*                 `type`, `id`, `language`, and `namespace` filters. When `type`
*                 and `id` are omitted the server returns i18n-only metadata.
* @returns A promise that resolves to the {@link FlowMetadataResponse}.
*
* @throws {ThunderIDAPIError} When the server returns a non-OK response.
*
* @example
* ```typescript
* import getFlowMetaV2 from './api/v2/getFlowMetaV2';
* import { FlowMetaType } from './models/v2/flow-meta-v2';
*
* const meta = await getFlowMetaV2({
*   baseUrl: 'https://localhost:8090',
*   type: FlowMetaType.App,
*   id: '60a9b38b-6eba-9f9e-55f9-267067de4680',
*   language: 'en',
*   namespace: 'auth',
* });
*
* console.log(meta.application?.name);
* console.log(meta.i18n.translations);
* ```
*
* @experimental This function targets the ThunderID V2 platform API
*/
const getFlowMetaV2 = async ({ url, baseUrl, type, id, language, namespace,...requestConfig }) => {
	const queryParams = new URLSearchParams({
		...id ? { id } : {},
		...type ? { type } : {},
		...language ? { language } : {},
		...namespace ? { namespace } : {}
	});
	const endpoint = `${url ?? `${baseUrl}/flow/meta`}?${queryParams.toString()}`;
	const response = await fetch(endpoint, {
		...requestConfig,
		headers: {
			Accept: "application/json",
			...requestConfig.headers
		},
		method: "GET"
	});
	if (!response.ok) throw new ThunderIDAPIError(await response.text(), "getFlowMetaV2-ResponseError-001", "javascript", response.status, response.statusText, "Flow metadata request failed");
	return await response.json();
};
var getFlowMetaV2_default = getFlowMetaV2;

//#endregion
//#region src/api/v2/getOrganizationUnitChildren.ts
/**
* Retrieves the child organization units of a given parent OU.
*
* @param config - Request configuration including `baseUrl`/`url`, `organizationUnitId`,
*                 and optional `limit`/`offset` pagination parameters.
* @returns A promise that resolves with the paginated list of child organization units.
*
* @throws {ThunderIDAPIError} When the server returns a non-OK response.
*
* @example
* ```typescript
* const children = await getOrganizationUnitChildren({
*   baseUrl: 'https://localhost:8090',
*   organizationUnitId: '0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1',
*   limit: 10,
*   offset: 0,
* });
* console.log(children.organizationUnits);
* ```
*
* @experimental This function targets the ThunderID V2 platform API
*/
const getOrganizationUnitChildren = async ({ url, baseUrl, organizationUnitId, limit = 10, offset = 0,...requestConfig }) => {
	if (!organizationUnitId) throw new ThunderIDAPIError("Organization Unit ID is required", "getOrganizationUnitChildren-ValidationError-001", "javascript", 400, "If an organization unit ID is not provided, the request cannot be constructed correctly.");
	const queryParams = new URLSearchParams({
		limit: String(limit),
		offset: String(offset)
	});
	const endpoint = url ?? `${baseUrl}/organization-units/${organizationUnitId}/ous?${queryParams.toString()}`;
	const response = await fetch(endpoint, {
		...requestConfig,
		headers: {
			Accept: "application/json",
			...requestConfig.headers
		},
		method: "GET"
	});
	if (!response.ok) throw new ThunderIDAPIError(await response.text(), "getOrganizationUnitChildren-ResponseError-001", "javascript", response.status, response.statusText, "Failed to fetch organization unit children");
	return await response.json();
};
var getOrganizationUnitChildren_default = getOrganizationUnitChildren;

//#endregion
//#region src/constants/ApplicationNativeAuthenticationConstants.ts
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
/**
* Constants representing Application Native Authentication related configurations and constants.
*/
const ApplicationNativeAuthenticationConstants = { SupportedAuthenticators: {
	EmailOtp: "ZW1haWwtb3RwLWF1dGhlbnRpY2F0b3I6TE9DQUw",
	Facebook: "RmFjZWJvb2tBdXRoZW50aWNhdG9yOkZhY2Vib29r",
	GitHub: "R2l0aHViQXV0aGVudGljYXRvcjpHaXRIdWI",
	Google: "R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I6R29vZ2xl",
	IdentifierFirst: "SWRlbnRpZmllckV4ZWN1dG9yOkxPQ0FM",
	LinkedIn: "TGlua2VkSW5PSURDOkxpbmtlZElu",
	MagicLink: "TWFnaWNMaW5rQXV0aGVudGljYXRvcjpMT0NBTA",
	Microsoft: "T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I6TWljcm9zb2Z0",
	Passkey: "RklET0F1dGhlbnRpY2F0b3I6TE9DQUw",
	PushNotification: "cHVzaC1ub3RpZmljYXRpb24tYXV0aGVudGljYXRvcjpMT0NBTA",
	SignInWithEthereum: "T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I6U2lnbiBJbiBXaXRoIEV0aGVyZXVt",
	SmsOtp: "c21zLW90cC1hdXRoZW50aWNhdG9yOkxPQ0FM",
	Totp: "dG90cDpMT0NBTA",
	UsernamePassword: "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM"
} };
var ApplicationNativeAuthenticationConstants_default = ApplicationNativeAuthenticationConstants;

//#endregion
//#region src/constants/ScopeConstants.ts
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
/**
* Constants for OAuth 2.0 and OpenID Connect scopes.
* These scopes define the level of access that the client application
* is requesting from the authorization server.
*
* @remarks
* Scopes are space-separated strings that represent different permissions.
* The 'openid' scope is required for OpenID Connect flows, while other
* scopes provide access to different resources or user information.
*
* @example
* ```typescript
* // Requesting OpenID Connect authentication
* const scope = [ScopeConstants.OPENID];
*
* // Requesting profile information
* const scopes = [ScopeConstants.OPENID, ScopeConstants.PROFILE];
* ```
*/
const ScopeConstants = {
	INTERNAL_LOGIN: "internal_login",
	OPENID: "openid",
	PROFILE: "profile"
};
var ScopeConstants_default = ScopeConstants;

//#endregion
//#region src/constants/OIDCRequestConstants.ts
/**
* Constants representing standard OpenID Connect (OIDC) request and response parameters.
* These parameters are commonly used during authorization, token exchange, and logout flows.
*/
const OIDCRequestConstants = {
	Params: {
		AUTHORIZATION_CODE: "code",
		SESSION_STATE: "session_state",
		SIGN_OUT_SUCCESS: "sign_out_success",
		STATE: "state"
	},
	SignIn: { Payload: { DEFAULT_SCOPES: [
		ScopeConstants_default.OPENID,
		ScopeConstants_default.PROFILE,
		ScopeConstants_default.INTERNAL_LOGIN
	] } },
	SignOut: { Storage: { StorageKeys: { SIGN_OUT_URL: "sign_out_url" } } }
};
var OIDCRequestConstants_default = OIDCRequestConstants;

//#endregion
//#region src/constants/VendorConstants.ts
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
/**
* Constants for vendor-specific configurations.
* By default, the vendor is inferred as ThunderID.
*
* @example
* ```typescript
*  // Using the vendor prefix in a URL
* const apiUrl = `${VendorConstants.VENDOR_PREFIX}/api/v1/resource`;
* ```
*/
const VendorConstants = { VENDOR_PREFIX: "thunderid" };
var VendorConstants_default = VendorConstants;

//#endregion
//#region src/models/embedded-signin-flow.ts
let EmbeddedSignInFlowStatus = /* @__PURE__ */ function(EmbeddedSignInFlowStatus$2) {
	EmbeddedSignInFlowStatus$2["FailCompleted"] = "FAIL_COMPLETED";
	EmbeddedSignInFlowStatus$2["FailIncomplete"] = "FAIL_INCOMPLETE";
	EmbeddedSignInFlowStatus$2["Incomplete"] = "INCOMPLETE";
	EmbeddedSignInFlowStatus$2["SuccessCompleted"] = "SUCCESS_COMPLETED";
	return EmbeddedSignInFlowStatus$2;
}({});
let EmbeddedSignInFlowType = /* @__PURE__ */ function(EmbeddedSignInFlowType$2) {
	EmbeddedSignInFlowType$2["Authentication"] = "AUTHENTICATION";
	return EmbeddedSignInFlowType$2;
}({});
let EmbeddedSignInFlowStepType = /* @__PURE__ */ function(EmbeddedSignInFlowStepType$1) {
	EmbeddedSignInFlowStepType$1["AuthenticatorPrompt"] = "AUTHENTICATOR_PROMPT";
	EmbeddedSignInFlowStepType$1["MultiOptionsPrompt"] = "MULTI_OPTIONS_PROMPT";
	return EmbeddedSignInFlowStepType$1;
}({});
let EmbeddedSignInFlowAuthenticatorParamType = /* @__PURE__ */ function(EmbeddedSignInFlowAuthenticatorParamType$1) {
	EmbeddedSignInFlowAuthenticatorParamType$1["Integer"] = "INTEGER";
	EmbeddedSignInFlowAuthenticatorParamType$1["MultiValued"] = "MULTI_VALUED";
	EmbeddedSignInFlowAuthenticatorParamType$1["String"] = "STRING";
	return EmbeddedSignInFlowAuthenticatorParamType$1;
}({});
let EmbeddedSignInFlowAuthenticatorExtendedParamType = /* @__PURE__ */ function(EmbeddedSignInFlowAuthenticatorExtendedParamType$1) {
	EmbeddedSignInFlowAuthenticatorExtendedParamType$1["Otp"] = "OTPCode";
	return EmbeddedSignInFlowAuthenticatorExtendedParamType$1;
}({});
let EmbeddedSignInFlowAuthenticatorKnownIdPType = /* @__PURE__ */ function(EmbeddedSignInFlowAuthenticatorKnownIdPType$1) {
	EmbeddedSignInFlowAuthenticatorKnownIdPType$1["Local"] = "LOCAL";
	return EmbeddedSignInFlowAuthenticatorKnownIdPType$1;
}({});
let EmbeddedSignInFlowAuthenticatorPromptType = /* @__PURE__ */ function(EmbeddedSignInFlowAuthenticatorPromptType$1) {
	/**
	* Prompt for internal system use, such as API keys or tokens.
	*/
	EmbeddedSignInFlowAuthenticatorPromptType$1["InternalPrompt"] = "INTERNAL_PROMPT";
	/**
	* Prompt for redirection to another page or service.
	*/
	EmbeddedSignInFlowAuthenticatorPromptType$1["RedirectionPrompt"] = "REDIRECTION_PROMPT";
	/**
	* Prompt for user input, typically for username/password or similar credentials.
	*/
	EmbeddedSignInFlowAuthenticatorPromptType$1["UserPrompt"] = "USER_PROMPT";
	return EmbeddedSignInFlowAuthenticatorPromptType$1;
}({});

//#endregion
//#region src/models/v2/embedded-flow-v2.ts
/**
* Component types supported by the ThunderID embedded flow API.
*
* These types define the different UI components that can be rendered
* as part of the embedded authentication flows. Each type corresponds
* to a specific UI element with its own behavior and properties.
*
* @example
* ```typescript
* // Check component type to render appropriate UI
* if (component.type === EmbeddedFlowComponentType.TextInput) {
*   // Render text input field
* } else if (component.type === EmbeddedFlowComponentType.Action) {
*   // Render button/action
* }
* ```
*
* @experimental This API may change in future versions
*/
let EmbeddedFlowComponentType$1 = /* @__PURE__ */ function(EmbeddedFlowComponentType$2) {
	/** Interactive action component (buttons, links) for user interactions */
	EmbeddedFlowComponentType$2["Action"] = "ACTION";
	/** Container block component that groups other components */
	EmbeddedFlowComponentType$2["Block"] = "BLOCK";
	/** Consent component for displaying consent purposes and attributes */
	EmbeddedFlowComponentType$2["Consent"] = "CONSENT";
	/** Copyable text display component that shows text with a copy-to-clipboard action */
	EmbeddedFlowComponentType$2["CopyableText"] = "COPYABLE_TEXT";
	/** Divider component for visual separation of content */
	EmbeddedFlowComponentType$2["Divider"] = "DIVIDER";
	/** Email input field with validation for email addresses. */
	EmbeddedFlowComponentType$2["EmailInput"] = "EMAIL_INPUT";
	/** Icon display component for rendering named vector icons */
	EmbeddedFlowComponentType$2["Icon"] = "ICON";
	/** Image display component for logos and illustrations */
	EmbeddedFlowComponentType$2["Image"] = "IMAGE";
	/** One-time password input field for multi-factor authentication */
	EmbeddedFlowComponentType$2["OtpInput"] = "OTP_INPUT";
	/** Organization unit tree picker for selecting an OU */
	EmbeddedFlowComponentType$2["OuSelect"] = "OU_SELECT";
	/** Password input field with masking for sensitive data */
	EmbeddedFlowComponentType$2["PasswordInput"] = "PASSWORD_INPUT";
	/** Phone number input field with country code support */
	EmbeddedFlowComponentType$2["PhoneInput"] = "PHONE_INPUT";
	/** Rich text display component that renders formatted HTML content */
	EmbeddedFlowComponentType$2["RichText"] = "RICH_TEXT";
	/** Select/dropdown input component for single choice selection */
	EmbeddedFlowComponentType$2["Select"] = "SELECT";
	/** Stack layout component for arranging children in a row or column */
	EmbeddedFlowComponentType$2["Stack"] = "STACK";
	/** Text display component for labels, headings, and messages */
	EmbeddedFlowComponentType$2["Text"] = "TEXT";
	/** Standard text input field for user data entry */
	EmbeddedFlowComponentType$2["TextInput"] = "TEXT_INPUT";
	/** Timer component for displaying a countdown */
	EmbeddedFlowComponentType$2["Timer"] = "TIMER";
	return EmbeddedFlowComponentType$2;
}({});
/**
* Action variant types for buttons and interactive elements.
*
* @experimental This API may change in future versions
*/
let EmbeddedFlowActionVariant = /* @__PURE__ */ function(EmbeddedFlowActionVariant$1) {
	/** Danger action button for destructive operations */
	EmbeddedFlowActionVariant$1["Danger"] = "DANGER";
	/** Info action button for informational purposes */
	EmbeddedFlowActionVariant$1["Info"] = "INFO";
	/** Link-styled action button */
	EmbeddedFlowActionVariant$1["Link"] = "LINK";
	/** Outlined action button for secondary emphasis */
	EmbeddedFlowActionVariant$1["Outlined"] = "OUTLINED";
	/** Primary action button with highest visual emphasis */
	EmbeddedFlowActionVariant$1["Primary"] = "PRIMARY";
	/** Secondary action button with moderate visual emphasis */
	EmbeddedFlowActionVariant$1["Secondary"] = "SECONDARY";
	/** Success action button for positive confirmations */
	EmbeddedFlowActionVariant$1["Success"] = "SUCCESS";
	/** Tertiary action button with minimal visual emphasis */
	EmbeddedFlowActionVariant$1["Tertiary"] = "TERTIARY";
	/** Warning action button for cautionary actions */
	EmbeddedFlowActionVariant$1["Warning"] = "WARNING";
	return EmbeddedFlowActionVariant$1;
}({});
/**
* Text variant types for typography components.
*
* @experimental This API may change in future versions
*/
let EmbeddedFlowTextVariant = /* @__PURE__ */ function(EmbeddedFlowTextVariant$1) {
	/** Primary body text for main content */
	EmbeddedFlowTextVariant$1["Body1"] = "BODY_1";
	/** Secondary body text for supplementary content */
	EmbeddedFlowTextVariant$1["Body2"] = "BODY_2";
	/** Text styled for button labels */
	EmbeddedFlowTextVariant$1["ButtonText"] = "BUTTON_TEXT";
	/** Small caption text for annotations and descriptions */
	EmbeddedFlowTextVariant$1["Caption"] = "CAPTION";
	/** Largest heading level for main titles */
	EmbeddedFlowTextVariant$1["Heading1"] = "HEADING_1";
	/** Second level heading for major sections */
	EmbeddedFlowTextVariant$1["Heading2"] = "HEADING_2";
	/** Third level heading for subsections */
	EmbeddedFlowTextVariant$1["Heading3"] = "HEADING_3";
	/** Fourth level heading for minor sections */
	EmbeddedFlowTextVariant$1["Heading4"] = "HEADING_4";
	/** Fifth level heading for detailed sections */
	EmbeddedFlowTextVariant$1["Heading5"] = "HEADING_5";
	/** Smallest heading level for fine-grained sections */
	EmbeddedFlowTextVariant$1["Heading6"] = "HEADING_6";
	/** Overline text for labels and categories */
	EmbeddedFlowTextVariant$1["Overline"] = "OVERLINE";
	/** Primary subtitle text with larger emphasis */
	EmbeddedFlowTextVariant$1["Subtitle1"] = "SUBTITLE_1";
	/** Secondary subtitle text with moderate emphasis */
	EmbeddedFlowTextVariant$1["Subtitle2"] = "SUBTITLE_2";
	return EmbeddedFlowTextVariant$1;
}({});
/**
* Event types for action components.
*
* @experimental This API may change in future versions
*/
let EmbeddedFlowEventType = /* @__PURE__ */ function(EmbeddedFlowEventType$1) {
	/** Navigate back to the previous step */
	EmbeddedFlowEventType$1["Back"] = "BACK";
	/** Cancel the current operation */
	EmbeddedFlowEventType$1["Cancel"] = "CANCEL";
	/** Navigate to a different flow step or page */
	EmbeddedFlowEventType$1["Navigate"] = "NAVIGATE";
	/** Reset form fields to initial state */
	EmbeddedFlowEventType$1["Reset"] = "RESET";
	/** Submit form data to the server */
	EmbeddedFlowEventType$1["Submit"] = "SUBMIT";
	/** Trigger an action or event */
	EmbeddedFlowEventType$1["Trigger"] = "TRIGGER";
	return EmbeddedFlowEventType$1;
}({});

//#endregion
//#region src/models/v2/embedded-recovery-flow-v2.ts
/**
* Status enumeration for the embedded recovery flow operations.
*
* @experimental Part of the new ThunderID API
*/
let EmbeddedRecoveryFlowStatus = /* @__PURE__ */ function(EmbeddedRecoveryFlowStatus$1) {
	/**
	* Recovery flow completed successfully.
	*/
	EmbeddedRecoveryFlowStatus$1["Complete"] = "COMPLETE";
	/**
	* Recovery flow encountered an error and cannot proceed.
	*
	* @see {@link EmbeddedRecoveryFlowErrorResponse} for error response structure
	*/
	EmbeddedRecoveryFlowStatus$1["Error"] = "ERROR";
	/**
	* Recovery flow requires additional user input.
	*/
	EmbeddedRecoveryFlowStatus$1["Incomplete"] = "INCOMPLETE";
	return EmbeddedRecoveryFlowStatus$1;
}({});
/**
* Type enumeration for embedded recovery flow responses.
*
* @experimental Part of the new ThunderID API
*/
let EmbeddedRecoveryFlowType = /* @__PURE__ */ function(EmbeddedRecoveryFlowType$1) {
	/**
	* Response requires external redirection.
	*/
	EmbeddedRecoveryFlowType$1["Redirection"] = "REDIRECTION";
	/**
	* Response contains view components for rendering.
	*/
	EmbeddedRecoveryFlowType$1["View"] = "VIEW";
	return EmbeddedRecoveryFlowType$1;
}({});

//#endregion
//#region src/models/v2/flow-meta-v2.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
/**
* The type of entity to retrieve flow metadata for.
*
* @example
* ```typescript
* const config: GetFlowMetaRequestConfig = {
*   baseUrl: 'https://localhost:8090',
*   type: FlowMetaType.App,
*   id: '60a9b38b-6eba-9f9e-55f9-267067de4680',
* };
* ```
*
* @experimental This API may change in future versions
*/
let FlowMetaType = /* @__PURE__ */ function(FlowMetaType$1) {
	/** Retrieve metadata scoped to a specific application */
	FlowMetaType$1["App"] = "APP";
	/** Retrieve metadata scoped to a specific organization unit */
	FlowMetaType$1["Ou"] = "OU";
	return FlowMetaType$1;
}({});

//#endregion
//#region src/models/flow.ts
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
let FlowMode = /* @__PURE__ */ function(FlowMode$1) {
	/**
	* This mode is suitable for embedded sign-in, sign-up, etc. flows where the authentication
	* UIs are rendered within the application.
	* @see {@link https://is.docs.wso2.com/en/7.1.0/references/app-native-authentication/}
	*/
	FlowMode$1["Embedded"] = "DIRECT";
	/**
	* Traditional redirect based sign-in, sign-up, etc. flows where the authentication
	* UIs are from a external Identity Provider (ex: WSO2 Identity Server or ThunderID).
	*/
	FlowMode$1["Redirect"] = "REDIRECTION";
	return FlowMode$1;
}({});

//#endregion
//#region src/models/scim2-schema.ts
/**
* Well-known SCIM2 schema IDs
*/
let WellKnownSchemaIds = /* @__PURE__ */ function(WellKnownSchemaIds$1) {
	/** Core Schema */
	WellKnownSchemaIds$1["Core"] = "urn:ietf:params:scim:schemas:core:2.0";
	/** Custom User Schema */
	WellKnownSchemaIds$1["CustomUser"] = "urn:scim:schemas:extension:custom:User";
	/** Enterprise User Schema */
	WellKnownSchemaIds$1["EnterpriseUser"] = "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User";
	/** System User Schema */
	WellKnownSchemaIds$1["SystemUser"] = "urn:scim:wso2:schema";
	/** User Schema */
	WellKnownSchemaIds$1["User"] = "urn:ietf:params:scim:schemas:core:2.0:User";
	return WellKnownSchemaIds$1;
}({});

//#endregion
//#region src/models/field.ts
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
let FieldType = /* @__PURE__ */ function(FieldType$1) {
	FieldType$1["Checkbox"] = "CHECKBOX";
	FieldType$1["Date"] = "DATE";
	FieldType$1["Email"] = "EMAIL";
	FieldType$1["Number"] = "NUMBER";
	FieldType$1["Otp"] = "OTP";
	FieldType$1["Password"] = "PASSWORD";
	FieldType$1["Radio"] = "RADIO";
	FieldType$1["Select"] = "SELECT";
	FieldType$1["Tel"] = "TEL";
	FieldType$1["Text"] = "TEXT";
	FieldType$1["Textarea"] = "TEXTAREA";
	FieldType$1["Time"] = "TIME";
	return FieldType$1;
}({});

//#endregion
//#region src/constants/OIDCDiscoveryConstants.ts
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
/**
* Constants related to OpenID Connect (OIDC) metadata and endpoints.
* This object contains all the standard OIDC endpoints and storage keys
* used throughout the application for authentication and authorization.
*
* @remarks
* The constants are organized into two main sections:
* 1. Endpoints - Contains all OIDC standard endpoint paths
* 2. Storage - Contains keys used for storing OIDC-related data
*
* @example
* ```typescript
* // Using an endpoint
* const authEndpoint = OIDCDiscoveryConstants.Endpoints.AUTHORIZATION;
*
* // Using a storage key
* const tokenKey = OIDCDiscoveryConstants.Storage.StorageKeys.Endpoints.TOKEN;
* ```
*/
const OIDCDiscoveryConstants = {
	Endpoints: {
		AUTHORIZATION: "/oauth2/authorize",
		END_SESSION: "/oidc/logout",
		ISSUER: "/oauth2/token",
		JWKS: "/oauth2/jwks",
		REVOCATION: "/oauth2/revoke",
		SESSION_IFRAME: "/oidc/checksession",
		TOKEN: "/oauth2/token",
		USERINFO: "/oauth2/userinfo"
	},
	Storage: { StorageKeys: {
		Endpoints: {
			AUTHORIZATION: "authorization_endpoint",
			END_SESSION: "end_session_endpoint",
			ISSUER: "issuer",
			JWKS: "jwks_uri",
			REVOCATION: "revocation_endpoint",
			SESSION_IFRAME: "check_session_iframe",
			TOKEN: "token_endpoint",
			USERINFO: "userinfo_endpoint"
		},
		OPENID_PROVIDER_CONFIG_INITIATED: "op_config_initiated"
	} }
};
var OIDCDiscoveryConstants_default = OIDCDiscoveryConstants;

//#endregion
//#region src/constants/PKCEConstants.ts
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
/**
* Constants related to Proof Key for Code Exchange (PKCE) implementation.
* This object contains all the necessary constants for implementing PKCE
* flow in the OAuth 2.0 authorization code grant.
*
* @remarks
* PKCE is an extension to the authorization code flow to prevent CSRF and
* authorization code injection attacks. The constants are organized into
* storage-related sections for managing PKCE state.
*
* @example
* ```typescript
* // Using storage keys
* const codeVerifierKey = PKCEConstants.Storage.StorageKeys.CODE_VERIFIER;
* const separator = PKCEConstants.Storage.StorageKeys.SEPARATOR;
* ```
*/
const PKCEConstants = {
	DEFAULT_CODE_CHALLENGE_METHOD: "S256",
	Storage: { StorageKeys: {
		CODE_VERIFIER: "pkce_code_verifier",
		SEPARATOR: "#"
	} }
};
var PKCEConstants_default = PKCEConstants;

//#endregion
//#region src/DefaultCacheStore.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
var DefaultCacheStore = class {
	cache;
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
	}
	get length() {
		return this.cache.size;
	}
	getItem(key) {
		return this.cache.get(key) ?? null;
	}
	setItem(key, value) {
		this.cache.set(key, value);
	}
	removeItem(key) {
		this.cache.delete(key);
	}
	clear() {
		this.cache.clear();
	}
	key(index) {
		return Array.from(this.cache.keys())[index] ?? null;
	}
	async setData(key, value) {
		this.cache.set(key, value);
	}
	async getData(key) {
		return this.cache.get(key) ?? "{}";
	}
	async removeData(key) {
		this.cache.delete(key);
	}
};

//#endregion
//#region src/DefaultCrypto.ts
/**
* Default implementation of the Crypto interface using the 'jose' library
* and the native Web Crypto API.
*/
var DefaultCrypto = class {
	base64URLDecode(value) {
		const decodedArray = jose.base64url.decode(value);
		return new TextDecoder().decode(decodedArray);
	}
	base64URLEncode(value) {
		return jose.base64url.encode(value);
	}
	generateRandomBytes(length) {
		return crypto.getRandomValues(new Uint8Array(length));
	}
	async hashSha256(data) {
		const dataBuffer = new TextEncoder().encode(data);
		const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
		return new Uint8Array(hashBuffer);
	}
	async verifyJwt(idToken, jwk, algorithms, clientId, issuer, subject, clockTolerance, validateJwtIssuer = true) {
		const key = await jose.importJWK(jwk);
		await jose.jwtVerify(idToken, key, {
			algorithms,
			audience: [clientId],
			clockTolerance,
			issuer: validateJwtIssuer ? issuer : void 0,
			subject
		});
		return true;
	}
};

//#endregion
//#region src/models/agent.ts
let AgentConfig;
(function(_AgentConfig) {
	_AgentConfig.DEFAULT_AUTHENTICATOR_NAME = "Username & Password";
})(AgentConfig || (AgentConfig = {}));

//#endregion
//#region src/models/store.ts
/**
* Enum representing different types of data stores used in the application.
*/
let Stores = /* @__PURE__ */ function(Stores$1) {
	/**
	* Store for configuration data that defines the application's behavior and settings.
	*/
	Stores$1["ConfigData"] = "config_data";
	/**
	* Store for OpenID Connect provider metadata, including endpoints and configuration.
	*/
	Stores$1["OIDCProviderMetaData"] = "oidc_provider_meta_data";
	/**
	* Store for persisted data that needs to be retained across sessions and application restarts.
	*/
	Stores$1["PersistedData"] = "persisted_data";
	/**
	* Store for user session-related data like tokens and authentication state.
	*/
	Stores$1["SessionData"] = "session_data";
	/**
	* Store for temporary data that needs to persist only for a short duration.
	*/
	Stores$1["TemporaryData"] = "temporary_data";
	return Stores$1;
}({});

//#endregion
//#region src/StorageManager.ts
const THUNDERID_SESSION_ACTIVE = "thunderid-session-active";
var StorageManager = class StorageManager {
	id;
	store;
	constructor(instanceID, store) {
		this.id = instanceID;
		this.store = store;
	}
	async setDataInBulk(key, data) {
		const existingDataJSON = await this.store.getData(key) ?? null;
		const dataToBeSaved = {
			...existingDataJSON && JSON.parse(existingDataJSON),
			...data
		};
		const dataToBeSavedJSON = JSON.stringify(dataToBeSaved);
		await this.store.setData(key, dataToBeSavedJSON);
	}
	async setValue(key, attribute, value) {
		const existingDataJSON = await this.store.getData(key) ?? null;
		const dataToBeSaved = {
			...existingDataJSON && JSON.parse(existingDataJSON),
			[attribute]: value
		};
		const dataToBeSavedJSON = JSON.stringify(dataToBeSaved);
		await this.store.setData(key, dataToBeSavedJSON);
	}
	async removeValue(key, attribute) {
		const existingDataJSON = await this.store.getData(key) ?? null;
		const dataToBeSaved = { ...existingDataJSON && JSON.parse(existingDataJSON) };
		delete dataToBeSaved[attribute];
		const dataToBeSavedJSON = JSON.stringify(dataToBeSaved);
		await this.store.setData(key, dataToBeSavedJSON);
	}
	resolveKey(store, userId, instanceId) {
		if (userId && instanceId) return `${store}-${instanceId}-${userId}`;
		if (userId) return `${store}-${this.id}-${userId}`;
		if (instanceId) return `${store}-${instanceId}`;
		return `${store}-${this.id}`;
	}
	static isLocalStorageAvailable() {
		try {
			const testValue = "__THUNDERID_AUTH_CORE_LOCAL_STORAGE_TEST__";
			localStorage.setItem(testValue, testValue);
			localStorage.removeItem(testValue);
			return true;
		} catch (error$1) {
			return false;
		}
	}
	async setConfigData(config) {
		await this.setDataInBulk(this.resolveKey(Stores.ConfigData), config);
	}
	async setOIDCProviderMetaData(oidcProviderMetaData) {
		this.setDataInBulk(this.resolveKey(Stores.OIDCProviderMetaData), oidcProviderMetaData);
	}
	async setTemporaryData(temporaryData, userId) {
		this.setDataInBulk(this.resolveKey(Stores.TemporaryData, userId), temporaryData);
	}
	async setSessionData(sessionData, userId) {
		this.setDataInBulk(this.resolveKey(Stores.SessionData, userId), sessionData);
	}
	async setCustomData(key, customData, userId) {
		this.setDataInBulk(this.resolveKey(key, userId), customData);
	}
	async getConfigData(userId) {
		return JSON.parse(await this.store.getData(this.resolveKey(Stores.ConfigData, userId)) ?? null);
	}
	async loadOpenIDProviderConfiguration() {
		return JSON.parse(await this.store.getData(this.resolveKey(Stores.OIDCProviderMetaData)) ?? null);
	}
	async getTemporaryData(userId) {
		return JSON.parse(await this.store.getData(this.resolveKey(Stores.TemporaryData, userId)) ?? null);
	}
	async getPersistedData(userId) {
		return JSON.parse(await this.store.getData(this.resolveKey(Stores.PersistedData, userId)) ?? null);
	}
	async setPersistedData(persistedData, userId) {
		this.setDataInBulk(this.resolveKey(Stores.PersistedData, userId), persistedData);
	}
	async getSessionData(userId, instanceId) {
		return JSON.parse(await this.store.getData(this.resolveKey(Stores.SessionData, userId, instanceId)) ?? null);
	}
	async getCustomData(key, userId) {
		return JSON.parse(await this.store.getData(this.resolveKey(key, userId)) ?? null);
	}
	setSessionStatus(status) {
		if (StorageManager.isLocalStorageAvailable()) localStorage.setItem(`${THUNDERID_SESSION_ACTIVE}`, status);
	}
	getSessionStatus() {
		return StorageManager.isLocalStorageAvailable() ? localStorage.getItem(`${THUNDERID_SESSION_ACTIVE}`) ?? "" : "";
	}
	removeSessionStatus() {
		if (StorageManager.isLocalStorageAvailable()) localStorage.removeItem(`${THUNDERID_SESSION_ACTIVE}`);
	}
	async removeConfigData() {
		await this.store.removeData(this.resolveKey(Stores.ConfigData));
	}
	async removeOIDCProviderMetaData() {
		await this.store.removeData(this.resolveKey(Stores.OIDCProviderMetaData));
	}
	async removeTemporaryData(userId) {
		await this.store.removeData(this.resolveKey(Stores.TemporaryData, userId));
	}
	async removeSessionData(userId) {
		await this.store.removeData(this.resolveKey(Stores.SessionData, userId));
	}
	async getConfigDataParameter(key) {
		const data = await this.store.getData(this.resolveKey(Stores.ConfigData));
		return data && JSON.parse(data)[key];
	}
	async getOIDCProviderMetaDataParameter(key) {
		const data = await this.store.getData(this.resolveKey(Stores.OIDCProviderMetaData));
		return data && JSON.parse(data)[key];
	}
	async getTemporaryDataParameter(key, userId) {
		const data = await this.store.getData(this.resolveKey(Stores.TemporaryData, userId));
		return data && JSON.parse(data)[key];
	}
	async getSessionDataParameter(key, userId) {
		const data = await this.store.getData(this.resolveKey(Stores.SessionData, userId));
		return data && JSON.parse(data)[key];
	}
	async setConfigDataParameter(key, value) {
		await this.setValue(this.resolveKey(Stores.ConfigData), key, value);
	}
	async setOIDCProviderMetaDataParameter(key, value) {
		await this.setValue(this.resolveKey(Stores.OIDCProviderMetaData), key, value);
	}
	async setTemporaryDataParameter(key, value, userId) {
		await this.setValue(this.resolveKey(Stores.TemporaryData, userId), key, value);
	}
	async setSessionDataParameter(key, value, userId) {
		await this.setValue(this.resolveKey(Stores.SessionData, userId), key, value);
	}
	async removeConfigDataParameter(key) {
		await this.removeValue(this.resolveKey(Stores.ConfigData), key);
	}
	async removeOIDCProviderMetaDataParameter(key) {
		await this.removeValue(this.resolveKey(Stores.OIDCProviderMetaData), key);
	}
	async removeTemporaryDataParameter(key, userId) {
		await this.removeValue(this.resolveKey(Stores.TemporaryData, userId), key);
	}
	async removeSessionDataParameter(key, userId) {
		await this.removeValue(this.resolveKey(Stores.SessionData, userId), key);
	}
};
var StorageManager_default = StorageManager;

//#endregion
//#region src/utils/extractUserClaimsFromIdToken.ts
/**
* Removes standard protocol-specific claims from the ID token payload
* and returns an object of user-specific claims with original attribute names preserved.
*
* @param payload The raw ID token payload.
* @returns A cleaned-up object containing only user-specific claims with original attribute names.
*
* @example
* ````typescript
* const idTokenPayload = {
*   iss: 'https://example.com',
*   aud: 'client_id',
*   exp: 1712345678,
*   iat: 1712345670,
*   email: 'user@example.com',
*   given_name: 'John'
*  };
*
* const userClaims = extractUserClaimsFromIdToken(idTokenPayload);
* // userClaims will be:
* // {
* //   email: 'user@example.com',
* //   given_name: 'John'
* // }
* ```
*/
const extractUserClaimsFromIdToken = (payload) => {
	const filteredPayload = { ...payload };
	[
		"iss",
		"aud",
		"exp",
		"iat",
		"acr",
		"amr",
		"azp",
		"auth_time",
		"nonce",
		"c_hash",
		"at_hash",
		"nbf",
		"isk",
		"sid",
		"jti",
		"sub"
	].forEach((claim) => {
		delete filteredPayload[claim];
	});
	return filteredPayload;
};
var extractUserClaimsFromIdToken_default = extractUserClaimsFromIdToken;

//#endregion
//#region src/utils/processOpenIDScopes.ts
/**
* Processes OpenID scopes to ensure they are in the correct format.
* If the input is a string, it returns it as is.
* If the input is an array, it joins the elements into a single string separated by spaces.
* If the input is neither, it throws an error.
*
* Default scopes are only injected when no scopes are configured (undefined, empty string,
* or empty array). If the caller explicitly provides scopes, those are used as-is.
*
* @param scopes - The OpenID scopes to process, which can be a string, an array of strings,
*   or undefined/null when not configured.
* @returns A string of OpenID scopes separated by spaces.
*
* @example
* ```typescript
* processOpenIDScopes("openid profile email"); // returns "openid profile email"
* processOpenIDScopes(["openid", "profile", "email"]); // returns "openid profile email"
* processOpenIDScopes(undefined); // returns default scopes
* processOpenIDScopes(123); // throws ThunderIDRuntimeError
* processOpenIDScopes({}); // throws ThunderIDRuntimeError
* ```
*/
const processOpenIDScopes = (scopes) => {
	let processedScopes = [];
	let userConfiguredScopes = false;
	if (scopes !== void 0 && scopes !== null) if (Array.isArray(scopes)) {
		processedScopes = scopes;
		userConfiguredScopes = scopes.length > 0;
	} else if (typeof scopes === "string") {
		processedScopes = scopes ? scopes.split(" ") : [];
		userConfiguredScopes = scopes.length > 0;
	} else throw new ThunderIDRuntimeError("Scopes must be a string or an array of strings.", "processOpenIDScopes-Invalid-001", "javascript", "The provided scopes are not in the expected format. Please provide a string or an array of strings.");
	if (!userConfiguredScopes) OIDCRequestConstants_default.SignIn.Payload.DEFAULT_SCOPES.forEach((defaultScope) => {
		if (!processedScopes.includes(defaultScope)) processedScopes.push(defaultScope);
	});
	return processedScopes.join(" ");
};
var processOpenIDScopes_default = processOpenIDScopes;

//#endregion
//#region src/constants/TokenExchangeConstants.ts
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
/**
* Constants for OAuth 2.0 Token Exchange operations.
* This object contains placeholders used in token exchange requests
* and responses for dynamic value substitution.
*
* @remarks
* These placeholders are used in token exchange templates and are replaced
* with actual values during request processing. They help in creating
* flexible and reusable token exchange configurations.
*
* @example
* ```typescript
* // Using placeholders in a token exchange template
* const template = `grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token=${TokenExchangeConstants.Placeholders.TOKEN}`;
* ```
*/
const TokenExchangeConstants = { Placeholders: {
	ACCESS_TOKEN: "{{accessToken}}",
	CLIENT_ID: "{{clientId}}",
	CLIENT_SECRET: "{{clientSecret}}",
	SCOPES: "{{scopes}}",
	USERNAME: "{{username}}"
} };
var TokenExchangeConstants_default = TokenExchangeConstants;

//#endregion
//#region src/utils/AuthenticationHelper.ts
/**
* Provides core authentication helper utilities for token handling, endpoint resolution,
* ID token validation, and session management.
*
* @typeParam T - Optional extension type for framework-specific config fields.
*/
var AuthenticationHelper = class {
	storageManager;
	config;
	oidcProviderMetaData;
	cryptoHelper;
	/**
	* Creates a new `AuthenticationHelper` instance.
	*
	* @param storageManagerInstance - The storage manager to use for reading config and session data.
	* @param cryptoHelperInstance - The isomorphic crypto helper for JWT operations.
	*/
	constructor(storageManagerInstance, cryptoHelperInstance) {
		this.storageManager = storageManagerInstance;
		this.config = async () => this.storageManager.getConfigData();
		this.oidcProviderMetaData = async () => this.storageManager.loadOpenIDProviderConfiguration();
		this.cryptoHelper = cryptoHelperInstance;
	}
	/**
	* Merges explicit endpoint overrides from config into the discovery response.
	* Config-defined endpoint names (camelCase) are converted to snake_case before merging.
	*
	* @param response - The raw OIDC discovery response from the well-known endpoint.
	* @returns The discovery response with any config-specified endpoint overrides applied.
	*/
	async resolveEndpoints(response) {
		const oidcProviderMetaData = {};
		const configData = await this.config();
		if (configData.endpoints) Object.keys(configData.endpoints).forEach((endpointName) => {
			const snakeCasedName = endpointName.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
			oidcProviderMetaData[snakeCasedName] = configData?.endpoints ? configData.endpoints[endpointName] : "";
		});
		return {
			...response,
			...oidcProviderMetaData
		};
	}
	/**
	* Builds an OIDC endpoint map from explicitly configured endpoint URLs.
	* Throws if required endpoints are missing.
	*
	* @returns A partial OIDC discovery response containing all explicitly configured endpoints.
	* @throws {ThunderIDAuthException} When required endpoints are absent from the config.
	*/
	async resolveEndpointsExplicitly() {
		const oidcProviderMetaData = {};
		const configData = await this.config();
		const requiredEndpoints = [
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.AUTHORIZATION,
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.END_SESSION,
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.JWKS,
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.SESSION_IFRAME,
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.REVOCATION,
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.TOKEN,
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.ISSUER,
			OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.USERINFO
		];
		if (!(configData.endpoints ? requiredEndpoints.every((reqEndpointName) => configData.endpoints ? Object.keys(configData.endpoints).some((endpointName) => {
			return endpointName.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) === reqEndpointName;
		}) : false) : false)) throw new ThunderIDAuthException("JS-AUTH_HELPER-REE-NF01", "Required endpoints missing", "Some or all of the required endpoints are missing in the object passed to the `endpoints` attribute of the`AuthConfig` object.");
		if (configData.endpoints) Object.keys(configData.endpoints).forEach((endpointName) => {
			const snakeCasedName = endpointName.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
			oidcProviderMetaData[snakeCasedName] = configData?.endpoints ? configData.endpoints[endpointName] : "";
		});
		return { ...oidcProviderMetaData };
	}
	/**
	* Derives OIDC endpoint URLs from the configured `baseUrl`.
	* Any explicitly configured endpoints take precedence over the derived defaults.
	* The issuer is set to `baseUrl` per RFC 8414.
	*
	* @returns A partial OIDC discovery response with derived endpoint URLs.
	* @throws {ThunderIDAuthException} When `baseUrl` is not defined in the config.
	*/
	async resolveEndpointsByBaseURL() {
		const oidcProviderMetaData = {};
		const configData = await this.config();
		const { baseUrl } = configData;
		if (!baseUrl) throw new ThunderIDAuthException("JS-AUTH_HELPER_REBO-NF01", "Base URL not defined.", "Base URL is not defined in AuthClient config.");
		if (configData.endpoints) Object.keys(configData.endpoints).forEach((endpointName) => {
			const snakeCasedName = endpointName.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
			oidcProviderMetaData[snakeCasedName] = configData?.endpoints ? configData.endpoints[endpointName] : "";
		});
		const endpointKeys = OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints;
		const endpointPaths = OIDCDiscoveryConstants_default.Endpoints;
		return {
			[endpointKeys.AUTHORIZATION]: `${baseUrl}${endpointPaths.AUTHORIZATION}`,
			[endpointKeys.END_SESSION]: `${baseUrl}${endpointPaths.END_SESSION}`,
			[endpointKeys.ISSUER]: `${baseUrl}`,
			[endpointKeys.JWKS]: `${baseUrl}${endpointPaths.JWKS}`,
			[endpointKeys.SESSION_IFRAME]: `${baseUrl}${endpointPaths.SESSION_IFRAME}`,
			[endpointKeys.REVOCATION]: `${baseUrl}${endpointPaths.REVOCATION}`,
			[endpointKeys.TOKEN]: `${baseUrl}${endpointPaths.TOKEN}`,
			[endpointKeys.USERINFO]: `${baseUrl}${endpointPaths.USERINFO}`,
			...oidcProviderMetaData
		};
	}
	/**
	* Validates an ID token using the JWKS endpoint and the configured validation options.
	*
	* @param idToken - The raw ID token string to validate.
	* @returns `true` if the token is valid.
	* @throws {ThunderIDAuthException} When the JWKS endpoint is missing or the request fails.
	*/
	async validateIdToken(idToken) {
		const jwksEndpoint = (await this.storageManager.loadOpenIDProviderConfiguration()).jwks_uri;
		const configData = await this.config();
		if (!jwksEndpoint || jwksEndpoint.trim().length === 0) throw new ThunderIDAuthException("JS_AUTH_HELPER-VIT-NF01", "JWKS endpoint not found.", "No JWKS endpoint was found in the OIDC provider meta data returned by the well-known endpoint or the JWKS endpoint passed to the SDK is empty.");
		let response;
		try {
			response = await fetch(jwksEndpoint, { credentials: configData.sendCookiesInRequests ? "include" : "same-origin" });
		} catch (error$1) {
			throw new ThunderIDAuthException("JS-AUTH_HELPER-VIT-NE02", "Request to jwks endpoint failed.", error$1 ?? "The request sent to get the jwks from the server failed.");
		}
		if (response.status !== 200 || !response.ok) throw new ThunderIDAuthException("JS-AUTH_HELPER-VIT-HE03", `Invalid response status received for jwks request (${response.statusText}).`, await response.json());
		const { issuer } = await this.oidcProviderMetaData();
		const { keys } = await response.json();
		const jwk = await this.cryptoHelper.getJWKForTheIdToken(idToken.split(".")[0], keys);
		return this.cryptoHelper.isValidIdToken(idToken, jwk, (await this.config()).clientId ?? "", issuer ?? "", this.cryptoHelper.decodeJwtToken(idToken).sub, (await this.config()).tokenValidation?.idToken?.clockTolerance, (await this.config()).tokenValidation?.idToken?.validateIssuer ?? true);
	}
	/**
	* Extracts user information from a decoded ID token payload.
	*
	* @param idToken - The raw ID token string.
	* @returns A `User` object built from the ID token claims.
	*/
	getAuthenticatedUserInfo(idToken) {
		const payload = this.cryptoHelper.decodeJwtToken(idToken);
		const username = payload?.["username"] ?? "";
		const givenName = payload?.["given_name"] ?? "";
		const familyName = payload?.["family_name"] ?? "";
		const fullName = givenName && familyName ? `${givenName} ${familyName}` : givenName || familyName || "";
		return {
			displayName: payload.preferred_username ?? fullName,
			username,
			...extractUserClaimsFromIdToken_default(payload)
		};
	}
	/**
	* Replaces template placeholders in a custom grant string with real session values.
	*
	* @param text - The template string containing placeholders.
	* @param userId - Optional user ID scoping the session lookup.
	* @returns The string with all placeholders replaced.
	* @throws {ThunderIDAuthException} When session data for the source instance cannot be found.
	*/
	async replaceCustomGrantTemplateTags(text, userId) {
		const configData = await this.config();
		const sourceInstanceId = configData.organizationChain?.sourceInstanceId ?? null;
		let sessionData;
		if (sourceInstanceId) {
			const { clientId } = configData;
			let instanceKey;
			if (clientId) instanceKey = `instance_${sourceInstanceId}-${clientId}`;
			else instanceKey = `instance_${sourceInstanceId}`;
			sessionData = await this.storageManager.getSessionData(userId, instanceKey);
			if (!sessionData?.access_token) throw new ThunderIDAuthException("JS-AUTH_HELPER-RCGTT-NE01", "No session data found for source instance.", "Failed to retrieve session data from the source organization context.");
		} else sessionData = await this.storageManager.getSessionData(userId);
		const scope = processOpenIDScopes_default(configData.scopes);
		if (typeof text !== "string") return text;
		return text.replace(TokenExchangeConstants_default.Placeholders.ACCESS_TOKEN, sessionData.access_token).replace(TokenExchangeConstants_default.Placeholders.USERNAME, this.getAuthenticatedUserInfo(sessionData.id_token).username ?? "").replace(TokenExchangeConstants_default.Placeholders.SCOPES, scope).replace(TokenExchangeConstants_default.Placeholders.CLIENT_ID, configData.clientId ?? "").replace(TokenExchangeConstants_default.Placeholders.CLIENT_SECRET, configData.clientSecret ?? "");
	}
	/**
	* Clears all temporary and session data for the given user.
	*
	* @param userId - Optional user ID scoping the session to clear.
	*/
	async clearSession(userId) {
		await this.storageManager.removeTemporaryData(userId);
		await this.storageManager.removeSessionData(userId);
	}
	/**
	* Parses a token endpoint response, optionally validates the ID token,
	* persists the session, and returns a normalized `TokenResponse`.
	*
	* @param response - The raw HTTP response from the token endpoint.
	* @param userId - Optional user ID scoping the session.
	* @returns A normalized `TokenResponse` object.
	* @throws {ThunderIDAuthException} When the response status is not 200.
	*/
	async handleTokenResponse(response, userId) {
		if (response.status !== 200 || !response.ok) throw new ThunderIDAuthException("JS-AUTH_HELPER-HTR-NE01", `Invalid response status received for token request (${response.statusText}).`, await response.json());
		const parsedResponse = await response.json();
		parsedResponse.created_at = (/* @__PURE__ */ new Date()).getTime();
		if ((await this.config()).tokenValidation?.idToken?.validate) return this.validateIdToken(parsedResponse.id_token).then(async () => {
			await this.storageManager.setSessionData(parsedResponse, userId);
			return {
				accessToken: parsedResponse.access_token,
				createdAt: parsedResponse.created_at,
				expiresIn: parsedResponse.expires_in,
				idToken: parsedResponse.id_token,
				refreshToken: parsedResponse.refresh_token,
				scope: parsedResponse.scope,
				tokenType: parsedResponse.token_type
			};
		});
		await this.storageManager.setSessionData(parsedResponse, userId);
		return {
			accessToken: parsedResponse.access_token,
			createdAt: parsedResponse.created_at,
			expiresIn: parsedResponse.expires_in,
			idToken: parsedResponse.id_token,
			refreshToken: parsedResponse.refresh_token,
			scope: parsedResponse.scope,
			tokenType: parsedResponse.token_type
		};
	}
};
var AuthenticationHelper_default = AuthenticationHelper;

//#endregion
//#region src/utils/base64Encode.ts
/**
* Encodes a string to standard base64 using `jose` (already a package dependency).
*
* `jose.base64url.encode` is environment-agnostic (browser, Node.js, Deno, Bun,
* edge/service-worker runtimes). It produces base64url output, which is then
* converted to standard base64 by restoring the `+`/`/` characters and adding
* `=` padding.
*
* @param value - The UTF-8 string to encode.
* @returns The standard base64-encoded string (with `+`, `/`, and `=` padding).
*
* @example
* ```typescript
* base64Encode('clientId:clientSecret'); // "Y2xpZW50SWQ6Y2xpZW50U2VjcmV0"
* ```
*/
const base64Encode = (value) => {
	const b64url = jose.base64url.encode(new TextEncoder().encode(value));
	const rem = b64url.length % 4;
	return (rem === 0 ? b64url : b64url + "=".repeat(4 - rem)).replace(/-/g, "+").replace(/_/g, "/");
};
var base64Encode_default = base64Encode;

//#endregion
//#region src/utils/deepMerge.ts
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
/**
* Checks if a value is a plain object (not an array, function, date, etc.)
*
* @param value - The value to check
* @returns True if the value is a plain object
*/
const isPlainObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof RegExp) && Object.prototype.toString.call(value) === "[object Object]";
/**
* Recursively merges the properties of source objects into a target object.
* Similar to Lodash's merge function, this creates a deep copy and merges
* nested objects recursively. Arrays and non-plain objects are replaced entirely.
*
* @param target - The target object to merge into
* @param sources - One or more source objects to merge from
* @returns A new object with merged properties
*
* @example
* ```typescript
* const obj1 = { a: 1, b: { x: 1, y: 2 } };
* const obj2 = { b: { y: 3, z: 4 }, c: 3 };
* const result = deepMerge(obj1, obj2);
* // Result: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 3 }
* ```
*
* @example
* ```typescript
* const config = { theme: { colors: { primary: 'blue' } } };
* const userPrefs = { theme: { colors: { secondary: 'red' } } };
* const merged = deepMerge(config, userPrefs);
* // Result: { theme: { colors: { primary: 'blue', secondary: 'red' } } }
* ```
*/
const deepMerge = (target, ...sources) => {
	if (!target || typeof target !== "object") throw new Error("Target must be an object");
	const result = { ...target };
	sources.forEach((source) => {
		if (!source || typeof source !== "object") return;
		Object.keys(source).forEach((key) => {
			const sourceValue = source[key];
			const targetValue = result[key];
			if (isPlainObject(sourceValue) && isPlainObject(targetValue)) result[key] = deepMerge(targetValue, sourceValue);
			else if (sourceValue !== void 0) result[key] = sourceValue;
		});
	});
	return result;
};
var deepMerge_default = deepMerge;

//#endregion
//#region src/utils/extractPkceStorageKeyFromState.ts
/**
* Extracts the PKCE key from a state parameter string.
*
* @param state - The state parameter string containing the request index.
* @returns The PKCE key string in the format `pkce_code_verifier_${index}`.
*
* @example
* ```typescript
* const state = "request_1";
* const pkceKey = extractPkceStorageKeyFromState(state);
* // Returns: "pkce_code_verifier_1"
* ```
*/
const extractPkceStorageKeyFromState = (state) => {
	const index = parseInt(state.split("request_")[1], 10);
	return `${PKCEConstants_default.Storage.StorageKeys.CODE_VERIFIER}${PKCEConstants_default.Storage.StorageKeys.SEPARATOR}${index}`;
};
var extractPkceStorageKeyFromState_default = extractPkceStorageKeyFromState;

//#endregion
//#region src/utils/generatePkceStorageKey.ts
/**
* Generates the next available PKCE storage key based on the current temporary data.
*
* The generated key will follow the format: `pkce_code_verifier_<index>`, where `<index>` is incremented
* based on the highest existing index in the provided storage object.
*
* @param tempStore - The object that holds temporary PKCE-related data (e.g., sessionStorage).
*
* @returns A new unique PKCE storage key to store the next `code_verifier`.
*
* @example
* const key = generatePkceStorageKey(sessionStorage);
* // Returns: "pkce_code_verifier_3" (if existing keys are pkce_code_verifier_0 to _2)
*/
const generatePkceStorageKey = (tempStore) => {
	const keys = [];
	Object.keys(tempStore).forEach((key) => {
		if (key.startsWith(PKCEConstants_default.Storage.StorageKeys.CODE_VERIFIER)) keys.push(key);
	});
	const lastKey = keys.sort().pop();
	const index = parseInt(lastKey?.split(PKCEConstants_default.Storage.StorageKeys.SEPARATOR)[1] ?? "-1", 10);
	return `${PKCEConstants_default.Storage.StorageKeys.CODE_VERIFIER}${PKCEConstants_default.Storage.StorageKeys.SEPARATOR}${index + 1}`;
};
var generatePkceStorageKey_default = generatePkceStorageKey;

//#endregion
//#region src/utils/generateStateParamForRequestCorrelation.ts
/**
* Generates a state parameter for request correlation by combining an optional state string with a request index.
*
* @param pkceKey - The PKCE key containing the index (format: 'pkce_code_verifier_[index]').
* @param state - Optional state string to prepend to the request correlation.
* @returns A state parameter string in the format '[state_]request_[index]'.
*
* @example
* const pkceKey = "pkce_code_verifier_1";
* const result = generateStateParamForRequestCorrelation(pkceKey, "myState");
* // Returns: "myState_request_1"
*
* const resultNoState = generateStateParamForRequestCorrelation(pkceKey);
* // Returns: "request_1"
*/
const generateStateParamForRequestCorrelation = (pkceKey, state) => {
	const index = parseInt(pkceKey.split(PKCEConstants_default.Storage.StorageKeys.SEPARATOR)[1], 10);
	return state ? `${state}_request_${index}` : `request_${index}`;
};
var generateStateParamForRequestCorrelation_default = generateStateParamForRequestCorrelation;

//#endregion
//#region src/utils/getAuthorizeRequestUrlParams.ts
/**
* Generates a map of authorization request URL parameters for OIDC authorization requests.
*
* This utility ensures the `openid` scope is always included, handles both string and array forms of the `scope` parameter,
* and supports PKCE and custom parameters. Throws if a code challenge is provided without a code challenge method.
*
* @param options - The main options for the authorization request, including redirectUri, clientId, scope, responseMode, codeChallenge, codeChallengeMethod, and prompt.
* @param pkceOptions - PKCE options, including the PKCE key for state correlation.
* @param customParams - Optional custom parameters to include in the request (excluding the `state` param, which is handled separately).
* @returns A Map of key-value pairs representing the authorization request URL parameters.
*
* @throws {ThunderIDRuntimeError} If a code challenge is provided without a code challenge method.
*
* @example
* const params = getAuthorizeRequestUrlParams({
*   options: {
*     redirectUri: 'https://app/callback',
*     clientId: 'client123',
*     scope: ['openid', 'profile'],
*     responseMode: 'query',
*     codeChallenge: 'abc',
*     codeChallengeMethod: 'S256',
*     prompt: 'login'
*   },
*   pkceOptions: { key: 'pkce_code_verifier_1' },
*   customParams: { foo: 'bar' }
* });
* // Returns a Map with all required OIDC params, PKCE, and custom params.
*/
const getAuthorizeRequestUrlParams = (options, pkceOptions, customParams) => {
	const { redirectUri, clientId, scopes, responseMode, codeChallenge, codeChallengeMethod, prompt } = options;
	const authorizeRequestParams = /* @__PURE__ */ new Map();
	authorizeRequestParams.set("response_type", "code");
	authorizeRequestParams.set("client_id", clientId);
	authorizeRequestParams.set("scope", scopes ?? "");
	authorizeRequestParams.set("redirect_uri", redirectUri);
	if (responseMode) authorizeRequestParams.set("response_mode", responseMode);
	const pkceKey = pkceOptions?.key;
	if (codeChallenge) {
		authorizeRequestParams.set("code_challenge", codeChallenge);
		if (codeChallengeMethod) authorizeRequestParams.set("code_challenge_method", codeChallengeMethod);
		else throw new ThunderIDRuntimeError("Code challenge method is required when code challenge is provided.", "getAuthorizeRequestUrlParams-ValidationError-001", "javascript", "When PKCE is enabled, the code challenge method must be provided along with the code challenge.");
	}
	if (prompt) authorizeRequestParams.set("prompt", prompt);
	if (customParams) Object.entries(customParams).forEach(([key, value]) => {
		if (key !== "" && value !== "" && key !== OIDCRequestConstants_default.Params.STATE) authorizeRequestParams.set(key, value.toString());
	});
	const AUTH_INSTANCE_PREFIX = "instance_";
	let customStateValue = "";
	if (options.instanceId) customStateValue = AUTH_INSTANCE_PREFIX + options.instanceId;
	else if (customParams) customStateValue = customParams[OIDCRequestConstants_default.Params.STATE]?.toString() ?? "";
	authorizeRequestParams.set(OIDCRequestConstants_default.Params.STATE, generateStateParamForRequestCorrelation_default(pkceKey, customStateValue));
	return authorizeRequestParams;
};
var getAuthorizeRequestUrlParams_default = getAuthorizeRequestUrlParams;

//#endregion
//#region src/ThunderIDJavaScriptClient.ts
const WELL_KNOWN_PATH = "/.well-known/openid-configuration";
const DEFAULT_CONFIG = {
	enablePKCE: true,
	responseMode: "query",
	sendCookiesInRequests: true,
	tokenValidation: { idToken: {
		clockTolerance: 300,
		validate: true,
		validateIssuer: true
	} }
};
var ThunderIDJavaScriptClient = class {
	storageManager;
	cryptoUtils;
	configProvider;
	oidcProviderMetaDataProvider;
	authHelper;
	cryptoHelper;
	instanceIdValue = 0;
	cacheStore;
	baseURL = "";
	constructor(storage, cryptoUtils) {
		this.cacheStore = storage ?? new DefaultCacheStore();
		this.cryptoUtils = cryptoUtils ?? new DefaultCrypto();
	}
	async initialize(config, storage) {
		const store = storage ?? this.cacheStore;
		const fullConfig = config;
		const { clientId, instanceId } = fullConfig;
		if (instanceId !== void 0) this.instanceIdValue = instanceId;
		this.storageManager = new StorageManager_default(clientId ? `instance_${this.instanceIdValue}-${clientId}` : `instance_${this.instanceIdValue}`, store);
		this.cryptoHelper = new IsomorphicCrypto(this.cryptoUtils);
		this.authHelper = new AuthenticationHelper_default(this.storageManager, this.cryptoHelper);
		this.configProvider = async () => this.storageManager.getConfigData();
		this.oidcProviderMetaDataProvider = async () => this.storageManager.loadOpenIDProviderConfiguration();
		const { applicationId, endpoints } = fullConfig;
		let resolvedApplicationId = applicationId;
		if (applicationId) await this.storageManager.setPersistedData({ applicationId });
		else {
			const persistedData = await this.storageManager.getPersistedData();
			if (persistedData?.["applicationId"]) resolvedApplicationId = persistedData["applicationId"];
		}
		const resolvedEndpoints = endpoints ? { ...endpoints } : {};
		await this.storageManager.setConfigData({
			...DEFAULT_CONFIG,
			...fullConfig,
			applicationId: resolvedApplicationId,
			endpoints: resolvedEndpoints,
			scope: processOpenIDScopes_default(fullConfig.scopes)
		});
		this.baseURL = fullConfig.baseUrl ?? "";
		return true;
	}
	async reInitialize(config) {
		const newConfig = deepMerge_default(await this.storageManager.getConfigData(), config);
		await this.storageManager.setConfigData(newConfig);
		await this.loadOpenIDProviderConfiguration(true);
		return true;
	}
	getConfiguration() {
		return this.storageManager.getConfigData();
	}
	async getUser(userId) {
		const sessionData = await this.storageManager.getSessionData(userId);
		const authenticatedUser = this.authHelper.getAuthenticatedUserInfo(sessionData?.id_token);
		Object.keys(authenticatedUser).forEach((key) => {
			if (authenticatedUser[key] === void 0 || authenticatedUser[key] === "" || authenticatedUser[key] === null) delete authenticatedUser[key];
		});
		return authenticatedUser;
	}
	async isSignedIn(userId) {
		if (!Boolean(await this.getAccessToken(userId))) return false;
		const sessionData = await this.storageManager.getSessionData(userId);
		const createdAt = sessionData?.created_at;
		const expiresInString = sessionData?.expires_in;
		if (!expiresInString) return false;
		return createdAt + parseInt(expiresInString, 10) * 1e3 > (/* @__PURE__ */ new Date()).getTime();
	}
	async getAccessToken(sessionId) {
		return (await this.storageManager.getSessionData(sessionId))?.access_token;
	}
	clearSession(sessionId) {
		this.authHelper.clearSession(sessionId);
	}
	async setSession(sessionData, sessionId) {
		await this.storageManager.setSessionData(sessionData, sessionId);
	}
	async decodeJwtToken(token) {
		return this.cryptoHelper.decodeJwtToken(token);
	}
	async exchangeToken(config, sessionId) {
		if (!await this.storageManager.getTemporaryDataParameter(OIDCDiscoveryConstants_default.Storage.StorageKeys.OPENID_PROVIDER_CONFIG_INITIATED)) await this.loadOpenIDProviderConfiguration(false);
		const oidcProviderMetadata = await this.oidcProviderMetaDataProvider();
		const configData = await this.configProvider();
		let tokenEndpoint;
		if (config.tokenEndpoint && config.tokenEndpoint.trim().length !== 0) tokenEndpoint = config.tokenEndpoint;
		else tokenEndpoint = oidcProviderMetadata.token_endpoint;
		if (!tokenEndpoint || tokenEndpoint.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-RCG-NF01", "Token endpoint not found.", "No token endpoint was found in the OIDC provider meta data returned by the well-known endpoint or the token endpoint passed to the SDK is empty.");
		const data = await Promise.all(Object.entries(config.data).map(async ([key, value]) => {
			return `${key}=${await this.authHelper.replaceCustomGrantTemplateTags(value, sessionId)}`;
		}));
		let requestHeaders = {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		};
		if (config.attachToken) requestHeaders = {
			...requestHeaders,
			Authorization: `Bearer ${(await this.storageManager.getSessionData(sessionId)).access_token}`
		};
		const requestConfig = {
			body: data.join("&"),
			credentials: configData.sendCookiesInRequests ? "include" : "same-origin",
			headers: new Headers(requestHeaders),
			method: "POST"
		};
		let response;
		try {
			response = await fetch(tokenEndpoint, requestConfig);
		} catch (error$1) {
			throw new ThunderIDAuthException("JS-AUTH_CORE-RCG-NE02", "The custom grant request failed.", error$1 ?? "The request sent to get the custom grant failed.");
		}
		if (response.status !== 200 || !response.ok) throw new ThunderIDAuthException("JS-AUTH_CORE-RCG-HE03", `Invalid response status received for the custom grant request. (${response.statusText})`, await response.json());
		if (config.returnsSession) return this.authHelper.handleTokenResponse(response, sessionId);
		return await response.json();
	}
	isLoading() {
		throw new Error("Method not implemented.");
	}
	signIn(_options) {
		throw new Error("Method not implemented.");
	}
	signOut(_options, _sessionIdOrAfterSignOut, _afterSignOut) {
		throw new Error("Method not implemented.");
	}
	signInSilently(_options) {
		throw new Error("Method not implemented.");
	}
	signUp(_optionsOrPayload) {
		throw new Error("Method not implemented.");
	}
	recover(_payload) {
		throw new Error("Method not implemented.");
	}
	switchOrganization(_organization, _sessionId) {
		throw new Error("Method not implemented.");
	}
	getCurrentOrganization(_sessionId) {
		throw new Error("Method not implemented.");
	}
	getAllOrganizations(_options, _sessionId) {
		throw new Error("Method not implemented.");
	}
	getMyOrganizations(_options, _sessionId) {
		throw new Error("Method not implemented.");
	}
	getUserProfile(_options) {
		throw new Error("Method not implemented.");
	}
	updateUserProfile(_payload, _userId) {
		throw new Error("Method not implemented.");
	}
	async loadOpenIDProviderConfiguration(forceInit = false) {
		const configData = await this.configProvider();
		if (!forceInit && await this.storageManager.getTemporaryDataParameter(OIDCDiscoveryConstants_default.Storage.StorageKeys.OPENID_PROVIDER_CONFIG_INITIATED)) return;
		const { discovery, baseUrl, endpoints } = configData;
		const resolvedWellKnownEndpoint = endpoints?.wellKnown || (discovery?.wellKnown?.enabled !== false && baseUrl ? `${baseUrl}${WELL_KNOWN_PATH}` : void 0);
		if (resolvedWellKnownEndpoint) {
			let response;
			try {
				response = await fetch(resolvedWellKnownEndpoint);
				if (response.status !== 200 || !response.ok) throw new Error();
			} catch {
				throw new ThunderIDAuthException("JS-AUTH_CORE-GOPMD-HE01", "Invalid well-known response", "The well known endpoint response has been failed with an error.");
			}
			await this.storageManager.setOIDCProviderMetaData(await this.authHelper.resolveEndpoints(await response.json()));
		} else if (baseUrl) try {
			await this.storageManager.setOIDCProviderMetaData(await this.authHelper.resolveEndpointsByBaseURL());
		} catch (error$1) {
			throw new ThunderIDAuthException("JS-AUTH_CORE-GOPMD-IV02", "Resolving endpoints failed.", error$1 ?? "Resolving endpoints by base url failed.");
		}
		else await this.storageManager.setOIDCProviderMetaData(await this.authHelper.resolveEndpointsExplicitly());
		await this.storageManager.setTemporaryDataParameter(OIDCDiscoveryConstants_default.Storage.StorageKeys.OPENID_PROVIDER_CONFIG_INITIATED, true);
	}
	async getSignInUrl(requestConfig, userId) {
		const authRequestConfig = { ...requestConfig };
		delete authRequestConfig?.forceInit;
		const buildSignInUrl = async () => {
			const authorizeEndpoint = await this.storageManager.getOIDCProviderMetaDataParameter(OIDCDiscoveryConstants_default.Storage.StorageKeys.Endpoints.AUTHORIZATION);
			if (!authorizeEndpoint || authorizeEndpoint.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-GAU-NF01", "No authorization endpoint found.", "No authorization endpoint was found in the OIDC provider meta data from the well-known endpoint or the authorization endpoint passed to the SDK is empty.");
			const authorizeRequest = new URL(authorizeEndpoint);
			const configData = await this.configProvider();
			const pkceKey = await generatePkceStorageKey_default(await this.storageManager.getTemporaryData(userId));
			let codeVerifier;
			let codeChallenge;
			if (configData.enablePKCE) {
				codeVerifier = this.cryptoHelper?.getCodeVerifier();
				codeChallenge = await this.cryptoHelper?.getCodeChallenge(codeVerifier);
				await this.storageManager.setTemporaryDataParameter(pkceKey, codeVerifier, userId);
			}
			if (authRequestConfig["client_secret"]) authRequestConfig["client_secret"] = configData.clientSecret ?? "";
			const authorizeRequestParams = getAuthorizeRequestUrlParams_default(Object.fromEntries(Object.entries({
				clientId: configData.clientId ?? "",
				codeChallenge,
				codeChallengeMethod: PKCEConstants_default.DEFAULT_CODE_CHALLENGE_METHOD,
				instanceId: this.getInstanceId().toString(),
				prompt: configData.prompt,
				redirectUri: configData.afterSignInUrl ?? "",
				responseMode: configData.responseMode,
				scopes: processOpenIDScopes_default(configData.scopes)
			}).filter(([, v]) => v !== void 0)), { key: pkceKey }, authRequestConfig);
			Array.from(authorizeRequestParams.entries()).forEach(([paramKey, paramValue]) => {
				authorizeRequest.searchParams.append(paramKey, paramValue);
			});
			return authorizeRequest.toString();
		};
		if (await this.storageManager.getTemporaryDataParameter(OIDCDiscoveryConstants_default.Storage.StorageKeys.OPENID_PROVIDER_CONFIG_INITIATED)) return buildSignInUrl();
		return this.loadOpenIDProviderConfiguration(requestConfig?.forceInit).then(() => buildSignInUrl());
	}
	async requestAccessToken(authorizationCode, sessionState, state, userId, tokenRequestConfig) {
		if (!await this.storageManager.getTemporaryDataParameter(OIDCDiscoveryConstants_default.Storage.StorageKeys.OPENID_PROVIDER_CONFIG_INITIATED)) await this.loadOpenIDProviderConfiguration(false);
		const tokenEndpoint = (await this.oidcProviderMetaDataProvider()).token_endpoint;
		const configData = await this.configProvider();
		if (!tokenEndpoint || tokenEndpoint.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-RAT1-NF01", "Token endpoint not found.", "No token endpoint was found in the OIDC provider meta data returned by the well-known endpoint or the token endpoint passed to the SDK is empty.");
		if (sessionState) await this.storageManager.setSessionDataParameter(OIDCRequestConstants_default.Params.SESSION_STATE, sessionState, userId);
		const body = new URLSearchParams();
		body.set("client_id", configData.clientId ?? "");
		const hasSecret = Boolean(configData.clientSecret && configData.clientSecret.trim().length > 0);
		const tokenEndpointAuthMethod = configData.tokenRequest?.authMethod ?? "client_secret_basic";
		if (hasSecret && tokenEndpointAuthMethod === "client_secret_post") body.set("client_secret", configData.clientSecret);
		body.set("code", authorizationCode);
		body.set("grant_type", "authorization_code");
		body.set("redirect_uri", configData.afterSignInUrl ?? "");
		if (tokenRequestConfig?.params) Object.entries(tokenRequestConfig.params).forEach(([key, value]) => {
			body.append(key, value);
		});
		if (configData.enablePKCE) {
			body.set("code_verifier", `${await this.storageManager.getTemporaryDataParameter(extractPkceStorageKeyFromState_default(state), userId)}`);
			await this.storageManager.removeTemporaryDataParameter(extractPkceStorageKeyFromState_default(state), userId);
		}
		const tokenRequestHeaders = {
			Accept: "application/json",
			"Content-Type": "application/x-www-form-urlencoded"
		};
		if (hasSecret && tokenEndpointAuthMethod === "client_secret_basic") tokenRequestHeaders["Authorization"] = `Basic ${base64Encode_default(`${encodeURIComponent(configData.clientId)}:${encodeURIComponent(configData.clientSecret)}`)}`;
		let tokenResponse;
		try {
			tokenResponse = await fetch(tokenEndpoint, {
				body,
				credentials: configData.sendCookiesInRequests ? "include" : "same-origin",
				headers: tokenRequestHeaders,
				method: "POST"
			});
		} catch (error$1) {
			throw new ThunderIDAuthException("JS-AUTH_CORE-RAT1-NE02", "Requesting access token failed", error$1 ?? "The request to get the access token from the server failed.");
		}
		if (!tokenResponse.ok) throw new ThunderIDAuthException("JS-AUTH_CORE-RAT1-HE03", `Requesting access token failed with ${tokenResponse.statusText}`, await tokenResponse.json());
		return this.authHelper.handleTokenResponse(tokenResponse, userId);
	}
	async getSignOutUrl(userId) {
		const logoutEndpoint = (await this.oidcProviderMetaDataProvider())?.end_session_endpoint;
		const configData = await this.configProvider();
		if (!logoutEndpoint || logoutEndpoint.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-GSOU-NF01", "Sign-out endpoint not found.", "No sign-out endpoint was found in the OIDC provider meta data returned by the well-known endpoint or the sign-out endpoint passed to the SDK is empty.");
		const callbackURL = configData?.afterSignOutUrl ?? configData?.afterSignInUrl;
		if (!callbackURL || callbackURL.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-GSOU-NF03", "No sign-out redirect URL found.", "The sign-out redirect URL cannot be found or the URL passed to the SDK is empty.");
		const queryParams = new URLSearchParams();
		queryParams.set("post_logout_redirect_uri", callbackURL);
		if (configData.sendIdTokenInLogoutRequest) {
			const idToken = (await this.storageManager.getSessionData(userId))?.id_token;
			if (!idToken || idToken.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-GSOU-NF02", "ID token not found.", "No ID token could be found. Either the session information is lost or you have not signed in.");
			queryParams.set("id_token_hint", idToken);
		} else queryParams.set("client_id", configData.clientId ?? "");
		queryParams.set("state", OIDCRequestConstants_default.Params.SIGN_OUT_SUCCESS);
		return `${logoutEndpoint}?${queryParams.toString()}`;
	}
	async getOpenIDProviderEndpoints() {
		const meta = await this.oidcProviderMetaDataProvider();
		return {
			authorizationEndpoint: meta.authorization_endpoint ?? "",
			checkSessionIframe: meta.check_session_iframe ?? "",
			endSessionEndpoint: meta.end_session_endpoint ?? "",
			introspectionEndpoint: meta.introspection_endpoint ?? "",
			issuer: meta.issuer ?? "",
			jwksUri: meta.jwks_uri ?? "",
			registrationEndpoint: meta.registration_endpoint ?? "",
			revocationEndpoint: meta.revocation_endpoint ?? "",
			tokenEndpoint: meta.token_endpoint ?? "",
			userinfoEndpoint: meta.userinfo_endpoint ?? ""
		};
	}
	async getDiscoveryResponse() {
		if (!this.storageManager) return null;
		return this.storageManager.loadOpenIDProviderConfiguration();
	}
	async getDecodedIdToken(userId, idToken) {
		const storedIdToken = (await this.storageManager.getSessionData(userId)).id_token;
		return this.cryptoHelper.decodeJwtToken(storedIdToken ?? idToken);
	}
	async getIdToken(userId) {
		return (await this.storageManager.getSessionData(userId)).id_token;
	}
	async getUserSession(userId) {
		const sessionData = await this.storageManager.getSessionData(userId);
		return {
			scopes: sessionData?.scope?.split(" "),
			sessionState: sessionData?.session_state ?? ""
		};
	}
	async refreshAccessToken(userId) {
		const tokenEndpoint = (await this.oidcProviderMetaDataProvider()).token_endpoint;
		const configData = await this.configProvider();
		const sessionData = await this.storageManager.getSessionData(userId);
		if (!sessionData.refresh_token) throw new ThunderIDAuthException("JS-AUTH_CORE-RAT2-NF01", "No refresh token found.", "There was no refresh token found. The server doesn't return a refresh token if the refresh token grant is not enabled.");
		if (!tokenEndpoint || tokenEndpoint.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-RAT2-NF02", "No refresh token endpoint found.", "No refresh token endpoint was in the OIDC provider meta data returned by the well-known endpoint.");
		const body = [
			`client_id=${configData.clientId}`,
			`refresh_token=${sessionData.refresh_token}`,
			"grant_type=refresh_token"
		];
		if (configData.clientSecret && configData.clientSecret.trim().length > 0) body.push(`client_secret=${configData.clientSecret}`);
		let tokenResponse;
		try {
			tokenResponse = await fetch(tokenEndpoint, {
				body: body.join("&"),
				credentials: configData.sendCookiesInRequests ? "include" : "same-origin",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: "POST"
			});
		} catch (error$1) {
			throw new ThunderIDAuthException("JS-AUTH_CORE-RAT2-NR03", "Refresh access token request failed.", error$1 ?? "The request to refresh the access token failed.");
		}
		if (!tokenResponse.ok) throw new ThunderIDAuthException("JS-AUTH_CORE-RAT2-HE04", `Refreshing access token failed with ${tokenResponse.statusText}`, await tokenResponse.json());
		return this.authHelper.handleTokenResponse(tokenResponse, userId);
	}
	async revokeAccessToken(userId) {
		const revokeTokenEndpoint = (await this.oidcProviderMetaDataProvider()).revocation_endpoint;
		const configData = await this.configProvider();
		if (!revokeTokenEndpoint || revokeTokenEndpoint.trim().length === 0) throw new ThunderIDAuthException("JS-AUTH_CORE-RAT3-NF01", "No revoke access token endpoint found.", "No revoke access token endpoint was found in the OIDC provider meta data.");
		const body = [
			`client_id=${configData.clientId}`,
			`token=${(await this.storageManager.getSessionData(userId)).access_token}`,
			"token_type_hint=access_token"
		];
		if (configData.clientSecret && configData.clientSecret.trim().length > 0) body.push(`client_secret=${configData.clientSecret}`);
		let response;
		try {
			response = await fetch(revokeTokenEndpoint, {
				body: body.join("&"),
				credentials: configData.sendCookiesInRequests ? "include" : "same-origin",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: "POST"
			});
		} catch (error$1) {
			throw new ThunderIDAuthException("JS-AUTH_CORE-RAT3-NE02", "The request to revoke access token failed.", error$1 ?? "The request sent to revoke the access token failed.");
		}
		if (response.status !== 200 || !response.ok) throw new ThunderIDAuthException("JS-AUTH_CORE-RAT3-HE03", `Invalid response status received for revoke access token request (${response.statusText}).`, await response.json());
		this.authHelper.clearSession(userId);
		return response;
	}
	async getPKCECode(state, userId) {
		return await this.storageManager.getTemporaryDataParameter(extractPkceStorageKeyFromState_default(state), userId);
	}
	async setPKCECode(pkce, state, userId) {
		return this.storageManager.setTemporaryDataParameter(extractPkceStorageKeyFromState_default(state), pkce, userId);
	}
	getInstanceId() {
		return this.instanceIdValue;
	}
	getStorageManager() {
		return this.storageManager;
	}
	getCryptoHelper() {
		return this.cryptoHelper;
	}
	static isSignOutSuccessful(afterSignOutUrl) {
		const url = new URL(afterSignOutUrl);
		const stateParam = url.searchParams.get(OIDCRequestConstants_default.Params.STATE);
		const error$1 = Boolean(url.searchParams.get("error"));
		return stateParam ? stateParam === OIDCRequestConstants_default.Params.SIGN_OUT_SUCCESS && !error$1 : false;
	}
	static didSignOutFail(afterSignOutUrl) {
		const url = new URL(afterSignOutUrl);
		const stateParam = url.searchParams.get(OIDCRequestConstants_default.Params.STATE);
		const error$1 = Boolean(url.searchParams.get("error"));
		return stateParam ? stateParam === OIDCRequestConstants_default.Params.SIGN_OUT_SUCCESS && error$1 : false;
	}
	async getAgentToken(agentConfig) {
		const authorizeURL = new URL(await this.getSignInUrl({ response_mode: "direct" }));
		const authorizeResponse = await initializeEmbeddedSignInFlow_default({
			payload: Object.fromEntries(authorizeURL.searchParams.entries()),
			url: `${authorizeURL.origin}${authorizeURL.pathname}`
		});
		const authenticatorName = agentConfig.authenticatorName ?? AgentConfig.DEFAULT_AUTHENTICATOR_NAME;
		const targetAuthenticator = authorizeResponse.nextStep.authenticators.find((auth) => auth.authenticator === authenticatorName);
		if (!targetAuthenticator) throw new Error(`Authenticator '${authenticatorName}' not found among authentication steps.`);
		const authnResponse = await executeEmbeddedSignInFlow_default({
			baseUrl: this.baseURL,
			payload: {
				flowId: authorizeResponse.flowId,
				selectedAuthenticator: {
					authenticatorId: targetAuthenticator.authenticatorId,
					params: {
						password: agentConfig.agentSecret,
						username: agentConfig.agentID
					}
				}
			}
		});
		if (authnResponse.flowStatus !== EmbeddedSignInFlowStatus.SuccessCompleted) throw new Error("Agent authentication failed.");
		return this.requestAccessToken(authnResponse.authData["code"], authnResponse.authData["session_state"], authnResponse.authData["state"]);
	}
	async getOBOSignInURL(agentConfig) {
		const authURL = await this.getSignInUrl({ requested_actor: agentConfig.agentID });
		if (authURL) return authURL.toString();
		throw new Error("Could not build Authorize URL");
	}
	async getOBOToken(agentConfig, authCodeResponse) {
		const agentToken = await this.getAgentToken(agentConfig);
		return this.requestAccessToken(authCodeResponse.code, authCodeResponse.session_state, authCodeResponse.state, void 0, { params: { actor_token: agentToken.accessToken } });
	}
};
var ThunderIDJavaScriptClient_default = ThunderIDJavaScriptClient;

//#endregion
//#region src/theme/createTheme.ts
const lightTheme = {
	borderRadius: {
		large: "16px",
		medium: "8px",
		small: "4px"
	},
	colors: {
		action: {
			activatedOpacity: .12,
			active: "rgba(0, 0, 0, 0.54)",
			disabled: "rgba(0, 0, 0, 0.26)",
			disabledBackground: "rgba(0, 0, 0, 0.12)",
			disabledOpacity: .38,
			focus: "rgba(0, 0, 0, 0.12)",
			focusOpacity: .12,
			hover: "rgba(0, 0, 0, 0.04)",
			hoverOpacity: .04,
			selected: "rgba(0, 0, 0, 0.08)",
			selectedOpacity: .08
		},
		background: {
			body: {
				dark: "#212121",
				main: "#1a1a1a"
			},
			dark: "#212121",
			disabled: "#f0f0f0",
			surface: "#ffffff"
		},
		border: "#e0e0e0",
		error: {
			contrastText: "#d52828",
			dark: "#b71c1c",
			light: "#fef2f2",
			main: "#d32f2f"
		},
		info: {
			contrastText: "#43aeda",
			dark: "#01579b",
			light: "#eff6ff",
			main: "#bbebff"
		},
		primary: {
			contrastText: "#ffffff",
			dark: "#174ea6",
			main: "#1a73e8"
		},
		secondary: {
			contrastText: "#ffffff",
			dark: "#212121",
			light: "#f3f4f6",
			main: "#424242"
		},
		success: {
			contrastText: "#00a807",
			dark: "#388e3c",
			light: "#f0fdf4",
			main: "#4caf50"
		},
		text: {
			dark: "#212121",
			primary: "#1a1a1a",
			secondary: "#666666"
		},
		warning: {
			contrastText: "#be7100",
			dark: "#f57c00",
			light: "#fffbeb",
			main: "#ff9800"
		}
	},
	images: {
		favicon: {},
		logo: {}
	},
	shadows: {
		large: "0 8px 32px rgba(0, 0, 0, 0.2)",
		medium: "0 4px 16px rgba(0, 0, 0, 0.15)",
		small: "0 2px 8px rgba(0, 0, 0, 0.1)"
	},
	spacing: { unit: 8 },
	typography: {
		fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
		fontSizes: {
			"2xl": "1.5rem",
			"3xl": "2.125rem",
			lg: "1.125rem",
			md: "1rem",
			sm: "0.875rem",
			xl: "1.25rem",
			xs: "0.75rem"
		},
		fontWeights: {
			bold: 700,
			medium: 500,
			normal: 400,
			semibold: 600
		},
		lineHeights: {
			normal: 1.4,
			relaxed: 1.6,
			tight: 1.2
		}
	}
};
const darkTheme = {
	borderRadius: {
		large: "16px",
		medium: "8px",
		small: "4px"
	},
	colors: {
		action: {
			activatedOpacity: .12,
			active: "#1c1c1c",
			disabled: "rgba(255, 255, 255, 0.26)",
			disabledBackground: "rgba(255, 255, 255, 0.12)",
			disabledOpacity: .38,
			focus: "#1c1c1c",
			focusOpacity: .12,
			hover: "#1c1c1c",
			hoverOpacity: .04,
			selected: "#1c1c1c",
			selectedOpacity: .08
		},
		background: {
			body: {
				dark: "#212121",
				main: "#ffffff"
			},
			dark: "#212121",
			disabled: "#1f1f1f",
			surface: "#121212"
		},
		border: "#404040",
		error: {
			contrastText: "#d52828",
			dark: "#b71c1c",
			light: "#2d1515",
			main: "#d32f2f"
		},
		info: {
			contrastText: "#43aeda",
			dark: "#01579b",
			light: "#0f1f35",
			main: "#bbebff"
		},
		primary: {
			contrastText: "#ffffff",
			dark: "#174ea6",
			main: "#1a73e8"
		},
		secondary: {
			contrastText: "#ffffff",
			dark: "#212121",
			light: "#2a2a2a",
			main: "#8b8b8b"
		},
		success: {
			contrastText: "#00a807",
			dark: "#388e3c",
			light: "#132d1a",
			main: "#4caf50"
		},
		text: {
			dark: "#212121",
			primary: "#ffffff",
			secondary: "#b3b3b3"
		},
		warning: {
			contrastText: "#be7100",
			dark: "#f57c00",
			light: "#2d2310",
			main: "#ff9800"
		}
	},
	images: {
		favicon: {},
		logo: {}
	},
	shadows: {
		large: "0 8px 32px rgba(0, 0, 0, 0.5)",
		medium: "0 4px 16px rgba(0, 0, 0, 0.4)",
		small: "0 2px 8px rgba(0, 0, 0, 0.3)"
	},
	spacing: { unit: 8 },
	typography: {
		fontFamily: "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
		fontSizes: {
			"2xl": "1.5rem",
			"3xl": "2.125rem",
			lg: "1.125rem",
			md: "1rem",
			sm: "0.875rem",
			xl: "1.25rem",
			xs: "0.75rem"
		},
		fontWeights: {
			bold: 700,
			medium: 500,
			normal: 400,
			semibold: 600
		},
		lineHeights: {
			normal: 1.4,
			relaxed: 1.6,
			tight: 1.2
		}
	}
};
const toCssVariables = (theme) => {
	const cssVars = {};
	const prefix = theme.cssVarPrefix || VendorConstants_default.VENDOR_PREFIX;
	if (theme.colors?.action?.active) cssVars[`--${prefix}-color-action-active`] = theme.colors.action.active;
	if (theme.colors?.action?.hover) cssVars[`--${prefix}-color-action-hover`] = theme.colors.action.hover;
	if (theme.colors?.action?.hoverOpacity !== void 0) cssVars[`--${prefix}-color-action-hoverOpacity`] = theme.colors.action.hoverOpacity.toString();
	if (theme.colors?.action?.selected) cssVars[`--${prefix}-color-action-selected`] = theme.colors.action.selected;
	if (theme.colors?.action?.selectedOpacity !== void 0) cssVars[`--${prefix}-color-action-selectedOpacity`] = theme.colors.action.selectedOpacity.toString();
	if (theme.colors?.action?.disabled) cssVars[`--${prefix}-color-action-disabled`] = theme.colors.action.disabled;
	if (theme.colors?.action?.disabledBackground) cssVars[`--${prefix}-color-action-disabledBackground`] = theme.colors.action.disabledBackground;
	if (theme.colors?.action?.disabledOpacity !== void 0) cssVars[`--${prefix}-color-action-disabledOpacity`] = theme.colors.action.disabledOpacity.toString();
	if (theme.colors?.action?.focus) cssVars[`--${prefix}-color-action-focus`] = theme.colors.action.focus;
	if (theme.colors?.action?.focusOpacity !== void 0) cssVars[`--${prefix}-color-action-focusOpacity`] = theme.colors.action.focusOpacity.toString();
	if (theme.colors?.action?.activatedOpacity !== void 0) cssVars[`--${prefix}-color-action-activatedOpacity`] = theme.colors.action.activatedOpacity.toString();
	if (theme.colors?.primary?.main) cssVars[`--${prefix}-color-primary-main`] = theme.colors.primary.main;
	if (theme.colors?.primary?.contrastText) cssVars[`--${prefix}-color-primary-contrastText`] = theme.colors.primary.contrastText;
	if (theme.colors?.secondary?.main) cssVars[`--${prefix}-color-secondary-main`] = theme.colors.secondary.main;
	if (theme.colors?.secondary?.contrastText) cssVars[`--${prefix}-color-secondary-contrastText`] = theme.colors.secondary.contrastText;
	if (theme.colors?.secondary?.light) cssVars[`--${prefix}-color-secondary-light`] = theme.colors.secondary.light;
	if (theme.colors?.background?.surface) cssVars[`--${prefix}-color-background-surface`] = theme.colors.background.surface;
	if (theme.colors?.background?.disabled) cssVars[`--${prefix}-color-background-disabled`] = theme.colors.background.disabled;
	if (theme.colors?.background?.body?.main) cssVars[`--${prefix}-color-background-body-main`] = theme.colors.background.body.main;
	if (theme.colors?.error?.main) cssVars[`--${prefix}-color-error-main`] = theme.colors.error.main;
	if (theme.colors?.error?.contrastText) cssVars[`--${prefix}-color-error-contrastText`] = theme.colors.error.contrastText;
	if (theme.colors?.error?.light) cssVars[`--${prefix}-color-error-light`] = theme.colors.error.light;
	if (theme.colors?.success?.main) cssVars[`--${prefix}-color-success-main`] = theme.colors.success.main;
	if (theme.colors?.success?.contrastText) cssVars[`--${prefix}-color-success-contrastText`] = theme.colors.success.contrastText;
	if (theme.colors?.success?.light) cssVars[`--${prefix}-color-success-light`] = theme.colors.success.light;
	if (theme.colors?.warning?.main) cssVars[`--${prefix}-color-warning-main`] = theme.colors.warning.main;
	if (theme.colors?.warning?.contrastText) cssVars[`--${prefix}-color-warning-contrastText`] = theme.colors.warning.contrastText;
	if (theme.colors?.warning?.light) cssVars[`--${prefix}-color-warning-light`] = theme.colors.warning.light;
	if (theme.colors?.info?.main) cssVars[`--${prefix}-color-info-main`] = theme.colors.info.main;
	if (theme.colors?.info?.contrastText) cssVars[`--${prefix}-color-info-contrastText`] = theme.colors.info.contrastText;
	if (theme.colors?.info?.light) cssVars[`--${prefix}-color-info-light`] = theme.colors.info.light;
	if (theme.colors?.text?.primary) cssVars[`--${prefix}-color-text-primary`] = theme.colors.text.primary;
	if (theme.colors?.text?.secondary) cssVars[`--${prefix}-color-text-secondary`] = theme.colors.text.secondary;
	if (theme.colors?.border) cssVars[`--${prefix}-color-border`] = theme.colors.border;
	if (theme.spacing?.unit !== void 0) cssVars[`--${prefix}-spacing-unit`] = `${theme.spacing.unit}px`;
	if (theme.borderRadius?.small) cssVars[`--${prefix}-border-radius-small`] = theme.borderRadius.small;
	if (theme.borderRadius?.medium) cssVars[`--${prefix}-border-radius-medium`] = theme.borderRadius.medium;
	if (theme.borderRadius?.large) cssVars[`--${prefix}-border-radius-large`] = theme.borderRadius.large;
	if (theme.shadows?.small) cssVars[`--${prefix}-shadow-small`] = theme.shadows.small;
	if (theme.shadows?.medium) cssVars[`--${prefix}-shadow-medium`] = theme.shadows.medium;
	if (theme.shadows?.large) cssVars[`--${prefix}-shadow-large`] = theme.shadows.large;
	if (theme.typography?.fontFamily) cssVars[`--${prefix}-typography-fontFamily`] = theme.typography.fontFamily;
	if (theme.typography?.fontSizes?.xs) cssVars[`--${prefix}-typography-fontSize-xs`] = theme.typography.fontSizes.xs;
	if (theme.typography?.fontSizes?.sm) cssVars[`--${prefix}-typography-fontSize-sm`] = theme.typography.fontSizes.sm;
	if (theme.typography?.fontSizes?.md) cssVars[`--${prefix}-typography-fontSize-md`] = theme.typography.fontSizes.md;
	if (theme.typography?.fontSizes?.lg) cssVars[`--${prefix}-typography-fontSize-lg`] = theme.typography.fontSizes.lg;
	if (theme.typography?.fontSizes?.xl) cssVars[`--${prefix}-typography-fontSize-xl`] = theme.typography.fontSizes.xl;
	if (theme.typography?.fontSizes?.["2xl"]) cssVars[`--${prefix}-typography-fontSize-2xl`] = theme.typography.fontSizes["2xl"];
	if (theme.typography?.fontSizes?.["3xl"]) cssVars[`--${prefix}-typography-fontSize-3xl`] = theme.typography.fontSizes["3xl"];
	if (theme.typography?.fontWeights?.normal !== void 0) cssVars[`--${prefix}-typography-fontWeight-normal`] = theme.typography.fontWeights.normal.toString();
	if (theme.typography?.fontWeights?.medium !== void 0) cssVars[`--${prefix}-typography-fontWeight-medium`] = theme.typography.fontWeights.medium.toString();
	if (theme.typography?.fontWeights?.semibold !== void 0) cssVars[`--${prefix}-typography-fontWeight-semibold`] = theme.typography.fontWeights.semibold.toString();
	if (theme.typography?.fontWeights?.bold !== void 0) cssVars[`--${prefix}-typography-fontWeight-bold`] = theme.typography.fontWeights.bold.toString();
	if (theme.typography?.lineHeights?.tight !== void 0) cssVars[`--${prefix}-typography-lineHeight-tight`] = theme.typography.lineHeights.tight.toString();
	if (theme.typography?.lineHeights?.normal !== void 0) cssVars[`--${prefix}-typography-lineHeight-normal`] = theme.typography.lineHeights.normal.toString();
	if (theme.typography?.lineHeights?.relaxed !== void 0) cssVars[`--${prefix}-typography-lineHeight-relaxed`] = theme.typography.lineHeights.relaxed.toString();
	if (theme.images) {
		const themeImages = theme.images;
		Object.keys(themeImages).forEach((imageKey) => {
			const imageConfig = themeImages[imageKey];
			if (imageConfig?.url) cssVars[`--${prefix}-image-${imageKey}-url`] = imageConfig.url;
			if (imageConfig?.title) cssVars[`--${prefix}-image-${imageKey}-title`] = imageConfig.title;
			if (imageConfig?.alt) cssVars[`--${prefix}-image-${imageKey}-alt`] = imageConfig.alt;
		});
	}
	if (theme.components?.Button?.styleOverrides?.root?.borderRadius) cssVars[`--${prefix}-component-button-root-borderRadius`] = theme.components.Button.styleOverrides.root.borderRadius;
	if (theme.components?.Field?.styleOverrides?.root?.borderRadius) cssVars[`--${prefix}-component-field-root-borderRadius`] = theme.components.Field.styleOverrides.root.borderRadius;
	return cssVars;
};
const toThemeVars = (theme) => {
	const prefix = theme.cssVarPrefix || VendorConstants_default.VENDOR_PREFIX;
	const componentVars = {};
	if (theme.components?.Button?.styleOverrides?.root?.borderRadius) componentVars.Button = { root: { borderRadius: `var(--${prefix}-component-button-root-borderRadius)` } };
	if (theme.components?.Field?.styleOverrides?.root?.borderRadius) componentVars.Field = { root: { borderRadius: `var(--${prefix}-component-field-root-borderRadius)` } };
	const themeVars = {
		borderRadius: {
			large: `var(--${prefix}-border-radius-large)`,
			medium: `var(--${prefix}-border-radius-medium)`,
			small: `var(--${prefix}-border-radius-small)`
		},
		colors: {
			action: {
				activatedOpacity: `var(--${prefix}-color-action-activatedOpacity)`,
				active: `var(--${prefix}-color-action-active)`,
				disabled: `var(--${prefix}-color-action-disabled)`,
				disabledBackground: `var(--${prefix}-color-action-disabledBackground)`,
				disabledOpacity: `var(--${prefix}-color-action-disabledOpacity)`,
				focus: `var(--${prefix}-color-action-focus)`,
				focusOpacity: `var(--${prefix}-color-action-focusOpacity)`,
				hover: `var(--${prefix}-color-action-hover)`,
				hoverOpacity: `var(--${prefix}-color-action-hoverOpacity)`,
				selected: `var(--${prefix}-color-action-selected)`,
				selectedOpacity: `var(--${prefix}-color-action-selectedOpacity)`
			},
			background: {
				body: { main: `var(--${prefix}-color-background-body-main)` },
				disabled: `var(--${prefix}-color-background-disabled)`,
				surface: `var(--${prefix}-color-background-surface)`
			},
			border: `var(--${prefix}-color-border)`,
			error: {
				contrastText: `var(--${prefix}-color-error-contrastText)`,
				main: `var(--${prefix}-color-error-main)`
			},
			info: {
				contrastText: `var(--${prefix}-color-info-contrastText)`,
				main: `var(--${prefix}-color-info-main)`
			},
			primary: {
				contrastText: `var(--${prefix}-color-primary-contrastText)`,
				main: `var(--${prefix}-color-primary-main)`
			},
			secondary: {
				contrastText: `var(--${prefix}-color-secondary-contrastText)`,
				main: `var(--${prefix}-color-secondary-main)`
			},
			success: {
				contrastText: `var(--${prefix}-color-success-contrastText)`,
				main: `var(--${prefix}-color-success-main)`
			},
			text: {
				primary: `var(--${prefix}-color-text-primary)`,
				secondary: `var(--${prefix}-color-text-secondary)`
			},
			warning: {
				contrastText: `var(--${prefix}-color-warning-contrastText)`,
				main: `var(--${prefix}-color-warning-main)`
			}
		},
		shadows: {
			large: `var(--${prefix}-shadow-large)`,
			medium: `var(--${prefix}-shadow-medium)`,
			small: `var(--${prefix}-shadow-small)`
		},
		spacing: { unit: `var(--${prefix}-spacing-unit)` },
		typography: {
			fontFamily: `var(--${prefix}-typography-fontFamily)`,
			fontSizes: {
				"2xl": `var(--${prefix}-typography-fontSize-2xl)`,
				"3xl": `var(--${prefix}-typography-fontSize-3xl)`,
				lg: `var(--${prefix}-typography-fontSize-lg)`,
				md: `var(--${prefix}-typography-fontSize-md)`,
				sm: `var(--${prefix}-typography-fontSize-sm)`,
				xl: `var(--${prefix}-typography-fontSize-xl)`,
				xs: `var(--${prefix}-typography-fontSize-xs)`
			},
			fontWeights: {
				bold: `var(--${prefix}-typography-fontWeight-bold)`,
				medium: `var(--${prefix}-typography-fontWeight-medium)`,
				normal: `var(--${prefix}-typography-fontWeight-normal)`,
				semibold: `var(--${prefix}-typography-fontWeight-semibold)`
			},
			lineHeights: {
				normal: `var(--${prefix}-typography-lineHeight-normal)`,
				relaxed: `var(--${prefix}-typography-lineHeight-relaxed)`,
				tight: `var(--${prefix}-typography-lineHeight-tight)`
			}
		}
	};
	if (theme.images) {
		themeVars.images = {};
		const themeImages = theme.images;
		const imageVars = themeVars.images;
		Object.keys(themeImages).forEach((imageKey) => {
			const imageConfig = themeImages[imageKey];
			imageVars[imageKey] = {
				alt: imageConfig?.alt ? `var(--${prefix}-image-${imageKey}-alt)` : void 0,
				title: imageConfig?.title ? `var(--${prefix}-image-${imageKey}-title)` : void 0,
				url: imageConfig?.url ? `var(--${prefix}-image-${imageKey}-url)` : void 0
			};
		});
	}
	if (Object.keys(componentVars).length > 0) themeVars.components = componentVars;
	return themeVars;
};
const createTheme = (config = {}, isDark = false) => {
	const baseTheme = isDark ? darkTheme : lightTheme;
	const mergedConfig = {
		...baseTheme,
		...config,
		borderRadius: {
			...baseTheme.borderRadius,
			...config.borderRadius
		},
		colors: {
			...baseTheme.colors,
			...config.colors,
			action: {
				...baseTheme.colors.action,
				...config.colors?.action || {}
			},
			secondary: {
				...baseTheme.colors.secondary,
				...config.colors?.secondary || {}
			}
		},
		images: {
			...baseTheme.images,
			...config.images
		},
		shadows: {
			...baseTheme.shadows,
			...config.shadows
		},
		spacing: {
			...baseTheme.spacing,
			...config.spacing
		},
		typography: {
			...baseTheme.typography,
			...config.typography,
			fontSizes: {
				...baseTheme.typography.fontSizes,
				...config.typography?.fontSizes || {}
			},
			fontWeights: {
				...baseTheme.typography.fontWeights,
				...config.typography?.fontWeights || {}
			},
			lineHeights: {
				...baseTheme.typography.lineHeights,
				...config.typography?.lineHeights || {}
			}
		}
	};
	return {
		...mergedConfig,
		cssVariables: toCssVariables(mergedConfig),
		vars: toThemeVars(mergedConfig)
	};
};
const DEFAULT_THEME = "light";
var createTheme_default = createTheme;

//#endregion
//#region src/utils/arrayBufferToBase64url.ts
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
/**
* Converts an ArrayBuffer to a base64url encoded string.
*
* Base64url encoding is a URL-safe variant of base64 encoding that:
* - Replaces '+' with '-'
* - Replaces '/' with '_'
* - Removes padding '=' characters
*
* This encoding is commonly used in JWT tokens, OAuth2 PKCE challenges,
* and other web standards where the encoded data needs to be safely
* transmitted in URLs or HTTP headers.
*
* @param buffer - The ArrayBuffer to convert to base64url string
* @returns The base64url encoded string representation of the input buffer
*
* @example
* ```typescript
* const buffer = new TextEncoder().encode('Hello World');
* const encoded = arrayBufferToBase64url(buffer);
* console.log(encoded); // "SGVsbG8gV29ybGQ"
* ```
*
* @example
* ```typescript
* // Converting crypto random bytes for PKCE challenge
* const randomBytes = crypto.getRandomValues(new Uint8Array(32));
* const codeVerifier = arrayBufferToBase64url(randomBytes.buffer);
* ```
*/
const arrayBufferToBase64url = (buffer) => {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.byteLength; i += 1) binary += String.fromCharCode(bytes[i]);
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};
var arrayBufferToBase64url_default = arrayBufferToBase64url;

//#endregion
//#region src/utils/base64urlToArrayBuffer.ts
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
/**
* Converts a base64url encoded string back to an ArrayBuffer.
*
* This function performs the inverse operation of base64url encoding by:
* - Replacing URL-safe characters: '-' becomes '+', '_' becomes '/'
* - Adding back padding '=' characters that were removed during base64url encoding
* - Decoding the resulting base64 string to binary data
* - Converting the binary data to an ArrayBuffer
*
* This is commonly used for decoding JWT tokens, OAuth2 PKCE code verifiers,
* and other cryptographic data that was encoded using base64url format.
*
* @param base64url - The base64url encoded string to decode
* @returns The ArrayBuffer containing the decoded binary data
*
* @throws {DOMException} Throws an error if the input string is not valid base64url
*
* @example
* ```typescript
* const encoded = 'SGVsbG8gV29ybGQ';
* const buffer = base64urlToArrayBuffer(encoded);
* const text = new TextDecoder().decode(buffer);
* console.log(text); // "Hello World"
* ```
*
* @example
* ```typescript
* // Decoding a JWT payload
* const jwtPayload = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
* const payloadBuffer = base64urlToArrayBuffer(jwtPayload);
* const payloadJson = new TextDecoder().decode(payloadBuffer);
* const payload = JSON.parse(payloadJson);
* ```
*
* @see {@link arrayBufferToBase64url} - The inverse function for encoding ArrayBuffer to base64url
*/
const base64urlToArrayBuffer = (base64url) => {
	const padding = "=".repeat((4 - base64url.length % 4) % 4);
	const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/") + padding;
	const binaryString = atob(base64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i += 1) bytes[i] = binaryString.charCodeAt(i);
	return bytes.buffer;
};
var base64urlToArrayBuffer_default = base64urlToArrayBuffer;

//#endregion
//#region src/utils/bem.ts
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
/**
* Creates a BEM-style class name by combining a base class with element and/or modifier
*
* @param baseClass - The base CSS class string (usually from emotion's css function)
* @param element - The BEM element name (optional)
* @param modifier - The BEM modifier name (optional)
* @returns The combined class name string
*
* @example
* ```tsx
* const baseClass = css`
*   display: flex;
*   &__element {
*     color: red;
*   }
*   &--modifier {
*     background: blue;
*   }
* `;
*
* import bem from './utils/bem';
*
* const elementClass = bem(baseClass, 'element');
* const modifierClass = bem(baseClass, null, 'modifier');
* const elementWithModifierClass = bem(baseClass, 'element', 'modifier');
* ```
*/
const bem = (baseClass, element, modifier) => {
	let className = baseClass;
	if (element) className += `__${element}`;
	if (modifier) className += `--${modifier}`;
	return className;
};
var bem_default = bem;

//#endregion
//#region src/utils/formatDate.ts
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
/**
* Formats a date string to a human-readable format.
*
* @param dateString - The date string to format (optional)
* @returns A formatted date string in 'Month Day, Year' format, or '-' if no date is provided, or the original string if parsing fails
*
* @example
* ```typescript
* formatDate('2025-07-09T10:30:00Z'); // Returns "July 9, 2025"
* formatDate(''); // Returns "-"
* formatDate(undefined); // Returns "-"
* formatDate('invalid-date'); // Returns "invalid-date"
* ```
*/
const formatDate = (dateString) => {
	if (!dateString) return "-";
	try {
		return new Date(dateString).toLocaleDateString("en-US", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	} catch {
		return dateString;
	}
};
var formatDate_default = formatDate;

//#endregion
//#region src/utils/deriveOrganizationHandleFromBaseUrl.ts
/**
* Extracts the organization handle from a ThunderID base URL.
*
* Parses URLs following the `/t/{orgHandle}` pattern.
*
* @param baseUrl - The base URL of the ThunderID identity server
* @returns The extracted organization handle
* @throws {ThunderIDRuntimeError} When the URL doesn't match the expected ThunderID pattern,
*   indicating a custom domain is configured and organizationHandle must be provided explicitly
*
* @example
* ```typescript
* const handle = deriveOrganizationHandleFromBaseUrl('https://localhost:8090/t/dxlab');
* // Returns: 'dxlab'
*
* // Custom domain - returns empty string with a warning
* const handle2 = deriveOrganizationHandleFromBaseUrl('https://custom.example.com/auth');
* // Returns: '' and logs a warning
* ```
*/
const deriveOrganizationHandleFromBaseUrl = (baseUrl) => {
	if (!baseUrl) throw new ThunderIDRuntimeError("Base URL is required to derive organization handle.", "javascript-deriveOrganizationHandleFromBaseUrl-ValidationError-001", "javascript", "A valid base URL must be provided to extract the organization handle.");
	let parsedUrl;
	try {
		parsedUrl = new URL(baseUrl);
	} catch (error$1) {
		throw new ThunderIDRuntimeError(`Invalid base URL format: ${baseUrl}`, "javascript-deriveOrganizationHandleFromBaseUrl-ValidationError-002", "javascript", "The provided base URL does not conform to valid URL syntax.");
	}
	const pathSegments = parsedUrl.pathname?.split("/")?.filter((segment) => segment?.length > 0);
	if (pathSegments.length < 2 || pathSegments[0] !== "t") {
		logger_default.warn(new ThunderIDRuntimeError("Organization handle is required since a custom domain is configured.", "javascript-deriveOrganizationHandleFromBaseUrl-CustomDomainError-002", "javascript", "The provided base URL does not follow the expected URL pattern (/t/{orgHandle}). Please provide the organizationHandle explicitly in the configuration.").toString());
		return "";
	}
	const organizationHandle = pathSegments[1];
	if (!organizationHandle || organizationHandle.trim().length === 0) {
		logger_default.warn(new ThunderIDRuntimeError("Organization handle is required since a custom domain is configured.", "javascript-deriveOrganizationHandleFromBaseUrl-CustomDomainError-003", "javascript", "The organization handle could not be extracted from the base URL. Please provide the organizationHandle explicitly in the configuration.").toString());
		return "";
	}
	return organizationHandle;
};
var deriveOrganizationHandleFromBaseUrl_default = deriveOrganizationHandleFromBaseUrl;

//#endregion
//#region src/utils/flattenUserSchema.ts
/**
* Flattens nested schema attributes into a flat structure for easier processing
*
* This function processes SCIM2 schemas and creates a flattened representation by:
* - Processing sub-attributes and creating dot-notation names (e.g., 'name.givenName')
* - Adding schema ID reference to each flattened attribute
* - Preserving all original attribute properties while adding schema context
* - Only including leaf-level attributes (sub-attributes) and top-level simple attributes
*
* @param schemas - Array of SCIM2 schemas containing nested attribute structures
* @returns Array of flattened schema attributes with dot-notation names and schema references
*
* @example
* ```typescript
* const schemas = [
*   {
*     id: 'urn:ietf:params:scim:schemas:core:2.0:User',
*     attributes: [
*       {
*         name: 'userName',
*         type: 'string',
*         multiValued: false
*       },
*       {
*         name: 'name',
*         type: 'complex',
*         multiValued: false,
*         subAttributes: [
*           { name: 'givenName', type: 'string', multiValued: false },
*           { name: 'familyName', type: 'string', multiValued: false }
*         ]
*       }
*     ]
*   }
* ];
*
* const flattened = flattenUserSchema(schemas);
* // Result: [
* //   { name: 'userName', type: 'string', multiValued: false, schemaId: 'urn:ietf:params:scim:schemas:core:2.0:User' },
* //   { name: 'name.givenName', type: 'string', multiValued: false, schemaId: 'urn:ietf:params:scim:schemas:core:2.0:User' },
* //   { name: 'name.familyName', type: 'string', multiValued: false, schemaId: 'urn:ietf:params:scim:schemas:core:2.0:User' }
* // ]
* ```
*/
const flattenUserSchema = (schemas) => {
	const flattenedAttributes = [];
	schemas.forEach((schema) => {
		if (schema.attributes && Array.isArray(schema.attributes)) schema.attributes.forEach((attribute) => {
			if (attribute.subAttributes && Array.isArray(attribute.subAttributes)) attribute.subAttributes.forEach((subAttribute) => {
				flattenedAttributes.push({
					...subAttribute,
					name: `${attribute.name}.${subAttribute.name}`,
					schemaId: schema.id
				});
			});
			else flattenedAttributes.push({
				...attribute,
				schemaId: schema.id
			});
		});
	});
	return flattenedAttributes;
};
var flattenUserSchema_default = flattenUserSchema;

//#endregion
//#region src/utils/get.ts
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
/**
* Gets the value at path of object. If the resolved value is undefined,
* the defaultValue is returned in its place.
* Similar to Lodash's get() function
*
* @param object - The object to query
* @param path - The path of the property to get
* @param defaultValue - The value returned for undefined resolved values
* @returns The resolved value
*/
const get = (object, path, defaultValue) => {
	if (!object || !path) return defaultValue;
	const result = (Array.isArray(path) ? path : path.split(".")).reduce((current, key) => current?.[key], object);
	return result !== void 0 ? result : defaultValue;
};
var get_default = get;

//#endregion
//#region src/utils/set.ts
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
/**
* Sets the value at path of object. If a portion of path doesn't exist,
* it's created. Arrays are created for missing index properties while
* objects are created for all other missing properties.
* Similar to Lodash's set() function
*
* @param object - The object to modify
* @param path - The path of the property to set
* @param value - The value to set
* @returns The object
*/
const set = (object, path, value) => {
	if (!object || !path) return object;
	const pathArray = Array.isArray(path) ? path : path.split(".");
	const lastIndex = pathArray.length - 1;
	pathArray.reduce((current, key, index) => {
		if (index === lastIndex) current[key] = value;
		else if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
			const nextKey = pathArray[index + 1];
			current[key] = /^\d+$/.test(nextKey) ? [] : {};
		}
		return current[key];
	}, object);
	return object;
};
var set_default = set;

//#endregion
//#region src/utils/generateUserProfile.ts
/**
* Creates a profile structure from ME response based on processed schemas
*
* This function processes each schema attribute and populates the profile dynamically by:
* - Extracting values from the ME response using the schema attribute names
* - Handling multi-valued attributes by converting single values to arrays when needed
* - Setting appropriate default values based on schema type and multiValued properties
* - Using dynamic property setting to build the final profile object
*
* @param meResponse - The ME API response containing user data
* @param processedSchemas - The processed and flattened schemas with name, type, and multiValued properties
* @returns Flat profile object with dynamically populated user attributes
*
* @example
* ```typescript
* const meResponse = {
*   userName: 'john.doe',
*   emails: ['john@example.com', 'john.doe@work.com'],
*   name: { givenName: 'John', familyName: 'Doe' }
* };
*
* const schemas = [
*   { name: 'userName', type: 'STRING', multiValued: false },
*   { name: 'emails', type: 'STRING', multiValued: true },
*   { name: 'name.givenName', type: 'STRING', multiValued: false }
* ];
*
* const profile = generateUserProfile(meResponse, schemas);
* // Result: {
* //   userName: 'john.doe',
* //   emails: ['john@example.com', 'john.doe@work.com'],
* //   'name.givenName': 'John'
* // }
* ```
*/
const generateUserProfile = (meResponse, processedSchemas) => {
	const profile = {};
	processedSchemas.forEach((schema) => {
		const { name, type, multiValued } = schema;
		if (!name) return;
		let value = get_default(meResponse, name);
		if (value !== void 0) {
			if (multiValued && !Array.isArray(value)) value = [value];
		} else if (multiValued) value = void 0;
		else if (type === "STRING") value = "";
		else value = void 0;
		set_default(profile, name, value);
	});
	return profile;
};
var generateUserProfile_default = generateUserProfile;

//#endregion
//#region src/utils/getLatestStateParam.ts
/**
* Gets the latest PKCE storage key from the temporary store.
*
* @param tempStore - The object that holds temporary PKCE-related data (e.g., sessionStorage).
* @returns The latest PKCE storage key or null if no keys exist.
*/
const getLatestPkceStorageKey = (tempStore) => {
	const keys = [];
	Object.keys(tempStore).forEach((key) => {
		if (key.startsWith(PKCEConstants_default.Storage.StorageKeys.CODE_VERIFIER)) keys.push(key);
	});
	return keys.sort().pop() ?? null;
};
/**
* Finds the latest state parameter based on the most recent PKCE storage key.
*
* This utility combines the functionality of finding the latest PKCE key and generating
* the corresponding state parameter for request correlation.
*
* @param tempStore - The object that holds temporary PKCE-related data (e.g., sessionStorage).
* @param state - Optional state string to prepend to the request correlation.
* @returns The latest state parameter string or null if no PKCE keys exist.
*
* @example
* const latestState = getLatestStateParam(sessionStorage, "myState");
* // Returns: "myState_request_2" (if latest PKCE key is pkce_code_verifier_2)
*
* const latestStateNoPrefix = getLatestStateParam(sessionStorage);
* // Returns: "request_2" (if latest PKCE key is pkce_code_verifier_2)
*
* const noKeys = getLatestStateParam(emptyStorage);
* // Returns: null (if no PKCE keys exist)
*/
const getLatestStateParam = (tempStore, state) => {
	const latestPkceKey = getLatestPkceStorageKey(tempStore);
	if (!latestPkceKey) return null;
	return generateStateParamForRequestCorrelation_default(latestPkceKey, state);
};
var getLatestStateParam_default = getLatestStateParam;

//#endregion
//#region src/utils/generateFlattenedUserProfile.ts
/**
* Generates a flattened user profile from a response object and schema definitions.
*
* This function processes user data according to schema specifications, creating
* a flat object with dot notation keys instead of nested objects. Multi-valued
* properties and type-specific defaults are handled appropriately.
*
* Additionally, any fields present in the response but not defined in the schema
* will be included to ensure no user data is lost during flattening.
*
* @param meResponse - The response object containing user data
* @param processedSchemas - Array of schema objects defining field properties
* @param processedSchemas[].name - The field name/path for the property
* @param processedSchemas[].type - The data type of the field (e.g., 'STRING')
* @param processedSchemas[].multiValued - Whether the field can contain multiple values
*
* @returns A flattened user profile object with dot notation keys
*
* @example
* ```typescript
* const schemas = [
*   { name: 'name.givenName', type: 'STRING', multiValued: false },
*   { name: 'emails', type: 'STRING', multiValued: true }
* ];
* const response = {
*   name: { givenName: 'John' },
*   emails: 'john@example.com',
*   country: 'US' // This will be included even if not in schema
* };
* const profile = generateFlattenedUserProfile(response, schemas);
* // Result: { "name.givenName": 'John', emails: ['john@example.com'], country: 'US' }
* ```
*/
const generateFlattenedUserProfile = (meResponse, processedSchemas) => {
	const profile = {};
	const allSchemaNames = processedSchemas.map((schema) => schema.name).filter(Boolean);
	processedSchemas.forEach((schema) => {
		const { name, type, multiValued } = schema;
		if (!name) return;
		if (allSchemaNames.some((schemaName) => schemaName !== name && schemaName.startsWith(`${name}.`))) return;
		let value = get_default(meResponse, name);
		if (value === void 0) {
			const dotIndex = name.indexOf(".");
			if (dotIndex > 0) {
				const head = name.slice(0, dotIndex);
				const tail = name.slice(dotIndex + 1);
				const arr = meResponse[head];
				if (Array.isArray(arr)) {
					const match = arr.find((item) => item?.type === tail);
					if (match?.value !== void 0) value = match.value;
				}
			}
		}
		if (value === void 0) [
			"urn:ietf:params:scim:schemas:core:2.0:User",
			"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User",
			"urn:scim:wso2:schema",
			"urn:scim:schemas:extension:custom:User"
		].some((namespace) => {
			if (meResponse[namespace]) {
				if (meResponse[namespace][name] !== void 0) {
					value = meResponse[namespace][name];
					return true;
				}
				const nestedValue = get_default(meResponse[namespace], name);
				if (nestedValue !== void 0) {
					value = nestedValue;
					return true;
				}
			}
			return false;
		});
		if (value !== void 0) {
			if (multiValued && !Array.isArray(value)) value = [value];
		} else if (multiValued) value = void 0;
		else if (type === "STRING") value = "";
		else value = void 0;
		profile[name] = value;
	});
	const flattenObject = (obj, prefix = "") => {
		if (obj && typeof obj === "object" && !Array.isArray(obj)) Object.keys(obj).forEach((key) => {
			const fullKey = prefix ? `${prefix}.${key}` : key;
			const value = obj[key];
			if (Object.prototype.hasOwnProperty.call(profile, fullKey)) return;
			if (allSchemaNames.some((schemaName) => schemaName.startsWith(`${fullKey}.`))) flattenObject(value, fullKey);
			else profile[fullKey] = value;
		});
	};
	flattenObject(meResponse);
	return profile;
};
var generateFlattenedUserProfile_default = generateFlattenedUserProfile;

//#endregion
//#region src/utils/getRedirectBasedSignUpUrl.ts
/**
* Utility to generate the redirect-based sign-up URL for ThunderID.
*
* If the baseUrl is recognized (standard ThunderID pattern), constructs the sign-up URL.
* Otherwise, returns an empty string.
*
* @param baseUrl - The base URL of the ThunderID identity server (string or undefined)
* @returns The sign-up URL if baseUrl is recognized, otherwise an empty string
*/
const getRedirectBasedSignUpUrl = (config) => {
	const { baseUrl } = config;
	if (!isRecognizedBaseUrlPattern_default(baseUrl)) return "";
	let signUpBaseUrl = baseUrl;
	if (identifyPlatform_default(config) === Platform.ThunderID) try {
		const url$1 = new URL(baseUrl);
		if (/([a-z0-9-]+\.)*api\.thunderid\.io$/i.test(url$1.hostname)) {
			url$1.hostname = url$1.hostname.replace("api.", "accounts.");
			signUpBaseUrl = url$1.toString().replace(/\/$/, "");
		}
	} catch {
		logger_default.debug(`[getRedirectBasedSignUpUrl] Could not parse base URL to replace 'api.' with 'accounts.'. Base URL: ${baseUrl}`);
	}
	const url = new URL(`${signUpBaseUrl}/accountrecoveryendpoint/register.do`);
	if (config.clientId) url.searchParams.set("client_id", config.clientId);
	if (config.applicationId) url.searchParams.set("spId", config.applicationId);
	logger_default.debug(`[getRedirectBasedSignUpUrl] Generated sign-up URL: ${url.toString()}`);
	return url.toString();
};
var getRedirectBasedSignUpUrl_default = getRedirectBasedSignUpUrl;

//#endregion
//#region src/utils/v2/isEmojiUri.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
const EMOJI_URI_SCHEME = "emoji:";
/**
* Checks whether a given URI uses the `emoji:` scheme (e.g. `"emoji:🐯"`).
*
* @param uri - The URI string to check.
* @returns `true` if the URI starts with `"emoji:"`, `false` otherwise.
*
* @example
* ```typescript
* isEmojiUri("emoji:🐯");          // true
* isEmojiUri("https://example.com/logo.png"); // false
* isEmojiUri("");                  // false
* ```
*/
const isEmojiUri = (uri) => typeof uri === "string" && uri.startsWith(EMOJI_URI_SCHEME);
var isEmojiUri_default = isEmojiUri;

//#endregion
//#region src/utils/v2/extractEmojiFromUri.ts
/**
* Extracts the emoji character from an `emoji:` URI.
*
* @param uri - A URI string in the form `"emoji:<emoji>"`.
* @returns The emoji character, or an empty string if the URI is not a valid emoji URI.
*
* @example
* ```typescript
* extractEmojiFromUri("emoji:🐯"); // "🐯"
* extractEmojiFromUri("https://example.com"); // ""
* ```
*/
const extractEmojiFromUri = (uri) => {
	if (!isEmojiUri_default(uri)) return "";
	return uri.slice(EMOJI_URI_SCHEME.length);
};
var extractEmojiFromUri_default = extractEmojiFromUri;

//#endregion
//#region src/utils/removeTrailingSlash.ts
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
/**
* Removes a trailing slash from a path string if it exists.
*
* @param path - The string path to process
* @returns The path without a trailing slash
*
* @example
* ```typescript
* removeTrailingSlash('/path/to/something/') // returns '/path/to/something'
* removeTrailingSlash('/path/to/something') // returns '/path/to/something'
* ```
*/
const removeTrailingSlash = (path) => path.endsWith("/") ? path.slice(0, -1) : path;
var removeTrailingSlash_default = removeTrailingSlash;

//#endregion
//#region src/utils/resolveFieldType.ts
const resolveFieldType = (field) => {
	if (field.type === EmbeddedSignInFlowAuthenticatorParamType.String) {
		if (field.param === EmbeddedSignInFlowAuthenticatorExtendedParamType.Otp) return FieldType.Otp;
		if (field?.confidential) return FieldType.Password;
		return FieldType.Text;
	}
	throw new ThunderIDRuntimeError(`Field type is not supported: ${field.type}`, "resolveFieldType-Invalid-001", "javascript", "The provided field type is not supported. Please check the field configuration.");
};
var resolveFieldType_default = resolveFieldType;

//#endregion
//#region src/utils/resolveFieldName.ts
const resolveFieldName = (field) => {
	if (field.param) return field.param;
	throw new ThunderIDRuntimeError("Field name is not supported: ", "resolveFieldName-Invalid-001", "javascript", "The provided field name is not supported. Please check the field configuration.");
};
var resolveFieldName_default = resolveFieldName;

//#endregion
//#region src/utils/v2/resolveMeta.ts
/**
* Resolves a dot-path expression against a FlowMetadataResponse object.
*
* Supports both camelCase paths (e.g. `logoUrl`) and snake_case API responses
* (e.g. `logo_url`). When a camelCase segment is not found directly, the
* function falls back to its snake_case equivalent.
*
* @example
* resolveMeta('application.name', meta) // → 'My App'
* resolveMeta('ou.name', meta)           // → 'My Org'
*
* @param path - Dot-separated path into the meta object (e.g. 'application.name')
* @param meta - The FlowMetadataResponse to look up
* @returns The resolved string value, or empty string if not found
*/
function resolveMeta(path, meta) {
	const value = path.split(".").reduce((current, part) => {
		if (current == null || typeof current !== "object") return;
		const obj = current;
		const snakePart = part.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
		return part in obj ? obj[part] : obj[snakePart];
	}, meta);
	return value != null ? String(value) : "";
}

//#endregion
//#region src/utils/v2/parseFlowTemplateLiteral.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
/**
* Regular expression to detect a flow template literal wrapped in double braces.
* Matches patterns like `{{ t(key) }}`, `{{ meta(key) }}`, etc.
*
* Note: this regex has no `g` flag — use `new RegExp(FLOW_TEMPLATE_LITERAL_REGEX.source, 'g')`
* when global replacement is needed (e.g. in resolveFlowTemplateLiterals).
*/
const FLOW_TEMPLATE_LITERAL_REGEX = /\{\{\s*([^}]+)\s*\}\}/;
/**
* Regular expression to parse a function-call expression inside flow template braces.
* Matches `funcName(arg)` and captures the function name and argument.
*/
const FLOW_TEMPLATE_FUNCTION_REGEX = /^(\w+)\(([^)]+)\)$/;
/**
* Flow template literal types supported by the SDK.
*
* Values correspond to the function name used in the template expression,
* so that a `{ t }` object from `useTranslation()` can be passed directly
* as a handler map.
*/
let FlowTemplateLiteralType = /* @__PURE__ */ function(FlowTemplateLiteralType$1) {
	/** Meta template literal — `{{ meta(path) }}` — resolves against flow/page metadata */
	FlowTemplateLiteralType$1["META"] = "meta";
	/** Translation template literal — `{{ t(key) }}` */
	FlowTemplateLiteralType$1["TRANSLATION"] = "t";
	/** Unknown or unsupported template literal format */
	FlowTemplateLiteralType$1["UNKNOWN"] = "unknown";
	return FlowTemplateLiteralType$1;
}({});
/**
* Parse a flow template literal content string and extract its type and key.
*
* Supports function-call expressions like:
* - `t(signin:heading)`  → type `TRANSLATION`, key `"signin:heading"`
* - `meta(application.name)` → type `META`, key `"application.name"`
*
* Surrounding quotes on the key argument are stripped automatically.
*
* @param content - The content inside the template literal braces (without `{{ }}`).
* @returns Parsed flow template literal information.
*
* @example
* ```typescript
* parseFlowTemplateLiteral('t(signin:heading)')
* // { type: FlowTemplateLiteralType.TRANSLATION, key: 'signin:heading', originalValue: 't(signin:heading)' }
*
* parseFlowTemplateLiteral('meta(application.name)')
* // { type: FlowTemplateLiteralType.META, key: 'application.name', originalValue: 'meta(application.name)' }
* ```
*/
function parseFlowTemplateLiteral(content) {
	const originalValue = content;
	const match = FLOW_TEMPLATE_FUNCTION_REGEX.exec(content);
	if (!match) return {
		originalValue,
		type: FlowTemplateLiteralType.UNKNOWN
	};
	const [, functionName, rawKey] = match;
	const key = rawKey.trim().replace(/^['"]|['"]$/g, "");
	switch (functionName) {
		case FlowTemplateLiteralType.TRANSLATION: return {
			key,
			originalValue,
			type: FlowTemplateLiteralType.TRANSLATION
		};
		case FlowTemplateLiteralType.META: return {
			key,
			originalValue,
			type: FlowTemplateLiteralType.META
		};
		default: return {
			originalValue,
			type: FlowTemplateLiteralType.UNKNOWN
		};
	}
}

//#endregion
//#region src/utils/v2/resolveFlowTemplateLiterals.ts
/**
* Global version of {@link FLOW_TEMPLATE_LITERAL_REGEX} for use with `String.prototype.replace`.
*/
const FLOW_TEMPLATE_LITERAL_REGEX_GLOBAL = new RegExp(FLOW_TEMPLATE_LITERAL_REGEX.source, "g");
/**
* Resolves all flow template literal expressions in a string.
*
* Supported patterns:
*   - `{{ t(key) }}`       — resolved via the i18n translation function.
*                            Colon-separated namespaces are converted to dots:
*                            `{{ t(signin:heading.label) }}` → `t('signin.heading.label')`
*   - `{{ meta(path) }}`   — resolved via a dot-path lookup on FlowMetadataResponse.
*                            `{{ meta(application.name) }}` → `meta.application?.name`
*
* Flow template literals can be embedded inside larger strings:
*   `"Login using {{ meta(application.name) }}"` → `"Login using My App"`
*
* Unrecognized expressions are left unchanged.
*
* @template TFn - The concrete translation function type.
*
* @param text - The string to resolve (may contain zero or more flow template literals)
* @param options - Resolution context: translation function and optional flow metadata
* @returns The resolved string
*/
function resolveFlowTemplateLiterals(text, { t, meta }) {
	if (!text) return "";
	return text.replace(FLOW_TEMPLATE_LITERAL_REGEX_GLOBAL, (match, content) => {
		const parsed = parseFlowTemplateLiteral(content.trim());
		if (parsed.type === FlowTemplateLiteralType.TRANSLATION && parsed.key) return t(parsed.key.replace(/:/g, "."));
		if (parsed.type === FlowTemplateLiteralType.META && parsed.key && meta) return resolveMeta(parsed.key, meta);
		return match;
	});
}

//#endregion
//#region src/utils/v2/countryCodeToFlagEmoji.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
/**
* Converts a two-letter ISO 3166-1 alpha-2 country code to a flag emoji using
* Unicode Regional Indicator Symbols (U+1F1E6–U+1F1FF).
*
* @param countryCode - Two-letter uppercase country code (e.g. "US", "GB")
* @returns Flag emoji string (e.g. "🇺🇸", "🇬🇧")
*/
function countryCodeToFlagEmoji(countryCode) {
	return countryCode.toUpperCase().split("").map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
}

//#endregion
//#region src/utils/v2/resolveLocaleDisplayName.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
/**
* Resolves a BCP 47 locale tag to a human-readable display name using the
* `Intl.DisplayNames` API.
*
* Falls back to the raw locale code if the runtime does not support
* `Intl.DisplayNames` or if resolution returns `undefined`.
*
* @param locale - BCP 47 locale tag to resolve (e.g. "en", "fr", "zh-Hant")
* @param displayLocale - Locale used for the display name language (defaults to "en")
* @returns Human-readable language name (e.g. "English", "French")
*/
function resolveLocaleDisplayName(locale, displayLocale) {
	try {
		return new Intl.DisplayNames([displayLocale], { type: "language" }).of(locale) ?? locale;
	} catch {
		return locale;
	}
}

//#endregion
//#region src/utils/v2/resolveLocaleEmoji.ts
/**
* Maps BCP 47 language subtags to ISO 3166-1 alpha-2 country codes used for
* flag emoji resolution when no country subtag is present in the locale.
*/
const LANGUAGE_TO_COUNTRY = {
	am: "ET",
	ar: "SA",
	bn: "BD",
	cs: "CZ",
	da: "DK",
	de: "DE",
	el: "GR",
	en: "GB",
	es: "ES",
	fa: "IR",
	fi: "FI",
	fr: "FR",
	he: "IL",
	hi: "IN",
	hu: "HU",
	id: "ID",
	it: "IT",
	ja: "JP",
	ko: "KR",
	ml: "IN",
	ms: "MY",
	nl: "NL",
	no: "NO",
	pl: "PL",
	pt: "PT",
	ro: "RO",
	ru: "RU",
	si: "LK",
	sk: "SK",
	sv: "SE",
	sw: "KE",
	ta: "IN",
	th: "TH",
	tr: "TR",
	uk: "UA",
	ur: "PK",
	vi: "VN",
	zh: "CN"
};
/**
* Resolves a BCP 47 locale tag to a flag emoji.
*
* Resolution order:
* 1. Country subtag when present (e.g. `"en-US"` → 🇺🇸)
* 2. Language-to-country fallback map (e.g. `"en"` → 🇬🇧)
* 3. Globe emoji 🌐 for unrecognised codes
*
* @param locale - BCP 47 locale tag (e.g. "en", "en-US", "fr-CA")
* @returns Flag or globe emoji string
*/
function resolveLocaleEmoji(locale) {
	const parts = locale.split("-");
	const languageCode = parts[0].toLowerCase();
	const countryCode = (parts.length > 1 ? parts[parts.length - 1].toUpperCase() : void 0) ?? LANGUAGE_TO_COUNTRY[languageCode];
	if (countryCode?.length !== 2) return "🌐";
	return countryCodeToFlagEmoji(countryCode);
}
var resolveLocaleEmoji_default = resolveLocaleEmoji;

//#endregion
//#region src/utils/withVendorCSSClassPrefix.ts
/**
* Adds a vendor-specific prefix to a CSS class name.
*
* @param className - The original CSS class name to be prefixed
* @returns A new string with the vendor prefix added to the class name
*
* @example
* ```typescript
* // Usage with clsx
* clsx(withVendorCSSClassPrefix('sign-in-button'), className)
* // Result: "wso2-sign-in-button"
* ```
*/
const withVendorCSSClassPrefix = (className) => `${VendorConstants_default.VENDOR_PREFIX}-${className}`;
var withVendorCSSClassPrefix_default = withVendorCSSClassPrefix;

//#endregion
//#region src/utils/transformBrandingPreferenceToTheme.ts
const extractColorValue = (colorVariant, preferDark = false) => {
	if (preferDark && colorVariant?.dark?.trim()) return colorVariant.dark;
	return colorVariant?.main;
};
/**
* Safely extracts contrast text color from the branding preference structure
*/
const extractContrastText = (colorVariant) => colorVariant?.contrastText;
/**
* Transforms a ThemeVariant from branding preference to ThemeConfig
*/
const transformThemeVariant = (themeVariant, isDark = false) => {
	const { buttons } = themeVariant;
	const { colors } = themeVariant;
	const { images } = themeVariant;
	const { inputs } = themeVariant;
	const config = {
		colors: {
			action: {
				activatedOpacity: .12,
				active: isDark ? "rgba(255, 255, 255, 0.70)" : "rgba(0, 0, 0, 0.54)",
				disabled: isDark ? "rgba(255, 255, 255, 0.26)" : "rgba(0, 0, 0, 0.26)",
				disabledBackground: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
				disabledOpacity: .38,
				focus: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
				focusOpacity: .12,
				hover: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
				hoverOpacity: .04,
				selected: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
				selectedOpacity: .08
			},
			background: {
				body: {
					dark: (colors?.background?.body)?.dark || (colors?.background?.body)?.main,
					main: extractColorValue(colors?.background?.body, isDark) ?? ""
				},
				dark: (colors?.background?.surface)?.dark || (colors?.background?.surface)?.main,
				disabled: extractColorValue(colors?.background?.surface, isDark) ?? "",
				surface: extractColorValue(colors?.background?.surface, isDark) ?? ""
			},
			border: colors?.outlined?.default ?? "",
			error: {
				contrastText: extractContrastText(colors?.alerts?.error) ?? "",
				dark: (colors?.alerts?.error)?.dark || (colors?.alerts?.error)?.main,
				main: extractColorValue(colors?.alerts?.error, isDark) ?? ""
			},
			info: {
				contrastText: extractContrastText(colors?.alerts?.info) ?? "",
				dark: (colors?.alerts?.info)?.dark || (colors?.alerts?.info)?.main,
				main: extractColorValue(colors?.alerts?.info, isDark) ?? ""
			},
			primary: {
				contrastText: extractContrastText(colors?.primary) ?? "",
				dark: colors?.primary?.dark || (colors?.primary)?.main,
				main: extractColorValue(colors?.primary, isDark) ?? ""
			},
			secondary: {
				contrastText: extractContrastText(colors?.secondary) ?? "",
				dark: colors?.secondary?.dark || (colors?.secondary)?.main,
				main: extractColorValue(colors?.secondary, isDark) ?? ""
			},
			success: {
				contrastText: extractContrastText(colors?.alerts?.neutral) ?? "",
				dark: (colors?.alerts?.neutral)?.dark || (colors?.alerts?.neutral)?.main,
				main: extractColorValue(colors?.alerts?.neutral, isDark) ?? ""
			},
			text: {
				dark: (colors?.text)?.dark || (colors?.text)?.primary,
				primary: (colors?.text)?.primary ?? "",
				secondary: (colors?.text)?.secondary ?? ""
			},
			warning: {
				contrastText: extractContrastText(colors?.alerts?.warning) ?? "",
				dark: (colors?.alerts?.warning)?.dark || (colors?.alerts?.warning)?.main,
				main: extractColorValue(colors?.alerts?.warning, isDark) ?? ""
			}
		},
		images: {
			favicon: images?.favicon ? {
				alt: images.favicon.altText,
				title: images.favicon.title,
				url: images.favicon.imgURL
			} : void 0,
			logo: images?.logo ? {
				alt: images.logo.altText,
				title: images.logo.title,
				url: images.logo.imgURL
			} : void 0
		}
	};
	const buttonBorderRadius = buttons?.primary?.base?.border?.borderRadius;
	const fieldBorderRadius = inputs?.base?.border?.borderRadius;
	if (buttonBorderRadius || fieldBorderRadius) config.components = {
		...buttonBorderRadius && { Button: { styleOverrides: { root: { borderRadius: buttonBorderRadius } } } },
		...fieldBorderRadius && { Field: { styleOverrides: { root: { borderRadius: fieldBorderRadius } } } }
	};
	return config;
};
/**
* Transforms branding preference response to Theme object
*
* @param brandingPreference - The branding preference response from getBrandingPreference
* @param forceTheme - Optional parameter to force a specific theme ('light' or 'dark'),
*                     if not provided, will use the activeTheme from branding preference
* @returns Theme object that can be used with the theme system
*
* The function extracts the following from branding preference:
* - Colors (primary, secondary, background, text, alerts, etc.)
* - Border radius from buttons and inputs
* - Images (logo and favicon with their URLs, titles, and alt text)
* - Typography settings
*
* @example
* ```typescript
* const brandingPreference = await getBrandingPreference({ baseUrl: "..." });
* const theme = transformBrandingPreferenceToTheme(brandingPreference);
*
* // Access image URLs via CSS variables
* // Logo: var(--wso2-image-logo-url)
* // Favicon: var(--wso2-image-favicon-url)
*
* // Force light theme regardless of branding preference activeTheme
* const lightTheme = transformBrandingPreferenceToTheme(brandingPreference, 'light');
* ```
*/
const transformBrandingPreferenceToTheme = (brandingPreference, forceTheme) => {
	const themeConfig = brandingPreference?.preference?.theme;
	if (!themeConfig) return createTheme_default({}, false);
	let activeThemeKey;
	if (forceTheme) activeThemeKey = forceTheme.toUpperCase();
	else activeThemeKey = themeConfig.activeTheme || "LIGHT";
	const themeVariant = themeConfig[activeThemeKey];
	if (!themeVariant) {
		const fallbackVariant = themeConfig.LIGHT || themeConfig.DARK;
		if (fallbackVariant) return createTheme_default(transformThemeVariant(fallbackVariant, activeThemeKey === "DARK"), activeThemeKey === "DARK");
		return createTheme_default({}, activeThemeKey === "DARK");
	}
	return createTheme_default(transformThemeVariant(themeVariant, activeThemeKey === "DARK"), activeThemeKey === "DARK");
};
var transformBrandingPreferenceToTheme_default = transformBrandingPreferenceToTheme;

//#endregion
//#region src/HttpClient.ts
/**
* Abstract base class for HTTP clients. Owns all handler/callback state and
* the request lifecycle (pre-processing, transport, post-processing).
*
* Extend this class and implement `transport()` to plug in a custom HTTP transport.
*
* @example
* ```ts
* class MyHttpClient extends HttpClient {
*   protected async transport<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
*     // custom fetch logic
*   }
* }
* ```
*/
var HttpClient = class HttpClient {
	static DEFAULT_HANDLER_DISABLE_TIMEOUT = 1e3;
	requestStartCallback = () => null;
	requestSuccessCallback = () => null;
	requestErrorCallback = () => null;
	requestFinishCallback = () => null;
	constructor(isHandlerEnabled = true, attachToken = () => Promise.resolve()) {
		this.isHandlerEnabled = isHandlerEnabled;
		this.attachToken = attachToken;
	}
	/**
	* Public HTTP request entry point. Applies pre/post processing around `transport()`.
	*/
	async request(config) {
		const processedConfig = await this.requestHandler(config);
		try {
			const response = await this.transport(processedConfig);
			return this.successHandler(response);
		} catch (error$1) {
			this.errorHandler(error$1);
			throw error$1;
		}
	}
	enableHandler() {
		this.isHandlerEnabled = true;
	}
	disableHandler() {
		this.isHandlerEnabled = false;
	}
	disableHandlerWithTimeout(timeout = HttpClient.DEFAULT_HANDLER_DISABLE_TIMEOUT) {
		this.isHandlerEnabled = false;
		setTimeout(() => {
			this.isHandlerEnabled = true;
		}, timeout);
	}
	setHttpRequestStartCallback(cb) {
		this.requestStartCallback = cb;
	}
	setHttpRequestSuccessCallback(cb) {
		this.requestSuccessCallback = cb;
	}
	setHttpRequestErrorCallback(cb) {
		this.requestErrorCallback = cb;
	}
	setHttpRequestFinishCallback(cb) {
		this.requestFinishCallback = cb;
	}
	all(values) {
		return Promise.all(values);
	}
	spread(callback) {
		return (array) => callback(...array);
	}
	async requestHandler(config) {
		await this.attachToken(config);
		if (config.shouldEncodeToFormData && config.data) {
			const formData = new FormData();
			Object.keys(config.data).forEach((key) => formData.append(key, config.data[key]));
			config.data = formData;
		}
		config.startTimeInMs = Date.now();
		if (this.isHandlerEnabled && typeof this.requestStartCallback === "function") this.requestStartCallback(config);
		return config;
	}
	successHandler(response) {
		if (this.isHandlerEnabled) {
			if (typeof this.requestSuccessCallback === "function") this.requestSuccessCallback(response);
			if (typeof this.requestFinishCallback === "function") this.requestFinishCallback();
		}
		return response;
	}
	errorHandler(error$1) {
		if (this.isHandlerEnabled) {
			if (typeof this.requestErrorCallback === "function") this.requestErrorCallback(error$1);
			if (typeof this.requestFinishCallback === "function") this.requestFinishCallback();
		}
	}
};

//#endregion
//#region src/i18n/translations/en-US.ts
const en_US = {
	metadata: {
		localeCode: "en-US",
		countryCode: "US",
		languageCode: "en",
		displayName: "English (United States)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "Sign In",
		"elements.buttons.signout.text": "Sign Out",
		"elements.buttons.signup.text": "Sign Up",
		"elements.buttons.submit.text": "Continue",
		"elements.buttons.facebook.text": "Continue with Facebook",
		"elements.buttons.google.text": "Continue with Google",
		"elements.buttons.github.text": "Continue with GitHub",
		"elements.buttons.microsoft.text": "Continue with Microsoft",
		"elements.buttons.linkedin.text": "Continue with LinkedIn",
		"elements.buttons.ethereum.text": "Continue with Sign In Ethereum",
		"elements.buttons.smsotp.text": "Continue with SMS OTP",
		"elements.buttons.multi.option.text": "Continue with {connection}",
		"elements.buttons.social.text": "Continue with {connection}",
		"elements.display.divider.or_separator": "OR",
		"elements.display.copyable_text.copy": "Copy",
		"elements.display.copyable_text.copied": "Copied!",
		"elements.fields.generic.placeholder": "Enter your {field}",
		"elements.fields.username.label": "Username",
		"elements.fields.username.placeholder": "Enter your username",
		"elements.fields.password.label": "Password",
		"elements.fields.password.placeholder": "Enter your password",
		"elements.fields.first_name.label": "First Name",
		"elements.fields.first_name.placeholder": "Enter your first name",
		"elements.fields.last_name.label": "Last Name",
		"elements.fields.last_name.placeholder": "Enter your last name",
		"elements.fields.email.label": "Email",
		"elements.fields.email.placeholder": "Enter your email",
		"elements.fields.organization.name.label": "Organization Name",
		"elements.fields.organization.handle.label": "Organization Handle",
		"elements.fields.organization.description.label": "Organization Description",
		"elements.fields.organization.select.label": "Select Organization",
		"elements.fields.organization.select.placeholder": "Choose an organization",
		"validations.required.field.error": "This field is required",
		"signin.heading": "Sign In",
		"signin.subheading": "Welcome back! Please sign in to continue.",
		"signup.heading": "Sign Up",
		"signup.subheading": "Create a new account to get started.",
		"email.otp.heading": "OTP Verification",
		"email.otp.subheading": "Enter the code sent to your email address.",
		"email.otp.buttons.submit.text": "Continue",
		"identifier.first.heading": "Sign In",
		"identifier.first.subheading": "Enter your username or email address.",
		"identifier.first.buttons.submit.text": "Continue",
		"sms.otp.heading": "OTP Verification",
		"sms.otp.subheading": "Enter the code sent to your phone number.",
		"sms.otp.buttons.submit.text": "Continue",
		"totp.heading": "Verify Your Identity",
		"totp.subheading": "Enter the code from your authenticator app.",
		"totp.buttons.submit.text": "Continue",
		"username.password.heading": "Sign In",
		"username.password.subheading": "Enter your username and password to continue.",
		"username.password.buttons.submit.text": "Continue",
		"passkey.button.use": "Sign in with Passkey",
		"passkey.signin.heading": "Sign in with Passkey",
		"passkey.register.heading": "Register Passkey",
		"passkey.register.description": "Create a passkey to securely sign in to your account without a password.",
		"user.profile.heading": "Profile",
		"user.profile.update.generic.error": "An error occurred while updating your profile. Please try again.",
		"organization.switcher.switch.organization": "Switch Organization",
		"organization.switcher.loading.placeholder.organizations": "Loading organizations...",
		"organization.switcher.members": "members",
		"organization.switcher.member": "member",
		"organization.switcher.create.organization": "Create Organization",
		"organization.switcher.manage.organizations": "Manage Organizations",
		"organization.switcher.buttons.manage.text": "Manage",
		"organization.switcher.organizations.heading": "Organizations",
		"organization.switcher.buttons.switch.text": "Switch",
		"organization.switcher.no.access": "No Access",
		"organization.switcher.status.label": "Status:",
		"organization.switcher.showing.count": "Showing {showing} of {total} organizations",
		"organization.switcher.buttons.refresh.text": "Refresh",
		"organization.switcher.buttons.load_more.text": "Load More Organizations",
		"organization.switcher.loading.more": "Loading...",
		"organization.switcher.no.organizations": "No organizations found",
		"organization.switcher.error.prefix": "Error:",
		"organization.profile.heading": "Organization Profile",
		"organization.profile.loading": "Loading organization...",
		"organization.profile.error": "Failed to load organization",
		"organization.create.heading": "Create Organization",
		"organization.create.buttons.create_organization.text": "Create Organization",
		"organization.create.buttons.create_organization.loading.text": "Creating...",
		"organization.create.buttons.cancel.text": "Cancel",
		"messages.loading.placeholder": "Loading...",
		"errors.heading": "Error",
		"errors.signin.components.not.available": "Sign-in form is not available at the moment. Please try again later.",
		"errors.signin.initialization": "An error occurred while initializing. Please try again later.",
		"errors.signin.flow.failure": "An error occurred during the sign-in flow. Please try again later.",
		"errors.signin.flow.completion.failure": "An error occurred while completing the sign-in flow. Please try again later.",
		"errors.signin.flow.passkeys.failure": "An error occurred while signing in with passkeys. Please try again later.",
		"errors.signin.flow.passkeys.completion.failure": "An error occurred while completing the passkeys sign-in flow. Please try again later.",
		"errors.signin.timeout": "Time allowed to complete the step has expired.",
		"errors.signup.initialization": "An error occurred while initializing. Please try again later.",
		"errors.signup.flow.failure": "An error occurred during the sign-up flow. Please try again later.",
		"errors.signup.flow.initialization.failure": "An error occurred while initializing the sign-up flow. Please try again later.",
		"errors.signup.components.not.available": "Sign-up form is not available at the moment. Please try again later."
	}
};
var en_US_default = en_US;

//#endregion
//#region src/i18n/translations/fr-FR.ts
const fr_FR = {
	metadata: {
		localeCode: "fr-FR",
		countryCode: "FR",
		languageCode: "fr",
		displayName: "Français (France)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "Se connecter",
		"elements.buttons.signout.text": "Se déconnecter",
		"elements.buttons.signup.text": "S'inscrire",
		"elements.buttons.submit.text": "Continuer",
		"elements.buttons.facebook.text": "Continuer avec Facebook",
		"elements.buttons.google.text": "Continuer avec Google",
		"elements.buttons.github.text": "Continuer avec GitHub",
		"elements.buttons.microsoft.text": "Continuer avec Microsoft",
		"elements.buttons.linkedin.text": "Continuer with LinkedIn",
		"elements.buttons.ethereum.text": "Continuer avec Sign In Ethereum",
		"elements.buttons.smsotp.text": "Continuer avec SMS",
		"elements.buttons.multi.option.text": "Continuer avec {connection}",
		"elements.buttons.social.text": "Continuer avec {connection}",
		"elements.display.divider.or_separator": "OU",
		"elements.display.copyable_text.copy": "Copie",
		"elements.display.copyable_text.copied": "Copié!",
		"elements.fields.generic.placeholder": "Entrez votre {field}",
		"elements.fields.username.label": "Nom d'utilisateur",
		"elements.fields.username.placeholder": "Entrez votre nom d'utilisateur",
		"elements.fields.password.label": "Mot de passe",
		"elements.fields.password.placeholder": "Entrez votre mot de passe",
		"elements.fields.first_name.label": "Prénom",
		"elements.fields.first_name.placeholder": "Entrez votre prénom",
		"elements.fields.last_name.label": "Nom de famille",
		"elements.fields.last_name.placeholder": "Entrez votre nom de famille",
		"elements.fields.email.label": "Email",
		"elements.fields.email.placeholder": "Entrez votre email",
		"elements.fields.organization.name.label": "Nom de l'organisation",
		"elements.fields.organization.handle.label": "Identifiant de l'organisation",
		"elements.fields.organization.description.label": "Description de l'organisation",
		"elements.fields.organization.select.label": "Sélectionner l'organisation",
		"elements.fields.organization.select.placeholder": "Choisissez une organisation",
		"validations.required.field.error": "Ce champ est obligatoire",
		"signin.heading": "Se connecter",
		"signin.subheading": "Entrez vos identifiants pour continuer.",
		"signup.heading": "S'inscrire",
		"signup.subheading": "Créez un nouveau compte pour commencer.",
		"email.otp.heading": "Vérification OTP",
		"email.otp.subheading": "Entrez le code envoyé à votre adresse e-mail.",
		"email.otp.buttons.submit.text": "Continuer",
		"identifier.first.heading": "Se connecter",
		"identifier.first.subheading": "Entrez votre nom d'utilisateur ou votre adresse e-mail.",
		"identifier.first.buttons.submit.text": "Continuer",
		"sms.otp.heading": "Vérification OTP",
		"sms.otp.subheading": "Entrez le code envoyé à votre numéro de téléphone.",
		"sms.otp.buttons.submit.text": "Continuer",
		"totp.heading": "Vérifiez votre identité",
		"totp.subheading": "Entrez le code de votre application d'authentification.",
		"totp.buttons.submit.text": "Continuer",
		"username.password.buttons.submit.text": "Continuer",
		"username.password.heading": "Se connecter",
		"username.password.subheading": "Entrez votre nom d'utilisateur et votre mot de passe pour continuer.",
		"passkey.button.use": "Se connecter avec une clé d'accès",
		"passkey.signin.heading": "Se connecter avec une clé d'accès",
		"passkey.register.heading": "Enregistrer une clé d'accès",
		"passkey.register.description": "Créez une clé d'accès pour vous connecter en toute sécurité à votre compte sans mot de passe.",
		"user.profile.heading": "Profil",
		"user.profile.update.generic.error": "Une erreur est survenue lors de la mise à jour de votre profil. Veuillez réessayer.",
		"organization.switcher.switch.organization": "Changer d'organisation",
		"organization.switcher.loading.placeholder.organizations": "Chargement des organisations...",
		"organization.switcher.members": "membres",
		"organization.switcher.member": "membre",
		"organization.switcher.create.organization": "Créer une organisation",
		"organization.switcher.manage.organizations": "Gérer les organisations",
		"organization.switcher.buttons.manage.text": "Gérer",
		"organization.switcher.organizations.heading": "Organisations",
		"organization.switcher.buttons.switch.text": "Changer",
		"organization.switcher.no.access": "Aucun accès",
		"organization.switcher.status.label": "Statut:",
		"organization.switcher.showing.count": "Affichage de {showing} sur {total} organisations",
		"organization.switcher.buttons.refresh.text": "Rafraîchir",
		"organization.switcher.buttons.load_more.text": "Charger plus d'organisations",
		"organization.switcher.loading.more": "Chargement...",
		"organization.switcher.no.organizations": "Aucune organisation trouvée",
		"organization.switcher.error.prefix": "Erreur:",
		"organization.profile.heading": "Profil de l'organisation",
		"organization.profile.loading": "Chargement de l'organisation...",
		"organization.profile.error": "Échec du chargement de l'organisation",
		"organization.create.heading": "Créer une organisation",
		"organization.create.buttons.create_organization.text": "Créer une organisation",
		"organization.create.buttons.create_organization.loading.text": "Création en cours...",
		"organization.create.buttons.cancel.text": "Annuler",
		"messages.loading.placeholder": "Chargement...",
		"errors.heading": "Erreur",
		"errors.signin.initialization": "Une erreur est survenue lors de l'initialisation. Veuillez réessayer plus tard.",
		"errors.signin.flow.failure": "Une erreur est survenue lors du flux de connexion. Veuillez réessayer plus tard.",
		"errors.signin.flow.completion.failure": "Une erreur est survenue lors de la finalisation du flux de connexion. Veuillez réessayer plus tard.",
		"errors.signin.flow.passkeys.failure": "Une erreur est survenue lors de la connexion avec les clefs d'accès. Veuillez réessayer plus tard.",
		"errors.signin.flow.passkeys.completion.failure": "Une erreur est survenue lors de la finalisation du flux de connexion avec les clefs d'accès. Veuillez réessayer plus tard.",
		"errors.signup.initialization": "Une erreur est survenue lors de l'initialisation. Veuillez réessayer plus tard.",
		"errors.signup.flow.failure": "Une erreur est survenue lors du flux d'inscription. Veuillez réessayer plus tard.",
		"errors.signup.flow.initialization.failure": "Une erreur est survenue lors de l'initialisation du flux d'inscription. Veuillez réessayer plus tard.",
		"errors.signup.components.not.available": "Le formulaire d'inscription n'est pas disponible pour le moment. Veuillez réessayer plus tard.",
		"errors.signin.components.not.available": "Le formulaire de connexion n'est pas disponible pour le moment. Veuillez réessayer plus tard.",
		"errors.signin.timeout": "Le temps imparti pour effectuer cette e'tape est expire'."
	}
};
var fr_FR_default = fr_FR;

//#endregion
//#region src/i18n/translations/te-IN.ts
const te_IN = {
	metadata: {
		localeCode: "te-IN",
		countryCode: "IN",
		languageCode: "te",
		displayName: "తెలుగు (భారతదేశం)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "సైన్ ఇన్ చేయండి",
		"elements.buttons.signout.text": "సైన్ అవుట్ చేయండి",
		"elements.buttons.signup.text": "సైన్ అప్ చేయండి",
		"elements.buttons.submit.text": "కొనసాగించండి",
		"elements.buttons.facebook.text": "Facebook తో కొనసాగించండి",
		"elements.buttons.google.text": "Google తో కొనసాగించండి",
		"elements.buttons.github.text": "GitHub తో కొనసాగించండి",
		"elements.buttons.microsoft.text": "Microsoft తో కొనసాగించండి",
		"elements.buttons.linkedin.text": "LinkedIn తో కొనసాగించండి",
		"elements.buttons.ethereum.text": "Ethereum తో సైన్ ఇన్ చేయండి",
		"elements.buttons.smsotp.text": "SMS తో కొనసాగించండి",
		"elements.buttons.multi.option.text": "{connection} తో కొనసాగించండి",
		"elements.buttons.social.text": "{connection} తో కొనసాగించండి",
		"elements.display.divider.or_separator": "లేదా",
		"elements.display.copyable_text.copy": "కాపీ చేయండి",
		"elements.display.copyable_text.copied": "కాపీ చేయబడింది!",
		"elements.fields.generic.placeholder": "మీ {field} ను నమోదు చేయండి",
		"elements.fields.username.label": "వినియోగదారు పేరు",
		"elements.fields.username.placeholder": "వినియోగదారు పేరును నమోదు చేయండి",
		"elements.fields.password.label": "పాస్వర్డ్",
		"elements.fields.password.placeholder": "పాస్వర్డ్ నమోదు చేయండి",
		"elements.fields.first_name.label": "మొదటి పేరు",
		"elements.fields.first_name.placeholder": "మీ మొదటి పేరును నమోదు చేయండి",
		"elements.fields.last_name.label": "చివరి పేరు",
		"elements.fields.last_name.placeholder": "మీ చివరి పేరును నమోదు చేయండి",
		"elements.fields.email.label": "ఇమెయిల్",
		"elements.fields.email.placeholder": "మీ ఇమెయిల్‌ను నమోదు చేయండి",
		"elements.fields.organization.name.label": "సంస్థ పేరు",
		"elements.fields.organization.handle.label": "సంస్థ హ్యాండిల్",
		"elements.fields.organization.description.label": "సంస్థ వివరణ",
		"elements.fields.organization.select.label": "ఆర్గనైజేషన్‌ను ఎంచుకోండి",
		"elements.fields.organization.select.placeholder": "సంస్థను ఎంచుకోండి",
		"validations.required.field.error": "ఈ ఫీల్డ్ అవసరం",
		"signin.heading": "సైన్ ఇన్ చేయండి",
		"signin.subheading": "కొనసాగించడానికి మీ వివరాలు ఇవ్వండి.",
		"signup.heading": "సైన్ అప్ చేయండి",
		"signup.subheading": "కొత్త అకౌంట్ సృష్టించండి.",
		"email.otp.heading": "OTP వెరిఫికేషన్",
		"email.otp.subheading": "మీ ఇమెయిల్‌కి పంపిన కోడ్‌ను నమోదు చేయండి.",
		"email.otp.buttons.submit.text": "కొనసాగించండి",
		"identifier.first.heading": "సైన్ ఇన్ చేయండి",
		"identifier.first.subheading": "మీ యూజర్ పేరు లేదా ఇమెయిల్ ఇవ్వండి.",
		"identifier.first.buttons.submit.text": "కొనసాగించండి",
		"sms.otp.heading": "OTP వెరిఫికేషన్",
		"sms.otp.subheading": "మీ ఫోన్ నంబర్‌కి పంపిన కోడ్‌ను నమోదు చేయండి.",
		"sms.otp.buttons.submit.text": "కొనసాగించండి",
		"totp.heading": "మీ గుర్తింపును ధృవీకరించండి",
		"totp.subheading": "మీ ఆథెంటికేటర్ యాప్‌లోని కోడ్‌ను నమోదు చేయండి.",
		"totp.buttons.submit.text": "కొనసాగించండి",
		"username.password.buttons.submit.text": "కొనసాగించండి",
		"username.password.heading": "సైన్ ఇన్ చేయండి",
		"username.password.subheading": "మీ యూజర్ పేరు మరియు పాస్‌వర్డ్ ఇవ్వండి.",
		"passkey.button.use": "Passkey తో సైన్ ఇన్ చేయండి",
		"passkey.signin.heading": "Passkey తో సైన్ ఇన్ చేయండి",
		"passkey.register.heading": "Passkey ని నమోదు చేయండి",
		"passkey.register.description": "పాస్‌వర్డ్ లేకుండా మీ ఖాతాలోకి సురక్షితంగా సైన్ ఇన్ చేయడానికి Passkey ని సృష్టించండి.",
		"user.profile.heading": "ప్రొఫైల్",
		"user.profile.update.generic.error": "ప్రొఫైల్ అప్‌డేట్ చేస్తూ లోపం వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
		"organization.switcher.switch.organization": "ఆర్గనైజేషన్ మార్చండి",
		"organization.switcher.loading.placeholder.organizations": "ఆర్గనైజేషన్‌లు లోడ్ అవుతున్నాయి...",
		"organization.switcher.members": "సభ్యులు",
		"organization.switcher.member": "సభ్యుడు",
		"organization.switcher.create.organization": "ఆర్గనైజేషన్ సృష్టించండి",
		"organization.switcher.manage.organizations": "ఆర్గనైజేషన్‌లను నిర్వహించండి",
		"organization.switcher.buttons.manage.text": "నిర్వహించండి",
		"organization.switcher.organizations.heading": "ఆర్గనైజేషన్‌లు",
		"organization.switcher.buttons.switch.text": "మార్చండి",
		"organization.switcher.no.access": "యాక్సెస్ లేదు",
		"organization.switcher.status.label": "స్టేటస్:",
		"organization.switcher.showing.count": "{total} లో {showing} ఆర్గనైజేషన్‌లు చూపుతున్నాయి",
		"organization.switcher.buttons.refresh.text": "రిఫ్రెష్ చేయండి",
		"organization.switcher.buttons.load_more.text": "మరిన్ని ఆర్గనైజేషన్‌లను లోడ్ చేయండి",
		"organization.switcher.loading.more": "లోడ్ అవుతోంది...",
		"organization.switcher.no.organizations": "ఏ ఆర్గనైజేషన్‌లు లభించలేదు",
		"organization.switcher.error.prefix": "లోపం:",
		"organization.profile.heading": "ఆర్గనైజేషన్ ప్రొఫైల్",
		"organization.profile.loading": "లోడ్ అవుతోంది...",
		"organization.profile.error": "ఆర్గనైజేషన్‌ను లోడ్ చేయడం విఫలమైంది",
		"organization.create.heading": "ఆర్గనైజేషన్ సృష్టించండి",
		"organization.create.buttons.create_organization.text": "సృష్టించండి",
		"organization.create.buttons.create_organization.loading.text": "సృష్టిస్తోంది...",
		"organization.create.buttons.cancel.text": "రద్దు చేయండి",
		"messages.loading.placeholder": "లోడ్ అవుతోంది...",
		"errors.heading": "లోపం",
		"errors.signin.initialization": "ప్రారంభించేటప్పుడు లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signin.flow.failure": "సైన్ ఇన్ ప్రక్రియలో లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signin.flow.completion.failure": "సైన్ ఇన్ పూర్తి చేయడంలో లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signin.flow.passkeys.failure": "పాస్‌కీలతో సైన్ ఇన్ చేస్తూ లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signin.flow.passkeys.completion.failure": "పాస్‌కీ సైన్ ఇన్ పూర్తి చేయడంలో లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signup.initialization": "ప్రారంభించేటప్పుడు లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signup.flow.failure": "సైన్ అప్ ప్రక్రియలో లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signup.flow.initialization.failure": "సైన్ అప్ ప్రక్రియను ప్రారంభించేటప్పుడు లోపం వచ్చింది. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signup.components.not.available": "సైన్ అప్ ఫారం ప్రస్తుతం అందుబాటులో లేదు. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signin.components.not.available": "సైన్ ఇన్ ఫారం ప్రస్తుతం అందుబాటులో లేదు. దయచేసి తరువాత మళ్లీ ప్రయత్నించండి.",
		"errors.signin.timeout": "దశను పూర్తి చేయడానికి అనుమతించబడిన సమయం ముగిసింది."
	}
};
var te_IN_default = te_IN;

//#endregion
//#region src/i18n/translations/hi-IN.ts
const hi_IN = {
	metadata: {
		localeCode: "hi-IN",
		countryCode: "IN",
		languageCode: "hi",
		displayName: "हिन्दी (भारत)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "साइन इन",
		"elements.buttons.signout.text": "साइन आउट",
		"elements.buttons.signup.text": "साइन अप",
		"elements.buttons.submit.text": "जारी रखें",
		"elements.buttons.facebook.text": "Facebook के साथ जारी रखें",
		"elements.buttons.google.text": "Google के साथ जारी रखें",
		"elements.buttons.github.text": "GitHub के साथ जारी रखें",
		"elements.buttons.microsoft.text": "Microsoft के साथ जारी रखें",
		"elements.buttons.linkedin.text": "LinkedIn के साथ जारी रखें",
		"elements.buttons.ethereum.text": "Ethereum के साथ साइन इन करें",
		"elements.buttons.smsotp.text": "SMS के साथ जारी रखें",
		"elements.buttons.multi.option.text": "{connection} के साथ जारी रखें",
		"elements.buttons.social.text": "{connection} के साथ जारी रखें",
		"elements.display.divider.or_separator": "या",
		"elements.display.copyable_text.copy": "प्रतिलिपि",
		"elements.display.copyable_text.copied": "नकल की गई!",
		"elements.fields.generic.placeholder": "{field} दर्ज करें",
		"elements.fields.username.label": "उपयोगकर्ता नाम",
		"elements.fields.username.placeholder": "अपना उपयोगकर्ता नाम दर्ज करें",
		"elements.fields.password.label": "पासवर्ड",
		"elements.fields.password.placeholder": "अपना पासवर्ड दर्ज करें",
		"elements.fields.first_name.label": "पहला नाम",
		"elements.fields.first_name.placeholder": "अपना पहला नाम दर्ज करें",
		"elements.fields.last_name.label": "अंतिम नाम",
		"elements.fields.last_name.placeholder": "अपना अंतिम नाम दर्ज करें",
		"elements.fields.email.label": "ईमेल",
		"elements.fields.email.placeholder": "अपना ईमेल दर्ज करें",
		"elements.fields.organization.name.label": "संगठन का नाम",
		"elements.fields.organization.handle.label": "संगठन हैंडल",
		"elements.fields.organization.description.label": "संगठन विवरण",
		"elements.fields.organization.select.label": "संगठन चुनें",
		"elements.fields.organization.select.placeholder": "एक संगठन चुनें",
		"validations.required.field.error": "यह फील्ड आवश्यक है",
		"signin.heading": "साइन इन",
		"signin.subheading": "जारी रखने के लिए अपनी प्रमाणिक जानकारी दर्ज करें।",
		"signup.heading": "साइन अप",
		"signup.subheading": "शुरू करने के लिए नया खाता बनाएं।",
		"email.otp.heading": "OTP सत्यापन",
		"email.otp.subheading": "अपनी ईमेल पर भेजा गया कोड दर्ज करें।",
		"email.otp.buttons.submit.text": "जारी रखें",
		"identifier.first.heading": "साइन इन",
		"identifier.first.subheading": "अपना उपयोगकर्ता नाम या ईमेल दर्ज करें।",
		"identifier.first.buttons.submit.text": "जारी रखें",
		"sms.otp.heading": "OTP सत्यापन",
		"sms.otp.subheading": "अपने फ़ोन नंबर पर भेजा गया कोड दर्ज करें।",
		"sms.otp.buttons.submit.text": "जारी रखें",
		"totp.heading": "अपनी पहचान सत्यापित करें",
		"totp.subheading": "अपने ऑथेंटिकेटर ऐप से कोड दर्ज करें।",
		"totp.buttons.submit.text": "जारी रखें",
		"username.password.buttons.submit.text": "जारी रखें",
		"username.password.heading": "साइन इन",
		"username.password.subheading": "अपना उपयोगकर्ता नाम और पासवर्ड दर्ज करें।",
		"passkey.button.use": "Passkey के साथ साइन इन करें",
		"passkey.signin.heading": "Passkey के साथ साइन इन करें",
		"passkey.register.heading": "Passkey पंजीकृत करें",
		"passkey.register.description": "बिना पासवर्ड के अपने खाते में सुरक्षित रूप से साइन इन करने के लिए एक Passkey बनाएं।",
		"user.profile.heading": "प्रोफ़ाइल",
		"user.profile.update.generic.error": "प्रोफ़ाइल अपडेट करते समय त्रुटि हुई। कृपया पुनः प्रयास करें।",
		"organization.switcher.switch.organization": "संगठन बदलें",
		"organization.switcher.loading.placeholder.organizations": "संगठन लोड हो रहे हैं...",
		"organization.switcher.members": "सदस्य",
		"organization.switcher.member": "सदस्य",
		"organization.switcher.create.organization": "संगठन बनाएं",
		"organization.switcher.manage.organizations": "संगठनों का प्रबंधन करें",
		"organization.switcher.buttons.manage.text": "प्रबंधित करें",
		"organization.switcher.organizations.heading": "संगठन",
		"organization.switcher.buttons.switch.text": "बदलें",
		"organization.switcher.no.access": "कोई पहुँच नहीं",
		"organization.switcher.status.label": "स्थिति:",
		"organization.switcher.showing.count": "{total} में से {showing} संगठन दिखा रहे हैं",
		"organization.switcher.buttons.refresh.text": "रिफ्रेश",
		"organization.switcher.buttons.load_more.text": "और संगठन लोड करें",
		"organization.switcher.loading.more": "लोड हो रहा है...",
		"organization.switcher.no.organizations": "कोई संगठन नहीं मिला",
		"organization.switcher.error.prefix": "त्रुटि:",
		"organization.profile.heading": "संगठन प्रोफ़ाइल",
		"organization.profile.loading": "संगठन लोड हो रहा है...",
		"organization.profile.error": "संगठन लोड करने में विफल",
		"organization.create.heading": "संगठन बनाएं",
		"organization.create.buttons.create_organization.text": "संगठन बनाएं",
		"organization.create.buttons.create_organization.loading.text": "बनाया जा रहा है...",
		"organization.create.buttons.cancel.text": "रद्द करें",
		"messages.loading.placeholder": "लोड हो रहा है...",
		"errors.heading": "त्रुटि",
		"errors.signin.initialization": "इनिशियलाइज़ेशन में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
		"errors.signin.flow.failure": "साइन-इन प्रक्रिया में त्रुटि। कृपया बाद में पुनः प्रयास करें।",
		"errors.signin.flow.completion.failure": "साइन-इन प्रक्रिया पूरी करते समय त्रुटि। कृपया बाद में पुनः प्रयास करें।",
		"errors.signin.flow.passkeys.failure": "पासकीज़ के साथ साइन-इन करते समय त्रुटि।",
		"errors.signin.flow.passkeys.completion.failure": "पासकीज़ साइन-इन पूरी करते समय त्रुटि।",
		"errors.signup.initialization": "प्रारंभीकरण के दौरान एक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
		"errors.signup.flow.failure": "साइन-अप प्रक्रिया में त्रुटि। कृपया बाद में पुनः प्रयास करें।",
		"errors.signup.flow.initialization.failure": "साइन-अप प्रक्रिया प्रारंभ करते समय त्रुटि। कृपया बाद में पुनः प्रयास करें।",
		"errors.signup.components.not.available": "साइन-अप फॉर्म फिलहाल उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
		"errors.signin.components.not.available": "साइन-इन फॉर्म फिलहाल उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
		"errors.signin.timeout": "स्टेप पूरा करने के लिए दिया गया समय खत्म हो गया है।"
	}
};
var hi_IN_default = hi_IN;

//#endregion
//#region src/i18n/translations/pt-BR.ts
const pt_BR = {
	metadata: {
		localeCode: "pt-BR",
		countryCode: "BR",
		languageCode: "pt",
		displayName: "Português (Brazil)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "Entrar",
		"elements.buttons.signout.text": "Sair",
		"elements.buttons.signup.text": "Cadastre-se",
		"elements.buttons.submit.text": "Continuar",
		"elements.buttons.facebook.text": "Entrar com Facebook",
		"elements.buttons.google.text": "Entrar com Google",
		"elements.buttons.github.text": "Entrar com GitHub",
		"elements.buttons.microsoft.text": "Entrar com Microsoft",
		"elements.buttons.linkedin.text": "Entrar com LinkedIn",
		"elements.buttons.ethereum.text": "Entrar com Ethereum",
		"elements.buttons.smsotp.text": "Entrar com SMS",
		"elements.buttons.multi.option.text": "Entrar com {connection}",
		"elements.buttons.social.text": "Entrar com {connection}",
		"elements.display.divider.or_separator": "OU",
		"elements.display.copyable_text.copy": "Cópia",
		"elements.display.copyable_text.copied": "Copiado!",
		"elements.fields.generic.placeholder": "Digite seu {field}",
		"elements.fields.username.label": "Nome de usuário",
		"elements.fields.username.placeholder": "Digite o nome de usuário",
		"elements.fields.password.label": "Senha",
		"elements.fields.password.placeholder": "Digite sua senha",
		"elements.fields.first_name.label": "Primeiro nome",
		"elements.fields.first_name.placeholder": "Digite seu primeiro nome",
		"elements.fields.last_name.label": "Sobrenome",
		"elements.fields.last_name.placeholder": "Digite seu sobrenome",
		"elements.fields.email.label": "Email",
		"elements.fields.email.placeholder": "Digite seu email",
		"elements.fields.organization.name.label": "Nome da Organização",
		"elements.fields.organization.handle.label": "Identificador da Organização",
		"elements.fields.organization.description.label": "Descrição da Organização",
		"elements.fields.organization.select.label": "Selecionar Organização",
		"elements.fields.organization.select.placeholder": "Selecione uma organização",
		"validations.required.field.error": "Este campo é obrigatório",
		"signin.heading": "Entrar",
		"signin.subheading": "Digite suas credencias para continuar.",
		"signup.heading": "Cadastra-se",
		"signup.subheading": "Crie uma nova conta para iniciar.",
		"email.otp.heading": "Verificação OTP",
		"email.otp.subheading": "Digite o código enviado para seu e-mail.",
		"email.otp.buttons.submit.text": "Continue",
		"identifier.first.heading": "Entrar",
		"identifier.first.subheading": "Digite seu usuário ou e-mail.",
		"identifier.first.buttons.submit.text": "Continue",
		"sms.otp.heading": "Verificação OTP",
		"sms.otp.subheading": "Digite o código enviado para seu telefone.",
		"sms.otp.buttons.submit.text": "Continue",
		"totp.heading": "Verifique sua identidade",
		"totp.subheading": "Digite o código do seu aplicativo autenticador.",
		"totp.buttons.submit.text": "Continue",
		"username.password.buttons.submit.text": "Continue",
		"username.password.heading": "Entrar",
		"username.password.subheading": "Digite seu usuário e senha para continuar.",
		"passkey.button.use": "Entrar com Passkey",
		"passkey.signin.heading": "Entrar com Passkey",
		"passkey.register.heading": "Registrar Passkey",
		"passkey.register.description": "Crie uma passkey para entrar em sua conta com segurança sem uma senha.",
		"user.profile.heading": "Perfil",
		"user.profile.update.generic.error": "Ocorreu um erro ao atualizar seu perfil. Tente novamente.",
		"organization.switcher.switch.organization": "Trocar Organização",
		"organization.switcher.loading.placeholder.organizations": "Carregando organizações...",
		"organization.switcher.members": "membros",
		"organization.switcher.member": "membro",
		"organization.switcher.create.organization": "Criar Organização",
		"organization.switcher.manage.organizations": "Gerenciar Organizações",
		"organization.switcher.buttons.manage.text": "Gerenciar",
		"organization.switcher.organizations.heading": "Organizações",
		"organization.switcher.buttons.switch.text": "Trocar",
		"organization.switcher.no.access": "Sem Acesso",
		"organization.switcher.status.label": "Situação:",
		"organization.switcher.showing.count": "Exibindo {showing} de {total} organizações",
		"organization.switcher.buttons.refresh.text": "Atualizar",
		"organization.switcher.buttons.load_more.text": "Carregar Mais Organizações",
		"organization.switcher.loading.more": "Carregando...",
		"organization.switcher.no.organizations": "Nenhuma organização encontrada",
		"organization.switcher.error.prefix": "Erro:",
		"organization.profile.heading": "Perfil da Organização",
		"organization.profile.loading": "Carregando organização...",
		"organization.profile.error": "Falha ao carregar organização",
		"organization.create.heading": "Criar Organização",
		"organization.create.buttons.create_organization.text": "Criar Organização",
		"organization.create.buttons.create_organization.loading.text": "Criando...",
		"organization.create.buttons.cancel.text": "Cancelar",
		"messages.loading.placeholder": "Carregando...",
		"errors.heading": "Erro",
		"errors.signin.initialization": "Ocorreu um erro ao inicializar. Tente novamente mais tarde.",
		"errors.signin.flow.failure": "Ocorreu um erro durante o login. Tente novamente mais tarde.",
		"errors.signin.flow.completion.failure": "Ocorreu um erro ao completar o login. Tente novamente mais tarde.",
		"errors.signin.flow.passkeys.failure": "Ocorreu um erro ao entrar com as chaves de acesso (passkeys). Tente novamente mais tarde.",
		"errors.signin.flow.passkeys.completion.failure": "Ocorreu um erro ao completar o login com as chaves de acesso (passkeys). Tente novamente mais tarde.",
		"errors.signup.initialization": "Ocorreu um erro durante a inicialização. Tente novamente mais tarde.",
		"errors.signup.flow.failure": "Ocorreu um erro durante o fluxo de cadastro. Tente novamente mais tarde.",
		"errors.signup.flow.initialization.failure": "Ocorreu um erro ao inicializar o fluxo de cadastro. Tente novamente mais tarde.",
		"errors.signup.components.not.available": "O formulário de cadastro não está disponível no momento. Tente novamente mais tarde.",
		"errors.signin.components.not.available": "O formulário de login não está disponível no momento. Tente novamente mais tarde.",
		"errors.signin.timeout": "O tempo permitido para concluir a etapa expirou."
	}
};
var pt_BR_default = pt_BR;

//#endregion
//#region src/i18n/translations/pt-PT.ts
const pt_PT = {
	metadata: {
		localeCode: "pt-PT",
		countryCode: "PT",
		languageCode: "pt",
		displayName: "Português (Portugal)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "Iniciar Sessão",
		"elements.buttons.signout.text": "Terminar Sessão",
		"elements.buttons.signup.text": "Registar-se",
		"elements.buttons.submit.text": "Continuar",
		"elements.buttons.facebook.text": "Iniciar Sessão com Facebook",
		"elements.buttons.google.text": "Iniciar Sessão com Google",
		"elements.buttons.github.text": "Iniciar Sessão com GitHub",
		"elements.buttons.microsoft.text": "Iniciar Sessão com Microsoft",
		"elements.buttons.linkedin.text": "Iniciar Sessão com LinkedIn",
		"elements.buttons.ethereum.text": "Iniciar Sessão com Ethereum",
		"elements.buttons.smsotp.text": "Iniciar Sessão com SMS",
		"elements.buttons.multi.option.text": "Iniciar Sessão com {connection}",
		"elements.buttons.social.text": "Iniciar Sessão com {connection}",
		"elements.display.divider.or_separator": "OU",
		"elements.display.copyable_text.copy": "Cópia",
		"elements.display.copyable_text.copied": "Copiado!",
		"elements.fields.generic.placeholder": "Introduza o seu {field}",
		"elements.fields.username.label": "Nome de utilizador",
		"elements.fields.username.placeholder": "Introduza o nome de utilizador",
		"elements.fields.password.label": "Palavra-passe",
		"elements.fields.password.placeholder": "Introduza a palavra-passe",
		"elements.fields.first_name.label": "Primeiro nome",
		"elements.fields.first_name.placeholder": "Introduza o primeiro nome",
		"elements.fields.last_name.label": "Apelido",
		"elements.fields.last_name.placeholder": "Introduza o apelido",
		"elements.fields.email.label": "Email",
		"elements.fields.email.placeholder": "Introduza o email",
		"elements.fields.organization.name.label": "Nome da Organização",
		"elements.fields.organization.handle.label": "Identificador da Organização",
		"elements.fields.organization.description.label": "Descrição da Organização",
		"elements.fields.organization.select.label": "Selecionar Organização",
		"elements.fields.organization.select.placeholder": "Selecione uma organização",
		"validations.required.field.error": "Este campo é obrigatório",
		"signin.heading": "Iniciar Sessão",
		"signin.subheading": "Introduza as suas credenciais para continuar.",
		"signup.heading": "Registar-se",
		"signup.subheading": "Crie uma nova conta para começar.",
		"email.otp.heading": "Verificação OTP",
		"email.otp.subheading": "Introduza o código enviado para o seu e-mail.",
		"email.otp.buttons.submit.text": "Continuar",
		"identifier.first.heading": "Iniciar Sessão",
		"identifier.first.subheading": "Introduza o seu utilizador ou e-mail.",
		"identifier.first.buttons.submit.text": "Continuar",
		"sms.otp.heading": "Verificação OTP",
		"sms.otp.subheading": "Introduza o código enviado para o seu telemóvel.",
		"sms.otp.buttons.submit.text": "Continuar",
		"totp.heading": "Verifique a sua identidade",
		"totp.subheading": "Introduza o código da sua aplicação autenticadora.",
		"totp.buttons.submit.text": "Continuar",
		"username.password.buttons.submit.text": "Continuar",
		"username.password.heading": "Iniciar Sessão",
		"username.password.subheading": "Introduza o seu utilizador e palavra-passe para continuar.",
		"passkey.button.use": "Iniciar sessão com Passkey",
		"passkey.signin.heading": "Iniciar sessão com Passkey",
		"passkey.register.heading": "Registar Passkey",
		"passkey.register.description": "Crie uma passkey para iniciar sessão na sua conta com segurança sem palavra-passe.",
		"user.profile.heading": "Perfil",
		"user.profile.update.generic.error": "Ocorreu um erro ao actualizar o seu perfil. Tente novamente.",
		"organization.switcher.switch.organization": "Trocar Organização",
		"organization.switcher.loading.placeholder.organizations": "A carregar organizações...",
		"organization.switcher.members": "membros",
		"organization.switcher.member": "membro",
		"organization.switcher.create.organization": "Criar Organização",
		"organization.switcher.manage.organizations": "Gerir Organizações",
		"organization.switcher.buttons.manage.text": "Gerir",
		"organization.switcher.organizations.heading": "Organizações",
		"organization.switcher.buttons.switch.text": "Trocar",
		"organization.switcher.no.access": "Sem Acesso",
		"organization.switcher.status.label": "Estado:",
		"organization.switcher.showing.count": "A mostrar {showing} de {total} organizações",
		"organization.switcher.buttons.refresh.text": "Actualizar",
		"organization.switcher.buttons.load_more.text": "Carregar Mais Organizações",
		"organization.switcher.loading.more": "A carregar...",
		"organization.switcher.no.organizations": "Nenhuma organização encontrada",
		"organization.switcher.error.prefix": "Erro:",
		"organization.profile.heading": "Perfil da Organização",
		"organization.profile.loading": "A carregar organização...",
		"organization.profile.error": "Falha ao carregar organização",
		"organization.create.heading": "Criar Organização",
		"organization.create.buttons.create_organization.text": "Criar Organização",
		"organization.create.buttons.create_organization.loading.text": "A criar...",
		"organization.create.buttons.cancel.text": "Cancelar",
		"messages.loading.placeholder": "A carregar...",
		"errors.heading": "Erro",
		"errors.signin.initialization": "Ocorreu um erro ao inicializar. Tente novamente mais tarde.",
		"errors.signin.flow.failure": "Ocorreu um erro durante o início de sessão. Tente novamente mais tarde.",
		"errors.signin.flow.completion.failure": "Ocorreu um erro ao completar o início de sessão. Tente novamente mais tarde.",
		"errors.signin.flow.passkeys.failure": "Ocorreu um erro ao iniciar sessão com as chaves de acesso (passkeys). Tente novamente mais tarde.",
		"errors.signin.flow.passkeys.completion.failure": "Ocorreu um erro ao completar o início de sessão com as chaves de acesso (passkeys). Tente novamente mais tarde.",
		"errors.signup.initialization": "Ocorreu um erro durante a inicialização. Tente novamente mais tarde.",
		"errors.signup.flow.failure": "Ocorreu um erro durante o fluxo de registo. Tente novamente mais tarde.",
		"errors.signup.flow.initialization.failure": "Ocorreu um erro ao inicializar o fluxo de registo. Tente novamente mais tarde.",
		"errors.signup.components.not.available": "O formulário de registo não está disponível de momento. Tente novamente mais tarde.",
		"errors.signin.components.not.available": "O formulário de início de sessão não está disponível de momento. Tente novamente mais tarde.",
		"errors.signin.timeout": "O tempo permitido para completar a etapa expirou."
	}
};
var pt_PT_default = pt_PT;

//#endregion
//#region src/i18n/translations/ta-IN.ts
const ta_IN = {
	metadata: {
		localeCode: "ta-IN",
		countryCode: "IN",
		languageCode: "ta",
		displayName: "தமிழ் (இலங்கை)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "உள்நுழை",
		"elements.buttons.signout.text": "வெளியேறு",
		"elements.buttons.signup.text": "பதிவு செய்",
		"elements.buttons.submit.text": "தொடரவும்",
		"elements.buttons.facebook.text": "Facebook மூலம் தொடரவும்",
		"elements.buttons.google.text": "Google மூலம் தொடரவும்",
		"elements.buttons.github.text": "GitHub மூலம் தொடரவும்",
		"elements.buttons.microsoft.text": "Microsoft மூலம் தொடரவும்",
		"elements.buttons.linkedin.text": "LinkedIn மூலம் தொடரவும்",
		"elements.buttons.ethereum.text": "Ethereum மூலம் உள்நுழை",
		"elements.buttons.smsotp.text": "SMS மூலம் தொடரவும்",
		"elements.buttons.multi.option.text": "{connection} மூலம் தொடரவும்",
		"elements.buttons.social.text": "{connection} மூலம் தொடரவும்",
		"elements.display.divider.or_separator": "அல்லது",
		"elements.display.copyable_text.copy": "நகலெடுக்கவும்",
		"elements.display.copyable_text.copied": "நகலெடுக்கப்பட்டது!",
		"elements.fields.generic.placeholder": "{field} உள்ளிடவும்",
		"elements.fields.username.label": "பயனர்பெயர்",
		"elements.fields.username.placeholder": "பயனர்பெயரை உள்ளிடவும்",
		"elements.fields.password.label": "கடவுச்சொல்",
		"elements.fields.password.placeholder": "கடவுச்சொலை உள்ளிடவும்",
		"elements.fields.first_name.label": "முதல் பெயர்",
		"elements.fields.first_name.placeholder": "உங்கள் முதல் பெயரை உள்ளிடவும்",
		"elements.fields.last_name.label": "கடைசி பெயர்",
		"elements.fields.last_name.placeholder": "உங்கள் கடைசி பெயரை உள்ளிடவும்",
		"elements.fields.email.label": "மின்னஞ்சல்",
		"elements.fields.email.placeholder": "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
		"elements.fields.organization.name.label": "அமைப்பின் பெயர்",
		"elements.fields.organization.handle.label": "அமைப்பு கையாளுதல்",
		"elements.fields.organization.description.label": "அமைப்பு விளக்கம்",
		"elements.fields.organization.select.label": "அமைப்பை தேர்ந்தெடு",
		"elements.fields.organization.select.placeholder": "அமைப்பை தெரிந்தெடுக்கவும்",
		"validations.required.field.error": "இந்த புலம் தேவை",
		"signin.heading": "உள்நுழை",
		"signin.subheading": "தொடர உங்கள் சான்றுகளை உள்ளிடவும்.",
		"signup.heading": "பதிவு செய்",
		"signup.subheading": "தொடங்க புதிய கணக்கை உருவாக்கவும்.",
		"email.otp.heading": "OTP சரிபார்ப்பு",
		"email.otp.subheading": "உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்ட குறியீட்டை உள்ளிடவும்.",
		"email.otp.buttons.submit.text": "தொடரவும்",
		"identifier.first.heading": "உள்நுழை",
		"identifier.first.subheading": "பயனர்பெயர் அல்லது மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
		"identifier.first.buttons.submit.text": "தொடரவும்",
		"sms.otp.heading": "OTP சரிபார்ப்பு",
		"sms.otp.subheading": "உங்கள் தொலைபேசிக்கு அனுப்பப்பட்ட குறியீட்டை உள்ளிடவும்.",
		"sms.otp.buttons.submit.text": "தொடரவும்",
		"totp.heading": "உங்கள் அடையாளத்தை சரிபார்க்கவும்",
		"totp.subheading": "உங்கள் அங்கீகரிப்பு செயலியில் உள்ள குறியீட்டை உள்ளிடவும்.",
		"totp.buttons.submit.text": "தொடரவும்",
		"username.password.buttons.submit.text": "தொடரவும்",
		"username.password.heading": "உள்நுழை",
		"username.password.subheading": "தொடர உங்கள் பயனர்பெயர் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.",
		"passkey.button.use": "Passkey மூலம் உள்நுழையவும்",
		"passkey.signin.heading": "Passkey மூலம் உள்நுழையவும்",
		"passkey.register.heading": "Passkey-ஐ பதிவு செய்யவும்",
		"passkey.register.description": "கடவுச்சொல் இல்லாமல் பாதுகாப்பாக உள்நுழைய ஒரு passkey-ஐ உருவாக்கவும்.",
		"user.profile.heading": "சுயவிவரம்",
		"user.profile.update.generic.error": "உங்கள் சுயவிவரத்தை புதுப்பிக்கும் போது பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",
		"organization.switcher.switch.organization": "அமைப்பை மாற்று",
		"organization.switcher.loading.placeholder.organizations": "அமைப்புகள் ஏற்றப்படுகின்றன...",
		"organization.switcher.members": "உறுப்பினர்கள்",
		"organization.switcher.member": "உறுப்பினர்",
		"organization.switcher.create.organization": "அமைப்பை உருவாக்கு",
		"organization.switcher.manage.organizations": "அமைப்புகளை நிர்வகிக்கவும்",
		"organization.switcher.buttons.manage.text": "நிர்வகி",
		"organization.switcher.organizations.heading": "அமைப்புகள்",
		"organization.switcher.buttons.switch.text": "மாற்று",
		"organization.switcher.no.access": "அணுகல் இல்லை",
		"organization.switcher.status.label": "நிலை:",
		"organization.switcher.showing.count": "மொத்த {total} அமைப்புகளில் {showing} காட்டப்படுகிறது",
		"organization.switcher.buttons.refresh.text": "புதுப்பி",
		"organization.switcher.buttons.load_more.text": "மேலும் அமைப்புகளை ஏற்று",
		"organization.switcher.loading.more": "ஏற்றப்படுகிறது...",
		"organization.switcher.no.organizations": "எந்த அமைப்பும் கிடைக்கவில்லை",
		"organization.switcher.error.prefix": "பிழை:",
		"organization.profile.heading": "அமைப்பு சுயவிவரம்",
		"organization.profile.loading": "அமைப்பை ஏற்றுகிறது...",
		"organization.profile.error": "அமைப்பை ஏற்ற முடியவில்லை",
		"organization.create.heading": "அமைப்பை உருவாக்கு",
		"organization.create.buttons.create_organization.text": "அமைப்பை உருவாக்கு",
		"organization.create.buttons.create_organization.loading.text": "உருவாக்கப்படுகிறது...",
		"organization.create.buttons.cancel.text": "ரத்து செய்",
		"messages.loading.placeholder": "ஏற்றப்படுகிறது...",
		"errors.heading": "பிழை",
		"errors.signin.initialization": "தொடக்கத்தில் பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signin.flow.failure": "உள்நுழைவு செயல்பாட்டின் போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signin.flow.completion.failure": "உள்நுழைவு செயல்பாட்டை முடிக்கும் போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signin.flow.passkeys.failure": "பாஸ்கீக்கள் மூலம் உள்நுழையும்போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signin.flow.passkeys.completion.failure": "பாஸ்கீ உள்நுழைவு முடிக்கும் போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signup.initialization": "தொடங்கும்போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signup.flow.failure": "பதிவு செய்யும் செயல்பாட்டில் பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signup.flow.initialization.failure": "பதிவு செய்யும் செயல்பாட்டை தொடங்கும்போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signup.components.not.available": "பதிவு படிவம் இப்போது கிடைக்கவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signin.components.not.available": "உள்நுழைவு படிவம் இப்போது கிடைக்கவில்லை. பின்னர் மீண்டும் முயற்சிக்கவும்.",
		"errors.signin.timeout": "படிநிலையை முடிக்க அனுமதிக்கப்பட்ட நேரம் காலாவதியானது."
	}
};
var ta_IN_default = ta_IN;

//#endregion
//#region src/i18n/translations/si-LK.ts
const si_LK = {
	metadata: {
		localeCode: "si_LK",
		countryCode: "LK",
		languageCode: "si",
		displayName: "සිංහල (ශ්‍රී ලංකාව)",
		direction: "ltr"
	},
	translations: {
		"elements.buttons.signin.text": "ලොග් වෙන්න",
		"elements.buttons.signout.text": "ඉවත් වෙන්න",
		"elements.buttons.signup.text": "ලියාපදිංචි වෙන්න",
		"elements.buttons.submit.text": "ඉදිරියට යන්න",
		"elements.buttons.facebook.text": "Facebook සමග ඉදිරියට යන්න",
		"elements.buttons.google.text": "Google සමග ඉදිරියට යන්න",
		"elements.buttons.github.text": "GitHub සමග ඉදිරියට යන්න",
		"elements.buttons.microsoft.text": "Microsoft සමග ඉදිරියට යන්න",
		"elements.buttons.linkedin.text": "LinkedIn සමග ඉදිරියට යන්න",
		"elements.buttons.ethereum.text": "Ethereum සමග ඉදිරියට යන්න",
		"elements.buttons.smsotp.text": "SMS සමග ඉදිරියට යන්න",
		"elements.buttons.multi.option.text": "{connection} සමග ඉදිරියට යන්න",
		"elements.buttons.social.text": "{connection} සමග ඉදිරියට යන්න",
		"elements.display.divider.or_separator": "හෝ",
		"elements.display.copyable_text.copy": "පිටපත් කරන්න",
		"elements.display.copyable_text.copied": "පිටපත් කළා!",
		"elements.fields.generic.placeholder": "ඔබේ {field} ඇතුලත් කරන්න",
		"elements.fields.username.label": "පරිශීලක නාමය",
		"elements.fields.username.placeholder": "පරිශීලක නාමය ඇතුලත් කරන්න",
		"elements.fields.password.label": "මුරපදය",
		"elements.fields.password.placeholder": "මුරපදය ඇතුලත් කරන්න",
		"elements.fields.first_name.label": "මුල් නම",
		"elements.fields.first_name.placeholder": "ඔබේ මුල් නම ඇතුලත් කරන්න",
		"elements.fields.last_name.label": "අවසන් නම",
		"elements.fields.last_name.placeholder": "ඔබේ අවසන් නම ඇතුලත් කරන්න",
		"elements.fields.email.label": "ඊමේල්",
		"elements.fields.email.placeholder": "ඔබේ ඊමේල් ලිපිනය ඇතුලත් කරන්න",
		"elements.fields.organization.name.label": "සංවිධානයේ නම",
		"elements.fields.organization.handle.label": "සංවිධාන හැඩුනුම්පත",
		"elements.fields.organization.description.label": "සංවිධානයේ විස්තරය",
		"elements.fields.organization.select.label": "සංවිධානය තෝරන්න",
		"elements.fields.organization.select.placeholder": "සංවිධානයක් සැළුම් කරන්න",
		"validations.required.field.error": "මෙම ක්ෂේත්‍රය අවශ්‍යයි",
		"signin.heading": "ලොග් වෙන්න",
		"signin.subheading": "ඉදිරියට යාමට ඔබේ සත්‍යාපන තොරතුරු ඇතුළත් කරන්න.",
		"signup.heading": "ලියාපදිංචි වන්න",
		"signup.subheading": "ආරම්භ කිරීමට නව ගිණුමක් සාදන්න.",
		"email.otp.heading": "OTP සත්‍යාපනය",
		"email.otp.subheading": "ඔබේ විද්‍යුත් තැපැල් ලිපිනයට යවන ලද කේතය ඇතුළත් කරන්න.",
		"email.otp.buttons.submit.text": "ඉදිරියට යන්න",
		"identifier.first.heading": "ලොග් වෙන්න",
		"identifier.first.subheading": "ඔබේ පරිශීලක නාමය හෝ විද්‍යුත් තැපැල් ලිපිනය ඇතුළත් කරන්න.",
		"identifier.first.buttons.submit.text": "ඉදිරියට යන්න",
		"sms.otp.heading": "OTP සත්‍යාපනය",
		"sms.otp.subheading": "ඔබේ දුරකථන අංකයට යවන ලද කේතය ඇතුළත් කරන්න.",
		"sms.otp.buttons.submit.text": "ඉදිරියට යන්න",
		"totp.heading": "ඔබගේ අනන්‍යතාවය තහවුරු කරන්න",
		"totp.subheading": "ඔබේ authenticator යෙදුමෙන් ලබාගත් කේතය ඇතුළත් කරන්න.",
		"totp.buttons.submit.text": "ඉදිරියට යන්න",
		"username.password.buttons.submit.text": "ඉදිරියට යන්න",
		"username.password.heading": "ලොග් වෙන්න",
		"username.password.subheading": "ඉදිරියට යාමට ඔබේ පරිශීලක නාමය සහ මුරපදය ඇතුළත් කරන්න.",
		"passkey.button.use": "Passkey මගින් ඇතුල් වන්න",
		"passkey.signin.heading": "Passkey මගින් ඇතුල් වන්න",
		"passkey.register.heading": "Passkey ලියාපදිංචි කරන්න",
		"passkey.register.description": "මුරපදයක් නොමැතිව ඔබේ ගිණුමට ආරක්ෂිතව ඇතුල් වීමට passkey එකක් සාදන්න.",
		"user.profile.heading": "පැතිකඩ",
		"user.profile.update.generic.error": "ඔබේ පැතිකඩ යාවත්කාලීන කිරීමේදී දෝෂයක් ඇතිවිය.කරුණාකර නැවත උත්සාහ කරන්න",
		"organization.switcher.switch.organization": "සංවිධානය මාරු කරන්න",
		"organization.switcher.loading.placeholder.organizations": "සංවිධාන ලෝඩ් වෙමින්...",
		"organization.switcher.members": "සාමාජිකයන්",
		"organization.switcher.member": "සාමාජිකයා",
		"organization.switcher.create.organization": "සංවිධානයක් සාදන්න",
		"organization.switcher.manage.organizations": "සංවිධාන කළමනාකරණය කරන්න",
		"organization.switcher.buttons.manage.text": "කළමනාකරණය කරන්න",
		"organization.switcher.organizations.heading": "සංවිධාන",
		"organization.switcher.buttons.switch.text": "මාරු කරන්න",
		"organization.switcher.no.access": "ප්‍රවේශය නැත",
		"organization.switcher.status.label": "තත්ත්වය:",
		"organization.switcher.showing.count": "මුළු සංවිධාන {showing} න් {total} ක් පෙන්වමින්",
		"organization.switcher.buttons.refresh.text": "නැවුම් කරන්න",
		"organization.switcher.buttons.load_more.text": "තවත් සංවිධාන ලෝඩ් කරන්න",
		"organization.switcher.loading.more": "ලෝඩ් වෙමින්...",
		"organization.switcher.no.organizations": "සංවිධාන කිසිවක් හමු නොවීය.",
		"organization.switcher.error.prefix": "දෝෂය:",
		"organization.profile.heading": "සංවිධානයේ පැතිකඩ",
		"organization.profile.loading": "සංවිධානය ලෝඩ් වෙමින්...",
		"organization.profile.error": "සංවිධානය ලෝඩ් කිරීමට අසමත් විය",
		"organization.create.heading": "සංවිධානය සාදන්න",
		"organization.create.buttons.create_organization.text": "සංවිධානය සාදන්න",
		"organization.create.buttons.create_organization.loading.text": "සාදමින්...",
		"organization.create.buttons.cancel.text": "අවලංගු කරන්න",
		"messages.loading.placeholder": "ලෝඩ් වෙමින්...",
		"errors.heading": "දෝෂය",
		"errors.signin.initialization": "ආරම්භ කිරීමේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signin.flow.failure": "ලොග් වීමේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signin.flow.completion.failure": "ලොග් වීමේ ක්‍රියාවලිය සම්පූර්ණ කිරීමේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signin.flow.passkeys.failure": "passkeys සමඟ ලොග් වීමේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signin.flow.passkeys.completion.failure": "passkeys සමඟ ලොග් වීමේ ක්‍රියාවලිය සම්පූර්ණ කිරීමේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signup.initialization": "ආරම්භ කිරීමේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signup.flow.failure": "ගිණුම් තැනීමේ ක්‍රියාවලියේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signup.flow.initialization.failure": "ගිණුම් තැනීමේ ක්‍රියාවලිය ආරම්භ කිරීමේදී දෝෂයක් සිදු විය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signup.components.not.available": "ගිණුම් තැනීමේ පිටුව දැන් ලබා ගත නොහැකිය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signin.components.not.available": "ප්‍රවේශ වීමේ පිටුව දැන් ලබා ගත නොහැකිය. කරුණාකර පසුව නැවත උත්සාහ කරන්න.",
		"errors.signin.timeout": "පියවර සම්පූර්ණ කිරීමට ලබා දී තිබූ කාලය ඉකුත් වී ඇත."
	}
};
var si_LK_default = si_LK;

//#endregion
//#region src/i18n/translations/index.ts
var translations_exports = /* @__PURE__ */ __export({
	en_US: () => en_US_default,
	fr_FR: () => fr_FR_default,
	hi_IN: () => hi_IN_default,
	pt_BR: () => pt_BR_default,
	pt_PT: () => pt_PT_default,
	si_LK: () => si_LK_default,
	ta_IN: () => ta_IN_default,
	te_IN: () => te_IN_default
});

//#endregion
//#region src/i18n/constants/TranslationBundleConstants.ts
/**
* Constants related to internationalization (i18n) translation bundles.
*
* @example
* ```typescript
* // Using default locale
* const locale = TranslationBundleConstants.FALLBACK_LOCALE;
*
* // Using supported locales
* const locales = TranslationBundleConstants.DEFAULT_LOCALES;
* ```
*/
const TranslationBundleConstants = {
	DEFAULT_LOCALES: [en_US_default.metadata.localeCode],
	FALLBACK_LOCALE: en_US_default.metadata.localeCode
};
var TranslationBundleConstants_default = TranslationBundleConstants;

//#endregion
//#region src/i18n/utils/getDefaultI18nBundles.ts
/**
* Get the default i18n bundles.
* Dynamically builds the bundles collection by iterating through supported locales
* and importing their corresponding translation modules.
*
* @returns The collection of all default i18n bundles
*/
const getDefaultI18nBundles = () => {
	const bundles = {};
	TranslationBundleConstants_default.DEFAULT_LOCALES.forEach((localeCode) => {
		const bundle = translations_exports[localeCode.replace("-", "_")];
		if (bundle && bundle.metadata?.localeCode) bundles[bundle.metadata.localeCode] = bundle;
	});
	return bundles;
};
var getDefaultI18nBundles_default = getDefaultI18nBundles;

//#endregion
//#region src/i18n/utils/normalizeTranslations.ts
/**
* Accepts translations in either flat or namespaced format and normalizes them
* to the flat format required by the SDK.
*
* Flat format (already correct):
* ```ts
* { "signin.heading": "Sign In" }
* ```
*
* Namespaced format (auto-converted):
* ```ts
* { signin: { heading: "Sign In" } }
* ```
*
* Both formats can be mixed within the same object — a top-level string value
* is kept as-is, while a top-level object value is flattened one level deep
* using `"namespace.key"` concatenation.
*
* @param translations - Translations in flat or namespaced format.
* @returns Normalized flat translations compatible with `I18nTranslations`.
*/
const normalizeTranslations = (translations) => {
	if (!translations || typeof translations !== "object") return {};
	const result = {};
	Object.entries(translations).forEach(([topKey, value]) => {
		if (typeof value === "string") result[topKey] = value;
		else if (value !== null && typeof value === "object") Object.entries(value).forEach(([subKey, subValue]) => {
			if (typeof subValue === "string") result[`${topKey}.${subKey}`] = subValue;
		});
	});
	return result;
};
var normalizeTranslations_default = normalizeTranslations;

//#endregion
exports.ApplicationNativeAuthenticationConstants = ApplicationNativeAuthenticationConstants_default;
exports.AuthenticationHelper = AuthenticationHelper_default;
exports.DEFAULT_THEME = DEFAULT_THEME;
exports.EMOJI_URI_SCHEME = EMOJI_URI_SCHEME;
exports.EmbeddedFlowActionVariantV2 = EmbeddedFlowActionVariant;
exports.EmbeddedFlowComponentType = EmbeddedFlowComponentType;
exports.EmbeddedFlowComponentTypeV2 = EmbeddedFlowComponentType$1;
exports.EmbeddedFlowEventTypeV2 = EmbeddedFlowEventType;
exports.EmbeddedFlowResponseType = EmbeddedFlowResponseType;
exports.EmbeddedFlowStatus = EmbeddedFlowStatus;
exports.EmbeddedFlowTextVariantV2 = EmbeddedFlowTextVariant;
exports.EmbeddedFlowType = EmbeddedFlowType;
exports.EmbeddedRecoveryFlowStatusV2 = EmbeddedRecoveryFlowStatus;
exports.EmbeddedRecoveryFlowTypeV2 = EmbeddedRecoveryFlowType;
exports.EmbeddedSignInFlowAuthenticatorKnownIdPType = EmbeddedSignInFlowAuthenticatorKnownIdPType;
exports.EmbeddedSignInFlowAuthenticatorParamType = EmbeddedSignInFlowAuthenticatorParamType;
exports.EmbeddedSignInFlowAuthenticatorPromptType = EmbeddedSignInFlowAuthenticatorPromptType;
exports.EmbeddedSignInFlowStatus = EmbeddedSignInFlowStatus;
exports.EmbeddedSignInFlowStatusV2 = EmbeddedSignInFlowStatus$1;
exports.EmbeddedSignInFlowStepType = EmbeddedSignInFlowStepType;
exports.EmbeddedSignInFlowType = EmbeddedSignInFlowType;
exports.EmbeddedSignInFlowTypeV2 = EmbeddedSignInFlowType$1;
exports.EmbeddedSignUpFlowStatusV2 = EmbeddedSignUpFlowStatus;
exports.EmbeddedSignUpFlowTypeV2 = EmbeddedSignUpFlowType;
exports.FieldType = FieldType;
exports.FlowMetaType = FlowMetaType;
exports.FlowMode = FlowMode;
exports.HttpClient = HttpClient;
exports.IsomorphicCrypto = IsomorphicCrypto;
exports.OIDCRequestConstants = OIDCRequestConstants_default;
exports.Platform = Platform;
exports.StorageManager = StorageManager_default;
exports.ThunderIDAPIError = ThunderIDAPIError;
exports.ThunderIDAuthException = ThunderIDAuthException;
exports.ThunderIDError = ThunderIDError;
exports.ThunderIDJavaScriptClient = ThunderIDJavaScriptClient_default;
exports.ThunderIDRuntimeError = ThunderIDRuntimeError;
exports.TokenConstants = TokenConstants_default;
exports.TranslationBundleConstants = TranslationBundleConstants_default;
exports.VendorConstants = VendorConstants_default;
exports.WellKnownSchemaIds = WellKnownSchemaIds;
exports.arrayBufferToBase64url = arrayBufferToBase64url_default;
exports.base64urlToArrayBuffer = base64urlToArrayBuffer_default;
exports.bem = bem_default;
exports.configureLogger = configure;
exports.countryCodeToFlagEmoji = countryCodeToFlagEmoji;
exports.createComponentLogger = createComponentLogger;
exports.createLogger = createLogger;
exports.createOrganization = createOrganization_default;
exports.createPackageComponentLogger = createPackageComponentLogger;
exports.createPackageLogger = createPackageLogger;
exports.createPatchOperations = createPatchOperations;
exports.createTheme = createTheme_default;
exports.debug = debug;
exports.deepMerge = deepMerge_default;
exports.deriveOrganizationHandleFromBaseUrl = deriveOrganizationHandleFromBaseUrl_default;
exports.error = error;
exports.executeEmbeddedRecoveryFlowV2 = executeEmbeddedRecoveryFlowV2_default;
exports.executeEmbeddedSignInFlow = executeEmbeddedSignInFlow_default;
exports.executeEmbeddedSignInFlowV2 = executeEmbeddedSignInFlowV2_default;
exports.executeEmbeddedSignUpFlow = executeEmbeddedSignUpFlow_default;
exports.executeEmbeddedSignUpFlowV2 = executeEmbeddedSignUpFlowV2_default;
exports.executeEmbeddedUserOnboardingFlowV2 = executeEmbeddedUserOnboardingFlowV2_default;
exports.extractEmojiFromUri = extractEmojiFromUri_default;
exports.extractPkceStorageKeyFromState = extractPkceStorageKeyFromState_default;
exports.extractUserClaimsFromIdToken = extractUserClaimsFromIdToken_default;
exports.flattenUserSchema = flattenUserSchema_default;
exports.formatDate = formatDate_default;
exports.generateFlattenedUserProfile = generateFlattenedUserProfile_default;
exports.generateUserProfile = generateUserProfile_default;
exports.get = get_default;
exports.getAllOrganizations = getAllOrganizations_default;
exports.getBrandingPreference = getBrandingPreference_default;
exports.getDefaultI18nBundles = getDefaultI18nBundles_default;
exports.getFlowMetaV2 = getFlowMetaV2_default;
exports.getLatestStateParam = getLatestStateParam_default;
exports.getMeOrganizations = getMeOrganizations_default;
exports.getOrganization = getOrganization_default;
exports.getOrganizationUnitChildren = getOrganizationUnitChildren_default;
exports.getRedirectBasedSignUpUrl = getRedirectBasedSignUpUrl_default;
exports.getSchemas = getSchemas_default;
exports.getScim2Me = getScim2Me_default;
exports.getUserInfo = getUserInfo_default;
exports.identifyPlatform = identifyPlatform_default;
exports.info = info;
exports.initializeEmbeddedSignInFlow = initializeEmbeddedSignInFlow_default;
exports.isEmojiUri = isEmojiUri_default;
exports.isEmpty = isEmpty_default;
exports.isRecognizedBaseUrlPattern = isRecognizedBaseUrlPattern_default;
exports.logger = logger_default;
exports.normalizeTranslations = normalizeTranslations_default;
exports.processOpenIDScopes = processOpenIDScopes_default;
exports.processUsername = processUsername_default;
exports.removeTrailingSlash = removeTrailingSlash_default;
exports.resolveFieldName = resolveFieldName_default;
exports.resolveFieldType = resolveFieldType_default;
exports.resolveFlowTemplateLiterals = resolveFlowTemplateLiterals;
exports.resolveLocaleDisplayName = resolveLocaleDisplayName;
exports.resolveLocaleEmoji = resolveLocaleEmoji_default;
exports.resolveMeta = resolveMeta;
exports.set = set_default;
exports.transformBrandingPreferenceToTheme = transformBrandingPreferenceToTheme_default;
exports.updateMeProfile = updateMeProfile_default;
exports.updateOrganization = updateOrganization_default;
exports.warn = warn;
exports.withVendorCSSClassPrefix = withVendorCSSClassPrefix_default;