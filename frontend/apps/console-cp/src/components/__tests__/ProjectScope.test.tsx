// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useProject, useRoutes} from '@thunderid/contexts';
import {MemoryRouter, Route, Routes} from 'react-router';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import type {RouteConfig} from '../../configs/RouteConfig';
import ProjectScope from '../ProjectScope';

const mockUseGetAllProjects = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: string | {defaultValue?: string}) =>
      (typeof options === 'string' ? options : options?.defaultValue) ?? key,
  }),
}));

vi.mock('../../api/useGetAllProjects', () => ({
  default: () => mockUseGetAllProjects() as unknown,
}));

function ScopedContent() {
  const project = useProject();
  const routes = useRoutes<RouteConfig>();

  return (
    <div data-testid="scoped-content">
      {`${project?.projectId}:${project?.projectHandle}:${routes.applications.list()}`}
    </div>
  );
}

function renderScope(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:projectHandle" element={<ProjectScope />}>
          <Route index element={<ScopedContent />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('ProjectScope', () => {
  beforeEach(() => {
    mockUseGetAllProjects.mockReturnValue({
      data: [
        {id: 'project-1', handle: 'billing', displayName: 'Billing'},
        {id: 'project-2', handle: 'payroll', displayName: 'Payroll'},
      ],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it('scopes its routes to the project the handle names', () => {
    renderScope('/projects/payroll');

    expect(screen.getByTestId('scoped-content')).toHaveTextContent('project-2:payroll:/projects/payroll/applications');
  });

  it('shows a loader while the projects load', () => {
    mockUseGetAllProjects.mockReturnValue({data: undefined, isLoading: true, error: null, refetch: vi.fn()});

    renderScope('/projects/billing');

    expect(screen.queryByTestId('scoped-content')).not.toBeInTheDocument();
  });

  it('says so when no project has the handle', () => {
    renderScope('/projects/unknown');

    expect(screen.getByText('Project not found')).toBeInTheDocument();
    expect(screen.queryByTestId('scoped-content')).not.toBeInTheDocument();
  });

  it('offers a retry when the projects fail to load', async () => {
    const refetch = vi.fn().mockResolvedValue(undefined);
    mockUseGetAllProjects.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
      refetch,
    });

    renderScope('/projects/billing');

    expect(screen.getByText('Failed to load the project')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(refetch).toHaveBeenCalled();
  });
});
