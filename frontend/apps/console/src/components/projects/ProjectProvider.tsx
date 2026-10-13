// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {ProjectContext, type Project, type ProjectContextType} from '@thunderid/contexts';
import {useThunderID} from '@thunderid/react';
import {useCallback, useMemo, useState, type JSX, type PropsWithChildren} from 'react';
import useGetProjects from './api/useGetProjects';

const SELECTED_PROJECT_STORAGE_KEY = 'thunderid.console.selectedProjectId';

function readStoredProjectId(): string | null {
  try {
    return window.localStorage.getItem(SELECTED_PROJECT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeProjectId(projectId: string): void {
  try {
    window.localStorage.setItem(SELECTED_PROJECT_STORAGE_KEY, projectId);
  } catch {
    // The selection still applies for this session when storage is unavailable.
  }
}

/**
 * Supplies the Console's project selection to every feature package.
 *
 * The user always works in one project: the one last selected in this browser, otherwise the default
 * project. A server that does not answer the project API shows every resource without a project
 * filter.
 */
export default function ProjectProvider({children}: PropsWithChildren): JSX.Element {
  const {isSignedIn} = useThunderID();
  const {data, isLoading, isError} = useGetProjects(isSignedIn);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(readStoredProjectId);

  // A failed request means the server has no projects, even when an earlier answer is still cached.
  const isEnabled = !isError && Array.isArray(data?.projects);
  const projects = useMemo((): Project[] => (isEnabled ? (data?.projects ?? []) : []), [isEnabled, data?.projects]);
  const selectedProject: Project | null =
    projects.find((project) => project.id === selectedProjectId) ??
    projects.find((project) => project.isDefault) ??
    projects[0] ??
    null;

  const selectProject = useCallback((projectId: string): void => {
    setSelectedProjectId(projectId);
    storeProjectId(projectId);
  }, []);

  const value = useMemo(
    (): ProjectContextType => ({isEnabled, projects, selectedProject, selectProject, isLoading}),
    [isEnabled, projects, selectedProject, selectProject, isLoading],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
