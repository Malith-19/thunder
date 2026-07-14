import useTranslation_default from "../../hooks/useTranslation.js";
import Button_default from "../primitives/Button/Button.js";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/adapters/MicrosoftButton.tsx
/**
* Microsoft Sign-In Button Component.
* Handles authentication with Microsoft identity provider.
*/
const MicrosoftButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsxs("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 23 23",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ jsx("path", {
					fill: "#f3f3f3",
					d: "M0 0h23v23H0z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#f35325",
					d: "M1 1h10v10H1z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#81bc06",
					d: "M12 1h10v10H12z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#05a6f0",
					d: "M1 12h10v10H1z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#ffba08",
					d: "M12 12h10v10H12z"
				})
			]
		}),
		children: children ?? t("elements.buttons.microsoft.text")
	});
};
var MicrosoftButton_default = MicrosoftButton;

//#endregion
export { MicrosoftButton_default as default };
//# sourceMappingURL=MicrosoftButton.js.map