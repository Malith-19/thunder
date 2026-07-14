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
import type { JSX } from 'react';
import type { FlowComponentRendererProps } from '../../models/flow';
/**
 * Factory component that maps an embedded flow component to the appropriate adapter.
 *
 * Supported top-level types:
 * - `TEXT` → {@link TextAdapter}
 * - `RICH_TEXT` → {@link RichTextAdapter}
 * - `IMAGE` → {@link ImageAdapter}
 * - `ICON` → {@link IconAdapter}
 * - `STACK` → {@link StackAdapter}
 * - `DIVIDER` → {@link DividerAdapter}
 * - `BLOCK` (form or trigger) → {@link BlockAdapter}
 * - `ACTION / TRIGGER` (standalone) → {@link StandaloneTriggerAdapter}
 *
 * Consumers must wrap their submit/trigger handlers into the normalised
 * `onSubmit(action, inputs)` callback.  Setting a `key` on the rendered
 * `<FlowComponentRenderer>` is the caller's responsibility.
 */
export default function FlowComponentRenderer({ component, index, values, touched, fieldErrors, isLoading, resolve, onInputChange, onSubmit, onValidate, maxImageSize, additionalData, signUpFallbackUrl, signInFallbackUrl, forgotPasswordFallbackUrl, }: FlowComponentRendererProps): JSX.Element | null;
