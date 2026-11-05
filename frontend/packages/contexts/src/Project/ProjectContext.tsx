// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {Context, createContext} from 'react';

/**
 * The project the console is scoped to.
 *
 * @public
 */
export interface ProjectContextType {
  /** ID of the project, which API calls name it by. */
  projectId: string;

  /** Handle of the project, which console paths name it by. */
  projectHandle: string;
}

const ProjectContext: Context<ProjectContextType | undefined> = createContext<ProjectContextType | undefined>(
  undefined,
);

export default ProjectContext;
