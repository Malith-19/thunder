const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Button = require('../../primitives/Button/Button.cjs');
const require_TextField = require('../../primitives/TextField/TextField.cjs');
const require_Card = require('../../primitives/Card/Card.cjs');
const require_Avatar = require('../../primitives/Avatar/Avatar.cjs');
const require_Dialog = require('../../primitives/Dialog/Dialog.cjs');
const require_BaseOrganizationProfile_styles = require('./BaseOrganizationProfile.styles.cjs');
const require_KeyValueInput = require('../../primitives/KeyValueInput/KeyValueInput.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/OrganizationProfile/BaseOrganizationProfile.tsx
/**
* BaseOrganizationProfile component displays organization information in a
* structured and styled format. It shows organization details such as name,
* description, status, and other available information with support for inline editing.
*
* This is the base component that can be used in any context where you have
* an organization object available. It provides editing capabilities similar to
* the UserProfile component, allowing users to modify organization fields directly.
*
* @example
* ```tsx
* // Basic usage
* <BaseOrganizationProfile organization={organizationData} />
*
* // With editing enabled and update handler
* <BaseOrganizationProfile
*   organization={organizationData}
*   editable={true}
*   onUpdate={async (payload) => {
*     await updateOrganizationAPI(orgId, payload);
*   }}
* />
*
* // With card layout and custom title
* <BaseOrganizationProfile
*   organization={organizationData}
*   cardLayout={true}
*   title="Organization Details"
*   fallback={<div>No organization data available</div>}
* />
*
* // With custom fields configuration
* <BaseOrganizationProfile
*   organization={organizationData}
*   fields={[
*     { key: 'id', label: 'Organization ID', editable: false },
*     { key: 'name', label: 'Organization Name', editable: true },
*     { key: 'description', label: 'Description', editable: true, render: (value) => value || 'No description' },
*     { key: 'created', label: 'Created Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'attributes', label: 'Custom Attributes', editable: true }
*   ]}
*   onUpdate={handleUpdate}
* />
*
* // In popup mode
* <BaseOrganizationProfile
*   organization={organizationData}
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   title="Edit Organization"
* />
* ```
* <BaseOrganizationProfile
*   organization={organizationData}
*   fields={[
*     { key: 'id', label: 'Organization ID' },
*     { key: 'name', label: 'Organization Name' },
*     { key: 'description', label: 'Description', render: (value) => value || 'No description' },
*     { key: 'created', label: 'Created Date', render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'attributes', label: 'Custom Attributes' }
*   ]}
* />
* ```
*/
const BaseOrganizationProfile = ({ fallback = null, className = "", cardLayout = true, organization, title = "Organization Profile", mode = "inline", editable = true, onOpenChange, onUpdate, open = false, saveButtonText = "Save Changes", cancelButtonText = "Cancel", fields = [
	{
		editable: false,
		key: "id",
		label: "Organization ID"
	},
	{
		editable: true,
		key: "name",
		label: "Organization Name"
	},
	{
		editable: true,
		key: "description",
		label: "Organization Description",
		render: (value) => value || "-"
	},
	{
		editable: false,
		key: "created",
		label: "Created Date",
		render: (value) => (0, __thunderid_browser.formatDate)(value)
	},
	{
		editable: false,
		key: "lastModified",
		label: "Last Modified Date",
		render: (value) => (0, __thunderid_browser.formatDate)(value)
	}
] }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseOrganizationProfile_styles.default(theme, colorScheme);
	const [editedOrganization, setEditedOrganization] = (0, react.useState)(organization);
	const [editingFields, setEditingFields] = (0, react.useState)({});
	const PencilIcon = () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" })
	});
	const toggleFieldEdit = (0, react.useCallback)((fieldName) => {
		setEditingFields((prev) => ({
			...prev,
			[fieldName]: !prev[fieldName]
		}));
	}, []);
	const getFieldPlaceholder = (0, react.useCallback)((fieldKey) => {
		return `Enter ${{
			description: "organization description",
			name: "organization name",
			orgHandle: "organization handle",
			status: "organization status",
			type: "organization type"
		}[fieldKey] || fieldKey.toLowerCase()}`;
	}, []);
	const handleFieldSave = (0, react.useCallback)((fieldKey) => {
		if (!onUpdate || !fieldKey) return;
		let fieldValue;
		if (editedOrganization && fieldKey && editedOrganization[fieldKey] !== void 0) fieldValue = editedOrganization[fieldKey];
		else if (organization?.[fieldKey] !== void 0) fieldValue = organization[fieldKey];
		else fieldValue = "";
		onUpdate({ [fieldKey]: fieldValue });
		toggleFieldEdit(fieldKey);
	}, [
		editedOrganization,
		organization,
		onUpdate,
		toggleFieldEdit
	]);
	const handleFieldCancel = (0, react.useCallback)((fieldKey) => {
		setEditedOrganization((prev) => ({
			...prev,
			[fieldKey]: organization?.[fieldKey]
		}));
		toggleFieldEdit(fieldKey);
	}, [organization, toggleFieldEdit]);
	const getOrgInitials = (name) => {
		if (!name) return "ORG";
		return name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase().slice(0, 2);
	};
	const renderField = (field, isEditing, onEditValue, onStartEdit) => {
		if (!field) return null;
		const { key, label, editable: fieldEditable = true } = field;
		const value = key === "attributes" ? organization?.attributes || {} : organization?.[key];
		const renderedValue = field.render ? field.render(value, organization) : value;
		if (isEditing && onEditValue && fieldEditable && editable) {
			const fieldValue = editedOrganization && key && editedOrganization[key] !== void 0 ? editedOrganization[key] : value || "";
			const commonProps = {
				className: (0, __emotion_css.cx)(styles["fieldInput"]),
				label: void 0,
				onChange: (e) => onEditValue(e.target ? e.target.value : e),
				placeholder: getFieldPlaceholder(key),
				value: typeof fieldValue === "object" ? JSON.stringify(fieldValue) : String(fieldValue || "")
			};
			let fieldInput;
			if (key === "attributes") fieldInput = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_KeyValueInput.default, {
				value: typeof fieldValue === "object" && fieldValue !== null ? fieldValue : {},
				onChange: (pairs) => {
					onEditValue(pairs.reduce((acc, pair) => {
						acc[pair.key] = pair.value;
						return acc;
					}, {}));
				},
				onAdd: (pair) => {
					if (onUpdate) onUpdate([{
						operation: "ADD",
						path: `/attributes/${pair.key}`,
						value: pair.value
					}]);
				},
				onRemove: (pair) => {
					if (onUpdate) onUpdate([{
						operation: "REMOVE",
						path: `/attributes/${pair.key}`,
						value: ""
					}]);
				},
				label: "",
				keyPlaceholder: "Attribute name",
				valuePlaceholder: "Attribute value",
				helperText: "Add custom attributes as key-value pairs"
			});
			else fieldInput = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, { ...commonProps });
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, __emotion_css.cx)(styles["label"]),
				children: label
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["value"]),
				children: fieldInput
			})] });
		}
		const hasValue = value !== void 0 && value !== null && value !== "";
		const isFieldEditable = editable && fieldEditable;
		let displayValue;
		if (hasValue) displayValue = key === "attributes" && typeof value === "object" && value !== null ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_KeyValueInput.default, {
			value,
			readOnly: true,
			label: ""
		}) : String(renderedValue);
		else if (isFieldEditable) displayValue = getFieldPlaceholder(key);
		else displayValue = "-";
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, __emotion_css.cx)(styles["label"]),
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["value"], !hasValue && styles["valueEmpty"]),
			children: !hasValue && isFieldEditable && onStartEdit ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
				onClick: onStartEdit,
				variant: "text",
				color: "secondary",
				size: "small",
				title: "Click to edit",
				className: (0, __emotion_css.cx)(styles["placeholderButton"]),
				children: displayValue
			}) : displayValue
		})] });
	};
	const renderOrganizationField = (field) => {
		if (!field?.key) return null;
		const hasValue = organization?.[field.key] !== void 0 && organization?.[field.key] !== "" && organization?.[field.key] !== null;
		const isFieldEditing = editingFields[field.key];
		const isFieldEditable = editable && field.editable !== false;
		if (!(hasValue || isFieldEditing || isFieldEditable)) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, __emotion_css.cx)(styles["field"]),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["fieldContent"]),
				children: renderField(field, isFieldEditing, (value) => {
					const tempEditedOrganization = { ...editedOrganization };
					tempEditedOrganization[field.key] = value;
					setEditedOrganization(tempEditedOrganization);
				}, () => toggleFieldEdit(field.key))
			}), isFieldEditable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["fieldActions"]),
				children: isFieldEditing ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
					onClick: () => handleFieldSave(field.key),
					color: "primary",
					variant: "solid",
					size: "small",
					title: "Save changes",
					children: saveButtonText
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
					onClick: () => handleFieldCancel(field.key),
					color: "secondary",
					variant: "solid",
					size: "small",
					title: "Cancel editing",
					children: cancelButtonText
				})] }) : hasValue && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
					onClick: () => toggleFieldEdit(field.key),
					variant: "text",
					color: "secondary",
					size: "small",
					title: "Edit field",
					className: (0, __emotion_css.cx)(styles["editButton"]),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PencilIcon, {})
				})
			})]
		}, field.key);
	};
	if (!organization) return fallback;
	const profileContent = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default, {
		className: (0, __emotion_css.cx)(styles["root"], cardLayout && styles["card"], className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, __emotion_css.cx)(styles["header"]),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Avatar.Avatar, {
				name: getOrgInitials(organization.name),
				size: 80,
				alt: `${organization.name} logo`
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, __emotion_css.cx)(styles["orgInfo"]),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
					className: (0, __emotion_css.cx)(styles["name"]),
					children: organization.name
				}), organization.orgHandle && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
					className: (0, __emotion_css.cx)(styles["handle"]),
					children: ["@", organization.orgHandle]
				})]
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["infoContainer"]),
			children: fields.map((field) => renderOrganizationField(field))
		})]
	});
	if (mode === "popup") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Dialog.default.Content, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default.Heading, { children: title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["popup"]),
			children: profileContent
		})] })
	});
	return profileContent;
};
var BaseOrganizationProfile_default = BaseOrganizationProfile;

//#endregion
exports.default = BaseOrganizationProfile_default;
//# sourceMappingURL=BaseOrganizationProfile.cjs.map