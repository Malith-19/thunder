// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {ProjectContext, type Project, type ProjectContextType} from '@thunderid/contexts';
import {render, screen, userEvent, within} from '@thunderid/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import ProjectSwitcher from '../ProjectSwitcher';

const mockMutate = vi.fn();
const mockReset = vi.fn();
let mockMutationState: {error: Error | null; isPending: boolean} = {error: null, isPending: false};

vi.mock('@thunderid/configure-organization-units', () => ({
  useCreateOrganizationUnit: () => ({mutate: mockMutate, reset: mockReset, ...mockMutationState}),
}));

const projects: Project[] = [
  {id: 'ou-default', handle: 'default', name: 'Default'},
  {id: 'ou-finance', handle: 'finance', name: 'Finance'},
];

function renderSwitcher(overrides: Partial<ProjectContextType> = {}) {
  const selectProject = vi.fn();
  const value: ProjectContextType = {
    projects,
    selectedProject: projects[0],
    selectProject,
    isLoading: false,
    ...overrides,
  };
  render(
    <ProjectContext.Provider value={value}>
      <ProjectSwitcher />
    </ProjectContext.Provider>,
  );
  return {selectProject: value.selectProject};
}

async function openCreateDialog(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('combobox', {name: 'Project'}));
  await user.click(await screen.findByRole('option', {name: 'New project'}));
  return screen.findByRole('dialog');
}

describe('ProjectSwitcher', () => {
  beforeEach(() => {
    mockMutationState = {error: null, isPending: false};
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show the selected project', () => {
    renderSwitcher();

    expect(screen.getByRole('combobox', {name: 'Project'})).toHaveTextContent('Default');
  });

  it('should list the organization level, every project and the option to create one', async () => {
    const user = userEvent.setup();
    renderSwitcher();

    await user.click(screen.getByRole('combobox', {name: 'Project'}));

    const listbox = await screen.findByRole('listbox');
    expect(
      within(listbox)
        .getAllByRole('option')
        .map((option) => option.textContent),
    ).toEqual(['Organization', 'Default', 'Finance', 'New project']);
  });

  it('should show the organization level when no project is selected', () => {
    renderSwitcher({selectedProject: null});

    expect(screen.getByRole('combobox', {name: 'Project'})).toHaveTextContent('Organization');
  });

  it('should clear the project filter when the organization level is chosen', async () => {
    const user = userEvent.setup();
    const {selectProject} = renderSwitcher();

    await user.click(screen.getByRole('combobox', {name: 'Project'}));
    await user.click(await screen.findByRole('option', {name: 'Organization'}));

    expect(selectProject).toHaveBeenCalledWith(null);
  });

  it('should select the chosen project', async () => {
    const user = userEvent.setup();
    const {selectProject} = renderSwitcher();

    await user.click(screen.getByRole('combobox', {name: 'Project'}));
    await user.click(await screen.findByRole('option', {name: 'Finance'}));

    expect(selectProject).toHaveBeenCalledWith('ou-finance');
  });

  it('should be disabled while projects load', () => {
    renderSwitcher({isLoading: true});

    expect(screen.getByRole('combobox', {name: 'Project'})).toHaveAttribute('aria-disabled', 'true');
  });

  it('should open the create dialog without changing the selection', async () => {
    const user = userEvent.setup();
    const {selectProject} = renderSwitcher();

    const dialog = await openCreateDialog(user);

    expect(within(dialog).getByText('Create a project')).toBeInTheDocument();
    expect(selectProject).not.toHaveBeenCalled();
  });

  it('should derive the handle from the name until the handle is edited', async () => {
    const user = userEvent.setup();
    renderSwitcher();
    const dialog = await openCreateDialog(user);
    const nameInput = within(dialog).getByRole('textbox', {name: 'Name'});
    const handleInput = within(dialog).getByRole('textbox', {name: 'Handle'});

    await user.type(nameInput, 'Car Insurance!');
    expect(handleInput).toHaveValue('car-insurance');

    await user.clear(handleInput);
    await user.type(handleInput, 'car');
    await user.type(nameInput, ' EU');
    expect(handleInput).toHaveValue('car');
  });

  it('should create the project as a root organization unit and select it', async () => {
    const user = userEvent.setup();
    const {selectProject} = renderSwitcher();
    mockMutate.mockImplementation((_request: unknown, options: {onSuccess: (created: {id: string}) => void}) =>
      options.onSuccess({id: 'ou-hr'}),
    );
    const dialog = await openCreateDialog(user);

    await user.type(within(dialog).getByRole('textbox', {name: 'Name'}), 'HR');
    await user.click(within(dialog).getByRole('button', {name: 'Create'}));

    expect(mockMutate).toHaveBeenCalledWith({name: 'HR', handle: 'hr', parent: null}, expect.any(Object));
    expect(selectProject).toHaveBeenCalledWith('ou-hr');
  });

  it('should keep the create button disabled until a name and handle are given', async () => {
    const user = userEvent.setup();
    renderSwitcher();
    const dialog = await openCreateDialog(user);

    expect(within(dialog).getByRole('button', {name: 'Create'})).toBeDisabled();
  });

  it('should show the error when the project cannot be created', async () => {
    const user = userEvent.setup();
    mockMutationState = {error: new Error('boom'), isPending: false};
    renderSwitcher();

    const dialog = await openCreateDialog(user);

    expect(within(dialog).getByRole('alert')).toBeInTheDocument();
  });
});
