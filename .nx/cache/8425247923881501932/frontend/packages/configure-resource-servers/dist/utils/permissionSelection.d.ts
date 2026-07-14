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
import type { ResourcePermissions } from '../models/resource-server';
export type SelectionState = 'all' | 'some' | 'none';
export declare function isPermissionSelected(list: ResourcePermissions[], resourceServerId: string, permission: string): boolean;
export declare function togglePermission(list: ResourcePermissions[], resourceServerId: string, permission: string): ResourcePermissions[];
export declare function mergePermissions(base: ResourcePermissions[], additions: ResourcePermissions[]): ResourcePermissions[];
export declare function removePermissions(list: ResourcePermissions[], resourceServerId: string, permissions: string[]): ResourcePermissions[];
export declare function getSubtreeSelectionState(list: ResourcePermissions[], resourceServerId: string, subtreePermissions: string[]): SelectionState;
export declare function arePermissionsEqual(a: ResourcePermissions[], b: ResourcePermissions[]): boolean;
