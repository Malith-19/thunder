// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {type Context, createContext} from 'react';

/**
 * A project the host application lets the user switch between.
 *
 * A resource belongs to a project when its `projectId` is the project's ID, or, for users, agents and
 * groups, through the organization unit that owns it. Lists are scoped to a project by passing that ID
 * as the `projectId` query parameter.
 *
 * @public
 */
export interface Project {
  /**
   * ID of the project.
   */
  id: string;
  /**
   * Handle of the project, stable across environments.
   */
  handle: string;
  /**
   * Display name of the project.
   */
  name: string;
  /**
   * Optional description of the project.
   */
  description?: string | null;
  /**
   * Whether this is the default project, which holds the resources created without one.
   */
  isDefault?: boolean;
}

/**
 * Project context interface that exposes the host application's project selection.
 *
 * @public
 */
export interface ProjectContextType {
  /**
   * Whether the server answers the project API. Without it every resource is shown without a project
   * filter.
   */
  isEnabled: boolean;
  /**
   * Projects available to the user.
   */
  projects: Project[];
  /**
   * The project the user is working in. Always set once projects have loaded, and `null` otherwise.
   */
  selectedProject: Project | null;
  /**
   * Selects a project by ID.
   */
  selectProject: (projectId: string) => void;
  /**
   * Whether the list of projects is still loading.
   */
  isLoading: boolean;
}

/**
 * React context that carries the host application's project selection.
 *
 * Defaults to an empty selection rather than `undefined` so that feature packages render
 * unscoped when no host provides projects (e.g. in unit tests). Consume via `useProject`.
 *
 * @public
 */
const ProjectContext: Context<ProjectContextType> = createContext<ProjectContextType>({
  isEnabled: false,
  projects: [],
  selectedProject: null,
  selectProject: () => undefined,
  isLoading: false,
});

export default ProjectContext;
