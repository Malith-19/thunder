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
import type LogContext from '../models/log-context';
import LogLevel from '../models/log-level';
import type LoggerConfig from '../models/logger-config';
/**
 * Logger class for structured, multi-transport logging.
 *
 * @example
 * ```typescript
 * // Create a logger with default transport
 * const logger = new Logger({ level: LogLevel.INFO });
 *
 * // Log messages
 * logger.info('User logged in', { userId: '123' });
 * logger.error('Failed to fetch data', { error: err });
 *
 * // Create a logger with custom transports
 * const logger = new Logger({
 *   level: LogLevel.DEBUG,
 *   transports: [
 *     new ConsoleTransport(LogLevel.DEBUG),
 *     new HttpTransport(LogLevel.ERROR, { endpoint: 'https://logs.example.com' }),
 *   ],
 * });
 *
 * // Create contextual loggers
 * const userLogger = logger.withContext({ userId: '123' });
 * const componentLogger = logger.withComponent('AuthService');
 * ```
 */
export default class Logger {
    private config;
    private context;
    constructor(config?: LoggerConfig);
    /**
     * Log a debug message.
     * @param message - The log message
     * @param context - Additional contextual data
     */
    debug(message: string, context?: LogContext): void;
    /**
     * Log an info message.
     * @param message - The log message
     * @param context - Additional contextual data
     */
    info(message: string, context?: LogContext): void;
    /**
     * Log a warning message.
     * @param message - The log message
     * @param context - Additional contextual data
     */
    warn(message: string, context?: LogContext): void;
    /**
     * Log an error message.
     * @param message - The log message
     * @param errorOrContext - Error object or contextual data
     * @param context - Additional contextual data (if first param is Error)
     */
    error(message: string, errorOrContext?: Error | LogContext, context?: LogContext): void;
    /**
     * Create a new logger instance with additional context.
     * @param context - Context to add to all log entries
     * @returns New logger instance with merged context
     */
    withContext(context: LogContext): Logger;
    /**
     * Create a new logger instance with a component name.
     * @param component - Component name to identify log source
     * @returns New logger instance with component set
     */
    withComponent(component: string): Logger;
    /**
     * Check if a given log level would be logged.
     * Useful for avoiding expensive operations when logging is disabled.
     * @param level - The log level to check
     * @returns True if the level would be logged
     */
    isLevelEnabled(level: LogLevel): boolean;
    /**
     * Check if debug logging is enabled.
     * @returns True if debug logs would be output
     */
    isDebugEnabled(): boolean;
    /**
     * Flush all transports, ensuring buffered logs are written.
     * @returns Promise that resolves when all transports are flushed
     */
    flush(): Promise<void>;
    /**
     * Close all transports and release resources.
     * @returns Promise that resolves when all transports are closed
     */
    close(): Promise<void>;
    /**
     * Internal log method that routes to all transports.
     * @param level - Log level
     * @param message - Log message
     * @param context - Additional context
     * @param error - Optional error object
     */
    private log;
}
/**
 * Create a new logger instance.
 * @param config - Logger configuration
 * @returns New logger instance
 */
export declare function createLogger(config?: LoggerConfig): Logger;
