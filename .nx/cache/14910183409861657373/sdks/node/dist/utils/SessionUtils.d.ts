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
import { SessionData } from '@thunderid/javascript';
/**
 * Utility class for session validation and UUID management.
 */
declare class SessionUtils {
    private constructor();
    /**
     * Generates a new UUID v4 string.
     *
     * @returns A new UUID string.
     */
    static createUUID(): string;
    /**
     * Returns `true` if the given string is a valid UUID v4.
     *
     * @param uuid - The UUID string to validate.
     */
    static validateUUID(uuid: string): Promise<boolean>;
    /**
     * Returns `true` if the session token is still within its validity window.
     *
     * @param sessionData - The session data to check.
     */
    static validateSession(sessionData: SessionData): Promise<boolean>;
}
export default SessionUtils;
//# sourceMappingURL=SessionUtils.d.ts.map