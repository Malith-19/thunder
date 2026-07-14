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
import { FC, PropsWithChildren } from 'react';
import { BaseRecoveryProps } from './BaseRecovery';
export type RecoveryProps = PropsWithChildren<BaseRecoveryProps & {
    /**
     * URL query parameter name that carries the recovery token when the user lands via a recovery link.
     * When set and both `executionId` and this param are present in the URL, the component resumes the
     * existing flow instead of starting a new one.
     *
     * @example
     * // For a link like /recovery?executionId=xxx&recoveryToken=yyy
     * <Recovery tokenUrlParam="recoveryToken" />
     */
    tokenUrlParam?: string;
}>;
/**
 * Recovery component for ThunderIDV2 that provides an embedded account/password recovery flow.
 *
 * @example
 * ```tsx
 * // Default UI
 * <Recovery
 *   afterRecoveryUrl="/sign-in"
 *   onComplete={(response) => console.log('Recovery complete', response)}
 *   onError={(error) => console.error('Recovery failed', error)}
 * />
 *
 * // Custom UI with render props
 * <Recovery>
 *   {({ values, fieldErrors, handleInputChange, handleSubmit, isLoading, components }) => (
 *     <form onSubmit={(e) => { e.preventDefault(); handleSubmit(components[0], values); }}>
 *       ...
 *     </form>
 *   )}
 * </Recovery>
 * ```
 */
declare const Recovery: FC<RecoveryProps>;
export default Recovery;
//# sourceMappingURL=Recovery.d.ts.map