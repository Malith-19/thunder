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
export interface GoogleFontLoaderProps {
    /** Optional explicit font family. When omitted the component references the
     *  Asgardeo CSS variable so the browser resolves it automatically. */
    fontFamily?: string;
    /** Optional document to inject elements into (defaults to `window.document`). */
    targetDocument?: Document;
}
/**
 * Component that ensures the correct font is loaded and applied when the design
 * theme specifies a custom font family.
 *
 * It performs two tasks:
 * 1. Injects a CSS override referencing `var(--asgardeo-typography-fontFamily)`
 *    so MUI components use the design font instead of the theme default.
 *    By using the CSS variable directly (rather than reading its value in JS),
 *    there are no timing issues with the Asgardeo SDK setting it.
 * 2. Watches for the CSS variable to be set, then loads the Google Font if needed.
 */
export default function GoogleFontLoader({ fontFamily: fontFamilyProp, targetDocument, }: GoogleFontLoaderProps): null;
