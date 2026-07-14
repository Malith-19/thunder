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
import { Crypto, JWKInterface } from './models/crypto';
/**
 * Default implementation of the Crypto interface using the 'jose' library
 * and the native Web Crypto API.
 */
export declare class DefaultCrypto implements Crypto<Uint8Array> {
    base64URLDecode(value: string): string;
    base64URLEncode(value: Uint8Array): string;
    generateRandomBytes(length: number): Uint8Array;
    hashSha256(data: string): Promise<Uint8Array>;
    verifyJwt(idToken: string, jwk: JWKInterface, algorithms: string[], clientId: string, issuer: string, subject: string, clockTolerance?: number, validateJwtIssuer?: boolean): Promise<boolean>;
}
//# sourceMappingURL=DefaultCrypto.d.ts.map