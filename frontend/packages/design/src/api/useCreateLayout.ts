// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useMutation, useQueryClient, type UseMutationResult} from '@tanstack/react-query';
import {useConfig, useProject} from '@thunderid/contexts';
import {useThunderID} from '@thunderid/react';
import DesignQueryKeys from '../constants/design-query-keys';
import type {CreateLayoutRequest} from '../models/requests';
import type {LayoutResponse} from '../models/responses';

/**
 * Custom hook to create a new layout configuration in the server. The layout is created in the
 * selected project, when the server has projects.
 *
 * @returns TanStack Query mutation object for creating layout configurations
 */
export default function useCreateLayout(): UseMutationResult<LayoutResponse, Error, CreateLayoutRequest> {
  const {http} = useThunderID();
  const {getServerUrl} = useConfig();
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient();
  const {selectedProject} = useProject();
  const projectId = selectedProject?.id;

  return useMutation<LayoutResponse, Error, CreateLayoutRequest>({
    mutationFn: async (layoutData: CreateLayoutRequest): Promise<LayoutResponse> => {
      const serverUrl: string = getServerUrl();
      const response: {
        data: LayoutResponse;
      } = await http.request({
        url: `${serverUrl}/design/layouts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: projectId ? {...layoutData, projectId} : layoutData,
      } as unknown as Parameters<typeof http.request>[0]);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [DesignQueryKeys.LAYOUTS]}).catch(() => {
        // Ignore invalidation errors
      });
    },
  });
}
