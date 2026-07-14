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
import { type UseMutationResult } from '@tanstack/react-query';
import type { CreateTranslationsVariables } from '../models/requests';
import type { TranslationsResponse } from '../models/responses';
/**
 * Custom hook to bulk-create translations for a new language.
 *
 * Sends a single POST request with the full translations bundle to
 * `POST /i18n/languages/{language}/translations`.
 *
 * @returns TanStack Query mutation object for creating translations
 *
 * @example
 * ```tsx
 * function CreateLanguagePage() {
 *   const createTranslations = useCreateTranslations();
 *
 *   const handleCreate = () => {
 *     createTranslations.mutate(
 *       {language: 'fr-FR', translations: {'common': {'hello': 'Bonjour'}}},
 *       {
 *         onSuccess: () => navigate('/translations/fr-FR'),
 *         onError: (error) => console.error('Failed to create:', error),
 *       },
 *     );
 *   };
 * }
 * ```
 */
export default function useCreateTranslations(): UseMutationResult<TranslationsResponse, Error, CreateTranslationsVariables>;
