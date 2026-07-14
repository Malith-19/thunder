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
let __clack_prompts = require("@clack/prompts");
__clack_prompts = __toESM(__clack_prompts);
let __thunderid_logger = require("@thunderid/logger");
__thunderid_logger = __toESM(__thunderid_logger);
let commander = require("commander");
commander = __toESM(commander);
let picocolors = require("picocolors");
picocolors = __toESM(picocolors);
let fs = require("fs");
fs = __toESM(fs);
let path = require("path");
path = __toESM(path);
let handlebars = require("handlebars");
handlebars = __toESM(handlebars);
let url = require("url");
url = __toESM(url);

//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayReduce.js
/**
* A specialized version of `_.reduce` for arrays without support for
* iteratee shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @param {*} [accumulator] The initial value.
* @param {boolean} [initAccum] Specify using the first element of `array` as
*  the initial value.
* @returns {*} Returns the accumulated value.
*/
function arrayReduce(array, iteratee, accumulator, initAccum) {
	var index = -1, length = array == null ? 0 : array.length;
	if (initAccum && length) accumulator = array[++index];
	while (++index < length) accumulator = iteratee(accumulator, array[index], index, array);
	return accumulator;
}
var _arrayReduce_default = arrayReduce;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_basePropertyOf.js
/**
* The base implementation of `_.propertyOf` without support for deep paths.
*
* @private
* @param {Object} object The object to query.
* @returns {Function} Returns the new accessor function.
*/
function basePropertyOf(object) {
	return function(key) {
		return object == null ? void 0 : object[key];
	};
}
var _basePropertyOf_default = basePropertyOf;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_deburrLetter.js
/**
* Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
* letters to basic Latin letters.
*
* @private
* @param {string} letter The matched letter to deburr.
* @returns {string} Returns the deburred letter.
*/
var deburrLetter = _basePropertyOf_default({
	"À": "A",
	"Á": "A",
	"Â": "A",
	"Ã": "A",
	"Ä": "A",
	"Å": "A",
	"à": "a",
	"á": "a",
	"â": "a",
	"ã": "a",
	"ä": "a",
	"å": "a",
	"Ç": "C",
	"ç": "c",
	"Ð": "D",
	"ð": "d",
	"È": "E",
	"É": "E",
	"Ê": "E",
	"Ë": "E",
	"è": "e",
	"é": "e",
	"ê": "e",
	"ë": "e",
	"Ì": "I",
	"Í": "I",
	"Î": "I",
	"Ï": "I",
	"ì": "i",
	"í": "i",
	"î": "i",
	"ï": "i",
	"Ñ": "N",
	"ñ": "n",
	"Ò": "O",
	"Ó": "O",
	"Ô": "O",
	"Õ": "O",
	"Ö": "O",
	"Ø": "O",
	"ò": "o",
	"ó": "o",
	"ô": "o",
	"õ": "o",
	"ö": "o",
	"ø": "o",
	"Ù": "U",
	"Ú": "U",
	"Û": "U",
	"Ü": "U",
	"ù": "u",
	"ú": "u",
	"û": "u",
	"ü": "u",
	"Ý": "Y",
	"ý": "y",
	"ÿ": "y",
	"Æ": "Ae",
	"æ": "ae",
	"Þ": "Th",
	"þ": "th",
	"ß": "ss",
	"Ā": "A",
	"Ă": "A",
	"Ą": "A",
	"ā": "a",
	"ă": "a",
	"ą": "a",
	"Ć": "C",
	"Ĉ": "C",
	"Ċ": "C",
	"Č": "C",
	"ć": "c",
	"ĉ": "c",
	"ċ": "c",
	"č": "c",
	"Ď": "D",
	"Đ": "D",
	"ď": "d",
	"đ": "d",
	"Ē": "E",
	"Ĕ": "E",
	"Ė": "E",
	"Ę": "E",
	"Ě": "E",
	"ē": "e",
	"ĕ": "e",
	"ė": "e",
	"ę": "e",
	"ě": "e",
	"Ĝ": "G",
	"Ğ": "G",
	"Ġ": "G",
	"Ģ": "G",
	"ĝ": "g",
	"ğ": "g",
	"ġ": "g",
	"ģ": "g",
	"Ĥ": "H",
	"Ħ": "H",
	"ĥ": "h",
	"ħ": "h",
	"Ĩ": "I",
	"Ī": "I",
	"Ĭ": "I",
	"Į": "I",
	"İ": "I",
	"ĩ": "i",
	"ī": "i",
	"ĭ": "i",
	"į": "i",
	"ı": "i",
	"Ĵ": "J",
	"ĵ": "j",
	"Ķ": "K",
	"ķ": "k",
	"ĸ": "k",
	"Ĺ": "L",
	"Ļ": "L",
	"Ľ": "L",
	"Ŀ": "L",
	"Ł": "L",
	"ĺ": "l",
	"ļ": "l",
	"ľ": "l",
	"ŀ": "l",
	"ł": "l",
	"Ń": "N",
	"Ņ": "N",
	"Ň": "N",
	"Ŋ": "N",
	"ń": "n",
	"ņ": "n",
	"ň": "n",
	"ŋ": "n",
	"Ō": "O",
	"Ŏ": "O",
	"Ő": "O",
	"ō": "o",
	"ŏ": "o",
	"ő": "o",
	"Ŕ": "R",
	"Ŗ": "R",
	"Ř": "R",
	"ŕ": "r",
	"ŗ": "r",
	"ř": "r",
	"Ś": "S",
	"Ŝ": "S",
	"Ş": "S",
	"Š": "S",
	"ś": "s",
	"ŝ": "s",
	"ş": "s",
	"š": "s",
	"Ţ": "T",
	"Ť": "T",
	"Ŧ": "T",
	"ţ": "t",
	"ť": "t",
	"ŧ": "t",
	"Ũ": "U",
	"Ū": "U",
	"Ŭ": "U",
	"Ů": "U",
	"Ű": "U",
	"Ų": "U",
	"ũ": "u",
	"ū": "u",
	"ŭ": "u",
	"ů": "u",
	"ű": "u",
	"ų": "u",
	"Ŵ": "W",
	"ŵ": "w",
	"Ŷ": "Y",
	"ŷ": "y",
	"Ÿ": "Y",
	"Ź": "Z",
	"Ż": "Z",
	"Ž": "Z",
	"ź": "z",
	"ż": "z",
	"ž": "z",
	"Ĳ": "IJ",
	"ĳ": "ij",
	"Œ": "Oe",
	"œ": "oe",
	"ŉ": "'n",
	"ſ": "s"
});
var _deburrLetter_default = deburrLetter;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_freeGlobal.js
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var _freeGlobal_default = freeGlobal;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_root.js
/** Detect free variable `self`. */
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */
var root = _freeGlobal_default || freeSelf || Function("return this")();
var _root_default = root;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Symbol.js
/** Built-in value references. */
var Symbol = _root_default.Symbol;
var _Symbol_default = Symbol;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayMap.js
/**
* A specialized version of `_.map` for arrays without support for iteratee
* shorthands.
*
* @private
* @param {Array} [array] The array to iterate over.
* @param {Function} iteratee The function invoked per iteration.
* @returns {Array} Returns the new mapped array.
*/
function arrayMap(array, iteratee) {
	var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	while (++index < length) result[index] = iteratee(array[index], index, array);
	return result;
}
var _arrayMap_default = arrayMap;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArray.js
/**
* Checks if `value` is classified as an `Array` object.
*
* @static
* @memberOf _
* @since 0.1.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is an array, else `false`.
* @example
*
* _.isArray([1, 2, 3]);
* // => true
*
* _.isArray(document.body.children);
* // => false
*
* _.isArray('abc');
* // => false
*
* _.isArray(_.noop);
* // => false
*/
var isArray = Array.isArray;
var isArray_default = isArray;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getRawTag.js
/** Used for built-in method references. */
var objectProto = Object.prototype;
/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString$1 = objectProto.toString;
/** Built-in value references. */
var symToStringTag$1 = _Symbol_default ? _Symbol_default.toStringTag : void 0;
/**
* A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the raw `toStringTag`.
*/
function getRawTag(value) {
	var isOwn = hasOwnProperty.call(value, symToStringTag$1), tag = value[symToStringTag$1];
	try {
		value[symToStringTag$1] = void 0;
		var unmasked = true;
	} catch (e) {}
	var result = nativeObjectToString$1.call(value);
	if (unmasked) if (isOwn) value[symToStringTag$1] = tag;
	else delete value[symToStringTag$1];
	return result;
}
var _getRawTag_default = getRawTag;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_objectToString.js
/**
* Used to resolve the
* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
* of values.
*/
var nativeObjectToString = Object.prototype.toString;
/**
* Converts `value` to a string using `Object.prototype.toString`.
*
* @private
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
*/
function objectToString(value) {
	return nativeObjectToString.call(value);
}
var _objectToString_default = objectToString;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGetTag.js
/** `Object#toString` result references. */
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
/** Built-in value references. */
var symToStringTag = _Symbol_default ? _Symbol_default.toStringTag : void 0;
/**
* The base implementation of `getTag` without fallbacks for buggy environments.
*
* @private
* @param {*} value The value to query.
* @returns {string} Returns the `toStringTag`.
*/
function baseGetTag(value) {
	if (value == null) return value === void 0 ? undefinedTag : nullTag;
	return symToStringTag && symToStringTag in Object(value) ? _getRawTag_default(value) : _objectToString_default(value);
}
var _baseGetTag_default = baseGetTag;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isObjectLike.js
/**
* Checks if `value` is object-like. A value is object-like if it's not `null`
* and has a `typeof` result of "object".
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
* @example
*
* _.isObjectLike({});
* // => true
*
* _.isObjectLike([1, 2, 3]);
* // => true
*
* _.isObjectLike(_.noop);
* // => false
*
* _.isObjectLike(null);
* // => false
*/
function isObjectLike(value) {
	return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isSymbol.js
/** `Object#toString` result references. */
var symbolTag = "[object Symbol]";
/**
* Checks if `value` is classified as a `Symbol` primitive or object.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to check.
* @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
* @example
*
* _.isSymbol(Symbol.iterator);
* // => true
*
* _.isSymbol('abc');
* // => false
*/
function isSymbol(value) {
	return typeof value == "symbol" || isObjectLike_default(value) && _baseGetTag_default(value) == symbolTag;
}
var isSymbol_default = isSymbol;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseToString.js
/** Used as references for various `Number` constants. */
var INFINITY = Infinity;
/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol_default ? _Symbol_default.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
/**
* The base implementation of `_.toString` which doesn't convert nullish
* values to empty strings.
*
* @private
* @param {*} value The value to process.
* @returns {string} Returns the string.
*/
function baseToString(value) {
	if (typeof value == "string") return value;
	if (isArray_default(value)) return _arrayMap_default(value, baseToString) + "";
	if (isSymbol_default(value)) return symbolToString ? symbolToString.call(value) : "";
	var result = value + "";
	return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _baseToString_default = baseToString;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/toString.js
/**
* Converts `value` to a string. An empty string is returned for `null`
* and `undefined` values. The sign of `-0` is preserved.
*
* @static
* @memberOf _
* @since 4.0.0
* @category Lang
* @param {*} value The value to convert.
* @returns {string} Returns the converted string.
* @example
*
* _.toString(null);
* // => ''
*
* _.toString(-0);
* // => '-0'
*
* _.toString([1, 2, 3]);
* // => '1,2,3'
*/
function toString(value) {
	return value == null ? "" : _baseToString_default(value);
}
var toString_default = toString;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/deburr.js
/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
/**
* Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
* [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
*/
var reComboMark = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]", "g");
/**
* Deburrs `string` by converting
* [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
* and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
* letters to basic Latin letters and removing
* [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to deburr.
* @returns {string} Returns the deburred string.
* @example
*
* _.deburr('déjà vu');
* // => 'deja vu'
*/
function deburr(string) {
	string = toString_default(string);
	return string && string.replace(reLatin, _deburrLetter_default).replace(reComboMark, "");
}
var deburr_default = deburr;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_asciiWords.js
/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/**
* Splits an ASCII `string` into an array of its words.
*
* @private
* @param {string} The string to inspect.
* @returns {Array} Returns the words of `string`.
*/
function asciiWords(string) {
	return string.match(reAsciiWord) || [];
}
var _asciiWords_default = asciiWords;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hasUnicodeWord.js
/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/**
* Checks if `string` contains a word composed of Unicode symbols.
*
* @private
* @param {string} string The string to inspect.
* @returns {boolean} Returns `true` if a word is found, else `false`.
*/
function hasUnicodeWord(string) {
	return reHasUnicodeWord.test(string);
}
var _hasUnicodeWord_default = hasUnicodeWord;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_unicodeWords.js
/** Used to compose unicode character classes. */
var rsAstralRange = "\\ud800-\\udfff", rsComboRange = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */
var rsApos = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsModifier = "(?:" + rsCombo + "|\\ud83c[\\udffb-\\udfff])", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
	rsNonAstral,
	rsRegional,
	rsSurrPair
].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [
	rsDingbat,
	rsRegional,
	rsSurrPair
].join("|") + ")" + rsSeq;
/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
	rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [
		rsBreak,
		rsUpper,
		"$"
	].join("|") + ")",
	rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [
		rsBreak,
		rsUpper + rsMiscLower,
		"$"
	].join("|") + ")",
	rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
	rsUpper + "+" + rsOptContrUpper,
	rsOrdUpper,
	rsOrdLower,
	rsDigits,
	rsEmoji
].join("|"), "g");
/**
* Splits a Unicode `string` into an array of its words.
*
* @private
* @param {string} The string to inspect.
* @returns {Array} Returns the words of `string`.
*/
function unicodeWords(string) {
	return string.match(reUnicodeWord) || [];
}
var _unicodeWords_default = unicodeWords;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/words.js
/**
* Splits `string` into an array of its words.
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to inspect.
* @param {RegExp|string} [pattern] The pattern to match words.
* @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
* @returns {Array} Returns the words of `string`.
* @example
*
* _.words('fred, barney, & pebbles');
* // => ['fred', 'barney', 'pebbles']
*
* _.words('fred, barney, & pebbles', /[^, ]+/g);
* // => ['fred', 'barney', '&', 'pebbles']
*/
function words(string, pattern, guard) {
	string = toString_default(string);
	pattern = guard ? void 0 : pattern;
	if (pattern === void 0) return _hasUnicodeWord_default(string) ? _unicodeWords_default(string) : _asciiWords_default(string);
	return string.match(pattern) || [];
}
var words_default = words;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_createCompounder.js
/** Used to match apostrophes. */
var reApos = RegExp("['’]", "g");
/**
* Creates a function like `_.camelCase`.
*
* @private
* @param {Function} callback The function to combine each word.
* @returns {Function} Returns the new compounder function.
*/
function createCompounder(callback) {
	return function(string) {
		return _arrayReduce_default(words_default(deburr_default(string).replace(reApos, "")), callback, "");
	};
}
var _createCompounder_default = createCompounder;

