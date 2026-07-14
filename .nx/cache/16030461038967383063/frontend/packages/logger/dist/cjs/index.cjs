const require_useLogger = require('./useLogger-ChYUod_A.js');

//#region src/core/TransportRegistry.ts
/**
* Transport registry for managing and retrieving transports.
* Follows the executor registry pattern from backend.
*/
var TransportRegistry = class {
	transports;
	constructor() {
		this.transports = /* @__PURE__ */ new Map();
	}
	/**
	* Register a transport with the registry.
	* @param transport - The transport instance to register
	*/
	register(transport) {
		this.transports.set(transport.getName(), transport);
	}
	/**
	* Get a transport by name.
	* @param name - The name of the transport
	* @returns The transport instance or undefined if not found
	*/
	get(name) {
		return this.transports.get(name);
	}
	/**
	* Check if a transport is registered.
	* @param name - The name of the transport
	* @returns True if the transport is registered
	*/
	has(name) {
		return this.transports.has(name);
	}
	/**
	* Get all registered transports.
	* @returns Array of all transport instances
	*/
	getAll() {
		return Array.from(this.transports.values());
	}
	/**
	* Unregister a transport.
	* @param name - The name of the transport to unregister
	* @returns True if the transport was unregistered
	*/
	unregister(name) {
		return this.transports.delete(name);
	}
	/**
	* Clear all registered transports.
	*/
	clear() {
		this.transports.clear();
	}
	/**
	* Get the number of registered transports.
	*/
	size() {
		return this.transports.size;
	}
};

//#endregion
exports.BaseTransport = require_useLogger.BaseTransport;
exports.ConsoleTransport = require_useLogger.ConsoleTransport;
exports.HttpTransport = require_useLogger.HttpTransport;
exports.LOG_LEVEL_PRIORITY = require_useLogger.LOG_LEVEL_PRIORITY;
exports.LogLevel = require_useLogger.log_level_default;
exports.Logger = require_useLogger.Logger;
exports.LoggerContext = require_useLogger.LoggerContext_default;
exports.LoggerProvider = require_useLogger.LoggerProvider;
exports.StdoutTransport = require_useLogger.StdoutTransport;
exports.TransportRegistry = TransportRegistry;
exports.createLogger = require_useLogger.createLogger;
exports.detectEnvironment = require_useLogger.detectEnvironment;
exports.formatTimestamp = require_useLogger.formatTimestamp;
exports.hasConsole = require_useLogger.hasConsole;
exports.hasProcess = require_useLogger.hasProcess;
exports.maskSensitiveData = require_useLogger.maskSensitiveData;
exports.maskString = require_useLogger.maskString;
exports.serializeError = require_useLogger.serializeError;
exports.useLogger = require_useLogger.useLogger;