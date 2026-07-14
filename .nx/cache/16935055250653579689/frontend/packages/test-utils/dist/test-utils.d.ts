/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { QueryClient } from '@tanstack/react-query';
import { type RenderOptions, type RenderHookOptions, type RenderResult } from '@testing-library/react';
import { type ReactElement } from 'react';
/**
 * Configuration options for test utilities
 */
export interface ThunderTestConfig {
    /**
     * Base path for the application (e.g., '/console', '/gate')
     */
    base: string;
    /**
     * Client ID for the application
     */
    clientId: string;
    /**
     * Server hostname
     * @default 'localhost'
     */
    hostname?: string;
    /**
     * Server port
     * @default 8090
     */
    port?: number;
    /**
     * Whether to use HTTP only
     * @default false
     */
    httpOnly?: boolean;
}
/**
 * The CSS class name prefix used by cn() during tests.
 * Import this instead of hardcoding the product name in test assertions.
 */
export declare const TEST_CN_PREFIX = "ThunderID";
/**
 * Configure the test utilities with app-specific settings
 * Call this in your test setup file before running tests
 */
export declare function configureTestUtils(config: ThunderTestConfig): void;
declare function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult;
/**
 * Alternative render function with providers
 * Alias for customRender to support different naming conventions
 */
export declare function renderWithProviders(ui: ReactElement, options?: RenderOptions): RenderResult;
interface RenderHookWithQueryClientOptions<Props> extends Omit<RenderHookOptions<Props>, 'wrapper'> {
    queryClient?: QueryClient;
}
/**
 * Custom renderHook function that includes providers
 * Wraps hooks with necessary context providers for testing
 * Optionally accepts a queryClient for tests that need direct access to manipulate cache or spy on methods
 * Returns the queryClient instance for convenience
 */
export declare function renderHook<Result, Props>(hook: (props: Props) => Result, options?: RenderHookWithQueryClientOptions<Props>): {
    queryClient: QueryClient;
    rerender: (props?: Props | undefined) => void;
    result: {
        current: Result;
    };
    unmount: () => void;
};
/**
 * Helper to get element by translation key
 * Useful when using mocked translations that return keys
 */
export declare function getByTranslationKey(container: HTMLElement, key: string): Element | undefined;
export default customRender;