//#endregion
//#region ../../../node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/kebabCase.js
/**
* Converts `string` to
* [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
*
* @static
* @memberOf _
* @since 3.0.0
* @category String
* @param {string} [string=''] The string to convert.
* @returns {string} Returns the kebab cased string.
* @example
*
* _.kebabCase('Foo Bar');
* // => 'foo-bar'
*
* _.kebabCase('fooBar');
* // => 'foo-bar'
*
* _.kebabCase('__FOO_BAR__');
* // => 'foo-bar'
*/
var kebabCase = _createCompounder_default(function(result, word, index) {
	return result + (index ? "-" : "") + word.toLowerCase();
});
var kebabCase_default = kebabCase;

//#endregion
//#region src/utils/renderTemplate.ts
/**
* Renders a Handlebars template string with the provided context.
*
* @param template - The Handlebars template string
* @param context - Data context for template rendering
* @returns The rendered string
*
* @example
* renderTemplate('Hello, {{name}}!', { name: 'World' });
* // Returns 'Hello, World!'
*
* @public
*/
function renderTemplate(templateContent, context) {
	return handlebars.default.compile(templateContent)(context);
}

//#endregion
//#region src/utils/renderTemplateFile.ts
/**
* Renders a Handlebars template file with the provided context and writes the output to the target file.
*
* @param templatePath - Path to the Handlebars template file
* @param targetPath - Path to write the rendered output file
* @param context - Data context for template rendering
*
* @example
* renderTemplateFile('template.hbs', 'output.ts', { name: 'Feature' });
*
* @public
*/
function renderTemplateFile(templatePath, context) {
	if (!(0, fs.existsSync)(templatePath)) throw new Error(`Template file not found: ${templatePath}`);
	return renderTemplate((0, fs.readFileSync)(templatePath, "utf8"), context);
}

