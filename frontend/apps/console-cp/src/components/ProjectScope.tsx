// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import {PageLoader, QueryErrorNotice} from '@thunderid/components';
import {ProjectProvider, RoutesProvider} from '@thunderid/contexts';
import {Alert, PageContent} from '@wso2/oxygen-ui';
import {useMemo, type JSX} from 'react';
import {useTranslation} from 'react-i18next';
import {Outlet, useParams} from 'react-router';
import useGetAllProjects from '../api/useGetAllProjects';
import {buildProjectRouteConfig} from '../configs/RouteConfig';

/**
 * Scopes the routes below it to the project whose handle the URL names, so their applications
 * and agents lists show only the project's resources and their links stay in the project view.
 * The handle is resolved to the project's ID from the project list, which stays in memory once
 * fetched.
 */
export default function ProjectScope(): JSX.Element {
  const {t} = useTranslation();
  const {projectHandle = ''} = useParams();
  const {data: projects, isLoading, error, refetch} = useGetAllProjects();

  const projectId = projects?.find((project) => project.handle === projectHandle)?.id;
  const paths = useMemo(() => buildProjectRouteConfig(projectHandle), [projectHandle]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <PageContent>
        <QueryErrorNotice
          error={error}
          t={t}
          title={t('navigation:project.loadError', 'Failed to load the project')}
          onRetry={() => void refetch()}
        />
      </PageContent>
    );
  }

  if (!projectId) {
    return (
      <PageContent>
        <Alert severity="warning">{t('navigation:project.notFound', 'Project not found')}</Alert>
      </PageContent>
    );
  }

  return (
    <ProjectProvider project={{projectId, projectHandle}}>
      <RoutesProvider paths={paths}>
        <Outlet />
      </RoutesProvider>
    </ProjectProvider>
  );
}
