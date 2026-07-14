//#region src/utils/v2/buildThemeConfigFromFlowMeta.ts
/**
* Converts a v2 `FlowMetaTheme` into a `RecursivePartial<ThemeConfig>` that
* `createTheme` can consume.
*
* Only fields explicitly present in the FlowMeta response are included so that
* `createTheme` can deep-merge them onto its base (light/dark) defaults without
* accidentally dropping sibling keys that were not returned by the server.
*
* For example, when FlowMeta returns only `background.default` and
* `background.paper`, only `body.main` and `surface` are set — the base
* theme's `background.disabled` and `background.dark` are **not** overridden
* and therefore keep their default CSS variable values.
*/
const buildThemeConfigFromFlowMeta = (flowMetaTheme, colorScheme) => {
	const scheme = flowMetaTheme.colorSchemes?.[colorScheme];
	const borderRadius = flowMetaTheme.shape?.borderRadius;
	const borderRadiusStr = borderRadius !== void 0 ? `${borderRadius}px` : void 0;
	let colors;
	if (scheme?.palette) {
		colors = {};
		if (scheme.palette.primary) colors.primary = scheme.palette.primary;
		if (scheme.palette.secondary) colors.secondary = scheme.palette.secondary;
		if (scheme.palette.text) colors.text = scheme.palette.text;
		if (scheme.palette.background) {
			const bg = {};
			if (scheme.palette.background.default) bg.body = { main: scheme.palette.background.default };
			if (scheme.palette.background.paper) bg.surface = scheme.palette.background.paper;
			if (Object.keys(bg).length > 0) colors.background = bg;
		}
	}
	return {
		...flowMetaTheme.direction ? { direction: flowMetaTheme.direction } : {},
		...borderRadiusStr ? { borderRadius: {
			large: borderRadiusStr,
			medium: borderRadiusStr,
			small: borderRadiusStr
		} } : {},
		...colors && Object.keys(colors).length > 0 ? { colors } : {},
		...flowMetaTheme.typography?.fontFamily ? { typography: { fontFamily: flowMetaTheme.typography.fontFamily } } : {}
	};
};
var buildThemeConfigFromFlowMeta_default = buildThemeConfigFromFlowMeta;

//#endregion
export { buildThemeConfigFromFlowMeta_default as default };
//# sourceMappingURL=buildThemeConfigFromFlowMeta.js.map