//#endregion
//#region src/utils/createFileFromTemplate.ts
const logger$3 = (0, __thunderid_logger.createLogger)();
/**
* Renders a single Handlebars template file and writes the output to the specified target file.
*
* @param templatePath - Path to the Handlebars template file
* @param targetPath - Path to write the rendered output file
* @param context - Data context for template rendering
*
* @example
* createFileFromTemplate('template.hbs', 'output.ts', { name: 'Feature' });
*
* @public
*/
function createFileFromTemplate(templatePath, outputPath, context) {
	const content = renderTemplateFile(templatePath, context);
	const dir = (0, path.dirname)(outputPath);
	if (!(0, fs.existsSync)(dir)) (0, fs.mkdirSync)(dir, { recursive: true });
	(0, fs.writeFileSync)(outputPath, content, "utf8");
	try {
		(0, fs.chmodSync)(outputPath, (0, fs.statSync)(templatePath).mode & 511);
	} catch (err) {
		logger$3.warn(`Could not preserve file permissions for ${outputPath}: ${err.message}`);
	}
}

//#endregion
//#region src/utils/ensureDir.ts
/**
* Ensures that the specified directory exists. If it does not exist, it will be created recursively.
*
* @param dirPath - The path of the directory to ensure exists
*
* @example
* ensureDir('/path/to/dir');
* // Creates the directory if it does not exist
*
* @public
*/
function ensureDir(path$1) {
	if (!(0, fs.existsSync)(path$1)) (0, fs.mkdirSync)(path$1, { recursive: true });
}

