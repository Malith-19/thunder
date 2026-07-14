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
 * Options for configuring the copy to clipboard hook behavior
 *
 * @interface UseCopyToClipboardOptions
 */
export interface UseCopyToClipboardOptions {
    /**
     * Duration in milliseconds to keep the copied state as true
     * @default 2000
     */
    resetDelay?: number;
    /**
     * Callback function to execute after successful copy
     */
    onCopy?: () => void;
}
/**
 * Return type for useCopyToClipboard hook
 *
 * @interface UseCopyToClipboardResult
 */
export interface UseCopyToClipboardResult {
    /**
     * Whether the text has been copied (resets after resetDelay)
     */
    copied: boolean;
    /**
     * Function to copy text to clipboard
     * @param text - The text to copy
     * @returns Promise that resolves when copy is complete
     */
    copy: (text: string) => Promise<void>;
}
/**
 * Custom hook to copy text to clipboard with fallback support
 *
 * Provides a copy function that uses the modern Clipboard API with
 * a fallback to document.execCommand for older browsers.
 * Manages the copied state that automatically resets after a delay.
 *
 * @param options - Configuration options for the hook
 * @returns Object containing the copied state and copy function
 *
 * @example
 * ```typescript
 * const { copied, copy } = useCopyToClipboard({
 *   resetDelay: 2000,
 *   onCopy: () => console.log('Copied!')
 * });
 *
 * // In your component
 * <button onClick={() => copy('Hello World')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </button>
 * ```
 */
export default function useCopyToClipboard(options?: UseCopyToClipboardOptions): UseCopyToClipboardResult;
