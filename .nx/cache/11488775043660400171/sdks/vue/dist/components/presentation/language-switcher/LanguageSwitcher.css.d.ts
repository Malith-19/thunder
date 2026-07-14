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
 * Styles for the LanguageSwitcher presentation component.
 *
 * BEM block: `.thunderid-language-switcher`
 *
 * The root element is a Card (`.thunderid-card`). We override its default
 * padding to 0 so the trigger button fills the surface edge-to-edge,
 * and apply `position: relative` to anchor the absolute dropdown.
 * The Card's border-radius and shadow are intentionally kept.
 *
 * Elements:
 *   __trigger        – compact trigger button (globe icon + language label + chevron)
 *   __trigger-label  – the current language name Typography inside the trigger
 *   __dropdown       – absolute-positioned dropdown listbox
 *   __item           – each selectable language row
 *   __item--active   – the currently selected language
 */
declare const LANGUAGE_SWITCHER_CSS = "\n/* ============================================================\n   LanguageSwitcher\n   ============================================================ */\n\n/* Override Card's default padding so the trigger fills the surface */\n.thunderid-language-switcher.thunderid-card {\n  padding: 0;\n  position: relative;\n  display: inline-block;\n}\n\n/* Trigger ---------------------------------------------------- */\n\n.thunderid-language-switcher__trigger {\n  display: inline-flex;\n  align-items: center;\n  gap: calc(var(--thunder-spacing-unit) * 0.5);\n  padding: var(--thunder-dropdown-itemPaddingY) var(--thunder-dropdown-itemPaddingX);\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--thunder-color-text-primary);\n  font-family: var(--thunder-typography-fontFamily);\n  font-size: var(--thunder-typography-fontSize-md);\n  border-radius: var(--thunder-dropdown-borderRadius);\n  transition: background-color var(--thunder-transition-fast);\n  white-space: nowrap;\n  box-sizing: border-box;\n}\n\n.thunderid-language-switcher__trigger:hover {\n  background-color: var(--thunder-color-action-hover);\n}\n\n.thunderid-language-switcher__trigger:focus-visible {\n  outline: none;\n  box-shadow: inset 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);\n  border-radius: var(--thunder-dropdown-borderRadius);\n}\n\n.thunderid-language-switcher__trigger-label {\n  flex: 0 0 auto;\n}\n\n/* Dropdown --------------------------------------------------- */\n\n.thunderid-language-switcher__dropdown {\n  position: absolute;\n  top: calc(100% + calc(var(--thunder-spacing-unit) * 0.5));\n  right: 0;\n  z-index: 1000;\n  background-color: var(--thunder-color-background-surface);\n  border: 1px solid var(--thunder-color-border);\n  border-radius: var(--thunder-dropdown-borderRadius);\n  box-shadow: var(--thunder-dropdown-shadow);\n  overflow: hidden;\n  min-width: 130px;\n  display: flex;\n  flex-direction: column;\n  padding: calc(var(--thunder-spacing-unit) * 0.5) 0;\n}\n\n/* Items ----------------------------------------------------- */\n\n.thunderid-language-switcher__item {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: var(--thunder-dropdown-itemPaddingY) var(--thunder-dropdown-itemPaddingX);\n  background: none;\n  border: none;\n  cursor: pointer;\n  text-align: left;\n  font-family: var(--thunder-typography-fontFamily);\n  font-size: var(--thunder-typography-fontSize-md);\n  color: var(--thunder-color-text-primary);\n  transition: background-color var(--thunder-transition-fast);\n  box-sizing: border-box;\n}\n\n.thunderid-language-switcher__item:hover {\n  background-color: var(--thunder-color-action-hover);\n}\n\n.thunderid-language-switcher__item--active {\n  background-color: var(--thunder-color-action-selected);\n  color: var(--thunder-color-primary-main);\n  font-weight: var(--thunder-typography-fontWeight-medium);\n}\n\n.thunderid-language-switcher__item--active:hover {\n  background-color: var(--thunder-color-action-focus);\n}\n";
export default LANGUAGE_SWITCHER_CSS;
//# sourceMappingURL=LanguageSwitcher.css.d.ts.map