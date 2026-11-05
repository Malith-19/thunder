// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {waitFor, renderHook} from '@thunderid/test-utils';
import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import AgentQueryKeys from '../../constants/agent-query-keys';
import type {Agent, CreateAgentRequest} from '../../models/agent';
import useCreateAgent from '../useCreateAgent';

vi.mock('@thunderid/react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@thunderid/react')>()),
  useThunderID: vi.fn(),
}));

vi.mock('@thunderid/contexts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@thunderid/contexts')>();
  return {
    ...actual,
    useConfig: vi.fn(),
    useProject: vi.fn(),
    useToast: vi.fn(),
  };
});

const {useThunderID} = await import('@thunderid/react');
const {useConfig, useProject, useToast} = await import('@thunderid/contexts');

describe('useCreateAgent', () => {
  let mockHttpRequest: ReturnType<typeof vi.fn>;
  let mockShowToast: ReturnType<typeof vi.fn>;

  const mockRequest: CreateAgentRequest = {
    ouId: '111e8400-e29b-41d4-a716-446655440000',
    type: 'default',
    description: 'Billing service',
  };

  const mockAgent: Agent = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    ouId: '111e8400-e29b-41d4-a716-446655440000',
    type: 'default',
    display: 'Billing Service',
  };

  beforeEach(() => {
    mockHttpRequest = vi.fn();
    mockShowToast = vi.fn();

    vi.mocked(useThunderID).mockReturnValue({
      http: {request: mockHttpRequest},
    } as unknown as ReturnType<typeof useThunderID>);

    vi.mocked(useProject).mockReturnValue(undefined);

    vi.mocked(useConfig).mockReturnValue({
      getServerUrl: () => 'https://api.test.com',
    } as ReturnType<typeof useConfig>);

    vi.mocked(useToast).mockReturnValue({
      showToast: mockShowToast,
    } as unknown as ReturnType<typeof useToast>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create the agent in the organization view', async () => {
    mockHttpRequest.mockResolvedValueOnce({data: mockAgent});

    const {result} = renderHook(() => useCreateAgent());

    result.current.mutate(mockRequest);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockAgent);
    expect(mockHttpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://api.test.com/agents',
        method: 'POST',
        data: mockRequest,
      }),
    );
    expect(mockShowToast).toHaveBeenCalledWith(expect.any(String), 'success');
  });

  it('should create the agent in the project in scope', async () => {
    vi.mocked(useProject).mockReturnValue({projectId: 'project-1', projectHandle: 'billing'});
    mockHttpRequest.mockResolvedValueOnce({data: mockAgent});

    const {result} = renderHook(() => useCreateAgent());

    result.current.mutate(mockRequest);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockHttpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {...mockRequest, projectId: 'project-1'},
      }),
    );
  });

  it('should invalidate the agents list on success', async () => {
    mockHttpRequest.mockResolvedValueOnce({data: mockAgent});

    const {result, queryClient} = renderHook(() => useCreateAgent());
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    result.current.mutate(mockRequest);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({queryKey: [AgentQueryKeys.AGENTS]});
  });

  it('should surface an API error without a toast', async () => {
    const apiError = new Error('Failed to create agent');
    mockHttpRequest.mockRejectedValueOnce(apiError);

    const {result} = renderHook(() => useCreateAgent());

    result.current.mutate(mockRequest);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(apiError);
    expect(mockShowToast).not.toHaveBeenCalled();
  });
});
