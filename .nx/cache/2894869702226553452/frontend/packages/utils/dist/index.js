import humanId from "human-id";

//#region src/classnames/cn.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
let prefix = "";
/**
* Sets the global class name prefix used by `cn()`.
*
* Should be called once at app bootstrap, typically using the product name
* from `config.js`.
*
* @example
* ```ts
* setCnPrefix('<PRODUCT_NAME>');
* ```
*
* @param newPrefix - The prefix to use for all class names
*/
function setCnPrefix(newPrefix) {
	prefix = newPrefix.replace(/[^a-zA-Z0-9_-]/g, "");
}
/**
* Returns the current class name prefix.
*/
function getCnPrefix() {
	return prefix;
}
/**
* Constructs a className string from conditional class values, automatically
* prefixing each class with the configured product name.
*
* Follows MUI-style BEM convention: `{Prefix}{Component}--{slot}`.
*
* @example
* ```tsx
* cn("SignIn--root")
* // => "<PRODUCT_NAME>SignIn--root"
*
* cn("SignIn--root", isPrimary && "SignIn--primary")
* // => "<PRODUCT_NAME>SignIn--root <PRODUCT_NAME>SignIn--primary" (when isPrimary is true)
* // => "<PRODUCT_NAME>SignIn--root" (when isPrimary is false)
*
* cn("SignInBox--root", "SignInBox--paper", isActive && "SignInBox--active")
* // => "<PRODUCT_NAME>SignInBox--root <PRODUCT_NAME>SignInBox--paper <PRODUCT_NAME>SignInBox--active"
* ```
*
* @param classes - Class name strings or falsy values for conditional classes
* @returns The joined className string with the configured prefix applied
*/
function cn(...classes) {
	return classes.filter(Boolean).map((cls) => `${prefix}${cls}`).join(" ");
}

//#endregion
//#region src/string/generateRandomHumanReadableIdentifiers.ts
/**
* Generates random human-readable identifiers using the `human-id` library
*
* @param length - The number of identifiers to generate (default: 5)
* @returns An array of human-readable identifiers
*/
function generateRandomHumanReadableIdentifiers(length = 5) {
	return Array.from({ length }, () => {
		return humanId({
			separator: " ",
			capitalize: true,
			adjectiveCount: 1,
			addAdverb: false
		}).split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
	});
}

//#endregion
//#region src/string/kebabCase.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Converts a string to kebab-case.
*
* Splits on whitespace, hyphens, underscores, and camelCase boundaries,
* lowercases each word, and joins them with hyphens. Non-alphanumeric
* characters (other than the separators above) are stripped.
*
* @example
* kebabCase('Acrylic Orange') // => 'acrylic-orange'
* kebabCase('fooBar')         // => 'foo-bar'
* kebabCase('FOO_BAR')        // => 'foo-bar'
* kebabCase('  hello world ') // => 'hello-world'
*
* @param value - The string to convert.
* @returns The kebab-cased string.
*/
function kebabCase(value) {
	return value.replace(/([a-z\d])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").replace(/[^a-zA-Z0-9]+/g, " ").trim().toLowerCase().split(" ").filter(Boolean).join("-");
}

//#endregion
//#region src/path/isAbsoluteUrl.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Returns `true` if the given URL is absolute.
*
* A URL is considered absolute if it:
* - Starts with a URL scheme (e.g. `http://`, `https://`)
* - Starts with `//` (protocol-relative URL, e.g. `//example.com/foo`)
*
* @param url - The URL string to check.
* @returns `true` if `url` is an absolute URL, `false` otherwise.
*/
function isAbsoluteUrl(url) {
	return url.startsWith("//") || /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);
}

//#endregion
//#region src/path/isRelativeUrl.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Returns `true` if the given URL is relative.
*
* A URL is considered relative if it is not absolute — i.e. it does not
* start with a URL scheme (e.g. `http://`, `https://`) or `//`.
*
* @param url - The URL string to check.
* @returns `true` if `url` is a relative URL, `false` otherwise.
*/
function isRelativeUrl(url) {
	return !url.startsWith("//") && !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);
}

//#endregion
//#region src/object/isEmpty.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Drop-in replacement for lodash `isEmpty`.
*
* Returns `true` for:
* - `null` / `undefined`
* - strings, arrays, and `arguments` objects with `length === 0`
* - `Map` / `Set` with `size === 0`
* - plain objects with no own enumerable keys
* - numbers, booleans, and `Symbol` values (lodash considers primitives empty)
*
* @param value - The value to check.
* @returns `true` if `value` is empty, `false` otherwise.
*/
function isEmpty(value) {
	if (value == null) return true;
	if (typeof value === "boolean" || typeof value === "number" || typeof value === "symbol") return true;
	if (typeof value === "string" || Array.isArray(value)) return value.length === 0;
	if (value instanceof Map || value instanceof Set) return value.size === 0;
	if (typeof value === "object") {
		if ("length" in value && typeof value.length === "number") return value.length === 0;
		return Object.keys(value).length === 0;
	}
	return true;
}

