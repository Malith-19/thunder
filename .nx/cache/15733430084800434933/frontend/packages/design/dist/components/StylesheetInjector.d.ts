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
import type { Stylesheet } from '../models/layout';
/**
 * Props for the StylesheetInjector component.
 */
export interface StylesheetInjectorProps {
    /** Optional stylesheet override; if omitted, reads from layout.head.stylesheets via useDesign() */
    stylesheets?: Stylesheet[];
}
/**
 * Component that injects stylesheets from the layout head configuration into the document head.
 *
 * Supports two stylesheet types:
 * - inline: Injects a style element with sanitized CSS content
 * - url: Injects a link rel="stylesheet" element (https only)
 *
 * Stylesheets are identified by their id field, prefixed with "<PRODUCT_NAME>-stylesheet-"
 * to avoid DOM ID collisions. Elements are cleaned up on unmount or when the stylesheet
 * list changes.
 */
export default function StylesheetInjector({ stylesheets }: StylesheetInjectorProps): null;