//#endregion
//#region src/utils/getTemplateDir.ts
/**
* Returns the absolute path to the template directory used for scaffolding feature and package modules.
*
* @returns The absolute path to the template directory
*
* @example
* const templateDir = getTemplateDir();
* // Use templateDir to locate scaffolding templates
*
* @public
*/
function getTemplateDir() {
	let currentDir = (0, path.dirname)((0, url.fileURLToPath)(require("url").pathToFileURL(__filename).href));
	while (true) {
		if ((0, fs.existsSync)((0, path.join)(currentDir, "package.json"))) break;
		const parentDir = (0, path.dirname)(currentDir);
		if (parentDir === currentDir) {
			currentDir = "";
			break;
		}
		currentDir = parentDir;
	}
	if (currentDir && (0, fs.existsSync)((0, path.join)(currentDir, "package.json"))) {
		const distTemplates = (0, path.join)(currentDir, "dist", "templates");
		const srcTemplates = (0, path.join)(currentDir, "src", "templates");
		if ((0, fs.existsSync)(distTemplates)) return distTemplates;
		if ((0, fs.existsSync)(srcTemplates)) return srcTemplates;
	}
	return (0, path.join)((0, path.dirname)((0, url.fileURLToPath)(require("url").pathToFileURL(__filename).href)), "..", "templates");
}

