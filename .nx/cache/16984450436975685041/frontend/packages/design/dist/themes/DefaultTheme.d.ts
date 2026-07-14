/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { type OxygenThemeType } from '@wso2/oxygen-ui';
/**
 * DefaultTheme - The default theme for Thunder ID applications
 * Features: Electric blue primary, indigo secondary, deep purple dark backgrounds with ambient glow
 * Evokes intelligence, creativity, and cutting-edge AI aesthetics
 */
export declare const DefaultThemeConfig: {
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: string;
                    dark: string;
                    light: string;
                    contrastText: string;
                };
                secondary: {
                    main: string;
                    dark: string;
                    light: string;
                    contrastText: string;
                };
                warning: {
                    main: string;
                    contrastText: string;
                };
                error: {
                    main: string;
                    contrastText: string;
                };
                info: {
                    main: string;
                    contrastText: string;
                };
                success: {
                    main: string;
                    contrastText: string;
                };
                background: {
                    default: string;
                    paper: string;
                    acrylic: string;
                };
                text: {
                    primary: string;
                    secondary: string;
                };
            };
        };
        dark: {
            palette: {
                primary: {
                    main: string;
                    dark: string;
                    light: string;
                    contrastText: string;
                };
                secondary: {
                    main: string;
                    dark: string;
                    light: string;
                    contrastText: string;
                };
                warning: {
                    main: string;
                    contrastText: string;
                };
                error: {
                    main: string;
                    contrastText: string;
                };
                info: {
                    main: string;
                    contrastText: string;
                };
                success: {
                    main: string;
                    contrastText: string;
                };
                background: {
                    default: string;
                    paper: string;
                    acrylic: string;
                };
                text: {
                    primary: string;
                    secondary: string;
                };
            };
        };
    };
    shape: {
        borderRadius: number;
    };
    blur: {
        none: string;
        light: string;
        medium: string;
        heavy: string;
    };
    gradient: {
        primary: string;
        secondary: string;
    };
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "html[data-color-scheme='dark'] body": {
                    backgroundAttachment: string;
                    backgroundImage: string;
                    backgroundBlendMode: string;
                };
                "html[data-color-scheme='light'] body": {
                    backgroundAttachment: string;
                    backgroundImage: string;
                };
            };
        };
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    backgroundColor: string;
                    WebkitBackdropFilter: string;
                    backdropFilter: string;
                    backgroundImage: string;
                };
            };
        };
        MuiButton: {
            styleOverrides: {
                root: {
                    transition: string;
                };
                contained: ({ ownerState }: {
                    theme: OxygenThemeType;
                    ownerState: {
                        color?: string;
                    };
                }) => {
                    color?: undefined;
                    background?: undefined;
                    '&:hover'?: undefined;
                } | {
                    color: string;
                    background: string;
                    '&:hover': {
                        background: string;
                    };
                };
                containedSecondary: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    '&:hover': {
                        backgroundColor: string;
                    };
                };
                outlined: ({ theme, ownerState }: {
                    theme: OxygenThemeType;
                    ownerState: {
                        color?: string;
                    };
                }) => {
                    color?: undefined;
                    borderColor?: undefined;
                    '&:hover'?: undefined;
                } | {
                    color: string;
                    borderColor: string;
                    '&:hover': {
                        backgroundColor: string;
                        borderColor: string;
                        color: string;
                    };
                };
                outlinedSecondary: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    color: string;
                    borderColor: string;
                    '&:hover': {
                        backgroundColor: string;
                        borderColor: string;
                    };
                };
                text: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    color: string;
                    '&:hover': {
                        backgroundColor: string;
                        color: string;
                    };
                };
                textSecondary: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    color: string;
                    '&:hover': {
                        backgroundColor: string;
                    };
                };
            };
        };
        MuiChip: {
            styleOverrides: {
                outlined: {
                    borderColor: string;
                };
            };
        };
        MuiLinearProgress: {
            defaultProps: {
                color: string;
            };
            styleOverrides: {
                root: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    '&.MuiLinearProgress-colorPrimary': {
                        backgroundColor: string;
                    };
                };
                bar: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    '&.MuiLinearProgress-barColorPrimary': {
                        backgroundColor: string;
                    };
                };
            };
        };
        MuiLink: {
            styleOverrides: {
                root: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    color: string;
                    textDecoration: string;
                };
            };
        };
        MuiTextField: {
            defaultProps: {
                size: string;
            };
        };
        MuiSelect: {
            defaultProps: {
                size: string;
            };
        };
        MuiAutocomplete: {
            defaultProps: {
                size: string;
            };
        };
        MuiDataGrid: {
            styleOverrides: {
                panelContent: {
                    "html[data-color-scheme='dark'] &": {
                        '--DataGrid-t-color-background-overlay': string;
                    };
                    "html[data-color-scheme='light'] &": {
                        '--DataGrid-t-color-background-overlay': string;
                    };
                };
            };
        };
        MuiPopover: {
            styleOverrides: {
                paper: ({ theme }: {
                    theme: OxygenThemeType;
                }) => {
                    backgroundColor: string;
                    WebkitBackdropFilter: string;
                    backdropFilter: string;
                    backgroundImage: string;
                };
            };
        };
    };
};
declare const DefaultTheme: OxygenThemeType;
export default DefaultTheme;
