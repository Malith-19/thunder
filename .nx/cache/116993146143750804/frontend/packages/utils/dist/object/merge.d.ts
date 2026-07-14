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
 * Drop-in replacement for lodash `merge`.
 *
 * Recursively merges own enumerable properties of source objects into the
 * destination object. Source properties that resolve to `undefined` do not
 * overwrite existing destination values. Array and plain-object values are
 * merged recursively; all other values are assigned by reference.
 *
 * Mutates and returns the destination object.
 *
 * @param object - The destination object.
 * @param sources - One or more source objects.
 * @returns The mutated destination object.
 */
export default function merge<T extends object>(object: T, ...sources: object[]): T;
