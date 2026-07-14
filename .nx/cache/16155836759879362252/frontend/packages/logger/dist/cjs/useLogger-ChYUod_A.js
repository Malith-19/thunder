//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react = require("react");
react = __toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region src/models/log-level.ts
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
* Log level enumeration.
* Defines the severity levels for log messages.
*/
var LogLevel = /* @__PURE__ */ function(LogLevel$1) {
	LogLevel$1["DEBUG"] = "debug";
	LogLevel$1["INFO"] = "info";
	LogLevel$1["WARN"] = "warn";
	LogLevel$1["ERROR"] = "error";
	LogLevel$1["NONE"] = "none";
	return LogLevel$1;
}(LogLevel || {});
/**
* Numeric representation of log levels for comparison.
* Higher numbers indicate more severe log levels.
*/
const LOG_LEVEL_PRIORITY = {
	[LogLevel.DEBUG]: 0,
	[LogLevel.INFO]: 1,
	[LogLevel.WARN]: 2,
	[LogLevel.ERROR]: 3,
	[LogLevel.NONE]: 4
};
var log_level_default = LogLevel;

//#endregion
//#region src/core/BaseTransport.ts
/**
* Abstract base class for transport implementations.
* Provides common functionality for log level filtering.
*/
var BaseTransport = class {
	level;
	name;
	constructor(name, level) {
		this.name = name;
		this.level = level ?? log_level_default.DEBUG;
	}
	getName() {
		return this.name;
	}
	getLevel() {
		return this.level;
	}
	shouldLog(level) {
		return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.level];
	}
	async flush() {}
	async close() {}
};

//#endregion
//#region src/utils/detectEnvironment.ts
/**
* Detect the current runtime environment.
* @returns Runtime environment information
*/
function detectEnvironment() {
	const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
	const isNode = typeof process !== "undefined" && process.versions?.node != null;
	let isDevelopment = false;
	let isProduction = false;
	try {
		if (typeof {} !== "undefined" && {}.env !== void 0) {
			isDevelopment = {}.env?.DEV === true;
			isProduction = {}.env?.PROD === true;
		}
	} catch {}
	if (!isDevelopment && !isProduction && isNode) {
		isDevelopment = process.env["NODE_ENV"] === "development";
		isProduction = process.env["NODE_ENV"] === "production";
	}
	return {
		isBrowser,
		isNode,
		isDevelopment,
		isProduction
	};
}
/**
* Safely check if console is available.
* @returns True if console is available
*/
function hasConsole() {
	return typeof console !== "undefined" && typeof console.log === "function";
}
/**
* Safely check if process is available.
* @returns True if process is available
*/
function hasProcess() {
	return typeof process !== "undefined" && typeof process.stdout !== "undefined";
}

//#endregion
//#region src/utils/formatTimestamp.ts
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
* Format a date to ISO string safely.
* @param date - The date to format
* @returns ISO string representation
*/
function formatTimestamp(date) {
	return date.toISOString();
}

//#endregion
//#region src/utils/serializeError.ts
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
* Serialize an error object to a plain object.
* @param error - The error to serialize
* @returns Plain object representation of the error
*/
function serializeError(error) {
	return {
		name: error.name,
		message: error.message,
		stack: error.stack,
		...Object.getOwnPropertyNames(error).reduce((acc, key) => {
			if (key !== "name" && key !== "message" && key !== "stack") acc[key] = error[key];
			return acc;
		}, {})
	};
}

