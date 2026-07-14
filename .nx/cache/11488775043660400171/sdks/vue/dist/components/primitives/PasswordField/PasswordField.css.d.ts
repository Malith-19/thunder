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
 * Styles for the PasswordField primitive component.
 *
 * BEM block: `.thunderid-password-field`
 *
 * Modifiers:
 *   --error  – shows validation error state
 *
 * Elements:
 *   __label | __required | __wrapper | __input | __toggle | __error
 */
declare const PASSWORD_FIELD_CSS = "\n/* ============================================================\n   PasswordField\n   ============================================================ */\n\n.thunderid-password-field {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--thunder-spacing-unit) * 0.5);\n  font-family: var(--thunder-typography-fontFamily);\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.thunderid-password-field__label {\n  font-size: var(--thunder-typography-fontSize-sm);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n  color: var(--thunder-color-text-primary);\n  display: block;\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n\n.thunderid-password-field__required {\n  color: var(--thunder-color-error-main);\n  margin-left: 2px;\n}\n\n.thunderid-password-field__wrapper {\n  display: flex;\n  align-items: center;\n  height: var(--thunder-input-height);\n  border: 1px solid var(--thunder-input-borderColor);\n  border-radius: var(--thunder-input-borderRadius);\n  background-color: var(--thunder-color-background-surface);\n  transition:\n    border-color var(--thunder-transition-fast),\n    box-shadow var(--thunder-transition-fast);\n  overflow: hidden;\n  box-sizing: border-box;\n}\n.thunderid-password-field__wrapper:focus-within {\n  border-color: var(--thunder-input-focusBorderColor);\n  box-shadow: var(--thunder-input-focusRing);\n}\n.thunderid-password-field--error .thunderid-password-field__wrapper {\n  border-color: var(--thunder-color-error-main);\n}\n.thunderid-password-field--error .thunderid-password-field__wrapper:focus-within {\n  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);\n}\n\n.thunderid-password-field__input {\n  flex: 1;\n  padding: 0 var(--thunder-input-paddingX);\n  border: none;\n  outline: none;\n  font-family: var(--thunder-typography-fontFamily);\n  font-size: var(--thunder-input-fontSize);\n  color: var(--thunder-color-text-primary);\n  background: transparent;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  min-width: 0;\n}\n.thunderid-password-field__input::placeholder {\n  color: var(--thunder-color-text-secondary);\n}\n.thunderid-password-field__input:disabled {\n  cursor: not-allowed;\n}\n\n.thunderid-password-field__toggle {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0 var(--thunder-input-paddingX);\n  color: var(--thunder-color-text-secondary);\n  font-size: var(--thunder-typography-fontSize-md);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  height: 100%;\n  transition: color var(--thunder-transition-fast);\n}\n.thunderid-password-field__toggle:hover {\n  color: var(--thunder-color-text-primary);\n}\n\n.thunderid-password-field__error {\n  font-size: var(--thunder-typography-fontSize-xs);\n  color: var(--thunder-color-error-contrastText);\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n";
export default PASSWORD_FIELD_CSS;
//# sourceMappingURL=PasswordField.css.d.ts.map