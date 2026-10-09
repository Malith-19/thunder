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

function storeProjectId(projectId: string | null): void {
  try {
    if (projectId) {
      window.localStorage.setItem(SELECTED_PROJECT_STORAGE_KEY, projectId);
    } else {
      window.localStorage.removeItem(SELECTED_PROJECT_STORAGE_KEY);
    }
  } catch {
    // The selection still applies for this session when storage is unavailable.
  }
}

/**
 * Supplies the Console's project selection to every feature package.
 *
 * Projects come from the project API. The user works either in one project or at the organization
 * level, which removes the project filter so resources outside every project are visible too. The
 * Console reopens on the project last selected in this browser, and otherwise at the organization
 * level, where every existing resource is.
 */
export default function ProjectProvider({children}: PropsWithChildren): JSX.Element {
  const {isSignedIn} = useThunderID();
  const {data, isLoading} = useGetProjects(isSignedIn);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(readStoredProjectId);

  const projects = useMemo((): Project[] => data?.projects ?? [], [data?.projects]);
  const selectedProject: Project | null = projects.find((project) => project.id === selectedProjectId) ?? null;

  const selectProject = useCallback((projectId: string | null): void => {
    setSelectedProjectId(projectId);
    storeProjectId(projectId);
  }, []);

  const value = useMemo(
    (): ProjectContextType => ({projects, selectedProject, selectProject, isLoading}),
    [projects, selectedProject, selectProject, isLoading],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
