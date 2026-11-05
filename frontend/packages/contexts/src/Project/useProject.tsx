// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useContext} from 'react';
import ProjectContext, {type ProjectContextType} from './ProjectContext';

/**
 * React hook returning the project the console is scoped to.
 *
 * @returns The project in scope, or undefined in the organization view
 *
 * @example
 * ```tsx
 * const project = useProject();
 * const query = project ? `?projectId=${project.projectId}` : '';
 * ```
 *
 * @public
 */
export default function useProject(): ProjectContextType | undefined {
  return useContext(ProjectContext);
}
