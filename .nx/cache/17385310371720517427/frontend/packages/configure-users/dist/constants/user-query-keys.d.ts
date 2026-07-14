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
/**
 * Query key constants for users feature cache management.
 */
declare const UserQueryKeys: {
    /**
     * Base key for user list queries.
     */
    readonly USERS: "users";
    /**
     * Key for a single user query.
     */
    readonly USER: "user";
    /**
     * Base key for user type list queries.
     */
    readonly USER_TYPES: "userTypes";
    /**
     * Key for a single user type query.
     */
    readonly USER_TYPE: "userType";
};
export default UserQueryKeys;
