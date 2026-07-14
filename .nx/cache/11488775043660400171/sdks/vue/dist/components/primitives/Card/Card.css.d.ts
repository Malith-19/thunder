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
 * Styles for the Card primitive component.
 *
 * BEM block: `.thunderid-card`
 *
 * Modifiers:
 *   --elevated  – medium drop shadow
 *   --outlined  – 1px border, no shadow
 *   --flat      – neither shadow nor border (default)
 */
declare const CARD_CSS = "\n/* ============================================================\n   Card\n   ============================================================ */\n\n.thunderid-card {\n  background-color: var(--thunder-color-background-surface);\n  border-radius: var(--thunder-card-borderRadius);\n  padding: var(--thunder-card-padding);\n  box-sizing: border-box;\n  transition: box-shadow var(--thunder-transition-normal);\n}\n\n.thunderid-card--elevated {\n  box-shadow: var(--thunder-card-shadow);\n}\n\n.thunderid-card--outlined {\n  border: 1px solid var(--thunder-card-borderColor);\n}\n\n/* .thunderid-card--flat: no shadow or border */\n";
export default CARD_CSS;
//# sourceMappingURL=Card.css.d.ts.map