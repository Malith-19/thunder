// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useMemo, type JSX, type PropsWithChildren} from 'react';
import ProjectContext, {type ProjectContextType} from './ProjectContext';

/**
 * Props for the ProjectProvider component.
 *
 * @public
 */
export interface ProjectProviderProps extends PropsWithChildren {
  /**
   * The project to scope descendants to. Leave it unset for the organization view.
   */
  project?: ProjectContextType;
}

/**
 * React context provider that scopes feature packages to one project. Within it, the
 * applications and agents lists show only the project's resources, and new ones are created in
 * the project.
 *
 * Resolving which project is in scope belongs to the host application: packages only read the
 * answer through `useProject`.
 *
 * @example
 * ```tsx
 * <ProjectProvider project={{projectId: project.id, projectHandle: project.handle}}>
 *   <Outlet />
 * </ProjectProvider>
 * ```
 *
 * @public
 */
export default function ProjectProvider({project = undefined, children}: ProjectProviderProps): JSX.Element {
  const projectId = project?.projectId;
  const projectHandle = project?.projectHandle;

  // A project without an ID leaves the context undefined, so descendants fall back to the
  // organization view instead of filtering by an empty project.
  const value: ProjectContextType | undefined = useMemo(
    () => (projectId ? {projectId, projectHandle: projectHandle ?? ''} : undefined),
    [projectId, projectHandle],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
