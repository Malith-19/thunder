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
import { BaseInviteUserRenderProps, InviteUserFlowResponse } from './BaseInviteUser';
/**
 * Render props for InviteUser (re-exported for convenience).
 */
export type InviteUserRenderProps = BaseInviteUserRenderProps;
/**
 * Props for the InviteUser component.
 */
export interface InviteUserProps {
    /**
     * Render props function for custom UI.
     * If not provided, default UI will be rendered by the SDK.
     */
    children?: (props: InviteUserRenderProps) => ReactNode;
    /**
     * Custom CSS class name.
     */
    className?: string;
    /**
     * Callback when an error occurs.
     */
    onError?: (error: Error) => void;
    /**
     * Callback when the flow state changes.
     */
    onFlowChange?: (response: InviteUserFlowResponse) => void;
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
 * InviteUser component for initiating invite user flow.
 *
 * This component is designed for admin users in the thunder-develop app to:
 * 1. Select a user type (if multiple available)
 * 2. Enter user details (username, email)
 * 3. Generate an invite link for the end user
 *
 * The component uses the authenticated ThunderID SDK context to make API calls
 * with the admin's access token (requires 'system' scope).
 *
 * @example
 * ```tsx
 * import { InviteUser } from '@thunderid/react';
 *
 * const InviteUserPage = () => {
 *   const [inviteLink, setInviteLink] = useState<string>();
 *
 *   return (
 *     <InviteUser
 *       onInviteLinkGenerated={(link, executionId) => setInviteLink(link)}
 *       onError={(error) => console.error(error)}
 *     >
 *       {({ values, components, isLoading, handleInputChange, handleSubmit, inviteLink, isInviteGenerated }) => (
 *         <div>
 *           {isInviteGenerated ? (
 *             <div>
 *               <h2>Invite Link Generated!</h2>
 *               <p>{inviteLink}</p>
 *             </div>
 *           ) : (
 *             // Render form based on components
 *           )}
 *         </div>
 *       )}
 *     </InviteUser>
 *   );
 * };
 * ```
 */
declare const InviteUser: FC<InviteUserProps>;
export default InviteUser;
//# sourceMappingURL=InviteUser.d.ts.map