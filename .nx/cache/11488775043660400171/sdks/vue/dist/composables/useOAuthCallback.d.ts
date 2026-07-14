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
    /** Current flowId from component state */
    currentFlowId: Ref<string | null>;
    /** SessionStorage key for flowId (defaults to 'thunderid_flow_id') */
    flowIdStorageKey?: string;
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
    /** Additional handler for setting state (e.g., setFlowId) */
    setFlowId?: (flowId: string) => void;
    /**
     * Mutable flag for token validation tracking.
     * Used in AcceptInvite to coordinate between OAuth callback and token validation.
     */
    tokenValidationAttemptedFlag?: {
        value: boolean;
    };
}
export interface OAuthCallbackPayload {
    flowId: string;
    inputs: {
        code: string;
        nonce?: string;
    };
}
/**
 * Processes OAuth callbacks by detecting auth code in URL, resolving flowId, and submitting to server.
 * Used by SignIn, SignUp, and AcceptInvite components.
 *
 * Vue composable equivalent of React's useOAuthCallback hook.
 */
export declare function useOAuthCallback({ currentFlowId, flowIdStorageKey, isInitialized, isSubmitting, onComplete, onError, onFlowChange, onProcessingStart, onSubmit, processedFlag, setFlowId, tokenValidationAttemptedFlag, }: UseOAuthCallbackOptions): void;
//# sourceMappingURL=useOAuthCallback.d.ts.map