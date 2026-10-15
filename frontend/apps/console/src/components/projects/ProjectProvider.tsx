// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useGetOrganizationUnits} from '@thunderid/configure-organization-units';
import {ProjectContext, type Project, type ProjectContextType} from '@thunderid/contexts';
import {useThunderID} from '@thunderid/react';
import {useCallback, useMemo, useState, type JSX, type PropsWithChildren} from 'react';

const SELECTED_PROJECT_STORAGE_KEY = 'thunderid.console.selectedProjectId';
const DEFAULT_PROJECT_HANDLE = 'default';
// Stored in place of a project ID when the user works at the organization level.
const ORGANIZATION_SELECTION = 'organization';
const PROJECT_PAGE_SIZE = 100;

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
 * Every root organization unit is a project, including the default one. The user works either in
 * one project or at the organization level, which removes the project filter so resources outside
 * every project are visible too. The Console reopens on the choice last made in this browser, and
 * otherwise on the Default project.
 */
export default function ProjectProvider({children}: PropsWithChildren): JSX.Element {
  const {isSignedIn} = useThunderID();
  const {data, isLoading} = useGetOrganizationUnits({limit: PROJECT_PAGE_SIZE}, isSignedIn);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(readStoredProjectId);

  const projects = useMemo(
    (): Project[] =>
      (data?.organizationUnits ?? []).map(({id, handle, name, description}) => ({id, handle, name, description})),
    [data?.organizationUnits],
  );

  const selectedProject: Project | null =
    selectedProjectId === ORGANIZATION_SELECTION
      ? null
      : (projects.find((project) => project.id === selectedProjectId) ??
        projects.find((project) => project.handle === DEFAULT_PROJECT_HANDLE) ??
        projects[0] ??
        null);

  const selectProject = useCallback((projectId: string | null): void => {
    const selection = projectId ?? ORGANIZATION_SELECTION;
    setSelectedProjectId(selection);
    storeProjectId(selection);
  }, []);

  const value = useMemo(
    (): ProjectContextType => ({projects, selectedProject, selectProject, isLoading}),
    [projects, selectedProject, selectProject, isLoading],
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}
