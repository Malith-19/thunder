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
import type { SchemaPropertyInput } from '../../types/user-types';
/**
 * Props for the {@link ConfigureProperties} component.
 *
 * @public
 */
export interface ConfigurePropertiesProps {
    properties: SchemaPropertyInput[];
    onPropertiesChange: (properties: SchemaPropertyInput[]) => void;
    enumInput: Record<string, string>;
    onEnumInputChange: (enumInput: Record<string, string>) => void;
    displayAttribute: string;
    onDisplayAttributeChange: (displayAttribute: string) => void;
    onReadyChange?: (isReady: boolean) => void;
    userTypeName?: string;
}
/**
 * Step 3 of the user type creation wizard: configure schema properties.
 *
 * @public
 */
export default function ConfigureProperties({ properties, onPropertiesChange, enumInput, onEnumInputChange, displayAttribute, onDisplayAttributeChange, onReadyChange, userTypeName, }: ConfigurePropertiesProps): JSX.Element;
