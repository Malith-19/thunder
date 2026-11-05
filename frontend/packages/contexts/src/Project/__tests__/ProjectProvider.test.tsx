// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {act, type ReactNode} from 'react';
import {createRoot, type Root} from 'react-dom/client';
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import ProjectProvider from '../ProjectProvider';
import useProject from '../useProject';

function ProjectId() {
  const project = useProject();
  return <span data-testid="project-id">{project ? `${project.projectId}:${project.projectHandle}` : 'none'}</span>;
}

let container: HTMLDivElement;
let root: Root;

function render(children: ReactNode) {
  act(() => {
    root.render(children);
  });
}

function projectId(): string {
  return container.querySelector('[data-testid="project-id"]')?.textContent ?? '';
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

describe('useProject', () => {
  it('returns the project supplied by the provider', () => {
    render(
      <ProjectProvider project={{projectId: 'project-1', projectHandle: 'billing'}}>
        <ProjectId />
      </ProjectProvider>,
    );

    expect(projectId()).toBe('project-1:billing');
  });

  it('returns undefined outside a provider', () => {
    render(<ProjectId />);

    expect(projectId()).toBe('none');
  });

  it('returns undefined when the provider has no project', () => {
    render(
      <ProjectProvider>
        <ProjectId />
      </ProjectProvider>,
    );

    expect(projectId()).toBe('none');
  });

  it('returns undefined when the provider has an empty project ID', () => {
    render(
      <ProjectProvider project={{projectId: '', projectHandle: 'billing'}}>
        <ProjectId />
      </ProjectProvider>,
    );

    expect(projectId()).toBe('none');
  });
});
