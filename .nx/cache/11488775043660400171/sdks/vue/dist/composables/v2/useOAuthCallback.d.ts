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
import { type Ref } from 'vue';
export interface UseOAuthCallbackOptions {
    /** Current executionId from component state */
    currentExecutionId: Ref<string | null>;
    /** SessionStorage key for executionId (defaults to 'thunderid_execution_id') */
    executionIdStorageKey?: string;
    /** Whether the component is initialized and ready to process OAuth callback */
    isInitialized: Ref<boolean>;
    /** Whether a submission is currently in progress */
    isSubmitting?: Ref<boolean>;
    /** Callback when OAuth flow completes successfully */
    onComplete?: () => void;
    /** Callback when OAuth flow encounters an error */
    onError?: (error: any) => void;
    /** Callback to handle flow response after submission */
    onFlowChange?: (response: any) => void;
    /** Callback to set loading state at the start of OAuth processing */
    onProcessingStart?: () => void;
    /** Function to submit OAuth code to the server */
    onSubmit: (payload: OAuthCallbackPayload) => Promise<any>;
    /** Mutable flag to track whether OAuth has already been processed */
    processedFlag?: {
        value: boolean;
    };
    /** Additional handler for setting state (e.g., setExecutionId) */
    setExecutionId?: (executionId: string) => void;
    /**
     * Mutable flag for token validation tracking.
     * Used in AcceptInvite to coordinate between OAuth callback and token validation.
     */
    tokenValidationAttemptedFlag?: {
        value: boolean;
    };
}
export interface OAuthCallbackPayload {
    /** The execution ID of the active flow step */
    executionId: string;
    /** OAuth callback inputs extracted from the redirect URL */
    inputs: {
        /** The authorization code returned by the OAuth provider */
        code: string;
        /** Optional nonce for OIDC replay protection */
        nonce?: string;
    };
}
/**
 * Processes OAuth callbacks by detecting auth code in URL, resolving executionId, and submitting to server.
 * Used by SignIn, SignUp, and AcceptInvite components.
 *
 * Vue composable equivalent of React's useOAuthCallback hook.
 */
export declare function useOAuthCallback({ currentExecutionId, executionIdStorageKey, isInitialized, isSubmitting, onComplete, onError, onFlowChange, onProcessingStart, onSubmit, processedFlag, setExecutionId, tokenValidationAttemptedFlag, }: UseOAuthCallbackOptions): void;
//# sourceMappingURL=useOAuthCallback.d.ts.map