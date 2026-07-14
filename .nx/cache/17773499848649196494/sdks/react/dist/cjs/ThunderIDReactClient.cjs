const require_rolldown_runtime = require('./_virtual/rolldown_runtime.cjs');
const require_getAllOrganizations = require('./api/getAllOrganizations.cjs');
const require_getMeOrganizations = require('./api/getMeOrganizations.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/ThunderIDReactClient.ts
var ThunderIDReactClient = class extends __thunderid_browser.ThunderIDBrowserClient {
	loadingState = false;
	_initializeConfig;
	constructor(instanceId = 0) {
		super(instanceId);
	}
	setLoading(loading) {
		this.loadingState = loading;
	}
	async withLoading(operation) {
		this.setLoading(true);
		try {
			return await operation();
		} finally {
			this.setLoading(false);
		}
	}
	initialize(config) {
		let resolvedOrganizationHandle = config?.organizationHandle;
		if (!resolvedOrganizationHandle) resolvedOrganizationHandle = (0, __thunderid_browser.deriveOrganizationHandleFromBaseUrl)(config?.baseUrl);
		return this.withLoading(async () => {
			this._initializeConfig = {
				...config,
				organizationHandle: resolvedOrganizationHandle,
				periodicTokenRefresh: config?.tokenLifecycle?.refreshToken?.autoRefresh ?? config?.periodicTokenRefresh
			};
			return super.initialize(this._initializeConfig);
		});
	}
	reInitialize(config) {
		return this.withLoading(async () => {
			let isInitialized;
			try {
				await super.reInitialize(config);
				isInitialized = true;
			} catch (error) {
				throw new __thunderid_browser.ThunderIDRuntimeError(`Failed to check if the client is initialized: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-reInitialize-RuntimeError-001", "react", "An error occurred while checking the initialization status of the client.");
			}
			return isInitialized;
		});
	}
	async updateUserProfile() {
		throw new Error("Not implemented");
	}
	async getUser() {
		return (0, __thunderid_browser.extractUserClaimsFromIdToken)(await this.getDecodedIdToken());
	}
	async getDecodedIdToken(sessionId) {
		return super.getDecodedIdToken(sessionId);
	}
	async getIdToken() {
		return this.withLoading(async () => super.getIdToken());
	}
	async getUserProfile() {
		return this.withLoading(async () => {
			const claims = (0, __thunderid_browser.extractUserClaimsFromIdToken)(await this.getDecodedIdToken());
			return {
				flattenedProfile: claims,
				profile: claims,
				schemas: []
			};
		});
	}
	async getMyOrganizations(options) {
		try {
			let baseUrl = options?.baseUrl;
			if (!baseUrl) baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return await require_getMeOrganizations.default({
				baseUrl,
				instanceId: this.getInstanceId()
			});
		} catch (error) {
			throw new __thunderid_browser.ThunderIDRuntimeError(`Failed to fetch the user's associated organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-getMyOrganizations-RuntimeError-001", "react", "An error occurred while fetching associated organizations of the signed-in user.");
		}
	}
	async getAllOrganizations(options) {
		try {
			let baseUrl = options?.baseUrl;
			if (!baseUrl) baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return await require_getAllOrganizations.default({
				baseUrl,
				instanceId: this.getInstanceId()
			});
		} catch (error) {
			throw new __thunderid_browser.ThunderIDRuntimeError(`Failed to fetch all organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-getAllOrganizations-RuntimeError-001", "react", "An error occurred while fetching all the organizations associated with the user.");
		}
	}
	async getCurrentOrganization() {
		try {
			return await this.withLoading(async () => {
				const idToken = await this.getDecodedIdToken();
				return {
					id: idToken?.org_id ?? "",
					name: idToken?.org_name ?? "",
					orgHandle: idToken?.org_handle ?? ""
				};
			});
		} catch (error) {
			throw new __thunderid_browser.ThunderIDRuntimeError(`Failed to fetch the current organization: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-getCurrentOrganization-RuntimeError-001", "react", "An error occurred while fetching the current organization of the signed-in user.");
		}
	}
	async switchOrganization(organization) {
		return this.withLoading(async () => {
			try {
				const sourceInstanceId = (await this.getStorageManager().getConfigData())?.organizationChain?.sourceInstanceId;
				if (!organization.id) throw new __thunderid_browser.ThunderIDRuntimeError("Organization ID is required for switching organizations", "react-ThunderIDReactClient-SwitchOrganizationError-001", "react", "The organization object must contain a valid ID to perform the organization switch.");
				const exchangeConfig = {
					attachToken: false,
					data: {
						client_id: "{{clientId}}",
						grant_type: "organization_switch",
						scope: "{{scopes}}",
						switching_organization: organization.id,
						token: "{{accessToken}}"
					},
					id: "organization-switch",
					returnsSession: true,
					signInRequired: sourceInstanceId === void 0
				};
				return await super.exchangeToken(exchangeConfig);
			} catch (error) {
				throw new __thunderid_browser.ThunderIDRuntimeError(`Failed to switch organization: ${error.message || error}`, "react-ThunderIDReactClient-SwitchOrganizationError-003", "react", "An error occurred while switching to the specified organization. Please try again.");
			}
		});
	}
	isLoading() {
		return this.loadingState;
	}
	async isSignedIn() {
		return super.isSignedIn();
	}
	async exchangeToken(config) {
		return this.withLoading(async () => super.exchangeToken(config));
	}
	async signIn(...args) {
		return this.withLoading(async () => {
			const arg1 = args[0];
			const arg2 = args[1];
			const config = await this.getStorageManager().getConfigData();
			if (!config || Object.keys(config).length === 0) await this.initialize(this._initializeConfig);
			if (typeof arg1 === "object" && arg1 !== null && arg1.callOnlyOnRedirect === true) return;
			if (typeof arg1 === "object" && arg1 !== null && !(0, __thunderid_browser.isEmpty)(arg1) && ("executionId" in arg1 || "applicationId" in arg1)) {
				const authIdFromUrl = new URL(window.location.href).searchParams.get("authId") ?? "";
				const authIdFromStorage = await this.getStorageManager().getHybridDataParameter("authId") ?? "";
				const response = await (0, __thunderid_browser.executeEmbeddedSignInFlowV2)({
					authId: authIdFromUrl || authIdFromStorage,
					baseUrl: config?.baseUrl ?? "",
					payload: arg1,
					url: arg2?.url
				});
				if (response && typeof response === "object" && response.flowStatus === __thunderid_browser.EmbeddedSignInFlowStatusV2.Complete && response.assertion) {
					const decodedAssertion = await this.decodeJwtToken(response.assertion);
					const createdAt = decodedAssertion.iat ? decodedAssertion.iat * 1e3 : Date.now();
					const expiresIn = decodedAssertion.exp && decodedAssertion.iat ? decodedAssertion.exp - decodedAssertion.iat : 3600;
					await this.setSession({
						access_token: response.assertion,
						created_at: createdAt,
						expires_in: expiresIn,
						id_token: response.assertion,
						scope: decodedAssertion.scope,
						token_type: "Bearer"
					});
					this.notifySignIn((0, __thunderid_browser.extractUserClaimsFromIdToken)(decodedAssertion));
				}
				return response;
			}
			return await super.signIn(...args);
		});
	}
	async signInSilently(options) {
		return super.signInSilently(options);
	}
	async signUp(...args) {
		const config = await this.getStorageManager().getConfigData();
		const firstArg = args[0];
		const baseUrl = config?.baseUrl ?? "";
		const authIdFromUrl = new URL(window.location.href).searchParams.get("authId") ?? "";
		const authIdFromStorage = await this.getStorageManager().getHybridDataParameter("authId") ?? "";
		const authId = authIdFromUrl || authIdFromStorage;
		if (authIdFromUrl && !authIdFromStorage) await this.getStorageManager().setHybridDataParameter("authId", authIdFromUrl);
		const response = await (0, __thunderid_browser.executeEmbeddedSignUpFlowV2)({
			authId,
			baseUrl,
			payload: typeof firstArg === "object" && "flowType" in firstArg ? {
				...firstArg,
				verbose: true
			} : firstArg
		});
		if (response && typeof response === "object" && response.flowStatus === __thunderid_browser.EmbeddedSignUpFlowStatusV2.Complete && response.assertion) {
			const decodedAssertion = await this.decodeJwtToken(response.assertion);
			const createdAt = decodedAssertion.iat ? decodedAssertion.iat * 1e3 : Date.now();
			const expiresIn = decodedAssertion.exp && decodedAssertion.iat ? decodedAssertion.exp - decodedAssertion.iat : 3600;
			await this.setSession({
				access_token: response.assertion,
				created_at: createdAt,
				expires_in: expiresIn,
				id_token: response.assertion,
				scope: decodedAssertion.scope,
				token_type: "Bearer"
			});
			this.notifySignIn((0, __thunderid_browser.extractUserClaimsFromIdToken)(decodedAssertion));
		}
		return response;
	}
	async recover(payload) {
		return (0, __thunderid_browser.executeEmbeddedRecoveryFlowV2)({
			baseUrl: (await this.getStorageManager().getConfigData())?.baseUrl,
			payload: {
				...payload,
				verbose: true
			}
		});
	}
	getStorageManager() {
		return super.getStorageManager();
	}
	async request(requestConfig) {
		return super.httpRequest(requestConfig);
	}
	async requestAll(requestConfigs) {
		return super.httpRequestAll(requestConfigs);
	}
};
var ThunderIDReactClient_default = ThunderIDReactClient;

//#endregion
exports.default = ThunderIDReactClient_default;
//# sourceMappingURL=ThunderIDReactClient.cjs.map