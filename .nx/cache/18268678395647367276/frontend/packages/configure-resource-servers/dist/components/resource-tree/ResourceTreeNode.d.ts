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
import { type JSX } from 'react';
import type { AddNodeMode } from './AddNodeDialog';
import type { SelectedNode } from './ResourceTree';
import type { Action, Resource } from '../../models/resource-server';
interface ResourceTreeNodeProps {
    resourceServerId: string;
    delimiter: string;
    node: Resource;
    depth: number;
    selectedNodeId: string | null;
    onSelect: (node: SelectedNode) => void;
    onAddChild: (mode: AddNodeMode, parentResourceId: string, parentPermission: string) => void;
}
export declare function ResourceNode({ resourceServerId, delimiter, node, depth, selectedNodeId, onSelect, onAddChild, }: ResourceTreeNodeProps): JSX.Element;
interface ActionNodeProps {
    resourceServerId: string;
    action: Action;
    depth: number;
    parentResourceId?: string;
    selectedNodeId: string | null;
    onSelect: (node: SelectedNode) => void;
}
export declare function ActionNode({ resourceServerId, action, depth, parentResourceId, selectedNodeId, onSelect, }: ActionNodeProps): JSX.Element;
export {};
