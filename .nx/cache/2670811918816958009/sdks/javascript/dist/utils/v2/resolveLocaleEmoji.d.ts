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
/**
 * Resolves a BCP 47 locale tag to a flag emoji.
 *
 * Resolution order:
 * 1. Country subtag when present (e.g. `"en-US"` → 🇺🇸)
 * 2. Language-to-country fallback map (e.g. `"en"` → 🇬🇧)
 * 3. Globe emoji 🌐 for unrecognised codes
 *
 * @param locale - BCP 47 locale tag (e.g. "en", "en-US", "fr-CA")
 * @returns Flag or globe emoji string
 */
declare function resolveLocaleEmoji(locale: string): string;
export default resolveLocaleEmoji;
//# sourceMappingURL=resolveLocaleEmoji.d.ts.map