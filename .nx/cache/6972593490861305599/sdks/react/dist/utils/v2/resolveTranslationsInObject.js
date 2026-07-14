import { resolveFlowTemplateLiterals } from "@thunderid/browser";

//#region src/utils/v2/resolveTranslationsInObject.ts
/**
* Resolves all {{ t() }} and {{ meta() }} template expressions in an object's string properties.
* @param obj - The object to process
* @param t - The translation function from useTranslation
* @param properties - Array of property names to resolve (optional, defaults to common properties)
* @param meta - Optional flow metadata for resolving meta() expressions
* @returns A new object with resolved template strings
*/
const resolveTranslationsInObject = (obj, t, properties = [
	"label",
	"placeholder",
	"text",
	"title",
	"subtitle"
], meta) => {
	const resolved = { ...obj };
	properties.forEach((prop) => {
		if (resolved[prop] && typeof resolved[prop] === "string") resolved[prop] = resolveFlowTemplateLiterals(resolved[prop], {
			meta,
			t
		});
	});
	return resolved;
};

//#endregion
export { resolveTranslationsInObject };
//# sourceMappingURL=resolveTranslationsInObject.js.map