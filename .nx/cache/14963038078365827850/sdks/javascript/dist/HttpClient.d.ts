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
import { HttpError, HttpRequestConfig, HttpResponse } from './models/http';
/**
 * Abstract base class for HTTP clients. Owns all handler/callback state and
 * the request lifecycle (pre-processing, transport, post-processing).
 *
 * Extend this class and implement `transport()` to plug in a custom HTTP transport.
 *
 * @example
 * ```ts
 * class MyHttpClient extends HttpClient {
 *   protected async transport<T>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
 *     // custom fetch logic
 *   }
 * }
 * ```
 */
export declare abstract class HttpClient {
    private isHandlerEnabled;
    private attachToken;
    private static readonly DEFAULT_HANDLER_DISABLE_TIMEOUT;
    private requestStartCallback;
    private requestSuccessCallback;
    private requestErrorCallback;
    private requestFinishCallback;
    constructor(isHandlerEnabled?: boolean, attachToken?: (request: HttpRequestConfig) => Promise<void>);
    /**
     * Implemented by subclasses. Performs the actual HTTP call with no handler
     * logic applied — that is handled by `request()`.
     */
    protected abstract transport<T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>>;
    /**
     * Public HTTP request entry point. Applies pre/post processing around `transport()`.
     */
    request<T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>>;
    enableHandler(): void;
    disableHandler(): void;
    disableHandlerWithTimeout(timeout?: number): void;
    setHttpRequestStartCallback(cb: (req: HttpRequestConfig) => void): void;
    setHttpRequestSuccessCallback(cb: (res: HttpResponse) => void): void;
    setHttpRequestErrorCallback(cb: (err: HttpError) => void): void;
    setHttpRequestFinishCallback(cb: () => void): void;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
    protected requestHandler(config: HttpRequestConfig): Promise<HttpRequestConfig>;
    protected successHandler(response: HttpResponse): HttpResponse;
    protected errorHandler(error: HttpError): void;
}
//# sourceMappingURL=HttpClient.d.ts.map