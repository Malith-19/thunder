const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useGetResourceServer = require('../api/useGetResourceServer.cjs');
const require_useUpdateResourceServer = require('../api/useUpdateResourceServer.cjs');
const require_ResourceServerDeleteDialog = require('../components/ResourceServerDeleteDialog.cjs');
const require_resource_server_types = require('../config/resource-server-types.cjs');
const require_AdvancedTab = require('../components/resource-server-detail/AdvancedTab.cjs');
const require_ResourceTree = require('../components/resource-tree/ResourceTree.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);

//#region src/pages/ResourceServerEditPage.tsx
function TabPanel({ children = void 0, value, index }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		role: "tabpanel",
		hidden: value !== index,
		sx: {
			pt: 3,
			height: value === index ? "auto" : 0,
			overflow: "hidden"
		},
		children: value === index && children
	});
}
const TAB_RESOURCES = 0;
const TAB_ADVANCED = 1;
function ResourceServerEditPage() {
	const { resourceServerId } = (0, react_router.useParams)();
	const [searchParams] = (0, react_router.useSearchParams)();
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("ResourceServerEditPage");
	const { data: resourceServer, isLoading, error, refetch } = require_useGetResourceServer.default(resourceServerId ?? "");
	const updateRs = require_useUpdateResourceServer.default();
	const [activeTab, setActiveTab] = (0, react.useState)(searchParams.get("tab") === "advanced" ? TAB_ADVANCED : TAB_RESOURCES);
	const [editedFields, setEditedFields] = (0, react.useState)({});
	const [isEditingName, setIsEditingName] = (0, react.useState)(false);
	const [isEditingDescription, setIsEditingDescription] = (0, react.useState)(false);
	const [tempName, setTempName] = (0, react.useState)("");
	const [tempDescription, setTempDescription] = (0, react.useState)("");
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const handleTabChange = (_e, newValue) => {
		setActiveTab(newValue);
	};
	const handleFieldChange = (field, value) => {
		if (!resourceServer) return;
		if (value === (field === "name" ? resourceServer.name : resourceServer.description ?? "")) setEditedFields((prev) => {
			const next = { ...prev };
			delete next[field];
			return next;
		});
		else setEditedFields((prev) => ({
			...prev,
			[field]: value
		}));
	};
	const hasChanges = Object.keys(editedFields).length > 0;
	const handleSave = () => {
		if (!resourceServer) return;
		updateRs.mutate({
			id: resourceServer.id,
			data: {
				name: editedFields.name ?? resourceServer.name,
				description: "description" in editedFields ? editedFields.description?.trim() ? editedFields.description : null : resourceServer.description ?? null
			}
		}, {
			onSuccess: () => {
				setEditedFields({});
				refetch();
			},
			onError: (err) => {
				logger.error("Failed to update resource server", { error: err });
				showToast(t("resourceServers:edit.saveError", "Failed to save changes."), "error");
			}
		});
	};
	const listUrl = "/resource-servers";
	if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	if (error || !resourceServer) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: error?.message ?? t("resourceServers:edit.notFound", "Resource server not found.")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		onClick: () => {
			(async () => {
				await navigate(listUrl);
			})().catch((err) => {
				logger.error("Failed to navigate back", { error: err });
			});
		},
		children: t("resourceServers:edit.back", "Back to resource servers")
	})] });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [
		resourceServer.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
			severity: "info",
			sx: { mb: 2 },
			children: t("common:messages.readOnlyResource", "This resource is read-only and cannot be modified.")
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.BackButton, {
				component: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.Link, { to: listUrl }),
				children: t("resourceServers:edit.back", "Back to resource servers")
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
						} else if (e.key === "Escape") setIsEditingName(false);
					},
					size: "small"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "h3",
					children: editedFields.name ?? resourceServer.name
				}), !resourceServer.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					onClick: () => {
						setTempName(editedFields.name ?? resourceServer.name);
						setIsEditingName(true);
					},
					sx: {
						opacity: .6,
						"&:hover": { opacity: 1 }
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Edit, { size: 16 })
				})] })
			}) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle.SubHeader, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
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
						if (trimmedDescription !== (editedFields.description ?? resourceServer.description ?? "")) handleFieldChange("description", trimmedDescription);
						setIsEditingDescription(false);
					},
					onKeyDown: (e) => {
						if (e.key === "Enter" && e.ctrlKey) {
							const trimmedDescription = tempDescription.trim();
							if (trimmedDescription !== (editedFields.description ?? resourceServer.description ?? "")) handleFieldChange("description", trimmedDescription);
							setIsEditingDescription(false);
						} else if (e.key === "Escape") setIsEditingDescription(false);
					},
					size: "small",
					placeholder: t("resourceServers:edit.descriptionPlaceholder", "Add a description"),
					sx: {
						maxWidth: "600px",
						"& .MuiInputBase-root": { fontSize: "0.875rem" }
					}
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					color: "text.secondary",
					children: editedFields.description ?? resourceServer.description ?? t("resourceServers:edit.noDescription", "No description")
				}), !resourceServer.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					onClick: () => {
						setTempDescription(editedFields.description ?? resourceServer.description ?? "");
						setIsEditingDescription(true);
					},
					sx: {
						opacity: .6,
						"&:hover": { opacity: 1 },
						mt: -.5
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Edit, { size: 14 })
				})] })
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					mt: 1,
					display: "flex",
					gap: 1,
					alignItems: "center"
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						label: require_resource_server_types.getResourceServerTypeLabel(resourceServer.type, t),
						size: "small",
						variant: "outlined",
						icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
							sx: {
								display: "flex",
								alignItems: "center",
								"& > *": {
									width: 16,
									height: 16
								}
							},
							children: require_resource_server_types.getResourceServerTypeIcon(resourceServer.type)
						})
					}),
					resourceServer.handle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						label: resourceServer.handle,
						size: "small",
						sx: { fontFamily: "monospace" }
					}),
					resourceServer.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						label: t("resourceServers:edit.systemResourceServer", "System"),
						size: "small",
						color: "default"
					})
				]
			})] })
		] }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": t("resourceServers:edit.tabs", "Resource server settings"),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
				label: t("resourceServers:edit.tab.resources", "Resources"),
				id: "resource-server-tab-0",
				"aria-controls": "resource-server-tabpanel-0",
				sx: { textTransform: "none" }
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
				label: t("resourceServers:edit.tab.advanced", "Advanced Settings"),
				id: "resource-server-tab-1",
				"aria-controls": "resource-server-tabpanel-1",
				sx: { textTransform: "none" }
			})]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(TabPanel, {
			value: activeTab,
			index: TAB_RESOURCES,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						height: "calc(100vh - 540px)",
						minHeight: 300
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ResourceTree.default, {
						resourceServer,
						onRefresh: () => {
							refetch();
						}
					})
				}),
				!resourceServer.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
					title: t("resourceServers:edit.dangerZone.title", "Danger Zone"),
					description: t("resourceServers:edit.dangerZone.description", "Irreversible actions for this resource server."),
					slotProps: { root: { sx: {
						borderColor: "error.main",
						mt: 3
					} } },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
						variant: "outlined",
						color: "error",
						onClick: () => setDeleteDialogOpen(true),
						children: t("resourceServers:edit.dangerZone.deleteServer", "Delete resource server")
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ResourceServerDeleteDialog.default, {
					open: deleteDialogOpen,
					resourceServer,
					onClose: () => setDeleteDialogOpen(false),
					onSuccess: () => {
						(async () => {
							await navigate(listUrl);
						})().catch((err) => {
							logger.error("Failed to navigate after delete", { error: err });
						});
					}
				})
			]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
			value: activeTab,
			index: TAB_ADVANCED,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_AdvancedTab.default, {
				resourceServer,
				onRefresh: () => {
					refetch();
				}
			}, resourceServer.id)
		}),
		hasChanges && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.UnsavedChangesBar, {
			message: t("resourceServers:edit.unsavedChanges", "You have unsaved changes."),
			resetLabel: t("common:discard", "Discard"),
			saveLabel: t("common:save", "Save"),
			savingLabel: t("common:saving", "Saving…"),
			isSaving: updateRs.isPending,
			saveDisabled: resourceServer.isReadOnly,
			onReset: () => setEditedFields({}),
			onSave: handleSave
		})
	] });
}

//#endregion
exports.default = ResourceServerEditPage;