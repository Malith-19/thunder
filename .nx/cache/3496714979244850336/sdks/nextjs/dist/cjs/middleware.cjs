//#region rolldown:runtime
var __create = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames$1(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let __thunderid_node = require("@thunderid/node");
__thunderid_node = __toESM(__thunderid_node);
let jose = require("jose");
jose = __toESM(jose);

//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js
var require_detect_domain_locale = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "detectDomainLocale", {
		enumerable: true,
		get: function() {
			return detectDomainLocale;
		}
	});
	function detectDomainLocale(domainItems, hostname, detectedLocale) {
		if (!domainItems) return;
		if (detectedLocale) detectedLocale = detectedLocale.toLowerCase();
		for (const item of domainItems) {
			var _item_domain, _item_locales;
			if (hostname === ((_item_domain = item.domain) == null ? void 0 : _item_domain.split(":", 1)[0].toLowerCase()) || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale) => locale.toLowerCase() === detectedLocale))) return item;
		}
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js
var require_remove_trailing_slash = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "removeTrailingSlash", {
		enumerable: true,
		get: function() {
			return removeTrailingSlash;
		}
	});
	function removeTrailingSlash(route) {
		return route.replace(/\/$/, "") || "/";
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/parse-path.js
var require_parse_path = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/parse-path.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "parsePath", {
		enumerable: true,
		get: function() {
			return parsePath;
		}
	});
	function parsePath(path) {
		const hashIndex = path.indexOf("#");
		const queryIndex = path.indexOf("?");
		const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
		if (hasQuery || hashIndex > -1) return {
			pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
			query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : void 0) : "",
			hash: hashIndex > -1 ? path.slice(hashIndex) : ""
		};
		return {
			pathname: path,
			query: "",
			hash: ""
		};
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js
var require_add_path_prefix = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "addPathPrefix", {
		enumerable: true,
		get: function() {
			return addPathPrefix;
		}
	});
	const _parsepath$2 = require_parse_path();
	function addPathPrefix(path, prefix) {
		if (!path.startsWith("/") || !prefix) return path;
		const { pathname, query, hash } = (0, _parsepath$2.parsePath)(path);
		return "" + prefix + pathname + query + hash;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js
var require_add_path_suffix = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "addPathSuffix", {
		enumerable: true,
		get: function() {
			return addPathSuffix;
		}
	});
	const _parsepath$1 = require_parse_path();
	function addPathSuffix(path, suffix) {
		if (!path.startsWith("/") || !suffix) return path;
		const { pathname, query, hash } = (0, _parsepath$1.parsePath)(path);
		return "" + pathname + suffix + query + hash;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js
var require_path_has_prefix = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "pathHasPrefix", {
		enumerable: true,
		get: function() {
			return pathHasPrefix;
		}
	});
	const _parsepath = require_parse_path();
	function pathHasPrefix(path, prefix) {
		if (typeof path !== "string") return false;
		const { pathname } = (0, _parsepath.parsePath)(path);
		return pathname === prefix || pathname.startsWith(prefix + "/");
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/add-locale.js
var require_add_locale = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/add-locale.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "addLocale", {
		enumerable: true,
		get: function() {
			return addLocale;
		}
	});
	const _addpathprefix$1 = require_add_path_prefix();
	const _pathhasprefix$2 = require_path_has_prefix();
	function addLocale(path, locale, defaultLocale, ignorePrefix) {
		if (!locale || locale === defaultLocale) return path;
		const lower = path.toLowerCase();
		if (!ignorePrefix) {
			if ((0, _pathhasprefix$2.pathHasPrefix)(lower, "/api")) return path;
			if ((0, _pathhasprefix$2.pathHasPrefix)(lower, "/" + locale.toLowerCase())) return path;
		}
		return (0, _addpathprefix$1.addPathPrefix)(path, "/" + locale);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js
var require_format_next_pathname_info = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "formatNextPathnameInfo", {
		enumerable: true,
		get: function() {
			return formatNextPathnameInfo;
		}
	});
	const _removetrailingslash = require_remove_trailing_slash();
	const _addpathprefix = require_add_path_prefix();
	const _addpathsuffix = require_add_path_suffix();
	const _addlocale = require_add_locale();
	function formatNextPathnameInfo(info$1) {
		let pathname = (0, _addlocale.addLocale)(info$1.pathname, info$1.locale, info$1.buildId ? void 0 : info$1.defaultLocale, info$1.ignorePrefix);
		if (info$1.buildId || !info$1.trailingSlash) pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
		if (info$1.buildId) pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, "/_next/data/" + info$1.buildId), info$1.pathname === "/" ? "index.json" : ".json");
		pathname = (0, _addpathprefix.addPathPrefix)(pathname, info$1.basePath);
		return !info$1.buildId && info$1.trailingSlash ? !pathname.endsWith("/") ? (0, _addpathsuffix.addPathSuffix)(pathname, "/") : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/get-hostname.js
var require_get_hostname = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/get-hostname.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "getHostname", {
		enumerable: true,
		get: function() {
			return getHostname;
		}
	});
	function getHostname(parsed, headers) {
		let hostname;
		if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) hostname = headers.host.toString().split(":", 1)[0];
		else if (parsed.hostname) hostname = parsed.hostname;
		else return;
		return hostname.toLowerCase();
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js
var require_normalize_locale_path = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "normalizeLocalePath", {
		enumerable: true,
		get: function() {
			return normalizeLocalePath;
		}
	});
	/**
	* A cache of lowercased locales for each list of locales. This is stored as a
	* WeakMap so if the locales are garbage collected, the cache entry will be
	* removed as well.
	*/ const cache = /* @__PURE__ */ new WeakMap();
	function normalizeLocalePath(pathname, locales) {
		if (!locales) return { pathname };
		let lowercasedLocales = cache.get(locales);
		if (!lowercasedLocales) {
			lowercasedLocales = locales.map((locale) => locale.toLowerCase());
			cache.set(locales, lowercasedLocales);
		}
		let detectedLocale;
		const segments = pathname.split("/", 2);
		if (!segments[1]) return { pathname };
		const segment = segments[1].toLowerCase();
		const index = lowercasedLocales.indexOf(segment);
		if (index < 0) return { pathname };
		detectedLocale = locales[index];
		pathname = pathname.slice(detectedLocale.length + 1) || "/";
		return {
			pathname,
			detectedLocale
		};
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js
var require_remove_path_prefix = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "removePathPrefix", {
		enumerable: true,
		get: function() {
			return removePathPrefix;
		}
	});
	const _pathhasprefix$1 = require_path_has_prefix();
	function removePathPrefix(path, prefix) {
		if (!(0, _pathhasprefix$1.pathHasPrefix)(path, prefix)) return path;
		const withoutPrefix = path.slice(prefix.length);
		if (withoutPrefix.startsWith("/")) return withoutPrefix;
		return "/" + withoutPrefix;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js
var require_get_next_pathname_info = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "getNextPathnameInfo", {
		enumerable: true,
		get: function() {
			return getNextPathnameInfo;
		}
	});
	const _normalizelocalepath = require_normalize_locale_path();
	const _removepathprefix = require_remove_path_prefix();
	const _pathhasprefix = require_path_has_prefix();
	function getNextPathnameInfo(pathname, options) {
		var _options_nextConfig;
		const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
		const info$1 = {
			pathname,
			trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
		};
		if (basePath && (0, _pathhasprefix.pathHasPrefix)(info$1.pathname, basePath)) {
			info$1.pathname = (0, _removepathprefix.removePathPrefix)(info$1.pathname, basePath);
			info$1.basePath = basePath;
		}
		let pathnameNoDataPrefix = info$1.pathname;
		if (info$1.pathname.startsWith("/_next/data/") && info$1.pathname.endsWith(".json")) {
			const paths = info$1.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
			info$1.buildId = paths[0];
			pathnameNoDataPrefix = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
			if (options.parseData === true) info$1.pathname = pathnameNoDataPrefix;
		}
		if (i18n) {
			let result = options.i18nProvider ? options.i18nProvider.analyze(info$1.pathname) : (0, _normalizelocalepath.normalizeLocalePath)(info$1.pathname, i18n.locales);
			info$1.locale = result.detectedLocale;
			var _result_pathname;
			info$1.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info$1.pathname;
			if (!result.detectedLocale && info$1.buildId) {
				result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, _normalizelocalepath.normalizeLocalePath)(pathnameNoDataPrefix, i18n.locales);
				if (result.detectedLocale) info$1.locale = result.detectedLocale;
			}
		}
		return info$1;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/next-url.js
