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
import { FieldType } from '@thunderid/browser';
import { type Component, type VNode } from 'vue';
import { type SelectOption } from '../primitives/Select/Select';
/**
 * Interface for field configuration.
 */
export interface FieldConfig {
    className?: string;
    disabled?: boolean;
    error?: string;
    label: string;
    name: string;
    onBlur?: () => void;
    onChange: (value: string) => void;
    options?: SelectOption[];
    placeholder?: string;
    required: boolean;
    touched?: boolean;
    type: FieldType;
    value: string;
}
/**
 * Utility function to validate field values based on type.
 */
export declare const validateFieldValue: (value: string, type: FieldType, required?: boolean, touched?: boolean) => string | null;
/**
 * Factory function to create form field VNodes based on FieldType.
 */
export declare const createField: (config: FieldConfig) => VNode;
/**
 * FieldFactory — Vue component wrapper for the field factory.
 */
declare const FieldFactory: Component;
export default FieldFactory;
//# sourceMappingURL=FieldFactory.d.ts.map