//#endregion
//#region src/object/merge.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
function mergeValue(tgtVal, srcVal) {
	if (Array.isArray(srcVal)) return mergeArrays(Array.isArray(tgtVal) ? tgtVal : [], srcVal);
	if (isPlainObject(srcVal)) {
		const tgtObj = isPlainObject(tgtVal) ? tgtVal : {};
		mergeTwo(tgtObj, srcVal);
		return tgtObj;
	}
	return srcVal;
}
function mergeArrays(target, source) {
	source.forEach((srcVal, i) => {
		if (srcVal === void 0) return;
		Object.assign(target, { [i]: mergeValue(target[i], srcVal) });
	});
	return target;
}
function mergeTwo(target, source) {
	Object.keys(source).forEach((key) => {
		const srcVal = source[key];
		if (srcVal === void 0) return;
		const tgtVal = target[key];
		Object.assign(target, { [key]: mergeValue(tgtVal, srcVal) });
	});
}
/**
* Drop-in replacement for lodash `merge`.
*
* Recursively merges own enumerable properties of source objects into the
* destination object. Source properties that resolve to `undefined` do not
* overwrite existing destination values. Array and plain-object values are
* merged recursively; all other values are assigned by reference.
*
* Mutates and returns the destination object.
*
* @param object - The destination object.
* @param sources - One or more source objects.
* @returns The mutated destination object.
*/
function merge(object, ...sources) {
	sources.forEach((source) => {
		if (source == null) return;
		mergeTwo(object, source);
	});
	return object;
}

//#endregion
//#region src/error/getErrorMessage.ts
/**
* Extracts a localized error message from an API error response.
*
* Attempts to resolve a specific i18n message for the error code returned
* by the API (e.g. `errors.APP-1020`). If no specific translation exists,
* falls back to the provided generic key.
*
* @param error - The error thrown by the mutation
* @param t - The i18next translation function scoped to the relevant namespace
* @param fallbackKey - i18n key to use when no specific message is found (e.g. `'create.error'`)
* @returns Localized error message string
*
* @example
* ```typescript
* onError: (error) => {
*   showToast(getErrorMessage(error, t, 'create.error'), 'error');
* }
* ```
*
* @public
*/
function getErrorMessage(error, t, fallbackKey) {
	const apiError = error.response?.data;
	if (apiError?.code) {
		const specific = t(`errors.${apiError.code}`, { defaultValue: "" });
		if (specific) return specific;
	}
	return t(fallbackKey);
}

//#endregion
//#region src/template/isI18nTemplatePattern.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Regular expression to match the i18n pattern `{{t(key)}}` (exact, full-string match).
* Allows optional whitespace around `t(key)` to handle both `{{t(key)}}` and `{{ t(key) }}`.
*/
const I18N_PATTERN = /^\{\{\s*t\([^)]+\)\s*\}\}$/;
/**
* Regular expression to extract the key from an i18n pattern `{{t(key)}}`.
* Allows optional whitespace around `t(key)`.
*/
const I18N_KEY_PATTERN = /^\{\{\s*t\(([^)]+)\)\s*\}\}$/;
/**
* Check if a value matches the i18n template pattern `{{t(key)}}`.
*
* @param value - The string to test.
* @returns `true` if the trimmed value matches the pattern, `false` otherwise.
*
* @example
* ```typescript
* isI18nTemplatePattern('{{t(signin:heading)}}') // true
* isI18nTemplatePattern('hello world')           // false
* ```
*/
function isI18nTemplatePattern(value) {
	return I18N_PATTERN.test(value.trim());
}

//#endregion
//#region src/template/isMetaTemplatePattern.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Regular expression to match the meta pattern `{{meta(key)}}` (exact, full-string match).
*/
const META_PATTERN = /^\{\{meta\([^)]+\)\}\}$/;
/**
* Regular expression to extract the key from a meta pattern `{{meta(key)}}`.
*/
const META_KEY_PATTERN = /^\{\{meta\(([^)]+)\)\}\}$/;
/**
* Check if a value matches the meta template pattern `{{meta(key)}}`.
*
* @param value - The string to test.
* @returns `true` if the trimmed value matches the pattern, `false` otherwise.
*
* @example
* ```typescript
* isMetaTemplatePattern('{{meta(user:name)}}') // true
* isMetaTemplatePattern('hello world')         // false
* ```
*/
function isMetaTemplatePattern(value) {
	return META_PATTERN.test(value.trim());
}

