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
 * Styles for the OrganizationList presentation component.
 *
 * BEM block: `.thunderid-organization-list`
 *
 * The root element is a plain `div`. There is no Card wrapper here,
 * so this file provides the full layout including border and spacing.
 *
 * Elements:
 *   __loading  – loading state container (centred Spinner)
 *   __empty    – empty state message (Typography body2)
 *   __item     – each selectable organization row button
 */
declare const ORGANIZATION_LIST_CSS = "\n/* ============================================================\n   OrganizationList\n   ============================================================ */\n\n.thunderid-organization-list {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--thunder-spacing-unit) * 0.5);\n  font-family: var(--thunder-typography-fontFamily);\n}\n\n/* Loading / Empty ------------------------------------------- */\n\n.thunderid-organization-list__loading,\n.thunderid-organization-list__empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: calc(var(--thunder-spacing-unit) * 3);\n  color: var(--thunder-color-text-secondary);\n}\n\n/* Items ----------------------------------------------------- */\n\n.thunderid-organization-list__item {\n  display: flex;\n  align-items: center;\n  gap: calc(var(--thunder-spacing-unit) * 1.25);\n  width: 100%;\n  padding: calc(var(--thunder-spacing-unit) * 1.25) calc(var(--thunder-spacing-unit) * 1.5);\n  background: var(--thunder-color-background-surface);\n  border: 1px solid var(--thunder-color-border);\n  border-radius: var(--thunder-border-radius-small);\n  cursor: pointer;\n  text-align: left;\n  font-family: var(--thunder-typography-fontFamily);\n  font-size: var(--thunder-typography-fontSize-md);\n  color: var(--thunder-color-text-primary);\n  transition:\n    background-color var(--thunder-transition-fast),\n    border-color var(--thunder-transition-fast),\n    box-shadow var(--thunder-transition-fast);\n  box-sizing: border-box;\n}\n\n.thunderid-organization-list__item:hover {\n  background-color: var(--thunder-color-primary-light);\n  border-color: var(--thunder-color-primary-main);\n}\n\n.thunderid-organization-list__item:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);\n}\n";
export default ORGANIZATION_LIST_CSS;
//# sourceMappingURL=OrganizationList.css.d.ts.map