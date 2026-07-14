import { useEffect, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { buildLocaleOptions } from "@thunderid/i18n";
import { Autocomplete, Box, Chip, FormControl, FormLabel, Stack, TextField, Typography, useTheme } from "@wso2/oxygen-ui";
import { Lightbulb } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";

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
	const theme = useTheme();
	const { t } = useTranslation("translations");
	const languageOptions = useMemo(() => buildLocaleOptions(selectedCountry.regionCode), [selectedCountry.regionCode]);
	useEffect(() => {
		onReadyChange?.(!!selectedLocale);
	}, [selectedLocale, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.language.title")
			}), /* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.language.subtitle", { country: selectedCountry.name })
			})] }),
			/* @__PURE__ */ jsxs(FormControl, {
				required: true,
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "language-select",
					children: t("language.create.language.label")
				}), /* @__PURE__ */ jsx(Autocomplete, {
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
						return /* @__PURE__ */ jsxs(Box, {
							component: "li",
							...rest,
							sx: {
								display: "flex",
								alignItems: "center",
								gap: 1.5
							},
							children: [
								/* @__PURE__ */ jsx(Typography, {
									sx: {
										fontSize: "1.2rem",
										lineHeight: 1,
										userSelect: "none",
										width: 28,
										textAlign: "center"
									},
									children: opt.flag
								}),
								/* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									sx: { flex: 1 },
									children: opt.displayName
								}),
								/* @__PURE__ */ jsx(Chip, {
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
					renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
						...params,
						placeholder: t("language.create.language.placeholder")
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				children: [/* @__PURE__ */ jsx(Lightbulb, {
					size: 20,
					color: theme.vars?.palette.warning.main
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					children: t("language.create.language.helperText")
				})]
			})
		]
	});
}

//#endregion
export { SelectLanguage as default };