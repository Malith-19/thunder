// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useContext} from 'react';
import ProjectContext, {type ProjectContextType} from './ProjectContext';

/**
 * Returns the host application's project selection.
 *
 * Feature packages use it to scope lists and new resources to the selected project. Without a
 * provider it returns an empty selection, so callers show every resource.
 *
 * @public
 */
export default function useProject(): ProjectContextType {
  return useContext(ProjectContext);
}