//#endregion
//#region src/transports/ConsoleTransport.ts
/**
* Console color codes for different log levels (browser).
*/
const LEVEL_COLORS = {
	debug: "color: #6c757d",
	info: "color: #0dcaf0",
	warn: "color: #ffc107",
	error: "color: #dc3545"
};
/**
* Console transport for browser environments.
* Writes logs to the browser console with styled output.
*/
var ConsoleTransport = class extends BaseTransport {
	options;
	constructor(level, options = {}) {
		super("console", level);
		this.options = {
			colors: options.colors ?? true,
			timestamps: options.timestamps ?? true,
			prettyPrint: options.prettyPrint ?? true
		};
	}
	write(entry) {
		if (!hasConsole()) return Promise.resolve();
		const { level, message, timestamp, context, component, error } = entry;
		const parts = [];
		const styles = [];
		if (this.options.timestamps) {
			parts.push(`[${formatTimestamp(timestamp)}]`);
			styles.push("color: #999");
		}
		parts.push(`[${level.toUpperCase()}]`);
		styles.push(LEVEL_COLORS[level] || "");
		if (component) {
			parts.push(`[${component}]`);
			styles.push("color: #6610f2; font-weight: bold");
		}
		parts.push(message);
		styles.push("");
		const logString = parts.join(" ");
		const styleString = this.options.colors ? parts.map(() => "%c").join("") : "";
		const consoleMethod = this.getConsoleMethod(level);
		if (this.options.colors && typeof consoleMethod === "function") consoleMethod(styleString + logString, ...styles);
		else if (typeof consoleMethod === "function") consoleMethod(logString);
		if (context && Object.keys(context).length > 0) {
			const filteredContext = Object.entries(context).reduce((acc, [key, value]) => {
				if (value !== null && value !== void 0) acc[key] = value;
				return acc;
			}, {});
			if (Object.keys(filteredContext).length > 0) {
				if (this.options.prettyPrint && typeof console.log === "function") console.log("  Context:", filteredContext);
				else if (typeof consoleMethod === "function") consoleMethod("Context:", filteredContext);
			}
		}
		if (error && typeof console.error === "function") if (this.options.prettyPrint) console.error("Error:", error);
		else console.error("Error:", serializeError(error));
		return Promise.resolve();
	}
	getConsoleMethod(level) {
		switch (level) {
			case "debug": return console.debug || console.log;
			case "info": return console.info || console.log;
			case "warn": return console.warn || console.log;
			case "error": return console.error || console.log;
			default: return console.log;
		}
	}
};

//#endregion
//#region src/transports/StdoutTransport.ts
/**
* Stdout transport for Node.js environments.
* Writes structured JSON logs to stdout.
*/
var StdoutTransport = class extends BaseTransport {
	options;
	constructor(level, options = {}) {
		super("stdout", level);
		this.options = {
			json: options.json ?? true,
			timestamps: options.timestamps ?? true
		};
	}
	write(entry) {
		if (!hasProcess()) return Promise.resolve();
		const { level, message, timestamp, context, component, error } = entry;
		if (this.options.json) {
			const logObject = {
				level,
				message
			};
			if (this.options.timestamps) logObject["timestamp"] = formatTimestamp(timestamp);
			if (component) logObject["component"] = component;
			if (context && Object.keys(context).length > 0) logObject["context"] = context;
			if (error) logObject["error"] = serializeError(error);
			process.stdout.write(`${JSON.stringify(logObject)}\n`);
		} else {
			const parts = [];
			if (this.options.timestamps) parts.push(`[${formatTimestamp(timestamp)}]`);
			parts.push(`[${level.toUpperCase()}]`);
			if (component) parts.push(`[${component}]`);
			parts.push(message);
			let output = parts.join(" ");
			if (context && Object.keys(context).length > 0) output += ` ${JSON.stringify(context)}`;
			if (error) output += ` Error: ${JSON.stringify(serializeError(error))}`;
			process.stdout.write(`${output}\n`);
		}
		return Promise.resolve();
	}
};

//#endregion
//#region src/utils/maskSensitiveData.ts
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
* Mask sensitive data in a string.
* Replaces characters with asterisks, leaving first and last characters visible.
* @param value - The value to mask
* @param visibleChars - Number of characters to leave visible at start and end
* @returns Masked string
*/
function maskString(value, visibleChars = 2) {
	if (value.length <= visibleChars * 2) return "*".repeat(value.length);
	const start = value.substring(0, visibleChars);
	const end = value.substring(value.length - visibleChars);
	const maskLength = value.length - visibleChars * 2;
	return `${start}${"*".repeat(maskLength)}${end}`;
}
/**
* Common sensitive field names to mask in logs.
*/
const SENSITIVE_FIELD_NAMES = new Set([
	"password",
	"passwd",
	"pwd",
	"secret",
	"token",
	"accesstoken",
	"access_token",
	"refreshtoken",
	"refresh_token",
	"apikey",
	"api_key",
	"auth",
	"authorization",
	"cookie",
	"session",
	"sessionid",
	"session_id",
	"ssn",
	"credit_card",
	"creditcard",
	"cvv",
	"pin"
]);
/**
* Recursively mask sensitive data in an object.
* @param obj - The object to process
* @returns New object with sensitive fields masked
*/
function maskSensitiveData(obj) {
	if (obj === null || obj === void 0) return obj;
	if (typeof obj !== "object") return obj;
	if (obj instanceof Error) return {
		name: obj.name,
		message: obj.message,
		stack: obj.stack
	};
	if (Array.isArray(obj)) return obj.map((item) => maskSensitiveData(item));
	const masked = {};
	Object.entries(obj).forEach(([key, value]) => {
		const lowerKey = key.toLowerCase();
		if (SENSITIVE_FIELD_NAMES.has(lowerKey)) masked[key] = typeof value === "string" ? maskString(value) : "[REDACTED]";
		else if (typeof value === "object" && value !== null) masked[key] = maskSensitiveData(value);
		else masked[key] = value;
	});
	return masked;
}

