const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useGetUserType = require('../api/useGetUserType.cjs');
const require_useUpdateUserType = require('../api/useUpdateUserType.cjs');
const require_UserTypeDeleteDialog = require('../components/edit-user-type/UserTypeDeleteDialog.cjs');
const require_EditGeneralSettings = require('../components/edit-user-type/general-settings/EditGeneralSettings.cjs');
const require_EditSchemaSettings = require('../components/edit-user-type/schema-settings/EditSchemaSettings.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);

//#region src/pages/ViewUserTypePage.tsx
function TabPanel({ children = null, value, index,...other }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		role: "tabpanel",
		hidden: value !== index,
		id: `usertype-tabpanel-${index}`,
		"aria-labelledby": `usertype-tab-${index}`,
		...other,
		children: value === index && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
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
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("ViewUserTypePage");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const { id } = (0, react_router.useParams)();
	const listUrl = "/user-types";
	const { data: userType, isLoading, error: fetchError } = require_useGetUserType.default(id);
	const updateUserTypeMutation = require_useUpdateUserType.default();
	const [activeTab, setActiveTab] = (0, react.useState)(0);
	const [isEditingName, setIsEditingName] = (0, react.useState)(false);
	const [tempName, setTempName] = (0, react.useState)("");
	const [editedUserType, setEditedUserType] = (0, react.useState)({});
	const [editedProperties, setEditedProperties] = (0, react.useState)(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const baseProperties = (0, react.useMemo)(() => userType ? convertSchemaToProperties(userType.schema) : [], [userType]);
	const effectiveProperties = editedProperties ?? baseProperties;
	const effectiveName = editedUserType.name ?? userType?.name ?? "";
	const eligibleDisplayProperties = (0, react.useMemo)(() => effectiveProperties.filter((p) => (p.type === "string" || p.type === "number" || p.type === "enum") && !p.credential && p.name.trim().length > 0), [effectiveProperties]);
	const effectiveDisplayAttribute = editedUserType.displayAttribute ?? userType?.systemAttributes?.display ?? "";
	const [prevEligible, setPrevEligible] = (0, react.useState)(eligibleDisplayProperties);
	if (prevEligible !== eligibleDisplayProperties) {
		setPrevEligible(eligibleDisplayProperties);
		if (effectiveDisplayAttribute) {
			if (!eligibleDisplayProperties.map((p) => p.name.trim()).includes(effectiveDisplayAttribute)) setEditedUserType((prev) => ({
				...prev,
				displayAttribute: ""
			}));
		}
	}
	const hasChanges = (0, react.useMemo)(() => Object.keys(editedUserType).length > 0 || editedProperties !== null, [editedUserType, editedProperties]);
	const handleBack = async () => {
		await navigate(listUrl);
	};
	const handleTabChange = (_event, newValue) => {
		setActiveTab(newValue);
	};
	const handleFieldChange = (0, react.useCallback)((field, value) => {
		setEditedUserType((prev) => ({
			...prev,
			[field]: value
		}));
	}, []);
	const handlePropertiesChange = (0, react.useCallback)((newProperties) => {
		setEditedProperties(newProperties);
	}, []);
	const handleReset = (0, react.useCallback)(() => {
		setEditedUserType({});
		setEditedProperties(null);
		updateUserTypeMutation.reset();
	}, [updateUserTypeMutation]);
	const handleSave = (0, react.useCallback)(async () => {
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
	if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	if (fetchError) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: fetchError.message ?? t("userTypes:edit.loadError", "Failed to load user type information")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("userTypes:edit.back", "Back to User Types")
	})] });
	if (!userType) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("userTypes:edit.notFound", "User type not found")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("userTypes:edit.back", "Back to User Types")
	})] });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [
		userType.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
			severity: "info",
			sx: { mb: 2 },
			children: t("common:messages.readOnlyResource", "This resource is read-only and cannot be modified.")
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.BackButton, {
			component: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.Link, { to: listUrl }),
			children: t("userTypes:edit.back", "Back to User Types")
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
			direction: "row",
			alignItems: "center",
			spacing: 1,
			mb: 1,
			children: isEditingName ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
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
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h3",
				children: effectiveName
			}), !userType.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
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
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Edit, { size: 16 })
			})] })
		}) })] }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": "user type settings tabs",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
				label: t("userTypes:edit.tabs.general", "General"),
				id: "usertype-tab-0",
				"aria-controls": "usertype-tabpanel-0",
				sx: { textTransform: "none" }
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
				label: t("userTypes:edit.tabs.schema", "Schema"),
				id: "usertype-tab-1",
				"aria-controls": "usertype-tabpanel-1",
				sx: { textTransform: "none" }
			})]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
			value: activeTab,
			index: 0,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditGeneralSettings.default, {
				userType,
				editedOuId: editedUserType.ouId,
				editedAllowSelfRegistration: editedUserType.allowSelfRegistration,
				editedDisplayAttribute: editedUserType.displayAttribute,
				onFieldChange: handleFieldChange,
				onDeleteClick: userType.isReadOnly ? void 0 : () => setDeleteDialogOpen(true),
				eligibleDisplayProperties
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
			value: activeTab,
			index: 1,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditSchemaSettings.default, {
				properties: effectiveProperties,
				onPropertiesChange: handlePropertiesChange,
				userTypeName: effectiveName,
				disabled: userType.isReadOnly
			})
		})] }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UserTypeDeleteDialog.default, {
			open: deleteDialogOpen,
			userTypeId: id ?? null,
			onClose: () => setDeleteDialogOpen(false),
			onSuccess: handleDeleteSuccess
		}),
		hasChanges && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.UnsavedChangesBar, {
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
exports.default = ViewUserTypePage;