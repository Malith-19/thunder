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
import { type UseMutationResult } from '@tanstack/react-query';
import type { OrganizationUnit } from '../models/organization-unit';
import type { CreateOrganizationUnitRequest } from '../models/requests';
/**
 * Custom hook to create a new organization unit.
 *
 * @returns TanStack Query mutation object for creating organization units
 *
 * @example
 * ```tsx
 * function CreateOUButton() {
 *   const createOU = useCreateOrganizationUnit();
 *
 *   const handleCreate = (data: CreateOrganizationUnitRequest) => {
 *     createOU.mutate(data, {
 *       onSuccess: (ou) => {
 *         console.log('Organization unit created:', ou);
 *       },
 *       onError: (error) => {
 *         console.error('Failed to create organization unit:', error);
 *       }
 *     });
 *   };
 *
 *   return (
 *     <button onClick={() => handleCreate(data)} disabled={createOU.isPending}>
 *       {createOU.isPending ? 'Creating...' : 'Create'}
 *     </button>
 *   );
 * }
 * ```
 */
export default function useCreateOrganizationUnit(): UseMutationResult<OrganizationUnit, Error, CreateOrganizationUnitRequest>;