//#endregion
//#region src/core/Logger.ts
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
var Logger = class Logger {
	config;
	context;
	constructor(config = {}) {
		const env = detectEnvironment();
		let transports = config.transports ?? [];
		if (transports.length === 0) {
			const defaultLevel = config.level ?? "info";
			if (env.isBrowser) transports = [new ConsoleTransport(defaultLevel)];
			else if (env.isNode) transports = [new StdoutTransport(defaultLevel)];
			else transports = [new ConsoleTransport(defaultLevel)];
		}
		this.config = {
			level: config.level ?? "info",
			enabled: config.enabled ?? true,
			transports,
			context: config.context ?? {},
			component: config.component,
			maskSensitiveData: config.maskSensitiveData ?? false
		};
		this.context = { ...this.config.context };
	}
	/**
	* Log a debug message.
	* @param message - The log message
	* @param context - Additional contextual data
	*/
	debug(message, context) {
		this.log(log_level_default.DEBUG, message, context);
	}
	/**
	* Log an info message.
	* @param message - The log message
	* @param context - Additional contextual data
	*/
	info(message, context) {
		this.log(log_level_default.INFO, message, context);
	}
	/**
	* Log a warning message.
	* @param message - The log message
	* @param context - Additional contextual data
	*/
	warn(message, context) {
		this.log(log_level_default.WARN, message, context);
	}
	/**
	* Log an error message.
	* @param message - The log message
	* @param errorOrContext - Error object or contextual data
	* @param context - Additional contextual data (if first param is Error)
	*/
	error(message, errorOrContext, context) {
		let error;
		let ctx;
		if (errorOrContext instanceof Error) {
			error = errorOrContext;
			ctx = context;
		} else ctx = errorOrContext;
		this.log(log_level_default.ERROR, message, ctx, error);
	}
	/**
	* Create a new logger instance with additional context.
	* @param context - Context to add to all log entries
	* @returns New logger instance with merged context
	*/
	withContext(context) {
		return new Logger({
			...this.config,
			context: {
				...this.context,
				...context
			}
		});
	}
	/**
	* Create a new logger instance with a component name.
	* @param component - Component name to identify log source
	* @returns New logger instance with component set
	*/
	withComponent(component) {
		const newLogger = new Logger({
			...this.config,
			component
		});
		newLogger.context = { ...this.context };
		return newLogger;
	}
	/**
	* Check if a given log level would be logged.
	* Useful for avoiding expensive operations when logging is disabled.
	* @param level - The log level to check
	* @returns True if the level would be logged
	*/
	isLevelEnabled(level) {
		if (!this.config.enabled) return false;
		return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.level];
	}
	/**
	* Check if debug logging is enabled.
	* @returns True if debug logs would be output
	*/
	isDebugEnabled() {
		return this.isLevelEnabled(log_level_default.DEBUG);
	}
	/**
	* Flush all transports, ensuring buffered logs are written.
	* @returns Promise that resolves when all transports are flushed
	*/
	async flush() {
		await Promise.all(this.config.transports.map((transport) => transport.flush()));
	}
	/**
	* Close all transports and release resources.
	* @returns Promise that resolves when all transports are closed
	*/
	async close() {
		await Promise.all(this.config.transports.map((transport) => transport.close()));
	}
	/**
	* Internal log method that routes to all transports.
	* @param level - Log level
	* @param message - Log message
	* @param context - Additional context
	* @param error - Optional error object
	*/
	log(level, message, context, error) {
		if (!this.config.enabled) return;
		if (!this.isLevelEnabled(level)) return;
		const mergedContext = {
			...this.context,
			...context
		};
		const finalContext = this.config.maskSensitiveData ? maskSensitiveData(mergedContext) : mergedContext;
		const entry = {
			level,
			message,
			timestamp: /* @__PURE__ */ new Date(),
			context: Object.keys(finalContext).length > 0 ? finalContext : void 0,
			component: this.config.component,
			error
		};
		this.config.transports.forEach((transport) => {
			if (transport.shouldLog(level)) transport.write(entry).catch((err) => {
				if (typeof console !== "undefined" && typeof console.error === "function") console.error(`Transport ${transport.getName()} failed:`, err);
			});
		});
	}
};
/**
* Create a new logger instance.
* @param config - Logger configuration
* @returns New logger instance
*/
function createLogger(config) {
	return new Logger(config);
}

