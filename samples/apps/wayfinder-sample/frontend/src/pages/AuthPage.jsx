/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Navigate } from "react-router-dom";
import { AUTH_CONFIG } from "../auth/config";
import { NativeAuthPage } from "./NativeAuthPage";

export function AuthPage() {
  if (AUTH_CONFIG.isRedirectBased) return <Navigate to="/" replace />;
  // Verbose (SDK-driven) native mode is not currently supported: the @thunderid/react
  // SignIn/SignUp components drive /flow/execute internally and cannot attach the
  // Flow Secret header that app-native flow initiation now requires. Fall back to
  // standard mode so sign-in keeps working.
  if (AUTH_CONFIG.isVerbose) {
    console.warn(
      "[wayfinder] Verbose native mode is not supported (the SDK cannot send the " +
        "Flow Secret header). Falling back to standard app-native mode."
    );
  }
  return <NativeAuthPage />;
}
