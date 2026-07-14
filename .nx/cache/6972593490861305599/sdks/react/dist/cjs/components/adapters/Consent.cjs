const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_Typography = require('../primitives/Typography/Typography.cjs');
const require_ConsentCheckboxList = require('./ConsentCheckboxList.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/Consent.tsx
/**
* Consent component renders the list of purposes and their associated attributes (essential and optional)
* based on the data provided by the backend. It allows users to toggle optional attributes while essential
* attributes are displayed as read-only.
*/
const Consent = ({ consentData, formValues, onInputChange, children }) => {
	if (!consentData) return null;
	let purposes = [];
	try {
		const parsed = typeof consentData === "string" ? JSON.parse(consentData) : consentData;
		purposes = Array.isArray(parsed) ? parsed : parsed.purposes || [];
	} catch (e) {
		return null;
	}
	if (purposes.length === 0) return null;
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children({
		formValues,
		onInputChange,
		purposes
	}) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
			marginTop: "0.25rem"
		},
		children: purposes.map((purpose, purposeIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			style: { paddingBottom: "1rem" },
			children: [purpose.essential && purpose.essential.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: { marginTop: "0.5rem" },
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
					variant: "subtitle2",
					fontWeight: "bold",
					children: "Essential Attributes"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConsentCheckboxList.default, {
					variant: "ESSENTIAL",
					purpose,
					formValues,
					onInputChange
				})]
			}), purpose.optional && purpose.optional.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				style: { marginTop: "0.5rem" },
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
					variant: "subtitle2",
					fontWeight: "bold",
					children: purpose.type === "permissions" ? "Permissions" : "Optional Attributes"
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConsentCheckboxList.default, {
					variant: "OPTIONAL",
					purpose,
					formValues,
					onInputChange
				})]
			})]
		}, purpose.purposeId || purposeIndex))
	});
};
var Consent_default = Consent;

//#endregion
exports.default = Consent_default;
//# sourceMappingURL=Consent.cjs.map