import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Button_default from "../../primitives/Button/Button.js";
import TextField_default from "../../primitives/TextField/TextField.js";
import Card_default from "../../primitives/Card/Card.js";
import { Avatar } from "../../primitives/Avatar/Avatar.js";
import Dialog_default from "../../primitives/Dialog/Dialog.js";
import BaseOrganizationProfile_styles_default from "./BaseOrganizationProfile.styles.js";
import KeyValueInput_default from "../../primitives/KeyValueInput/KeyValueInput.js";
import { formatDate } from "@thunderid/browser";
import { useCallback, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
		render: (value) => formatDate(value)
	},
	{
		editable: false,
		key: "lastModified",
		label: "Last Modified Date",
		render: (value) => formatDate(value)
	}
] }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseOrganizationProfile_styles_default(theme, colorScheme);
	const [editedOrganization, setEditedOrganization] = useState(organization);
	const [editingFields, setEditingFields] = useState({});
	const PencilIcon = () => /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" })
	});
	const toggleFieldEdit = useCallback((fieldName) => {
		setEditingFields((prev) => ({
			...prev,
			[fieldName]: !prev[fieldName]
		}));
	}, []);
	const getFieldPlaceholder = useCallback((fieldKey) => {
		return `Enter ${{
			description: "organization description",
			name: "organization name",
			orgHandle: "organization handle",
			status: "organization status",
			type: "organization type"
		}[fieldKey] || fieldKey.toLowerCase()}`;
	}, []);
	const handleFieldSave = useCallback((fieldKey) => {
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
	const handleFieldCancel = useCallback((fieldKey) => {
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
				className: cx(styles["fieldInput"]),
				label: void 0,
				onChange: (e) => onEditValue(e.target ? e.target.value : e),
				placeholder: getFieldPlaceholder(key),
				value: typeof fieldValue === "object" ? JSON.stringify(fieldValue) : String(fieldValue || "")
			};
			let fieldInput;
			if (key === "attributes") fieldInput = /* @__PURE__ */ jsx(KeyValueInput_default, {
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
			else fieldInput = /* @__PURE__ */ jsx(TextField_default, { ...commonProps });
			return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: cx(styles["label"]),
				children: label
			}), /* @__PURE__ */ jsx("div", {
				className: cx(styles["value"]),
				children: fieldInput
			})] });
		}
		const hasValue = value !== void 0 && value !== null && value !== "";
		const isFieldEditable = editable && fieldEditable;
		let displayValue;
		if (hasValue) displayValue = key === "attributes" && typeof value === "object" && value !== null ? /* @__PURE__ */ jsx(KeyValueInput_default, {
			value,
			readOnly: true,
			label: ""
		}) : String(renderedValue);
		else if (isFieldEditable) displayValue = getFieldPlaceholder(key);
		else displayValue = "-";
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
			className: cx(styles["label"]),
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: cx(styles["value"], !hasValue && styles["valueEmpty"]),
			children: !hasValue && isFieldEditable && onStartEdit ? /* @__PURE__ */ jsx(Button_default, {
				onClick: onStartEdit,
				variant: "text",
				color: "secondary",
				size: "small",
				title: "Click to edit",
				className: cx(styles["placeholderButton"]),
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
		return /* @__PURE__ */ jsxs("div", {
			className: cx(styles["field"]),
			children: [/* @__PURE__ */ jsx("div", {
				className: cx(styles["fieldContent"]),
				children: renderField(field, isFieldEditing, (value) => {
					const tempEditedOrganization = { ...editedOrganization };
					tempEditedOrganization[field.key] = value;
					setEditedOrganization(tempEditedOrganization);
				}, () => toggleFieldEdit(field.key))
			}), isFieldEditable && /* @__PURE__ */ jsx("div", {
				className: cx(styles["fieldActions"]),
				children: isFieldEditing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button_default, {
					onClick: () => handleFieldSave(field.key),
					color: "primary",
					variant: "solid",
					size: "small",
					title: "Save changes",
					children: saveButtonText
				}), /* @__PURE__ */ jsx(Button_default, {
					onClick: () => handleFieldCancel(field.key),
					color: "secondary",
					variant: "solid",
					size: "small",
					title: "Cancel editing",
					children: cancelButtonText
				})] }) : hasValue && /* @__PURE__ */ jsx(Button_default, {
					onClick: () => toggleFieldEdit(field.key),
					variant: "text",
					color: "secondary",
					size: "small",
					title: "Edit field",
					className: cx(styles["editButton"]),
					children: /* @__PURE__ */ jsx(PencilIcon, {})
				})
			})]
		}, field.key);
	};
	if (!organization) return fallback;
	const profileContent = /* @__PURE__ */ jsxs(Card_default, {
		className: cx(styles["root"], cardLayout && styles["card"], className),
		children: [/* @__PURE__ */ jsxs("div", {
			className: cx(styles["header"]),
			children: [/* @__PURE__ */ jsx(Avatar, {
				name: getOrgInitials(organization.name),
				size: 80,
				alt: `${organization.name} logo`
			}), /* @__PURE__ */ jsxs("div", {
				className: cx(styles["orgInfo"]),
				children: [/* @__PURE__ */ jsx("h2", {
					className: cx(styles["name"]),
					children: organization.name
				}), organization.orgHandle && /* @__PURE__ */ jsxs("p", {
					className: cx(styles["handle"]),
					children: ["@", organization.orgHandle]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: cx(styles["infoContainer"]),
			children: fields.map((field) => renderOrganizationField(field))
		})]
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
			className: cx(styles["popup"]),
			children: profileContent
		})] })
	});
	return profileContent;
};
var BaseOrganizationProfile_default = BaseOrganizationProfile;

//#endregion
export { BaseOrganizationProfile_default as default };
//# sourceMappingURL=BaseOrganizationProfile.js.map