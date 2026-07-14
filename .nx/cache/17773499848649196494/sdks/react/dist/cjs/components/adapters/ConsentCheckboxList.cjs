const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../contexts/Theme/useTheme.cjs');
const require_Typography = require('../primitives/Typography/Typography.cjs');
const require_Divider = require('../primitives/Divider/Divider.cjs');
const require_ConsentCheckboxList_styles = require('./ConsentCheckboxList.styles.cjs');
const require_Toggle = require('../primitives/Toggle/Toggle.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

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
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_ConsentCheckboxList_styles.default(theme, colorScheme);
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
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children({
		attributes,
		handleChange,
		isChecked,
		variant
	}) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("consent-checkbox-list")), styles["listContainer"]),
		children: attributes.map((attr) => {
			const inputId = `consent_${isEssential ? "ess" : "opt"}_${purpose.purposeId}_${attr}`;
			const checked = isChecked(attr);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("consent-checkbox-list", "item")), styles["listItem"]),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("consent-checkbox-list", "row")), styles["listRow"]),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("consent-checkbox-list", "label-container")), styles["labelContainer"]),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("consent-checkbox-list", "bullet")), styles["bullet"]) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
							variant: "body2",
							className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("consent-checkbox-list", "typography")), styles["typography"]),
							children: attr
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Toggle.default, {
						id: inputId,
						checked,
						disabled: isEssential,
						onChange: isEssential ? void 0 : (e) => handleChange(attr, e.target.checked)
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Divider.default, { className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("consent-checkbox-list", "divider")), styles["divider"]) })]
			}, attr);
		})
	});
};
var ConsentCheckboxList_default = ConsentCheckboxList;

//#endregion
exports.default = ConsentCheckboxList_default;
exports.getConsentOptionalKey = getConsentOptionalKey;
//# sourceMappingURL=ConsentCheckboxList.cjs.map