//#endregion
//#region src/utils/getWorkspaceInfo.ts
function getWorkspaceInfo() {
	const cwd = process.cwd();
	let currentDir = cwd;
	let thunderRoot = null;
	const fsRoot = (0, path.parse)(cwd).root;
	while (currentDir !== fsRoot && currentDir !== ".") {
		const frontendDir = (0, path.join)(currentDir, "frontend");
		const frontendNxJson = (0, path.join)(frontendDir, "nx.json");
		const frontendPackageJson = (0, path.join)(frontendDir, "package.json");
		if ((0, fs.existsSync)(frontendDir) && (0, fs.existsSync)(frontendNxJson) && (0, fs.existsSync)(frontendPackageJson)) try {
			const parsed = JSON.parse((0, fs.readFileSync)(frontendPackageJson, "utf8"));
			const name = typeof parsed === "object" && parsed !== null && "name" in parsed ? parsed["name"] : void 0;
			if (typeof name === "string" && (name.includes("thunderid") || name.startsWith("@"))) {
				thunderRoot = currentDir;
				break;
			}
		} catch {}
		const packageJsonPath = (0, path.join)(currentDir, "package.json");
		const nxJsonPath = (0, path.join)(currentDir, "nx.json");
		if ((0, fs.existsSync)(packageJsonPath) && (0, fs.existsSync)(nxJsonPath)) try {
			const parsed = JSON.parse((0, fs.readFileSync)(packageJsonPath, "utf8"));
			if ((typeof parsed === "object" && parsed !== null && "name" in parsed ? parsed["name"] : void 0) === "@thunderid/frontend") {
				thunderRoot = (0, path.resolve)(currentDir, "..");
				break;
			}
		} catch {}
		currentDir = (0, path.resolve)(currentDir, "..");
	}
	if (!thunderRoot) return {
		isThunderWorkspace: false,
		frontendPath: null,
		packagePath: null,
		appsPath: null,
		currentWorkingDirectory: cwd
	};
	const frontendPath = (0, path.join)(thunderRoot, "frontend");
	const packagePath = (0, path.join)(frontendPath, "packages");
	const appsPath = (0, path.join)(frontendPath, "apps");
	return {
		isThunderWorkspace: true,
		frontendPath,
		packagePath: (0, fs.existsSync)(packagePath) ? packagePath : null,
		appsPath: (0, fs.existsSync)(appsPath) ? appsPath : null,
		currentWorkingDirectory: cwd
	};
}

//#endregion
//#region src/utils/registerHandlebarsHelpers.ts
/**
* Registers custom Handlebars helpers for use in template rendering.
*
* @example
* registerHandlebarsHelpers();
* // Enables custom helpers for templates
*
* @public
*/
function registerHandlebarsHelpers() {
	function pascalCaseHelper(str) {
		return str.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").split(" ").filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
	}
	handlebars.default.registerHelper("pascalCase", pascalCaseHelper);
	function camelCaseHelper(str) {
		const pascalCase = pascalCaseHelper(str);
		return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
	}
	handlebars.default.registerHelper("camelCase", camelCaseHelper);
	function kebabCaseHelper(str) {
		return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").toLowerCase();
	}
	handlebars.default.registerHelper("kebabCase", kebabCaseHelper);
	function constantCaseHelper(str) {
		return str.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[_-\s]+/g, "_").toUpperCase();
	}
	handlebars.default.registerHelper("constantCase", constantCaseHelper);
	function ifEqHelper(a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	}
	handlebars.default.registerHelper("if_eq", ifEqHelper);
	function ifIncludesHelper(array, item, options) {
		return (Array.isArray(array) ? array : []).some((el) => el === item) ? options.fn(this) : options.inverse(this);
	}
	handlebars.default.registerHelper("if_includes", ifIncludesHelper);
}