var require_next_url = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/next-url.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "NextURL", {
		enumerable: true,
		get: function() {
			return NextURL;
		}
	});
	const _detectdomainlocale = require_detect_domain_locale();
	const _formatnextpathnameinfo = require_format_next_pathname_info();
	const _gethostname = require_get_hostname();
	const _getnextpathnameinfo = require_get_next_pathname_info();
	const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
	function parseURL(url, base) {
		return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
	}
	const Internal = Symbol("NextURLInternal");
	var NextURL = class NextURL {
		constructor(input, baseOrOpts, opts) {
			let base;
			let options;
			if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
				base = baseOrOpts;
				options = opts || {};
			} else options = opts || baseOrOpts || {};
			this[Internal] = {
				url: parseURL(input, base ?? options.base),
				options,
				basePath: ""
			};
			this.analyze();
		}
		analyze() {
			var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
			const info$1 = (0, _getnextpathnameinfo.getNextPathnameInfo)(this[Internal].url.pathname, {
				nextConfig: this[Internal].options.nextConfig,
				parseData: !process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE,
				i18nProvider: this[Internal].options.i18nProvider
			});
			const hostname = (0, _gethostname.getHostname)(this[Internal].url, this[Internal].options.headers);
			this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : (0, _detectdomainlocale.detectDomainLocale)((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
			const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
			this[Internal].url.pathname = info$1.pathname;
			this[Internal].defaultLocale = defaultLocale;
			this[Internal].basePath = info$1.basePath ?? "";
			this[Internal].buildId = info$1.buildId;
			this[Internal].locale = info$1.locale ?? defaultLocale;
			this[Internal].trailingSlash = info$1.trailingSlash;
		}
		formatPathname() {
			return (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
				basePath: this[Internal].basePath,
				buildId: this[Internal].buildId,
				defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : void 0,
				locale: this[Internal].locale,
				pathname: this[Internal].url.pathname,
				trailingSlash: this[Internal].trailingSlash
			});
		}
		formatSearch() {
			return this[Internal].url.search;
		}
		get buildId() {
			return this[Internal].buildId;
		}
		set buildId(buildId) {
			this[Internal].buildId = buildId;
		}
		get locale() {
			return this[Internal].locale ?? "";
		}
		set locale(locale) {
			var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
			if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) throw Object.defineProperty(/* @__PURE__ */ new TypeError(`The NextURL configuration includes no locale "${locale}"`), "__NEXT_ERROR_CODE", {
				value: "E597",
				enumerable: false,
				configurable: true
			});
			this[Internal].locale = locale;
		}
		get defaultLocale() {
			return this[Internal].defaultLocale;
		}
		get domainLocale() {
			return this[Internal].domainLocale;
		}
		get searchParams() {
			return this[Internal].url.searchParams;
		}
		get host() {
			return this[Internal].url.host;
		}
		set host(value) {
			this[Internal].url.host = value;
		}
		get hostname() {
			return this[Internal].url.hostname;
		}
		set hostname(value) {
			this[Internal].url.hostname = value;
		}
		get port() {
			return this[Internal].url.port;
		}
		set port(value) {
			this[Internal].url.port = value;
		}
		get protocol() {
			return this[Internal].url.protocol;
		}
		set protocol(value) {
			this[Internal].url.protocol = value;
		}
		get href() {
			const pathname = this.formatPathname();
			const search = this.formatSearch();
			return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
		}
		set href(url) {
			this[Internal].url = parseURL(url);
			this.analyze();
		}
		get origin() {
			return this[Internal].url.origin;
		}
		get pathname() {
			return this[Internal].url.pathname;
		}
		set pathname(value) {
			this[Internal].url.pathname = value;
		}
		get hash() {
			return this[Internal].url.hash;
		}
		set hash(value) {
			this[Internal].url.hash = value;
		}
		get search() {
			return this[Internal].url.search;
		}
		set search(value) {
			this[Internal].url.search = value;
		}
		get password() {
			return this[Internal].url.password;
		}
		set password(value) {
			this[Internal].url.password = value;
		}
		get username() {
			return this[Internal].url.username;
		}
		set username(value) {
			this[Internal].url.username = value;
		}
		get basePath() {
			return this[Internal].basePath;
		}
		set basePath(value) {
			this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
		}
		toString() {
			return this.href;
		}
		toJSON() {
			return this.href;
		}
		[Symbol.for("edge-runtime.inspect.custom")]() {
			return {
				href: this.href,
				origin: this.origin,
				protocol: this.protocol,
				username: this.username,
				password: this.password,
				host: this.host,
				hostname: this.hostname,
				port: this.port,
				pathname: this.pathname,
				search: this.search,
				searchParams: this.searchParams,
				hash: this.hash
			};
		}
		clone() {
			return new NextURL(String(this), this[Internal].options);
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/constants.js
var require_constants = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/constants.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$20(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$20(exports, {
		ACTION_SUFFIX: function() {
			return ACTION_SUFFIX;
		},
		APP_DIR_ALIAS: function() {
			return APP_DIR_ALIAS;
		},
		CACHE_ONE_YEAR: function() {
			return CACHE_ONE_YEAR;
		},
		DOT_NEXT_ALIAS: function() {
			return DOT_NEXT_ALIAS;
		},
		ESLINT_DEFAULT_DIRS: function() {
			return ESLINT_DEFAULT_DIRS;
		},
		GSP_NO_RETURNED_VALUE: function() {
			return GSP_NO_RETURNED_VALUE;
		},
		GSSP_COMPONENT_MEMBER_ERROR: function() {
			return GSSP_COMPONENT_MEMBER_ERROR;
		},
		GSSP_NO_RETURNED_VALUE: function() {
			return GSSP_NO_RETURNED_VALUE;
		},
		HTML_CONTENT_TYPE_HEADER: function() {
			return HTML_CONTENT_TYPE_HEADER;
		},
		INFINITE_CACHE: function() {
			return INFINITE_CACHE;
		},
		INSTRUMENTATION_HOOK_FILENAME: function() {
			return INSTRUMENTATION_HOOK_FILENAME;
		},
		JSON_CONTENT_TYPE_HEADER: function() {
			return JSON_CONTENT_TYPE_HEADER;
		},
		MATCHED_PATH_HEADER: function() {
			return MATCHED_PATH_HEADER;
		},
		MIDDLEWARE_FILENAME: function() {
			return MIDDLEWARE_FILENAME;
		},
		MIDDLEWARE_LOCATION_REGEXP: function() {
			return MIDDLEWARE_LOCATION_REGEXP;
		},
		NEXT_BODY_SUFFIX: function() {
			return NEXT_BODY_SUFFIX;
		},
		NEXT_CACHE_IMPLICIT_TAG_ID: function() {
			return NEXT_CACHE_IMPLICIT_TAG_ID;
		},
		NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
			return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
		},
		NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
			return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
		},
		NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
			return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
		},
		NEXT_CACHE_TAGS_HEADER: function() {
			return NEXT_CACHE_TAGS_HEADER;
		},
		NEXT_CACHE_TAG_MAX_ITEMS: function() {
			return NEXT_CACHE_TAG_MAX_ITEMS;
		},
		NEXT_CACHE_TAG_MAX_LENGTH: function() {
			return NEXT_CACHE_TAG_MAX_LENGTH;
		},
		NEXT_DATA_SUFFIX: function() {
			return NEXT_DATA_SUFFIX;
		},
		NEXT_INTERCEPTION_MARKER_PREFIX: function() {
			return NEXT_INTERCEPTION_MARKER_PREFIX;
		},
		NEXT_META_SUFFIX: function() {
			return NEXT_META_SUFFIX;
		},
		NEXT_QUERY_PARAM_PREFIX: function() {
			return NEXT_QUERY_PARAM_PREFIX;
		},
		NEXT_RESUME_HEADER: function() {
			return NEXT_RESUME_HEADER;
		},
		NON_STANDARD_NODE_ENV: function() {
			return NON_STANDARD_NODE_ENV;
		},
		PAGES_DIR_ALIAS: function() {
			return PAGES_DIR_ALIAS;
		},
		PRERENDER_REVALIDATE_HEADER: function() {
			return PRERENDER_REVALIDATE_HEADER;
		},
		PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
			return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
		},
		PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
			return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
		},
		ROOT_DIR_ALIAS: function() {
			return ROOT_DIR_ALIAS;
		},
		RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
			return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
		},
		RSC_ACTION_ENCRYPTION_ALIAS: function() {
			return RSC_ACTION_ENCRYPTION_ALIAS;
		},
		RSC_ACTION_PROXY_ALIAS: function() {
			return RSC_ACTION_PROXY_ALIAS;
		},
		RSC_ACTION_VALIDATE_ALIAS: function() {
			return RSC_ACTION_VALIDATE_ALIAS;
		},
		RSC_CACHE_WRAPPER_ALIAS: function() {
			return RSC_CACHE_WRAPPER_ALIAS;
		},
		RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function() {
			return RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS;
		},
		RSC_MOD_REF_PROXY_ALIAS: function() {
			return RSC_MOD_REF_PROXY_ALIAS;
		},
		RSC_PREFETCH_SUFFIX: function() {
			return RSC_PREFETCH_SUFFIX;
		},
		RSC_SEGMENTS_DIR_SUFFIX: function() {
			return RSC_SEGMENTS_DIR_SUFFIX;
		},
		RSC_SEGMENT_SUFFIX: function() {
			return RSC_SEGMENT_SUFFIX;
		},
		RSC_SUFFIX: function() {
			return RSC_SUFFIX;
		},
		SERVER_PROPS_EXPORT_ERROR: function() {
			return SERVER_PROPS_EXPORT_ERROR;
		},
		SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
			return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
		},
		SERVER_PROPS_SSG_CONFLICT: function() {
			return SERVER_PROPS_SSG_CONFLICT;
		},
		SERVER_RUNTIME: function() {
			return SERVER_RUNTIME;
		},
		SSG_FALLBACK_EXPORT_ERROR: function() {
			return SSG_FALLBACK_EXPORT_ERROR;
		},
		SSG_GET_INITIAL_PROPS_CONFLICT: function() {
			return SSG_GET_INITIAL_PROPS_CONFLICT;
		},
		STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
			return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
		},
		TEXT_PLAIN_CONTENT_TYPE_HEADER: function() {
			return TEXT_PLAIN_CONTENT_TYPE_HEADER;
		},
		UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
			return UNSTABLE_REVALIDATE_RENAME_ERROR;
		},
		WEBPACK_LAYERS: function() {
			return WEBPACK_LAYERS;
		},
		WEBPACK_RESOURCE_QUERIES: function() {
			return WEBPACK_RESOURCE_QUERIES;
		}
	});
	const TEXT_PLAIN_CONTENT_TYPE_HEADER = "text/plain";
	const HTML_CONTENT_TYPE_HEADER = "text/html; charset=utf-8";
	const JSON_CONTENT_TYPE_HEADER = "application/json; charset=utf-8";
	const NEXT_QUERY_PARAM_PREFIX = "nxtP";
	const NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
	const MATCHED_PATH_HEADER = "x-matched-path";
	const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
	const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
	const RSC_PREFETCH_SUFFIX = ".prefetch.rsc";
	const RSC_SEGMENTS_DIR_SUFFIX = ".segments";
	const RSC_SEGMENT_SUFFIX = ".segment.rsc";
	const RSC_SUFFIX = ".rsc";
	const ACTION_SUFFIX = ".action";
	const NEXT_DATA_SUFFIX = ".json";
	const NEXT_META_SUFFIX = ".meta";
	const NEXT_BODY_SUFFIX = ".body";
	const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
	const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
	const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
	const NEXT_RESUME_HEADER = "next-resume";
	const NEXT_CACHE_TAG_MAX_ITEMS = 128;
	const NEXT_CACHE_TAG_MAX_LENGTH = 256;
	const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
	const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
	const CACHE_ONE_YEAR = 31536e3;
	const INFINITE_CACHE = 4294967294;
	const MIDDLEWARE_FILENAME = "middleware";
	const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
	const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
	const PAGES_DIR_ALIAS = "private-next-pages";
	const DOT_NEXT_ALIAS = "private-dot-next";
	const ROOT_DIR_ALIAS = "private-next-root-dir";
	const APP_DIR_ALIAS = "private-next-app-dir";
	const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
	const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
	const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
	const RSC_CACHE_WRAPPER_ALIAS = "private-next-rsc-cache-wrapper";
	const RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = "private-next-rsc-track-dynamic-import";
	const RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
	const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
	const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
	const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
	const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
	const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
	const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
	const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
	const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
	const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
	const UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.";
	const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
	const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
	const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
	const ESLINT_DEFAULT_DIRS = [
		"app",
		"pages",
		"components",
		"lib",
		"src"
	];
	const SERVER_RUNTIME = {
		edge: "edge",
		experimentalEdge: "experimental-edge",
		nodejs: "nodejs"
	};
	/**
	* The names of the webpack layers. These layers are the primitives for the
	* webpack chunks.
	*/ const WEBPACK_LAYERS_NAMES = {
		shared: "shared",
		reactServerComponents: "rsc",
		serverSideRendering: "ssr",
		actionBrowser: "action-browser",
		apiNode: "api-node",
		apiEdge: "api-edge",
		middleware: "middleware",
		instrument: "instrument",
		edgeAsset: "edge-asset",
		appPagesBrowser: "app-pages-browser",
		pagesDirBrowser: "pages-dir-browser",
		pagesDirEdge: "pages-dir-edge",
		pagesDirNode: "pages-dir-node"
	};
	const WEBPACK_LAYERS = {
		...WEBPACK_LAYERS_NAMES,
		GROUP: {
			builtinReact: [WEBPACK_LAYERS_NAMES.reactServerComponents, WEBPACK_LAYERS_NAMES.actionBrowser],
			serverOnly: [
				WEBPACK_LAYERS_NAMES.reactServerComponents,
				WEBPACK_LAYERS_NAMES.actionBrowser,
				WEBPACK_LAYERS_NAMES.instrument,
				WEBPACK_LAYERS_NAMES.middleware
			],
			neutralTarget: [WEBPACK_LAYERS_NAMES.apiNode, WEBPACK_LAYERS_NAMES.apiEdge],
			clientOnly: [WEBPACK_LAYERS_NAMES.serverSideRendering, WEBPACK_LAYERS_NAMES.appPagesBrowser],
			bundled: [
				WEBPACK_LAYERS_NAMES.reactServerComponents,
				WEBPACK_LAYERS_NAMES.actionBrowser,
				WEBPACK_LAYERS_NAMES.serverSideRendering,
				WEBPACK_LAYERS_NAMES.appPagesBrowser,
				WEBPACK_LAYERS_NAMES.shared,
				WEBPACK_LAYERS_NAMES.instrument,
				WEBPACK_LAYERS_NAMES.middleware
			],
			appPages: [
				WEBPACK_LAYERS_NAMES.reactServerComponents,
				WEBPACK_LAYERS_NAMES.serverSideRendering,
				WEBPACK_LAYERS_NAMES.appPagesBrowser,
				WEBPACK_LAYERS_NAMES.actionBrowser
			]
		}
	};
	const WEBPACK_RESOURCE_QUERIES = {
		edgeSSREntry: "__next_edge_ssr_entry__",
		metadata: "__next_metadata__",
		metadataRoute: "__next_metadata_route__",
		metadataImageMeta: "__next_metadata_image_meta__"
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/utils.js
var require_utils$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/utils.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$19(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$19(exports, {
		fromNodeOutgoingHttpHeaders: function() {
			return fromNodeOutgoingHttpHeaders;
		},
		normalizeNextQueryParam: function() {
			return normalizeNextQueryParam;
		},
		splitCookiesString: function() {
			return splitCookiesString$1;
		},
		toNodeOutgoingHttpHeaders: function() {
			return toNodeOutgoingHttpHeaders;
		},
		validateURL: function() {
			return validateURL;
		}
	});
	const _constants = require_constants();
	function fromNodeOutgoingHttpHeaders(nodeHeaders) {
		const headers = new Headers();
		for (let [key, value] of Object.entries(nodeHeaders)) {
			const values = Array.isArray(value) ? value : [value];
			for (let v of values) {
				if (typeof v === "undefined") continue;
				if (typeof v === "number") v = v.toString();
				headers.append(key, v);
			}
		}
		return headers;
	}
	function splitCookiesString$1(cookiesString) {
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	function toNodeOutgoingHttpHeaders(headers) {
		const nodeHeaders = {};
		const cookies = [];
		if (headers) for (const [key, value] of headers.entries()) if (key.toLowerCase() === "set-cookie") {
			cookies.push(...splitCookiesString$1(value));
			nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
		} else nodeHeaders[key] = value;
		return nodeHeaders;
	}
	function validateURL(url) {
		try {
			return String(new URL(String(url)));
		} catch (error$1) {
			throw Object.defineProperty(new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: error$1 }), "__NEXT_ERROR_CODE", {
				value: "E61",
				enumerable: false,
				configurable: true
			});
		}
	}
	function normalizeNextQueryParam(key) {
		const prefixes$1 = [_constants.NEXT_QUERY_PARAM_PREFIX, _constants.NEXT_INTERCEPTION_MARKER_PREFIX];
		for (const prefix of prefixes$1) if (key !== prefix && key.startsWith(prefix)) return key.substring(prefix.length);
		return null;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/error.js
var require_error = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/error.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$18(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$18(exports, {
		PageSignatureError: function() {
			return PageSignatureError;
		},
		RemovedPageError: function() {
			return RemovedPageError;
		},
		RemovedUAError: function() {
			return RemovedUAError;
		}
	});
	var PageSignatureError = class extends Error {
		constructor({ page }) {
			super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
		}
	};
	var RemovedPageError = class extends Error {
		constructor() {
			super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
		}
	};
	var RemovedUAError = class extends Error {
		constructor() {
			super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js
var require_cookies$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/compiled/@edge-runtime/cookies/index.js": ((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
	var src_exports = {};
	__export(src_exports, {
		RequestCookies: () => RequestCookies,
		ResponseCookies: () => ResponseCookies,
		parseCookie: () => parseCookie,
		parseSetCookie: () => parseSetCookie,
		stringifyCookie: () => stringifyCookie
	});
	module.exports = __toCommonJS(src_exports);
	function stringifyCookie(c) {
		var _a;
		const attrs = [
			"path" in c && c.path && `Path=${c.path}`,
			"expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
			"maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
			"domain" in c && c.domain && `Domain=${c.domain}`,
			"secure" in c && c.secure && "Secure",
			"httpOnly" in c && c.httpOnly && "HttpOnly",
			"sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
			"partitioned" in c && c.partitioned && "Partitioned",
			"priority" in c && c.priority && `Priority=${c.priority}`
		].filter(Boolean);
		const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
		return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
	}
	function parseCookie(cookie) {
		const map = /* @__PURE__ */ new Map();
		for (const pair of cookie.split(/; */)) {
			if (!pair) continue;
			const splitAt = pair.indexOf("=");
			if (splitAt === -1) {
				map.set(pair, "true");
				continue;
			}
			const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
			try {
				map.set(key, decodeURIComponent(value != null ? value : "true"));
			} catch {}
		}
		return map;
	}
	function parseSetCookie(setCookie) {
		if (!setCookie) return;
		const [[name, value], ...attributes] = parseCookie(setCookie);
		const { domain, expires, httponly, maxage, path, samesite, secure, partitioned, priority } = Object.fromEntries(attributes.map(([key, value2]) => [key.toLowerCase().replace(/-/g, ""), value2]));
		return compact({
			name,
			value: decodeURIComponent(value),
			domain,
			...expires && { expires: new Date(expires) },
			...httponly && { httpOnly: true },
			...typeof maxage === "string" && { maxAge: Number(maxage) },
			path,
			...samesite && { sameSite: parseSameSite(samesite) },
			...secure && { secure: true },
			...priority && { priority: parsePriority(priority) },
			...partitioned && { partitioned: true }
		});
	}
	function compact(t) {
		const newT = {};
		for (const key in t) if (t[key]) newT[key] = t[key];
		return newT;
	}
	var SAME_SITE = [
		"strict",
		"lax",
		"none"
	];
	function parseSameSite(string) {
		string = string.toLowerCase();
		return SAME_SITE.includes(string) ? string : void 0;
	}
	var PRIORITY = [
		"low",
		"medium",
		"high"
	];
	function parsePriority(string) {
		string = string.toLowerCase();
		return PRIORITY.includes(string) ? string : void 0;
	}
	function splitCookiesString(cookiesString) {
		if (!cookiesString) return [];
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	var RequestCookies = class {
		constructor(requestHeaders) {
			/** @internal */
			this._parsed = /* @__PURE__ */ new Map();
			this._headers = requestHeaders;
			const header = requestHeaders.get("cookie");
			if (header) {
				const parsed = parseCookie(header);
				for (const [name, value] of parsed) this._parsed.set(name, {
					name,
					value
				});
			}
		}
		[Symbol.iterator]() {
			return this._parsed[Symbol.iterator]();
		}
		/**
		* The amount of cookies received from the client
		*/
		get size() {
			return this._parsed.size;
		}
		get(...args) {
			const name = typeof args[0] === "string" ? args[0] : args[0].name;
			return this._parsed.get(name);
		}
		getAll(...args) {
			var _a;
			const all = Array.from(this._parsed);
			if (!args.length) return all.map(([_, value]) => value);
			const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
			return all.filter(([n]) => n === name).map(([_, value]) => value);
		}
		has(name) {
			return this._parsed.has(name);
		}
		set(...args) {
			const [name, value] = args.length === 1 ? [args[0].name, args[0].value] : args;
			const map = this._parsed;
			map.set(name, {
				name,
				value
			});
			this._headers.set("cookie", Array.from(map).map(([_, value2]) => stringifyCookie(value2)).join("; "));
			return this;
		}
		/**
		* Delete the cookies matching the passed name or names in the request.
		*/
		delete(names) {
			const map = this._parsed;
			const result = !Array.isArray(names) ? map.delete(names) : names.map((name) => map.delete(name));
			this._headers.set("cookie", Array.from(map).map(([_, value]) => stringifyCookie(value)).join("; "));
			return result;
		}
		/**
		* Delete all the cookies in the cookies in the request.
		*/
		clear() {
			this.delete(Array.from(this._parsed.keys()));
			return this;
		}
		/**
		* Format the cookies in the request as a string for logging
		*/
		[Symbol.for("edge-runtime.inspect.custom")]() {
			return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
		}
		toString() {
			return [...this._parsed.values()].map((v) => `${v.name}=${encodeURIComponent(v.value)}`).join("; ");
		}
	};
	var ResponseCookies = class {
		constructor(responseHeaders) {
			/** @internal */
			this._parsed = /* @__PURE__ */ new Map();
			var _a, _b, _c;
			this._headers = responseHeaders;
			const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
			const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
			for (const cookieString of cookieStrings) {
				const parsed = parseSetCookie(cookieString);
				if (parsed) this._parsed.set(parsed.name, parsed);
			}
		}
		/**
		* {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
		*/
		get(...args) {
			const key = typeof args[0] === "string" ? args[0] : args[0].name;
			return this._parsed.get(key);
		}
		/**
		* {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
		*/
		getAll(...args) {
			var _a;
			const all = Array.from(this._parsed.values());
			if (!args.length) return all;
			const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
			return all.filter((c) => c.name === key);
		}
		has(name) {
			return this._parsed.has(name);
		}
		/**
		* {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
		*/
		set(...args) {
			const [name, value, cookie] = args.length === 1 ? [
				args[0].name,
				args[0].value,
				args[0]
			] : args;
			const map = this._parsed;
			map.set(name, normalizeCookie({
				name,
				value,
				...cookie
			}));
			replace(map, this._headers);
			return this;
		}
		/**
		* {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
		*/
		delete(...args) {
			const [name, options] = typeof args[0] === "string" ? [args[0]] : [args[0].name, args[0]];
			return this.set({
				...options,
				name,
				value: "",
				expires: /* @__PURE__ */ new Date(0)
			});
		}
		[Symbol.for("edge-runtime.inspect.custom")]() {
			return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
		}
		toString() {
			return [...this._parsed.values()].map(stringifyCookie).join("; ");
		}
	};
	function replace(bag, headers) {
		headers.delete("set-cookie");
		for (const [, value] of bag) {
			const serialized = stringifyCookie(value);
			headers.append("set-cookie", serialized);
		}
	}
	function normalizeCookie(cookie = {
		name: "",
		value: ""
	}) {
		if (typeof cookie.expires === "number") cookie.expires = new Date(cookie.expires);
		if (cookie.maxAge) cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
		if (cookie.path === null || cookie.path === void 0) cookie.path = "/";
		return cookie;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/cookies.js
var require_cookies = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/cookies.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$17(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$17(exports, {
		RequestCookies: function() {
			return _cookies$2.RequestCookies;
		},
		ResponseCookies: function() {
			return _cookies$2.ResponseCookies;
		},
		stringifyCookie: function() {
			return _cookies$2.stringifyCookie;
		}
	});
	const _cookies$2 = require_cookies$1();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/request.js
var require_request = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/request.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$16(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$16(exports, {
		INTERNALS: function() {
			return INTERNALS$1;
		},
		NextRequest: function() {
			return NextRequest;
		}
	});
	const _nexturl$1 = require_next_url();
	const _utils$2 = require_utils$1();
	const _error = require_error();
	const _cookies$1 = require_cookies();
	const INTERNALS$1 = Symbol("internal request");
	var NextRequest = class extends Request {
		constructor(input, init = {}) {
			const url = typeof input !== "string" && "url" in input ? input.url : String(input);
			(0, _utils$2.validateURL)(url);
			if (process.env.NEXT_RUNTIME !== "edge") {
				if (init.body && init.duplex !== "half") init.duplex = "half";
			}
			if (input instanceof Request) super(input, init);
			else super(url, init);
			const nextUrl = new _nexturl$1.NextURL(url, {
				headers: (0, _utils$2.toNodeOutgoingHttpHeaders)(this.headers),
				nextConfig: init.nextConfig
			});
			this[INTERNALS$1] = {
				cookies: new _cookies$1.RequestCookies(this.headers),
				nextUrl,
				url: process.env.__NEXT_NO_MIDDLEWARE_URL_NORMALIZE ? url : nextUrl.toString()
			};
		}
		[Symbol.for("edge-runtime.inspect.custom")]() {
			return {
				cookies: this.cookies,
				nextUrl: this.nextUrl,
				url: this.url,
				bodyUsed: this.bodyUsed,
				cache: this.cache,
				credentials: this.credentials,
				destination: this.destination,
				headers: Object.fromEntries(this.headers),
				integrity: this.integrity,
				keepalive: this.keepalive,
				method: this.method,
				mode: this.mode,
				redirect: this.redirect,
				referrer: this.referrer,
				referrerPolicy: this.referrerPolicy,
				signal: this.signal
			};
		}
		get cookies() {
			return this[INTERNALS$1].cookies;
		}
		get nextUrl() {
			return this[INTERNALS$1].nextUrl;
		}
		/**
		* @deprecated
		* `page` has been deprecated in favour of `URLPattern`.
		* Read more: https://nextjs.org/docs/messages/middleware-request-page
		*/ get page() {
			throw new _error.RemovedPageError();
		}
		/**
		* @deprecated
		* `ua` has been removed in favour of \`userAgent\` function.
		* Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
		*/ get ua() {
			throw new _error.RemovedUAError();
		}
		get url() {
			return this[INTERNALS$1].url;
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js
var require_reflect = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js": ((exports) => {
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
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/response.js
var require_response = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/response.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "NextResponse", {
		enumerable: true,
		get: function() {
			return NextResponse$1;
		}
	});
	const _cookies = require_cookies();
	const _nexturl = require_next_url();
	const _utils$1 = require_utils$1();
	const _reflect = require_reflect();
	const _cookies1 = require_cookies();
	const INTERNALS = Symbol("internal response");
	const REDIRECTS = new Set([
		301,
		302,
		303,
		307,
		308
	]);
	function handleMiddlewareField(init, headers) {
		var _init_request;
		if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
			if (!(init.request.headers instanceof Headers)) throw Object.defineProperty(/* @__PURE__ */ new Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", {
				value: "E119",
				enumerable: false,
				configurable: true
			});
			const keys = [];
			for (const [key, value] of init.request.headers) {
				headers.set("x-middleware-request-" + key, value);
				keys.push(key);
			}
			headers.set("x-middleware-override-headers", keys.join(","));
		}
	}
	var NextResponse$1 = class NextResponse$1 extends Response {
		constructor(body, init = {}) {
			super(body, init);
			const headers = this.headers;
			const cookies = new _cookies1.ResponseCookies(headers);
			this[INTERNALS] = {
				cookies: new Proxy(cookies, { get(target, prop, receiver) {
					switch (prop) {
						case "delete":
						case "set": return (...args) => {
							const result = Reflect.apply(target[prop], target, args);
							const newHeaders = new Headers(headers);
							if (result instanceof _cookies1.ResponseCookies) headers.set("x-middleware-set-cookie", result.getAll().map((cookie) => (0, _cookies.stringifyCookie)(cookie)).join(","));
							handleMiddlewareField(init, newHeaders);
							return result;
						};
						default: return _reflect.ReflectAdapter.get(target, prop, receiver);
					}
				} }),
				url: init.url ? new _nexturl.NextURL(init.url, {
					headers: (0, _utils$1.toNodeOutgoingHttpHeaders)(headers),
					nextConfig: init.nextConfig
				}) : void 0
			};
		}
		[Symbol.for("edge-runtime.inspect.custom")]() {
			return {
				cookies: this.cookies,
				url: this.url,
				body: this.body,
				bodyUsed: this.bodyUsed,
				headers: Object.fromEntries(this.headers),
				ok: this.ok,
				redirected: this.redirected,
				status: this.status,
				statusText: this.statusText,
				type: this.type
			};
		}
		get cookies() {
			return this[INTERNALS].cookies;
		}
		static json(body, init) {
			const response = Response.json(body, init);
			return new NextResponse$1(response.body, response);
		}
		static redirect(url, init) {
			const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
			if (!REDIRECTS.has(status)) throw Object.defineProperty(/* @__PURE__ */ new RangeError("Failed to execute \"redirect\" on \"response\": Invalid status code"), "__NEXT_ERROR_CODE", {
				value: "E529",
				enumerable: false,
				configurable: true
			});
			const initObj = typeof init === "object" ? init : {};
			const headers = new Headers(initObj == null ? void 0 : initObj.headers);
			headers.set("Location", (0, _utils$1.validateURL)(url));
			return new NextResponse$1(null, {
				...initObj,
				headers,
				status
			});
		}
		static rewrite(destination, init) {
			const headers = new Headers(init == null ? void 0 : init.headers);
			headers.set("x-middleware-rewrite", (0, _utils$1.validateURL)(destination));
			handleMiddlewareField(init, headers);
			return new NextResponse$1(null, {
				...init,
				headers
			});
		}
		static next(init) {
			const headers = new Headers(init == null ? void 0 : init.headers);
			headers.set("x-middleware-next", "1");
			handleMiddlewareField(init, headers);
			return new NextResponse$1(null, {
				...init,
				headers
			});
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/image-response.js
var require_image_response = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/image-response.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "ImageResponse", {
		enumerable: true,
		get: function() {
			return ImageResponse;
		}
	});
	function ImageResponse() {
		throw Object.defineProperty(/* @__PURE__ */ new Error("ImageResponse moved from \"next/server\" to \"next/og\" since Next.js 14, please import from \"next/og\" instead"), "__NEXT_ERROR_CODE", {
			value: "E183",
			enumerable: false,
			configurable: true
		});
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js
var require_ua_parser = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/compiled/ua-parser-js/ua-parser.js": ((exports, module) => {
	(() => {
		var i = { 226: function(i$1, e$1) {
			(function(o$1, a) {
				var r = "1.0.35", t = "", n = "?", s = "function", b = "undefined", w = "object", l = "string", d = "major", c = "model", u = "name", p = "type", m = "vendor", f = "version", h = "architecture", v = "console", g = "mobile", k = "tablet", x = "smarttv", _ = "wearable", y = "embedded", q = 350, T = "Amazon", S = "Apple", z = "ASUS", N = "BlackBerry", A = "Browser", C = "Chrome", E = "Edge", O = "Firefox", U = "Google", j = "Huawei", P = "LG", R = "Microsoft", M = "Motorola", B = "Opera", V = "Samsung", D = "Sharp", I = "Sony", F = "Xiaomi", G = "Zebra", H = "Facebook", L = "Chromium OS", Z = "Mac OS";
				var extend = function(i$2, e$2) {
					var o$2 = {};
					for (var a$1 in i$2) if (e$2[a$1] && e$2[a$1].length % 2 === 0) o$2[a$1] = e$2[a$1].concat(i$2[a$1]);
					else o$2[a$1] = i$2[a$1];
					return o$2;
				}, enumerize = function(i$2) {
					var e$2 = {};
					for (var o$2 = 0; o$2 < i$2.length; o$2++) e$2[i$2[o$2].toUpperCase()] = i$2[o$2];
					return e$2;
				}, has = function(i$2, e$2) {
					return typeof i$2 === l ? lowerize(e$2).indexOf(lowerize(i$2)) !== -1 : false;
				}, lowerize = function(i$2) {
					return i$2.toLowerCase();
				}, majorize = function(i$2) {
					return typeof i$2 === l ? i$2.replace(/[^\d\.]/g, t).split(".")[0] : a;
				}, trim = function(i$2, e$2) {
					if (typeof i$2 === l) {
						i$2 = i$2.replace(/^\s\s*/, t);
						return typeof e$2 === b ? i$2 : i$2.substring(0, q);
					}
				};
				var rgxMapper = function(i$2, e$2) {
					var o$2 = 0, r$1, t$1, n$1, b$1, l$1, d$1;
					while (o$2 < e$2.length && !l$1) {
						var c$1 = e$2[o$2], u$1 = e$2[o$2 + 1];
						r$1 = t$1 = 0;
						while (r$1 < c$1.length && !l$1) {
							if (!c$1[r$1]) break;
							l$1 = c$1[r$1++].exec(i$2);
							if (!!l$1) for (n$1 = 0; n$1 < u$1.length; n$1++) {
								d$1 = l$1[++t$1];
								b$1 = u$1[n$1];
								if (typeof b$1 === w && b$1.length > 0) {
									if (b$1.length === 2) if (typeof b$1[1] == s) this[b$1[0]] = b$1[1].call(this, d$1);
									else this[b$1[0]] = b$1[1];
									else if (b$1.length === 3) if (typeof b$1[1] === s && !(b$1[1].exec && b$1[1].test)) this[b$1[0]] = d$1 ? b$1[1].call(this, d$1, b$1[2]) : a;
									else this[b$1[0]] = d$1 ? d$1.replace(b$1[1], b$1[2]) : a;
									else if (b$1.length === 4) this[b$1[0]] = d$1 ? b$1[3].call(this, d$1.replace(b$1[1], b$1[2])) : a;
								} else this[b$1] = d$1 ? d$1 : a;
							}
						}
						o$2 += 2;
					}
				}, strMapper = function(i$2, e$2) {
					for (var o$2 in e$2) if (typeof e$2[o$2] === w && e$2[o$2].length > 0) {
						for (var r$1 = 0; r$1 < e$2[o$2].length; r$1++) if (has(e$2[o$2][r$1], i$2)) return o$2 === n ? a : o$2;
					} else if (has(e$2[o$2], i$2)) return o$2 === n ? a : o$2;
					return i$2;
				};
				var $ = {
					"1.0": "/8",
					1.2: "/1",
					1.3: "/3",
					"2.0": "/412",
					"2.0.2": "/416",
					"2.0.3": "/417",
					"2.0.4": "/419",
					"?": "/"
				}, X = {
					ME: "4.90",
					"NT 3.11": "NT3.51",
					"NT 4.0": "NT4.0",
					2e3: "NT 5.0",
					XP: ["NT 5.1", "NT 5.2"],
					Vista: "NT 6.0",
					7: "NT 6.1",
					8: "NT 6.2",
					8.1: "NT 6.3",
					10: ["NT 6.4", "NT 10.0"],
					RT: "ARM"
				};
				var K = {
					browser: [
						[/\b(?:crmo|crios)\/([\w\.]+)/i],
						[f, [u, "Chrome"]],
						[/edg(?:e|ios|a)?\/([\w\.]+)/i],
						[f, [u, "Edge"]],
						[
							/(opera mini)\/([-\w\.]+)/i,
							/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
							/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
						],
						[u, f],
						[/opios[\/ ]+([\w\.]+)/i],
						[f, [u, B + " Mini"]],
						[/\bopr\/([\w\.]+)/i],
						[f, [u, B]],
						[
							/(kindle)\/([\w\.]+)/i,
							/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
							/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
							/(ba?idubrowser)[\/ ]?([\w\.]+)/i,
							/(?:ms|\()(ie) ([\w\.]+)/i,
							/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
							/(heytap|ovi)browser\/([\d\.]+)/i,
							/(weibo)__([\d\.]+)/i
						],
						[u, f],
						[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
						[f, [u, "UC" + A]],
						[/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
						[f, [u, "WeChat(Win) Desktop"]],
						[/micromessenger\/([\w\.]+)/i],
						[f, [u, "WeChat"]],
						[/konqueror\/([\w\.]+)/i],
						[f, [u, "Konqueror"]],
						[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
						[f, [u, "IE"]],
						[/ya(?:search)?browser\/([\w\.]+)/i],
						[f, [u, "Yandex"]],
						[/(avast|avg)\/([\w\.]+)/i],
						[[
							u,
							/(.+)/,
							"$1 Secure " + A
						], f],
						[/\bfocus\/([\w\.]+)/i],
						[f, [u, O + " Focus"]],
						[/\bopt\/([\w\.]+)/i],
						[f, [u, B + " Touch"]],
						[/coc_coc\w+\/([\w\.]+)/i],
						[f, [u, "Coc Coc"]],
						[/dolfin\/([\w\.]+)/i],
						[f, [u, "Dolphin"]],
						[/coast\/([\w\.]+)/i],
						[f, [u, B + " Coast"]],
						[/miuibrowser\/([\w\.]+)/i],
						[f, [u, "MIUI " + A]],
						[/fxios\/([-\w\.]+)/i],
						[f, [u, O]],
						[/\bqihu|(qi?ho?o?|360)browser/i],
						[[u, "360 " + A]],
						[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
						[[
							u,
							/(.+)/,
							"$1 " + A
						], f],
						[/(comodo_dragon)\/([\w\.]+)/i],
						[[
							u,
							/_/g,
							" "
						], f],
						[
							/(electron)\/([\w\.]+) safari/i,
							/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
							/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
						],
						[u, f],
						[
							/(metasr)[\/ ]?([\w\.]+)/i,
							/(lbbrowser)/i,
							/\[(linkedin)app\]/i
						],
						[u],
						[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
						[[u, H], f],
						[
							/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
							/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
							/safari (line)\/([\w\.]+)/i,
							/\b(line)\/([\w\.]+)\/iab/i,
							/(chromium|instagram)[\/ ]([-\w\.]+)/i
						],
						[u, f],
						[/\bgsa\/([\w\.]+) .*safari\//i],
						[f, [u, "GSA"]],
						[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
						[f, [u, "TikTok"]],
						[/headlesschrome(?:\/([\w\.]+)| )/i],
						[f, [u, C + " Headless"]],
						[/ wv\).+(chrome)\/([\w\.]+)/i],
						[[u, C + " WebView"], f],
						[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
						[f, [u, "Android " + A]],
						[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
						[u, f],
						[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
						[f, [u, "Mobile Safari"]],
						[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
						[f, u],
						[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
						[u, [
							f,
							strMapper,
							$
						]],
						[/(webkit|khtml)\/([\w\.]+)/i],
						[u, f],
						[/(navigator|netscape\d?)\/([-\w\.]+)/i],
						[[u, "Netscape"], f],
						[/mobile vr; rv:([\w\.]+)\).+firefox/i],
						[f, [u, O + " Reality"]],
						[
							/ekiohf.+(flow)\/([\w\.]+)/i,
							/(swiftfox)/i,
							/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
							/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
							/(firefox)\/([\w\.]+)/i,
							/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
							/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
							/(links) \(([\w\.]+)/i,
							/panasonic;(viera)/i
						],
						[u, f],
						[/(cobalt)\/([\w\.]+)/i],
						[u, [
							f,
							/master.|lts./,
							""
						]]
					],
					cpu: [
						[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
						[[h, "amd64"]],
						[/(ia32(?=;))/i],
						[[h, lowerize]],
						[/((?:i[346]|x)86)[;\)]/i],
						[[h, "ia32"]],
						[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
						[[h, "arm64"]],
						[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
						[[h, "armhf"]],
						[/windows (ce|mobile); ppc;/i],
						[[h, "arm"]],
						[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
						[[
							h,
							/ower/,
							t,
							lowerize
						]],
						[/(sun4\w)[;\)]/i],
						[[h, "sparc"]],
						[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],
						[[h, lowerize]]
					],
					device: [
						[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
						[
							c,
							[m, V],
							[p, k]
						],
						[
							/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
							/samsung[- ]([-\w]+)/i,
							/sec-(sgh\w+)/i
						],
						[
							c,
							[m, V],
							[p, g]
						],
						[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
						[
							c,
							[m, S],
							[p, g]
						],
						[
							/\((ipad);[-\w\),; ]+apple/i,
							/applecoremedia\/[\w\.]+ \((ipad)/i,
							/\b(ipad)\d\d?,\d\d?[;\]].+ios/i
						],
						[
							c,
							[m, S],
							[p, k]
						],
						[/(macintosh);/i],
						[c, [m, S]],
						[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
						[
							c,
							[m, D],
							[p, g]
						],
						[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
						[
							c,
							[m, j],
							[p, k]
						],
						[/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],
						[
							c,
							[m, j],
							[p, g]
						],
						[
							/\b(poco[\w ]+)(?: bui|\))/i,
							/\b; (\w+) build\/hm\1/i,
							/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
							/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
							/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
						],
						[
							[
								c,
								/_/g,
								" "
							],
							[m, F],
							[p, g]
						],
						[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
						[
							[
								c,
								/_/g,
								" "
							],
							[m, F],
							[p, k]
						],
						[/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
						[
							c,
							[m, "OPPO"],
							[p, g]
						],
						[/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
						[
							c,
							[m, "Vivo"],
							[p, g]
						],
						[/\b(rmx[12]\d{3})(?: bui|;|\))/i],
						[
							c,
							[m, "Realme"],
							[p, g]
						],
						[
							/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
							/\bmot(?:orola)?[- ](\w*)/i,
							/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
						],
						[
							c,
							[m, M],
							[p, g]
						],
						[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
						[
							c,
							[m, M],
							[p, k]
						],
						[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
						[
							c,
							[m, P],
							[p, k]
						],
						[
							/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
							/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
							/\blg-?([\d\w]+) bui/i
						],
						[
							c,
							[m, P],
							[p, g]
						],
						[/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
						[
							c,
							[m, "Lenovo"],
							[p, k]
						],
						[/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
						[
							[
								c,
								/_/g,
								" "
							],
							[m, "Nokia"],
							[p, g]
						],
						[/(pixel c)\b/i],
						[
							c,
							[m, U],
							[p, k]
						],
						[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
						[
							c,
							[m, U],
							[p, g]
						],
						[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
						[
							c,
							[m, I],
							[p, g]
						],
						[/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
						[
							[c, "Xperia Tablet"],
							[m, I],
							[p, k]
						],
						[/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
						[
							c,
							[m, "OnePlus"],
							[p, g]
						],
						[
							/(alexa)webm/i,
							/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
							/(kf[a-z]+)( bui|\)).+silk\//i
						],
						[
							c,
							[m, T],
							[p, k]
						],
						[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
						[
							[
								c,
								/(.+)/g,
								"Fire Phone $1"
							],
							[m, T],
							[p, g]
						],
						[/(playbook);[-\w\),; ]+(rim)/i],
						[
							c,
							m,
							[p, k]
						],
						[/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
						[
							c,
							[m, N],
							[p, g]
						],
						[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
						[
							c,
							[m, z],
							[p, k]
						],
						[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
						[
							c,
							[m, z],
							[p, g]
						],
						[/(nexus 9)/i],
						[
							c,
							[m, "HTC"],
							[p, k]
						],
						[
							/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
							/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
							/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
						],
						[
							m,
							[
								c,
								/_/g,
								" "
							],
							[p, g]
						],
						[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
						[
							c,
							[m, "Acer"],
							[p, k]
						],
						[/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
						[
							c,
							[m, "Meizu"],
							[p, g]
						],
						[
							/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
							/(hp) ([\w ]+\w)/i,
							/(asus)-?(\w+)/i,
							/(microsoft); (lumia[\w ]+)/i,
							/(lenovo)[-_ ]?([-\w]+)/i,
							/(jolla)/i,
							/(oppo) ?([\w ]+) bui/i
						],
						[
							m,
							c,
							[p, g]
						],
						[
							/(kobo)\s(ereader|touch)/i,
							/(archos) (gamepad2?)/i,
							/(hp).+(touchpad(?!.+tablet)|tablet)/i,
							/(kindle)\/([\w\.]+)/i,
							/(nook)[\w ]+build\/(\w+)/i,
							/(dell) (strea[kpr\d ]*[\dko])/i,
							/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
							/(trinity)[- ]*(t\d{3}) bui/i,
							/(gigaset)[- ]+(q\w{1,9}) bui/i,
							/(vodafone) ([\w ]+)(?:\)| bui)/i
						],
						[
							m,
							c,
							[p, k]
						],
						[/(surface duo)/i],
						[
							c,
							[m, R],
							[p, k]
						],
						[/droid [\d\.]+; (fp\du?)(?: b|\))/i],
						[
							c,
							[m, "Fairphone"],
							[p, g]
						],
						[/(u304aa)/i],
						[
							c,
							[m, "AT&T"],
							[p, g]
						],
						[/\bsie-(\w*)/i],
						[
							c,
							[m, "Siemens"],
							[p, g]
						],
						[/\b(rct\w+) b/i],
						[
							c,
							[m, "RCA"],
							[p, k]
						],
						[/\b(venue[\d ]{2,7}) b/i],
						[
							c,
							[m, "Dell"],
							[p, k]
						],
						[/\b(q(?:mv|ta)\w+) b/i],
						[
							c,
							[m, "Verizon"],
							[p, k]
						],
						[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
						[
							c,
							[m, "Barnes & Noble"],
							[p, k]
						],
						[/\b(tm\d{3}\w+) b/i],
						[
							c,
							[m, "NuVision"],
							[p, k]
						],
						[/\b(k88) b/i],
						[
							c,
							[m, "ZTE"],
							[p, k]
						],
						[/\b(nx\d{3}j) b/i],
						[
							c,
							[m, "ZTE"],
							[p, g]
						],
						[/\b(gen\d{3}) b.+49h/i],
						[
							c,
							[m, "Swiss"],
							[p, g]
						],
						[/\b(zur\d{3}) b/i],
						[
							c,
							[m, "Swiss"],
							[p, k]
						],
						[/\b((zeki)?tb.*\b) b/i],
						[
							c,
							[m, "Zeki"],
							[p, k]
						],
						[/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
						[
							[m, "Dragon Touch"],
							c,
							[p, k]
						],
						[/\b(ns-?\w{0,9}) b/i],
						[
							c,
							[m, "Insignia"],
							[p, k]
						],
						[/\b((nxa|next)-?\w{0,9}) b/i],
						[
							c,
							[m, "NextBook"],
							[p, k]
						],
						[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
						[
							[m, "Voice"],
							c,
							[p, g]
						],
						[/\b(lvtel\-)?(v1[12]) b/i],
						[
							[m, "LvTel"],
							c,
							[p, g]
						],
						[/\b(ph-1) /i],
						[
							c,
							[m, "Essential"],
							[p, g]
						],
						[/\b(v(100md|700na|7011|917g).*\b) b/i],
						[
							c,
							[m, "Envizen"],
							[p, k]
						],
						[/\b(trio[-\w\. ]+) b/i],
						[
							c,
							[m, "MachSpeed"],
							[p, k]
						],
						[/\btu_(1491) b/i],
						[
							c,
							[m, "Rotor"],
							[p, k]
						],
						[/(shield[\w ]+) b/i],
						[
							c,
							[m, "Nvidia"],
							[p, k]
						],
						[/(sprint) (\w+)/i],
						[
							m,
							c,
							[p, g]
						],
						[/(kin\.[onetw]{3})/i],
						[
							[
								c,
								/\./g,
								" "
							],
							[m, R],
							[p, g]
						],
						[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
						[
							c,
							[m, G],
							[p, k]
						],
						[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
						[
							c,
							[m, G],
							[p, g]
						],
						[/smart-tv.+(samsung)/i],
						[m, [p, x]],
						[/hbbtv.+maple;(\d+)/i],
						[
							[
								c,
								/^/,
								"SmartTV"
							],
							[m, V],
							[p, x]
						],
						[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
						[[m, P], [p, x]],
						[/(apple) ?tv/i],
						[
							m,
							[c, S + " TV"],
							[p, x]
						],
						[/crkey/i],
						[
							[c, C + "cast"],
							[m, U],
							[p, x]
						],
						[/droid.+aft(\w)( bui|\))/i],
						[
							c,
							[m, T],
							[p, x]
						],
						[/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
						[
							c,
							[m, D],
							[p, x]
						],
						[/(bravia[\w ]+)( bui|\))/i],
						[
							c,
							[m, I],
							[p, x]
						],
						[/(mitv-\w{5}) bui/i],
						[
							c,
							[m, F],
							[p, x]
						],
						[/Hbbtv.*(technisat) (.*);/i],
						[
							m,
							c,
							[p, x]
						],
						[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],
						[
							[m, trim],
							[c, trim],
							[p, x]
						],
						[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
						[[p, x]],
						[/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
						[
							m,
							c,
							[p, v]
						],
						[/droid.+; (shield) bui/i],
						[
							c,
							[m, "Nvidia"],
							[p, v]
						],
						[/(playstation [345portablevi]+)/i],
						[
							c,
							[m, I],
							[p, v]
						],
						[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
						[
							c,
							[m, R],
							[p, v]
						],
						[/((pebble))app/i],
						[
							m,
							c,
							[p, _]
						],
						[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
						[
							c,
							[m, S],
							[p, _]
						],
						[/droid.+; (glass) \d/i],
						[
							c,
							[m, U],
							[p, _]
						],
						[/droid.+; (wt63?0{2,3})\)/i],
						[
							c,
							[m, G],
							[p, _]
						],
						[/(quest( 2| pro)?)/i],
						[
							c,
							[m, H],
							[p, _]
						],
						[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
						[m, [p, y]],
						[/(aeobc)\b/i],
						[
							c,
							[m, T],
							[p, y]
						],
						[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
						[c, [p, g]],
						[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
						[c, [p, k]],
						[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
						[[p, k]],
						[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
						[[p, g]],
						[/(android[-\w\. ]{0,9});.+buil/i],
						[c, [m, "Generic"]]
					],
					engine: [
						[/windows.+ edge\/([\w\.]+)/i],
						[f, [u, E + "HTML"]],
						[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
						[f, [u, "Blink"]],
						[
							/(presto)\/([\w\.]+)/i,
							/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
							/ekioh(flow)\/([\w\.]+)/i,
							/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
							/(icab)[\/ ]([23]\.[\d\.]+)/i,
							/\b(libweb)/i
						],
						[u, f],
						[/rv\:([\w\.]{1,9})\b.+(gecko)/i],
						[f, u]
					],
					os: [
						[/microsoft (windows) (vista|xp)/i],
						[u, f],
						[
							/(windows) nt 6\.2; (arm)/i,
							/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
							/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
						],
						[u, [
							f,
							strMapper,
							X
						]],
						[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
						[[u, "Windows"], [
							f,
							strMapper,
							X
						]],
						[
							/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
							/ios;fbsv\/([\d\.]+)/i,
							/cfnetwork\/.+darwin/i
						],
						[[
							f,
							/_/g,
							"."
						], [u, "iOS"]],
						[/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
						[[u, Z], [
							f,
							/_/g,
							"."
						]],
						[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
						[f, u],
						[
							/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
							/(blackberry)\w*\/([\w\.]*)/i,
							/(tizen|kaios)[\/ ]([\w\.]+)/i,
							/\((series40);/i
						],
						[u, f],
						[/\(bb(10);/i],
						[f, [u, N]],
						[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
						[f, [u, "Symbian"]],
						[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
						[f, [u, O + " OS"]],
						[/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
						[f, [u, "webOS"]],
						[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
						[f, [u, "watchOS"]],
						[/crkey\/([\d\.]+)/i],
						[f, [u, C + "cast"]],
						[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
						[[u, L], f],
						[
							/panasonic;(viera)/i,
							/(netrange)mmh/i,
							/(nettv)\/(\d+\.[\w\.]+)/i,
							/(nintendo|playstation) ([wids345portablevuch]+)/i,
							/(xbox); +xbox ([^\);]+)/i,
							/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
							/(mint)[\/\(\) ]?(\w*)/i,
							/(mageia|vectorlinux)[; ]/i,
							/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
							/(hurd|linux) ?([\w\.]*)/i,
							/(gnu) ?([\w\.]*)/i,
							/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
							/(haiku) (\w+)/i
						],
						[u, f],
						[/(sunos) ?([\w\.\d]*)/i],
						[[u, "Solaris"], f],
						[
							/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
							/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
							/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
							/(unix) ?([\w\.]*)/i
						],
						[u, f]
					]
				};
				var UAParser = function(i$2, e$2) {
					if (typeof i$2 === w) {
						e$2 = i$2;
						i$2 = a;
					}
					if (!(this instanceof UAParser)) return new UAParser(i$2, e$2).getResult();
					var r$1 = typeof o$1 !== b && o$1.navigator ? o$1.navigator : a;
					var n$1 = i$2 || (r$1 && r$1.userAgent ? r$1.userAgent : t);
					var v$1 = r$1 && r$1.userAgentData ? r$1.userAgentData : a;
					var x$1 = e$2 ? extend(K, e$2) : K;
					var _$1 = r$1 && r$1.userAgent == n$1;
					this.getBrowser = function() {
						var i$3 = {};
						i$3[u] = a;
						i$3[f] = a;
						rgxMapper.call(i$3, n$1, x$1.browser);
						i$3[d] = majorize(i$3[f]);
						if (_$1 && r$1 && r$1.brave && typeof r$1.brave.isBrave == s) i$3[u] = "Brave";
						return i$3;
					};
					this.getCPU = function() {
						var i$3 = {};
						i$3[h] = a;
						rgxMapper.call(i$3, n$1, x$1.cpu);
						return i$3;
					};
					this.getDevice = function() {
						var i$3 = {};
						i$3[m] = a;
						i$3[c] = a;
						i$3[p] = a;
						rgxMapper.call(i$3, n$1, x$1.device);
						if (_$1 && !i$3[p] && v$1 && v$1.mobile) i$3[p] = g;
						if (_$1 && i$3[c] == "Macintosh" && r$1 && typeof r$1.standalone !== b && r$1.maxTouchPoints && r$1.maxTouchPoints > 2) {
							i$3[c] = "iPad";
							i$3[p] = k;
						}
						return i$3;
					};
					this.getEngine = function() {
						var i$3 = {};
						i$3[u] = a;
						i$3[f] = a;
						rgxMapper.call(i$3, n$1, x$1.engine);
						return i$3;
					};
					this.getOS = function() {
						var i$3 = {};
						i$3[u] = a;
						i$3[f] = a;
						rgxMapper.call(i$3, n$1, x$1.os);
						if (_$1 && !i$3[u] && v$1 && v$1.platform != "Unknown") i$3[u] = v$1.platform.replace(/chrome os/i, L).replace(/macos/i, Z);
						return i$3;
					};
					this.getResult = function() {
						return {
							ua: this.getUA(),
							browser: this.getBrowser(),
							engine: this.getEngine(),
							os: this.getOS(),
							device: this.getDevice(),
							cpu: this.getCPU()
						};
					};
					this.getUA = function() {
						return n$1;
					};
					this.setUA = function(i$3) {
						n$1 = typeof i$3 === l && i$3.length > q ? trim(i$3, q) : i$3;
						return this;
					};
					this.setUA(n$1);
					return this;
				};
				UAParser.VERSION = r;
				UAParser.BROWSER = enumerize([
					u,
					f,
					d
				]);
				UAParser.CPU = enumerize([h]);
				UAParser.DEVICE = enumerize([
					c,
					m,
					p,
					v,
					g,
					x,
					k,
					_,
					y
				]);
				UAParser.ENGINE = UAParser.OS = enumerize([u, f]);
				if (typeof e$1 !== b) {
					if ("object" !== b && i$1.exports) e$1 = i$1.exports = UAParser;
					e$1.UAParser = UAParser;
				} else if (typeof define === s && define.amd) define((function() {
					return UAParser;
				}));
				else if (typeof o$1 !== b) o$1.UAParser = UAParser;
				var Q = typeof o$1 !== b && (o$1.jQuery || o$1.Zepto);
				if (Q && !Q.ua) {
					var Y = new UAParser();
					Q.ua = Y.getResult();
					Q.ua.get = function() {
						return Y.getUA();
					};
					Q.ua.set = function(i$2) {
						Y.setUA(i$2);
						var e$2 = Y.getResult();
						for (var o$2 in e$2) Q.ua[o$2] = e$2[o$2];
					};
				}
			})(typeof window === "object" ? window : this);
		} };
		var e = {};
		function __nccwpck_require__(o$1) {
			var a = e[o$1];
			if (a !== void 0) return a.exports;
			var r = e[o$1] = { exports: {} };
			var t = true;
			try {
				i[o$1].call(r.exports, r, r.exports, __nccwpck_require__);
				t = false;
			} finally {
				if (t) delete e[o$1];
			}
			return r.exports;
		}
		if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
		var o = __nccwpck_require__(226);
		module.exports = o;
	})();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/user-agent.js
var require_user_agent = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/user-agent.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$15(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$15(exports, {
		isBot: function() {
			return isBot;
		},
		userAgent: function() {
			return userAgent;
		},
		userAgentFromString: function() {
			return userAgentFromString;
		}
	});
	const _uaparserjs = /* @__PURE__ */ _interop_require_default$1(require_ua_parser());
	function _interop_require_default$1(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function isBot(input) {
		return /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(input);
	}
	function userAgentFromString(input) {
		return {
			...(0, _uaparserjs.default)(input),
			isBot: input === void 0 ? false : isBot(input)
		};
	}
	function userAgent({ headers }) {
		return userAgentFromString(headers.get("user-agent") || void 0);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/url-pattern.js
var require_url_pattern = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/web/spec-extension/url-pattern.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "URLPattern", {
		enumerable: true,
		get: function() {
			return GlobalURLPattern;
		}
	});
	const GlobalURLPattern = typeof URLPattern === "undefined" ? void 0 : URLPattern;
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/async-local-storage.js
var require_async_local_storage = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/async-local-storage.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$14(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$14(exports, {
		bindSnapshot: function() {
			return bindSnapshot;
		},
		createAsyncLocalStorage: function() {
			return createAsyncLocalStorage;
		},
		createSnapshot: function() {
			return createSnapshot;
		}
	});
	const sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(/* @__PURE__ */ new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
		value: "E504",
		enumerable: false,
		configurable: true
	});
	var FakeAsyncLocalStorage = class {
		disable() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		getStore() {}
		run() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		exit() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		enterWith() {
			throw sharedAsyncLocalStorageNotAvailableError;
		}
		static bind(fn) {
			return fn;
		}
	};
	const maybeGlobalAsyncLocalStorage = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
	function createAsyncLocalStorage() {
		if (maybeGlobalAsyncLocalStorage) return new maybeGlobalAsyncLocalStorage();
		return new FakeAsyncLocalStorage();
	}
	function bindSnapshot(fn) {
		if (maybeGlobalAsyncLocalStorage) return maybeGlobalAsyncLocalStorage.bind(fn);
		return FakeAsyncLocalStorage.bind(fn);
	}
	function createSnapshot() {
		if (maybeGlobalAsyncLocalStorage) return maybeGlobalAsyncLocalStorage.snapshot();
		return function(fn, ...args) {
			return fn(...args);
		};
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-async-storage-instance.js
var require_work_async_storage_instance = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-async-storage-instance.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "workAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return workAsyncStorageInstance;
		}
	});
	const workAsyncStorageInstance = (0, require_async_local_storage().createAsyncLocalStorage)();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-async-storage.external.js
var require_work_async_storage_external = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-async-storage.external.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "workAsyncStorage", {
		enumerable: true,
		get: function() {
			return _workasyncstorageinstance.workAsyncStorageInstance;
		}
	});
	const _workasyncstorageinstance = require_work_async_storage_instance();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/after/after.js
var require_after$1 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/after/after.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "after", {
		enumerable: true,
		get: function() {
			return after;
		}
	});
	const _workasyncstorageexternal$3 = require_work_async_storage_external();
	function after(task) {
		const workStore = _workasyncstorageexternal$3.workAsyncStorage.getStore();
		if (!workStore) throw Object.defineProperty(/* @__PURE__ */ new Error("`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context"), "__NEXT_ERROR_CODE", {
			value: "E468",
			enumerable: false,
			configurable: true
		});
		const { afterContext } = workStore;
		return afterContext.after(task);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/after/index.js
var require_after = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/after/index.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	_export_star(require_after$1(), exports);
	function _export_star(from, to) {
		Object.keys(from).forEach(function(k) {
			if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) Object.defineProperty(to, k, {
				enumerable: true,
				get: function() {
					return from[k];
				}
			});
		});
		return from;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js
var require_work_unit_async_storage_instance = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "workUnitAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return workUnitAsyncStorageInstance;
		}
	});
	const workUnitAsyncStorageInstance = (0, require_async_local_storage().createAsyncLocalStorage)();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/app-router-headers.js
var require_app_router_headers = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/app-router-headers.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$13(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$13(exports, {
		ACTION_HEADER: function() {
			return ACTION_HEADER;
		},
		FLIGHT_HEADERS: function() {
			return FLIGHT_HEADERS;
		},
		NEXT_ACTION_NOT_FOUND_HEADER: function() {
			return NEXT_ACTION_NOT_FOUND_HEADER;
		},
		NEXT_DID_POSTPONE_HEADER: function() {
			return NEXT_DID_POSTPONE_HEADER;
		},
		NEXT_HMR_REFRESH_HASH_COOKIE: function() {
			return NEXT_HMR_REFRESH_HASH_COOKIE;
		},
		NEXT_HMR_REFRESH_HEADER: function() {
			return NEXT_HMR_REFRESH_HEADER;
		},
		NEXT_IS_PRERENDER_HEADER: function() {
			return NEXT_IS_PRERENDER_HEADER;
		},
		NEXT_REWRITTEN_PATH_HEADER: function() {
			return NEXT_REWRITTEN_PATH_HEADER;
		},
		NEXT_REWRITTEN_QUERY_HEADER: function() {
			return NEXT_REWRITTEN_QUERY_HEADER;
		},
		NEXT_ROUTER_PREFETCH_HEADER: function() {
			return NEXT_ROUTER_PREFETCH_HEADER;
		},
		NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
			return NEXT_ROUTER_SEGMENT_PREFETCH_HEADER;
		},
		NEXT_ROUTER_STALE_TIME_HEADER: function() {
			return NEXT_ROUTER_STALE_TIME_HEADER;
		},
		NEXT_ROUTER_STATE_TREE_HEADER: function() {
			return NEXT_ROUTER_STATE_TREE_HEADER;
		},
		NEXT_RSC_UNION_QUERY: function() {
			return NEXT_RSC_UNION_QUERY;
		},
		NEXT_URL: function() {
			return NEXT_URL;
		},
		RSC_CONTENT_TYPE_HEADER: function() {
			return RSC_CONTENT_TYPE_HEADER;
		},
		RSC_HEADER: function() {
			return RSC_HEADER;
		}
	});
	const RSC_HEADER = "rsc";
	const ACTION_HEADER = "next-action";
	const NEXT_ROUTER_STATE_TREE_HEADER = "next-router-state-tree";
	const NEXT_ROUTER_PREFETCH_HEADER = "next-router-prefetch";
	const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
	const NEXT_HMR_REFRESH_HEADER = "next-hmr-refresh";
	const NEXT_HMR_REFRESH_HASH_COOKIE = "__next_hmr_refresh_hash__";
	const NEXT_URL = "next-url";
	const RSC_CONTENT_TYPE_HEADER = "text/x-component";
	const FLIGHT_HEADERS = [
		RSC_HEADER,
		NEXT_ROUTER_STATE_TREE_HEADER,
		NEXT_ROUTER_PREFETCH_HEADER,
		NEXT_HMR_REFRESH_HEADER,
		NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
	];
	const NEXT_RSC_UNION_QUERY = "_rsc";
	const NEXT_ROUTER_STALE_TIME_HEADER = "x-nextjs-stale-time";
	const NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed";
	const NEXT_REWRITTEN_PATH_HEADER = "x-nextjs-rewritten-path";
	const NEXT_REWRITTEN_QUERY_HEADER = "x-nextjs-rewritten-query";
	const NEXT_IS_PRERENDER_HEADER = "x-nextjs-prerender";
	const NEXT_ACTION_NOT_FOUND_HEADER = "x-nextjs-action-not-found";
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/invariant-error.js
var require_invariant_error = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/invariant-error.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "InvariantError", {
		enumerable: true,
		get: function() {
			return InvariantError;
		}
	});
	var InvariantError = class extends Error {
		constructor(message, options) {
			super("Invariant: " + (message.endsWith(".") ? message : message + ".") + " This is a bug in Next.js.", options);
			this.name = "InvariantError";
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js
var require_work_unit_async_storage_external = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$12(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$12(exports, {
		getCacheSignal: function() {
			return getCacheSignal;
		},
		getDraftModeProviderForCacheScope: function() {
			return getDraftModeProviderForCacheScope;
		},
		getHmrRefreshHash: function() {
			return getHmrRefreshHash;
		},
		getPrerenderResumeDataCache: function() {
			return getPrerenderResumeDataCache;
		},
		getRenderResumeDataCache: function() {
			return getRenderResumeDataCache;
		},
		getRuntimeStagePromise: function() {
			return getRuntimeStagePromise;
		},
		getServerComponentsHmrCache: function() {
			return getServerComponentsHmrCache;
		},
		isHmrRefresh: function() {
			return isHmrRefresh;
		},
		throwForMissingRequestStore: function() {
			return throwForMissingRequestStore;
		},
		throwInvariantForMissingStore: function() {
			return throwInvariantForMissingStore;
		},
		workUnitAsyncStorage: function() {
			return _workunitasyncstorageinstance.workUnitAsyncStorageInstance;
		}
	});
	const _workunitasyncstorageinstance = require_work_unit_async_storage_instance();
	const _approuterheaders = require_app_router_headers();
	const _invarianterror$2 = require_invariant_error();
	function throwForMissingRequestStore(callingExpression) {
		throw Object.defineProperty(/* @__PURE__ */ new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
			value: "E251",
			enumerable: false,
			configurable: true
		});
	}
	function throwInvariantForMissingStore() {
		throw Object.defineProperty(new _invarianterror$2.InvariantError("Expected workUnitAsyncStorage to have a store."), "__NEXT_ERROR_CODE", {
			value: "E696",
			enumerable: false,
			configurable: true
		});
	}
	function getPrerenderResumeDataCache(workUnitStore) {
		switch (workUnitStore.type) {
			case "prerender":
			case "prerender-runtime":
			case "prerender-ppr": return workUnitStore.prerenderResumeDataCache;
			case "prerender-client": return workUnitStore.prerenderResumeDataCache;
			case "prerender-legacy":
			case "request":
			case "cache":
			case "private-cache":
			case "unstable-cache": return null;
			default: return workUnitStore;
		}
	}
	function getRenderResumeDataCache(workUnitStore) {
		switch (workUnitStore.type) {
			case "request": return workUnitStore.renderResumeDataCache;
			case "prerender":
			case "prerender-runtime":
			case "prerender-client": if (workUnitStore.renderResumeDataCache) return workUnitStore.renderResumeDataCache;
			case "prerender-ppr": return workUnitStore.prerenderResumeDataCache;
			case "cache":
			case "private-cache":
			case "unstable-cache":
			case "prerender-legacy": return null;
			default: return workUnitStore;
		}
	}
	function getHmrRefreshHash(workStore, workUnitStore) {
		if (workStore.dev) switch (workUnitStore.type) {
			case "cache":
			case "private-cache":
			case "prerender":
			case "prerender-runtime": return workUnitStore.hmrRefreshHash;
			case "request":
				var _workUnitStore_cookies_get;
				return (_workUnitStore_cookies_get = workUnitStore.cookies.get(_approuterheaders.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : _workUnitStore_cookies_get.value;
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy":
			case "unstable-cache": break;
			default:
		}
	}
	function isHmrRefresh(workStore, workUnitStore) {
		if (workStore.dev) switch (workUnitStore.type) {
			case "cache":
			case "private-cache":
			case "request": return workUnitStore.isHmrRefresh ?? false;
			case "prerender":
			case "prerender-client":
			case "prerender-runtime":
			case "prerender-ppr":
			case "prerender-legacy":
			case "unstable-cache": break;
			default:
		}
		return false;
	}
	function getServerComponentsHmrCache(workStore, workUnitStore) {
		if (workStore.dev) switch (workUnitStore.type) {
			case "cache":
			case "private-cache":
			case "request": return workUnitStore.serverComponentsHmrCache;
			case "prerender":
			case "prerender-client":
			case "prerender-runtime":
			case "prerender-ppr":
			case "prerender-legacy":
			case "unstable-cache": break;
			default:
		}
	}
	function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
		if (workStore.isDraftMode) switch (workUnitStore.type) {
			case "cache":
			case "private-cache":
			case "unstable-cache":
			case "prerender-runtime":
			case "request": return workUnitStore.draftMode;
			case "prerender":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy": break;
			default:
		}
	}
	function getCacheSignal(workUnitStore) {
		switch (workUnitStore.type) {
			case "prerender":
			case "prerender-client":
			case "prerender-runtime": return workUnitStore.cacheSignal;
			case "prerender-ppr":
			case "prerender-legacy":
			case "request":
			case "cache":
			case "private-cache":
			case "unstable-cache": return null;
			default: return workUnitStore;
		}
	}
	function getRuntimeStagePromise(workUnitStore) {
		switch (workUnitStore.type) {
			case "prerender-runtime":
			case "private-cache": return workUnitStore.runtimeStagePromise;
			case "prerender":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy":
			case "request":
			case "cache":
			case "unstable-cache": return null;
			default: return workUnitStore;
		}
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/hooks-server-context.js
var require_hooks_server_context = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/hooks-server-context.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$11(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$11(exports, {
		DynamicServerError: function() {
			return DynamicServerError;
		},
		isDynamicServerError: function() {
			return isDynamicServerError;
		}
	});
	const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
	var DynamicServerError = class extends Error {
		constructor(description) {
			super("Dynamic server usage: " + description), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
		}
	};
	function isDynamicServerError(err) {
		if (typeof err !== "object" || err === null || !("digest" in err) || typeof err.digest !== "string") return false;
		return err.digest === DYNAMIC_ERROR_CODE;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/static-generation-bailout.js
var require_static_generation_bailout = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/static-generation-bailout.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$10(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$10(exports, {
		StaticGenBailoutError: function() {
			return StaticGenBailoutError;
		},
		isStaticGenBailoutError: function() {
			return isStaticGenBailoutError;
		}
	});
	const NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";
	var StaticGenBailoutError = class extends Error {
		constructor(...args) {
			super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
		}
	};
	function isStaticGenBailoutError(error$1) {
		if (typeof error$1 !== "object" || error$1 === null || !("code" in error$1)) return false;
		return error$1.code === NEXT_STATIC_GEN_BAILOUT;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/dynamic-rendering-utils.js
var require_dynamic_rendering_utils = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/dynamic-rendering-utils.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$9(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$9(exports, {
		isHangingPromiseRejectionError: function() {
			return isHangingPromiseRejectionError;
		},
		makeDevtoolsIOAwarePromise: function() {
			return makeDevtoolsIOAwarePromise;
		},
		makeHangingPromise: function() {
			return makeHangingPromise;
		}
	});
	function isHangingPromiseRejectionError(err) {
		if (typeof err !== "object" || err === null || !("digest" in err)) return false;
		return err.digest === HANGING_PROMISE_REJECTION;
	}
	const HANGING_PROMISE_REJECTION = "HANGING_PROMISE_REJECTION";
	var HangingPromiseRejectionError = class extends Error {
		constructor(route, expression) {
			super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
		}
	};
	const abortListenersBySignal = /* @__PURE__ */ new WeakMap();
	function makeHangingPromise(signal, route, expression) {
		if (signal.aborted) return Promise.reject(new HangingPromiseRejectionError(route, expression));
		else {
			const hangingPromise = new Promise((_, reject) => {
				const boundRejection = reject.bind(null, new HangingPromiseRejectionError(route, expression));
				let currentListeners = abortListenersBySignal.get(signal);
				if (currentListeners) currentListeners.push(boundRejection);
				else {
					const listeners = [boundRejection];
					abortListenersBySignal.set(signal, listeners);
					signal.addEventListener("abort", () => {
						for (let i = 0; i < listeners.length; i++) listeners[i]();
					}, { once: true });
				}
			});
			hangingPromise.catch(ignoreReject);
			return hangingPromise;
		}
	}
	function ignoreReject() {}
	function makeDevtoolsIOAwarePromise(underlying) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(underlying);
			}, 0);
		});
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/framework/boundary-constants.js
var require_boundary_constants = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/framework/boundary-constants.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$8(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$8(exports, {
		METADATA_BOUNDARY_NAME: function() {
			return METADATA_BOUNDARY_NAME;
		},
		OUTLET_BOUNDARY_NAME: function() {
			return OUTLET_BOUNDARY_NAME;
		},
		ROOT_LAYOUT_BOUNDARY_NAME: function() {
			return ROOT_LAYOUT_BOUNDARY_NAME;
		},
		VIEWPORT_BOUNDARY_NAME: function() {
			return VIEWPORT_BOUNDARY_NAME;
		}
	});
	const METADATA_BOUNDARY_NAME = "__next_metadata_boundary__";
	const VIEWPORT_BOUNDARY_NAME = "__next_viewport_boundary__";
	const OUTLET_BOUNDARY_NAME = "__next_outlet_boundary__";
	const ROOT_LAYOUT_BOUNDARY_NAME = "__next_root_layout_boundary__";
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/scheduler.js
var require_scheduler = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/scheduler.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$7(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$7(exports, {
		atLeastOneTask: function() {
			return atLeastOneTask;
		},
		scheduleImmediate: function() {
			return scheduleImmediate;
		},
		scheduleOnNextTick: function() {
			return scheduleOnNextTick;
		},
		waitAtLeastOneReactRenderTask: function() {
			return waitAtLeastOneReactRenderTask;
		}
	});
	const scheduleOnNextTick = (cb) => {
		Promise.resolve().then(() => {
			if (process.env.NEXT_RUNTIME === "edge") setTimeout(cb, 0);
			else process.nextTick(cb);
		});
	};
	const scheduleImmediate = (cb) => {
		if (process.env.NEXT_RUNTIME === "edge") setTimeout(cb, 0);
		else setImmediate(cb);
	};
	function atLeastOneTask() {
		return new Promise((resolve) => scheduleImmediate(resolve));
	}
	function waitAtLeastOneReactRenderTask() {
		if (process.env.NEXT_RUNTIME === "edge") return new Promise((r) => setTimeout(r, 0));
		else return new Promise((r) => setImmediate(r));
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js
var require_bailout_to_csr = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$6(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$6(exports, {
		BailoutToCSRError: function() {
			return BailoutToCSRError;
		},
		isBailoutToCSRError: function() {
			return isBailoutToCSRError;
		}
	});
	const BAILOUT_TO_CSR = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
	var BailoutToCSRError = class extends Error {
		constructor(reason) {
			super("Bail out to client-side rendering: " + reason), this.reason = reason, this.digest = BAILOUT_TO_CSR;
		}
	};
	function isBailoutToCSRError(err) {
		if (typeof err !== "object" || err === null || !("digest" in err)) return false;
		return err.digest === BAILOUT_TO_CSR;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/dynamic-rendering.js
var require_dynamic_rendering = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/dynamic-rendering.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$5(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$5(exports, {
		Postpone: function() {
			return Postpone;
		},
		PreludeState: function() {
			return PreludeState;
		},
		abortAndThrowOnSynchronousRequestDataAccess: function() {
			return abortAndThrowOnSynchronousRequestDataAccess;
		},
		abortOnSynchronousPlatformIOAccess: function() {
			return abortOnSynchronousPlatformIOAccess;
		},
		accessedDynamicData: function() {
			return accessedDynamicData;
		},
		annotateDynamicAccess: function() {
			return annotateDynamicAccess;
		},
		consumeDynamicAccess: function() {
			return consumeDynamicAccess;
		},
		createDynamicTrackingState: function() {
			return createDynamicTrackingState;
		},
		createDynamicValidationState: function() {
			return createDynamicValidationState;
		},
		createHangingInputAbortSignal: function() {
			return createHangingInputAbortSignal;
		},
		createRenderInBrowserAbortSignal: function() {
			return createRenderInBrowserAbortSignal;
		},
		delayUntilRuntimeStage: function() {
			return delayUntilRuntimeStage;
		},
		formatDynamicAPIAccesses: function() {
			return formatDynamicAPIAccesses;
		},
		getFirstDynamicReason: function() {
			return getFirstDynamicReason;
		},
		isDynamicPostpone: function() {
			return isDynamicPostpone;
		},
		isPrerenderInterruptedError: function() {
			return isPrerenderInterruptedError;
		},
		logDisallowedDynamicError: function() {
			return logDisallowedDynamicError;
		},
		markCurrentScopeAsDynamic: function() {
			return markCurrentScopeAsDynamic;
		},
		postponeWithTracking: function() {
			return postponeWithTracking;
		},
		throwIfDisallowedDynamic: function() {
			return throwIfDisallowedDynamic;
		},
		throwToInterruptStaticGeneration: function() {
			return throwToInterruptStaticGeneration;
		},
		trackAllowedDynamicAccess: function() {
			return trackAllowedDynamicAccess;
		},
		trackDynamicDataInDynamicRender: function() {
			return trackDynamicDataInDynamicRender;
		},
		trackSynchronousPlatformIOAccessInDev: function() {
			return trackSynchronousPlatformIOAccessInDev;
		},
		trackSynchronousRequestDataAccessInDev: function() {
			return trackSynchronousRequestDataAccessInDev;
		},
		useDynamicRouteParams: function() {
			return useDynamicRouteParams;
		},
		warnOnSyncDynamicError: function() {
			return warnOnSyncDynamicError;
		}
	});
	const _react = /* @__PURE__ */ _interop_require_default(require("react"));
	const _hooksservercontext = require_hooks_server_context();
	const _staticgenerationbailout$2 = require_static_generation_bailout();
	const _workunitasyncstorageexternal$2 = require_work_unit_async_storage_external();
	const _workasyncstorageexternal$2 = require_work_async_storage_external();
	const _dynamicrenderingutils$2 = require_dynamic_rendering_utils();
	const _boundaryconstants = require_boundary_constants();
	const _scheduler = require_scheduler();
	const _bailouttocsr = require_bailout_to_csr();
	const _invarianterror$1 = require_invariant_error();
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	const hasPostpone = typeof _react.default.unstable_postpone === "function";
	function createDynamicTrackingState(isDebugDynamicAccesses) {
		return {
			isDebugDynamicAccesses,
			dynamicAccesses: [],
			syncDynamicErrorWithStack: null
		};
	}
	function createDynamicValidationState() {
		return {
			hasSuspenseAboveBody: false,
			hasDynamicMetadata: false,
			hasDynamicViewport: false,
			hasAllowedDynamic: false,
			dynamicErrors: []
		};
	}
	function getFirstDynamicReason(trackingState) {
		var _trackingState_dynamicAccesses_;
		return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
	}
	function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
		if (workUnitStore) switch (workUnitStore.type) {
			case "cache":
			case "unstable-cache": return;
			case "private-cache": return;
			case "prerender-legacy":
			case "prerender-ppr":
			case "request": break;
			default:
		}
		if (store.forceDynamic || store.forceStatic) return;
		if (store.dynamicShouldError) throw Object.defineProperty(new _staticgenerationbailout$2.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
			value: "E553",
			enumerable: false,
			configurable: true
		});
		if (workUnitStore) switch (workUnitStore.type) {
			case "prerender-ppr": return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
			case "prerender-legacy":
				workUnitStore.revalidate = 0;
				const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
					value: "E550",
					enumerable: false,
					configurable: true
				});
				store.dynamicUsageDescription = expression;
				store.dynamicUsageStack = err.stack;
				throw err;
			case "request":
				workUnitStore.usedDynamic = true;
				break;
			default:
		}
	}
	function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
		const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
			value: "E558",
			enumerable: false,
			configurable: true
		});
		prerenderStore.revalidate = 0;
		store.dynamicUsageDescription = expression;
		store.dynamicUsageStack = err.stack;
		throw err;
	}
	function trackDynamicDataInDynamicRender(workUnitStore) {
		switch (workUnitStore.type) {
			case "cache":
			case "unstable-cache": return;
			case "private-cache": return;
			case "prerender":
			case "prerender-runtime":
			case "prerender-legacy":
			case "prerender-ppr":
			case "prerender-client": break;
			case "request":
				workUnitStore.usedDynamic = true;
				break;
			default:
		}
	}
	function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
		const error$1 = createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
		prerenderStore.controller.abort(error$1);
		const dynamicTracking = prerenderStore.dynamicTracking;
		if (dynamicTracking) dynamicTracking.dynamicAccesses.push({
			stack: dynamicTracking.isDebugDynamicAccesses ? (/* @__PURE__ */ new Error()).stack : void 0,
			expression
		});
	}
	function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
		const dynamicTracking = prerenderStore.dynamicTracking;
		abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
		if (dynamicTracking) {
			if (dynamicTracking.syncDynamicErrorWithStack === null) dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
		}
	}
	function trackSynchronousPlatformIOAccessInDev(requestStore) {
		requestStore.prerenderPhase = false;
	}
	function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
		if (prerenderStore.controller.signal.aborted === false) {
			abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
			const dynamicTracking = prerenderStore.dynamicTracking;
			if (dynamicTracking) {
				if (dynamicTracking.syncDynamicErrorWithStack === null) dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
			}
		}
		throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
	}
	function warnOnSyncDynamicError(dynamicTracking) {
		if (dynamicTracking.syncDynamicErrorWithStack) console.error(dynamicTracking.syncDynamicErrorWithStack);
	}
	const trackSynchronousRequestDataAccessInDev = trackSynchronousPlatformIOAccessInDev;
	function Postpone({ reason, route }) {
		const prerenderStore = _workunitasyncstorageexternal$2.workUnitAsyncStorage.getStore();
		postponeWithTracking(route, reason, prerenderStore && prerenderStore.type === "prerender-ppr" ? prerenderStore.dynamicTracking : null);
	}
	function postponeWithTracking(route, expression, dynamicTracking) {
		assertPostpone();
		if (dynamicTracking) dynamicTracking.dynamicAccesses.push({
			stack: dynamicTracking.isDebugDynamicAccesses ? (/* @__PURE__ */ new Error()).stack : void 0,
			expression
		});
		_react.default.unstable_postpone(createPostponeReason(route, expression));
	}
	function createPostponeReason(route, expression) {
		return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
	}
	function isDynamicPostpone(err) {
		if (typeof err === "object" && err !== null && typeof err.message === "string") return isDynamicPostponeReason(err.message);
		return false;
	}
	function isDynamicPostponeReason(reason) {
		return reason.includes("needs to bail out of prerendering at this point because it used") && reason.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
	}
	if (isDynamicPostponeReason(createPostponeReason("%%%", "^^^")) === false) throw Object.defineProperty(/* @__PURE__ */ new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
		value: "E296",
		enumerable: false,
		configurable: true
	});
	const NEXT_PRERENDER_INTERRUPTED = "NEXT_PRERENDER_INTERRUPTED";
	function createPrerenderInterruptedError(message) {
		const error$1 = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error$1.digest = NEXT_PRERENDER_INTERRUPTED;
		return error$1;
	}
	function isPrerenderInterruptedError(error$1) {
		return typeof error$1 === "object" && error$1 !== null && error$1.digest === NEXT_PRERENDER_INTERRUPTED && "name" in error$1 && "message" in error$1 && error$1 instanceof Error;
	}
	function accessedDynamicData(dynamicAccesses) {
		return dynamicAccesses.length > 0;
	}
	function consumeDynamicAccess(serverDynamic, clientDynamic) {
		serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
		return serverDynamic.dynamicAccesses;
	}
	function formatDynamicAPIAccesses(dynamicAccesses) {
		return dynamicAccesses.filter((access) => typeof access.stack === "string" && access.stack.length > 0).map(({ expression, stack }) => {
			stack = stack.split("\n").slice(4).filter((line) => {
				if (line.includes("node_modules/next/")) return false;
				if (line.includes(" (<anonymous>)")) return false;
				if (line.includes(" (node:")) return false;
				return true;
			}).join("\n");
			return `Dynamic API Usage Debug - ${expression}:\n${stack}`;
		});
	}
	function assertPostpone() {
		if (!hasPostpone) throw Object.defineProperty(/* @__PURE__ */ new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
			value: "E224",
			enumerable: false,
			configurable: true
		});
	}
	function createRenderInBrowserAbortSignal() {
		const controller = new AbortController();
		controller.abort(Object.defineProperty(new _bailouttocsr.BailoutToCSRError("Render in Browser"), "__NEXT_ERROR_CODE", {
			value: "E721",
			enumerable: false,
			configurable: true
		}));
		return controller.signal;
	}
	function createHangingInputAbortSignal(workUnitStore) {
		switch (workUnitStore.type) {
			case "prerender":
			case "prerender-runtime":
				const controller = new AbortController();
				if (workUnitStore.cacheSignal) workUnitStore.cacheSignal.inputReady().then(() => {
					controller.abort();
				});
				else {
					const runtimeStagePromise = (0, _workunitasyncstorageexternal$2.getRuntimeStagePromise)(workUnitStore);
					if (runtimeStagePromise) runtimeStagePromise.then(() => (0, _scheduler.scheduleOnNextTick)(() => controller.abort()));
					else (0, _scheduler.scheduleOnNextTick)(() => controller.abort());
				}
				return controller.signal;
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy":
			case "request":
			case "cache":
			case "private-cache":
			case "unstable-cache": return;
			default:
		}
	}
	function annotateDynamicAccess(expression, prerenderStore) {
		const dynamicTracking = prerenderStore.dynamicTracking;
		if (dynamicTracking) dynamicTracking.dynamicAccesses.push({
			stack: dynamicTracking.isDebugDynamicAccesses ? (/* @__PURE__ */ new Error()).stack : void 0,
			expression
		});
	}
	function useDynamicRouteParams(expression) {
		const workStore = _workasyncstorageexternal$2.workAsyncStorage.getStore();
		const workUnitStore = _workunitasyncstorageexternal$2.workUnitAsyncStorage.getStore();
		if (workStore && workUnitStore) switch (workUnitStore.type) {
			case "prerender-client":
			case "prerender": {
				const fallbackParams = workUnitStore.fallbackRouteParams;
				if (fallbackParams && fallbackParams.size > 0) _react.default.use((0, _dynamicrenderingutils$2.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
				break;
			}
			case "prerender-ppr": {
				const fallbackParams = workUnitStore.fallbackRouteParams;
				if (fallbackParams && fallbackParams.size > 0) return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
				break;
			}
			case "prerender-runtime": throw Object.defineProperty(new _invarianterror$1.InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
				value: "E771",
				enumerable: false,
				configurable: true
			});
			case "cache":
			case "private-cache": throw Object.defineProperty(new _invarianterror$1.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
				value: "E745",
				enumerable: false,
				configurable: true
			});
			case "prerender-legacy":
			case "request":
			case "unstable-cache": break;
			default:
		}
	}
	const hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
	const hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = /* @__PURE__ */ new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`);
	const hasMetadataRegex = /* @__PURE__ */ new RegExp(`\\n\\s+at ${_boundaryconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
	const hasViewportRegex = /* @__PURE__ */ new RegExp(`\\n\\s+at ${_boundaryconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
	const hasOutletRegex = /* @__PURE__ */ new RegExp(`\\n\\s+at ${_boundaryconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
	function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
		if (hasOutletRegex.test(componentStack)) return;
		else if (hasMetadataRegex.test(componentStack)) {
			dynamicValidation.hasDynamicMetadata = true;
			return;
		} else if (hasViewportRegex.test(componentStack)) {
			dynamicValidation.hasDynamicViewport = true;
			return;
		} else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
			dynamicValidation.hasAllowedDynamic = true;
			dynamicValidation.hasSuspenseAboveBody = true;
			return;
		} else if (hasSuspenseRegex.test(componentStack)) {
			dynamicValidation.hasAllowedDynamic = true;
			return;
		} else if (clientDynamic.syncDynamicErrorWithStack) {
			dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
			return;
		} else {
			const error$1 = createErrorWithComponentOrOwnerStack(`Route "${workStore.route}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`, componentStack);
			dynamicValidation.dynamicErrors.push(error$1);
			return;
		}
	}
	/**
	* In dev mode, we prefer using the owner stack, otherwise the provided
	* component stack is used.
	*/ function createErrorWithComponentOrOwnerStack(message, componentStack) {
		const ownerStack = _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
		const error$1 = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error$1.stack = error$1.name + ": " + message + (ownerStack ?? componentStack);
		return error$1;
	}
	var PreludeState = /* @__PURE__ */ function(PreludeState$1) {
		PreludeState$1[PreludeState$1["Full"] = 0] = "Full";
		PreludeState$1[PreludeState$1["Empty"] = 1] = "Empty";
		PreludeState$1[PreludeState$1["Errored"] = 2] = "Errored";
		return PreludeState$1;
	}({});
	function logDisallowedDynamicError(workStore, error$1) {
		console.error(error$1);
		if (!workStore.dev) if (workStore.hasReadableErrorStacks) console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
		else console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
	}
	function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
		if (prelude !== 0) {
			if (dynamicValidation.hasSuspenseAboveBody) return;
			if (serverDynamic.syncDynamicErrorWithStack) {
				logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
				throw new _staticgenerationbailout$2.StaticGenBailoutError();
			}
			const dynamicErrors = dynamicValidation.dynamicErrors;
			if (dynamicErrors.length > 0) {
				for (let i = 0; i < dynamicErrors.length; i++) logDisallowedDynamicError(workStore, dynamicErrors[i]);
				throw new _staticgenerationbailout$2.StaticGenBailoutError();
			}
			if (dynamicValidation.hasDynamicViewport) {
				console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
				throw new _staticgenerationbailout$2.StaticGenBailoutError();
			}
			if (prelude === 1) {
				console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
				throw new _staticgenerationbailout$2.StaticGenBailoutError();
			}
		} else if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
			console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
			throw new _staticgenerationbailout$2.StaticGenBailoutError();
		}
	}
	function delayUntilRuntimeStage(prerenderStore, result) {
		if (prerenderStore.runtimeStagePromise) return prerenderStore.runtimeStagePromise.then(() => result);
		return result;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js
var require_after_task_async_storage_instance = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "afterTaskAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return afterTaskAsyncStorageInstance;
		}
	});
	const afterTaskAsyncStorageInstance = (0, require_async_local_storage().createAsyncLocalStorage)();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js
var require_after_task_async_storage_external = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/after-task-async-storage.external.js": ((exports) => {
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
var require_utils = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/utils.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$4(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$4(exports, {
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
	const _staticgenerationbailout$1 = require_static_generation_bailout();
	const _aftertaskasyncstorageexternal = require_after_task_async_storage_external();
	function throwWithStaticGenerationBailoutError(route, expression) {
		throw Object.defineProperty(new _staticgenerationbailout$1.StaticGenBailoutError(`Route ${route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
			value: "E576",
			enumerable: false,
			configurable: true
		});
	}
	function throwWithStaticGenerationBailoutErrorWithDynamicError(route, expression) {
		throw Object.defineProperty(new _staticgenerationbailout$1.StaticGenBailoutError(`Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
			value: "E543",
			enumerable: false,
			configurable: true
		});
	}
	function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
		const error$1 = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "searchParams" inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await "searchParams" outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
			value: "E779",
			enumerable: false,
			configurable: true
		});
		Error.captureStackTrace(error$1, constructorOpt);
		workStore.invalidDynamicUsageError ??= error$1;
		throw error$1;
	}
	function isRequestAPICallableInsideAfter() {
		const afterTaskStore = _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
		return (afterTaskStore == null ? void 0 : afterTaskStore.rootTaskSpawnPhase) === "action";
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/connection.js
var require_connection = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/connection.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "connection", {
		enumerable: true,
		get: function() {
			return connection;
		}
	});
	const _workasyncstorageexternal$1 = require_work_async_storage_external();
	const _workunitasyncstorageexternal$1 = require_work_unit_async_storage_external();
	const _dynamicrendering$1 = require_dynamic_rendering();
	const _staticgenerationbailout = require_static_generation_bailout();
	const _dynamicrenderingutils$1 = require_dynamic_rendering_utils();
	const _utils = require_utils();
	function connection() {
		const callingExpression = "connection";
		const workStore = _workasyncstorageexternal$1.workAsyncStorage.getStore();
		const workUnitStore = _workunitasyncstorageexternal$1.workUnitAsyncStorage.getStore();
		if (workStore) {
			if (workUnitStore && workUnitStore.phase === "after" && !(0, _utils.isRequestAPICallableInsideAfter)()) throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
				value: "E186",
				enumerable: false,
				configurable: true
			});
			if (workStore.forceStatic) return Promise.resolve(void 0);
			if (workStore.dynamicShouldError) throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${workStore.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
				value: "E562",
				enumerable: false,
				configurable: true
			});
			if (workUnitStore) switch (workUnitStore.type) {
				case "cache": {
					const error$1 = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual request, but caches must be able to be produced before a request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
						value: "E752",
						enumerable: false,
						configurable: true
					});
					Error.captureStackTrace(error$1, connection);
					workStore.invalidDynamicUsageError ??= error$1;
					throw error$1;
				}
				case "private-cache": {
					const error$1 = Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "connection" inside "use cache: private". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual navigation request, but caches must be able to be produced before a navigation request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
						value: "E753",
						enumerable: false,
						configurable: true
					});
					Error.captureStackTrace(error$1, connection);
					workStore.invalidDynamicUsageError ??= error$1;
					throw error$1;
				}
				case "unstable-cache": throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
					value: "E1",
					enumerable: false,
					configurable: true
				});
				case "prerender":
				case "prerender-client":
				case "prerender-runtime": return (0, _dynamicrenderingutils$1.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, "`connection()`");
				case "prerender-ppr": return (0, _dynamicrendering$1.postponeWithTracking)(workStore.route, "connection", workUnitStore.dynamicTracking);
				case "prerender-legacy": return (0, _dynamicrendering$1.throwToInterruptStaticGeneration)("connection", workStore, workUnitStore);
				case "request":
					(0, _dynamicrendering$1.trackDynamicDataInDynamicRender)(workUnitStore);
					return (0, _dynamicrenderingutils$1.makeDevtoolsIOAwarePromise)(void 0);
				default:
			}
		}
		(0, _workunitasyncstorageexternal$1.throwForMissingRequestStore)(callingExpression);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/utils/reflect-utils.js
var require_reflect_utils = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/utils/reflect-utils.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$3(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$3(exports, {
		describeHasCheckingStringProperty: function() {
			return describeHasCheckingStringProperty;
		},
		describeStringPropertyAccess: function() {
			return describeStringPropertyAccess;
		},
		wellKnownProperties: function() {
			return wellKnownProperties;
		}
	});
	const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
	function describeStringPropertyAccess(target, prop) {
		if (isDefinitelyAValidIdentifier.test(prop)) return "`" + target + "." + prop + "`";
		return "`" + target + "[" + JSON.stringify(prop) + "]`";
	}
	function describeHasCheckingStringProperty(target, prop) {
		const stringifiedProp = JSON.stringify(prop);
		return "`Reflect.has(" + target + ", " + stringifiedProp + ")`, `" + stringifiedProp + " in " + target + "`, or similar";
	}
	const wellKnownProperties = new Set([
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable",
		"toString",
		"valueOf",
		"toLocaleString",
		"then",
		"catch",
		"finally",
		"status",
		"displayName",
		"_debugInfo",
		"toJSON",
		"$$typeof",
		"__esModule"
	]);
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js
var require_action_async_storage_instance = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "actionAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return actionAsyncStorageInstance;
		}
	});
	const actionAsyncStorageInstance = (0, require_async_local_storage().createAsyncLocalStorage)();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage.external.js
var require_action_async_storage_external = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage.external.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "actionAsyncStorage", {
		enumerable: true,
		get: function() {
			return _actionasyncstorageinstance.actionAsyncStorageInstance;
		}
	});
	const _actionasyncstorageinstance = require_action_async_storage_instance();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/picocolors.js
var require_picocolors = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/lib/picocolors.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$2(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$2(exports, {
		bgBlack: function() {
			return bgBlack;
		},
		bgBlue: function() {
			return bgBlue;
		},
		bgCyan: function() {
			return bgCyan;
		},
		bgGreen: function() {
			return bgGreen;
		},
		bgMagenta: function() {
			return bgMagenta;
		},
		bgRed: function() {
			return bgRed;
		},
		bgWhite: function() {
			return bgWhite;
		},
		bgYellow: function() {
			return bgYellow;
		},
		black: function() {
			return black;
		},
		blue: function() {
			return blue;
		},
		bold: function() {
			return bold;
		},
		cyan: function() {
			return cyan;
		},
		dim: function() {
			return dim;
		},
		gray: function() {
			return gray;
		},
		green: function() {
			return green;
		},
		hidden: function() {
			return hidden;
		},
		inverse: function() {
			return inverse;
		},
		italic: function() {
			return italic;
		},
		magenta: function() {
			return magenta;
		},
		purple: function() {
			return purple;
		},
		red: function() {
			return red;
		},
		reset: function() {
			return reset;
		},
		strikethrough: function() {
			return strikethrough;
		},
		underline: function() {
			return underline;
		},
		white: function() {
			return white;
		},
		yellow: function() {
			return yellow;
		}
	});
	var _globalThis;
	const { env, stdout } = ((_globalThis = globalThis) == null ? void 0 : _globalThis.process) ?? {};
	const enabled = env && !env.NO_COLOR && (env.FORCE_COLOR || (stdout == null ? void 0 : stdout.isTTY) && !env.CI && env.TERM !== "dumb");
	const replaceClose = (str, close, replace$1, index) => {
		const start = str.substring(0, index) + replace$1;
		const end = str.substring(index + close.length);
		const nextIndex = end.indexOf(close);
		return ~nextIndex ? start + replaceClose(end, close, replace$1, nextIndex) : start + end;
	};
	const formatter = (open, close, replace$1 = open) => {
		if (!enabled) return String;
		return (input) => {
			const string = "" + input;
			const index = string.indexOf(close, open.length);
			return ~index ? open + replaceClose(string, close, replace$1, index) + close : open + string + close;
		};
	};
	const reset = enabled ? (s) => `\x1b[0m${s}\x1b[0m` : String;
	const bold = formatter("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
	const dim = formatter("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m");
	const italic = formatter("\x1B[3m", "\x1B[23m");
	const underline = formatter("\x1B[4m", "\x1B[24m");
	const inverse = formatter("\x1B[7m", "\x1B[27m");
	const hidden = formatter("\x1B[8m", "\x1B[28m");
	const strikethrough = formatter("\x1B[9m", "\x1B[29m");
	const black = formatter("\x1B[30m", "\x1B[39m");
	const red = formatter("\x1B[31m", "\x1B[39m");
	const green = formatter("\x1B[32m", "\x1B[39m");
	const yellow = formatter("\x1B[33m", "\x1B[39m");
	const blue = formatter("\x1B[34m", "\x1B[39m");
	const magenta = formatter("\x1B[35m", "\x1B[39m");
	const purple = formatter("\x1B[38;2;173;127;168m", "\x1B[39m");
	const cyan = formatter("\x1B[36m", "\x1B[39m");
	const white = formatter("\x1B[37m", "\x1B[39m");
	const gray = formatter("\x1B[90m", "\x1B[39m");
	const bgBlack = formatter("\x1B[40m", "\x1B[49m");
	const bgRed = formatter("\x1B[41m", "\x1B[49m");
	const bgGreen = formatter("\x1B[42m", "\x1B[49m");
	const bgYellow = formatter("\x1B[43m", "\x1B[49m");
	const bgBlue = formatter("\x1B[44m", "\x1B[49m");
	const bgMagenta = formatter("\x1B[45m", "\x1B[49m");
	const bgCyan = formatter("\x1B[46m", "\x1B[49m");
	const bgWhite = formatter("\x1B[47m", "\x1B[49m");
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/lib/lru-cache.js
var require_lru_cache = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/lib/lru-cache.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "LRUCache", {
		enumerable: true,
		get: function() {
			return LRUCache;
		}
	});
	var LRUNode = class {
		constructor(key, data, size) {
			this.prev = null;
			this.next = null;
			this.key = key;
			this.data = data;
			this.size = size;
		}
	};
	/**
	* Sentinel node used for head/tail boundaries.
	* These nodes don't contain actual cache data but simplify list operations.
	*/ var SentinelNode = class {
		constructor() {
			this.prev = null;
			this.next = null;
		}
	};
	var LRUCache = class {
		constructor(maxSize, calculateSize, onEvict) {
			this.cache = /* @__PURE__ */ new Map();
			this.totalSize = 0;
			this.maxSize = maxSize;
			this.calculateSize = calculateSize;
			this.onEvict = onEvict;
			this.head = new SentinelNode();
			this.tail = new SentinelNode();
			this.head.next = this.tail;
			this.tail.prev = this.head;
		}
		/**
		* Adds a node immediately after the head (marks as most recently used).
		* Used when inserting new items or when an item is accessed.
		* PRECONDITION: node must be disconnected (prev/next should be null)
		*/ addToHead(node) {
			node.prev = this.head;
			node.next = this.head.next;
			this.head.next.prev = node;
			this.head.next = node;
		}
		/**
		* Removes a node from its current position in the doubly-linked list.
		* Updates the prev/next pointers of adjacent nodes to maintain list integrity.
		* PRECONDITION: node must be connected (prev/next are non-null)
		*/ removeNode(node) {
			node.prev.next = node.next;
			node.next.prev = node.prev;
		}
		/**
		* Moves an existing node to the head position (marks as most recently used).
		* This is the core LRU operation - accessed items become most recent.
		*/ moveToHead(node) {
			this.removeNode(node);
			this.addToHead(node);
		}
		/**
		* Removes and returns the least recently used node (the one before tail).
		* This is called during eviction when the cache exceeds capacity.
		* PRECONDITION: cache is not empty (ensured by caller)
		*/ removeTail() {
			const lastNode = this.tail.prev;
			this.removeNode(lastNode);
			return lastNode;
		}
		/**
		* Sets a key-value pair in the cache.
		* If the key exists, updates the value and moves to head.
		* If new, adds at head and evicts from tail if necessary.
		*
		* Time Complexity:
		* - O(1) for uniform item sizes
		* - O(k) where k is the number of items evicted (can be O(N) for variable sizes)
		*/ set(key, value) {
			const size = (this.calculateSize == null ? void 0 : this.calculateSize.call(this, value)) ?? 1;
			if (size <= 0) throw Object.defineProperty(/* @__PURE__ */ new Error(`LRUCache: calculateSize returned ${size}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`), "__NEXT_ERROR_CODE", {
				value: "E789",
				enumerable: false,
				configurable: true
			});
			if (size > this.maxSize) {
				console.warn("Single item size exceeds maxSize");
				return false;
			}
			const existing = this.cache.get(key);
			if (existing) {
				existing.data = value;
				this.totalSize = this.totalSize - existing.size + size;
				existing.size = size;
				this.moveToHead(existing);
			} else {
				const newNode = new LRUNode(key, value, size);
				this.cache.set(key, newNode);
				this.addToHead(newNode);
				this.totalSize += size;
			}
			while (this.totalSize > this.maxSize && this.cache.size > 0) {
				const tail = this.removeTail();
				this.cache.delete(tail.key);
				this.totalSize -= tail.size;
				this.onEvict == null || this.onEvict.call(this, tail.key, tail.data);
			}
			return true;
		}
		/**
		* Checks if a key exists in the cache.
		* This is a pure query operation - does NOT update LRU order.
		*
		* Time Complexity: O(1)
		*/ has(key) {
			return this.cache.has(key);
		}
		/**
		* Retrieves a value by key and marks it as most recently used.
		* Moving to head maintains the LRU property for future evictions.
		*
		* Time Complexity: O(1)
		*/ get(key) {
			const node = this.cache.get(key);
			if (!node) return void 0;
			this.moveToHead(node);
			return node.data;
		}
		/**
		* Returns an iterator over the cache entries. The order is outputted in the
		* order of most recently used to least recently used.
		*/ *[Symbol.iterator]() {
			let current = this.head.next;
			while (current && current !== this.tail) {
				const node = current;
				yield [node.key, node.data];
				current = current.next;
			}
		}
		/**
		* Removes a specific key from the cache.
		* Updates both the hash map and doubly-linked list.
		*
		* Note: This is an explicit removal and does NOT trigger the `onEvict`
		* callback. Use this for intentional deletions where eviction tracking
		* is not needed.
		*
		* Time Complexity: O(1)
		*/ remove(key) {
			const node = this.cache.get(key);
			if (!node) return;
			this.removeNode(node);
			this.cache.delete(key);
			this.totalSize -= node.size;
		}
		/**
		* Returns the number of items in the cache.
		*/ get size() {
			return this.cache.size;
		}
		/**
		* Returns the current total size of all cached items.
		* This uses the custom size calculation if provided.
		*/ get currentSize() {
			return this.totalSize;
		}
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/build/output/log.js
var require_log = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/build/output/log.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$1(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$1(exports, {
		bootstrap: function() {
			return bootstrap;
		},
		error: function() {
			return error;
		},
		event: function() {
			return event;
		},
		info: function() {
			return info;
		},
		prefixes: function() {
			return prefixes;
		},
		ready: function() {
			return ready;
		},
		trace: function() {
			return trace;
		},
		wait: function() {
			return wait;
		},
		warn: function() {
			return warn;
		},
		warnOnce: function() {
			return warnOnce;
		}
	});
	const _picocolors = require_picocolors();
	const _lrucache = require_lru_cache();
	const prefixes = {
		wait: (0, _picocolors.white)((0, _picocolors.bold)("○")),
		error: (0, _picocolors.red)((0, _picocolors.bold)("⨯")),
		warn: (0, _picocolors.yellow)((0, _picocolors.bold)("⚠")),
		ready: "▲",
		info: (0, _picocolors.white)((0, _picocolors.bold)(" ")),
		event: (0, _picocolors.green)((0, _picocolors.bold)("✓")),
		trace: (0, _picocolors.magenta)((0, _picocolors.bold)("»"))
	};
	const LOGGING_METHOD = {
		log: "log",
		warn: "warn",
		error: "error"
	};
	function prefixedLog(prefixType, ...message) {
		if ((message[0] === "" || message[0] === void 0) && message.length === 1) message.shift();
		const consoleMethod = prefixType in LOGGING_METHOD ? LOGGING_METHOD[prefixType] : "log";
		const prefix = prefixes[prefixType];
		if (message.length === 0) console[consoleMethod]("");
		else if (message.length === 1 && typeof message[0] === "string") console[consoleMethod](" " + prefix + " " + message[0]);
		else console[consoleMethod](" " + prefix, ...message);
	}
	function bootstrap(...message) {
		console.log("   " + message.join(" "));
	}
	function wait(...message) {
		prefixedLog("wait", ...message);
	}
	function error(...message) {
		prefixedLog("error", ...message);
	}
	function warn(...message) {
		prefixedLog("warn", ...message);
	}
	function ready(...message) {
		prefixedLog("ready", ...message);
	}
	function info(...message) {
		prefixedLog("info", ...message);
	}
	function event(...message) {
		prefixedLog("event", ...message);
	}
	function trace(...message) {
		prefixedLog("trace", ...message);
	}
	const warnOnceCache = new _lrucache.LRUCache(1e4, (value) => value.length);
	function warnOnce(...message) {
		const key = message.join(" ");
		if (!warnOnceCache.has(key)) {
			warnOnceCache.set(key, key);
			warn(...message);
		}
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/root-params.js
var require_root_params = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/request/root-params.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		getRootParam: function() {
			return getRootParam;
		},
		unstable_rootParams: function() {
			return unstable_rootParams;
		}
	});
	const _invarianterror = require_invariant_error();
	const _dynamicrendering = require_dynamic_rendering();
	const _workasyncstorageexternal = require_work_async_storage_external();
	const _workunitasyncstorageexternal = require_work_unit_async_storage_external();
	const _dynamicrenderingutils = require_dynamic_rendering_utils();
	const _reflectutils = require_reflect_utils();
	const _actionasyncstorageexternal = require_action_async_storage_external();
	const _log = require_log();
	const CachedParams = /* @__PURE__ */ new WeakMap();
	async function unstable_rootParams() {
		(0, _log.warnOnce)("`unstable_rootParams()` is deprecated and will be removed in an upcoming major release. Import specific root params from `next/root-params` instead.");
		const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		if (!workStore) throw Object.defineProperty(new _invarianterror.InvariantError("Missing workStore in unstable_rootParams"), "__NEXT_ERROR_CODE", {
			value: "E615",
			enumerable: false,
			configurable: true
		});
		const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		if (!workUnitStore) throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used \`unstable_rootParams()\` in Pages Router. This API is only available within App Router.`), "__NEXT_ERROR_CODE", {
			value: "E641",
			enumerable: false,
			configurable: true
		});
		switch (workUnitStore.type) {
			case "cache":
			case "unstable-cache": throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used \`unstable_rootParams()\` inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
				value: "E642",
				enumerable: false,
				configurable: true
			});
			case "prerender":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy": return createPrerenderRootParams(workUnitStore.rootParams, workStore, workUnitStore);
			case "private-cache":
			case "prerender-runtime":
			case "request": return Promise.resolve(workUnitStore.rootParams);
			default: return workUnitStore;
		}
	}
	function createPrerenderRootParams(underlyingParams, workStore, prerenderStore) {
		switch (prerenderStore.type) {
			case "prerender-client": {
				const exportName = "`unstable_rootParams`";
				throw Object.defineProperty(new _invarianterror.InvariantError(`${exportName} must not be used within a client component. Next.js should be preventing ${exportName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
					value: "E693",
					enumerable: false,
					configurable: true
				});
			}
			case "prerender": {
				const fallbackParams = prerenderStore.fallbackRouteParams;
				if (fallbackParams) {
					for (const key in underlyingParams) if (fallbackParams.has(key)) {
						const cachedParams = CachedParams.get(underlyingParams);
						if (cachedParams) return cachedParams;
						const promise = (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, "`unstable_rootParams`");
						CachedParams.set(underlyingParams, promise);
						return promise;
					}
				}
				break;
			}
			case "prerender-ppr": {
				const fallbackParams = prerenderStore.fallbackRouteParams;
				if (fallbackParams) {
					for (const key in underlyingParams) if (fallbackParams.has(key)) return makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore);
				}
				break;
			}
			case "prerender-legacy": break;
			default:
		}
		return Promise.resolve(underlyingParams);
	}
	function makeErroringRootParams(underlyingParams, fallbackParams, workStore, prerenderStore) {
		const cachedParams = CachedParams.get(underlyingParams);
		if (cachedParams) return cachedParams;
		const augmentedUnderlying = { ...underlyingParams };
		const promise = Promise.resolve(augmentedUnderlying);
		CachedParams.set(underlyingParams, promise);
		Object.keys(underlyingParams).forEach((prop) => {
			if (_reflectutils.wellKnownProperties.has(prop)) {} else if (fallbackParams.has(prop)) Object.defineProperty(augmentedUnderlying, prop, {
				get() {
					const expression = (0, _reflectutils.describeStringPropertyAccess)("unstable_rootParams", prop);
					if (prerenderStore.type === "prerender-ppr") (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
					else (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
				},
				enumerable: true
			});
			else promise[prop] = underlyingParams[prop];
		});
		return promise;
	}
	function getRootParam(paramName) {
		const apiName = `\`import('next/root-params').${paramName}()\``;
		const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		if (!workStore) throw Object.defineProperty(new _invarianterror.InvariantError(`Missing workStore in ${apiName}`), "__NEXT_ERROR_CODE", {
			value: "E764",
			enumerable: false,
			configurable: true
		});
		const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		if (!workUnitStore) throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used ${apiName} outside of a Server Component. This is not allowed.`), "__NEXT_ERROR_CODE", {
			value: "E774",
			enumerable: false,
			configurable: true
		});
		const actionStore = _actionasyncstorageexternal.actionAsyncStorage.getStore();
		if (actionStore) {
			if (actionStore.isAppRoute) throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used ${apiName} inside a Route Handler. Support for this API in Route Handlers is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
				value: "E765",
				enumerable: false,
				configurable: true
			});
			if (actionStore.isAction && workUnitStore.phase === "action") throw Object.defineProperty(/* @__PURE__ */ new Error(`${apiName} was used inside a Server Action. This is not supported. Functions from 'next/root-params' can only be called in the context of a route.`), "__NEXT_ERROR_CODE", {
				value: "E766",
				enumerable: false,
				configurable: true
			});
		}
		switch (workUnitStore.type) {
			case "unstable-cache":
			case "cache": throw Object.defineProperty(/* @__PURE__ */ new Error(`Route ${workStore.route} used ${apiName} inside \`"use cache"\` or \`unstable_cache\`. Support for this API inside cache scopes is planned for a future version of Next.js.`), "__NEXT_ERROR_CODE", {
				value: "E760",
				enumerable: false,
				configurable: true
			});
			case "prerender":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy": return createPrerenderRootParamPromise(paramName, workStore, workUnitStore, apiName);
			case "private-cache":
			case "prerender-runtime":
			case "request": break;
			default:
		}
		return Promise.resolve(workUnitStore.rootParams[paramName]);
	}
	function createPrerenderRootParamPromise(paramName, workStore, prerenderStore, apiName) {
		switch (prerenderStore.type) {
			case "prerender-client": throw Object.defineProperty(new _invarianterror.InvariantError(`${apiName} must not be used within a client component. Next.js should be preventing ${apiName} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
				value: "E693",
				enumerable: false,
				configurable: true
			});
			case "prerender":
			case "prerender-legacy":
			case "prerender-ppr":
			default:
		}
		const underlyingParams = prerenderStore.rootParams;
		switch (prerenderStore.type) {
			case "prerender":
				if (prerenderStore.fallbackRouteParams && prerenderStore.fallbackRouteParams.has(paramName)) return (0, _dynamicrenderingutils.makeHangingPromise)(prerenderStore.renderSignal, workStore.route, apiName);
				break;
			case "prerender-ppr":
				if (prerenderStore.fallbackRouteParams && prerenderStore.fallbackRouteParams.has(paramName)) return makeErroringRootParamPromise(paramName, workStore, prerenderStore, apiName);
				break;
			case "prerender-legacy": break;
			default:
		}
		return Promise.resolve(underlyingParams[paramName]);
	}
	/** Deliberately async -- we want to create a rejected promise, not error synchronously. */ async function makeErroringRootParamPromise(paramName, workStore, prerenderStore, apiName) {
		const expression = (0, _reflectutils.describeStringPropertyAccess)(apiName, paramName);
		switch (prerenderStore.type) {
			case "prerender-ppr": return (0, _dynamicrendering.postponeWithTracking)(workStore.route, expression, prerenderStore.dynamicTracking);
			case "prerender-legacy": return (0, _dynamicrendering.throwToInterruptStaticGeneration)(expression, workStore, prerenderStore);
			default:
		}
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/server.js
var require_server = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/server.js": ((exports, module) => {
	const serverExports = {
		NextRequest: require_request().NextRequest,
		NextResponse: require_response().NextResponse,
		ImageResponse: require_image_response().ImageResponse,
		userAgentFromString: require_user_agent().userAgentFromString,
		userAgent: require_user_agent().userAgent,
		URLPattern: require_url_pattern().URLPattern,
		after: require_after().after,
		connection: require_connection().connection,
		unstable_rootParams: require_root_params().unstable_rootParams
	};
	module.exports = serverExports;
	exports.NextRequest = serverExports.NextRequest;
	exports.NextResponse = serverExports.NextResponse;
	exports.ImageResponse = serverExports.ImageResponse;
	exports.userAgentFromString = serverExports.userAgentFromString;
	exports.userAgent = serverExports.userAgent;
	exports.URLPattern = serverExports.URLPattern;
	exports.after = serverExports.after;
	exports.connection = serverExports.connection;
	exports.unstable_rootParams = serverExports.unstable_rootParams;
}) });

//#endregion
//#region src/constants/sessionConstants.ts
var import_server = /* @__PURE__ */ __toESM(require_server(), 1);
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
* Number of seconds before access token expiry at which the SDK proactively
* refreshes the token. A 25-second buffer prevents races where the token is
* valid when a request starts but expires mid-flight.
*/
const REFRESH_BUFFER_SECONDS = 25;
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
//#region src/utils/decorateConfigWithNextEnv.ts
const decorateConfigWithNextEnv = (config) => {
	const { organizationHandle, scopes, applicationId, baseUrl, clientId, clientSecret, signInUrl, signUpUrl, afterSignInUrl, afterSignOutUrl,...rest } = config;
	const envExpiryTime = process.env["THUNDERID_SESSION_COOKIE_EXPIRY_TIME"] ? parseInt(process.env["THUNDERID_SESSION_COOKIE_EXPIRY_TIME"], 10) : void 0;
	return {
		...rest,
		afterSignInUrl: afterSignInUrl || process.env["NEXT_PUBLIC_THUNDERID_AFTER_SIGN_IN_URL"],
		afterSignOutUrl: afterSignOutUrl || process.env["NEXT_PUBLIC_THUNDERID_AFTER_SIGN_OUT_URL"],
		applicationId: applicationId || process.env["NEXT_PUBLIC_THUNDERID_APPLICATION_ID"],
		baseUrl: baseUrl || process.env["NEXT_PUBLIC_THUNDERID_BASE_URL"],
		clientId: clientId || process.env["NEXT_PUBLIC_THUNDERID_CLIENT_ID"],
		clientSecret: clientSecret || process.env["THUNDERID_CLIENT_SECRET"],
		organizationHandle: organizationHandle || process.env["NEXT_PUBLIC_THUNDERID_ORGANIZATION_HANDLE"],
		scopes: scopes || process.env["NEXT_PUBLIC_THUNDERID_SCOPES"],
		sessionCookie: {
			...rest.sessionCookie,
			expiryTime: rest.sessionCookie?.expiryTime || envExpiryTime
		},
		signInUrl: signInUrl || process.env["NEXT_PUBLIC_THUNDERID_SIGN_IN_URL"],
		signUpUrl: signUpUrl || process.env["NEXT_PUBLIC_THUNDERID_SIGN_UP_URL"]
	};
};
var decorateConfigWithNextEnv_default = decorateConfigWithNextEnv;

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
		} catch (error$1) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Invalid session token: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "invalid-session-token", "nextjs", "Session token verification failed");
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
		} catch (error$1) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Invalid session token: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "invalid-session-token-for-refresh", "nextjs", "Session token signature or type check failed during refresh");
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
		} catch (error$1) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Invalid temporary session token: ${error$1 instanceof Error ? error$1.message : "Unknown error"}`, "invalid-temp-session-token", "nextjs", "Temporary session token verification failed");
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
			secure: false
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
			secure: false
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
//#region src/utils/handleRefreshToken.ts
/**
* Handles the OAuth refresh_token grant and builds a new session JWT string.
*
* Intentionally decoupled from cookie APIs so it can be called from both the Edge
* Runtime (Next.js middleware) and the Node.js Runtime (server actions).
* Cookie persistence is the caller's responsibility.
*/
const handleRefreshToken = async (sessionPayload, config) => {
	const { baseUrl, clientId, clientSecret, sessionCookie } = config;
	const { refreshToken: storedRefreshToken, sessionId, sub, scopes, organizationId } = sessionPayload;
	if (!storedRefreshToken) throw new Error("No refresh token found in session payload.");
	const tokenEndpoint = `${baseUrl}/oauth2/token`;
	const body = new URLSearchParams({
		client_id: clientId ?? "",
		client_secret: clientSecret ?? "",
		grant_type: "refresh_token",
		refresh_token: storedRefreshToken
	});
	let response;
	try {
		response = await fetch(tokenEndpoint, {
			body: body.toString(),
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			method: "POST"
		});
	} catch (fetchError) {
		throw new Error(`Token refresh network error: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
	}
	if (!response.ok) throw new Error(`Token endpoint rejected refresh (HTTP ${response.status}).`);
	let tokenData;
	try {
		tokenData = await response.json();
	} catch {
		throw new Error("Failed to parse token endpoint response as JSON.");
	}
	const newAccessToken = tokenData["access_token"];
	const expiresIn = tokenData["expires_in"];
	const newRefreshToken = tokenData["refresh_token"] ?? storedRefreshToken;
	const newScopes = tokenData["scope"] ?? (Array.isArray(scopes) ? scopes.join(" ") : scopes ?? "");
	const resolvedSessionCookieExpiry = SessionManager_default.resolveSessionCookieExpiry(sessionCookie?.expiryTime);
	return {
		newSessionToken: await SessionManager_default.createSessionToken(newAccessToken, sub, sessionId, newScopes, expiresIn, newRefreshToken, organizationId),
		sessionCookieExpiryTime: resolvedSessionCookieExpiry,
		tokenResponse: {
			accessToken: newAccessToken,
			createdAt: Math.floor(Date.now() / 1e3),
			expiresIn: String(expiresIn),
			idToken: tokenData["id_token"] ?? "",
			refreshToken: newRefreshToken,
			scope: newScopes,
			tokenType: tokenData["token_type"] ?? "Bearer"
		}
	};
};
var handleRefreshToken_default = handleRefreshToken;

//#endregion
//#region src/utils/sessionUtils.ts
/**
* Gets the session payload from the request cookies.
* This includes user ID, session ID, and scopes.
*
* @param request - The Next.js request object
* @returns The session payload if valid, undefined otherwise
*/
const getSessionFromRequest = async (request) => {
	try {
		const sessionToken = request.cookies.get(SessionManager_default.getSessionCookieName())?.value;
		if (!sessionToken) return;
		return await SessionManager_default.verifySessionToken(sessionToken);
	} catch {
		return;
	}
};
/**
* Gets the session ID from the request cookies (legacy support).
* First tries to get from JWT session, then falls back to legacy session ID cookie.
*
* @param request - The Next.js request object
* @returns The session ID if it exists, undefined otherwise
*/
const getSessionIdFromRequest = async (request) => {
	try {
		const sessionPayload = await getSessionFromRequest(request);
		if (sessionPayload) return sessionPayload.sessionId;
		return await Promise.resolve(void 0);
	} catch {
		return Promise.resolve(void 0);
	}
};

//#endregion
//#region src/server/middleware/thunderIDMiddleware.ts
/**
* Removes a named cookie from a raw Cookie header string.
*/
const removeCookieFromHeader = (cookieHeader, name) => cookieHeader.split(";").map((p) => p.trim()).filter((p) => {
	const eqIdx = p.indexOf("=");
	return (eqIdx === -1 ? p : p.slice(0, eqIdx).trim()) !== name;
}).join("; ");
/**
* Replaces the value of a named cookie inside a raw Cookie header string.
* If the cookie does not already appear in the header it is appended.
*/
const replaceCookieInHeader = (cookieHeader, name, value) => {
	const parts = cookieHeader.split(";").map((p) => p.trim()).filter(Boolean);
	let found = false;
	const updated = parts.map((part) => {
		const eqIdx = part.indexOf("=");
		if ((eqIdx === -1 ? part : part.slice(0, eqIdx).trim()) === name) {
			found = true;
			return `${name}=${value}`;
		}
		return part;
	});
	if (!found) updated.push(`${name}=${value}`);
	return updated.join("; ");
};
/**
* ThunderID middleware that integrates authentication into your Next.js application.
* Similar to Clerk's clerkMiddleware pattern.
*
* Proactively refreshes the access token when it is within REFRESH_BUFFER_SECONDS of
* expiry so that Server Components always receive a fresh session. The refresh also
* recovers expired tokens as long as a refresh token is present.
*
* The updated session cookie is written to:
*   - The response  → browser stores the new cookie for subsequent requests.
*   - The forwarded request headers → the same-request Server Component render sees
*     the fresh token immediately without waiting for the next navigation.
*
* Token refresh requires baseUrl, clientId, and clientSecret. These are resolved from
* the options argument first, then from the standard ThunderID environment variables
* (NEXT_PUBLIC_THUNDERID_BASE_URL, NEXT_PUBLIC_THUNDERID_CLIENT_ID,
* THUNDERID_CLIENT_SECRET). If none are available the refresh step is skipped silently.
*
* @param handler - Optional handler function to customize middleware behavior
* @param options - Configuration options for the middleware
* @returns Next.js middleware function
*
* @example
* ```typescript
* // middleware.ts - Basic usage (config read from env vars automatically)
* import { thunderIDMiddleware } from '@thunderid/nextjs';
*
* export default thunderIDMiddleware();
*
* export const config = {
*   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
* };
* ```
*
* @example
* ```typescript
* // With route protection
* import { thunderIDMiddleware, createRouteMatcher } from '@thunderid/nextjs';
*
* const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
*
* export default thunderIDMiddleware(async (thunderid, req) => {
*   if (isProtectedRoute(req)) {
*     await thunderid.protectRoute();
*   }
* });
* ```
*/
const thunderIDMiddleware = (handler, options) => async (request) => {
	const resolvedConfig = decorateConfigWithNextEnv_default(typeof options === "function" ? options(request) : options || {});
	const url = new URL(request.url);
	const hasCallbackParams = url.searchParams.has("code") && url.searchParams.has("state");
	let isValidOAuthCallback = false;
	if (hasCallbackParams && !url.searchParams.has("error")) {
		const tempSessionToken = request.cookies.get(SessionManager_default.getTempSessionCookieName())?.value;
		if (tempSessionToken) try {
			await SessionManager_default.verifyTempSession(tempSessionToken);
			isValidOAuthCallback = true;
		} catch {
			isValidOAuthCallback = false;
		}
	}
	const verifiedSession = await getSessionFromRequest(request);
	let expiredSession;
	if (!verifiedSession) {
		const rawToken = request.cookies.get(SessionManager_default.getSessionCookieName())?.value;
		if (rawToken) try {
			const decoded = await SessionManager_default.verifySessionTokenForRefresh(rawToken);
			if (decoded.refreshToken) expiredSession = decoded;
		} catch {}
	}
	const now = Math.floor(Date.now() / 1e3);
	const candidateSession = verifiedSession ?? expiredSession;
	const hasRefreshConfig = !!(resolvedConfig.baseUrl && resolvedConfig.clientId && resolvedConfig.clientSecret);
	const needsRefresh = !isValidOAuthCallback && hasRefreshConfig && !!candidateSession?.refreshToken && (!!verifiedSession && verifiedSession.exp <= now + REFRESH_BUFFER_SECONDS || !!expiredSession);
	let activeSession = verifiedSession;
	let refreshCookieUpdate;
	if (needsRefresh && candidateSession) try {
		const { newSessionToken, sessionCookieExpiryTime } = await handleRefreshToken_default(candidateSession, {
			baseUrl: resolvedConfig.baseUrl,
			clientId: resolvedConfig.clientId,
			clientSecret: resolvedConfig.clientSecret,
			sessionCookie: resolvedConfig.sessionCookie
		});
		activeSession = await SessionManager_default.verifySessionToken(newSessionToken);
		refreshCookieUpdate = {
			expiry: sessionCookieExpiryTime,
			token: newSessionToken
		};
	} catch {
		activeSession = void 0;
	}
	const rawSessionCookie = request.cookies.get(SessionManager_default.getSessionCookieName())?.value;
	let shouldClearCookie = false;
	if (!isValidOAuthCallback && rawSessionCookie && !activeSession && !refreshCookieUpdate) shouldClearCookie = true;
	const sessionId = activeSession?.sessionId ?? await getSessionIdFromRequest(request);
	const isAuthenticated = !!activeSession;
	const handlerResponse = handler ? await handler({
		getSession: async () => activeSession,
		getSessionId: () => sessionId,
		isSignedIn: () => isAuthenticated,
		protectRoute: async (routeOptions) => {
			if (isValidOAuthCallback) return;
			if (!isAuthenticated) {
				const referer = request.headers.get("referer");
				let fallbackRedirect = "/";
				if (referer) try {
					const refererUrl = new URL(referer);
					const requestUrl = new URL(request.url);
					if (refererUrl.origin === requestUrl.origin) fallbackRedirect = refererUrl.pathname + refererUrl.search;
				} catch {}
				const redirectUrl = routeOptions?.redirect ?? resolvedConfig.signInUrl ?? fallbackRedirect;
				return import_server.NextResponse.redirect(new URL(redirectUrl, request.url));
			}
		}
	}, request) : void 0;
	if (shouldClearCookie) {
		const cookieName$1 = SessionManager_default.getSessionCookieName();
		if (handlerResponse) {
			handlerResponse.cookies.delete(cookieName$1);
			return handlerResponse;
		}
		const requestHeaders$1 = new Headers(request.headers);
		requestHeaders$1.set("cookie", removeCookieFromHeader(request.headers.get("cookie") ?? "", cookieName$1));
		const cleanResponse = import_server.NextResponse.next({ request: { headers: requestHeaders$1 } });
		cleanResponse.cookies.delete(cookieName$1);
		return cleanResponse;
	}
	if (!refreshCookieUpdate) return handlerResponse ?? import_server.NextResponse.next();
	const cookieName = SessionManager_default.getSessionCookieName();
	const cookieOptions = SessionManager_default.getSessionCookieOptions(refreshCookieUpdate.expiry);
	if (handlerResponse) {
		handlerResponse.cookies.set(cookieName, refreshCookieUpdate.token, cookieOptions);
		return handlerResponse;
	}
	const requestHeaders = new Headers(request.headers);
	const updatedCookieHeader = replaceCookieInHeader(request.headers.get("cookie") ?? "", cookieName, refreshCookieUpdate.token);
	requestHeaders.set("cookie", updatedCookieHeader);
	const response = import_server.NextResponse.next({ request: { headers: requestHeaders } });
	response.cookies.set(cookieName, refreshCookieUpdate.token, cookieOptions);
	return response;
};
var thunderIDMiddleware_default = thunderIDMiddleware;

//#endregion
//#region src/server/middleware/createRouteMatcher.ts
/**
* Creates a route matcher function that tests if a request matches any of the given patterns.
*
* @param patterns - Array of route patterns to match. Supports glob-like patterns.
* @returns Function that tests if a request matches any of the patterns
*
* @example
* ```typescript
* const isProtectedRoute = createRouteMatcher([
*   '/dashboard(.*)',
*   '/admin(.*)',
*   '/profile'
* ]);
*
* if (isProtectedRoute(req)) {
*   // Route is protected
* }
* ```
*/
const createRouteMatcher = (patterns) => {
	const regexPatterns = patterns.map((pattern) => {
		const regexPattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*").replace(/\(\.\*\)/g, "(.*)");
		return /* @__PURE__ */ new RegExp(`^${regexPattern}$`);
	});
	return (req) => {
		const { pathname } = req.nextUrl;
		return regexPatterns.some((regex) => regex.test(pathname));
	};
};
var createRouteMatcher_default = createRouteMatcher;

//#endregion
exports.createRouteMatcher = createRouteMatcher_default;
exports.thunderIDMiddleware = thunderIDMiddleware_default;