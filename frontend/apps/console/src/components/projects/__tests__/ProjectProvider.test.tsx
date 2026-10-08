// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useProject} from '@thunderid/contexts';
import {render, screen, userEvent} from '@thunderid/test-utils';
import type {JSX} from 'react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import ProjectProvider from '../ProjectProvider';

const STORAGE_KEY = 'thunderid.console.selectedProjectId';

const mockUseGetOrganizationUnits = vi.fn();
let mockIsSignedIn = true;

vi.mock('@thunderid/configure-organization-units', () => ({
  useGetOrganizationUnits: (...args: unknown[]): unknown => mockUseGetOrganizationUnits(...args),
}));

vi.mock('@thunderid/react', () => ({
  useThunderID: () => ({isSignedIn: mockIsSignedIn}),
}));

const rootOus = [
  {id: 'ou-car', handle: 'car', name: 'Car insurance', description: 'Car', parent: null},
  {id: 'ou-default', handle: 'default', name: 'Default', description: null, parent: null},
  {id: 'ou-life', handle: 'life', name: 'Life insurance', description: null, parent: null},
];

function Probe(): JSX.Element {
  const {projects, selectedProject, selectProject, isLoading} = useProject();
  return (
    <div>
      <span data-testid="selected">{selectedProject?.id ?? 'none'}</span>
      <span data-testid="count">{projects.length}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <button type="button" onClick={() => selectProject('ou-life')}>
        select life
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
    mockUseGetOrganizationUnits.mockReturnValue({
      data: {totalResults: 3, startIndex: 1, count: 3, organizationUnits: rootOus},
      isLoading: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('should load root organization units as projects only once signed in', () => {
    mockIsSignedIn = false;
    renderProvider();

    expect(mockUseGetOrganizationUnits).toHaveBeenCalledWith({limit: 100}, false);
  });

  it('should expose every root organization unit as a project', () => {
    renderProvider();

    expect(mockUseGetOrganizationUnits).toHaveBeenCalledWith({limit: 100}, true);
    expect(screen.getByTestId('count')).toHaveTextContent('3');
  });

  it('should default to the project with the default handle', () => {
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('ou-default');
  });

  it('should honor the stored project id when it matches a project', () => {
    window.localStorage.setItem(STORAGE_KEY, 'ou-car');
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('ou-car');
  });

  it('should ignore a stored project id that matches no project', () => {
    window.localStorage.setItem(STORAGE_KEY, 'ou-deleted');
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('ou-default');
  });

  it('should fall back to the first project when there is no default project', () => {
    mockUseGetOrganizationUnits.mockReturnValue({
      data: {totalResults: 2, startIndex: 1, count: 2, organizationUnits: [rootOus[0], rootOus[2]]},
      isLoading: false,
    });
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('ou-car');
  });

  it('should select no project while projects are loading', () => {
    mockUseGetOrganizationUnits.mockReturnValue({data: undefined, isLoading: true});
    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('none');
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('loading')).toHaveTextContent('true');
  });

  it('should select and persist a project', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', {name: 'select life'}));

    expect(screen.getByTestId('selected')).toHaveTextContent('ou-life');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('ou-life');
  });

  it('should select and persist the organization level', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', {name: 'select organization'}));

    expect(screen.getByTestId('selected')).toHaveTextContent('none');
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('organization');
  });

  it('should reopen on the organization level when it was the last choice', () => {
    window.localStorage.setItem(STORAGE_KEY, 'organization');

    renderProvider();

    expect(screen.getByTestId('selected')).toHaveTextContent('none');
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

    expect(screen.getByTestId('selected')).toHaveTextContent('ou-default');

    await user.click(screen.getByRole('button', {name: 'select life'}));

    expect(screen.getByTestId('selected')).toHaveTextContent('ou-life');
  });
});
