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
import { User, Preferences } from '@thunderid/browser';
import { FC, ReactElement } from 'react';
interface ExtendedFlatSchema {
    path?: string;
    schemaId?: string;
}
interface Schema extends ExtendedFlatSchema {
    caseExact?: boolean;
    description?: string;
    displayName?: string;
    displayOrder?: string;
    multiValued?: boolean;
    mutability?: string;
    name?: string;
    required?: boolean;
    returned?: string;
    subAttributes?: Schema[];
    type?: string;
    uniqueness?: string;
    value?: any;
}
export interface BaseUserProfileProps {
    attributeMapping?: {
        [key: string]: string | string[] | undefined;
        firstName?: string | string[];
        lastName?: string | string[];
        picture?: string | string[];
        username?: string | string[];
    };
    cardLayout?: boolean;
    className?: string;
    displayNameAttributes?: string[];
    editable?: boolean;
    error?: string | null;
    fallback?: ReactElement | null;
    flattenedProfile?: User;
    hideFields?: string[];
    isLoading?: boolean;
    mode?: 'inline' | 'popup';
    onOpenChange?: (open: boolean) => void;
    onUpdate?: (payload: any) => Promise<void>;
    open?: boolean;
    /**
     * Component-level preferences to override global i18n and theme settings.
     * Preferences are deep-merged with global ones, with component preferences
     * taking precedence. Affects this component and all its descendants.
     */
    preferences?: Preferences;
    profile?: User;
    schemas?: Schema[];
    showFields?: string[];
    title?: string;
}
declare const BaseUserProfile: FC<BaseUserProfileProps>;
export default BaseUserProfile;
//# sourceMappingURL=BaseUserProfile.d.ts.map