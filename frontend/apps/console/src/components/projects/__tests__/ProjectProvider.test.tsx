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
  {id: 'prj-default', handle: 'default', name: 'Default', isDefault: true},
  {id: 'prj-hr', handle: 'hr', name: 'HR'},
];

function Probe(): JSX.Element {
  const {isEnabled, projects: available, selectedProject, selectProject, isLoading} = useProject();
  return (
    <div>
      <span data-testid="enabled">{String(isEnabled)}</span>
      <span data-testid="selected">{selectedProject?.id ?? 'none'}</span>
      <span data-testid="count">{available.length}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <button type="button" onClick={() => selectProject('prj-hr')}>
        select hr
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
      data: {totalResults: 3, startIndex: 1, count: 3, projects},
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

    expect(screen.getByTestId('enabled')).toHaveTextContent('true');
    expect(screen.getByTestId('count')).toHaveTextContent('3');
  });

  it('should disable the project scope when the server has no projects', () => {
    mockUseGetProjects.mockReturnValue({data: undefined, isLoading: false, isError: true});
    renderProvider();

    expect(screen.getByTestId('enabled')).toHaveTextContent('false');
    expect(screen.getByTestId('selected')).toHaveTextContent('none');
  });

  it('should disable the project scope when a refetch fails, even with an earlier answer cached', () => {
    mockUseGetProjects.mockReturnValue({
      data: {totalResults: 0, startIndex: 1, count: 0, projects: []},
      isLoading: false,
      isError: true,
    });
    renderProvider();

    expect(screen.getByTestId('enabled')).toHaveTextContent('false');
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('should start in the default project when nothing is stored', () => {
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('prj-default');
  });

  it('should fall back to the first project when there is no default project', () => {
    mockUseGetProjects.mockReturnValue({
      data: {totalResults: 1, startIndex: 1, count: 1, projects: [projects[2]]},
      isLoading: false,
    });
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('prj-hr');
  });

  it('should reopen on the stored project', () => {
    window.localStorage.setItem(STORAGE_KEY, 'prj-finance');
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('prj-finance');
  });

  it('should ignore a stored project that no longer exists', () => {
    window.localStorage.setItem(STORAGE_KEY, 'prj-deleted');
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('prj-default');
  });

  it('should select and persist a project', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', {name: 'select hr'}));
    expect(screen.getByTestId('selected')).toHaveTextContent('prj-hr');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('prj-hr');
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

    expect(screen.getByTestId('selected')).toHaveTextContent('prj-default');
    await user.click(screen.getByRole('button', {name: 'select hr'}));
    expect(screen.getByTestId('selected')).toHaveTextContent('prj-hr');
  });
});
