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
import { Buffer } from 'buffer';
import { Crypto, JWKInterface } from '@thunderid/javascript';
/**
 * Browser-side `Crypto` implementation using native Web Crypto APIs and `jose` for JWT verification.
 */
declare class SPACryptoUtils implements Crypto<Buffer | string> {
    /**
     * Base64URL-encodes a buffer or string value.
     *
     * @param value - The value to encode.
     * @returns The base64url-encoded string with padding stripped.
     */
    base64URLEncode(value: Buffer | string): string;
    /**
     * Decodes a base64url-encoded string.
     *
     * @param value - The base64url string to decode.
     * @returns The decoded UTF-8 string.
     */
    base64URLDecode(value: string): string;
    /**
     * Computes the SHA-256 hash of a string.
     *
     * @param data - The input string to hash.
     * @returns A `Buffer` containing the raw hash bytes.
     */
    hashSha256(data: string): string | Buffer;
    /**
     * Generates a buffer of cryptographically random bytes.
     *
     * @param length - Number of bytes to generate.
     * @returns A `Buffer` of random bytes.
     */
    generateRandomBytes(length: number): string | Buffer;
    /**
     * Verifies a JWT against a JWK using `jose`.
     *
     * @param idToken - The raw JWT string.
     * @param jwk - The JSON Web Key to verify against.
     * @param algorithms - Allowed signature algorithms (e.g., `['RS256']`).
     * @param clientId - Expected audience claim value.
     * @param issuer - Expected issuer claim value.
     * @param subject - Expected subject claim value.
     * @param clockTolerance - Allowed clock skew in seconds.
     * @param validateJwtIssuer - Whether to validate the issuer claim.
     * @returns `true` if the token is valid.
     */
    verifyJwt(idToken: string, jwk: Partial<JWKInterface>, algorithms: string[], clientId: string, issuer: string, subject: string, clockTolerance?: number, validateJwtIssuer?: boolean): Promise<boolean>;
}
export default SPACryptoUtils;
//# sourceMappingURL=SPACryptoUtils.d.ts.map