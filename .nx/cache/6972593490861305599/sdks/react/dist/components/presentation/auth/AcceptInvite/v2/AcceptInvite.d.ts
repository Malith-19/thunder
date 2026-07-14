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
import { FC, ReactNode } from 'react';
import { BaseAcceptInviteRenderProps, AcceptInviteFlowResponse } from './BaseAcceptInvite';
/**
 * Render props for AcceptInvite (re-exported for convenience).
 */
export type AcceptInviteRenderProps = BaseAcceptInviteRenderProps;
/**
 * Props for the AcceptInvite component.
 */
export interface AcceptInviteProps {
    /**
     * Base URL for the Thunder API server.
     * If not provided, will try to read from window location.
     */
    baseUrl?: string;
    /**
     * Render props function for custom UI.
     * If not provided, default UI will be rendered by the SDK.
     */
    children?: (props: AcceptInviteRenderProps) => ReactNode;
    /**
     * Custom CSS class name.
     */
    className?: string;
    /**
     * Flow ID from the invite link.
     * If not provided, will be extracted from URL query parameters.
     */
    executionId?: string;
    /**
     * Invite token from the invite link.
     * If not provided, will be extracted from URL query parameters.
     */
    inviteToken?: string;
    /**
     * Callback when the flow completes successfully.
     */
    onComplete?: () => void;
    /**
     * Callback when an error occurs.
     */
    onError?: (error: Error) => void;
    /**
     * Callback when the flow state changes.
     */
    onFlowChange?: (response: AcceptInviteFlowResponse) => void;
    /**
     * Callback to navigate to sign in page.
     */
    onGoToSignIn?: () => void;
    /**
     * Whether to show the subtitle.
     */
    showSubtitle?: boolean;
    /**
     * Whether to show the title.
     */
    showTitle?: boolean;
    /**
     * Size variant for the component.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Theme variant for the component card.
     */
    variant?: 'outlined' | 'elevated';
}
/**
 * AcceptInvite component for end-users to accept an invite and set their password.
 *
 * This component is designed for end users accessing the thunder-gate app via an invite link.
 * It automatically:
 * 1. Extracts executionId and inviteToken from URL query parameters
 * 2. Validates the invite token with the backend
 * 3. Displays the password form if token is valid
 * 4. Completes the accept invite when password is set
 *
 * @example
 * ```tsx
 * import { AcceptInvite } from '@thunderid/react';
 *
 * // URL: /invite?executionId=xxx&inviteToken=yyy
 *
 * const AcceptInvitePage = () => {
 *   return (
 *     <AcceptInvite
 *       baseUrl="https://api.thunder.io"
 *       onComplete={() => navigate('/signin')}
 *       onError={(error) => console.error(error)}
 *     >
 *       {({ values, components, isLoading, isComplete, isValidatingToken, isTokenInvalid, error, handleInputChange, handleSubmit }) => (
 *         <div>
 *           {isValidatingToken && <p>Validating your invite...</p>}
 *           {isTokenInvalid && <p>Invalid or expired invite link</p>}
 *           {isComplete && <p>Registration complete! You can now sign in.</p>}
 *           {!isComplete && !isValidatingToken && !isTokenInvalid && (
 *             // Render password form based on components
 *           )}
 *         </div>
 *       )}
 *     </AcceptInvite>
 *   );
 * };
 * ```
 */
declare const AcceptInvite: FC<AcceptInviteProps>;
export default AcceptInvite;
//# sourceMappingURL=AcceptInvite.d.ts.map