//#endregion
//#region src/transports/HttpTransport.ts
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
var HttpTransport = class extends BaseTransport {
	options;
	buffer = [];
	originalEntries = [];
	flushTimer = null;
	isFlushing = false;
	isClosed = false;
	constructor(level, options) {
		super("http", level);
		if (!options?.endpoint) throw new Error("HttpTransport requires an endpoint URL");
		this.options = {
			endpoint: options.endpoint,
			method: options.method ?? "POST",
			headers: options.headers ?? {},
			batchSize: options.batchSize ?? 1,
			flushInterval: options.flushInterval ?? 5e3,
			timeout: options.timeout ?? 1e4,
			retry: options.retry ?? true,
			maxRetries: options.maxRetries ?? 3,
			onDroppedLogs: options.onDroppedLogs
		};
		if (!this.options.headers["Content-Type"]) this.options.headers["Content-Type"] = "application/json";
		if (this.options.batchSize > 1) this.startFlushTimer();
	}
	async write(entry) {
		if (this.isClosed) {
			if (typeof console !== "undefined" && typeof console.warn === "function") console.warn("Attempted to write to closed HttpTransport");
			return;
		}
		const serializedEntry = this.serializeEntry(entry);
		this.buffer.push(serializedEntry);
		this.originalEntries.push(entry);
		if (this.buffer.length >= this.options.batchSize) await this.flush();
	}
	async flush() {
		if (this.isClosed || this.isFlushing || this.buffer.length === 0) return;
		this.isFlushing = true;
		const entries = [...this.buffer];
		const originals = [...this.originalEntries];
		this.buffer = [];
		this.originalEntries = [];
		try {
			await this.sendBatch(entries);
		} catch (error) {
			const err = error;
			const retriesExhausted = err.message?.includes("retries exhausted");
			if (this.options.retry && !retriesExhausted) {
				this.buffer.unshift(...entries);
				this.originalEntries.unshift(...originals);
			} else if (this.options.onDroppedLogs) this.options.onDroppedLogs(originals, err);
			if (typeof console !== "undefined" && typeof console.error === "function") console.error("Failed to send logs to HTTP endpoint:", error);
		} finally {
			this.isFlushing = false;
		}
	}
	async close() {
		this.isClosed = true;
		if (this.flushTimer) {
			clearInterval(this.flushTimer);
			this.flushTimer = null;
		}
		await this.flush();
	}
	serializeEntry(entry) {
		return {
			level: entry.level,
			message: entry.message,
			timestamp: entry.timestamp,
			component: entry.component,
			context: entry.context,
			error: entry.error ? serializeError(entry.error) : void 0
		};
	}
	async sendBatch(entries, retryCount = 0) {
		const payload = { logs: entries.map((entry) => ({
			level: entry.level,
			message: entry.message,
			timestamp: formatTimestamp(entry.timestamp),
			component: entry.component,
			context: entry.context,
			error: entry.error
		})) };
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), this.options.timeout);
			const response = await fetch(this.options.endpoint, {
				method: this.options.method,
				headers: this.options.headers,
				body: JSON.stringify(payload),
				signal: controller.signal
			});
			clearTimeout(timeoutId);
			if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			return;
		} catch (error) {
			if (this.options.retry && retryCount < this.options.maxRetries) {
				const delay = 2 ** retryCount * 1e3;
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, delay);
				});
				return this.sendBatch(entries, retryCount + 1);
			}
			const err = error;
			if (this.options.retry && retryCount >= this.options.maxRetries) throw new Error(`Failed after ${this.options.maxRetries} retries exhausted: ${err.message}`, { cause: error });
			throw error;
		}
	}
	startFlushTimer() {
		this.flushTimer = setInterval(() => {
			if (this.isClosed) {
				if (this.flushTimer) {
					clearInterval(this.flushTimer);
					this.flushTimer = null;
				}
				return;
			}
			this.flush().catch(() => {});
		}, this.options.flushInterval);
	}
};

