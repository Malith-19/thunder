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
import { type JSX } from 'react';
/**
 * Page for editing translation key-value pairs for a specific language.
 *
 * Reads the target language from the URL parameter. Displays a namespace
 * selector, a fields/JSON tab editor with local dirty-change tracking, and a
 * live gate preview panel. Supports saving individual field changes,
 * discarding all local edits, and resetting the namespace to the default
 * English values.
 *
 * @returns JSX element rendering the translations edit page
 *
 * @example
 * ```tsx
 * // Rendered automatically by the router at /translations/:language
 * import TranslationsEditPage from './TranslationsEditPage';
 *
 * function App() {
 *   return <TranslationsEditPage />;
 * }
 * ```
 *
 * @public
 */
export default function TranslationsEditPage(): JSX.Element;
