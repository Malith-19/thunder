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
import { StorageManager } from '@thunderid/javascript';
/**
 * Helper that manages automatic access-token refresh scheduling via `setTimeout`.
 *
 * @typeParam T - Browser client config type.
 */
declare class SPAHelper<T> {
    private _storageManager;
    private _isTokenRefreshLoading;
    /**
     * @param storageManager - The storage manager instance used to read config and session data.
     */
    constructor(storageManager: StorageManager<T>);
    /**
     * Schedules an automatic access-token refresh if `periodicTokenRefresh` is enabled in config.
     * No-op if the feature is disabled or there is no refresh token.
     *
     * @param refreshAccessToken - Async callback that performs the refresh.
     */
    refreshAccessTokenAutomatically(refreshAccessToken: () => Promise<any>): Promise<void>;
    /**
     * Returns the current refresh timer ID from storage, or `-1` if none is set.
     */
    getRefreshTimeoutTimer(): Promise<number>;
    /**
     * Clears the automatic-refresh timer.
     *
     * @param timer - Timer ID to clear. If omitted, the stored timer ID is used.
     */
    clearRefreshTokenTimeout(timer?: number): Promise<void>;
}
export default SPAHelper;
//# sourceMappingURL=SPAHelper.d.ts.map