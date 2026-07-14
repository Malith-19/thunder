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
/**
 * Parser options configuration for ESLint TypeScript integration.
 */
export interface ParserOptions {
    projectService: {
        allowDefaultProject: string[];
        defaultProject?: string;
    };
    tsconfigRootDir?: string;
}
/**
 * Creates parser options with dynamic tsconfig resolution and appropriate allowDefaultProject patterns.
 *
 * @param options - Configuration options
 * @param options.additionalPatterns - Additional patterns to include in allowDefaultProject
 * @param options.tsconfigRootDir - Manually specify the tsconfig root directory (overrides auto-detection)
 * @param options.project - Path to tsconfig file to use (e.g., './tsconfig.eslint.json')
 * @returns Parser options object for ESLint TypeScript configuration
 */
export default function createParserOptions(options?: {
    additionalPatterns?: string[];
    tsconfigRootDir?: string;
    project?: string;
} | string[]): ParserOptions;
