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
import type { UpdateThemeRequest } from '../models/requests';
import type { ThemeResponse } from '../models/responses';
interface UpdateThemeParams {
    themeId: string;
    data: UpdateThemeRequest;
}
/**
 * Custom hook to update an existing theme configuration in the server.
 *
 * @returns TanStack Query mutation object for updating theme configurations
 */
export default function useUpdateTheme(): UseMutationResult<ThemeResponse, Error, UpdateThemeParams>;
export {};
