
//#region src/utils/applyThemeToDOM.ts
/**
* Writes all CSS custom properties from a resolved `Theme` onto the document root.
* Called inside a `useEffect` whenever the active theme changes.
*/
const applyThemeToDOM = (theme) => {
	Object.entries(theme.cssVariables).forEach(([key, value]) => {
		document.documentElement.style.setProperty(key, value);
	});
};
var applyThemeToDOM_default = applyThemeToDOM;

//#endregion
exports.default = applyThemeToDOM_default;
//# sourceMappingURL=applyThemeToDOM.cjs.map