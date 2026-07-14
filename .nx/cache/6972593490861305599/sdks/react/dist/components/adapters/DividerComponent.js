import useTheme_default from "../../contexts/Theme/useTheme.js";
import Divider_default from "../primitives/Divider/Divider.js";
import { jsx } from "react/jsx-runtime";

//#region src/components/adapters/DividerComponent.tsx
/**
* Divider component for sign-up forms.
*/
const DividerComponent = ({ component }) => {
	const { theme } = useTheme_default();
	const text = (component.config || {})["text"] || "";
	return /* @__PURE__ */ jsx(Divider_default, {
		orientation: (component.variant?.toLowerCase() || "horizontal") === "vertical" ? "vertical" : "horizontal",
		style: { margin: `calc(${theme.vars.spacing.unit} * 2) 0` },
		children: text
	}, component.id);
};
var DividerComponent_default = DividerComponent;

//#endregion
export { DividerComponent_default as default };
//# sourceMappingURL=DividerComponent.js.map