//#endregion
//#region src/utils/validateName.ts
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
* Validates a name for feature or package creation, throwing an error if invalid.
*
* @param value - The name to validate
* @param type - The type of entity (e.g., 'Feature', 'Package')
* @throws Error if the name is invalid
*
* @example
* validateName('user-management', 'Feature');
* // Throws if name is not valid
*
* @public
*/
function validateName(name, type = "Feature") {
	if (!name || name.trim().length === 0) throw new Error(`${type} name cannot be empty`);
	const trimmed = name.trim();
	if (!/^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/.test(trimmed) && !/^[a-zA-Z]$/.test(trimmed)) throw new Error(`${type} name must start with a letter, end with a letter or number, and contain only letters, numbers, underscores, and hyphens`);
	if (trimmed.length > 50) throw new Error(`${type} name must be 50 characters or less`);
	if ([
		"index",
		"src",
		"dist",
		"build",
		"node_modules",
		"package",
		"test",
		"__tests__"
	].includes(trimmed.toLowerCase())) throw new Error(`${type} name '${trimmed}' is reserved`);
}

//#endregion
//#region src/commands/createFeature.ts
const logger$2 = (0, __thunderid_logger.createLogger)();
async function createFeature() {
	const workspaceInfo = getWorkspaceInfo();
	if (!workspaceInfo.packagePath) {
		(0, __clack_prompts.cancel)(picocolors.default.red("Missing required folder: frontend/packages. Please create it before running this command."));
		process.exit(1);
	}
	const featureType = await (0, __clack_prompts.select)({
		message: "Feature type:",
		options: [{
			value: "configure",
			label: "Configuration feature (configure-xxx)"
		}, {
			value: "gateway",
			label: "Gateway feature (gateway-xxx)"
		}]
	});
	if (typeof featureType !== "string") {
		(0, __clack_prompts.cancel)(picocolors.default.red("Operation cancelled."));
		process.exit(1);
	}
	const name = await (0, __clack_prompts.text)({
		message: "Feature name:",
		placeholder: "user-management",
		validate: (value) => {
			try {
				validateName(value, "Feature");
				return;
			} catch (error) {
				return error instanceof Error ? error.message : "Invalid feature name";
			}
		}
	});
	if (typeof name !== "string") {
		(0, __clack_prompts.cancel)(picocolors.default.red("Operation cancelled."));
		process.exit(1);
	}
	const featureName = kebabCase_default(name);
	const packageName = `${featureType}-${featureName}`;
	const featureDir = (0, path.join)(workspaceInfo.packagePath, packageName);
	if ((0, fs.existsSync)(featureDir)) {
		(0, __clack_prompts.cancel)(picocolors.default.red(`Feature '${featureName}' already exists at ${featureDir}`));
		process.exit(1);
	}
	const s = (0, __clack_prompts.spinner)();
	s.start(picocolors.default.cyan(`Creating feature ${featureName}...`));
	try {
		registerHandlebarsHelpers();
		const context = {
			featureName,
			packageName,
			featureType
		};
		[
			"src/api",
			"src/components",
			"src/config",
			"src/constants",
			"src/contexts",
			"src/data",
			"src/hooks",
			"src/models",
			"src/pages",
			"src/utils"
		].forEach((dir) => ensureDir((0, path.join)(featureDir, dir)));
		const copyTemplateFiles = (templateDir, targetDir, ctx) => {
			(0, fs.readdirSync)(templateDir, { withFileTypes: true }).forEach((entry) => {
				const templatePath = (0, path.join)(templateDir, entry.name);
				const targetPath = (0, path.join)(targetDir, renderTemplate(entry.name, ctx));
				if (entry.isDirectory()) {
					ensureDir(targetPath);
					copyTemplateFiles(templatePath, targetPath, ctx);
				} else if (entry.isFile() && entry.name.endsWith(".hbs")) createFileFromTemplate(templatePath, (0, path.join)(targetDir, renderTemplate(entry.name.replace(/\.hbs$/, ""), ctx)), ctx);
			});
		};
		copyTemplateFiles((0, path.join)(getTemplateDir(), "feature", "src"), (0, path.join)(featureDir, "src"), context);
		createFileFromTemplate((0, path.join)(getTemplateDir(), "feature", "package.json.hbs"), (0, path.join)(featureDir, "package.json"), context);
		[
			"tsconfig.json",
			"tsconfig.lib.json",
			"tsconfig.spec.json",
			"tsconfig.eslint.json",
			"eslint.config.js",
			"vitest.config.ts",
			"rolldown.config.js",
			"prettier.config.js",
			".editorconfig",
			".gitignore",
			".prettierignore"
		].forEach((file) => createFileFromTemplate((0, path.join)(getTemplateDir(), "feature", `${file}.hbs`), (0, path.join)(featureDir, file), context));
		s.stop(picocolors.default.green(`✅ Feature '${featureName}' created successfully!`));
		logger$2.info(`Feature '${featureName}' created at ${featureDir}`);
		if (await (0, __clack_prompts.select)({
			message: "Would you like to install dependencies and build the feature now?",
			options: [{
				value: true,
				label: "Yes, install and build"
			}, {
				value: false,
				label: "No, I will do it later"
			}]
		}) === true) {
			const installBuildSpinner = (0, __clack_prompts.spinner)();
			installBuildSpinner.start(picocolors.default.cyan("Installing dependencies and building feature..."));
			try {
				const { execSync } = await import("child_process");
				execSync("pnpm install && pnpm build", {
					cwd: featureDir,
					stdio: "inherit"
				});
				installBuildSpinner.stop(picocolors.default.green("✅ Dependencies installed and feature built successfully!"));
			} catch (error) {
				installBuildSpinner.stop(picocolors.default.red("❌ Failed to install dependencies or build"));
				logger$2.error("Install/build failed:", { error: error instanceof Error ? error.message : String(error) });
				console.log();
				console.log(picocolors.default.yellow(`You can manually run: cd ${featureDir} && pnpm install && pnpm build`));
			}
		} else {
			console.log();
			console.log(picocolors.default.cyan("Next steps:"));
			console.log(picocolors.default.gray(`1. cd ${featureDir}`));
			console.log(picocolors.default.gray("2. pnpm install"));
			console.log(picocolors.default.gray("3. pnpm build"));
		}
	} catch (error) {
		s.stop(picocolors.default.red("❌ Failed to create feature"));
		logger$2.error("Feature creation failed:", { error: error instanceof Error ? error.message : String(error) });
		process.exit(1);
	}
}
var createFeature_default = createFeature;

