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
 * Styles for the Spinner primitive component.
 *
 * BEM block: `.thunderid-spinner`
 *
 * Modifiers:
 *   Size: --small | --medium | --large
 *
 * Elements:
 *   __svg | __circle
 *
 * Note: The `thunder-spin` and `thunder-spinner-dash` keyframe animations
 * are defined in `styles/animations.css.ts` and shared with the Button component.
 */
declare const SPINNER_CSS = "\n/* ============================================================\n   Spinner\n   ============================================================ */\n\n.thunderid-spinner {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--thunder-color-primary-main);\n}\n\n.thunderid-spinner--small {\n  width: calc(var(--thunder-spacing-unit) * 2);\n  height: calc(var(--thunder-spacing-unit) * 2);\n}\n\n.thunderid-spinner--medium {\n  width: calc(var(--thunder-spacing-unit) * 2.5);\n  height: calc(var(--thunder-spacing-unit) * 2.5);\n}\n\n.thunderid-spinner--large {\n  width: calc(var(--thunder-spacing-unit) * 3.5);\n  height: calc(var(--thunder-spacing-unit) * 3.5);\n}\n\n.thunderid-spinner__svg {\n  width: 100%;\n  height: 100%;\n  animation: thunder-spin 1.4s linear infinite;\n}\n\n.thunderid-spinner__circle {\n  stroke-dasharray: 80, 200;\n  stroke-dashoffset: 0;\n  animation: thunder-spinner-dash 1.4s ease-in-out infinite;\n}\n";
export default SPINNER_CSS;
//# sourceMappingURL=Spinner.css.d.ts.map