const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/utils/v2/passkey.ts
/**
* Handles WebAuthn/Passkey registration flow for browser environments.
*
* @param challengeData - JSON stringified challenge data containing WebAuthn creation options.
* @returns Promise that resolves to a JSON string containing the WebAuthn registration response.
*/
const handlePasskeyRegistration = async (challengeData) => {
	if (!window.navigator.credentials?.create) throw new __thunderid_browser.ThunderIDRuntimeError("WebAuthn is not supported in this browser.", "browser-webauthn-not-supported", "browser", "WebAuthn/Passkey registration requires a browser that supports the Web Authentication API.");
	try {
		const creationOptions = JSON.parse(challengeData);
		const publicKey = {
			...creationOptions,
			challenge: (0, __thunderid_browser.base64urlToArrayBuffer)(creationOptions.challenge),
			user: {
				...creationOptions.user,
				id: (0, __thunderid_browser.base64urlToArrayBuffer)(creationOptions.user.id)
			},
			...creationOptions.excludeCredentials && { excludeCredentials: creationOptions.excludeCredentials.map((cred) => ({
				...cred,
				id: (0, __thunderid_browser.base64urlToArrayBuffer)(cred.id)
			})) }
		};
		const credential = await navigator.credentials.create({ publicKey });
		if (!credential) throw new __thunderid_browser.ThunderIDRuntimeError("No credential returned from WebAuthn registration.", "browser-webauthn-no-credential", "browser", "The WebAuthn registration ceremony completed but did not return a valid credential.");
		const response = credential.response;
		const registrationResponse = {
			id: credential.id,
			rawId: (0, __thunderid_browser.arrayBufferToBase64url)(credential.rawId),
			response: {
				attestationObject: (0, __thunderid_browser.arrayBufferToBase64url)(response.attestationObject),
				clientDataJSON: (0, __thunderid_browser.arrayBufferToBase64url)(response.clientDataJSON),
				...response.getTransports && { transports: response.getTransports() }
			},
			type: credential.type,
			...credential.authenticatorAttachment && { authenticatorAttachment: credential.authenticatorAttachment }
		};
		return JSON.stringify(registrationResponse);
	} catch (error) {
		if (error instanceof __thunderid_browser.ThunderIDRuntimeError) throw error;
		if (error instanceof Error) throw new __thunderid_browser.ThunderIDRuntimeError(`Passkey registration failed: ${error.message}`, "browser-webauthn-registration-error", "browser", `WebAuthn registration failed with error: ${error.name}`);
		throw new __thunderid_browser.ThunderIDRuntimeError("Passkey registration failed due to an unexpected error.", "browser-webauthn-unexpected-error", "browser", "An unexpected error occurred during WebAuthn registration.");
	}
};
/**
* Handles WebAuthn/Passkey authentication flow for browser environments.
*
* @param challengeData - JSON stringified challenge data containing WebAuthn request options.
* @returns Promise that resolves to a JSON string containing the WebAuthn authentication response.
*/
const handlePasskeyAuthentication = async (challengeData) => {
	if (!window.navigator.credentials?.get) throw new __thunderid_browser.ThunderIDRuntimeError("WebAuthn is not supported in this browser.", "browser-webauthn-not-supported", "browser", "WebAuthn/Passkey authentication requires a browser that supports the Web Authentication API.");
	try {
		const requestOptions = JSON.parse(challengeData);
		const publicKey = {
			...requestOptions,
			challenge: (0, __thunderid_browser.base64urlToArrayBuffer)(requestOptions.challenge),
			...requestOptions.allowCredentials && { allowCredentials: requestOptions.allowCredentials.map((cred) => ({
				...cred,
				id: (0, __thunderid_browser.base64urlToArrayBuffer)(cred.id)
			})) }
		};
		const credential = await navigator.credentials.get({ publicKey });
		if (!credential) throw new __thunderid_browser.ThunderIDRuntimeError("No credential returned from WebAuthn authentication.", "browser-webauthn-no-credential", "browser", "The WebAuthn authentication ceremony completed but did not return a valid credential.");
		const response = credential.response;
		const authenticationResponse = {
			id: credential.id,
			rawId: (0, __thunderid_browser.arrayBufferToBase64url)(credential.rawId),
			response: {
				authenticatorData: (0, __thunderid_browser.arrayBufferToBase64url)(response.authenticatorData),
				clientDataJSON: (0, __thunderid_browser.arrayBufferToBase64url)(response.clientDataJSON),
				signature: (0, __thunderid_browser.arrayBufferToBase64url)(response.signature),
				...response.userHandle && { userHandle: (0, __thunderid_browser.arrayBufferToBase64url)(response.userHandle) }
			},
			type: credential.type,
			...credential.authenticatorAttachment && { authenticatorAttachment: credential.authenticatorAttachment }
		};
		return JSON.stringify(authenticationResponse);
	} catch (error) {
		if (error instanceof __thunderid_browser.ThunderIDRuntimeError) throw error;
		if (error instanceof Error) throw new __thunderid_browser.ThunderIDRuntimeError(`Passkey authentication failed: ${error.message}`, "browser-webauthn-authentication-error", "browser", `WebAuthn authentication failed with error: ${error.name}`);
		throw new __thunderid_browser.ThunderIDRuntimeError("Passkey authentication failed due to an unexpected error.", "browser-webauthn-unexpected-error", "browser", "An unexpected error occurred during WebAuthn authentication.");
	}
};

//#endregion
exports.handlePasskeyAuthentication = handlePasskeyAuthentication;
exports.handlePasskeyRegistration = handlePasskeyRegistration;
//# sourceMappingURL=passkey.cjs.map