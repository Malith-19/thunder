/**
 * Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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
import { AuthClientConfig } from './models/config';
import { OIDCDiscoveryApiResponse } from './models/oidc-discovery';
import { SessionData } from './models/session';
import { Stores, Storage, TemporaryStore, HybridStore, TemporaryStoreValue } from './models/store';
type PartialData<T> = Partial<AuthClientConfig<T> | OIDCDiscoveryApiResponse | SessionData | TemporaryStore | HybridStore>;
export declare const THUNDERID_SESSION_ACTIVE = "thunderid-session-active";
declare class StorageManager<T> {
    protected id: string;
    protected store: Storage;
    constructor(instanceID: string, store: Storage);
    protected setDataInBulk(key: string, data: PartialData<T>): Promise<void>;
    protected setValue(key: string, attribute: keyof AuthClientConfig<T> | keyof OIDCDiscoveryApiResponse | keyof SessionData | keyof TemporaryStore | keyof HybridStore, value: TemporaryStoreValue): Promise<void>;
    protected removeValue(key: string, attribute: keyof AuthClientConfig<T> | keyof OIDCDiscoveryApiResponse | keyof SessionData | keyof TemporaryStore | keyof HybridStore): Promise<void>;
    protected resolveKey(store: Stores | string, userId?: string, instanceId?: string): string;
    protected static isLocalStorageAvailable(): boolean;
    setConfigData(config: Partial<AuthClientConfig<T>>): Promise<void>;
    setOIDCProviderMetaData(oidcProviderMetaData: Partial<OIDCDiscoveryApiResponse>): Promise<void>;
    setTemporaryData(temporaryData: Partial<TemporaryStore>, userId?: string): Promise<void>;
    setHybridData(hybridData: Partial<HybridStore>, userId?: string): Promise<void>;
    setSessionData(sessionData: Partial<SessionData>, userId?: string): Promise<void>;
    setCustomData<K>(key: string, customData: Partial<K>, userId?: string): Promise<void>;
    getConfigData(userId?: string): Promise<AuthClientConfig<T>>;
    loadOpenIDProviderConfiguration(): Promise<OIDCDiscoveryApiResponse>;
    getTemporaryData(userId?: string): Promise<TemporaryStore>;
    getHybridData(userId?: string): Promise<HybridStore>;
    getPersistedData(userId?: string): Promise<TemporaryStore>;
    setPersistedData(persistedData: Partial<TemporaryStore>, userId?: string): Promise<void>;
    getSessionData(userId?: string, instanceId?: string): Promise<SessionData>;
    getCustomData<K>(key: string, userId?: string): Promise<K>;
    setSessionStatus(status: string): void;
    getSessionStatus(): string;
    removeSessionStatus(): void;
    removeConfigData(): Promise<void>;
    removeOIDCProviderMetaData(): Promise<void>;
    removeTemporaryData(userId?: string): Promise<void>;
    removeHybridData(userId?: string): Promise<void>;
    removeSessionData(userId?: string): Promise<void>;
    getConfigDataParameter(key: keyof AuthClientConfig<T>): Promise<TemporaryStoreValue>;
    getOIDCProviderMetaDataParameter(key: keyof OIDCDiscoveryApiResponse): Promise<TemporaryStoreValue>;
    getTemporaryDataParameter(key: keyof TemporaryStore, userId?: string): Promise<TemporaryStoreValue>;
    getHybridDataParameter(key: keyof HybridStore, userId?: string): Promise<TemporaryStoreValue>;
    getSessionDataParameter(key: keyof SessionData, userId?: string): Promise<TemporaryStoreValue>;
    setConfigDataParameter(key: keyof AuthClientConfig<T>, value: TemporaryStoreValue): Promise<void>;
    setOIDCProviderMetaDataParameter(key: keyof OIDCDiscoveryApiResponse, value: TemporaryStoreValue): Promise<void>;
    setTemporaryDataParameter(key: keyof TemporaryStore, value: TemporaryStoreValue, userId?: string): Promise<void>;
    setHybridDataParameter(key: keyof HybridStore, value: TemporaryStoreValue, userId?: string): Promise<void>;
    setSessionDataParameter(key: keyof SessionData, value: TemporaryStoreValue, userId?: string): Promise<void>;
    removeConfigDataParameter(key: keyof AuthClientConfig<T>): Promise<void>;
    removeOIDCProviderMetaDataParameter(key: keyof OIDCDiscoveryApiResponse): Promise<void>;
    removeTemporaryDataParameter(key: keyof TemporaryStore, userId?: string): Promise<void>;
    removeHybridDataParameter(key: keyof HybridStore, userId?: string): Promise<void>;
    removeSessionDataParameter(key: keyof SessionData, userId?: string): Promise<void>;
}
export default StorageManager;
//# sourceMappingURL=StorageManager.d.ts.map