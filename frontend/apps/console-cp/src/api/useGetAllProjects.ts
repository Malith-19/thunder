// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {useConfig} from '@thunderid/contexts';
import {useThunderID} from '@thunderid/react';

/**
 * A project, as the project management API returns it.
 */
export interface Project {
  id: string;
  handle: string;
  displayName: string;
  description?: string;
}

interface ProjectListResponse {
  totalResults: number;
  startIndex: number;
  count: number;
  projects: Project[];
}

export const PROJECTS_QUERY_KEY = 'projects';

/** The largest page the project list returns. */
const PAGE_SIZE = 100;

/**
 * React hook fetching every project, page by page, so a project can be found by its handle.
 *
 * @returns TanStack Query result object containing all projects
 */
export default function useGetAllProjects(): UseQueryResult<Project[]> {
  const {http} = useThunderID();
  const {getServerUrl} = useConfig();

  return useQuery<Project[]>({
    queryKey: [PROJECTS_QUERY_KEY, 'all'],
    queryFn: async (): Promise<Project[]> => {
      const projects: Project[] = [];

      for (;;) {
        const queryParams = new URLSearchParams({limit: PAGE_SIZE.toString(), offset: projects.length.toString()});
        // Each page starts where the previous one ended, so the pages are fetched in turn.
        const response: {data: ProjectListResponse} = await http.request({
          url: `${getServerUrl()}/projects?${queryParams.toString()}`,
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        } as unknown as Parameters<typeof http.request>[0]);

        projects.push(...response.data.projects);
        if (response.data.projects.length === 0 || projects.length >= response.data.totalResults) {
          return projects;
        }
      }
    },
  });
}
