/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { EmbeddedFlowComponentV2 as EmbeddedFlowComponent, EmbeddedSignInFlowRequestV2, FlowMetadataResponse, Preferences } from '@thunderid/browser';
import { FC, ReactNode } from 'react';
import { BaseSignInProps } from './BaseSignIn';
/**
 * Render props function parameters
 */
export interface SignInRenderProps {
    /**
     * Additional data from the flow response containing contextual information
     * like consent prompt details and session timeouts.
     */
    additionalData?: Record<string, any>;
    /**
     * Current flow components
     */
    components: EmbeddedFlowComponent[];
    /**
     * Current error if any
     */
    error: Error | null;
    /**
     * Function to manually initialize the flow
     */
    initialize: () => Promise<void>;
    /**
     * Whether the flow has been initialized
     */
    isInitialized: boolean;
    /**
     * Loading state indicator
     */
    isLoading: boolean;
    /**
     * Flag indicating whether the flow step timeout has expired.
     * Consuming components can use this to disable submit buttons.
     */
    isTimeoutDisabled?: boolean;
    /**
     * Flow metadata returned by the platform (v2 only). `null` while loading or unavailable.
     */
    meta: FlowMetadataResponse | null;
    /**
     * Function to submit authentication data (primary)
     */
    onSubmit: (payload: EmbeddedSignInFlowRequestV2) => Promise<void>;
}
/**
 * Props for the SignIn component.
 * Matches the interface from the main SignIn component for consistency.
 */
export interface SignInProps {
    /**
     * Render props function for custom UI
     */
    children?: (props: SignInRenderProps) => ReactNode;
    /**
     * Custom CSS class name for the form container.
     */
    className?: string;
    /**
     * Callback function called when authentication fails.
     * @param error - The error that occurred during authentication.
     */
    onError?: (error: Error) => void;
    /**
     * Callback function called when authentication is successful.
     * @param authData - The authentication data returned upon successful completion.
     */
    onSuccess?: (authData: Record<string, any>) => void;
    /**
     * Component-level preferences to override global i18n and theme settings.
     * Preferences are deep-merged with global ones, with component preferences
     * taking precedence. Affects this component and all its descendants.
     */
    preferences?: Preferences;
    /**
     * Size variant for the component.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Theme variant for the component.
     */
    variant?: BaseSignInProps['variant'];
}
/**
 * A component-driven SignIn component that provides authentication flow with pre-built styling.
 * This component handles the flow API calls for authentication and delegates UI logic to BaseSignIn.
 * It automatically transforms simple input-based responses into component-driven UI format.
 *
 * @example
 * // Default UI
 * ```tsx
 * import { SignIn } from '@thunderid/react/component-driven';
 *
 * const App = () => {
 *   return (
 *     <SignIn
 *       onSuccess={(authData) => {
 *         console.log('Authentication successful:', authData);
 *       }}
 *       onError={(error) => {
 *         console.error('Authentication failed:', error);
 *       }}
 *       size="medium"
 *       variant="outlined"
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * // Custom UI with render props
 * ```tsx
 * import { SignIn } from '@thunderid/react/component-driven';
 *
 * const App = () => {
 *   return (
 *     <SignIn
 *       onSuccess={(authData) => console.log('Success:', authData)}
 *       onError={(error) => console.error('Error:', error)}
 *     >
 *       {({signIn, isLoading, components, error, isInitialized}) => (
 *         <div className="custom-signin">
 *           <h1>Custom Sign In</h1>
 *           {!isInitialized ? (
 *             <p>Initializing...</p>
 *           ) : error ? (
 *             <div className="error">{error.message}</div>
 *           ) : (
 *             <form onSubmit={(e) => {
 *               e.preventDefault();
 *               signIn({inputs: {username: 'user', password: 'pass'}});
 *             }}>
 *               <button type="submit" disabled={isLoading}>
 *                 {isLoading ? 'Signing in...' : 'Sign In'}
 *               </button>
 *             </form>
 *           )}
 *         </div>
 *       )}
 *     </SignIn>
 *   );
 * };
 * ```
 */
declare const SignIn: FC<SignInProps>;
export default SignIn;
//# sourceMappingURL=SignIn.d.ts.map