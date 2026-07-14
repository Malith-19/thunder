import { resolveTranslationsInObject } from "./resolveTranslationsInObject.js";

//#region src/utils/v2/resolveTranslationsInArray.ts
/**
* Recursively resolves translation and meta template strings in an array of objects.
* @param items - Array of objects to process
* @param t - The translation function from useTranslation
* @param properties - Array of property names to resolve (optional)
* @param meta - Optional flow metadata for resolving meta() expressions
* @returns A new array with resolved translations
*/
const resolveTranslationsInArray = (items, t, properties, meta) => items.map((item) => {
	const resolved = resolveTranslationsInObject(item, t, properties, meta);
	if (resolved["components"] && Array.isArray(resolved["components"])) resolved.components = resolveTranslationsInArray(resolved["components"], t, properties, meta);
	return resolved;
});
var resolveTranslationsInArray_default = resolveTranslationsInArray;

//#endregion
export { resolveTranslationsInArray_default as default };
//# sourceMappingURL=resolveTranslationsInArray.js.map