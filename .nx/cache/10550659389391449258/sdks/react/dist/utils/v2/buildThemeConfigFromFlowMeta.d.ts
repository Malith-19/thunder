/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import { FlowMetaTheme, RecursivePartial, ThemeConfig } from '@thunderid/browser';
/**
 * Converts a v2 `FlowMetaTheme` into a `RecursivePartial<ThemeConfig>` that
 * `createTheme` can consume.
 *
 * Only fields explicitly present in the FlowMeta response are included so that
 * `createTheme` can deep-merge them onto its base (light/dark) defaults without
 * accidentally dropping sibling keys that were not returned by the server.
 *
 * For example, when FlowMeta returns only `background.default` and
 * `background.paper`, only `body.main` and `surface` are set — the base
 * theme's `background.disabled` and `background.dark` are **not** overridden
 * and therefore keep their default CSS variable values.
 */
declare const buildThemeConfigFromFlowMeta: (flowMetaTheme: FlowMetaTheme, colorScheme: "light" | "dark") => RecursivePartial<ThemeConfig>;
export default buildThemeConfigFromFlowMeta;
//# sourceMappingURL=buildThemeConfigFromFlowMeta.d.ts.map