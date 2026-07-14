/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { type UseQueryResult } from '@tanstack/react-query';
import type { DesignResolveResponse } from '../models/responses';
type DesignResolveType = 'APP' | 'OU';
interface DesignResolveParams {
    type: DesignResolveType;
    id: string;
}
/**
 * Custom hook to resolve design configuration by type and ID from the server.
 * Uses the /design/resolve endpoint to fetch the merged theme and layout
 * based on application or organizational unit.
 *
 * @param params - Object containing type ('APP' or 'OU') and id of the entity
 * @param options - Optional React Query configuration options
 * @returns TanStack Query result object with resolved design data
 */
export default function useGetDesignResolve(params: DesignResolveParams, options?: {
    enabled?: boolean;
}): UseQueryResult<DesignResolveResponse>;
export {};
