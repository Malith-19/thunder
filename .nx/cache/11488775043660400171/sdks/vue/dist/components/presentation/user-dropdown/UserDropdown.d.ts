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
import { type Component } from 'vue';
/**
 * UserDropdown — avatar button that opens a user identity menu.
 *
 * @example Default usage
 * ```vue
 * <UserDropdown />
 * ```
 *
 * @example With custom menu items and a separator
 * ```vue
 * <UserDropdown
 *   :menu-items="[
 *     { label: 'Settings', icon: h(SettingsIcon, { size: 15 }), onClick: goToSettings },
 *     { label: 'Help',     onClick: openHelp, separatorBefore: true },
 *   ]"
 * />
 * ```
 *
 * @example Small, left-aligned, no chevron
 * ```vue
 * <UserDropdown size="sm" menu-align="left" />
 * ```
 */
declare const UserDropdown: Component;
export default UserDropdown;
//# sourceMappingURL=UserDropdown.d.ts.map