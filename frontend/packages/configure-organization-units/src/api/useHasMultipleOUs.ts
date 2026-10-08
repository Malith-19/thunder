// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useProject} from '@thunderid/contexts';
import useGetChildOrganizationUnits from './useGetChildOrganizationUnits';
import useGetOrganizationUnits from './useGetOrganizationUnits';
import type {OrganizationUnit} from '../models/organization-unit';

interface UseHasMultipleOUsResult {
  hasMultipleOUs: boolean;
  isLoading: boolean;
  ouList: OrganizationUnit[];
}

/**
 * Reports whether there is an organization unit choice to make. Within a selected project the choice
 * is between the project's root organization unit and the units beneath it, so the project root
 * stands in for the deployment's roots.
 */
export default function useHasMultipleOUs(): UseHasMultipleOUsResult {
  const {selectedProject} = useProject();
  const {data: ouData, isLoading: isOuLoading} = useGetOrganizationUnits({limit: 2, offset: 0}, !selectedProject);
  const ouList: OrganizationUnit[] = selectedProject ? [selectedProject] : (ouData?.organizationUnits ?? []);
  const rootCount = selectedProject ? 1 : (ouData?.totalResults ?? 0);
  const singleRootId = rootCount === 1 ? ouList[0]?.id : undefined;

  const {data: childData, isLoading: isChildLoading} = useGetChildOrganizationUnits(singleRootId, {
    limit: 1,
    offset: 0,
  });

  const hasMultipleRoots = rootCount > 1;
  const singleRootHasChildren = rootCount === 1 && (childData?.totalResults ?? 0) > 0;

  return {
    hasMultipleOUs: hasMultipleRoots || singleRootHasChildren,
    isLoading: (!selectedProject && isOuLoading) || (rootCount === 1 && isChildLoading),
    ouList,
  };
}
