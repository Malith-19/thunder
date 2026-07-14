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
import type Transport from '../models/transport';
import type { TransportConfig, TransportFactory } from '../models/transport-config';
/**
 * Create a transport from configuration using the global registry.
 * @param config - Transport configuration
 * @returns Transport instance
 *
 * @example
 * ```typescript
 * // Create a console transport
 * const transport = createTransport({
 *   type: 'console',
 *   level: LogLevel.DEBUG,
 *   options: { colors: true },
 * });
 *
 * // Create an HTTP transport
 * const httpTransport = createTransport({
 *   type: 'http',
 *   level: LogLevel.ERROR,
 *   options: {
 *     endpoint: 'https://logs.example.com/api/logs',
 *     batchSize: 10,
 *   },
 * });
 * ```
 */
export declare function createTransport(config: TransportConfig): Transport;
/**
 * Create multiple transports from an array of configurations.
 * @param configs - Array of transport configurations
 * @returns Array of transport instances
 *
 * @example
 * ```typescript
 * const transports = createTransports([
 *   { type: 'console', level: LogLevel.DEBUG },
 *   { type: 'http', level: LogLevel.ERROR, options: { endpoint: '...' } },
 * ]);
 * ```
 */
export declare function createTransports(configs: TransportConfig[]): Transport[];
/**
 * Register a custom transport factory globally.
 * @param type - The transport type identifier
 * @param factory - Factory function that creates the transport
 *
 * @example
 * ```typescript
 * import { registerTransport } from '@thunderid/logger';
 * import * as Sentry from '@sentry/browser';
 *
 * // Define a custom Sentry transport
 * class SentryTransport extends BaseTransport {
 *   constructor(level: LogLevel, options: { dsn: string }) {
 *     super('sentry', level);
 *     Sentry.init({ dsn: options.dsn });
 *   }
 *
 *   async write(entry: LogEntry): Promise<void> {
 *     if (entry.level === 'error') {
 *       Sentry.captureException(entry.error || new Error(entry.message), {
 *         level: 'error',
 *         extra: entry.context,
 *       });
 *     }
 *   }
 * }
 *
 * // Register the transport
 * registerTransport('sentry', (config) => {
 *   return new SentryTransport(config.level, config.options);
 * });
 *
 * // Use it in a logger
 * const logger = new Logger({
 *   transports: [
 *     createTransport({
 *       type: 'sentry',
 *       level: LogLevel.ERROR,
 *       options: { dsn: 'your-sentry-dsn' },
 *     }),
 *   ],
 * });
 * ```
 */
export declare function registerTransport(type: string, factory: TransportFactory): void;
/**
 * Check if a transport type is registered.
 * @param type - The transport type to check
 * @returns True if the type is registered
 */
export declare function hasTransport(type: string): boolean;
/**
 * Get all registered transport types.
 * @returns Array of registered type names
 */
export declare function getTransportTypes(): string[];
/**
 * Unregister a transport type.
 * @param type - The transport type to unregister
 * @returns True if the type was unregistered
 */
export declare function unregisterTransport(type: string): boolean;
