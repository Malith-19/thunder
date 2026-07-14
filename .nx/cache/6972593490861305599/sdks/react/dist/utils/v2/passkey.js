import { ThunderIDRuntimeError, arrayBufferToBase64url, base64urlToArrayBuffer } from "@thunderid/browser";

//#region src/utils/v2/passkey.ts
/**
* Handles WebAuthn/Passkey registration flow for browser environments.
*
* @param challengeData - JSON stringified challenge data containing WebAuthn creation options.
* @returns Promise that resolves to a JSON string containing the WebAuthn registration response.
*/
const handlePasskeyRegistration = async (challengeData) => {
	if (!window.navigator.credentials?.create) throw new ThunderIDRuntimeError("WebAuthn is not supported in this browser.", "browser-webauthn-not-supported", "browser", "WebAuthn/Passkey registration requires a browser that supports the Web Authentication API.");
	try {
		const creationOptions = JSON.parse(challengeData);
		const publicKey = {
			...creationOptions,
			challenge: base64urlToArrayBuffer(creationOptions.challenge),
			user: {
				...creationOptions.user,
				id: base64urlToArrayBuffer(creationOptions.user.id)
			},
			...creationOptions.excludeCredentials && { excludeCredentials: creationOptions.excludeCredentials.map((cred) => ({
				...cred,
				id: base64urlToArrayBuffer(cred.id)
			})) }
		};
		const credential = await navigator.credentials.create({ publicKey });
		if (!credential) throw new ThunderIDRuntimeError("No credential returned from WebAuthn registration.", "browser-webauthn-no-credential", "browser", "The WebAuthn registration ceremony completed but did not return a valid credential.");
		const response = credential.response;
		const registrationResponse = {
			id: credential.id,
			rawId: arrayBufferToBase64url(credential.rawId),
			response: {
				attestationObject: arrayBufferToBase64url(response.attestationObject),
				clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
				...response.getTransports && { transports: response.getTransports() }
			},
			type: credential.type,
			...credential.authenticatorAttachment && { authenticatorAttachment: credential.authenticatorAttachment }
		};
		return JSON.stringify(registrationResponse);
	} catch (error) {
		if (error instanceof ThunderIDRuntimeError) throw error;
		if (error instanceof Error) throw new ThunderIDRuntimeError(`Passkey registration failed: ${error.message}`, "browser-webauthn-registration-error", "browser", `WebAuthn registration failed with error: ${error.name}`);
		throw new ThunderIDRuntimeError("Passkey registration failed due to an unexpected error.", "browser-webauthn-unexpected-error", "browser", "An unexpected error occurred during WebAuthn registration.");
	}
};
/**
* Handles WebAuthn/Passkey authentication flow for browser environments.
*
* @param challengeData - JSON stringified challenge data containing WebAuthn request options.
* @returns Promise that resolves to a JSON string containing the WebAuthn authentication response.
*/
const handlePasskeyAuthentication = async (challengeData) => {
	if (!window.navigator.credentials?.get) throw new ThunderIDRuntimeError("WebAuthn is not supported in this browser.", "browser-webauthn-not-supported", "browser", "WebAuthn/Passkey authentication requires a browser that supports the Web Authentication API.");
	try {
		const requestOptions = JSON.parse(challengeData);
		const publicKey = {
			...requestOptions,
			challenge: base64urlToArrayBuffer(requestOptions.challenge),
			...requestOptions.allowCredentials && { allowCredentials: requestOptions.allowCredentials.map((cred) => ({
				...cred,
				id: base64urlToArrayBuffer(cred.id)
			})) }
		};
		const credential = await navigator.credentials.get({ publicKey });
		if (!credential) throw new ThunderIDRuntimeError("No credential returned from WebAuthn authentication.", "browser-webauthn-no-credential", "browser", "The WebAuthn authentication ceremony completed but did not return a valid credential.");
		const response = credential.response;
		const authenticationResponse = {
			id: credential.id,
			rawId: arrayBufferToBase64url(credential.rawId),
			response: {
				authenticatorData: arrayBufferToBase64url(response.authenticatorData),
				clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
				signature: arrayBufferToBase64url(response.signature),
				...response.userHandle && { userHandle: arrayBufferToBase64url(response.userHandle) }
			},
			type: credential.type,
			...credential.authenticatorAttachment && { authenticatorAttachment: credential.authenticatorAttachment }
		};
		return JSON.stringify(authenticationResponse);
	} catch (error) {
		if (error instanceof ThunderIDRuntimeError) throw error;
		if (error instanceof Error) throw new ThunderIDRuntimeError(`Passkey authentication failed: ${error.message}`, "browser-webauthn-authentication-error", "browser", `WebAuthn authentication failed with error: ${error.name}`);
		throw new ThunderIDRuntimeError("Passkey authentication failed due to an unexpected error.", "browser-webauthn-unexpected-error", "browser", "An unexpected error occurred during WebAuthn authentication.");
	}
};

//#endregion
export { handlePasskeyAuthentication, handlePasskeyRegistration };
//# sourceMappingURL=passkey.js.map