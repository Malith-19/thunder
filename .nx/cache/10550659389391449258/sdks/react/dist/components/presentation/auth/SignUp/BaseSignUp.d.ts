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
import { FC } from 'react';
import { BaseSignUpProps as BaseSignUpV1Props } from './v1/BaseSignUp';
import { BaseSignUpProps as BaseSignUpV2Props } from './v2/BaseSignUp';
/**
 * Props for the BaseSignUp component.
 * Extends BaseSignUpV1Props & BaseSignUpV2Props for full compatibility with both React BaseSignUp components.
 */
export type BaseSignUpProps = BaseSignUpV1Props | BaseSignUpV2Props;
declare const BaseSignUp: FC<BaseSignUpProps>;
export default BaseSignUp;
//# sourceMappingURL=BaseSignUp.d.ts.map