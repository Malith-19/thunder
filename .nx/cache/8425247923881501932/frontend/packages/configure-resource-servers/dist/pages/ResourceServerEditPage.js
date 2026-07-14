import useGetResourceServer from "../api/useGetResourceServer.js";
import useUpdateResourceServer from "../api/useUpdateResourceServer.js";
import ResourceServerDeleteDialog from "../components/ResourceServerDeleteDialog.js";
import { getResourceServerTypeIcon, getResourceServerTypeLabel } from "../config/resource-server-types.js";
import AdvancedTab from "../components/resource-server-detail/AdvancedTab.js";
import ResourceTree from "../components/resource-tree/ResourceTree.js";
import { useToast } from "@thunderid/contexts";
import { Alert, Box, Button, Chip, IconButton, PageContent, PageTitle, Stack, Tab, Tabs, TextField, Typography } from "@wso2/oxygen-ui";
import { ArrowLeft, Edit } from "@wso2/oxygen-ui-icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { PageLoadingAnimation, SettingsCard, UnsavedChangesBar } from "@thunderid/components";

//#region src/pages/ResourceServerEditPage.tsx
function TabPanel({ children = void 0, value, index }) {
	return /* @__PURE__ */ jsx(Box, {
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
	const { resourceServerId } = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("ResourceServerEditPage");
	const { data: resourceServer, isLoading, error, refetch } = useGetResourceServer(resourceServerId ?? "");
	const updateRs = useUpdateResourceServer();
	const [activeTab, setActiveTab] = useState(searchParams.get("tab") === "advanced" ? TAB_ADVANCED : TAB_RESOURCES);
	const [editedFields, setEditedFields] = useState({});
	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [tempName, setTempName] = useState("");
	const [tempDescription, setTempDescription] = useState("");
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
				description: "description" in editedFields ? editedFields.description?.trim() ? editedFields.description : null : resourceServer.description ?? null,
				ouId: resourceServer.ouId
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
	if (isLoading) return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	if (error || !resourceServer) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: error?.message ?? t("resourceServers:edit.notFound", "Resource server not found.")
	}), /* @__PURE__ */ jsx(Button, {
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		onClick: () => {
			(async () => {
				await navigate(listUrl);
			})().catch((err) => {
				logger.error("Failed to navigate back", { error: err });
			});
		},
		children: t("resourceServers:edit.back", "Back to resource servers")
	})] });
	return /* @__PURE__ */ jsxs(PageContent, { children: [
		resourceServer.isReadOnly && /* @__PURE__ */ jsx(Alert, {
			severity: "info",
			sx: { mb: 2 },
			children: t("common:messages.readOnlyResource", "This resource is read-only and cannot be modified.")
		}),
		/* @__PURE__ */ jsxs(PageTitle, { children: [
			/* @__PURE__ */ jsx(PageTitle.BackButton, {
				component: /* @__PURE__ */ jsx(Link, { to: listUrl }),
				children: t("resourceServers:edit.back", "Back to resource servers")
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
						} else if (e.key === "Escape") setIsEditingName(false);
					},
					size: "small"
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h3",
					children: editedFields.name ?? resourceServer.name
				}), !resourceServer.isReadOnly && /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					onClick: () => {
						setTempName(editedFields.name ?? resourceServer.name);
						setIsEditingName(true);
					},
					sx: {
						opacity: .6,
						"&:hover": { opacity: 1 }
					},
					children: /* @__PURE__ */ jsx(Edit, { size: 16 })
				})] })
			}) }),
			/* @__PURE__ */ jsxs(PageTitle.SubHeader, { children: [/* @__PURE__ */ jsx(Stack, {
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
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					children: editedFields.description ?? resourceServer.description ?? t("resourceServers:edit.noDescription", "No description")
				}), !resourceServer.isReadOnly && /* @__PURE__ */ jsx(IconButton, {
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
					children: /* @__PURE__ */ jsx(Edit, { size: 14 })
				})] })
			}), /* @__PURE__ */ jsxs(Box, {
				sx: {
					mt: 1,
					display: "flex",
					gap: 1,
					alignItems: "center"
				},
				children: [
					/* @__PURE__ */ jsx(Chip, {
						label: getResourceServerTypeLabel(resourceServer.type, t),
						size: "small",
						variant: "outlined",
						icon: /* @__PURE__ */ jsx(Box, {
							sx: {
								display: "flex",
								alignItems: "center",
								"& > *": {
									width: 16,
									height: 16
								}
							},
							children: getResourceServerTypeIcon(resourceServer.type)
						})
					}),
					resourceServer.handle && /* @__PURE__ */ jsx(Chip, {
						label: resourceServer.handle,
						size: "small",
						sx: { fontFamily: "monospace" }
					}),
					resourceServer.isReadOnly && /* @__PURE__ */ jsx(Chip, {
						label: t("resourceServers:edit.systemResourceServer", "System"),
						size: "small",
						color: "default"
					})
				]
			})] })
		] }),
		/* @__PURE__ */ jsxs(Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": t("resourceServers:edit.tabs", "Resource server settings"),
			children: [/* @__PURE__ */ jsx(Tab, {
				label: t("resourceServers:edit.tab.resources", "Resources"),
				id: "resource-server-tab-0",
				"aria-controls": "resource-server-tabpanel-0",
				sx: { textTransform: "none" }
			}), /* @__PURE__ */ jsx(Tab, {
				label: t("resourceServers:edit.tab.advanced", "Advanced Settings"),
				id: "resource-server-tab-1",
				"aria-controls": "resource-server-tabpanel-1",
				sx: { textTransform: "none" }
			})]
		}),
		/* @__PURE__ */ jsxs(TabPanel, {
			value: activeTab,
			index: TAB_RESOURCES,
			children: [
				/* @__PURE__ */ jsx(Box, {
					sx: {
						height: "calc(100vh - 540px)",
						minHeight: 300
					},
					children: /* @__PURE__ */ jsx(ResourceTree, {
						resourceServer,
						onRefresh: () => {
							refetch();
						}
					})
				}),
				!resourceServer.isReadOnly && /* @__PURE__ */ jsx(SettingsCard, {
					title: t("resourceServers:edit.dangerZone.title", "Danger Zone"),
					description: t("resourceServers:edit.dangerZone.description", "Irreversible actions for this resource server."),
					slotProps: { root: { sx: {
						borderColor: "error.main",
						mt: 3
					} } },
					children: /* @__PURE__ */ jsx(Button, {
						variant: "outlined",
						color: "error",
						onClick: () => setDeleteDialogOpen(true),
						children: t("resourceServers:edit.dangerZone.deleteServer", "Delete resource server")
					})
				}),
				/* @__PURE__ */ jsx(ResourceServerDeleteDialog, {
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
		/* @__PURE__ */ jsx(TabPanel, {
			value: activeTab,
			index: TAB_ADVANCED,
			children: /* @__PURE__ */ jsx(AdvancedTab, {
				resourceServer,
				onRefresh: () => {
					refetch();
				}
			}, resourceServer.id)
		}),
		hasChanges && /* @__PURE__ */ jsx(UnsavedChangesBar, {
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
export { ResourceServerEditPage as default };