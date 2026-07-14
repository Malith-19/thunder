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
import { FC } from 'react';
export interface CopyableTextProps {
    /**
     * Optional label displayed above the value box.
     */
    label?: string;
    /**
     * The text value to display and copy.
     */
    value: string;
}
/**
 * A React component that displays a text value with an optional label and a button to copy the value to
 * the clipboard. When the button is clicked, it attempts to copy the value using the Clipboard API, and
 * falls back to a textarea method if the API is not supported.
 * After copying, it shows a "Copied!" message for 3 seconds before resetting.
 */
declare const CopyableText: FC<CopyableTextProps>;
export default CopyableText;
//# sourceMappingURL=CopyableText.d.ts.map