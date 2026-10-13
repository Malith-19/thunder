// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {renderHook} from '@thunderid/test-utils';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import useHasMultipleOUs from '../useHasMultipleOUs';

const mockUseGetOrganizationUnits = vi.fn();
vi.mock('../useGetOrganizationUnits', () => ({
  default: (params: unknown): unknown => mockUseGetOrganizationUnits(params),
}));

const mockUseGetChildOrganizationUnits = vi.fn();
vi.mock('../useGetChildOrganizationUnits', () => ({
  default: (parentId: string | undefined): unknown => mockUseGetChildOrganizationUnits(parentId),
}));

let mockSelectedProject: {id: string} | null = null;
vi.mock('@thunderid/contexts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@thunderid/contexts')>();
  return {...actual, useProject: () => ({selectedProject: mockSelectedProject})};
});

const root = {id: 'ou-finance', handle: 'finance', name: 'Finance', parent: null};

describe('useHasMultipleOUs', () => {
  beforeEach(() => {
    mockSelectedProject = null;
    mockUseGetChildOrganizationUnits.mockReturnValue({data: {totalResults: 0}, isLoading: false});
  });

  it('should count only the organization units of the selected project', () => {
    mockSelectedProject = {id: 'prj-finance'};
    mockUseGetOrganizationUnits.mockReturnValue({
      data: {totalResults: 1, organizationUnits: [root]},
      isLoading: false,
    });

    const {result} = renderHook(() => useHasMultipleOUs());

    expect(mockUseGetOrganizationUnits).toHaveBeenCalledWith({limit: 2, offset: 0, projectId: 'prj-finance'});
    expect(result.current.hasMultipleOUs).toBe(false);
    expect(result.current.ouList).toEqual([root]);
  });

  it('should report a choice when the single root has children', () => {
    mockUseGetOrganizationUnits.mockReturnValue({
      data: {totalResults: 1, organizationUnits: [root]},
      isLoading: false,
    });
    mockUseGetChildOrganizationUnits.mockReturnValue({data: {totalResults: 3}, isLoading: false});

    const {result} = renderHook(() => useHasMultipleOUs());

    expect(mockUseGetOrganizationUnits).toHaveBeenCalledWith({limit: 2, offset: 0, projectId: undefined});
    expect(result.current.hasMultipleOUs).toBe(true);
  });
});
