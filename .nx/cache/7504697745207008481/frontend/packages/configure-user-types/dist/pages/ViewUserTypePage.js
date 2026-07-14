import useGetUserType from "../api/useGetUserType.js";
import useUpdateUserType from "../api/useUpdateUserType.js";
import UserTypeDeleteDialog from "../components/edit-user-type/UserTypeDeleteDialog.js";
import EditGeneralSettings from "../components/edit-user-type/general-settings/EditGeneralSettings.js";
import EditSchemaSettings from "../components/edit-user-type/schema-settings/EditSchemaSettings.js";
import { useToast } from "@thunderid/contexts";
import { useTranslation } from "react-i18next";
import { useLogger } from "@thunderid/logger/react";
import { Alert, Box, Button, IconButton, PageContent, PageTitle, Stack, Tab, Tabs, TextField, Typography } from "@wso2/oxygen-ui";
import { ArrowLeft, Edit } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { PageLoadingAnimation, UnsavedChangesBar } from "@thunderid/components";

//#region src/pages/ViewUserTypePage.tsx
function TabPanel({ children = null, value, index,...other }) {
	return /* @__PURE__ */ jsx("div", {
		role: "tabpanel",
		hidden: value !== index,
		id: `usertype-tabpanel-${index}`,
		"aria-labelledby": `usertype-tab-${index}`,
		...other,
		children: value === index && /* @__PURE__ */ jsx(Box, {
			sx: { py: 3 },
			children
		})
	});
}
/**
* Convert API schema to editable property inputs.
*/
function convertSchemaToProperties(schema) {
	return Object.entries(schema).map(([key, value], index) => ({
		id: `${index}`,
		name: key,
		displayName: "displayName" in value ? value.displayName ?? "" : "",
		type: value.type === "string" && "enum" in value && Array.isArray(value.enum) && value.enum.length > 0 ? "enum" : value.type,
		required: value.required ?? false,
		unique: "unique" in value ? value.unique ?? false : false,
		credential: "credential" in value ? value.credential ?? false : false,
		enum: "enum" in value ? value.enum ?? [] : [],
		regex: "regex" in value ? value.regex ?? "" : "",
		..."items" in value ? { items: value.items } : {},
		..."properties" in value ? { properties: value.properties } : {}
	}));
}
/**
* Convert editable property inputs back to API schema format.
*/
function convertPropertiesToSchema(properties) {
	const schema = {};
	properties.filter((prop) => prop.name.trim()).forEach((prop) => {
		const propDef = {
			type: prop.type === "enum" ? "string" : prop.type,
			required: prop.required,
			...prop.displayName.trim() ? { displayName: prop.displayName.trim() } : {}
		};
		if (prop.unique) propDef.unique = true;
		if ((prop.type === "string" || prop.type === "number" || prop.type === "enum") && prop.credential) propDef.credential = true;
		if (prop.type === "string" || prop.type === "enum") {
			if (prop.enum.length > 0) propDef.enum = prop.enum;
			if (prop.regex.trim()) propDef.regex = prop.regex;
		}
		if (prop.type === "array") propDef.items = prop.items ?? { type: "string" };
		else if (prop.type === "object") propDef.properties = prop.properties ?? {};
		schema[prop.name.trim()] = propDef;
	});
	return schema;
}
function ViewUserTypePage() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("ViewUserTypePage");
	const { showToast } = useToast();
	const { id } = useParams();
	const listUrl = "/user-types";
	const { data: userType, isLoading, error: fetchError } = useGetUserType(id);
	const updateUserTypeMutation = useUpdateUserType();
	const [activeTab, setActiveTab] = useState(0);
	const [isEditingName, setIsEditingName] = useState(false);
	const [tempName, setTempName] = useState("");
	const [editedUserType, setEditedUserType] = useState({});
	const [editedProperties, setEditedProperties] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const baseProperties = useMemo(() => userType ? convertSchemaToProperties(userType.schema) : [], [userType]);
	const effectiveProperties = editedProperties ?? baseProperties;
	const effectiveName = editedUserType.name ?? userType?.name ?? "";
	const eligibleDisplayProperties = useMemo(() => effectiveProperties.filter((p) => (p.type === "string" || p.type === "number" || p.type === "enum") && !p.credential && p.name.trim().length > 0), [effectiveProperties]);
	const effectiveDisplayAttribute = editedUserType.displayAttribute ?? userType?.systemAttributes?.display ?? "";
	const [prevEligible, setPrevEligible] = useState(eligibleDisplayProperties);
	if (prevEligible !== eligibleDisplayProperties) {
		setPrevEligible(eligibleDisplayProperties);
		if (effectiveDisplayAttribute) {
			if (!eligibleDisplayProperties.map((p) => p.name.trim()).includes(effectiveDisplayAttribute)) setEditedUserType((prev) => ({
				...prev,
				displayAttribute: ""
			}));
		}
	}
	const hasChanges = useMemo(() => Object.keys(editedUserType).length > 0 || editedProperties !== null, [editedUserType, editedProperties]);
	const handleBack = async () => {
		await navigate(listUrl);
	};
	const handleTabChange = (_event, newValue) => {
		setActiveTab(newValue);
	};
	const handleFieldChange = useCallback((field, value) => {
		setEditedUserType((prev) => ({
			...prev,
			[field]: value
		}));
	}, []);
	const handlePropertiesChange = useCallback((newProperties) => {
		setEditedProperties(newProperties);
	}, []);
	const handleReset = useCallback(() => {
		setEditedUserType({});
		setEditedProperties(null);
		updateUserTypeMutation.reset();
	}, [updateUserTypeMutation]);
	const handleSave = useCallback(async () => {
		if (!id || !userType) return;
		const name = (editedUserType.name ?? userType.name).trim();
		const ouId = (editedUserType.ouId ?? userType.ouId).trim();
		const allowSelfRegistration = editedUserType.allowSelfRegistration ?? userType.allowSelfRegistration;
		const displayAttribute = editedUserType.displayAttribute ?? userType.systemAttributes?.display ?? "";
		if (!ouId) {
			showToast(t("userTypes:validationErrors.ouIdRequired"), "error");
			return;
		}
		const trimmedNames = effectiveProperties.filter((p) => p.name.trim()).map((p) => p.name.trim());
		const duplicates = trimmedNames.filter((n, i) => trimmedNames.indexOf(n) !== i);
		if (duplicates.length > 0) {
			showToast(t("userTypes:validationErrors.duplicateProperties", { duplicates: [...new Set(duplicates)].join(", ") }), "error");
			return;
		}
		const schema = convertPropertiesToSchema(effectiveProperties);
		try {
			await updateUserTypeMutation.mutateAsync({
				userTypeId: id,
				data: {
					name,
					ouId,
					allowSelfRegistration,
					...displayAttribute ? { systemAttributes: { display: displayAttribute } } : {},
					schema
				}
			});
			setEditedUserType({});
			setEditedProperties(null);
		} catch (err) {
			logger.error("Failed to update user type", { error: err });
			showToast(err instanceof Error ? err.message : t("userTypes:edit.saveError", "Failed to save user type"), "error");
		}
	}, [
		id,
		userType,
		editedUserType,
		effectiveProperties,
		updateUserTypeMutation,
		logger,
		showToast,
		t
	]);
	const handleDeleteSuccess = () => {
		(async () => {
			await navigate(listUrl);
		})().catch((error) => {
			logger.error("Failed to navigate after deleting user type", { error });
		});
	};
	if (isLoading) return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	if (fetchError) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: fetchError.message ?? t("userTypes:edit.loadError", "Failed to load user type information")
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("userTypes:edit.back", "Back to User Types")
	})] });
	if (!userType) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("userTypes:edit.notFound", "User type not found")
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("userTypes:edit.back", "Back to User Types")
	})] });
	return /* @__PURE__ */ jsxs(PageContent, { children: [
		userType.isReadOnly && /* @__PURE__ */ jsx(Alert, {
			severity: "info",
			sx: { mb: 2 },
			children: t("common:messages.readOnlyResource", "This resource is read-only and cannot be modified.")
		}),
		/* @__PURE__ */ jsxs(PageTitle, { children: [/* @__PURE__ */ jsx(PageTitle.BackButton, {
			component: /* @__PURE__ */ jsx(Link, { to: listUrl }),
			children: t("userTypes:edit.back", "Back to User Types")
		}), /* @__PURE__ */ jsx(PageTitle.Header, { children: /* @__PURE__ */ jsx(Stack, {
			direction: "row",
			alignItems: "center",
			spacing: 1,
			mb: 1,
			children: isEditingName ? /* @__PURE__ */ jsx(TextField, {
				value: tempName,
				onChange: (e) => setTempName(e.target.value),
				onBlur: () => {
					const trimmedName = tempName.trim();
					if (trimmedName && trimmedName !== effectiveName) handleFieldChange("name", trimmedName);
					setIsEditingName(false);
				},
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						const trimmedName = tempName.trim();
						if (trimmedName && trimmedName !== effectiveName) handleFieldChange("name", trimmedName);
						setIsEditingName(false);
					} else if (e.key === "Escape") {
						setTempName(effectiveName);
						setIsEditingName(false);
					}
				},
				size: "small",
				inputProps: { "aria-label": t("userTypes:edit.nameInputAriaLabel", "User type name") }
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "h3",
				children: effectiveName
			}), !userType.isReadOnly && /* @__PURE__ */ jsx(IconButton, {
				size: "small",
				"aria-label": t("userTypes:edit.editName", "Edit user type name"),
				onClick: () => {
					setTempName(effectiveName);
					setIsEditingName(true);
				},
				sx: {
					opacity: .6,
					"&:hover": { opacity: 1 }
				},
				children: /* @__PURE__ */ jsx(Edit, { size: 16 })
			})] })
		}) })] }),
		/* @__PURE__ */ jsxs(Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": "user type settings tabs",
			children: [/* @__PURE__ */ jsx(Tab, {
				label: t("userTypes:edit.tabs.general", "General"),
				id: "usertype-tab-0",
				"aria-controls": "usertype-tabpanel-0",
				sx: { textTransform: "none" }
			}), /* @__PURE__ */ jsx(Tab, {
				label: t("userTypes:edit.tabs.schema", "Schema"),
				id: "usertype-tab-1",
				"aria-controls": "usertype-tabpanel-1",
				sx: { textTransform: "none" }
			})]
		}),
		/* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(TabPanel, {
			value: activeTab,
			index: 0,
			children: /* @__PURE__ */ jsx(EditGeneralSettings, {
				userType,
				editedOuId: editedUserType.ouId,
				editedAllowSelfRegistration: editedUserType.allowSelfRegistration,
				editedDisplayAttribute: editedUserType.displayAttribute,
				onFieldChange: handleFieldChange,
				onDeleteClick: userType.isReadOnly ? void 0 : () => setDeleteDialogOpen(true),
				eligibleDisplayProperties
			})
		}), /* @__PURE__ */ jsx(TabPanel, {
			value: activeTab,
			index: 1,
			children: /* @__PURE__ */ jsx(EditSchemaSettings, {
				properties: effectiveProperties,
				onPropertiesChange: handlePropertiesChange,
				userTypeName: effectiveName,
				disabled: userType.isReadOnly
			})
		})] }),
		/* @__PURE__ */ jsx(UserTypeDeleteDialog, {
			open: deleteDialogOpen,
			userTypeId: id ?? null,
			onClose: () => setDeleteDialogOpen(false),
			onSuccess: handleDeleteSuccess
		}),
		hasChanges && /* @__PURE__ */ jsx(UnsavedChangesBar, {
			message: t("userTypes:edit.unsavedChanges", "You have unsaved changes"),
			resetLabel: t("common:actions.reset", "Reset"),
			saveLabel: t("common:actions.save", "Save"),
			savingLabel: t("common:status.saving", "Saving..."),
			isSaving: updateUserTypeMutation.isPending,
			saveDisabled: userType.isReadOnly === true,
			onReset: handleReset,
			onSave: () => {
				handleSave().catch(() => null);
			}
		})
	] });
}

//#endregion
export { ViewUserTypePage as default };