import {
  ThunderIDNodeClient,
  getBrandingPreference,
  getMeOrganizations,
  getAllOrganizations,
  createOrganization,
  getOrganization,
  initializeEmbeddedSignInFlow,
  executeEmbeddedSignInFlow,
  executeEmbeddedSignUpFlow
} from "@thunderid/node";
class ThunderIDNuxtClient extends ThunderIDNodeClient {
  static instance;
  isInitialized = false;
  constructor() {
    super();
  }
  static getInstance() {
    if (!ThunderIDNuxtClient.instance) {
      ThunderIDNuxtClient.instance = new ThunderIDNuxtClient();
    }
    return ThunderIDNuxtClient.instance;
  }
  async initialize(config, storage) {
    if (this.isInitialized) {
      return true;
    }
    const authConfig = {
      afterSignInUrl: config.afterSignInUrl,
      afterSignOutUrl: config.afterSignOutUrl || "/",
      baseUrl: config.baseUrl,
      clientId: config.clientId,
      clientSecret: config.clientSecret || void 0,
      enablePKCE: true,
      scopes: config.scopes || ["openid", "profile"],
      tokenRequest: config.tokenRequest
    };
    const result = await super.initialize(authConfig, storage);
    this.isInitialized = true;
    return result;
  }
  async reInitialize(config) {
    await super.reInitialize(config);
    return true;
  }
  async rehydrateSessionFromPayload(session) {
    if (!this.isInitialized || !session?.sessionId || !session?.accessToken) {
      return;
    }
    const storageManager = this.getStorageManager();
    const iatSeconds = typeof session.iat === "number" ? session.iat : Math.floor(Date.now() / 1e3);
    const expiresInSeconds = typeof session.accessTokenExpiresAt === "number" ? Math.max(0, session.accessTokenExpiresAt - iatSeconds) : 3600;
    await storageManager.setSessionData(
      {
        access_token: session.accessToken,
        created_at: iatSeconds * 1e3,
        expires_in: String(expiresInSeconds || 3600),
        id_token: session.idToken ?? "",
        refresh_token: session.refreshToken ?? "",
        scope: session.scopes ?? "",
        session_state: "",
        token_type: "Bearer"
      },
      session.sessionId
    );
  }
  signIn(...args) {
    const arg0 = args[0];
    if (typeof arg0 === "object" && arg0 !== null && "flowId" in arg0) {
      const sessionId = args[2];
      if (arg0.flowId === "") {
        return this.getSignInUrl({ client_secret: "{{clientSecret}}", response_mode: "direct" }, sessionId).then(
          (authorizeUrl) => {
            const url = new URL(authorizeUrl);
            return initializeEmbeddedSignInFlow({
              payload: Object.fromEntries(url.searchParams.entries()),
              url: `${url.origin}${url.pathname}`
            });
          }
        );
      }
      const request = args[1] ?? {};
      return executeEmbeddedSignInFlow({
        payload: arg0,
        url: request.url
      });
    }
    if (typeof arg0 === "object" && arg0 !== null && ("code" in arg0 || "state" in arg0)) {
      const payload = arg0;
      const code = typeof payload.code === "string" ? payload.code : void 0;
      const sessionState = typeof payload.session_state === "string" ? payload.session_state : void 0;
      const state = typeof payload.state === "string" ? payload.state : void 0;
      const extraParams = {};
      if (code) extraParams.code = code;
      if (sessionState) extraParams.session_state = sessionState;
      if (state) extraParams.state = state;
      return super.signIn(args[3], args[2], code, sessionState, state, extraParams);
    }
    return super.signIn(args[0], args[1], args[2], args[3], args[4], args[5]);
  }
  async signUp(payloadOrOptions) {
    if (!payloadOrOptions || !("flowType" in payloadOrOptions)) {
      return void 0;
    }
    const configData = this.getStorageManager().getConfigData();
    const baseUrl = configData?.baseUrl;
    const response = await executeEmbeddedSignUpFlow({
      baseUrl,
      payload: payloadOrOptions
    });
    return response;
  }
  async getAuthorizeRequestUrl(customParams, userId) {
    return this.getSignInUrl(customParams, userId);
  }
  async signOut(...args) {
    const configData = this.getStorageManager().getConfigData();
    return configData?.afterSignOutUrl || configData?.afterSignInUrl || "/";
  }
  getUser(sessionId) {
    return super.getUser(sessionId);
  }
  getAccessToken(sessionId) {
    return super.getAccessToken(sessionId);
  }
  getDecodedIdToken(sessionId, idToken) {
    return super.getDecodedIdToken(sessionId, idToken);
  }
  isSignedIn(sessionId) {
    return super.isSignedIn(sessionId);
  }
  exchangeToken(config, sessionId) {
    return super.exchangeToken(config, sessionId);
  }
  async getUserProfile(sessionId) {
    const user = await this.getUser(sessionId);
    return { flattenedProfile: user, profile: user, schemas: [] };
  }
  async getCurrentOrganization(sessionId) {
    try {
      const idToken = await this.getDecodedIdToken(sessionId);
      if (!idToken?.org_id) {
        return null;
      }
      return {
        id: idToken.org_id,
        name: idToken.org_name ?? "",
        orgHandle: idToken.org_handle ?? ""
      };
    } catch {
      return null;
    }
  }
  async getMyOrganizations(sessionId) {
    const accessToken = await this.getAccessToken(sessionId);
    const configData = this.getStorageManager().getConfigData();
    const baseUrl = configData?.baseUrl ?? "";
    return getMeOrganizations({
      baseUrl,
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  }
  async getBrandingPreference(config) {
    return getBrandingPreference(config);
  }
  async updateUserProfile(config, sessionId) {
    throw new Error("Profile updates are not supported for the ThunderID platform.");
  }
  async getAllOrganizations(options, sessionId) {
    const resolvedSessionId = sessionId ?? "";
    const accessToken = await this.getAccessToken(resolvedSessionId);
    const configData = this.getStorageManager().getConfigData();
    const baseUrl = configData?.baseUrl ?? "";
    return getAllOrganizations({
      baseUrl,
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  }
  async createOrganization(payload, sessionId) {
    const accessToken = await this.getAccessToken(sessionId);
    const configData = this.getStorageManager().getConfigData();
    const baseUrl = configData?.baseUrl ?? "";
    return createOrganization({
      baseUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
      payload
    });
  }
  async getOrganization(organizationId, sessionId) {
    const accessToken = await this.getAccessToken(sessionId);
    const configData = this.getStorageManager().getConfigData();
    const baseUrl = configData?.baseUrl ?? "";
    return getOrganization({
      baseUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
      organizationId
    });
  }
  async switchOrganization(organization, sessionId) {
    if (!organization.id) {
      throw new Error("Organization ID is required for switching organizations.");
    }
    const exchangeConfig = {
      attachToken: false,
      data: {
        client_id: "{{clientId}}",
        client_secret: "{{clientSecret}}",
        grant_type: "organization_switch",
        scope: "{{scopes}}",
        switching_organization: organization.id,
        token: "{{accessToken}}"
      },
      id: "organization-switch",
      returnsSession: true,
      signInRequired: true
    };
    return this.exchangeToken(exchangeConfig, sessionId);
  }
  getStorageManager() {
    return super.getStorageManager();
  }
}
export default ThunderIDNuxtClient;
