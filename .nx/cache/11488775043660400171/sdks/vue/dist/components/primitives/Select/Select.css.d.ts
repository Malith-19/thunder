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
 * Styles for the Select primitive component.
 *
 * BEM block: `.thunderid-select`
 *
 * Modifiers:
 *   --error  – shows validation error state
 *
 * Elements:
 *   __label | __required | __input | __error | __helper
 */
declare const SELECT_CSS = "\n/* ============================================================\n   Select\n   ============================================================ */\n\n.thunderid-select {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--thunder-spacing-unit) * 0.5);\n  font-family: var(--thunder-typography-fontFamily);\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.thunderid-select__label {\n  font-size: var(--thunder-typography-fontSize-sm);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n  color: var(--thunder-color-text-primary);\n  display: block;\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n\n.thunderid-select__required {\n  color: var(--thunder-color-error-main);\n  margin-left: 2px;\n}\n\n.thunderid-select__input {\n  width: 100%;\n  height: var(--thunder-input-height);\n  padding: 0 calc(var(--thunder-spacing-unit) * 4) 0 var(--thunder-input-paddingX);\n  border: 1px solid var(--thunder-input-borderColor);\n  border-radius: var(--thunder-input-borderRadius);\n  font-family: var(--thunder-typography-fontFamily);\n  font-size: var(--thunder-input-fontSize);\n  color: var(--thunder-color-text-primary);\n  background-color: var(--thunder-color-background-surface);\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right var(--thunder-input-paddingX) center;\n  cursor: pointer;\n  box-sizing: border-box;\n  transition:\n    border-color var(--thunder-transition-fast),\n    box-shadow var(--thunder-transition-fast);\n  outline: none;\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n.thunderid-select__input:focus {\n  border-color: var(--thunder-input-focusBorderColor);\n  box-shadow: var(--thunder-input-focusRing);\n}\n.thunderid-select__input:disabled {\n  background-color: var(--thunder-color-background-disabled);\n  color: var(--thunder-color-action-disabled);\n  cursor: not-allowed;\n}\n\n.thunderid-select--error .thunderid-select__input {\n  border-color: var(--thunder-color-error-main);\n}\n.thunderid-select--error .thunderid-select__input:focus {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);\n}\n\n.thunderid-select__error {\n  font-size: var(--thunder-typography-fontSize-xs);\n  color: var(--thunder-color-error-contrastText);\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n\n.thunderid-select__helper {\n  font-size: var(--thunder-typography-fontSize-xs);\n  color: var(--thunder-color-text-secondary);\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n";
export default SELECT_CSS;
//# sourceMappingURL=Select.css.d.ts.map