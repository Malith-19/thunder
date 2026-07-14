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
import BaseTransport from '../core/BaseTransport';
import type LogEntry from '../models/log-entry';
import type LogLevel from '../models/log-level';
/**
 * Options for configuring the HTTP transport.
 */
export interface HttpTransportOptions {
    /**
     * The endpoint URL to send logs to.
     */
    endpoint: string;
    /**
     * HTTP method to use.
     * @default 'POST'
     */
    method?: 'POST' | 'PUT';
    /**
     * Additional headers to include in requests.
     */
    headers?: Record<string, string>;
    /**
     * Maximum number of log entries to buffer before sending.
     * @default 1
     */
    batchSize?: number;
    /**
     * Maximum time (in milliseconds) to wait before sending buffered logs.
     * @default 5000
     */
    flushInterval?: number;
    /**
     * Request timeout in milliseconds.
     * @default 10000
     */
    timeout?: number;
    /**
     * Whether to retry failed requests.
     * @default true
     */
    retry?: boolean;
    /**
     * Maximum number of retry attempts.
     * @default 3
     */
    maxRetries?: number;
    /**
     * Callback invoked when logs fail to send after all retries are exhausted.
     * Use this to implement fallback logging strategies (e.g., store to localStorage, send to alternative endpoint).
     * @param entries - The log entries that failed to send
     * @param error - The error that caused the failure
     */
    onDroppedLogs?: (entries: LogEntry[], error: Error) => void;
}
/**
 * HTTP transport for sending logs to a remote endpoint.
 * Supports batching and automatic flushing.
 *
 * **Important:** When batching is enabled (batchSize > 1), this transport starts
 * a periodic flush timer. To prevent memory leaks, you MUST call `close()` when
 * the transport is no longer needed. For Logger instances, call `logger.close()`
 * during application cleanup (e.g., in cleanup hooks, beforeunload handlers, or
 * component unmount).
 *
 * @example
 * ```typescript
 * const logger = new Logger({
 *   transports: [new HttpTransport({ level: 'error', endpoint: '...', batchSize: 10 })]
 * });
 *
 * // Cleanup when done
 * window.addEventListener('beforeunload', () => {
 *   logger.close(); // Stops timers and flushes remaining logs
 * });
 * ```
 */
export default class HttpTransport extends BaseTransport {
    private options;
    private buffer;
    private originalEntries;
    private flushTimer;
    private isFlushing;
    private isClosed;
    constructor(level?: LogLevel, options?: HttpTransportOptions);
    write(entry: LogEntry): Promise<void>;
    flush(): Promise<void>;
    close(): Promise<void>;
    private serializeEntry;
    private sendBatch;
    private startFlushTimer;
}
