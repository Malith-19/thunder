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
import type { UpdateOrganizationUnitRequest } from '../models/requests';
/**
 * Variables for the update organization unit mutation
 */
interface UpdateOrganizationUnitVariables {
    id: string;
    data: UpdateOrganizationUnitRequest;
}
/**
 * Custom hook to update an existing organization unit.
 *
 * @returns TanStack Query mutation object for updating organization units
 *
 * @example
 * ```tsx
 * function UpdateOUButton({ id }: { id: string }) {
 *   const updateOU = useUpdateOrganizationUnit();
 *
 *   const handleUpdate = (data: UpdateOrganizationUnitRequest) => {
 *     updateOU.mutate({ id, data }, {
 *       onSuccess: (ou) => {
 *         console.log('Organization unit updated:', ou);
 *       },
 *       onError: (error) => {
 *         console.error('Failed to update organization unit:', error);
 *       }
 *     });
 *   };
 *
 *   return (
 *     <button onClick={() => handleUpdate(data)} disabled={updateOU.isPending}>
 *       {updateOU.isPending ? 'Updating...' : 'Update'}
 *     </button>
 *   );
 * }
 * ```
 */
export default function useUpdateOrganizationUnit(): UseMutationResult<OrganizationUnit, Error, UpdateOrganizationUnitVariables>;
export {};
