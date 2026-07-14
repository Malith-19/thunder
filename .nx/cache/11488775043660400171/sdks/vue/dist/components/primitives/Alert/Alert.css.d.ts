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
 * Styles for the Alert primitive component.
 *
 * BEM block: `.thunderid-alert`
 *
 * Modifiers:
 *   Severity: --info | --success | --warning | --error
 *
 * Elements:
 *   __content | __dismiss
 */
declare const ALERT_CSS = "\n/* ============================================================\n   Alert\n   ============================================================ */\n\n.thunderid-alert {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: calc(var(--thunder-spacing-unit) * 1);\n  padding: var(--thunder-alert-paddingY) var(--thunder-alert-paddingX);\n  border-radius: var(--thunder-alert-borderRadius);\n  border: 1px solid transparent;\n  font-family: var(--thunder-typography-fontFamily);\n  font-size: var(--thunder-typography-fontSize-sm);\n  box-sizing: border-box;\n  width: 100%;\n  line-height: var(--thunder-typography-lineHeight-normal);\n}\n\n.thunderid-alert__content {\n  flex: 1;\n}\n\n.thunderid-alert--info {\n  background-color: var(--thunder-color-info-light);\n  border-color: var(--thunder-color-info-main);\n  color: var(--thunder-color-info-contrastText);\n}\n\n.thunderid-alert--success {\n  background-color: var(--thunder-color-success-light);\n  border-color: var(--thunder-color-success-main);\n  color: var(--thunder-color-success-contrastText);\n}\n\n.thunderid-alert--warning {\n  background-color: var(--thunder-color-warning-light);\n  border-color: var(--thunder-color-warning-main);\n  color: var(--thunder-color-warning-contrastText);\n}\n\n.thunderid-alert--error {\n  background-color: var(--thunder-color-error-light);\n  border-color: var(--thunder-color-error-main);\n  color: var(--thunder-color-error-contrastText);\n}\n\n.thunderid-alert__dismiss {\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1em;\n  line-height: 0;\n  padding: calc(var(--thunder-spacing-unit) * 0.25);\n  border-radius: var(--thunder-border-radius-xs);\n  color: inherit;\n  opacity: 0.6;\n  flex-shrink: 0;\n  transition: opacity var(--thunder-transition-fast), background-color var(--thunder-transition-fast);\n}\n.thunderid-alert__dismiss:hover {\n  opacity: 1;\n  background-color: var(--thunder-color-action-hover);\n}\n";
export default ALERT_CSS;
//# sourceMappingURL=Alert.css.d.ts.map