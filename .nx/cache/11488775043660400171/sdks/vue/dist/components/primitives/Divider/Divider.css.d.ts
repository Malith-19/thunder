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
 * Styles for the Divider primitive component.
 *
 * BEM block: `.thunderid-divider`
 *
 * Modifiers:
 *   --horizontal   – full-width horizontal rule
 *   --vertical     – inline vertical bar
 *   --with-content – flex row with centred label between two lines
 *
 * Elements:
 *   __line | __content
 */
declare const DIVIDER_CSS = "\n/* ============================================================\n   Divider\n   ============================================================ */\n\n.thunderid-divider {\n  box-sizing: border-box;\n}\n\n.thunderid-divider--horizontal {\n  width: 100%;\n  border: none;\n  border-top: 1px solid var(--thunder-color-border);\n  margin: calc(var(--thunder-spacing-unit) * 1) 0;\n}\n\n.thunderid-divider--vertical {\n  display: inline-block;\n  width: 1px;\n  height: 100%;\n  min-height: 1em;\n  border: none;\n  background-color: var(--thunder-color-border);\n  margin: 0 calc(var(--thunder-spacing-unit) * 1);\n  align-self: stretch;\n}\n\n.thunderid-divider--with-content {\n  display: flex;\n  align-items: center;\n  gap: calc(var(--thunder-spacing-unit) * 1);\n  border: none;\n  margin: calc(var(--thunder-spacing-unit) * 1) 0;\n}\n\n.thunderid-divider__line {\n  flex: 1;\n  height: 1px;\n  background-color: var(--thunder-color-border);\n}\n\n.thunderid-divider__content {\n  flex-shrink: 0;\n  font-size: var(--thunder-typography-fontSize-xs);\n  color: var(--thunder-color-text-secondary);\n  padding: 0 calc(var(--thunder-spacing-unit) * 0.5);\n  font-family: var(--thunder-typography-fontFamily);\n  text-transform: uppercase;\n  letter-spacing: var(--thunder-typography-letterSpacing-wide);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n}\n";
export default DIVIDER_CSS;
//# sourceMappingURL=Divider.css.d.ts.map