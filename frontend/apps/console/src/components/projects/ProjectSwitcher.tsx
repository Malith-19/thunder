// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {useProject} from '@thunderid/contexts';
import {getErrorMessage} from '@thunderid/utils';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@wso2/oxygen-ui';
import {useState, type JSX} from 'react';
import {useTranslation} from 'react-i18next';
import useCreateProject from './api/useCreateProject';

const ORGANIZATION = '__organization__';
const CREATE_PROJECT = '__create__';

function toHandle(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Header control for choosing the project the Console shows, or the organization level to see
 * every resource without the project filter, or creating a new project.
 */
export default function ProjectSwitcher(): JSX.Element {
  const {t} = useTranslation();
  const {projects, selectedProject, selectProject, isLoading} = useProject();
  const createProject = useCreateProject();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [handleEdited, setHandleEdited] = useState(false);

  const closeDialog = (): void => {
    setDialogOpen(false);
    setName('');
    setHandle('');
    setHandleEdited(false);
    createProject.reset();
  };

  const handleSelect = (value: string): void => {
    if (value === CREATE_PROJECT) {
      setDialogOpen(true);
      return;
    }
    selectProject(value === ORGANIZATION ? null : value);
  };

  const handleCreate = (): void => {
    createProject.mutate(
      {name: name.trim(), handle: handle.trim()},
      {
        onSuccess: (created) => {
          selectProject(created.id);
          closeDialog();
        },
      },
    );
  };

  return (
    <>
      <FormControl size="small" sx={{minWidth: 200}}>
        <Select
          value={isLoading ? '' : (selectedProject?.id ?? ORGANIZATION)}
          onChange={(event) => handleSelect(String(event.target.value))}
          disabled={isLoading}
          inputProps={{'aria-label': t('common:projects.switcher.label', 'Project')}}
        >
          <MenuItem value={ORGANIZATION} divider>
            {t('common:projects.switcher.organization', 'Organization')}
          </MenuItem>
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
          <MenuItem value={CREATE_PROJECT}>{t('common:projects.switcher.create', 'New project')}</MenuItem>
        </Select>
      </FormControl>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{t('common:projects.create.title', 'Create a project')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{pt: 1}}>
            <DialogContentText>
              {t(
                'common:projects.create.description',
                'A project groups the applications and configuration of one product. It is stored as a root organization unit.',
              )}
            </DialogContentText>
            <TextField
              label={t('common:projects.create.name', 'Name')}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (!handleEdited) setHandle(toHandle(event.target.value));
                createProject.reset();
              }}
              fullWidth
            />
            <TextField
              label={t('common:projects.create.handle', 'Handle')}
              value={handle}
              onChange={(event) => {
                setHandle(event.target.value);
                setHandleEdited(true);
                createProject.reset();
              }}
              helperText={t('common:projects.create.handleHelp', 'Used to identify the project in every environment.')}
              fullWidth
            />
            {createProject.error && (
              <Alert severity="error">
                {getErrorMessage(
                  createProject.error,
                  (key, options) => t(key, options),
                  'common:projects.create.error',
                  'Could not create the project.',
                )}
              </Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{t('common:projects.create.cancel', 'Cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={!name.trim() || !handle.trim() || createProject.isPending}
          >
            {t('common:projects.create.submit', 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
