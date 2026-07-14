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
/**
 * Custom React hook to delete an organization unit from the server.
 *
 * This hook uses TanStack Query mutations to handle the deletion process,
 * providing loading states and error handling. Upon successful deletion, it automatically
 * removes the organization unit from cache and invalidates the list query to trigger a refetch.
 *
 * @returns TanStack Query mutation object for deleting organization units
 *
 * @example
 * ```tsx
 * function DeleteOUButton({ id }: { id: string }) {
 *   const deleteOU = useDeleteOrganizationUnit();
 *
 *   const handleDelete = () => {
 *     if (confirm('Are you sure you want to delete this organization unit?')) {
 *       deleteOU.mutate(id, {
 *         onSuccess: () => {
 *           console.log('Organization unit deleted successfully');
 *         },
 *         onError: (error) => {
 *           console.error('Failed to delete organization unit:', error);
 *         }
 *       });
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleDelete} disabled={deleteOU.isPending}>
 *       {deleteOU.isPending ? 'Deleting...' : 'Delete'}
 *     </button>
 *   );
 * }
 * ```
 */
export default function useDeleteOrganizationUnit(): UseMutationResult<void, Error, string>;
