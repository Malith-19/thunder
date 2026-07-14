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
import { type UseMutationResult } from '@tanstack/react-query';
import type { UpdateLayoutRequest } from '../models/requests';
import type { LayoutResponse } from '../models/responses';
interface UpdateLayoutParams {
    layoutId: string;
    data: UpdateLayoutRequest;
}
/**
 * Custom hook to update an existing layout configuration in the server.
 *
 * @returns TanStack Query mutation object for updating layout configurations
 */
export default function useUpdateLayout(): UseMutationResult<LayoutResponse, Error, UpdateLayoutParams>;
export {};
