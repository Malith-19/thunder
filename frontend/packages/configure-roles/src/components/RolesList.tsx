// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {QueryErrorNotice} from '@thunderid/components';
import {useProject} from '@thunderid/contexts';
import {useDataGridLocaleText} from '@thunderid/hooks';
import {useLogger} from '@thunderid/logger/react';
import {IconButton, Typography, Tooltip, DataGrid, ListingTable} from '@wso2/oxygen-ui';
import {Eye, Pencil, Trash2} from '@wso2/oxygen-ui-icons-react';
import {useMemo, useCallback, useState, type JSX} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import RoleDeleteDialog from './RoleDeleteDialog';
import useGetRoles from '../api/useGetRoles';
import useRoleRoutes from '../hooks/useRoleRoutes';
import type {RoleSummary} from '../models/role';

/**
 * DataGrid component for displaying the list of roles.
 */
export default function RolesList(): JSX.Element {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const logger = useLogger('RolesList');
  const dataGridLocaleText = useDataGridLocaleText();
  const routes = useRoleRoutes();
  const [paginationModel, setPaginationModel] = useState<DataGrid.GridPaginationModel>({pageSize: 10, page: 0});
  const {selectedProject} = useProject();
  // A page number means nothing in another project, so switching projects starts from the first page.
  const [pagedProjectId, setPagedProjectId] = useState<string | undefined>(selectedProject?.id);
  const isPagedProject = pagedProjectId === selectedProject?.id;
  if (!isPagedProject) {
    setPagedProjectId(selectedProject?.id);
    setPaginationModel((prev) => ({...prev, page: 0}));
  }
  // The reset above only lands on the next render, so this render already asks for the first page.
  const currentPaginationModel = isPagedProject ? paginationModel : {...paginationModel, page: 0};

  const rolesParams = useMemo(
    () => ({
      limit: currentPaginationModel.pageSize,
      offset: currentPaginationModel.page * currentPaginationModel.pageSize,
      projectId: selectedProject?.id,
    }),
    [currentPaginationModel.pageSize, currentPaginationModel.page, selectedProject?.id],
  );
  const {data, isLoading, error, refetch} = useGetRoles(rolesParams);

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleViewClick = useCallback(
    (roleId: string): void => {
      (async (): Promise<void> => {
        await navigate(routes.roles.detail(roleId));
      })().catch((_error: unknown) => {
        logger.error('Failed to navigate to role details', {error: _error, roleId});
      });
    },
    [navigate, logger, routes.roles],
  );

  const handleDeleteClick = useCallback((roleId: string): void => {
    setSelectedRoleId(roleId);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteDialogClose = (): void => {
    setDeleteDialogOpen(false);
    setSelectedRoleId(null);
  };

  const columns: DataGrid.GridColDef<RoleSummary>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('roles:listing.columns.name'),
        flex: 1,
        minWidth: 200,
        renderCell: (params: DataGrid.GridRenderCellParams<RoleSummary>): JSX.Element => (
          <Typography variant="body2">{params.row.name}</Typography>
        ),
      },
      {
        field: 'description',
        headerName: t('roles:listing.columns.description'),
        flex: 1.5,
        minWidth: 250,
        valueGetter: (_value, row): string => row.description ?? '-',
      },
      {
        field: 'ouHandle',
        headerName: t('roles:listing.columns.organizationUnit'),
        flex: 1,
        minWidth: 200,
        renderCell: (params: DataGrid.GridRenderCellParams<RoleSummary>) => (
          <Typography variant="body2" sx={{fontFamily: 'monospace', fontSize: '0.875rem'}}>
            {params.row.ouHandle ?? params.row.ouId ?? '-'}
          </Typography>
        ),
      },
      {
        field: 'actions',
        headerName: t('roles:listing.columns.actions'),
        width: 150,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        filterable: false,
        hideable: false,
        renderCell: (params: DataGrid.GridRenderCellParams<RoleSummary>): JSX.Element => (
          <ListingTable.RowActions>
            {params.row.isReadOnly ? (
              <Tooltip title={t('common:status.readOnly', 'Read Only')}>
                <IconButton size="small" disableRipple sx={{cursor: 'default'}}>
                  <Eye size={16} />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Tooltip title={t('common:actions.edit')}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewClick(params.row.id);
                    }}
                  >
                    <Pencil size={16} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('common:actions.delete')}>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(params.row.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </ListingTable.RowActions>
        ),
      },
    ],
    [handleDeleteClick, handleViewClick, t],
  );

  if (error) {
    return (
      <QueryErrorNotice
        error={error}
        t={t}
        variant="block"
        title={t('roles:listing.error', 'Failed to load roles')}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <>
      <ListingTable.Provider variant="data-grid-card" loading={isLoading}>
        <ListingTable.Container disablePaper>
          <ListingTable.DataGrid
            rows={data?.roles ?? []}
            columns={columns}
            getRowId={(row) => (row as RoleSummary).id}
            onRowClick={(params) => {
              const roleId = (params.row as RoleSummary).id;
              (async (): Promise<void> => {
                await navigate(routes.roles.detail(roleId));
              })().catch((_error: unknown) => {
                logger.error('Failed to navigate to role', {error: _error, roleId});
              });
            }}
            paginationMode="server"
            rowCount={data?.totalResults ?? 0}
            paginationModel={currentPaginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            // Filtering is not wired end to end, so the column filter panel stays hidden.
            disableColumnFilter
            localeText={dataGridLocaleText}
            autoHeight
            sx={{
              '& .MuiDataGrid-row': {cursor: 'pointer'},
            }}
          />
        </ListingTable.Container>
      </ListingTable.Provider>

      <RoleDeleteDialog open={deleteDialogOpen} roleId={selectedRoleId} onClose={handleDeleteDialogClose} />
    </>
  );
}
