
//#region src/utils/normalizeThemeConfig.ts
/**
* Normalizes a single color value that may have been supplied as a shorthand
* CSS color string (`'#2563eb'`) instead of the expected object form
* (`{ main: '#2563eb' }`).
*
* This makes the `preferences.theme.overrides.colors.*` API forgiving for
* JavaScript callers who don't have TypeScript's type-checker to catch the
* mismatch at compile time.
*/
const normalizeColorValue = (color) => typeof color === "string" ? { main: color } : color;
/**
* Normalizes a `RecursivePartial<ThemeConfig>` so that color fields which are
* supplied as plain CSS color strings are coerced into `{ main: string }`
* objects before being handed to `createTheme`.
*
* Only the color groups that `toCssVariables` in `createTheme` actually reads
* individual sub-keys from are normalized here (`primary`, `secondary`,
* `error`, `success`, `warning`, `info`).  `border` is left alone because it
* IS a plain string in `ThemeConfig`.
*/
const normalizeThemeConfig = (config) => {
	if (!config?.colors) return config;
	const { primary, secondary, error, success, warning, info,...restColors } = config.colors;
	return {
		...config,
		colors: {
			...restColors,
			...primary !== void 0 ? { primary: normalizeColorValue(primary) } : {},
			...secondary !== void 0 ? { secondary: normalizeColorValue(secondary) } : {},
			...error !== void 0 ? { error: normalizeColorValue(error) } : {},
			...success !== void 0 ? { success: normalizeColorValue(success) } : {},
			...warning !== void 0 ? { warning: normalizeColorValue(warning) } : {},
			...info !== void 0 ? { info: normalizeColorValue(info) } : {}
		}
	};
};
var normalizeThemeConfig_default = normalizeThemeConfig;

//#endregion
exports.default = normalizeThemeConfig_default;
//# sourceMappingURL=normalizeThemeConfig.cjs.map