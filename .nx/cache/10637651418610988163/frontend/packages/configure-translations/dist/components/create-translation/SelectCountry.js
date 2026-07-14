import { useEffect, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { buildCountryOptions } from "@thunderid/i18n";
import { Autocomplete, Box, Chip, FormControl, FormLabel, Stack, TextField, Typography, useTheme } from "@wso2/oxygen-ui";
import { Lightbulb } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";

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
	const theme = useTheme();
	const { t } = useTranslation("translations");
	const countryOptions = useMemo(() => buildCountryOptions(), []);
	useEffect(() => {
		onReadyChange?.(!!selectedCountry);
	}, [selectedCountry, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.country.title")
			}), /* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.country.subtitle")
			})] }),
			/* @__PURE__ */ jsxs(FormControl, {
				required: true,
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "country-select",
					children: t("language.create.countryLabel")
				}), /* @__PURE__ */ jsx(Autocomplete, {
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
									children: opt.name
								}),
								/* @__PURE__ */ jsx(Chip, {
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
					renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
						placeholder: t("language.create.country.placeholder"),
						...params
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
					children: t("language.create.country.helperText")
				})]
			})
		]
	});
}

//#endregion
export { SelectCountry as default };