// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import type {JSX, ComponentType} from 'react';
import ProjectProvider from '../components/projects/ProjectProvider';

export default function withProjects<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithProjects(props: P): JSX.Element {
    return (
      <ProjectProvider>
        <WrappedComponent {...props} />
      </ProjectProvider>
    );
  };
}
