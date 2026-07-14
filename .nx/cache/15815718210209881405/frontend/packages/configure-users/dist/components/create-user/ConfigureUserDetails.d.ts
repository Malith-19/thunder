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
import type { JSX } from 'react';
import type { ApiUserType } from '../../models/users';
/**
 * Props for the {@link ConfigureUserDetails} component.
 *
 * @public
 */
export interface ConfigureUserDetailsProps {
    schema: ApiUserType;
    defaultValues: Record<string, unknown>;
    onFormValuesChange: (values: Record<string, unknown>) => void;
    onReadyChange?: (isReady: boolean) => void;
}
/**
 * Step 2 of the user creation wizard: fill in the dynamic form fields.
 *
 * @public
 */
export default function ConfigureUserDetails({ schema, defaultValues, onFormValuesChange, onReadyChange, }: ConfigureUserDetailsProps): JSX.Element;
