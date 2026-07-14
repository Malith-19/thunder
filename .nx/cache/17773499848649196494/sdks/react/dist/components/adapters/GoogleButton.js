import useTranslation_default from "../../hooks/useTranslation.js";
import Button_default from "../primitives/Button/Button.js";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/adapters/GoogleButton.tsx
/**
* Google Sign-In Button Component.
* Handles authentication with Google identity provider.
*/
const GoogleButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 67.91 67.901",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsxs("g", {
				transform: "translate(-0.001 -0.001)",
				children: [
					/* @__PURE__ */ jsx("path", {
						d: "M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z",
						transform: "translate(0 -119.93)",
						fill: "#fbbb00"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z",
						transform: "translate(-226.93 -180.567)",
						fill: "#518ef8"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z",
						transform: "translate(-26.463 -268.374)",
						fill: "#28b446"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z",
						transform: "translate(-24.828)",
						fill: "#f14336"
					})
				]
			})
		}),
		children: children ?? t("elements.buttons.google.text")
	});
};
var GoogleButton_default = GoogleButton;

//#endregion
export { GoogleButton_default as default };
//# sourceMappingURL=GoogleButton.js.map