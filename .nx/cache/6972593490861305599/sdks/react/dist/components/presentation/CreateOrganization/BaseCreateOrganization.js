import useTheme_default from "../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import Button_default from "../../primitives/Button/Button.js";
import FormControl_default from "../../primitives/FormControl/FormControl.js";
import InputLabel_default from "../../primitives/InputLabel/InputLabel.js";
import TextField_default from "../../primitives/TextField/TextField.js";
import Alert_default from "../../primitives/Alert/Alert.js";
import Dialog_default from "../../primitives/Dialog/Dialog.js";
import BaseCreateOrganization_styles_default from "./BaseCreateOrganization.styles.js";
import { createPackageComponentLogger } from "@thunderid/browser";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/CreateOrganization/BaseCreateOrganization.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "BaseCreateOrganization");
/**
* Removes special characters except space and hyphen from the organization name
* and generates a valid handle.
* @param name
* @returns
*/
const generateHandleFromName = (name) => name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
/**
* BaseCreateOrganization component provides the core functionality for creating organizations.
* This component serves as the base for framework-specific implementations.
*/
const BaseCreateOrganization = ({ cardLayout = true, className = "", defaultParentId = "", error, initialValues = {}, loading = false, mode = "inline", onCancel, onOpenChange, onSubmit, onSuccess, open = false, preferences, renderAdditionalFields, style, title = "Create Organization" }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseCreateOrganization_styles_default(theme, colorScheme);
	const { t } = useTranslation_default(preferences?.i18n);
	const [formData, setFormData] = useState({
		description: "",
		handle: "",
		name: "",
		...initialValues
	});
	const [formErrors, setFormErrors] = useState({});
	const validateForm = () => {
		const errors = {};
		if (!formData.name.trim()) errors.name = "Organization name is required";
		if (!formData.handle.trim()) errors.handle = "Organization handle is required";
		else if (!/^[a-z0-9-]+$/.test(formData.handle)) errors.handle = "Handle can only contain lowercase letters, numbers, and hyphens";
		if (!formData.description.trim()) errors.description = "Organization description is required";
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
		if (formErrors[field]) setFormErrors((prev) => ({
			...prev,
			[field]: void 0
		}));
	};
	/**
	* Handles changes to the organization name input.
	* Automatically generates the organization handle based on the name if the handle is not set or matches
	*
	* @param value - The new value for the organization name.
	*/
	const handleNameChange = (value) => {
		handleInputChange("name", value);
		if (!formData.handle || formData.handle === generateHandleFromName(formData.name)) handleInputChange("handle", generateHandleFromName(value));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm() || loading) return;
		const payload = {
			description: formData.description.trim(),
			name: formData.name.trim(),
			orgHandle: formData.handle.trim(),
			parentId: defaultParentId,
			type: "TENANT"
		};
		try {
			await onSubmit?.(payload);
			if (onSuccess) onSuccess(payload);
		} catch (submitError) {
			logger$1.error("Form submission error:");
		}
	};
	const createOrganizationContent = /* @__PURE__ */ jsx("div", {
		className: cx(styles["root"], cardLayout && styles["card"], className),
		style,
		children: /* @__PURE__ */ jsxs("div", {
			className: cx(styles["content"]),
			children: [/* @__PURE__ */ jsxs("form", {
				id: "create-organization-form",
				className: cx(styles["form"]),
				onSubmit: handleSubmit,
				children: [
					error && /* @__PURE__ */ jsxs(Alert_default, {
						variant: "error",
						className: styles["errorAlert"],
						children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
					}),
					/* @__PURE__ */ jsx("div", {
						className: cx(styles["fieldGroup"]),
						children: /* @__PURE__ */ jsx(TextField_default, {
							label: `${t("elements.fields.organization.name.label")}`,
							placeholder: t("elements.fields.organization.name.placeholder"),
							value: formData.name,
							onChange: (e) => handleNameChange(e.target.value),
							disabled: loading,
							required: true,
							error: formErrors.name,
							className: cx(styles["input"])
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: cx(styles["fieldGroup"]),
						children: /* @__PURE__ */ jsx(TextField_default, {
							label: `${t("elements.fields.organization.handle.label") || "Organization Handle"}`,
							placeholder: t("elements.fields.organization.handle.placeholder") || "my-organization",
							value: formData.handle,
							onChange: (e) => handleInputChange("handle", e.target.value),
							disabled: loading,
							required: true,
							error: formErrors.handle,
							helperText: "This will be your organization's unique identifier. Only lowercase letters, numbers, and hyphens are allowed.",
							className: cx(styles["input"])
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: cx(styles["fieldGroup"]),
						children: /* @__PURE__ */ jsxs(FormControl_default, {
							error: formErrors.description,
							children: [/* @__PURE__ */ jsx(InputLabel_default, {
								required: true,
								children: t("elements.fields.organization.description.label")
							}), /* @__PURE__ */ jsx("textarea", {
								className: cx(styles["textarea"], formErrors.description && styles["textareaError"]),
								placeholder: t("organization.create.description.placeholder"),
								value: formData.description,
								onChange: (e) => handleInputChange("description", e.target.value),
								disabled: loading,
								required: true
							})]
						})
					}),
					renderAdditionalFields?.()
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: cx(styles["actions"]),
				children: [onCancel && /* @__PURE__ */ jsx(Button_default, {
					type: "button",
					variant: "outline",
					onClick: onCancel,
					disabled: loading,
					children: t("organization.create.buttons.cancel.text")
				}), /* @__PURE__ */ jsx(Button_default, {
					type: "submit",
					variant: "solid",
					color: "primary",
					disabled: loading,
					form: "create-organization-form",
					children: loading ? t("organization.create.buttons.create_organization.loading.text") : t("organization.create.buttons.create_organization.text")
				})]
			})]
		})
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
			className: styles["popup"],
			children: createOrganizationContent
		})] })
	});
	return createOrganizationContent;
};

//#endregion
export { BaseCreateOrganization };
//# sourceMappingURL=BaseCreateOrganization.js.map