//#endregion
//#region src/commands/createPackage.ts
const logger$1 = (0, __thunderid_logger.createLogger)();
async function createPackage() {
	const workspaceInfo = getWorkspaceInfo();
	const packageType = await (0, __clack_prompts.select)({
		message: "Package type:",
		options: [{
			value: "javascript",
			label: "JavaScript package (like logger)"
		}, {
			value: "react",
			label: "React package (like contexts)"
		}]
	});
	if (typeof packageType !== "string") {
		(0, __clack_prompts.cancel)(picocolors.default.red("Operation cancelled."));
		process.exit(1);
	}
	const name = await (0, __clack_prompts.text)({
		message: "Package name:",
		placeholder: "shared-ui-components",
		validate: (value) => {
			try {
				validateName(value, "Package");
				return;
			} catch (error) {
				return error instanceof Error ? error.message : "Invalid package name";
			}
		}
	});
	if (typeof name !== "string") {
		(0, __clack_prompts.cancel)(picocolors.default.red("Operation cancelled."));
		process.exit(1);
	}
	const packageName = kebabCase_default(name);
	const fullPackageName = `@thunderid/${packageName}`;
	const packageDir = (0, path.join)(workspaceInfo.packagePath, packageName);
	if ((0, fs.existsSync)(packageDir)) {
		(0, __clack_prompts.cancel)(picocolors.default.red(`Package '${packageName}' already exists at ${packageDir}`));
		process.exit(1);
	}
	const s = (0, __clack_prompts.spinner)();
	s.start(picocolors.default.cyan(`Creating package ${packageName}...`));
	try {
		registerHandlebarsHelpers();
		const context = {
			packageName,
			fullPackageName,
			packageType,
			isReactPackage: packageType === "react"
		};
		ensureDir((0, path.join)(packageDir, "src"));
		const templateBase = packageType === "react" ? "package-react" : "package-js";
		createFileFromTemplate((0, path.join)(getTemplateDir(), "package", `${templateBase}`, "package.json.hbs"), (0, path.join)(packageDir, "package.json"), context);
		[
			"tsconfig.json",
			"tsconfig.lib.json",
			"tsconfig.spec.json",
			"tsconfig.eslint.json",
			"eslint.config.js",
			"vitest.config.ts",
			"rolldown.config.js",
			"prettier.config.js",
			".editorconfig",
			".gitignore",
			".prettierignore"
		].forEach((file) => createFileFromTemplate((0, path.join)(getTemplateDir(), "package", `${templateBase}`, `${file}.hbs`), (0, path.join)(packageDir, file), context));
		createFileFromTemplate((0, path.join)(getTemplateDir(), "package", `${templateBase}`, "src", "index.ts.hbs"), (0, path.join)(packageDir, "src", "index.ts"), context);
		createFileFromTemplate((0, path.join)(getTemplateDir(), "package", `${templateBase}`, "README.md.hbs"), (0, path.join)(packageDir, "README.md"), context);
		s.stop(picocolors.default.green(`✅ Package '${packageName}' created successfully!`));
		logger$1.info(`Package '${packageName}' created at ${packageDir}`);
		console.log();
		console.log(picocolors.default.cyan("Next steps:"));
		console.log(picocolors.default.gray("1. Install dependencies: cd to the package directory and run pnpm install"));
		console.log(picocolors.default.gray("2. Start building your package functionality"));
		console.log(picocolors.default.gray("3. Run tests: pnpm test"));
		console.log(picocolors.default.gray("4. Build package: pnpm build"));
	} catch (error) {
		s.stop(picocolors.default.red("❌ Failed to create package"));
		logger$1.error("Package creation failed:", { error: error instanceof Error ? error.message : String(error) });
		process.exit(1);
	}
}
var createPackage_default = createPackage;

