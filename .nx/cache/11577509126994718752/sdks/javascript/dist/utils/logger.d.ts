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
/**
 * Log levels enum
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
/**
 * Logger configuration interface
 */
export interface LoggerConfig {
    /** Custom log formatter function */
    formatter?: (level: LogLevel, message: string, ...args: any[]) => void;
    /** Minimum log level to output */
    level: LogLevel;
    /** Custom prefix for all log messages */
    prefix?: string;
    /** Whether to include log level in output */
    showLevel?: boolean;
    /** Whether to include timestamps */
    timestamps?: boolean;
}
/**
 * Universal logger class that works in both browser and Node.js environments
 */
declare class Logger {
    private config;
    constructor(config?: Partial<LoggerConfig>);
    /**
     * Update logger configuration
     */
    configure(config: Partial<LoggerConfig>): void;
    /**
     * Get current configuration
     */
    getConfig(): LoggerConfig;
    /**
     * Check if a log level should be output
     */
    private shouldLog;
    /**
     * Get timestamp string
     */
    private static getTimestamp;
    /**
     * Get log level string
     */
    private static getLevelString;
    /**
     * Format message for Node.js terminal
     */
    private formatForNode;
    /**
     * Log message using appropriate method
     */
    private logMessage;
    /**
     * Log to browser console with styling
     */
    private logToBrowser;
    /**
     * Log to Node.js console
     */
    private logToNode;
    /**
     * Log debug message
     */
    debug(message: string, ...args: any[]): void;
    /**
     * Log info message
     */
    info(message: string, ...args: any[]): void;
    /**
     * Log warning message
     */
    warn(message: string, ...args: any[]): void;
    /**
     * Log error message
     */
    error(message: string, ...args: any[]): void;
    /**
     * Create a child logger with additional prefix
     */
    child(prefix: string): Logger;
    /**
     * Set log level
     */
    setLevel(level: LogLevel): void;
    /**
     * Get current log level
     */
    getLevel(): LogLevel;
}
/**
 * Default logger instance
 */
declare const logger: Logger;
/**
 * Create a new logger instance with custom configuration
 */
export declare const createLogger: (config?: Partial<LoggerConfig>) => Logger;
/**
 * Default export - global logger instance
 */
export default logger;
/**
 * Named exports for convenience
 */
export declare const debug: (message: string, ...args: any[]) => void;
export declare const info: (message: string, ...args: any[]) => void;
export declare const warn: (message: string, ...args: any[]) => void;
export declare const error: (message: string, ...args: any[]) => void;
/**
 * Configure the default logger
 */
export declare const configure: (config: Partial<LoggerConfig>) => void;
/**
 * Create component-specific loggers
 */
export declare const createComponentLogger: (component: string) => Logger;
/**
 * Create package-specific logger
 */
export declare const createPackageLogger: (packageName: string) => Logger;
/**
 * Create package component logger (package + component)
 */
export declare const createPackageComponentLogger: (packageName: string, component: string) => Logger;
//# sourceMappingURL=logger.d.ts.map