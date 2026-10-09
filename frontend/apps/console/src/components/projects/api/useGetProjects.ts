// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {useConfig, type Project} from '@thunderid/contexts';
import {useThunderID} from '@thunderid/react';

export const PROJECTS_QUERY_KEY = 'projects';
const PROJECT_PAGE_SIZE = 100;

/**
 * One page of projects as the project API returns it.
 */
export interface ProjectListResponse {
  totalResults: number;
  startIndex: number;
  count: number;
  projects: Project[];
}

/**
 * Fetches the projects of the deployment.
 *
 * @param enabled - Whether to fetch, so nothing is requested before the user signs in
 */
export default function useGetProjects(enabled = true): UseQueryResult<ProjectListResponse> {
  const {http} = useThunderID();
  const {getServerUrl} = useConfig();

  return useQuery<ProjectListResponse>({
    queryKey: [PROJECTS_QUERY_KEY],
    queryFn: async (): Promise<ProjectListResponse> => {
      const response: {data: ProjectListResponse} = await http.request({
        url: `${getServerUrl()}/projects?limit=${PROJECT_PAGE_SIZE}`,
        method: 'GET',
      } as unknown as Parameters<typeof http.request>[0]);
      return response.data;
    },
    enabled,
  });
}
