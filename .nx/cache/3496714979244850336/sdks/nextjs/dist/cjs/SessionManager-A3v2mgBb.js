const require_dynamic_rendering$1 = require('./dynamic-rendering-BCAIDVkI.js');
let __thunderid_node = require("@thunderid/node");
__thunderid_node = require_dynamic_rendering$1.__toESM(__thunderid_node);
let jose = require("jose");
jose = require_dynamic_rendering$1.__toESM(jose);

//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js
var require_reflect = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "ReflectAdapter", {
		enumerable: true,
		get: function() {
			return ReflectAdapter;
		}
	});
	var ReflectAdapter = class {
		static get(target, prop, receiver) {
			const value = Reflect.get(target, prop, receiver);
			if (typeof value === "function") return value.bind(target);
			return value;
		}
		static set(target, prop, value, receiver) {
			return Reflect.set(target, prop, value, receiver);
		}
		static has(target, prop) {
			return Reflect.has(target, prop);
		}
		static deleteProperty(target, prop) {
			return Reflect.deleteProperty(target, prop);
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js
var require_request_cookies = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$2(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$2(exports, {
		MutableRequestCookiesAdapter: function() {
			return MutableRequestCookiesAdapter;
		},
		ReadonlyRequestCookiesError: function() {
			return ReadonlyRequestCookiesError;
		},
		RequestCookiesAdapter: function() {
			return RequestCookiesAdapter;
		},
		appendMutableCookies: function() {
			return appendMutableCookies;
		},
		areCookiesMutableInCurrentPhase: function() {
			return areCookiesMutableInCurrentPhase;
		},
		createCookiesWithMutableAccessCheck: function() {
			return createCookiesWithMutableAccessCheck;
		},
		getModifiedCookieValues: function() {
			return getModifiedCookieValues;
		},
		responseCookiesToRequestCookies: function() {
			return responseCookiesToRequestCookies;
		}
	});
	const _cookies$1 = require_dynamic_rendering$1.require_cookies();
	const _reflect$4 = require_reflect();
	const _workasyncstorageexternal$3 = require_dynamic_rendering$1.require_work_async_storage_external();
	var ReadonlyRequestCookiesError = class ReadonlyRequestCookiesError extends Error {
		constructor() {
			super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
		}
		static callable() {
			throw new ReadonlyRequestCookiesError();
		}
	};
	var RequestCookiesAdapter = class {
		static seal(cookies$1) {
			return new Proxy(cookies$1, { get(target, prop, receiver) {
				switch (prop) {
					case "clear":
					case "delete":
					case "set": return ReadonlyRequestCookiesError.callable;
					default: return _reflect$4.ReflectAdapter.get(target, prop, receiver);
				}
			} });
		}
	};
	const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
	function getModifiedCookieValues(cookies$1) {
		const modified = cookies$1[SYMBOL_MODIFY_COOKIE_VALUES];
		if (!modified || !Array.isArray(modified) || modified.length === 0) return [];
		return modified;
	}
	function appendMutableCookies(headers$1, mutableCookies) {
		const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
		if (modifiedCookieValues.length === 0) return false;
		const resCookies = new _cookies$1.ResponseCookies(headers$1);
		const returnedCookies = resCookies.getAll();
		for (const cookie of modifiedCookieValues) resCookies.set(cookie);
		for (const cookie of returnedCookies) resCookies.set(cookie);
		return true;
	}
	var MutableRequestCookiesAdapter = class {
		static wrap(cookies$1, onUpdateCookies) {
			const responseCookies = new _cookies$1.ResponseCookies(new Headers());
			for (const cookie of cookies$1.getAll()) responseCookies.set(cookie);
			let modifiedValues = [];
			const modifiedCookies = /* @__PURE__ */ new Set();
			const updateResponseCookies = () => {
				const workStore = _workasyncstorageexternal$3.workAsyncStorage.getStore();
				if (workStore) workStore.pathWasRevalidated = true;
				modifiedValues = responseCookies.getAll().filter((c) => modifiedCookies.has(c.name));
				if (onUpdateCookies) {
					const serializedCookies = [];
					for (const cookie of modifiedValues) {
						const tempCookies = new _cookies$1.ResponseCookies(new Headers());
						tempCookies.set(cookie);
						serializedCookies.push(tempCookies.toString());
					}
					onUpdateCookies(serializedCookies);
				}
			};
			const wrappedCookies = new Proxy(responseCookies, { get(target, prop, receiver) {
				switch (prop) {
					case SYMBOL_MODIFY_COOKIE_VALUES: return modifiedValues;
					case "delete": return function(...args) {
						modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
						try {
							target.delete(...args);
							return wrappedCookies;
						} finally {
							updateResponseCookies();
						}
					};
					case "set": return function(...args) {
						modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
						try {
							target.set(...args);
							return wrappedCookies;
						} finally {
							updateResponseCookies();
						}
					};
					default: return _reflect$4.ReflectAdapter.get(target, prop, receiver);
				}
			} });
			return wrappedCookies;
		}
	};
	function createCookiesWithMutableAccessCheck(requestStore) {
		const wrappedCookies = new Proxy(requestStore.mutableCookies, { get(target, prop, receiver) {
			switch (prop) {
				case "delete": return function(...args) {
					ensureCookiesAreStillMutable(requestStore, "cookies().delete");
					target.delete(...args);
					return wrappedCookies;
				};
				case "set": return function(...args) {
					ensureCookiesAreStillMutable(requestStore, "cookies().set");
					target.set(...args);
					return wrappedCookies;
				};
				default: return _reflect$4.ReflectAdapter.get(target, prop, receiver);
			}
		} });
		return wrappedCookies;
	}
	function areCookiesMutableInCurrentPhase(requestStore) {
		return requestStore.phase === "action";
	}
	/** Ensure that cookies() starts throwing on mutation
	* if we changed phases and can no longer mutate.
	*
	* This can happen when going:
	*   'render' -> 'after'
	*   'action' -> 'render'
	* */ function ensureCookiesAreStillMutable(requestStore, _callingExpression) {
		if (!areCookiesMutableInCurrentPhase(requestStore)) throw new ReadonlyRequestCookiesError();
	}
	function responseCookiesToRequestCookies(responseCookies) {
		const requestCookies = new _cookies$1.RequestCookies(new Headers());
		for (const cookie of responseCookies.getAll()) requestCookies.set(cookie);
		return requestCookies;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js
var require_create_deduped_by_callsite_server_error_logger = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "createDedupedByCallsiteServerErrorLoggerDev", {
		enumerable: true,
		get: function() {
			return createDedupedByCallsiteServerErrorLoggerDev;
		}
	});
	const _react = /* @__PURE__ */ _interop_require_wildcard(require("react"));
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop$1) {
			return nodeInterop$1 ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache$1 = _getRequireWildcardCache(nodeInterop);
		if (cache$1 && cache$1.has(obj)) return cache$1.get(obj);
		var newObj = { __proto__: null };
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache$1) cache$1.set(obj, newObj);
		return newObj;
	}
	const errorRef = { current: null };
	const cache = typeof _react.cache === "function" ? _react.cache : (fn) => fn;
	const logErrorOrWarn = process.env.__NEXT_CACHE_COMPONENTS ? console.error : console.warn;
	const flushCurrentErrorIfNew = cache((key) => {
		try {
			logErrorOrWarn(errorRef.current);
		} finally {
			errorRef.current = null;
		}
	});
	function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
		return function logDedupedError(...args) {
			const message = getMessage(...args);
			if (process.env.NODE_ENV !== "production") {
				var _stack;
				const callStackFrames = (_stack = (/* @__PURE__ */ new Error()).stack) == null ? void 0 : _stack.split("\n");
				if (callStackFrames === void 0 || callStackFrames.length < 4) logErrorOrWarn(message);
				else {
					const key = callStackFrames[4];
					errorRef.current = message;
					flushCurrentErrorIfNew(key);
				}
			} else logErrorOrWarn(message);
		};
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js
var require_after_task_async_storage_instance = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "afterTaskAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return afterTaskAsyncStorageInstance;
		}
	});
	const afterTaskAsyncStorageInstance = (0, require_dynamic_rendering$1.require_async_local_storage().createAsyncLocalStorage)();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js
