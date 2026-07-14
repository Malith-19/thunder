import useTheme_default from "../../contexts/Theme/useTheme.js";
import Typography_default from "../primitives/Typography/Typography.js";
import Divider_default from "../primitives/Divider/Divider.js";
import ConsentCheckboxList_styles_default from "./ConsentCheckboxList.styles.js";
import Toggle_default from "../primitives/Toggle/Toggle.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/adapters/ConsentCheckboxList.tsx
/**
* Computes the form value key for tracking an optional attribute's consent state.
*
* @param purposeId - The ID of the consent purpose.
* @param attrName - The name of the attribute.
* @returns A stable form key string.
*/
const getConsentOptionalKey = (purposeId, attrName) => `__consent_opt__${purposeId}__${attrName}`;
/**
* Renders a list of consent attribute checkboxes.
*
* - ESSENTIAL variant: renders read-only checked checkboxes for required attributes.
* - OPTIONAL variant: renders toggleable checkboxes for optional attributes.
*   Opt-in is the default when no prior form value exists.
*/
const ConsentCheckboxList = ({ variant, purpose, formValues, onInputChange, children }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = ConsentCheckboxList_styles_default(theme, colorScheme);
	const attributes = (variant === "ESSENTIAL" ? purpose.essential : purpose.optional).map((e) => e.name);
	if (!attributes || attributes.length === 0) return null;
	const isEssential = variant === "ESSENTIAL";
	const isChecked = (attrName) => {
		if (isEssential) return true;
		return formValues[getConsentOptionalKey(purpose.purposeId, attrName)] !== "false";
	};
	const handleChange = (attrName, checked) => {
		onInputChange(getConsentOptionalKey(purpose.purposeId, attrName), checked ? "true" : "false");
	};
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		attributes,
		handleChange,
		isChecked,
		variant
	}) });
	return /* @__PURE__ */ jsx("div", {
		className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list")), styles["listContainer"]),
		children: attributes.map((attr) => {
			const inputId = `consent_${isEssential ? "ess" : "opt"}_${purpose.purposeId}_${attr}`;
			const checked = isChecked(attr);
			return /* @__PURE__ */ jsxs("div", {
				className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "item")), styles["listItem"]),
				children: [/* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "row")), styles["listRow"]),
					children: [/* @__PURE__ */ jsxs("div", {
						className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "label-container")), styles["labelContainer"]),
						children: [/* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "bullet")), styles["bullet"]) }), /* @__PURE__ */ jsx(Typography_default, {
							variant: "body2",
							className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "typography")), styles["typography"]),
							children: attr
						})]
					}), /* @__PURE__ */ jsx(Toggle_default, {
						id: inputId,
						checked,
						disabled: isEssential,
						onChange: isEssential ? void 0 : (e) => handleChange(attr, e.target.checked)
					})]
				}), /* @__PURE__ */ jsx(Divider_default, { className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "divider")), styles["divider"]) })]
			}, attr);
		})
	});
};
var ConsentCheckboxList_default = ConsentCheckboxList;

//#endregion
export { ConsentCheckboxList_default as default, getConsentOptionalKey };
//# sourceMappingURL=ConsentCheckboxList.js.map