//#endregion
//#region src/react/contexts/Logger/LoggerContext.tsx
/**
* React context for accessing the logger instance throughout the application.
*
* This context provides access to the logger configured via the LoggerProvider.
* It should be used within a `LoggerProvider` component.
*
* @example
* ```tsx
* import LoggerContext from './LoggerContext';
* import { useContext } from 'react';
*
* const MyComponent = () => {
*   const logger = useContext(LoggerContext);
*   if (!logger) {
*     throw new Error('Component must be used within LoggerProvider');
*   }
*
*   logger.info('Component rendered');
*   return <div>Hello World</div>;
* };
* ```
*
* @public
*/
const LoggerContext = (0, react.createContext)(null);
var LoggerContext_default = LoggerContext;

//#endregion
//#region src/react/contexts/Logger/LoggerProvider.tsx
/**
* React context provider component that provides a logger instance
* to all child components.
*
* This component accepts either a Logger instance or configuration and provides
* it through React context. Child components can access the logger using the
* `useLogger` hook.
*
* **Performance Note:** When passing a Logger instance, it should be stable
* (created outside the component or memoized). When passing LoggerConfig,
* the provider will maintain a stable logger instance across renders.
*
* @param props - The component props
* @param props.logger - Logger instance or configuration
* @param props.children - React children to be wrapped with the logger context
*
* @returns JSX element that provides logger context to children
*
* @example
* Using with configuration:
* ```tsx
* import LoggerProvider from './LoggerProvider';
* import { LogLevel } from '@thunderid/logger';
* import App from './App';
*
* function Root() {
*   return (
*     <LoggerProvider logger={{ level: LogLevel.INFO }}>
*       <App />
*     </LoggerProvider>
*   );
* }
* ```
*
* @example
* Using with Logger instance (recommended for better performance):
* ```tsx
* import LoggerProvider from './LoggerProvider';
* import { Logger } from '@thunderid/logger';
*
* // Create logger outside component to maintain stable reference
* const logger = new Logger({ level: LogLevel.DEBUG });
*
* function Root() {
*   return (
*     <LoggerProvider logger={logger}>
*       <App />
*     </LoggerProvider>
*   );
* }
* ```
*
* @public
*/
function LoggerProvider({ logger, children }) {
	const loggerInstanceRef = (0, react.useRef)(null);
	const configHashRef = (0, react.useRef)("");
	const loggerInstance = (0, react.useMemo)(() => {
		if (logger instanceof Logger) {
			loggerInstanceRef.current = logger;
			return logger;
		}
		if (!logger) {
			loggerInstanceRef.current ??= createLogger();
			return loggerInstanceRef.current;
		}
		const configHash = JSON.stringify({
			level: logger.level,
			enabled: logger.enabled,
			transportCount: logger.transports?.length ?? 0,
			component: logger.component,
			maskSensitiveData: logger.maskSensitiveData
		});
		if (configHash !== configHashRef.current || !loggerInstanceRef.current) {
			configHashRef.current = configHash;
			loggerInstanceRef.current = createLogger(logger);
		}
		return loggerInstanceRef.current;
	}, [logger]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LoggerContext_default.Provider, {
		value: loggerInstance,
		children
	});
}

