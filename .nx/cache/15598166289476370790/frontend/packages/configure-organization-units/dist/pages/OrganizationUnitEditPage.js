import useGetOrganizationUnit from "../api/useGetOrganizationUnit.js";
import useUpdateOrganizationUnit from "../api/useUpdateOrganizationUnit.js";
import OrganizationUnitDeleteDialog from "../components/OrganizationUnitDeleteDialog.js";
import useOrganizationUnit from "../contexts/useOrganizationUnit.js";
import EditChildOrganizationUnitSettings from "../components/edit-organization-unit/child-organization-unit-settings/EditChildOrganizationUnitSettings.js";
import EditCustomizationSettings from "../components/edit-organization-unit/customization-settings/EditCustomizationSettings.js";
import EditGeneralSettings from "../components/edit-organization-unit/general-settings/EditGeneralSettings.js";
import EditGroupSettings from "../components/edit-organization-unit/group-settings/EditGroupSettings.js";
import EditUserSettings from "../components/edit-organization-unit/user-settings/EditUserSettings.js";
import { useTranslation } from "react-i18next";
import { Alert, Box, Button, CircularProgress, IconButton, PageContent, PageTitle, Snackbar, Stack, Tab, Tabs, TextField, Typography } from "@wso2/oxygen-ui";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ResourceAvatar, UnsavedChangesBar } from "@thunderid/components";
import { useLogger } from "@thunderid/logger/react";
import { ArrowLeft, Edit } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";

