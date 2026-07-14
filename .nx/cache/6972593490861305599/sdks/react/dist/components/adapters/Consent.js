import Typography_default from "../primitives/Typography/Typography.js";
import ConsentCheckboxList_default from "./ConsentCheckboxList.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

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
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		formValues,
		onInputChange,
		purposes
	}) });
	return /* @__PURE__ */ jsx("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
			marginTop: "0.25rem"
		},
		children: purposes.map((purpose, purposeIndex) => /* @__PURE__ */ jsxs("div", {
			style: { paddingBottom: "1rem" },
			children: [purpose.essential && purpose.essential.length > 0 && /* @__PURE__ */ jsxs("div", {
				style: { marginTop: "0.5rem" },
				children: [/* @__PURE__ */ jsx(Typography_default, {
					variant: "subtitle2",
					fontWeight: "bold",
					children: "Essential Attributes"
				}), /* @__PURE__ */ jsx(ConsentCheckboxList_default, {
					variant: "ESSENTIAL",
					purpose,
					formValues,
					onInputChange
				})]
			}), purpose.optional && purpose.optional.length > 0 && /* @__PURE__ */ jsxs("div", {
				style: { marginTop: "0.5rem" },
				children: [/* @__PURE__ */ jsx(Typography_default, {
					variant: "subtitle2",
					fontWeight: "bold",
					children: purpose.type === "permissions" ? "Permissions" : "Optional Attributes"
				}), /* @__PURE__ */ jsx(ConsentCheckboxList_default, {
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
export { Consent_default as default };
//# sourceMappingURL=Consent.js.map