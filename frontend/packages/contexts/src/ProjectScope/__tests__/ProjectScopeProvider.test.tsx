// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {act, type ReactNode} from 'react';
import {createRoot, type Root} from 'react-dom/client';
import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import ProjectScopeProvider from '../ProjectScopeProvider';
import useProjectScope from '../useProjectScope';

function ProjectId() {
  return <span data-testid="project-id">{useProjectScope().projectId ?? 'none'}</span>;
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
  act(() => root.unmount());
  container.remove();
});

describe('ProjectScopeProvider', () => {
  it('has no project without a provider', () => {
    render(<ProjectId />);

    expect(projectId()).toBe('none');
  });

  it('provides the selected project', () => {
    render(
      <ProjectScopeProvider projectId="p1">
        <ProjectId />
      </ProjectScopeProvider>,
    );

    expect(projectId()).toBe('p1');
  });

  it('treats an empty project ID as no project', () => {
    render(
      <ProjectScopeProvider projectId="">
        <ProjectId />
      </ProjectScopeProvider>,
    );

    expect(projectId()).toBe('none');
  });
});
