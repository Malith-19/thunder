// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useProject} from '@thunderid/contexts';
import {render, screen, userEvent} from '@thunderid/test-utils';
import type {JSX} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import ProjectProvider from '../ProjectProvider';

const STORAGE_KEY = 'thunderid.console.selectedProjectId';

const mockUseGetProjects = vi.fn();
let mockIsSignedIn = true;

vi.mock('../api/useGetProjects', () => ({
  default: (...args: unknown[]): unknown => mockUseGetProjects(...args),
}));

vi.mock('@thunderid/react', () => ({
  useThunderID: () => ({isSignedIn: mockIsSignedIn}),
}));

const projects = [
  {id: 'prj-finance', handle: 'finance', name: 'Finance'},
  {id: 'prj-hr', handle: 'hr', name: 'HR'},
];

function Probe(): JSX.Element {
  const {projects: available, selectedProject, selectProject, isLoading} = useProject();
  return (
    <div>
      <span data-testid="selected">{selectedProject?.id ?? 'organization'}</span>
      <span data-testid="count">{available.length}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <button type="button" onClick={() => selectProject('prj-hr')}>
        select hr
      </button>
      <button type="button" onClick={() => selectProject(null)}>
        select organization
      </button>
    </div>
  );
}

function renderProvider() {
  return render(
    <ProjectProvider>
      <Probe />
    </ProjectProvider>,
  );
}

describe('ProjectProvider', () => {
  beforeEach(() => {
    mockIsSignedIn = true;
    window.localStorage.clear();
    mockUseGetProjects.mockReturnValue({
      data: {totalResults: 2, startIndex: 1, count: 2, projects},
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should load projects only once signed in', () => {
    mockIsSignedIn = false;
    renderProvider();

    expect(mockUseGetProjects).toHaveBeenCalledWith(false);
  });

  it('should expose the projects from the project API', () => {
    renderProvider();

    expect(screen.getByTestId('count')).toHaveTextContent('2');
  });

  it('should start at the organization level when nothing is stored', () => {
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('organization');
  });

  it('should reopen on the stored project', () => {
    window.localStorage.setItem(STORAGE_KEY, 'prj-finance');
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('prj-finance');
  });

  it('should ignore a stored project that no longer exists', () => {
    window.localStorage.setItem(STORAGE_KEY, 'prj-deleted');
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('organization');
  });

  it('should select and persist a project, then the organization level', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', {name: 'select hr'}));
    expect(screen.getByTestId('selected')).toHaveTextContent('prj-hr');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('prj-hr');

    await user.click(screen.getByRole('button', {name: 'select organization'}));
    expect(screen.getByTestId('selected')).toHaveTextContent('organization');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('should still work when local storage throws', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage disabled');
    });
    const user = userEvent.setup();
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('organization');
    await user.click(screen.getByRole('button', {name: 'select hr'}));
    expect(screen.getByTestId('selected')).toHaveTextContent('prj-hr');
  });
});