var require_after_task_async_storage_external = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "afterTaskAsyncStorage", {
		enumerable: true,
		get: function() {
			return _aftertaskasyncstorageinstance.afterTaskAsyncStorageInstance;
		}
	});
	const _aftertaskasyncstorageinstance = require_after_task_async_storage_instance();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/utils.js
var require_utils = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/utils.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$1(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$1(exports, {
		isRequestAPICallableInsideAfter: function() {
			return isRequestAPICallableInsideAfter;
		},
		throwForSearchParamsAccessInUseCache: function() {
			return throwForSearchParamsAccessInUseCache;
		},
		throwWithStaticGenerationBailoutError: function() {
			return throwWithStaticGenerationBailoutError;
		},
		throwWithStaticGenerationBailoutErrorWithDynamicError: function() {
			return throwWithStaticGenerationBailoutErrorWithDynamicError;
		}
	});
	const _staticgenerationbailout$3 = require_dynamic_rendering$1.require_static_generation_bailout();
	const _aftertaskasyncstorageexternal = require_after_task_async_storage_external();
	function throwWithStaticGenerationBailoutError(route, expression) {
		throw Object.defineProperty(new _staticgenerationbailout$3.StaticGenBailoutError(`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
			value: "E576",
			enumerable: false,
			configurable: true
		});
	}
	function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
		throw Object.defineProperty(new _staticgenerationbailout$3.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
			value: "E543",
			enumerable: false,
			configurable: true
		});
	}
	function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
		const error = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "searchParams" inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await "searchParams" outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
			value: "E779",
			enumerable: false,
			configurable: true
		});
		Error.captureStackTrace(error, constructorOpt);
		workStore.invalidDynamicUsageError ??= error;
		throw error;
	}
	function isRequestAPICallableInsideAfter() {
		const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
		return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === "action";
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/cookies.js
var require_cookies = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/cookies.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "cookies", {
		enumerable: true,
		get: function() {
			return cookies;
		}
	});
	const _requestcookies = require_request_cookies();
	const _cookies = require_dynamic_rendering$1.require_cookies();
	const _workasyncstorageexternal$2 = require_dynamic_rendering$1.require_work_async_storage_external();
	const _workunitasyncstorageexternal$2 = require_dynamic_rendering$1.require_work_unit_async_storage_external();
	const _dynamicrendering$2 = require_dynamic_rendering$1.require_dynamic_rendering();
	const _staticgenerationbailout$2 = require_dynamic_rendering$1.require_static_generation_bailout();
	const _dynamicrenderingutils$1 = require_dynamic_rendering$1.require_dynamic_rendering_utils();
	const _creatededupedbycallsiteservererrorlogger$2 = require_create_deduped_by_callsite_server_error_logger();
	const _utils$1 = require_utils();
	const _invarianterror$2 = require_dynamic_rendering$1.require_invariant_error();
	const _reflect$3 = require_reflect();
	function cookies() {
		const callingExpression = "cookies";
		const workStore = _workasyncstorageexternal$2.workAsyncStorage.getStore();
		const workUnitStore = _workunitasyncstorageexternal$2.workUnitAsyncStorage.getStore();
		if (workStore) {
			if (workUnitStore && workUnitStore.phase === "after" && !(0, _utils$1.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "cookies" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "cookies" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
				value: "E88",
				enumerable: false,
				configurable: true
			});
			if (workStore.forceStatic) return makeUntrackedExoticCookies(createEmptyCookies());
			if (workStore.dynamicShouldError) throw Object.defineProperty(new _staticgenerationbailout$2.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`cookies\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
				value: "E549",
				enumerable: false,
				configurable: true
			});
			if (workUnitStore) switch (workUnitStore.type) {
				case "cache":
					const error = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "cookies" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
						value: "E398",
						enumerable: false,
						configurable: true
					});
					Error.captureStackTrace(error, cookies);
					workStore.invalidDynamicUsageError ??= error;
					throw error;
				case "unstable-cache": throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "cookies" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "cookies" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
					value: "E157",
					enumerable: false,
					configurable: true
				});
				case "prerender": return makeHangingCookies(workStore, workUnitStore);
				case "prerender-client":
					const exportName = "`cookies`";
					throw Object.defineProperty(new _invarianterror$2.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
						value: "E693",
						enumerable: false,
						configurable: true
					});
				case "prerender-ppr": return (0, _dynamicrendering$2.postponeWithTracking)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
				case "prerender-legacy": return (0, _dynamicrendering$2.throwToInterruptStaticGeneration)(callingExpression, workStore, workUnitStore);
				case "prerender-runtime": return (0, _dynamicrendering$2.delayUntilRuntimeStage)(workUnitStore, makeUntrackedCookies(workUnitStore.cookies));
				case "private-cache":
					if (process.env.__NEXT_CACHE_COMPONENTS) return makeUntrackedCookies(workUnitStore.cookies);
					return makeUntrackedExoticCookies(workUnitStore.cookies);
				case "request":
					(0, _dynamicrendering$2.trackDynamicDataInDynamicRender)(workUnitStore);
					let underlyingCookies;
					if ((0, _requestcookies.areCookiesMutableInCurrentPhase)(workUnitStore)) underlyingCookies = workUnitStore.userspaceMutableCookies;
					else underlyingCookies = workUnitStore.cookies;
					if (process.env.NODE_ENV === "development") {
						if (process.env.__NEXT_CACHE_COMPONENTS) return makeUntrackedCookiesWithDevWarnings(underlyingCookies, workStore == null ? void 0 : workStore.route);
						return makeUntrackedExoticCookiesWithDevWarnings(underlyingCookies, workStore == null ? void 0 : workStore.route);
					} else {
						if (process.env.__NEXT_CACHE_COMPONENTS) return makeUntrackedCookies(underlyingCookies);
						return makeUntrackedExoticCookies(underlyingCookies);
					}
				default:
			}
		}
		(0, _workunitasyncstorageexternal$2.throwForMissingRequestStore)(callingExpression);
	}
	function createEmptyCookies() {
		return _requestcookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
	}
	const CachedCookies = /* @__PURE__ */ new WeakMap();
	function makeHangingCookies(workStore, prerenderStore) {
		const cachedPromise = CachedCookies.get(prerenderStore);
		if (cachedPromise) return cachedPromise;
		const promise = (0, _dynamicrenderingutils$1.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, "`cookies()`");
		CachedCookies.set(prerenderStore, promise);
		return promise;
	}
	function makeUntrackedCookies(underlyingCookies) {
		const cachedCookies = CachedCookies.get(underlyingCookies);
		if (cachedCookies) return cachedCookies;
		const promise = Promise.resolve(underlyingCookies);
		CachedCookies.set(underlyingCookies, promise);
		return promise;
	}
	function makeUntrackedExoticCookies(underlyingCookies) {
		const cachedCookies = CachedCookies.get(underlyingCookies);
		if (cachedCookies) return cachedCookies;
		const promise = Promise.resolve(underlyingCookies);
		CachedCookies.set(underlyingCookies, promise);
		Object.defineProperties(promise, {
			[Symbol.iterator]: { value: underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].bind(underlyingCookies) : polyfilledResponseCookiesIterator.bind(underlyingCookies) },
			size: { get() {
				return underlyingCookies.size;
			} },
			get: { value: underlyingCookies.get.bind(underlyingCookies) },
			getAll: { value: underlyingCookies.getAll.bind(underlyingCookies) },
			has: { value: underlyingCookies.has.bind(underlyingCookies) },
			set: { value: underlyingCookies.set.bind(underlyingCookies) },
			delete: { value: underlyingCookies.delete.bind(underlyingCookies) },
			clear: { value: typeof underlyingCookies.clear === "function" ? underlyingCookies.clear.bind(underlyingCookies) : polyfilledResponseCookiesClear.bind(underlyingCookies, promise) },
			toString: { value: underlyingCookies.toString.bind(underlyingCookies) }
		});
		return promise;
	}
	function makeUntrackedExoticCookiesWithDevWarnings(underlyingCookies, route) {
		const cachedCookies = CachedCookies.get(underlyingCookies);
		if (cachedCookies) return cachedCookies;
		const promise = (0, _dynamicrenderingutils$1.makeDevtoolsIOAwarePromise)(underlyingCookies);
		CachedCookies.set(underlyingCookies, promise);
		Object.defineProperties(promise, {
			[Symbol.iterator]: {
				value: function() {
					syncIODev$2(route, "`...cookies()` or similar iteration");
					return underlyingCookies[Symbol.iterator] ? underlyingCookies[Symbol.iterator].apply(underlyingCookies, arguments) : polyfilledResponseCookiesIterator.call(underlyingCookies);
				},
				writable: false
			},
			size: { get() {
				syncIODev$2(route, "`cookies().size`");
				return underlyingCookies.size;
			} },
			get: {
				value: function get() {
					let expression;
					if (arguments.length === 0) expression = "`cookies().get()`";
					else expression = `\`cookies().get(${describeNameArg$1(arguments[0])})\``;
					syncIODev$2(route, expression);
					return underlyingCookies.get.apply(underlyingCookies, arguments);
				},
				writable: false
			},
			getAll: {
				value: function getAll() {
					let expression;
					if (arguments.length === 0) expression = "`cookies().getAll()`";
					else expression = `\`cookies().getAll(${describeNameArg$1(arguments[0])})\``;
					syncIODev$2(route, expression);
					return underlyingCookies.getAll.apply(underlyingCookies, arguments);
				},
				writable: false
			},
			has: {
				value: function get() {
					let expression;
					if (arguments.length === 0) expression = "`cookies().has()`";
					else expression = `\`cookies().has(${describeNameArg$1(arguments[0])})\``;
					syncIODev$2(route, expression);
					return underlyingCookies.has.apply(underlyingCookies, arguments);
				},
				writable: false
			},
			set: {
				value: function set() {
					let expression;
					if (arguments.length === 0) expression = "`cookies().set()`";
					else {
						const arg = arguments[0];
						if (arg) expression = `\`cookies().set(${describeNameArg$1(arg)}, ...)\``;
						else expression = "`cookies().set(...)`";
					}
					syncIODev$2(route, expression);
					return underlyingCookies.set.apply(underlyingCookies, arguments);
				},
				writable: false
			},
			delete: {
				value: function() {
					let expression;
					if (arguments.length === 0) expression = "`cookies().delete()`";
					else if (arguments.length === 1) expression = `\`cookies().delete(${describeNameArg$1(arguments[0])})\``;
					else expression = `\`cookies().delete(${describeNameArg$1(arguments[0])}, ...)\``;
					syncIODev$2(route, expression);
					return underlyingCookies.delete.apply(underlyingCookies, arguments);
				},
				writable: false
			},
			clear: {
				value: function clear() {
					syncIODev$2(route, "`cookies().clear()`");
					return typeof underlyingCookies.clear === "function" ? underlyingCookies.clear.apply(underlyingCookies, arguments) : polyfilledResponseCookiesClear.call(underlyingCookies, promise);
				},
				writable: false
			},
			toString: {
				value: function toString() {
					syncIODev$2(route, "`cookies().toString()` or implicit casting");
					return underlyingCookies.toString.apply(underlyingCookies, arguments);
				},
				writable: false
			}
		});
		return promise;
	}
	function makeUntrackedCookiesWithDevWarnings(underlyingCookies, route) {
		const cachedCookies = CachedCookies.get(underlyingCookies);
		if (cachedCookies) return cachedCookies;
		const promise = (0, _dynamicrenderingutils$1.makeDevtoolsIOAwarePromise)(underlyingCookies);
		const proxiedPromise = new Proxy(promise, { get(target, prop, receiver) {
			switch (prop) {
				case Symbol.iterator:
					warnForSyncAccess$2(route, "`...cookies()` or similar iteration");
					break;
				case "size":
				case "get":
				case "getAll":
				case "has":
				case "set":
				case "delete":
				case "clear":
				case "toString":
					warnForSyncAccess$2(route, `\`cookies().${prop}\``);
					break;
				default:
			}
			return _reflect$3.ReflectAdapter.get(target, prop, receiver);
		} });
		CachedCookies.set(underlyingCookies, proxiedPromise);
		return proxiedPromise;
	}
	function describeNameArg$1(arg) {
		return typeof arg === "object" && arg !== null && typeof arg.name === "string" ? `'${arg.name}'` : typeof arg === "string" ? `'${arg}'` : "...";
	}
	function syncIODev$2(route, expression) {
		const workUnitStore = _workunitasyncstorageexternal$2.workUnitAsyncStorage.getStore();
		if (workUnitStore) switch (workUnitStore.type) {
			case "request":
				if (workUnitStore.prerenderPhase === true) (0, _dynamicrendering$2.trackSynchronousRequestDataAccessInDev)(workUnitStore);
				break;
			case "prerender":
			case "prerender-client":
			case "prerender-runtime":
			case "prerender-ppr":
			case "prerender-legacy":
			case "cache":
			case "private-cache":
			case "unstable-cache": break;
			default:
		}
		warnForSyncAccess$2(route, expression);
	}
	const warnForSyncAccess$2 = (0, _creatededupedbycallsiteservererrorlogger$2.createDedupedByCallsiteServerErrorLoggerDev)(createCookiesAccessError);
	function createCookiesAccessError(route, expression) {
		const prefix = route ? `Route "${route}" ` : "This route ";
		return Object.defineProperty(/* @__PURE__ */ new Error(`${prefix}used ${expression}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
			value: "E223",
			enumerable: false,
			configurable: true
		});
	}
	function polyfilledResponseCookiesIterator() {
		return this.getAll().map((c) => [c.name, c]).values();
	}
	function polyfilledResponseCookiesClear(returnable) {
		for (const cookie of this.getAll()) this.delete(cookie.name);
		return returnable;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/headers.js
var require_headers$2 = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/headers.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		HeadersAdapter: function() {
			return HeadersAdapter;
		},
		ReadonlyHeadersError: function() {
			return ReadonlyHeadersError;
		}
	});
	const _reflect$2 = require_reflect();
	var ReadonlyHeadersError = class ReadonlyHeadersError extends Error {
		constructor() {
			super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
		}
		static callable() {
			throw new ReadonlyHeadersError();
		}
	};
	var HeadersAdapter = class HeadersAdapter extends Headers {
		constructor(headers$1) {
			super();
			this.headers = new Proxy(headers$1, {
				get(target, prop, receiver) {
					if (typeof prop === "symbol") return _reflect$2.ReflectAdapter.get(target, prop, receiver);
					const lowercased = prop.toLowerCase();
					const original = Object.keys(headers$1).find((o) => o.toLowerCase() === lowercased);
					if (typeof original === "undefined") return;
					return _reflect$2.ReflectAdapter.get(target, original, receiver);
				},
				set(target, prop, value, receiver) {
					if (typeof prop === "symbol") return _reflect$2.ReflectAdapter.set(target, prop, value, receiver);
					const lowercased = prop.toLowerCase();
					const original = Object.keys(headers$1).find((o) => o.toLowerCase() === lowercased);
					return _reflect$2.ReflectAdapter.set(target, original ?? prop, value, receiver);
				},
				has(target, prop) {
					if (typeof prop === "symbol") return _reflect$2.ReflectAdapter.has(target, prop);
					const lowercased = prop.toLowerCase();
					const original = Object.keys(headers$1).find((o) => o.toLowerCase() === lowercased);
					if (typeof original === "undefined") return false;
					return _reflect$2.ReflectAdapter.has(target, original);
				},
				deleteProperty(target, prop) {
					if (typeof prop === "symbol") return _reflect$2.ReflectAdapter.deleteProperty(target, prop);
					const lowercased = prop.toLowerCase();
					const original = Object.keys(headers$1).find((o) => o.toLowerCase() === lowercased);
					if (typeof original === "undefined") return true;
					return _reflect$2.ReflectAdapter.deleteProperty(target, original);
				}
			});
		}
		/**
		* Seals a Headers instance to prevent modification by throwing an error when
		* any mutating method is called.
		*/ static seal(headers$1) {
			return new Proxy(headers$1, { get(target, prop, receiver) {
				switch (prop) {
					case "append":
					case "delete":
					case "set": return ReadonlyHeadersError.callable;
					default: return _reflect$2.ReflectAdapter.get(target, prop, receiver);
				}
			} });
		}
		/**
		* Merges a header value into a string. This stores multiple values as an
		* array, so we need to merge them into a string.
		*
		* @param value a header value
		* @returns a merged header value (a string)
		*/ merge(value) {
			if (Array.isArray(value)) return value.join(", ");
			return value;
		}
		/**
		* Creates a Headers instance from a plain object or a Headers instance.
		*
		* @param headers a plain object or a Headers instance
		* @returns a headers instance
		*/ static from(headers$1) {
			if (headers$1 instanceof Headers) return headers$1;
			return new HeadersAdapter(headers$1);
		}
		append(name, value) {
			const existing = this.headers[name];
			if (typeof existing === "string") this.headers[name] = [existing, value];
			else if (Array.isArray(existing)) existing.push(value);
			else this.headers[name] = value;
		}
		delete(name) {
			delete this.headers[name];
		}
		get(name) {
			const value = this.headers[name];
			if (typeof value !== "undefined") return this.merge(value);
			return null;
		}
		has(name) {
			return typeof this.headers[name] !== "undefined";
		}
		set(name, value) {
			this.headers[name] = value;
		}
		forEach(callbackfn, thisArg) {
			for (const [name, value] of this.entries()) callbackfn.call(thisArg, value, name, this);
		}
		*entries() {
			for (const key of Object.keys(this.headers)) {
				const name = key.toLowerCase();
				yield [name, this.get(name)];
			}
		}
		*keys() {
			for (const key of Object.keys(this.headers)) yield key.toLowerCase();
		}
		*values() {
			for (const key of Object.keys(this.headers)) yield this.get(key);
		}
		[Symbol.iterator]() {
			return this.entries();
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/headers.js
var require_headers$1 = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/headers.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "headers", {
		enumerable: true,
		get: function() {
			return headers;
		}
	});
	const _headers = require_headers$2();
	const _workasyncstorageexternal$1 = require_dynamic_rendering$1.require_work_async_storage_external();
	const _workunitasyncstorageexternal$1 = require_dynamic_rendering$1.require_work_unit_async_storage_external();
	const _dynamicrendering$1 = require_dynamic_rendering$1.require_dynamic_rendering();
	const _staticgenerationbailout$1 = require_dynamic_rendering$1.require_static_generation_bailout();
	const _dynamicrenderingutils = require_dynamic_rendering$1.require_dynamic_rendering_utils();
	const _creatededupedbycallsiteservererrorlogger$1 = require_create_deduped_by_callsite_server_error_logger();
	const _utils = require_utils();
	const _invarianterror$1 = require_dynamic_rendering$1.require_invariant_error();
	const _reflect$1 = require_reflect();
	function headers() {
		const callingExpression = "headers";
		const workStore = _workasyncstorageexternal$1.workAsyncStorage.getStore();
		const workUnitStore = _workunitasyncstorageexternal$1.workUnitAsyncStorage.getStore();
		if (workStore) {
			if (workUnitStore && workUnitStore.phase === "after" && !(0, _utils.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
				value: "E367",
				enumerable: false,
				configurable: true
			});
			if (workStore.forceStatic) return makeUntrackedExoticHeaders(_headers.HeadersAdapter.seal(new Headers({})));
			if (workUnitStore) switch (workUnitStore.type) {
				case "cache": {
					const error = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
						value: "E304",
						enumerable: false,
						configurable: true
					});
					Error.captureStackTrace(error, headers);
					workStore.invalidDynamicUsageError ??= error;
					throw error;
				}
				case "private-cache": {
					const error = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "headers" inside "use cache: private". Accessing "headers" inside a private cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
						value: "E742",
						enumerable: false,
						configurable: true
					});
					Error.captureStackTrace(error, headers);
					workStore.invalidDynamicUsageError ??= error;
					throw error;
				}
				case "unstable-cache": throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
					value: "E127",
					enumerable: false,
					configurable: true
				});
				case "prerender":
				case "prerender-client":
				case "prerender-runtime":
				case "prerender-ppr":
				case "prerender-legacy":
				case "request": break;
				default:
			}
			if (workStore.dynamicShouldError) throw Object.defineProperty(new _staticgenerationbailout$1.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
				value: "E525",
				enumerable: false,
				configurable: true
			});
			if (workUnitStore) switch (workUnitStore.type) {
				case "prerender":
				case "prerender-runtime": return makeHangingHeaders(workStore, workUnitStore);
				case "prerender-client":
					const exportName = "`headers`";
					throw Object.defineProperty(new _invarianterror$1.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
						value: "E693",
						enumerable: false,
						configurable: true
					});
				case "prerender-ppr": return (0, _dynamicrendering$1.postponeWithTracking)(workStore.route, callingExpression, workUnitStore.dynamicTracking);
				case "prerender-legacy": return (0, _dynamicrendering$1.throwToInterruptStaticGeneration)(callingExpression, workStore, workUnitStore);
				case "request":
					(0, _dynamicrendering$1.trackDynamicDataInDynamicRender)(workUnitStore);
					if (process.env.NODE_ENV === "development") {
						if (process.env.__NEXT_CACHE_COMPONENTS) return makeUntrackedHeadersWithDevWarnings(workUnitStore.headers, workStore == null ? void 0 : workStore.route);
						return makeUntrackedExoticHeadersWithDevWarnings(workUnitStore.headers, workStore == null ? void 0 : workStore.route);
					} else {
						if (process.env.__NEXT_CACHE_COMPONENTS) return makeUntrackedHeaders(workUnitStore.headers);
						return makeUntrackedExoticHeaders(workUnitStore.headers);
					}
					break;
				default:
			}
		}
		(0, _workunitasyncstorageexternal$1.throwForMissingRequestStore)(callingExpression);
	}
	const CachedHeaders = /* @__PURE__ */ new WeakMap();
	function makeHangingHeaders(workStore, prerenderStore) {
		const cachedHeaders = CachedHeaders.get(prerenderStore);
		if (cachedHeaders) return cachedHeaders;
		const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, "`headers()`");
		CachedHeaders.set(prerenderStore, promise);
		return promise;
	}
	function makeUntrackedHeaders(underlyingHeaders) {
		const cachedHeaders = CachedHeaders.get(underlyingHeaders);
		if (cachedHeaders) return cachedHeaders;
		const promise = Promise.resolve(underlyingHeaders);
		CachedHeaders.set(underlyingHeaders, promise);
		return promise;
	}
	function makeUntrackedExoticHeaders(underlyingHeaders) {
		const cachedHeaders = CachedHeaders.get(underlyingHeaders);
		if (cachedHeaders) return cachedHeaders;
		const promise = Promise.resolve(underlyingHeaders);
		CachedHeaders.set(underlyingHeaders, promise);
		Object.defineProperties(promise, {
			append: { value: underlyingHeaders.append.bind(underlyingHeaders) },
			delete: { value: underlyingHeaders.delete.bind(underlyingHeaders) },
			get: { value: underlyingHeaders.get.bind(underlyingHeaders) },
			has: { value: underlyingHeaders.has.bind(underlyingHeaders) },
			set: { value: underlyingHeaders.set.bind(underlyingHeaders) },
			getSetCookie: { value: underlyingHeaders.getSetCookie.bind(underlyingHeaders) },
			forEach: { value: underlyingHeaders.forEach.bind(underlyingHeaders) },
			keys: { value: underlyingHeaders.keys.bind(underlyingHeaders) },
			values: { value: underlyingHeaders.values.bind(underlyingHeaders) },
			entries: { value: underlyingHeaders.entries.bind(underlyingHeaders) },
			[Symbol.iterator]: { value: underlyingHeaders[Symbol.iterator].bind(underlyingHeaders) }
		});
		return promise;
	}
	function makeUntrackedExoticHeadersWithDevWarnings(underlyingHeaders, route) {
		const cachedHeaders = CachedHeaders.get(underlyingHeaders);
		if (cachedHeaders) return cachedHeaders;
		const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingHeaders);
		CachedHeaders.set(underlyingHeaders, promise);
		Object.defineProperties(promise, {
			append: { value: function append() {
				syncIODev$1(route, `\`headers().append(${describeNameArg(arguments[0])}, ...)\``);
				return underlyingHeaders.append.apply(underlyingHeaders, arguments);
			} },
			delete: { value: function _delete() {
				syncIODev$1(route, `\`headers().delete(${describeNameArg(arguments[0])})\``);
				return underlyingHeaders.delete.apply(underlyingHeaders, arguments);
			} },
			get: { value: function get() {
				syncIODev$1(route, `\`headers().get(${describeNameArg(arguments[0])})\``);
				return underlyingHeaders.get.apply(underlyingHeaders, arguments);
			} },
			has: { value: function has() {
				syncIODev$1(route, `\`headers().has(${describeNameArg(arguments[0])})\``);
				return underlyingHeaders.has.apply(underlyingHeaders, arguments);
			} },
			set: { value: function set() {
				syncIODev$1(route, `\`headers().set(${describeNameArg(arguments[0])}, ...)\``);
				return underlyingHeaders.set.apply(underlyingHeaders, arguments);
			} },
			getSetCookie: { value: function getSetCookie() {
				syncIODev$1(route, "`headers().getSetCookie()`");
				return underlyingHeaders.getSetCookie.apply(underlyingHeaders, arguments);
			} },
			forEach: { value: function forEach() {
				syncIODev$1(route, "`headers().forEach(...)`");
				return underlyingHeaders.forEach.apply(underlyingHeaders, arguments);
			} },
			keys: { value: function keys() {
				syncIODev$1(route, "`headers().keys()`");
				return underlyingHeaders.keys.apply(underlyingHeaders, arguments);
			} },
			values: { value: function values() {
				syncIODev$1(route, "`headers().values()`");
				return underlyingHeaders.values.apply(underlyingHeaders, arguments);
			} },
			entries: { value: function entries() {
				syncIODev$1(route, "`headers().entries()`");
				return underlyingHeaders.entries.apply(underlyingHeaders, arguments);
			} },
			[Symbol.iterator]: { value: function() {
				syncIODev$1(route, "`...headers()` or similar iteration");
				return underlyingHeaders[Symbol.iterator].apply(underlyingHeaders, arguments);
			} }
		});
		return promise;
	}
	function makeUntrackedHeadersWithDevWarnings(underlyingHeaders, route) {
		const cachedHeaders = CachedHeaders.get(underlyingHeaders);
		if (cachedHeaders) return cachedHeaders;
		const promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(underlyingHeaders);
		const proxiedPromise = new Proxy(promise, { get(target, prop, receiver) {
			switch (prop) {
				case Symbol.iterator:
					warnForSyncAccess$1(route, "`...headers()` or similar iteration");
					break;
				case "append":
				case "delete":
				case "get":
				case "has":
				case "set":
				case "getSetCookie":
				case "forEach":
				case "keys":
				case "values":
				case "entries":
					warnForSyncAccess$1(route, `\`headers().${prop}\``);
					break;
				default:
			}
			return _reflect$1.ReflectAdapter.get(target, prop, receiver);
		} });
		CachedHeaders.set(underlyingHeaders, proxiedPromise);
		return proxiedPromise;
	}
	function describeNameArg(arg) {
		return typeof arg === "string" ? `'${arg}'` : "...";
	}
	function syncIODev$1(route, expression) {
		const workUnitStore = _workunitasyncstorageexternal$1.workUnitAsyncStorage.getStore();
		if (workUnitStore) switch (workUnitStore.type) {
			case "request":
				if (workUnitStore.prerenderPhase === true) (0, _dynamicrendering$1.trackSynchronousRequestDataAccessInDev)(workUnitStore);
				break;
			case "prerender":
			case "prerender-client":
			case "prerender-runtime":
			case "prerender-ppr":
			case "prerender-legacy":
			case "cache":
			case "private-cache":
			case "unstable-cache": break;
			default:
		}
		warnForSyncAccess$1(route, expression);
	}
	const warnForSyncAccess$1 = (0, _creatededupedbycallsiteservererrorlogger$1.createDedupedByCallsiteServerErrorLoggerDev)(createHeadersAccessError);
	function createHeadersAccessError(route, expression) {
		const prefix = route ? `Route "${route}" ` : "This route ";
		return Object.defineProperty(/* @__PURE__ */ new Error(`${prefix}used ${expression}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
			value: "E277",
			enumerable: false,
			configurable: true
		});
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/draft-mode.js
var require_draft_mode = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/draft-mode.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "draftMode", {
		enumerable: true,
		get: function() {
			return draftMode;
		}
	});
	const _workunitasyncstorageexternal = require_dynamic_rendering$1.require_work_unit_async_storage_external();
	const _workasyncstorageexternal = require_dynamic_rendering$1.require_work_async_storage_external();
	const _dynamicrendering = require_dynamic_rendering$1.require_dynamic_rendering();
	const _creatededupedbycallsiteservererrorlogger = require_create_deduped_by_callsite_server_error_logger();
	const _staticgenerationbailout = require_dynamic_rendering$1.require_static_generation_bailout();
	const _hooksservercontext = require_dynamic_rendering$1.require_hooks_server_context();
	const _invarianterror = require_dynamic_rendering$1.require_invariant_error();
	const _reflect = require_reflect();
	function draftMode() {
		const callingExpression = "draftMode";
		const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		if (!workStore || !workUnitStore) (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(callingExpression);
		switch (workUnitStore.type) {
			case "prerender-runtime": return (0, _dynamicrendering.delayUntilRuntimeStage)(workUnitStore, createOrGetCachedDraftMode(workUnitStore.draftMode, workStore));
			case "request": return createOrGetCachedDraftMode(workUnitStore.draftMode, workStore);
			case "cache":
			case "private-cache":
			case "unstable-cache":
				const draftModeProvider = (0, _workunitasyncstorageexternal.getDraftModeProviderForCacheScope)(workStore, workUnitStore);
				if (draftModeProvider) return createOrGetCachedDraftMode(draftModeProvider, workStore);
			case "prerender":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy": return createOrGetCachedDraftMode(null, workStore);
			default: return workUnitStore;
		}
	}
	function createOrGetCachedDraftMode(draftModeProvider, workStore) {
		const cacheKey = draftModeProvider ?? NullDraftMode;
		const cachedDraftMode = CachedDraftModes.get(cacheKey);
		if (cachedDraftMode) return cachedDraftMode;
		let promise;
		if (process.env.NODE_ENV === "development" && !(workStore == null ? void 0 : workStore.isPrefetchRequest)) {
			const route = workStore == null ? void 0 : workStore.route;
			if (process.env.__NEXT_CACHE_COMPONENTS) return createDraftModeWithDevWarnings(draftModeProvider, route);
			promise = createExoticDraftModeWithDevWarnings(draftModeProvider, route);
		} else {
			if (process.env.__NEXT_CACHE_COMPONENTS) return Promise.resolve(new DraftMode(draftModeProvider));
			promise = createExoticDraftMode(draftModeProvider);
		}
		CachedDraftModes.set(cacheKey, promise);
		return promise;
	}
	const NullDraftMode = {};
	const CachedDraftModes = /* @__PURE__ */ new WeakMap();
	function createExoticDraftMode(underlyingProvider) {
		const instance = new DraftMode(underlyingProvider);
		const promise = Promise.resolve(instance);
		Object.defineProperty(promise, "isEnabled", {
			get() {
				return instance.isEnabled;
			},
			enumerable: true,
			configurable: true
		});
		promise.enable = instance.enable.bind(instance);
		promise.disable = instance.disable.bind(instance);
		return promise;
	}
	function createExoticDraftModeWithDevWarnings(underlyingProvider, route) {
		const instance = new DraftMode(underlyingProvider);
		const promise = Promise.resolve(instance);
		Object.defineProperty(promise, "isEnabled", {
			get() {
				syncIODev(route, "`draftMode().isEnabled`");
				return instance.isEnabled;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(promise, "enable", { value: function get() {
			syncIODev(route, "`draftMode().enable()`");
			return instance.enable.apply(instance, arguments);
		} });
		Object.defineProperty(promise, "disable", { value: function get() {
			syncIODev(route, "`draftMode().disable()`");
			return instance.disable.apply(instance, arguments);
		} });
		return promise;
	}
	function createDraftModeWithDevWarnings(underlyingProvider, route) {
		const instance = new DraftMode(underlyingProvider);
		const promise = Promise.resolve(instance);
		return new Proxy(promise, { get(target, prop, receiver) {
			switch (prop) {
				case "isEnabled":
					warnForSyncAccess(route, `\`draftMode().${prop}\``);
					break;
				case "enable":
				case "disable":
					warnForSyncAccess(route, `\`draftMode().${prop}()\``);
					break;
				default:
			}
			return _reflect.ReflectAdapter.get(target, prop, receiver);
		} });
	}
	var DraftMode = class {
		constructor(provider) {
			this._provider = provider;
		}
		get isEnabled() {
			if (this._provider !== null) return this._provider.isEnabled;
			return false;
		}
		enable() {
			trackDynamicDraftMode("draftMode().enable()", this.enable);
			if (this._provider !== null) this._provider.enable();
		}
		disable() {
			trackDynamicDraftMode("draftMode().disable()", this.disable);
			if (this._provider !== null) this._provider.disable();
		}
	};
	function syncIODev(route, expression) {
		const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		if (workUnitStore) switch (workUnitStore.type) {
			case "request":
				if (workUnitStore.prerenderPhase === true) (0, _dynamicrendering.trackSynchronousRequestDataAccessInDev)(workUnitStore);
				break;
			case "prerender":
			case "prerender-client":
			case "prerender-runtime":
			case "prerender-ppr":
			case "prerender-legacy":
			case "cache":
			case "private-cache":
			case "unstable-cache": break;
			default:
		}
		warnForSyncAccess(route, expression);
	}
	const warnForSyncAccess = (0, _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(createDraftModeAccessError);
	function createDraftModeAccessError(route, expression) {
		const prefix = route ? `Route "${route}" ` : "This route ";
		return Object.defineProperty(/* @__PURE__ */ new Error(`${prefix}used ${expression}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`), "__NEXT_ERROR_CODE", {
			value: "E377",
			enumerable: false,
			configurable: true
		});
	}
	function trackDynamicDraftMode(expression, constructorOpt) {
		const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		if (workStore) {
			if ((workUnitStore == null ? void 0 : workUnitStore.phase) === "after") throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "${expression}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
				value: "E348",
				enumerable: false,
				configurable: true
			});
			if (workStore.dynamicShouldError) throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
				value: "E553",
				enumerable: false,
				configurable: true
			});
			if (workUnitStore) switch (workUnitStore.type) {
				case "cache":
				case "private-cache": {
					const error = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "${expression}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
						value: "E246",
						enumerable: false,
						configurable: true
					});
					Error.captureStackTrace(error, constructorOpt);
					workStore.invalidDynamicUsageError ??= error;
					throw error;
				}
				case "unstable-cache": throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "${expression}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
					value: "E259",
					enumerable: false,
					configurable: true
				});
				case "prerender":
				case "prerender-runtime": {
					const error = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used ${expression} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`), "__NEXT_ERROR_CODE", {
						value: "E126",
						enumerable: false,
						configurable: true
					});
					return (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(workStore.route, expression, error, workUnitStore);
				}
				case "prerender-client":
					const exportName = "`draftMode`";
					throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
						value: "E693",
						enumerable: false,
						configurable: true
					});
				case "prerender-ppr": return (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, workUnitStore.dynamicTracking);
				case "prerender-legacy":
					workUnitStore.revalidate = 0;
					const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${workStore.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
						value: "E558",
						enumerable: false,
						configurable: true
					});
					workStore.dynamicUsageDescription = expression;
					workStore.dynamicUsageStack = err.stack;
					throw err;
				case "request":
					(0, _dynamicrendering.trackDynamicDataInDynamicRender)(workUnitStore);
					break;
				default:
			}
		}
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/headers.js
var require_headers = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/headers.js": ((exports, module) => {
	module.exports.cookies = require_cookies().cookies;
	module.exports.headers = require_headers$1().headers;
	module.exports.draftMode = require_draft_mode().draftMode;
}) });

//#endregion
//#region src/constants/sessionConstants.ts
/**
* Default session cookie lifetime in seconds (24 hours).
*
* Used when no explicit session cookie expiry is configured. The session cookie
* lifetime can be overridden in two ways (evaluated in this order):
*
*   1. `sessionCookie.expiryTime` in `ThunderIDNodeConfig` — set programmatically
*      when initialising the SDK.
*   2. `THUNDERID_SESSION_COOKIE_EXPIRY_TIME` environment variable — set in `.env`
*      (e.g. `THUNDERID_SESSION_COOKIE_EXPIRY_TIME=86400`).
*   3. This constant — applied when neither of the above is present.
*
* Two independent expiry bounds apply to the session and they are generally
* NOT the same value:
*
*   - JWT `exp` claim — set by `SessionManager.createSessionToken(...)` from
*     the `accessTokenTtlSeconds` argument (i.e. the access token's `expires_in`
*     returned by the auth server, typically ~1 hour). This controls when
*     `verifySessionToken` rejects the token and is the trigger for a refresh.
*   - Browser cookie `maxAge` — set by the caller (sign-in / refresh / org-switch
*     actions) from `SessionManager.resolveSessionCookieExpiry(...)`, which returns
*     this constant by default (24 hours). This controls how long the browser
*     holds the cookie before discarding it.
*/
const DEFAULT_SESSION_COOKIE_EXPIRY_TIME = 86400;

//#endregion
//#region src/utils/SessionManager.ts
/**
* Session management utility class for JWT-based session cookies
*/
var SessionManager = class {
	/**
	* Get the signing secret from environment variable
	* Throws error in production if not set
	*/
	static getSecret() {
		const secret = process.env["THUNDERID_SECRET"];
		if (!secret) {
			if (process.env["NODE_ENV"] === "production") throw new __thunderid_node.ThunderIDRuntimeError("THUNDERID_SECRET environment variable is required in production", "session-secret-required", "nextjs", "Set the THUNDERID_SECRET environment variable with a secure random string");
			console.warn("Using default secret for development. Set THUNDERID_SECRET for production!");
			return new TextEncoder().encode("development-secret-not-for-production");
		}
		return new TextEncoder().encode(secret);
	}
	/**
	* Create a temporary session cookie for login initiation
	*/
	static async createTempSession(sessionId) {
		const secret = this.getSecret();
		return await new jose.SignJWT({
			sessionId,
			type: "temp"
		}).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("15m").sign(secret);
	}
	/**
	* Resolve the session cookie expiry time in seconds.
	*
	* Resolution order (first defined value wins):
	*   1. `configuredExpiry` — value from `ThunderIDNodeConfig.sessionCookie?.expiryTime`
	*   2. `THUNDERID_SESSION_COOKIE_EXPIRY_TIME` environment variable
	*   3. `DEFAULT_SESSION_COOKIE_EXPIRY_TIME` (24 hours)
	*/
	static resolveSessionCookieExpiry(configuredExpiry) {
		if (configuredExpiry != null && configuredExpiry > 0) return configuredExpiry;
		const envValue = process.env["THUNDERID_SESSION_COOKIE_EXPIRY_TIME"];
		if (envValue) {
			const parsed = parseInt(envValue, 10);
			if (!Number.isNaN(parsed) && parsed > 0) return parsed;
		}
		return DEFAULT_SESSION_COOKIE_EXPIRY_TIME;
	}
	static async createSessionToken(accessToken, userId, sessionId, scopes, accessTokenTtlSeconds, refreshToken, organizationId) {
		const secret = this.getSecret();
		return await new jose.SignJWT({
			accessToken,
			organizationId,
			refreshToken,
			scopes,
			sessionId,
			type: "session"
		}).setProtectedHeader({ alg: "HS256" }).setSubject(userId).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + accessTokenTtlSeconds).sign(secret);
	}
	/**
	* Verify and decode a session token
	*/
	static async verifySessionToken(token) {
		try {
			const { payload } = await (0, jose.jwtVerify)(token, this.getSecret());
			if (payload["type"] !== "session") throw new Error("Invalid token type");
			return payload;
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Invalid session token: ${error instanceof Error ? error.message : "Unknown error"}`, "invalid-session-token", "nextjs", "Session token verification failed");
		}
	}
	/**
	* Verify a session token for refresh. Validates the HMAC signature and the
	* `type === 'session'` discriminant but intentionally skips the `exp` check
	* so an expired access token can still be exchanged for a new one.
	*
	* Session lifetime is still bounded — the cookie's `maxAge` is set from
	* `sessionCookieExpiryTime`, so the browser drops an over-age session regardless
	* of the access-token exp embedded in the JWT.
	*
	* Never use the returned payload for authorization.
	*/
	static async verifySessionTokenForRefresh(token) {
		try {
			const { payload: rawPayload } = await (0, jose.compactVerify)(token, this.getSecret());
			const payload = JSON.parse(new TextDecoder().decode(rawPayload));
			if (payload.type !== "session") throw new Error("Invalid token type");
			return payload;
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Invalid session token: ${error instanceof Error ? error.message : "Unknown error"}`, "invalid-session-token-for-refresh", "nextjs", "Session token signature or type check failed during refresh");
		}
	}
	/**
	* Verify and decode a temporary session token
	*/
	static async verifyTempSession(token) {
		try {
			const { payload } = await (0, jose.jwtVerify)(token, this.getSecret());
			if (payload["type"] !== "temp") throw new Error("Invalid token type");
			return { sessionId: payload["sessionId"] };
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Invalid temporary session token: ${error instanceof Error ? error.message : "Unknown error"}`, "invalid-temp-session-token", "nextjs", "Temporary session token verification failed");
		}
	}
	/**
	* Get session cookie options
	*/
	static getSessionCookieOptions(maxAge) {
		return {
			httpOnly: true,
			maxAge,
			path: "/",
			sameSite: "lax",
			secure: process.env["NODE_ENV"] === "production"
		};
	}
	/**
	* Get temporary session cookie options
	*/
	static getTempSessionCookieOptions() {
		return {
			httpOnly: true,
			maxAge: 900,
			path: "/",
			sameSite: "lax",
			secure: process.env["NODE_ENV"] === "production"
		};
	}
	/**
	* Get session cookie name
	*/
	static getSessionCookieName() {
		return __thunderid_node.CookieConfig.SESSION_COOKIE_NAME;
	}
	/**
	* Get temporary session cookie name
	*/
	static getTempSessionCookieName() {
		return __thunderid_node.CookieConfig.TEMP_SESSION_COOKIE_NAME;
	}
};
var SessionManager_default = SessionManager;

//#endregion
Object.defineProperty(exports, 'SessionManager_default', {
  enumerable: true,
  get: function () {
    return SessionManager_default;
  }
});
Object.defineProperty(exports, 'require_headers', {
  enumerable: true,
  get: function () {
    return require_headers;
  }
});