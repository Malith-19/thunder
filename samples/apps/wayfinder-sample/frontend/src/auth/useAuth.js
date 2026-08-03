// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import { useThunderID } from "@thunderid/react";
import { clearChatAccessToken } from "./chatTokenService";

export function useAuth() {
  const thunderIDCtx = useThunderID();

  return {
    isSignedIn: thunderIDCtx.isSignedIn,
    isLoading: thunderIDCtx.isLoading,
    user: thunderIDCtx.user,
    signIn: () => thunderIDCtx.signIn({ acr_values: "urn:thunder:auth:user" }),
    // OIDC RP-initiated logout: the SDK redirects to the end_session_endpoint, which ends the
    // SSO session server-side and returns the browser to afterSignOutUrl. That URL must be
    // registered as a post-logout redirect URI on the application. On success the SDK navigates
    // away, so the fallback below only runs if the logout redirect could not be issued.
    signOut: async () => {
      clearChatAccessToken();
      try {
        await thunderIDCtx.signOut();
      } catch {
        window.location.replace("/flights");
      }
    },
    getAccessToken: thunderIDCtx.getAccessToken,
  };
}
