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
import { type RefObject } from 'react';
export interface UseOAuthCallbackOptions {
    /**
     * Current executionId from component state
     */
    currentExecutionId: string | null;
    /**
     * SessionStorage key for executionId (defaults to 'thunderid_execution_id')
     */
    executionIdStorageKey?: string;
    /**
     * Whether the component is initialized and ready to process OAuth callback
     */
    isInitialized: boolean;
    /**
     * Whether a submission is currently in progress
     */
    isSubmitting?: boolean;
    /**
     * Callback when OAuth flow completes successfully
     */
    onComplete?: () => void;
    /**
     * Callback when OAuth flow encounters an error
     */
    onError?: (error: any) => void;
    /**
     * Function to handle flow response after submission
     */
    onFlowChange?: (response: any) => void;
    /**
     * Callback to set loading state at the start of OAuth processing
     */
    onProcessingStart?: () => void;
    /**
     * Function to submit OAuth code to the server
     */
    onSubmit: (payload: OAuthCallbackPayload) => Promise<any>;
    /**
     * Optional external ref to track processed state. If provided, the component
     * manages the ref (allowing resets on flow clear/retry). Otherwise hook manages internally.
     */
    processedRef?: RefObject<boolean>;
    /**
     * Additional handler for setting state (e.g., setExecutionId)
     */
    setExecutionId?: (executionId: string) => void;
    /**
     * Ref to mark that token validation was attempted (prevents duplicate validation)
     * Used in AcceptInvite to coordinate between OAuth callback and token validation
     */
    tokenValidationAttemptedRef?: RefObject<boolean>;
}
export interface OAuthCallbackPayload {
    executionId: string;
    inputs: {
        code: string;
        nonce?: string;
    };
}
/**
 * Processes OAuth callbacks by detecting auth code in URL, resolving executionId, and submitting to server.
 * Used by SignIn, SignUp, and AcceptInvite components.
 */
export declare function useOAuthCallback({ currentExecutionId, executionIdStorageKey, isInitialized, isSubmitting, onComplete, onError, onFlowChange, onProcessingStart, onSubmit, processedRef, setExecutionId: setExecExecutionId, tokenValidationAttemptedRef, }: UseOAuthCallbackOptions): void;
//# sourceMappingURL=useOAuthCallback.d.ts.map