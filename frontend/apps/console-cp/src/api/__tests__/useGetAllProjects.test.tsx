// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {waitFor, renderHook} from '@thunderid/test-utils';
import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import useGetAllProjects, {type Project} from '../useGetAllProjects';

vi.mock('@thunderid/react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@thunderid/react')>()),
  useThunderID: vi.fn(),
}));

vi.mock('@thunderid/contexts', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@thunderid/contexts')>()),
  useConfig: vi.fn(),
}));

const {useThunderID} = await import('@thunderid/react');
const {useConfig} = await import('@thunderid/contexts');

function project(index: number): Project {
  return {id: `project-${index}`, handle: `handle-${index}`, displayName: `Project ${index}`};
}

function page(projects: Project[], totalResults: number) {
  return {data: {totalResults, startIndex: 1, count: projects.length, projects}};
}

describe('useGetAllProjects', () => {
  let mockHttpRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockHttpRequest = vi.fn();

    vi.mocked(useThunderID).mockReturnValue({
      http: {request: mockHttpRequest},
    } as unknown as ReturnType<typeof useThunderID>);

    vi.mocked(useConfig).mockReturnValue({
      getServerUrl: () => 'https://api.test.com',
    } as ReturnType<typeof useConfig>);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns the projects of a single page', async () => {
    mockHttpRequest.mockResolvedValueOnce(page([project(1), project(2)], 2));

    const {result} = renderHook(() => useGetAllProjects());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([project(1), project(2)]);
    expect(mockHttpRequest).toHaveBeenCalledTimes(1);
    expect(mockHttpRequest).toHaveBeenCalledWith(
      expect.objectContaining({url: 'https://api.test.com/projects?limit=100&offset=0', method: 'GET'}),
    );
  });

  it('fetches every page until it has all the projects', async () => {
    const firstPage = Array.from({length: 100}, (_, index) => project(index));
    mockHttpRequest.mockResolvedValueOnce(page(firstPage, 101)).mockResolvedValueOnce(page([project(100)], 101));

    const {result} = renderHook(() => useGetAllProjects());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toHaveLength(101);
    expect(mockHttpRequest).toHaveBeenCalledTimes(2);
    expect(mockHttpRequest).toHaveBeenLastCalledWith(
      expect.objectContaining({url: 'https://api.test.com/projects?limit=100&offset=100'}),
    );
  });

  it('stops when a page comes back empty', async () => {
    mockHttpRequest.mockResolvedValueOnce(page([project(1)], 5)).mockResolvedValueOnce(page([], 5));

    const {result} = renderHook(() => useGetAllProjects());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([project(1)]);
    expect(mockHttpRequest).toHaveBeenCalledTimes(2);
  });

  it('surfaces an API error', async () => {
    const apiError = new Error('Failed to load projects');
    mockHttpRequest.mockRejectedValue(apiError);

    const {result} = renderHook(() => useGetAllProjects());

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(apiError);
  });
});
