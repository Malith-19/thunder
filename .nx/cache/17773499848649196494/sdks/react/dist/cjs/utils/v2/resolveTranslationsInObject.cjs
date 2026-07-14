const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

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
		if (resolved[prop] && typeof resolved[prop] === "string") resolved[prop] = (0, __thunderid_browser.resolveFlowTemplateLiterals)(resolved[prop], {
			meta,
			t
		});
	});
	return resolved;
};

//#endregion
exports.resolveTranslationsInObject = resolveTranslationsInObject;
//# sourceMappingURL=resolveTranslationsInObject.cjs.map