import useTheme_default from "../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import Button_default from "../../primitives/Button/Button.js";
import Typography_default from "../../primitives/Typography/Typography.js";
import Checkbox_default from "../../primitives/Checkbox/Checkbox.js";
import DatePicker_default from "../../primitives/DatePicker/DatePicker.js";
import TextField_default from "../../primitives/TextField/TextField.js";
import Alert_default from "../../primitives/Alert/Alert.js";
import Card_default from "../../primitives/Card/Card.js";
import Divider_default from "../../primitives/Divider/Divider.js";
import BaseUserProfile_styles_default from "./BaseUserProfile.styles.js";
import getMappedUserProfileValue_default from "../../../utils/getMappedUserProfileValue.js";
import getDisplayName_default from "../../../utils/getDisplayName.js";
import { Avatar } from "../../primitives/Avatar/Avatar.js";
import Dialog_default from "../../primitives/Dialog/Dialog.js";
import MultiInput_default from "../../primitives/MultiInput/MultiInput.js";
import { WellKnownSchemaIds, bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/UserProfile/BaseUserProfile.tsx
const fieldsToSkip = [
	"roles.default",
	"active",
	"groups",
	"accountLocked",
	"accountDisabled",
	"oneTimePassword",
	"userSourceId",
	"idpType",
	"localCredentialExists",
	"active",
	"ResourceType",
	"ExternalID",
	"MetaData",
	"verifiedMobileNumbers",
	"verifiedEmailAddresses",
	"phoneNumbers.mobile",
	"emailAddresses",
	"preferredMFAOption"
];
const readonlyFields = [
	"username",
	"userName",
	"user_name"
];
const BaseUserProfile = ({ fallback = null, className = "", cardLayout = true, profile, schemas = [], flattenedProfile, mode = "inline", title, attributeMapping = {}, editable = true, onOpenChange, onUpdate, open = false, error = null, isLoading = false, preferences, showFields = [], hideFields = [], displayNameAttributes = [] }) => {
	const { theme, colorScheme } = useTheme_default();
	const [editedUser, setEditedUser] = useState(flattenedProfile || profile);
	const [editingFields, setEditingFields] = useState({});
	const { t } = useTranslation_default(preferences?.i18n);
	/**
	* Determines if a field should be visible based on showFields, hideFields, and fieldsToSkip arrays.
	* Priority order:
	* 1. fieldsToSkip (always hidden) - highest priority
	* 2. hideFields (explicitly hidden)
	* 3. showFields (explicitly shown, if array is not empty)
	* 4. Default behavior (show all fields not in fieldsToSkip)
	*/
	const shouldShowField = useCallback((fieldName) => {
		if (fieldsToSkip.includes(fieldName)) return false;
		if (hideFields.length > 0 && hideFields.includes(fieldName)) return false;
		if (showFields.length > 0) return showFields.includes(fieldName);
		return true;
	}, [showFields, hideFields]);
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
	const getFieldPlaceholder = useCallback((schema) => {
		const { type, displayName, description, name } = schema;
		const fieldLabel = displayName || description || name || "value";
		switch (type) {
			case "DATE_TIME": return `Enter your ${fieldLabel.toLowerCase()}`;
			case "BOOLEAN": return `Select ${fieldLabel.toLowerCase()}`;
			case "COMPLEX": return `Enter ${fieldLabel.toLowerCase()} details`;
			default: return `Enter your ${fieldLabel.toLowerCase()}`;
		}
	}, []);
	const formatLabel = useCallback((key) => key.split(/(?=[A-Z])|_/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" "), []);
	const styles = BaseUserProfile_styles_default(theme, colorScheme);
	const ObjectDisplay = ({ data }) => {
		if (!data || typeof data !== "object") return null;
		return /* @__PURE__ */ jsx("table", {
			className: styles.value,
			children: /* @__PURE__ */ jsx("tbody", { children: Object.entries(data).map(([key, value]) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
				className: styles.objectKey,
				children: /* @__PURE__ */ jsxs("strong", { children: [formatLabel(key), ":"] })
			}), /* @__PURE__ */ jsx("td", {
				className: styles.objectValue,
				children: typeof value === "object" ? /* @__PURE__ */ jsx(ObjectDisplay, { data: value }) : String(value)
			})] }, key)) })
		});
	};
	function set(obj, path, value) {
		const keys = path.split(".");
		let current = obj;
		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];
			if (i === keys.length - 1) current[key] = value;
			else {
				if (!current[key] || typeof current[key] !== "object") current[key] = {};
				current = current[key];
			}
		}
	}
	const handleFieldSave = useCallback((schema) => {
		if (!onUpdate || !schema.name) return;
		const fieldName = schema.name;
		let fieldValue;
		if (editedUser && fieldName && editedUser[fieldName] !== void 0) fieldValue = editedUser[fieldName];
		else if (flattenedProfile?.[fieldName] !== void 0) fieldValue = flattenedProfile[fieldName];
		else fieldValue = "";
		if (Array.isArray(fieldValue)) fieldValue = fieldValue.filter((v) => v !== void 0 && v !== null && v !== "");
		let payload = {};
		if (schema.schemaId && schema.schemaId !== WellKnownSchemaIds.User) payload = { [schema.schemaId]: { [fieldName]: fieldValue } };
		else set(payload, fieldName, fieldValue);
		onUpdate(payload);
		toggleFieldEdit(fieldName);
	}, [
		editedUser,
		flattenedProfile,
		onUpdate,
		toggleFieldEdit
	]);
	const handleFieldCancel = useCallback((fieldName) => {
		const currentUser$1 = flattenedProfile || profile;
		setEditedUser((prev) => ({
			...prev,
			[fieldName]: currentUser$1[fieldName]
		}));
		toggleFieldEdit(fieldName);
	}, [
		flattenedProfile,
		profile,
		toggleFieldEdit
	]);
	const mergedMappings = Object.fromEntries(Object.entries({
		email: ["emails", "email"],
		firstName: ["name.givenName", "given_name"],
		lastName: ["name.familyName", "family_name"],
		picture: [
			"profile",
			"profileUrl",
			"picture",
			"URL"
		],
		username: [
			"userName",
			"username",
			"user_name"
		],
		...attributeMapping
	}).filter((entry) => entry[1] !== void 0));
	const renderSchemaField = (schema, isEditing, onEditValue, onStartEdit) => {
		if (!schema) return null;
		const { value, displayName, description, name, type, required, mutability, subAttributes, multiValued } = schema;
		const label = displayName || description || name || "";
		if (subAttributes && Array.isArray(subAttributes)) return /* @__PURE__ */ jsx(Fragment, { children: subAttributes.map((subAttr, index) => {
			let displayValue$1;
			if (Array.isArray(subAttr.value)) displayValue$1 = subAttr.value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join(", ");
			else if (typeof subAttr.value === "object") displayValue$1 = JSON.stringify(subAttr.value);
			else displayValue$1 = String(subAttr.value);
			return /* @__PURE__ */ jsxs("div", {
				className: styles.field,
				children: [/* @__PURE__ */ jsx("span", {
					className: styles.label,
					children: subAttr.displayName || subAttr.description || ""
				}), /* @__PURE__ */ jsx("div", {
					className: styles.value,
					children: displayValue$1
				})]
			}, index);
		}) });
		if (Array.isArray(value) || multiValued) {
			const hasValues = Array.isArray(value) ? value.length > 0 : value !== void 0 && value !== null && value !== "";
			const isEditable$1 = editable && mutability !== "READ_ONLY" && !readonlyFields.includes(name || "");
			if (isEditing && onEditValue && isEditable$1) {
				let currentValue;
				if (editedUser && name && editedUser[name] !== void 0) currentValue = editedUser[name];
				else if (flattenedProfile && name && flattenedProfile[name] !== void 0) currentValue = flattenedProfile[name];
				else currentValue = value;
				let fieldValues;
				if (Array.isArray(currentValue)) fieldValues = currentValue.map(String);
				else if (currentValue !== void 0 && currentValue !== null && currentValue !== "") fieldValues = [String(currentValue)];
				else fieldValues = [];
				return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
					className: styles.label,
					children: label
				}), /* @__PURE__ */ jsx("div", {
					className: styles.value,
					children: /* @__PURE__ */ jsx(MultiInput_default, {
						values: fieldValues,
						onChange: (newValues) => {
							if (multiValued || Array.isArray(currentValue)) onEditValue(newValues);
							else onEditValue(newValues[0] || "");
						},
						placeholder: getFieldPlaceholder(schema),
						fieldType: type,
						type: type === "DATE_TIME" ? "date" : "text",
						required
					})
				})] });
			}
			let displayValue$1;
			if (hasValues) if (Array.isArray(value)) displayValue$1 = value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join(", ");
			else displayValue$1 = String(value);
			else if (isEditable$1) displayValue$1 = getFieldPlaceholder(schema);
			else displayValue$1 = "-";
			return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: styles.label,
				children: label
			}), /* @__PURE__ */ jsx("div", {
				className: cx(styles.value, !hasValues ? styles.valuePlaceholder : ""),
				children: !hasValues && isEditable$1 && onStartEdit ? /* @__PURE__ */ jsx(Button_default, {
					onClick: onStartEdit,
					variant: "text",
					color: "secondary",
					size: "small",
					title: "Click to edit",
					className: styles.editButton,
					children: displayValue$1
				}) : displayValue$1
			})] });
		}
		if (type === "COMPLEX" && typeof value === "object") return /* @__PURE__ */ jsx(ObjectDisplay, { data: value });
		if (isEditing && onEditValue && mutability !== "READ_ONLY" && !readonlyFields.includes(name || "")) {
			let fieldValue;
			if (editedUser && name && editedUser[name] !== void 0) fieldValue = editedUser[name];
			else if (flattenedProfile && name && flattenedProfile[name] !== void 0) fieldValue = flattenedProfile[name];
			else fieldValue = value || "";
			const commonProps = {
				label: void 0,
				onChange: (e) => onEditValue(e.target ? e.target.value : e),
				placeholder: getFieldPlaceholder(schema),
				required,
				value: fieldValue
			};
			let field;
			switch (type) {
				case "STRING":
					field = /* @__PURE__ */ jsx(TextField_default, { ...commonProps });
					break;
				case "DATE_TIME":
					field = /* @__PURE__ */ jsx(DatePicker_default, { ...commonProps });
					break;
				case "BOOLEAN":
					field = /* @__PURE__ */ jsx(Checkbox_default, {
						...commonProps,
						checked: !!fieldValue,
						onChange: (e) => {
							onEditValue(e.target.checked);
						}
					});
					break;
				case "COMPLEX":
					field = /* @__PURE__ */ jsx("textarea", {
						value: fieldValue,
						onChange: (e) => onEditValue(e.target.value),
						placeholder: getFieldPlaceholder(schema),
						required,
						className: styles.complexTextarea
					});
					break;
				default: field = /* @__PURE__ */ jsx(TextField_default, { ...commonProps });
			}
			return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: styles.label,
				children: label
			}), /* @__PURE__ */ jsx("div", {
				className: styles.value,
				children: field
			})] });
		}
		const hasValue = value !== void 0 && value !== null && value !== "";
		const isEditable = editable && mutability !== "READ_ONLY" && !readonlyFields.includes(name || "");
		let displayValue;
		if (hasValue) displayValue = String(value);
		else if (isEditable) displayValue = getFieldPlaceholder(schema);
		else displayValue = "-";
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
			className: styles.label,
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: cx(styles.value, !hasValue ? styles.valuePlaceholder : ""),
			children: !hasValue && isEditable && onStartEdit ? /* @__PURE__ */ jsx(Button_default, {
				onClick: onStartEdit,
				variant: "text",
				color: "secondary",
				size: "small",
				title: "Click to edit",
				className: styles.editButton,
				children: displayValue
			}) : displayValue
		})] });
	};
	const renderUserInfo = (schema) => {
		if (!schema?.name) return null;
		const hasValue = schema.value !== void 0 && schema.value !== "" && schema.value !== null;
		const isFieldEditing = editingFields[schema.name];
		const isReadonlyField = readonlyFields.includes(schema.name);
		if (!(hasValue || isFieldEditing || editable && schema.mutability === "READ_WRITE")) return null;
		return /* @__PURE__ */ jsxs("div", {
			className: styles.field,
			children: [/* @__PURE__ */ jsx("div", {
				className: styles.fieldInner,
				children: renderSchemaField(schema, isFieldEditing, (value) => {
					const tempEditedUser = { ...editedUser };
					tempEditedUser[schema.name] = value;
					setEditedUser(tempEditedUser);
				}, () => toggleFieldEdit(schema.name))
			}), editable && schema.mutability !== "READ_ONLY" && !isReadonlyField && /* @__PURE__ */ jsxs("div", {
				className: styles.fieldActions,
				children: [isFieldEditing && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button_default, {
					size: "small",
					color: "primary",
					variant: "solid",
					onClick: () => handleFieldSave(schema),
					children: "Save"
				}), /* @__PURE__ */ jsx(Button_default, {
					size: "small",
					color: "secondary",
					variant: "solid",
					onClick: () => handleFieldCancel(schema.name),
					children: "Cancel"
				})] }), !isFieldEditing && hasValue && /* @__PURE__ */ jsx(Button_default, {
					size: "small",
					color: "tertiary",
					variant: "icon",
					onClick: () => toggleFieldEdit(schema.name),
					title: "Edit",
					className: styles.editButton,
					children: /* @__PURE__ */ jsx(PencilIcon, {})
				})]
			})]
		});
	};
	if (!profile && !flattenedProfile) return fallback;
	const containerClasses = cx(styles.root, cardLayout ? styles.card : "", withVendorCSSClassPrefix("user-profile"), className);
	const currentUser = flattenedProfile || profile;
	const renderProfileWithoutSchemas = () => {
		if (!currentUser) return null;
		const displayName = getDisplayName_default(mergedMappings, profile, displayNameAttributes);
		const profileEntries = Object.entries(currentUser).filter(([key, value]) => {
			if (!shouldShowField(key)) return false;
			return value !== void 0 && value !== "" && value !== null;
		}).sort(([a], [b]) => a.localeCompare(b));
		return /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: styles.profileSummary,
				children: [
					/* @__PURE__ */ jsx(Avatar, {
						imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, currentUser),
						name: displayName,
						size: 70,
						alt: `${displayName}'s avatar`,
						isLoading
					}),
					/* @__PURE__ */ jsx(Typography_default, {
						variant: "h3",
						fontWeight: "medium",
						children: displayName
					}),
					getMappedUserProfileValue_default("email", mergedMappings, currentUser) && /* @__PURE__ */ jsx(Typography_default, {
						variant: "body2",
						color: "textSecondary",
						children: getMappedUserProfileValue_default("email", mergedMappings, currentUser)
					})
				]
			}),
			/* @__PURE__ */ jsx(Divider_default, {}),
			profileEntries.map(([key, value], index) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: styles.sectionRow,
				children: [/* @__PURE__ */ jsx("div", {
					className: styles.sectionLabel,
					children: formatLabel(key)
				}), /* @__PURE__ */ jsx("div", {
					className: styles.sectionValue,
					children: typeof value === "object" ? /* @__PURE__ */ jsx(ObjectDisplay, { data: value }) : String(value)
				})]
			}), index < profileEntries.length - 1 && /* @__PURE__ */ jsx(Divider_default, {})] }, key))
		] });
	};
	const profileContent = /* @__PURE__ */ jsxs(Card_default, {
		className: containerClasses,
		children: [
			error && /* @__PURE__ */ jsxs(Alert_default, {
				variant: "error",
				className: cx(withVendorCSSClassPrefix(bem("user-profile", "alert")), styles.alert),
				children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") || "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
			}),
			schemas && schemas.length > 0 && /* @__PURE__ */ jsx("div", {
				className: styles.header,
				children: /* @__PURE__ */ jsx(Avatar, {
					imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, currentUser),
					name: getDisplayName_default(mergedMappings, profile),
					size: 80,
					alt: `${getDisplayName_default(mergedMappings, profile)}'s avatar`,
					isLoading
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: styles.infoContainer,
				children: schemas && schemas.length > 0 ? schemas.filter((schema) => {
					if (!schema.name || !shouldShowField(schema.name)) return false;
					if (!editable) {
						const value = flattenedProfile && schema.name ? flattenedProfile[schema.name] : void 0;
						return value !== void 0 && value !== "" && value !== null;
					}
					return true;
				}).sort((a, b) => {
					return (a.displayOrder ? parseInt(a.displayOrder, 10) : 999) - (b.displayOrder ? parseInt(b.displayOrder, 10) : 999);
				}).map((schema, index) => {
					const value = flattenedProfile && schema.name ? flattenedProfile[schema.name] : void 0;
					const schemaWithValue = {
						...schema,
						value
					};
					return /* @__PURE__ */ jsx("div", {
						className: styles.info,
						children: renderUserInfo(schemaWithValue)
					}, schema.name || index);
				}) : renderProfileWithoutSchemas()
			})
		]
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title ?? t("user.profile.heading") }), /* @__PURE__ */ jsx("div", {
			className: styles.popup,
			children: profileContent
		})] })
	});
	return profileContent;
};
var BaseUserProfile_default = BaseUserProfile;

//#endregion
export { BaseUserProfile_default as default };
//# sourceMappingURL=BaseUserProfile.js.map