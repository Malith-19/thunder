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
 * Styles for the Typography primitive component.
 *
 * BEM block: `.thunderid-typography`
 *
 * Modifiers (variant):
 *   --h1 | --h2 | --h3 | --h4 | --h5 | --h6
 *   --subtitle1 | --subtitle2
 *   --body1 | --body2
 *   --caption | --overline
 */
declare const TYPOGRAPHY_CSS = "\n/* ============================================================\n   Typography\n   ============================================================ */\n\n.thunderid-typography {\n  font-family: var(--thunder-typography-fontFamily);\n  color: var(--thunder-color-text-primary);\n  margin: 0;\n  line-height: var(--thunder-typography-lineHeight-normal);\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.thunderid-typography--h1 {\n  font-size: var(--thunder-typography-fontSize-3xl);\n  font-weight: var(--thunder-typography-fontWeight-bold);\n  line-height: var(--thunder-typography-lineHeight-tight);\n  letter-spacing: var(--thunder-typography-letterSpacing-tight);\n}\n\n.thunderid-typography--h2 {\n  font-size: var(--thunder-typography-fontSize-2xl);\n  font-weight: var(--thunder-typography-fontWeight-bold);\n  line-height: var(--thunder-typography-lineHeight-tight);\n  letter-spacing: var(--thunder-typography-letterSpacing-tight);\n}\n\n.thunderid-typography--h3 {\n  font-size: var(--thunder-typography-fontSize-xl);\n  font-weight: var(--thunder-typography-fontWeight-semibold);\n  line-height: var(--thunder-typography-lineHeight-tight);\n}\n\n.thunderid-typography--h4 {\n  font-size: var(--thunder-typography-fontSize-lg);\n  font-weight: var(--thunder-typography-fontWeight-semibold);\n}\n\n.thunderid-typography--h5 {\n  font-size: var(--thunder-typography-fontSize-md);\n  font-weight: var(--thunder-typography-fontWeight-semibold);\n}\n\n.thunderid-typography--h6 {\n  font-size: var(--thunder-typography-fontSize-sm);\n  font-weight: var(--thunder-typography-fontWeight-semibold);\n  text-transform: uppercase;\n  letter-spacing: var(--thunder-typography-letterSpacing-wide);\n}\n\n.thunderid-typography--subtitle1 {\n  font-size: var(--thunder-typography-fontSize-lg);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n}\n\n.thunderid-typography--subtitle2 {\n  font-size: var(--thunder-typography-fontSize-md);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n  color: var(--thunder-color-text-secondary);\n}\n\n.thunderid-typography--body1 {\n  font-size: var(--thunder-typography-fontSize-md);\n  font-weight: var(--thunder-typography-fontWeight-normal);\n  line-height: var(--thunder-typography-lineHeight-relaxed);\n}\n\n.thunderid-typography--body2 {\n  font-size: var(--thunder-typography-fontSize-sm);\n  font-weight: var(--thunder-typography-fontWeight-normal);\n  line-height: var(--thunder-typography-lineHeight-relaxed);\n  color: var(--thunder-color-text-secondary);\n}\n\n.thunderid-typography--caption {\n  font-size: var(--thunder-typography-fontSize-xs);\n  font-weight: var(--thunder-typography-fontWeight-normal);\n  color: var(--thunder-color-text-secondary);\n}\n\n.thunderid-typography--overline {\n  font-size: var(--thunder-typography-fontSize-xs);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--thunder-color-text-secondary);\n}\n";
export default TYPOGRAPHY_CSS;
//# sourceMappingURL=Typography.css.d.ts.map