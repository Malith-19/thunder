const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_SignUpOptionFactory = require('../presentation/auth/SignUp/v1/SignUpOptionFactory.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/FormContainer.tsx
/**
* Form container component that renders child components.
*/
const FormContainer = (props) => {
	const { component } = props;
	if (component.components && component.components.length > 0) {
		const handleFormSubmit = (e) => {
			e.preventDefault();
			const submitButton = component.components?.find((child) => child.type === "BUTTON" && (child.variant === "PRIMARY" || child.variant === "SECONDARY" || child.config?.type === "submit"));
			if (submitButton && props.onSubmit) props.onSubmit(submitButton, props.formValues);
		};
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("form", {
			onSubmit: handleFormSubmit,
			style: {
				display: "flex",
				flexDirection: "column"
			},
			children: component.components.map((childComponent) => require_SignUpOptionFactory.createSignUpComponent({
				...props,
				component: childComponent
			}))
		}, component.id);
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {}, component.id);
};
var FormContainer_default = FormContainer;

//#endregion
exports.default = FormContainer_default;
//# sourceMappingURL=FormContainer.cjs.map