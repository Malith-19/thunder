export var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["ConfigMissingBaseUrl"] = "config/missing-base-url";
  ErrorCode2["ConfigMissingClientId"] = "config/missing-client-id";
  ErrorCode2["ConfigMissingSecret"] = "config/missing-session-secret";
  ErrorCode2["OAuthCallbackError"] = "oauth/callback-error";
  ErrorCode2["OAuthStateInvalid"] = "oauth/state-invalid";
  ErrorCode2["OpenRedirectBlocked"] = "security/open-redirect-blocked";
  ErrorCode2["OrganizationCreateFailed"] = "organization/create-failed";
  ErrorCode2["OrganizationSwitchFailed"] = "organization/switch-failed";
  ErrorCode2["SessionExpired"] = "session/expired";
  ErrorCode2["SessionInvalid"] = "session/invalid";
  ErrorCode2["SessionMissing"] = "session/missing";
  ErrorCode2["TempSessionInvalid"] = "session/temp-invalid";
  ErrorCode2["TokenExchangeFailed"] = "oauth/token-exchange-failed";
  ErrorCode2["TokenRefreshFailed"] = "oauth/token-refresh-failed";
  ErrorCode2["UserProfileFetchFailed"] = "scim2/user-profile-fetch-failed";
  ErrorCode2["UserProfileUpdateFailed"] = "scim2/user-profile-update-failed";
  return ErrorCode2;
})(ErrorCode || {});
