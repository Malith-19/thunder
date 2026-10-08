// Copyright 2025 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

import App from './App';
import withConfig from './hocs/withConfig';
import withI18n from './hocs/withI18n';
import withProjects from './hocs/withProjects';
import withRuntimeUrl from './hocs/withRuntimeUrl';
import withTheme from './hocs/withTheme';

const AppWithDecorators = withConfig(withTheme(withI18n(withRuntimeUrl(withProjects(App)))));

export default AppWithDecorators;