//#region src/pages/OrganizationUnitEditPage.tsx
function TabPanel({ children = null, value, index,...other }) {
	return /* @__PURE__ */ jsx("div", {
		role: "tabpanel",
		hidden: value !== index,
		id: `ou-tabpanel-${index}`,
		"aria-labelledby": `ou-tab-${index}`,
		...other,
		children: value === index && /* @__PURE__ */ jsx(Box, {
			sx: { py: 3 },
			children
		})
	});
}
function OrganizationUnitEditPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const logger = useLogger("OrganizationUnitEditPage");
	const fromOU = location.state?.fromOU;
	const { data: organizationUnit, isLoading, error: fetchError, refetch } = useGetOrganizationUnit(id);
	const updateOrganizationUnit = useUpdateOrganizationUnit();
	const { resetTreeState } = useOrganizationUnit();
	const [activeTab, setActiveTab] = useState(0);
	const [editedOU, setEditedOU] = useState({});
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: ""
	});
	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [tempName, setTempName] = useState("");
	const [tempDescription, setTempDescription] = useState("");
	const listUrl = "/organization-units";
	const handleBack = async () => {
		if (fromOU) await navigate(`/organization-units/${fromOU.id}`);
		else await navigate(listUrl);
	};
	const backButtonText = fromOU ? t("organizationUnits:edit.page.backToOU", { name: fromOU.name }) : t("organizationUnits:edit.page.back");
	const handleTabChange = (_event, newValue) => {
		setActiveTab(newValue);
	};
	const handleFieldChange = useCallback((field, value) => {
		setEditedOU((prev) => ({
			...prev,
			[field]: value
		}));
	}, []);
	const handleSave = useCallback(async () => {
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
	const hasChanges = useMemo(() => Object.keys(editedOU).length > 0, [editedOU]);
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
	if (isLoading) return /* @__PURE__ */ jsx(Box, {
		sx: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "400px"
		},
		children: /* @__PURE__ */ jsx(CircularProgress, {})
	});
	if (fetchError) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: fetchError.message ?? t("organizationUnits:edit.page.error")
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch((error) => {
				logger.error("Failed to navigate back", { error });
			});
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("organizationUnits:edit.page.back")
	})] });
	if (!organizationUnit) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("organizationUnits:edit.page.notFound")
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch((error) => {
				logger.error("Failed to navigate back", { error });
			});
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("organizationUnits:edit.page.back")
	})] });
	return /* @__PURE__ */ jsxs(PageContent, { children: [
		/* @__PURE__ */ jsxs(PageTitle, { children: [
			/* @__PURE__ */ jsx(PageTitle.BackButton, {
				component: /* @__PURE__ */ jsx(Link, { to: fromOU ? `/organization-units/${fromOU.id}` : listUrl }),
				children: backButtonText
			}),
			/* @__PURE__ */ jsx(PageTitle.Avatar, {
				sx: { overflow: "visible" },
				children: /* @__PURE__ */ jsx(ResourceAvatar, {
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
			/* @__PURE__ */ jsx(PageTitle.Header, { children: /* @__PURE__ */ jsx(Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				mb: 1,
				children: isEditingName ? /* @__PURE__ */ jsx(TextField, {
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
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h3",
					children: editedOU.name ?? organizationUnit.name
				}), /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					onClick: () => {
						setTempName(editedOU.name ?? organizationUnit.name);
						setIsEditingName(true);
					},
					sx: {
						opacity: .6,
						"&:hover": { opacity: 1 }
					},
					children: /* @__PURE__ */ jsx(Edit, { size: 16 })
				})] })
			}) }),
			/* @__PURE__ */ jsx(PageTitle.SubHeader, { children: /* @__PURE__ */ jsx(Stack, {
				direction: "row",
				alignItems: "flex-start",
				spacing: 1,
				children: isEditingDescription ? /* @__PURE__ */ jsx(TextField, {
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
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					children: (editedOU.description !== void 0 ? editedOU.description : organizationUnit.description) ?? t("organizationUnits:edit.page.description.empty")
				}), /* @__PURE__ */ jsx(IconButton, {
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
					children: /* @__PURE__ */ jsx(Edit, { size: 14 })
				})] })
			}) })
		] }),
		/* @__PURE__ */ jsxs(Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": "organization unit settings tabs",
			children: [
				/* @__PURE__ */ jsx(Tab, {
					label: t("organizationUnits:edit.page.tabs.general"),
					id: "ou-tab-0",
					"aria-controls": "ou-tabpanel-0",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ jsx(Tab, {
					label: t("organizationUnits:edit.page.tabs.childOUs"),
					id: "ou-tab-1",
					"aria-controls": "ou-tabpanel-1",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ jsx(Tab, {
					label: t("organizationUnits:edit.page.tabs.users"),
					id: "ou-tab-2",
					"aria-controls": "ou-tabpanel-2",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ jsx(Tab, {
					label: t("organizationUnits:edit.page.tabs.groups"),
					id: "ou-tab-3",
					"aria-controls": "ou-tabpanel-3",
					sx: { textTransform: "none" }
				}),
				/* @__PURE__ */ jsx(Tab, {
					label: t("organizationUnits:edit.page.tabs.customization"),
					id: "ou-tab-4",
					"aria-controls": "ou-tabpanel-4",
					sx: { textTransform: "none" }
				})
			]
		}),
		/* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsx(TabPanel, {
				value: activeTab,
				index: 0,
				children: /* @__PURE__ */ jsx(EditGeneralSettings, {
					organizationUnit,
					onDeleteClick: () => setDeleteDialogOpen(true)
				})
			}),
			/* @__PURE__ */ jsx(TabPanel, {
				value: activeTab,
				index: 1,
				children: /* @__PURE__ */ jsx(EditChildOrganizationUnitSettings, {
					organizationUnitId: id,
					organizationUnitName: organizationUnit.name
				})
			}),
			/* @__PURE__ */ jsx(TabPanel, {
				value: activeTab,
				index: 2,
				children: /* @__PURE__ */ jsx(EditUserSettings, { organizationUnitId: id })
			}),
			/* @__PURE__ */ jsx(TabPanel, {
				value: activeTab,
				index: 3,
				children: /* @__PURE__ */ jsx(EditGroupSettings, { organizationUnitId: id })
			}),
			/* @__PURE__ */ jsx(TabPanel, {
				value: activeTab,
				index: 4,
				children: /* @__PURE__ */ jsx(EditCustomizationSettings, {
					organizationUnit,
					editedOU,
					onFieldChange: handleFieldChange
				})
			})
		] }),
		/* @__PURE__ */ jsx(OrganizationUnitDeleteDialog, {
			open: deleteDialogOpen,
			organizationUnitId: id ?? null,
			onClose: () => setDeleteDialogOpen(false),
			onSuccess: handleDeleteSuccess,
			onError: handleDeleteError
		}),
		/* @__PURE__ */ jsx(Snackbar, {
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
			children: /* @__PURE__ */ jsx(Alert, {
				onClose: () => setSnackbar((prev) => ({
					...prev,
					open: false
				})),
				severity: "error",
				sx: { width: "100%" },
				children: snackbar.message
			})
		}),
		hasChanges && /* @__PURE__ */ jsx(UnsavedChangesBar, {
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
export { OrganizationUnitEditPage as default };