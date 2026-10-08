// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {ProjectContext, type Project, type ProjectContextType} from '@thunderid/contexts';
import {renderHook} from '@thunderid/test-utils';
import type {JSX, ReactNode} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import useHasMultipleOUs from '../useHasMultipleOUs';

const mockUseGetOrganizationUnits = vi.fn();
const mockUseGetChildOrganizationUnits = vi.fn();

vi.mock('../useGetOrganizationUnits', () => ({
  default: (...args: unknown[]): unknown => mockUseGetOrganizationUnits(...args),
}));

vi.mock('../useGetChildOrganizationUnits', () => ({
  default: (...args: unknown[]): unknown => mockUseGetChildOrganizationUnits(...args),
}));

const project: Project = {id: 'ou-finance', handle: 'finance', name: 'Finance'};

function withProject(selectedProject: Project) {
  const value: ProjectContextType = {
    projects: [selectedProject],
    selectedProject,
    selectProject: vi.fn(),
    isLoading: false,
  };
  return function Wrapper({children}: {children: ReactNode}): JSX.Element {
    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
  };
}

function rootsResponse(ids: string[], totalResults = ids.length) {
  return {
    data: {
      totalResults,
      startIndex: 1,
      count: ids.length,
      organizationUnits: ids.map((id) => ({id, handle: id, name: id})),
    },
    isLoading: false,
  };
}

function childrenResponse(totalResults: number) {
  return {data: {totalResults, startIndex: 1, count: 0, organizationUnits: []}, isLoading: false};
}

describe('useHasMultipleOUs', () => {
  beforeEach(() => {
    mockUseGetOrganizationUnits.mockReturnValue(rootsResponse(['ou-a']));
    mockUseGetChildOrganizationUnits.mockReturnValue(childrenResponse(0));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('without a selected project', () => {
    it('should report a choice when there are several root organization units', () => {
      mockUseGetOrganizationUnits.mockReturnValue(rootsResponse(['ou-a', 'ou-b'], 5));

      const {result} = renderHook(() => useHasMultipleOUs());

      expect(result.current.hasMultipleOUs).toBe(true);
      expect(mockUseGetOrganizationUnits).toHaveBeenCalledWith({limit: 2, offset: 0}, true);
    });

    it('should report no choice for a single root without children', () => {
      const {result} = renderHook(() => useHasMultipleOUs());

      expect(result.current.hasMultipleOUs).toBe(false);
      expect(result.current.ouList.map((ou) => ou.id)).toEqual(['ou-a']);
      expect(mockUseGetChildOrganizationUnits).toHaveBeenCalledWith('ou-a', {limit: 1, offset: 0});
    });
  });

  describe('with a selected project', () => {
    it('should treat the project as the only root and skip listing roots', () => {
      mockUseGetOrganizationUnits.mockReturnValue({data: undefined, isLoading: true});

      const {result} = renderHook(() => useHasMultipleOUs(), {wrapper: withProject(project)});

      expect(mockUseGetOrganizationUnits).toHaveBeenCalledWith({limit: 2, offset: 0}, false);
      expect(mockUseGetChildOrganizationUnits).toHaveBeenCalledWith('ou-finance', {limit: 1, offset: 0});
      expect(result.current.ouList).toEqual([project]);
      expect(result.current.isLoading).toBe(false);
    });

    it('should report no choice when the project has no child organization units', () => {
      const {result} = renderHook(() => useHasMultipleOUs(), {wrapper: withProject(project)});

      expect(result.current.hasMultipleOUs).toBe(false);
    });

    it('should report a choice when the project has child organization units', () => {
      mockUseGetChildOrganizationUnits.mockReturnValue(childrenResponse(2));

      const {result} = renderHook(() => useHasMultipleOUs(), {wrapper: withProject(project)});

      expect(result.current.hasMultipleOUs).toBe(true);
    });

    it('should report loading while the project children load', () => {
      mockUseGetChildOrganizationUnits.mockReturnValue({data: undefined, isLoading: true});

      const {result} = renderHook(() => useHasMultipleOUs(), {wrapper: withProject(project)});

      expect(result.current.isLoading).toBe(true);
    });
  });
});
