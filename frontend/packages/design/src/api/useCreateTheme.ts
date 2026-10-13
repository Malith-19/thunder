// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useMutation, useQueryClient, type UseMutationResult} from '@tanstack/react-query';
import {useConfig, useProject} from '@thunderid/contexts';
import {useThunderID} from '@thunderid/react';
import DesignQueryKeys from '../constants/design-query-keys';
import type {CreateThemeRequest} from '../models/requests';
import type {ThemeResponse} from '../models/responses';

/**
 * Custom hook to create a new theme configuration in the server. The theme is created in the
 * selected project, when the server has projects.
 *
 * @returns TanStack Query mutation object for creating theme configurations
 */
export default function useCreateTheme(): UseMutationResult<ThemeResponse, Error, CreateThemeRequest> {
  const {http} = useThunderID();
  const {getServerUrl} = useConfig();
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient();
  const {selectedProject} = useProject();
  const projectId = selectedProject?.id;

  return useMutation<ThemeResponse, Error, CreateThemeRequest>({
    mutationFn: async (themeData: CreateThemeRequest): Promise<ThemeResponse> => {
      const serverUrl: string = getServerUrl();
      const response: {
        data: ThemeResponse;
      } = await http.request({
        url: `${serverUrl}/design/themes`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: projectId ? {...themeData, projectId} : themeData,
      } as unknown as Parameters<typeof http.request>[0]);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [DesignQueryKeys.THEMES]}).catch(() => {
        // Ignore invalidation errors
      });
    },
  });
}
