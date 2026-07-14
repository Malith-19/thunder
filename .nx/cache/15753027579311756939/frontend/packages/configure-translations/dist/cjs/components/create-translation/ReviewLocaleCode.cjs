const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_i18n = require("@thunderid/i18n");
__thunderid_i18n = require_rolldown_runtime.__toESM(__thunderid_i18n);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/components/create-translation/ReviewLocaleCode.tsx
/**
* Step component in the language creation wizard that allows the user to review
* and optionally override the BCP 47 locale code derived from the country and
* language selections.
*
* Shows a preview of the flag emoji and resolved display name for the effective
* locale code, along with a helper tip about the BCP 47 format.
*
* @param props - The component props
* @param props.derivedLocale - Locale derived from the previous wizard steps, used as the default
* @param props.localeCode - Current user-entered override value (controlled)
* @param props.onLocaleCodeChange - Callback invoked when the locale code input changes
* @param props.onReadyChange - Callback invoked when step readiness changes
*
* @returns JSX element rendering the locale code review step
*
* @example
* ```tsx
* import ReviewLocaleCode from './ReviewLocaleCode';
*
* function Wizard() {
*   const [code, setCode] = useState('');
*   return (
*     <ReviewLocaleCode
*       derivedLocale={{code: 'fr-FR', displayName: 'French (France)', flag: '🇫🇷'}}
*       localeCode={code}
*       onLocaleCodeChange={setCode}
*       onReadyChange={(ready) => setStepReady(ready)}
*     />
*   );
* }
* ```
*
* @public
*/
function ReviewLocaleCode({ derivedLocale, localeCode, onLocaleCodeChange, onReadyChange = void 0 }) {
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const { t } = (0, react_i18next.useTranslation)("translations");
	const effectiveCode = localeCode.trim() || derivedLocale.code;
	const isLocaleCodeValid = /^[A-Za-z]{2,3}(?:-[A-Za-z]{4})?(?:-(?:[A-Za-z]{2}|\d{3}))?$/.test(effectiveCode);
	const resolvedName = (0, react.useMemo)(() => (0, __thunderid_i18n.getDisplayNameForCode)(effectiveCode), [effectiveCode]);
	const previewFlag = (0, __thunderid_i18n.toFlagEmoji)(effectiveCode.split("-")[1]?.toUpperCase() ?? "");
	(0, react.useEffect)(() => {
		onReadyChange?.(isLocaleCodeValid);
	}, [isLocaleCodeValid, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.localeCode.title")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.localeCode.subtitle")
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				required: true,
				fullWidth: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "locale-code-input",
					children: t("language.add.code.label")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					id: "locale-code-input",
					placeholder: derivedLocale.code,
					value: localeCode,
					onChange: (e) => onLocaleCodeChange(e.target.value),
					fullWidth: true
				})]
			}), effectiveCode && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				sx: { mt: 1.5 },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						sx: {
							fontSize: "1.1rem",
							lineHeight: 1
						},
						children: previewFlag
					}),
					resolvedName && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						children: resolvedName
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						label: effectiveCode,
						size: "small",
						variant: "outlined",
						sx: {
							fontFamily: "monospace",
							fontSize: "0.7rem"
						}
					})
				]
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Lightbulb, {
					size: 20,
					color: theme.vars?.palette.warning.main
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					color: "text.secondary",
					children: t("language.add.code.helperText")
				})]
			})
		]
	});
}

//#endregion
exports.default = ReviewLocaleCode;