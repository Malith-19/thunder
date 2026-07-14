const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useGetUser = require('../api/useGetUser.cjs');
const require_useGetUserType = require('../api/useGetUserType.cjs');
const require_useGetUserTypes = require('../api/useGetUserTypes.cjs');
const require_useUpdateUser = require('../api/useUpdateUser.cjs');
const require_UserDeleteDialog = require('../components/UserDeleteDialog.cjs');
const require_renderSchemaField = require('../utils/renderSchemaField.cjs');
const require_QuickCopySection = require('../components/edit-user/QuickCopySection.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let react_hook_form = require("react-hook-form");
react_hook_form = require_rolldown_runtime.__toESM(react_hook_form);

//#region src/pages/UserEditPage.tsx
function TabPanel({ children = null, value, index,...other }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		role: "tabpanel",
		hidden: value !== index,
		id: `user-tabpanel-${index}`,
		"aria-labelledby": `user-tab-${index}`,
		...other,
		children: value === index && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: { py: 3 },
			children
		})
	});
}
function UserEditPage() {
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("UserEditPage");
	const { resolveDisplayName } = (0, __thunderid_hooks.useResolveDisplayName)({ handlers: { t } });
	const { userId } = (0, react_router.useParams)();
	const [activeTab, setActiveTab] = (0, react.useState)(0);
	const [isEditMode, setIsEditMode] = (0, react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, react.useState)(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const [copiedField, setCopiedField] = (0, react.useState)(null);
	const copyTimeoutRef = (0, react.useRef)(null);
	const { data: user, isLoading: isUserLoading, error: userError } = require_useGetUser.default(userId);
	const updateUserMutation = require_useUpdateUser.default();
	const { data: userTypeList } = require_useGetUserTypes.default();
	const matchedSchema = (0, react.useMemo)(() => {
		if (!user?.type || !userTypeList?.types) return;
		return userTypeList.types.find((s) => s.name === user.type);
	}, [user?.type, userTypeList?.types]);
	const schemaId = matchedSchema?.id;
	const trimmedOuId = matchedSchema?.ouId?.trim();
	const schemaOuId = trimmedOuId === "" ? void 0 : trimmedOuId;
	const { data: userTypeDetails, isLoading: isSchemaLoading, error: schemaError } = require_useGetUserType.default(schemaId);
	const hasEditableFields = (0, react.useMemo)(() => {
		if (!userTypeDetails?.schema) return false;
		return Object.entries(userTypeDetails.schema).some(([, fieldDef]) => !((fieldDef.type === "string" || fieldDef.type === "number") && fieldDef.credential));
	}, [userTypeDetails]);
	const displayName = user?.display ?? user?.id ?? "";
	const { control, handleSubmit, setValue, formState: { errors } } = (0, react_hook_form.useForm)({ defaultValues: {} });
	(0, react.useEffect)(() => {
		if (user?.attributes && userTypeDetails?.schema) Object.entries(user.attributes).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [
		user,
		userTypeDetails,
		setValue
	]);
	(0, react.useEffect)(() => () => {
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
	}, []);
	const handleCopyToClipboard = (0, react.useCallback)(async (text, fieldName) => {
		await navigator.clipboard.writeText(text);
		setCopiedField(fieldName);
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
		copyTimeoutRef.current = setTimeout(() => {
			setCopiedField(null);
		}, 2e3);
	}, []);
	const handleTabChange = (_event, newValue) => {
		setActiveTab(newValue);
	};
	const onSubmit = async (data) => {
		const organizationUnitId = schemaOuId ?? user?.ouId;
		if (!userId || !organizationUnitId || !user?.type) return;
		try {
			setIsSubmitting(true);
			const requestBody = {
				ouId: organizationUnitId,
				type: user.type,
				attributes: data
			};
			await updateUserMutation.mutateAsync({
				userId,
				data: requestBody
			});
			setIsEditMode(false);
		} catch (err) {
			logger.error("Failed to update user", { error: err });
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleCancel = () => {
		setIsEditMode(false);
		updateUserMutation.reset();
		if (user?.attributes && userTypeDetails?.schema) Object.entries(user.attributes).forEach(([key, value]) => {
			setValue(key, value);
		});
	};
	const handleBack = async () => {
		await navigate("/users");
	};
	const handleDeleteSuccess = () => {
		(async () => {
			await navigate("/users");
		})().catch((error) => {
			logger.error("Failed to navigate after deleting user", { error });
		});
	};
	if (isUserLoading || isSchemaLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "400px"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, {})
	});
	if (userError ?? schemaError) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: userError?.message ?? schemaError?.message ?? "Failed to load user information"
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("users:manageUser.back")
	})] });
	if (!user) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("users:manageUser.notFound", "User not found")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("users:manageUser.back")
	})] });
	const picture = user.attributes?.["picture"];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.BackButton, {
				component: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.Link, { to: "/users" }),
				children: t("users:manageUser.back", "Back to Users")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Avatar, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.ResourceAvatar, {
				value: picture,
				fallback: (0, __thunderid_components.getInitials)(displayName),
				size: 55
			}) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h3",
				children: displayName
			}) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.SubHeader, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
					label: user.type,
					size: "small",
					sx: { px: .5 }
				})
			}) })
		] }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": "user settings tabs",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
				label: t("users:manageUser.tabs.general", "General"),
				id: "user-tab-0",
				"aria-controls": "user-tabpanel-0",
				sx: { textTransform: "none" }
			})
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TabPanel, {
			value: activeTab,
			index: 0,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				spacing: 3,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_QuickCopySection.default, {
						user,
						copiedField,
						onCopyToClipboard: handleCopyToClipboard
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
						title: t("users:manageUser.sections.attributes.title", "User Attributes"),
						description: t("users:manageUser.sections.attributes.description", "View and manage user attribute values."),
						headerAction: !isEditMode && hasEditableFields ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
							variant: "outlined",
							size: "small",
							onClick: () => setIsEditMode(true),
							children: t("common:actions.edit", "Edit")
						}) : void 0,
						children: !isEditMode ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
							spacing: 2,
							children: user.attributes && Object.keys(user.attributes).length > 0 ? Object.entries(user.attributes).map(([key, value]) => {
								let displayValue;
								if (value === null || value === void 0) displayValue = "-";
								else if (typeof value === "boolean") displayValue = value ? t("common:actions.yes") : t("common:actions.no");
								else if (Array.isArray(value)) displayValue = value.join(", ");
								else if (typeof value === "object") displayValue = JSON.stringify(value);
								else if (typeof value === "string" || typeof value === "number") displayValue = String(value);
								else displayValue = "-";
								const fieldDef = userTypeDetails?.schema?.[key];
								let attributeLabel = key;
								if (fieldDef?.displayName) attributeLabel = resolveDisplayName(fieldDef.displayName) || key;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "caption",
									color: "text.secondary",
									children: attributeLabel
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "body1",
									children: displayValue
								})] }, key);
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "body2",
								color: "text.secondary",
								children: t("users:manageUser.sections.attributes.empty", "No attributes available")
							})
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
							component: "form",
							onSubmit: (event) => {
								handleSubmit(onSubmit)(event).catch(() => null);
							},
							noValidate: true,
							sx: {
								display: "flex",
								flexDirection: "column",
								gap: 2
							},
							children: [
								userTypeDetails?.schema ? Object.entries(userTypeDetails.schema).filter(([, fieldDef]) => !((fieldDef.type === "string" || fieldDef.type === "number") && fieldDef.credential)).map(([fieldName, fieldDef]) => require_renderSchemaField.default(fieldName, fieldDef, control, errors, resolveDisplayName)) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "body2",
									color: "text.secondary",
									children: t("users:manageUser.sections.attributes.noSchema", "No schema available for editing")
								}),
								updateUserMutation.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
									severity: "error",
									sx: { mt: 2 },
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
										variant: "body2",
										sx: {
											fontWeight: "bold",
											mb: .5
										},
										children: updateUserMutation.error.message
									})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
									direction: "row",
									spacing: 2,
									justifyContent: "flex-end",
									sx: { mt: 2 },
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
										variant: "outlined",
										onClick: handleCancel,
										disabled: isSubmitting,
										startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.X, { size: 16 }),
										children: t("common:actions.cancel", "Cancel")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
										type: "submit",
										variant: "contained",
										startIcon: isSubmitting ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Save, { size: 16 }),
										disabled: isSubmitting,
										children: isSubmitting ? t("common:status.saving", "Saving...") : t("common:actions.save", "Save Changes")
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
						title: t("users:manageUser.sections.organizationUnit.title", "Organization Unit"),
						description: t("users:manageUser.sections.organizationUnit.description", "The organization unit this user belongs to."),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
							spacing: 2,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
								fullWidth: true,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
									htmlFor: "ou-handle-input",
									children: t("users:manageUser.sections.organizationUnit.handleLabel", "Handle")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
									id: "ou-handle-input",
									value: user.ouHandle ?? "-",
									fullWidth: true,
									size: "small",
									slotProps: { input: {
										readOnly: true,
										endAdornment: user.ouHandle ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
											position: "end",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
												title: copiedField === "ouHandle" ? t("common:actions.copied") : t("users:manageUser.sections.organizationUnit.copyHandle", "Copy Organization Unit Handle"),
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
													"aria-label": t("users:manageUser.sections.organizationUnit.copyHandle", "Copy Organization Unit Handle"),
													onClick: () => {
														handleCopyToClipboard(user.ouHandle, "ouHandle").catch(() => null);
													},
													edge: "end",
													children: copiedField === "ouHandle" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 16 })
												})
											})
										}) : void 0
									} },
									sx: { "& input": {
										fontFamily: "monospace",
										fontSize: "0.875rem"
									} }
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
								fullWidth: true,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
									htmlFor: "ou-id-input",
									children: t("users:manageUser.sections.organizationUnit.idLabel", "ID")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
									id: "ou-id-input",
									value: user.ouId,
									fullWidth: true,
									size: "small",
									slotProps: { input: {
										readOnly: true,
										endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
											position: "end",
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
												title: copiedField === "ouId" ? t("common:actions.copied") : t("users:manageUser.sections.organizationUnit.copyId", "Copy Organization Unit ID"),
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
													"aria-label": t("users:manageUser.sections.organizationUnit.copyId", "Copy Organization Unit ID"),
													onClick: () => {
														handleCopyToClipboard(user.ouId, "ouId").catch(() => null);
													},
													edge: "end",
													children: copiedField === "ouId" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 16 })
												})
											})
										})
									} },
									sx: { "& input": {
										fontFamily: "monospace",
										fontSize: "0.875rem"
									} }
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__thunderid_components.SettingsCard, {
						title: t("users:manageUser.sections.dangerZone.title", "Danger Zone"),
						description: t("users:manageUser.sections.dangerZone.description", "Irreversible and destructive actions."),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "h6",
								gutterBottom: true,
								color: "error",
								children: t("users:manageUser.sections.dangerZone.deleteUser", "Delete User")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "body2",
								color: "text.secondary",
								sx: { mb: 3 },
								children: t("users:manageUser.sections.dangerZone.deleteUserDescription", "Once deleted, this user cannot be recovered. All associated data will be permanently removed.")
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
								variant: "contained",
								color: "error",
								onClick: () => setDeleteDialogOpen(true),
								children: t("common:actions.delete", "Delete")
							})
						]
					})
				]
			})
		}) }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UserDeleteDialog.default, {
			open: deleteDialogOpen,
			userId: userId ?? null,
			onClose: () => setDeleteDialogOpen(false),
			onSuccess: handleDeleteSuccess
		})
	] });
}

//#endregion
exports.default = UserEditPage;