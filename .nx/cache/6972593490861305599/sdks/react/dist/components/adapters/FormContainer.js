import { createSignUpComponent } from "../presentation/auth/SignUp/v1/SignUpOptionFactory.js";
import { jsx } from "react/jsx-runtime";

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
		return /* @__PURE__ */ jsx("form", {
			onSubmit: handleFormSubmit,
			style: {
				display: "flex",
				flexDirection: "column"
			},
			children: component.components.map((childComponent) => createSignUpComponent({
				...props,
				component: childComponent
			}))
		}, component.id);
	}
	return /* @__PURE__ */ jsx("div", {}, component.id);
};
var FormContainer_default = FormContainer;

//#endregion
export { FormContainer_default as default };
//# sourceMappingURL=FormContainer.js.map