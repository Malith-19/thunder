const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_Spinner = require('../primitives/Spinner/Spinner.cjs');
const require_Button = require('../primitives/Button/Button.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/SubmitButton.tsx
/**
* Button component for sign-up forms that handles all button variants.
*/
const ButtonComponent = ({ component, isLoading, isFormValid, buttonClassName, onSubmit, size = "medium" }) => {
	const config = component.config || {};
	const buttonText = config["text"] || config["label"] || "Continue";
	const buttonType = config["type"] || "submit";
	const componentVariant = component.variant?.toUpperCase() || "PRIMARY";
	const getButtonProps = () => {
		switch (componentVariant) {
			case "PRIMARY": return {
				color: "primary",
				variant: "solid"
			};
			case "SECONDARY": return {
				color: "secondary",
				variant: "solid"
			};
			case "TEXT": return {
				color: "primary",
				variant: "text"
			};
			case "SOCIAL":
			case "OUTLINED": return {
				color: "primary",
				variant: "outline"
			};
			default: return {
				color: "primary",
				variant: "solid"
			};
		}
	};
	const { variant, color } = getButtonProps();
	const handleClick = () => {
		if (onSubmit && buttonType !== "submit") onSubmit(component);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		type: buttonType === "submit" ? "submit" : "button",
		variant,
		color,
		size,
		disabled: isLoading || buttonType === "submit" && !isFormValid,
		onClick: buttonType !== "submit" ? handleClick : void 0,
		className: buttonClassName,
		style: { width: "100%" },
		children: isLoading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, { size: "small" }) : buttonText
	}, component.id);
};
var SubmitButton_default = ButtonComponent;

//#endregion
exports.default = SubmitButton_default;
//# sourceMappingURL=SubmitButton.cjs.map