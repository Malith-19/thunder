import { _ as LOG_LEVEL_PRIORITY, a as Logger, c as maskString, d as serializeError, f as formatTimestamp, g as BaseTransport, h as hasProcess, i as HttpTransport, l as StdoutTransport, m as hasConsole, n as LoggerProvider, o as createLogger, p as detectEnvironment, r as LoggerContext_default, s as maskSensitiveData, t as useLogger, u as ConsoleTransport, v as log_level_default } from "./useLogger-DgvtF-BW.js";

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
export { BaseTransport, ConsoleTransport, HttpTransport, LOG_LEVEL_PRIORITY, log_level_default as LogLevel, Logger, LoggerContext_default as LoggerContext, LoggerProvider, StdoutTransport, TransportRegistry, createLogger, detectEnvironment, formatTimestamp, hasConsole, hasProcess, maskSensitiveData, maskString, serializeError, useLogger };