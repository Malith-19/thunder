const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useGetOrganizationUnit = require('../api/useGetOrganizationUnit.cjs');
const require_useUpdateOrganizationUnit = require('../api/useUpdateOrganizationUnit.cjs');
const require_OrganizationUnitDeleteDialog = require('../components/OrganizationUnitDeleteDialog.cjs');
const require_useOrganizationUnit = require('../contexts/useOrganizationUnit.cjs');
const require_EditChildOrganizationUnitSettings = require('../components/edit-organization-unit/child-organization-unit-settings/EditChildOrganizationUnitSettings.cjs');
const require_EditCustomizationSettings = require('../components/edit-organization-unit/customization-settings/EditCustomizationSettings.cjs');
const require_EditGeneralSettings = require('../components/edit-organization-unit/general-settings/EditGeneralSettings.cjs');
const require_EditGroupSettings = require('../components/edit-organization-unit/group-settings/EditGroupSettings.cjs');
const require_EditUserSettings = require('../components/edit-organization-unit/user-settings/EditUserSettings.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/pages/OrganizationUnitEditPage.tsx
function TabPanel({ children = null, value, index,...other }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		role: "tabpanel",
		hidden: value !== index,
		id: `ou-tabpanel-${index}`,
		"aria-labelledby": `ou-tab-${index}`,
		...other,
		children: value === index && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: { py: 3 },
			children
		})
	});
}
function OrganizationUnitEditPage() {
	const { id } = (0, react_router.useParams)();
	const navigate = (0, react_router.useNavigate)();
	const location = (0, react_router.useLocation)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("OrganizationUnitEditPage");
	const fromOU = location.state?.fromOU;
	const { data: organizationUnit, isLoading, error: fetchError, refetch } = require_useGetOrganizationUnit.default(id);
	const updateOrganizationUnit = require_useUpdateOrganizationUnit.default();
	const { resetTreeState } = require_useOrganizationUnit.default();
	const [activeTab, setActiveTab] = (0, react.useState)(0);
	const [editedOU, setEditedOU] = (0, react.useState)({});
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const [snackbar, setSnackbar] = (0, react.useState)({
		open: false,
		message: ""
	});
	const [isEditingName, setIsEditingName] = (0, react.useState)(false);
	const [isEditingDescription, setIsEditingDescription] = (0, react.useState)(false);
	const [tempName, setTempName] = (0, react.useState)("");
	const [tempDescription, setTempDescription] = (0, react.useState)("");
	const listUrl = "/organization-units";
	const handleBack = async () => {
		if (fromOU) await navigate(`/organization-units/${fromOU.id}`);
		else await navigate(listUrl);
	};
	const backButtonText = fromOU ? t("organizationUnits:edit.page.backToOU", { name: fromOU.name }) : t("organizationUnits:edit.page.back");
	const handleTabChange = (_event, newValue) => {
		setActiveTab(newValue);
	};
	const handleFieldChange = (0, react.useCallback)((field, value) => {
		setEditedOU((prev) => ({
			...prev,
			[field]: value
		}));
	}, []);
	const handleSave = (0, react.useCallback)(async () => {
		if (!organizationUnit || !id) return;
		const updatedData = {
			handle: editedOU.handle ?? organizationUnit.handle,
			name: editedOU.name ?? organizationUnit.name,
			description: editedOU.description !== void 0 ? editedOU.description : organizationUnit.description,
			parent: organizationUnit.parent ?? null,
			themeId: editedOU.themeId !== void 0 ? editedOU.themeId : organizationUnit.themeId,
			logoUrl: editedOU.logoUrl ?? organizationUnit.logoUrl
		};
		try {
			await updateOrganizationUnit.mutateAsync({
				id,
				data: updatedData
			});
			resetTreeState();
			setEditedOU({});
			await refetch();
		} catch {
			logger.error("Failed to update organization unit");
		}
	}, [
		organizationUnit,
		id,
		editedOU,
		updateOrganizationUnit,
		resetTreeState,
		refetch,
		logger
	]);
	const hasChanges = (0, react.useMemo)(() => Object.keys(editedOU).length > 0, [editedOU]);
	const handleDeleteSuccess = () => {
		resetTreeState();
		(async () => {
			await navigate(listUrl);
		})().catch((_error) => {
			logger.error("Failed to navigate after deleting organization unit", { error: _error });
		});
	};
	const handleDeleteError = (message) => {
		setSnackbar({
			open: true,
			message
		});
	};
	if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	if (fetchError) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: fetchError.message ?? t("organizationUnits:edit.page.error")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch((error) => {
				logger.error("Failed to navigate back", { error });
			});
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("organizationUnits:edit.page.back")
	})] });
	if (!organizationUnit) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("organizationUnits:edit.page.notFound")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch((error) => {
				logger.error("Failed to navigate back", { error });
			});
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("organizationUnits:edit.page.back")
	})] });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.BackButton, {
				component: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.Link, { to: fromOU ? `/organization-units/${fromOU.id}` : listUrl }),
				children: backButtonText
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Avatar, {
				sx: { overflow: "visible" },
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.ResourceAvatar, {
					editable: true,
					value: editedOU.logoUrl ?? organizationUnit.logoUrl ?? void 0,
					fallback: "emoji:🏛️",
					editAriaLabel: t("organizationUnits:edit.page.logoUpdate.label"),
					onSelect: (newLogoUrl) => setEditedOU((prev) => ({
						...prev,
						logoUrl: newLogoUrl
					}))
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				mb: 1,
				children: isEditingName ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					value: tempName,
					onChange: (e) => setTempName(e.target.value),
					onBlur: () => {
						if (tempName.trim()) handleFieldChange("name", tempName.trim());
						setIsEditingName(false);
					},
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							if (tempName.trim()) handleFieldChange("name", tempName.trim());
							setIsEditingName(false);
						} else if (e.key === "Escape") {
							setTempName(editedOU.name ?? organizationUnit.name);
							setIsEditingName(false);
						}
					},
					size: "small"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "h3",
					children: editedOU.name ?? organizationUnit.name
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					onClick: () => {
						setTempName(editedOU.name ?? organizationUnit.name);
						setIsEditingName(true);
					},
					sx: {
						opacity: .6,
						"&:hover": { opacity: 1 }
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Edit, { size: 16 })
				})] })
			}) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.SubHeader, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "flex-start",
				spacing: 1,
				children: isEditingDescription ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					fullWidth: true,
					multiline: true,
					rows: 2,
					value: tempDescription,
					onChange: (e) => setTempDescription(e.target.value),
					onBlur: () => {
						const trimmedDescription = tempDescription.trim();
						if (trimmedDescription !== (organizationUnit.description ?? "")) handleFieldChange("description", trimmedDescription || null);
						setIsEditingDescription(false);
					},
					onKeyDown: (e) => {
						if (e.key === "Enter" && e.ctrlKey) {
							const trimmedDescription = tempDescription.trim();
							if (trimmedDescription !== (organizationUnit.description ?? "")) handleFieldChange("description", trimmedDescription || null);
							setIsEditingDescription(false);
						} else if (e.key === "Escape") {
							setTempDescription((editedOU.description !== void 0 ? editedOU.description : organizationUnit.description) ?? "");
							setIsEditingDescription(false);
						}
					},
					size: "small",
					placeholder: t("organizationUnits:edit.page.description.placeholder"),
					sx: {
						maxWidth: "600px",
						"& .MuiInputBase-root": { fontSize: "0.875rem" }
					}
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					color: "text.secondary",
					children: (editedOU.description !== void 0 ? editedOU.description : organizationUnit.description) ?? t("organizationUnits:edit.page.description.empty")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					onClick: () => {
						setTempDescription((editedOU.description !== void 0 ? editedOU.description : organizationUnit.description) ?? "");
						setIsEditingDescription(true);
					},
					sx: {
						opacity: .6,
						"&:hover": { opacity: 1 },
						mt: -.5
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Edit, { size: 14 })
				})] })
			}) })
		] }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": "organization unit settings tabs",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
					label: t("organizationUnits:edit.page.tabs.general"),
					id: "ou-tab-0",
					"aria-controls": "ou-tabpanel-0",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
					label: t("organizationUnits:edit.page.tabs.childOUs"),
					id: "ou-tab-1",
					"aria-controls": "ou-tabpanel-1",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
					label: t("organizationUnits:edit.page.tabs.users"),
					id: "ou-tab-2",
					"aria-controls": "ou-tabpanel-2",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
					label: t("organizationUnits:edit.page.tabs.groups"),
					id: "ou-tab-3",
					"aria-controls": "ou-tabpanel-3",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
					label: t("organizationUnits:edit.page.tabs.customization"),
					id: "ou-tab-4",
					"aria-controls": "ou-tabpanel-4",
					sx: { textTransform: "none" }
				})
			]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
				value: activeTab,
				index: 0,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditGeneralSettings.default, {
					organizationUnit,
					onDeleteClick: () => setDeleteDialogOpen(true)
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
				value: activeTab,
				index: 1,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditChildOrganizationUnitSettings.default, {
					organizationUnitId: id,
					organizationUnitName: organizationUnit.name
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
				value: activeTab,
				index: 2,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditUserSettings.default, { organizationUnitId: id })
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
				value: activeTab,
				index: 3,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditGroupSettings.default, { organizationUnitId: id })
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
				value: activeTab,
				index: 4,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditCustomizationSettings.default, {
					organizationUnit,
					editedOU,
					onFieldChange: handleFieldChange
				})
			})
		] }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationUnitDeleteDialog.default, {
			open: deleteDialogOpen,
			organizationUnitId: id ?? null,
			onClose: () => setDeleteDialogOpen(false),
			onSuccess: handleDeleteSuccess,
			onError: handleDeleteError
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Snackbar, {
			open: snackbar.open,
			autoHideDuration: 6e3,
			onClose: () => setSnackbar((prev) => ({
				...prev,
				open: false
			})),
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				onClose: () => setSnackbar((prev) => ({
					...prev,
					open: false
				})),
				severity: "error",
				sx: { width: "100%" },
				children: snackbar.message
			})
		}),
		hasChanges && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.UnsavedChangesBar, {
			message: t("organizationUnits:edit.actions.unsavedChanges.label"),
			resetLabel: t("organizationUnits:edit.actions.reset.label"),
			saveLabel: t("organizationUnits:edit.actions.save.label"),
			savingLabel: t("organizationUnits:edit.actions.saving.label"),
			isSaving: updateOrganizationUnit.isPending,
			onReset: () => setEditedOU({}),
			onSave: () => {
				handleSave().catch(() => null);
			}
		})
	] });
}

//#endregion
exports.default = OrganizationUnitEditPage;