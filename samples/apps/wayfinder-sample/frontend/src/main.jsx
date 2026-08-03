// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThunderIDProvider } from "@thunderid/react";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./styles.css";
import { SCOPES } from "./auth/config.js";

const clientId = import.meta.env.VITE_THUNDER_CLIENT_ID;
const appId = import.meta.env.VITE_THUNDER_APP_ID || clientId;
const baseUrl = import.meta.env.VITE_THUNDER_BASE_URL;
const thunderidReady = Boolean(clientId && baseUrl);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {thunderidReady ? (
        <ThunderIDProvider
          clientId={clientId}
          applicationId={appId}
          baseUrl={baseUrl}
          afterSignInUrl={window.location.origin}
          afterSignOutUrl={window.location.origin}
          scopes={SCOPES}
          discovery={{ wellKnown: { enabled: true } }}
        >
          <App authReady />
        </ThunderIDProvider>
      ) : (
        <App authReady={false} />
      )}
    </BrowserRouter>
  </StrictMode>
);
