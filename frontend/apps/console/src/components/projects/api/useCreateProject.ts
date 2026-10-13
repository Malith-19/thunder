// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useMutation, useQueryClient, type UseMutationResult} from '@tanstack/react-query';
import {useConfig, type Project} from '@thunderid/contexts';
import {useThunderID} from '@thunderid/react';
import {PROJECTS_QUERY_KEY} from './useGetProjects';

/**
 * Body of a create project request.
 */
export interface CreateProjectRequest {
  name: string;
  handle: string;
  description?: string;
}

/**
 * Creates a project and refreshes the project list.
 */
export default function useCreateProject(): UseMutationResult<Project, Error, CreateProjectRequest> {
  const {http} = useThunderID();
  const {getServerUrl} = useConfig();
  const queryClient = useQueryClient();

  return useMutation<Project, Error, CreateProjectRequest>({
    mutationFn: async (data: CreateProjectRequest): Promise<Project> => {
      const response: {data: Project} = await http.request({
        url: `${getServerUrl()}/projects`,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data,
      } as unknown as Parameters<typeof http.request>[0]);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [PROJECTS_QUERY_KEY]}).catch(() => {
        // The list refreshes on its next read when invalidation fails.
      });
    },
  });
}
