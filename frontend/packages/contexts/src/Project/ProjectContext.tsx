// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {type Context, createContext} from 'react';

/**
 * A project the host application lets the user switch between.
 *
 * A resource belongs to a project when its `projectId` is the project's ID. Lists are scoped to a
 * project by passing that ID as the `projectId` query parameter.
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
}

/**
 * Project context interface that exposes the host application's project selection.
 *
 * @public
 */
export interface ProjectContextType {
  /**
   * Projects available to the user.
   */
  projects: Project[];
  /**
   * The project the user is working in, or `null` when the user works at the organization level,
   * where resources are not filtered by project and those outside every project are visible too.
   */
  selectedProject: Project | null;
  /**
   * Selects a project by ID, or the organization level when `null` is passed.
   */
  selectProject: (projectId: string | null) => void;
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
  projects: [],
  selectedProject: null,
  selectProject: () => undefined,
  isLoading: false,
});

export default ProjectContext;
