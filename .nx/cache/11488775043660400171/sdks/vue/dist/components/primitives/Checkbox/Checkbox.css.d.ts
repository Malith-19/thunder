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
/**
 * Styles for the Checkbox primitive component.
 *
 * BEM block: `.thunderid-checkbox`
 *
 * Modifiers:
 *   --error  – shows validation error state
 *
 * Elements:
 *   __wrapper | __input | __label | __error
 */
declare const CHECKBOX_CSS = "\n/* ============================================================\n   Checkbox\n   ============================================================ */\n\n.thunderid-checkbox {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--thunder-spacing-unit) * 0.5);\n  font-family: var(--thunder-typography-fontFamily);\n}\n\n.thunderid-checkbox__wrapper {\n  display: inline-flex;\n  align-items: center;\n  gap: calc(var(--thunder-spacing-unit) * 0.75);\n  cursor: pointer;\n  user-select: none;\n}\n\n.thunderid-checkbox__input {\n  width: var(--thunder-checkbox-size);\n  height: var(--thunder-checkbox-size);\n  cursor: pointer;\n  accent-color: var(--thunder-color-primary-main);\n  flex-shrink: 0;\n  border-radius: var(--thunder-border-radius-xs);\n}\n.thunderid-checkbox__input:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);\n}\n.thunderid-checkbox__input:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n.thunderid-checkbox__label {\n  font-size: var(--thunder-typography-fontSize-md);\n  color: var(--thunder-color-text-primary);\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n\n.thunderid-checkbox__error {\n  font-size: var(--thunder-typography-fontSize-xs);\n  color: var(--thunder-color-error-contrastText);\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n";
export default CHECKBOX_CSS;
//# sourceMappingURL=Checkbox.css.d.ts.map