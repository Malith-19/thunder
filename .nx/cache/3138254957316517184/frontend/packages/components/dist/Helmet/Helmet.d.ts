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
import { PropsWithChildren } from 'react';
export type HelmetProps = PropsWithChildren;
/**
 * A lightweight, provider-free document head manager inspired by react-helmet.
 *
 * Declaratively manage `<title>`, `<meta>`, `<link>`, `<script>`, `<style>`,
 * `<base>`, and `<noscript>` tags by passing them as JSX children. Tags are
 * appended to `document.head` on mount and removed on unmount, keeping the
 * document head in sync with the React tree.
 *
 * Multiple `<Helmet>` instances can coexist — each manages only the nodes it
 * created. The last mounted instance wins for `document.title`.
 *
 * @example
 * <Helmet>
 *   <title>My Page</title>
 *   <meta name="description" content="Page description" />
 *   <link rel="icon" href="/favicon.ico" />
 * </Helmet>
 */
export default function Helmet({ children }: HelmetProps): null;
