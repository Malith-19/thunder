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

//#region src/components/create-translation/SelectCountry.tsx
/**
* First step in the language creation wizard where the user selects the country
* associated with the new language.
*
* Renders a searchable autocomplete populated with all available country options.
* Each option shows the country flag, name, and ISO region code. A helper tip
* below explains how the country selection influences the generated locale code.
*
* @param props - The component props
* @param props.selectedCountry - Currently selected country option
* @param props.onCountryChange - Callback invoked when the country selection changes
* @param props.onReadyChange - Callback invoked when step readiness changes
*
* @returns JSX element rendering the country selection step
*
* @example
* ```tsx
* import SelectCountry from './SelectCountry';
*
* function Wizard() {
*   const [country, setCountry] = useState<CountryOption | null>(null);
*   return (
*     <SelectCountry
*       selectedCountry={country}
*       onCountryChange={setCountry}
*       onReadyChange={(ready) => setStepReady(ready)}
*     />
*   );
* }
* ```
*
* @public
*/
function SelectCountry({ selectedCountry, onCountryChange, onReadyChange = void 0 }) {
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const { t } = (0, react_i18next.useTranslation)("translations");
	const countryOptions = (0, react.useMemo)(() => (0, __thunderid_i18n.buildCountryOptions)(), []);
	(0, react.useEffect)(() => {
		onReadyChange?.(!!selectedCountry);
	}, [selectedCountry, onReadyChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.country.title")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.country.subtitle")
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				required: true,
				fullWidth: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: "country-select",
					children: t("language.create.countryLabel")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Autocomplete, {
					id: "country-select",
					options: countryOptions,
					value: selectedCountry,
					onChange: (_, v) => onCountryChange(v),
					getOptionLabel: (opt) => opt.name,
					filterOptions: (opts, state) => {
						const input = state.inputValue.toLowerCase();
						return opts.filter((opt) => opt.name.toLowerCase().includes(input) || opt.regionCode.toLowerCase().includes(input));
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
									children: opt.name
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
									label: opt.regionCode,
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
						placeholder: t("language.create.country.placeholder"),
						...params
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
					children: t("language.create.country.helperText")
				})]
			})
		]
	});
}

//#endregion
exports.default = SelectCountry;