//#endregion
//#region src/react/contexts/Logger/useLogger.tsx
/**
* React hook for accessing the logger instance throughout the application.
*
* This hook provides access to the logger configured via LoggerProvider.
* It must be used within a component tree wrapped by `LoggerProvider`,
* otherwise it will throw an error.
*
* Optionally accepts a component name to automatically scope all logs
* to that component. This is useful for tracking which component generated
* specific log messages.
*
* @param componentName - Optional component name for scoping logs
*
* @returns The logger instance (scoped if component name provided)
*
* @throws {Error} Throws an error if used outside of LoggerProvider
*
* @example
* Basic usage without scoping:
* ```tsx
* import {useLogger} from '@thunderid/logger/react';
*
* function MyComponent() {
*   const logger = useLogger();
*
*   useEffect(() => {
*     logger.info('Component mounted');
*     return () => logger.debug('Component unmounting');
*   }, []);
*
*   const handleClick = () => {
*     logger.info('Button clicked', { buttonId: 'submit' });
*   };
*
*   return <button onClick={handleClick}>Submit</button>;
* }
* ```
*
* @example
* Usage with component scoping:
* ```tsx
* import {useLogger} from '@thunderid/logger/react';
*
* function UserProfile({ userId }: { userId: string }) {
*   const logger = useLogger('UserProfile');
*
*   useEffect(() => {
*     logger.info('Profile loaded', { userId });
*     // Logs: { level: 'info', message: 'Profile loaded', component: 'UserProfile', context: { userId } }
*   }, [userId]);
*
*   return <div>User Profile</div>;
* }
* ```
*
* @example
* Logging with error handling:
* ```tsx
* function DataFetcher() {
*   const logger = useLogger('DataFetcher');
*
*   const fetchData = async () => {
*     try {
*       logger.debug('Fetching data...');
*       const response = await fetch('/api/data');
*       logger.info('Data fetched successfully', { status: response.status });
*     } catch (error) {
*       logger.error('Failed to fetch data', { error });
*     }
*   };
*
*   return <button onClick={fetchData}>Fetch</button>;
* }
* ```
*
* @public
*/
function useLogger(componentName) {
	const logger = (0, react.useContext)(LoggerContext_default);
	if (!logger) throw new Error("useLogger must be used within a LoggerProvider");
	return (0, react.useMemo)(() => {
		if (componentName) return logger.withComponent(componentName);
		return logger;
	}, [logger, componentName]);
}

//#endregion
Object.defineProperty(exports, 'BaseTransport', {
  enumerable: true,
  get: function () {
    return BaseTransport;
  }
});
Object.defineProperty(exports, 'ConsoleTransport', {
  enumerable: true,
  get: function () {
    return ConsoleTransport;
  }
});
Object.defineProperty(exports, 'HttpTransport', {
  enumerable: true,
  get: function () {
    return HttpTransport;
  }
});
Object.defineProperty(exports, 'LOG_LEVEL_PRIORITY', {
  enumerable: true,
  get: function () {
    return LOG_LEVEL_PRIORITY;
  }
});
Object.defineProperty(exports, 'Logger', {
  enumerable: true,
  get: function () {
    return Logger;
  }
});
Object.defineProperty(exports, 'LoggerContext_default', {
  enumerable: true,
  get: function () {
    return LoggerContext_default;
  }
});
Object.defineProperty(exports, 'LoggerProvider', {
  enumerable: true,
  get: function () {
    return LoggerProvider;
  }
});
Object.defineProperty(exports, 'StdoutTransport', {
  enumerable: true,
  get: function () {
    return StdoutTransport;
  }
});
Object.defineProperty(exports, 'createLogger', {
  enumerable: true,
  get: function () {
    return createLogger;
  }
});
Object.defineProperty(exports, 'detectEnvironment', {
  enumerable: true,
  get: function () {
    return detectEnvironment;
  }
});
Object.defineProperty(exports, 'formatTimestamp', {
  enumerable: true,
  get: function () {
    return formatTimestamp;
  }
});
Object.defineProperty(exports, 'hasConsole', {
  enumerable: true,
  get: function () {
    return hasConsole;
  }
});
Object.defineProperty(exports, 'hasProcess', {
  enumerable: true,
  get: function () {
    return hasProcess;
  }
});
Object.defineProperty(exports, 'log_level_default', {
  enumerable: true,
  get: function () {
    return log_level_default;
  }
});
Object.defineProperty(exports, 'maskSensitiveData', {
  enumerable: true,
  get: function () {
    return maskSensitiveData;
  }
});
Object.defineProperty(exports, 'maskString', {
  enumerable: true,
  get: function () {
    return maskString;
  }
});
Object.defineProperty(exports, 'serializeError', {
  enumerable: true,
  get: function () {
    return serializeError;
  }
});
Object.defineProperty(exports, 'useLogger', {
  enumerable: true,
  get: function () {
    return useLogger;
  }
});