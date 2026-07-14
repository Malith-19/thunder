import { jsx, jsxs } from "react/jsx-runtime";
import { Autocomplete, Box, FormControl, FormHelperText, FormLabel, TextField } from "@wso2/oxygen-ui";
import { useTranslation } from "react-i18next";

//#region src/components/edit-translation/NamespaceSelector.tsx
/**
* Autocomplete control for selecting a translation namespace.
*
* Formats camelCase namespace keys into human-readable labels and shows a
* helper text below the input.
*
* @param props - The component props
*
* @returns JSX element rendering the namespace selector
*
* @public
*/
function NamespaceSelector({ namespaces, value, loading, onChange }) {
	const { t } = useTranslation("translations");
	return /* @__PURE__ */ jsx(Box, {
		sx: {
			display: "flex",
			gap: 2,
			alignItems: "center",
			mb: 2
		},
		children: /* @__PURE__ */ jsxs(FormControl, {
			sx: { maxWidth: 600 },
			children: [
				/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "namespace-selector",
					children: t("editor.namespace")
				}),
				/* @__PURE__ */ jsx(Autocomplete, {
					id: "namespace-selector",
					options: namespaces,
					value: value ?? "",
					onChange: (_, v) => v && onChange(v),
					disableClearable: true,
					size: "small",
					loading,
					renderInput: (params) => /* @__PURE__ */ jsx(TextField, { ...params }),
					getOptionLabel: (opt) => opt.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()).trim()
				}),
				/* @__PURE__ */ jsx(FormHelperText, { children: t("editor.namespace.helperText") })
			]
		})
	});
}

//#endregion
export { NamespaceSelector as default };