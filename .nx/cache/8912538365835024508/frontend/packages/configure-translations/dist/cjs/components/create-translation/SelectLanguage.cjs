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

//#region src/components/create-translation/SelectLanguage.tsx
/**
* Second step in the language creation wizard where the user selects the specific
* language variant spoken in the previously chosen country.
*
* Locale options are derived from the selected country's region code. Each option
* displays the language flag, display name, and BCP 47 code. A helper tip explains
* how the language selection contributes to the final locale code.
*
* @param props - The component props
* @param props.selectedCountry - Country chosen in the preceding wizard step
* @param props.selectedLocale - Currently selected locale option
* @param props.onLocaleChange - Callback invoked when the locale selection changes
* @param props.onReadyChange - Callback invoked when step readiness changes
*
* @returns JSX element rendering the language selection step
*
* @example
* ```tsx
* import SelectLanguage from './SelectLanguage';
*
* function Wizard() {
*   const [locale, setLocale] = useState<LocaleOption | null>(null);
*   return (
*     <SelectLanguage
*       selectedCountry={{name: 'France', regionCode: 'FR', flag: '🇫🇷'}}
*       selectedLocale={locale}
*       onLocaleChange={setLocale}
*       onReadyChange={(ready) => setStepReady(ready)}
*     />
*   );
* }
* ```
*
* @public
*/
function SelectLanguage({ selectedCountry, selectedLocale, onLocaleChange, onReadyChange = void 0 }) {
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const { t } = (0, react_i18next.useTranslation)("translations");
	const languageOptions = (0, react.useMemo)(() => (0, __thunderid_i18n.buildLocaleOptions)(selectedCountry.regionCode), [selectedCountry.regionCode]);
	(0, react.useEffect)(() => {
		onReadyChange?.(!!selectedLocale);
	}, [selectedLocale, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.language.title")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.language.subtitle", { country: selectedCountry.name })
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				required: true,
				fullWidth: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "language-select",
					children: t("language.create.language.label")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Autocomplete, {
					id: "language-select",
					options: languageOptions,
					value: selectedLocale,
					onChange: (_, v) => onLocaleChange(v),
					getOptionLabel: (opt) => opt.displayName,
					filterOptions: (opts, state) => {
						const input = state.inputValue.toLowerCase();
						return opts.filter((opt) => opt.code.toLowerCase().includes(input) || opt.displayName.toLowerCase().includes(input));
					},
					renderOption: (props, opt) => {
						const { key,...rest } = props;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
							component: "li",
							...rest,
							sx: {
								display: "flex",
								alignItems: "center",
								gap: 1.5
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									sx: {
										fontSize: "1.2rem",
										lineHeight: 1,
										userSelect: "none",
										width: 28,
										textAlign: "center"
									},
									children: opt.flag
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "body2",
									sx: { flex: 1 },
									children: opt.displayName
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
									label: opt.code,
									size: "small",
									variant: "outlined",
									sx: {
										fontFamily: "monospace",
										fontSize: "0.7rem"
									}
								})
							]
						}, String(key));
					},
					renderInput: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
						...params,
						placeholder: t("language.create.language.placeholder")
					})
				})]
			}),
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
					children: t("language.create.language.helperText")
				})]
			})
		]
	});
}

//#endregion
exports.default = SelectLanguage;