//#endregion
//#region src/cli.ts
const logger = (0, __thunderid_logger.createLogger)();
const program = new commander.Command();
async function main() {
	console.clear();
	(0, __clack_prompts.intro)("\n" + [
		picocolors.default.blueBright("████████╗██╗  ██╗██╗   ██╗███╗   ██╗██████╗ ███████╗██████╗ ") + picocolors.default.magentaBright("██╗██████╗"),
		picocolors.default.blueBright("╚══██╔══╝██║  ██║██║   ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗") + picocolors.default.magentaBright("██║██╔══██╗"),
		picocolors.default.blueBright("   ██║   ███████║██║   ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝") + picocolors.default.magentaBright("██║██║  ██║"),
		picocolors.default.cyanBright("   ██║   ██╔══██║██║   ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗") + picocolors.default.magentaBright("██║██║  ██║"),
		picocolors.default.cyanBright("   ██║   ██║  ██║╚██████╔╝██║ ╚████║██████╔╝███████╗██║  ██║") + picocolors.default.magentaBright("██║██████╔╝"),
		picocolors.default.cyanBright("   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝") + picocolors.default.magentaBright("╚═╝╚═════╝")
	].join("\n") + `

          ${picocolors.default.yellow("⚡")} ${picocolors.default.bold(picocolors.default.white("ThunderID"))}${picocolors.default.dim(picocolors.default.gray(" · Frontend Scaffolding Tool"))}\n`);
	const workspaceInfo = getWorkspaceInfo();
	if (!workspaceInfo.isThunderWorkspace) {
		(0, __clack_prompts.cancel)(picocolors.default.red("This command must be run from a project workspace."));
		process.exit(1);
	}
	if (!workspaceInfo.packagePath) {
		(0, __clack_prompts.cancel)(picocolors.default.red("Missing required folder: frontend/packages. Please create it before running this command."));
		process.exit(1);
	}
	if (!workspaceInfo.appsPath) {
		(0, __clack_prompts.cancel)(picocolors.default.red("Missing required folder: frontend/apps. Please create it before running this command."));
		process.exit(1);
	}
	program.name("create").description("CLI scaffolding tool for ⚡ ThunderID frontends").version("0.0.0");
	program.command("feature").description("Create a new feature module").action(createFeature_default);
	program.command("package").description("Create a new shared package").action(createPackage_default);
	await program.parseAsync();
	(0, __clack_prompts.outro)(picocolors.default.green("✅ Done! Happy coding!"));
}
var cli_default = main;
if (require("url").pathToFileURL(__filename).href === `file://${process.argv[1]}`) main().catch((error) => {
	logger.error("CLI execution failed:", { error });
	process.exit(1);
});

//#endregion
Object.defineProperty(exports, 'cli_default', {
  enumerable: true,
  get: function () {
    return cli_default;
  }
});
Object.defineProperty(exports, 'createFeature_default', {
  enumerable: true,
  get: function () {
    return createFeature_default;
  }
});
Object.defineProperty(exports, 'createFileFromTemplate', {
  enumerable: true,
  get: function () {
    return createFileFromTemplate;
  }
});
Object.defineProperty(exports, 'createPackage_default', {
  enumerable: true,
  get: function () {
    return createPackage_default;
  }
});
Object.defineProperty(exports, 'ensureDir', {
  enumerable: true,
  get: function () {
    return ensureDir;
  }
});
Object.defineProperty(exports, 'getTemplateDir', {
  enumerable: true,
  get: function () {
    return getTemplateDir;
  }
});
Object.defineProperty(exports, 'getWorkspaceInfo', {
  enumerable: true,
  get: function () {
    return getWorkspaceInfo;
  }
});
Object.defineProperty(exports, 'registerHandlebarsHelpers', {
  enumerable: true,
  get: function () {
    return registerHandlebarsHelpers;
  }
});
Object.defineProperty(exports, 'renderTemplate', {
  enumerable: true,
  get: function () {
    return renderTemplate;
  }
});
Object.defineProperty(exports, 'renderTemplateFile', {
  enumerable: true,
  get: function () {
    return renderTemplateFile;
  }
});
Object.defineProperty(exports, 'validateName', {
  enumerable: true,
  get: function () {
    return validateName;
  }
});