//#endregion
//#region src/template/containsMetaTemplate.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Build a regex that matches `{{ meta(key) }}` (with optional whitespace) anywhere
* within a string, escaping any special regex characters in `key`.
*/
function buildMetaTemplateRegex(key) {
	const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return /* @__PURE__ */ new RegExp(`\\{\\{\\s*meta\\(${escapedKey}\\)\\s*\\}\\}`);
}
/**
* Check whether a string contains a `{{ meta(key) }}` template anywhere within it.
*
* Unlike {@link isMetaTemplatePattern}, which requires the whole string to be the
* template, this function detects the pattern embedded inside a larger string such
* as an HTML label.
*
* Whitespace around `{{` / `}}` is allowed, e.g. `{{ meta(application.sign_up_url) }}`.
*
* @param str - The string to search (may be a plain value or an HTML fragment).
* @param key - The meta key to look for, e.g. `"application.sign_up_url"`.
* @returns `true` if the pattern is found anywhere in `str`, `false` otherwise.
*
* @example
* ```typescript
* containsMetaTemplate('<a href="{{meta(application.sign_up_url)}}">Sign up</a>', 'application.sign_up_url')
* // true
*
* containsMetaTemplate('<a href="https://example.com">Sign up</a>', 'application.sign_up_url')
* // false
* ```
*/
function containsMetaTemplate(str, key) {
	return buildMetaTemplateRegex(key).test(str);
}
/**
* Replace all occurrences of `{{ meta(key) }}` (with optional whitespace) in `str`
* with `replacement`.
*
* @param str - The source string.
* @param key - The meta key to replace, e.g. `"application.sign_up_url"`.
* @param replacement - The value to substitute for each match.
* @returns A new string with all occurrences replaced.
*/
function replaceMetaTemplate(str, key, replacement) {
	const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(`\\{\\{\\s*meta\\(${escapedKey}\\)\\s*\\}\\}`, "g");
	return str.replace(regex, replacement);
}

//#endregion
//#region src/template/parseTemplateLiteral.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Regular expression to detect a template literal wrapped in double braces.
* Matches patterns like `{{ t(key) }}`, `{{meta(key)}}`, etc.
*/
const TEMPLATE_LITERAL_REGEX = /\{\{\s*([^}]+)\s*\}\}/;
/**
* Regular expression to parse a function-call expression inside template braces.
* Matches `funcName(arg)` and captures the function name and argument.
*/
const FUNCTION_CALL_REGEX = /^(\w+)\(([^)]+)\)$/;
/**
* Template literal types supported by the resolver.
*/
let TemplateLiteralType = /* @__PURE__ */ function(TemplateLiteralType$1) {
	/** Translation template literal using t() function */
	TemplateLiteralType$1["TRANSLATION"] = "t";
	/** Meta template literal using meta() function — resolves against flow/page meta data */
	TemplateLiteralType$1["META"] = "meta";
	/** Unknown or unsupported template literal format */
	TemplateLiteralType$1["UNKNOWN"] = "unknown";
	return TemplateLiteralType$1;
}({});
/**
* Parse a template literal content string and extract its type and key.
*
* Supports function-call expressions like:
* - `t(signin:heading)` -> type TRANSLATION, key "signin:heading"
*
* @param content - The content inside the template literal braces (without `{{ }}`).
* @returns Parsed template literal information including type, key, and original value.
*
* @example
* ```typescript
* parseTemplateLiteral('t(signin:heading)')
* // Returns: { type: TemplateLiteralType.TRANSLATION, key: 'signin:heading', originalValue: 't(signin:heading)' }
* ```
*/
function parseTemplateLiteral(content) {
	const originalValue = content;
	const match = FUNCTION_CALL_REGEX.exec(content);
	if (!match) return {
		type: TemplateLiteralType.UNKNOWN,
		originalValue
	};
	const [, functionName, key] = match;
	const cleanKey = key.trim().replace(/^['"]|['"]$/g, "");
	switch (functionName) {
		case TemplateLiteralType.TRANSLATION: return {
			type: TemplateLiteralType.TRANSLATION,
			key: cleanKey,
			originalValue
		};
		case TemplateLiteralType.META: return {
			type: TemplateLiteralType.META,
			key: cleanKey,
			originalValue
		};
		default: return {
			type: TemplateLiteralType.UNKNOWN,
			originalValue
		};
	}
}

//#endregion
export { FUNCTION_CALL_REGEX, I18N_KEY_PATTERN, I18N_PATTERN, META_KEY_PATTERN, META_PATTERN, TEMPLATE_LITERAL_REGEX, TemplateLiteralType, cn, containsMetaTemplate, generateRandomHumanReadableIdentifiers, getCnPrefix, getErrorMessage, isAbsoluteUrl, isEmpty, isI18nTemplatePattern, isMetaTemplatePattern, isRelativeUrl, kebabCase, merge, parseTemplateLiteral, replaceMetaTemplate, setCnPrefix };