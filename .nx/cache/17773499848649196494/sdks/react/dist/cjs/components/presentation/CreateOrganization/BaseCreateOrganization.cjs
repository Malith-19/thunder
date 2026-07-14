const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_Button = require('../../primitives/Button/Button.cjs');
const require_FormControl = require('../../primitives/FormControl/FormControl.cjs');
const require_InputLabel = require('../../primitives/InputLabel/InputLabel.cjs');
const require_TextField = require('../../primitives/TextField/TextField.cjs');
const require_Alert = require('../../primitives/Alert/Alert.cjs');
const require_Dialog = require('../../primitives/Dialog/Dialog.cjs');
const require_BaseCreateOrganization_styles = require('./BaseCreateOrganization.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/CreateOrganization/BaseCreateOrganization.tsx
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "BaseCreateOrganization");
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
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseCreateOrganization_styles.default(theme, colorScheme);
	const { t } = require_useTranslation.default(preferences?.i18n);
	const [formData, setFormData] = (0, react.useState)({
		description: "",
		handle: "",
		name: "",
		...initialValues
	});
	const [formErrors, setFormErrors] = (0, react.useState)({});
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
			logger.error("Form submission error:");
		}
	};
	const createOrganizationContent = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)(styles["root"], cardLayout && styles["card"], className),
		style,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, __emotion_css.cx)(styles["content"]),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
				id: "create-organization-form",
				className: (0, __emotion_css.cx)(styles["form"]),
				onSubmit: handleSubmit,
				children: [
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Alert.default, {
						variant: "error",
						className: styles["errorAlert"],
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Title, { children: "Error" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: error })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, __emotion_css.cx)(styles["fieldGroup"]),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
							label: `${t("elements.fields.organization.name.label")}`,
							placeholder: t("elements.fields.organization.name.placeholder"),
							value: formData.name,
							onChange: (e) => handleNameChange(e.target.value),
							disabled: loading,
							required: true,
							error: formErrors.name,
							className: (0, __emotion_css.cx)(styles["input"])
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, __emotion_css.cx)(styles["fieldGroup"]),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
							label: `${t("elements.fields.organization.handle.label") || "Organization Handle"}`,
							placeholder: t("elements.fields.organization.handle.placeholder") || "my-organization",
							value: formData.handle,
							onChange: (e) => handleInputChange("handle", e.target.value),
							disabled: loading,
							required: true,
							error: formErrors.handle,
							helperText: "This will be your organization's unique identifier. Only lowercase letters, numbers, and hyphens are allowed.",
							className: (0, __emotion_css.cx)(styles["input"])
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, __emotion_css.cx)(styles["fieldGroup"]),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_FormControl.default, {
							error: formErrors.description,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
								required: true,
								children: t("elements.fields.organization.description.label")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
								className: (0, __emotion_css.cx)(styles["textarea"], formErrors.description && styles["textareaError"]),
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
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, __emotion_css.cx)(styles["actions"]),
				children: [onCancel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
					type: "button",
					variant: "outline",
					onClick: onCancel,
					disabled: loading,
					children: t("organization.create.buttons.cancel.text")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
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
	if (mode === "popup") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Dialog.default.Content, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default.Heading, { children: title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: styles["popup"],
			children: createOrganizationContent
		})] })
	});
	return createOrganizationContent;
};

//#endregion
exports.BaseCreateOrganization = BaseCreateOrganization;
//# sourceMappingURL=BaseCreateOrganization.cjs.map