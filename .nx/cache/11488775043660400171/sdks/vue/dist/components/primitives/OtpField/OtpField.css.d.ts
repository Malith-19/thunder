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
 * Styles for the OtpField primitive component.
 *
 * BEM block: `.thunderid-otp-field`
 *
 * Elements:
 *   __label | __required | __inputs | __digit | __error
 */
declare const OTP_FIELD_CSS = "\n/* ============================================================\n   OtpField\n   ============================================================ */\n\n.thunderid-otp-field {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--thunder-spacing-unit) * 0.75);\n  font-family: var(--thunder-typography-fontFamily);\n}\n\n.thunderid-otp-field__label {\n  font-size: var(--thunder-typography-fontSize-sm);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n  color: var(--thunder-color-text-primary);\n  display: block;\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n\n.thunderid-otp-field__required {\n  color: var(--thunder-color-error-main);\n  margin-left: 2px;\n}\n\n.thunderid-otp-field__inputs {\n  display: flex;\n  gap: calc(var(--thunder-spacing-unit) * 0.75);\n}\n\n.thunderid-otp-field__digit {\n  width: var(--thunder-input-height);\n  height: var(--thunder-input-height);\n  text-align: center;\n  border: 1px solid var(--thunder-input-borderColor);\n  border-radius: var(--thunder-input-borderRadius);\n  font-family: var(--thunder-typography-fontFamily);\n  font-size: var(--thunder-typography-fontSize-lg);\n  font-weight: var(--thunder-typography-fontWeight-semibold);\n  color: var(--thunder-color-text-primary);\n  background-color: var(--thunder-color-background-surface);\n  box-sizing: border-box;\n  outline: none;\n  transition:\n    border-color var(--thunder-transition-fast),\n    box-shadow var(--thunder-transition-fast);\n}\n.thunderid-otp-field__digit:focus {\n  border-color: var(--thunder-input-focusBorderColor);\n  box-shadow: var(--thunder-input-focusRing);\n}\n.thunderid-otp-field__digit:disabled {\n  background-color: var(--thunder-color-background-disabled);\n  color: var(--thunder-color-action-disabled);\n  cursor: not-allowed;\n}\n\n.thunderid-otp-field__error {\n  font-size: var(--thunder-typography-fontSize-xs);\n  color: var(--thunder-color-error-contrastText);\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n";
export default OTP_FIELD_CSS;
//# sourceMappingURL=OtpField.css.d.ts.map