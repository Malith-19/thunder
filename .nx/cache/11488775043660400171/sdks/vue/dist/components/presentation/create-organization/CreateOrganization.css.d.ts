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
 * Styles for the CreateOrganization presentation component.
 *
 * BEM block: `.thunderid-create-organization`
 *
 * The root element is a Card, whose padding is intentionally kept
 * as this is a full form panel.
 *
 * Elements:
 *   __title        – form heading (Typography h6)
 *   __description  – optional sub-heading (Typography body2)
 *   __error        – error Alert
 *   __input        – the org-name TextField
 *   __submit       – the submit Button
 */
declare const CREATE_ORGANIZATION_CSS = "\n/* ============================================================\n   CreateOrganization\n   ============================================================ */\n\n.thunderid-create-organization {\n  display: flex;\n  flex-direction: column;\n  gap: calc(var(--thunder-spacing-unit) * 1.75);\n  max-width: 440px;\n  width: 100%;\n}\n\n/* Title & description --------------------------------------- */\n\n.thunderid-create-organization__description {\n  margin-top: calc(var(--thunder-spacing-unit) * -0.75);\n  color: var(--thunder-color-text-secondary);\n}\n\n/* Input ----------------------------------------------------- */\n\n.thunderid-create-organization__input {\n  width: 100%;\n}\n\n/* Submit ---------------------------------------------------- */\n\n.thunderid-create-organization__submit {\n  align-self: flex-start;\n}\n";
export default CREATE_ORGANIZATION_CSS;
//# sourceMappingURL=CreateOrganization.css.d.ts.map