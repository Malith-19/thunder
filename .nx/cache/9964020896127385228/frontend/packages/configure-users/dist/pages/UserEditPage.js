import useGetUser from "../api/useGetUser.js";
import useGetUserType from "../api/useGetUserType.js";
import useGetUserTypes from "../api/useGetUserTypes.js";
import useUpdateUser from "../api/useUpdateUser.js";
import UserDeleteDialog from "../components/UserDeleteDialog.js";
import renderSchemaField_default from "../utils/renderSchemaField.js";
import QuickCopySection from "../components/edit-user/QuickCopySection.js";
import { useTranslation } from "react-i18next";
import { Alert, Box, Button, Chip, FormControl, FormLabel, IconButton, InputAdornment, PageContent, PageTitle, Stack, Tab, Tabs, TextField, Tooltip, Typography } from "@wso2/oxygen-ui";
import { ArrowLeft, Check, Copy, Save, X } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { PageLoadingAnimation, ResourceAvatar, SettingsCard, getInitials } from "@thunderid/components";
import { useResolveDisplayName } from "@thunderid/hooks";
import { useLogger } from "@thunderid/logger/react";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

//#region src/pages/UserEditPage.tsx
function TabPanel({ children = null, value, index,...other }) {
	return /* @__PURE__ */ jsx("div", {
		role: "tabpanel",
		hidden: value !== index,
		id: `user-tabpanel-${index}`,
		"aria-labelledby": `user-tab-${index}`,
		...other,
		children: value === index && /* @__PURE__ */ jsx(Box, {
			sx: { py: 3 },
			children
		})
	});
}
function UserEditPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("UserEditPage");
	const { resolveDisplayName } = useResolveDisplayName({ handlers: { t } });
	const { userId } = useParams();
	const [activeTab, setActiveTab] = useState(0);
	const [isEditMode, setIsEditMode] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [copiedField, setCopiedField] = useState(null);
	const copyTimeoutRef = useRef(null);
	const { data: user, isLoading: isUserLoading, error: userError } = useGetUser(userId);
	const updateUserMutation = useUpdateUser();
	const { data: userTypeList } = useGetUserTypes();
	const matchedSchema = useMemo(() => {
		if (!user?.type || !userTypeList?.types) return;
		return userTypeList.types.find((s) => s.name === user.type);
	}, [user?.type, userTypeList?.types]);
	const schemaId = matchedSchema?.id;
	const trimmedOuId = matchedSchema?.ouId?.trim();
	const schemaOuId = trimmedOuId === "" ? void 0 : trimmedOuId;
	const { data: userTypeDetails, isLoading: isSchemaLoading, error: schemaError } = useGetUserType(schemaId);
	const hasEditableFields = useMemo(() => {
		if (!userTypeDetails?.schema) return false;
		return Object.entries(userTypeDetails.schema).some(([, fieldDef]) => !((fieldDef.type === "string" || fieldDef.type === "number") && fieldDef.credential));
	}, [userTypeDetails]);
	const displayName = user?.display ?? user?.id ?? "";
	const { control, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: {} });
	useEffect(() => {
		if (user?.attributes && userTypeDetails?.schema) Object.entries(user.attributes).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [
		user,
		userTypeDetails,
		setValue
	]);
	useEffect(() => () => {
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
	}, []);
	const handleCopyToClipboard = useCallback(async (text, fieldName) => {
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
	if (isUserLoading || isSchemaLoading) return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	if (userError ?? schemaError) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: userError?.message ?? schemaError?.message ?? "Failed to load user information"
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("users:manageUser.back")
	})] });
	if (!user) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("users:manageUser.notFound", "User not found")
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("users:manageUser.back")
	})] });
	const picture = user.attributes?.["picture"];
	return /* @__PURE__ */ jsxs(PageContent, { children: [
		/* @__PURE__ */ jsxs(PageTitle, { children: [
			/* @__PURE__ */ jsx(PageTitle.BackButton, {
				component: /* @__PURE__ */ jsx(Link, { to: "/users" }),
				children: t("users:manageUser.back", "Back to Users")
			}),
			/* @__PURE__ */ jsx(PageTitle.Avatar, { children: /* @__PURE__ */ jsx(ResourceAvatar, {
				value: picture,
				fallback: getInitials(displayName),
				size: 55
			}) }),
			/* @__PURE__ */ jsx(PageTitle.Header, { children: /* @__PURE__ */ jsx(Typography, {
				variant: "h3",
				children: displayName
			}) }),
			/* @__PURE__ */ jsx(PageTitle.SubHeader, { children: /* @__PURE__ */ jsx(Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				children: /* @__PURE__ */ jsx(Chip, {
					label: user.type,
					size: "small",
					sx: { px: .5 }
				})
			}) })
		] }),
		/* @__PURE__ */ jsx(Tabs, {
			value: activeTab,
			onChange: handleTabChange,
			"aria-label": "user settings tabs",
			children: /* @__PURE__ */ jsx(Tab, {
				label: t("users:manageUser.tabs.general", "General"),
				id: "user-tab-0",
				"aria-controls": "user-tabpanel-0",
				sx: { textTransform: "none" }
			})
		}),
		/* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(TabPanel, {
			value: activeTab,
			index: 0,
			children: /* @__PURE__ */ jsxs(Stack, {
				spacing: 3,
				children: [
					/* @__PURE__ */ jsx(QuickCopySection, {
						user,
						copiedField,
						onCopyToClipboard: handleCopyToClipboard
					}),
					/* @__PURE__ */ jsx(SettingsCard, {
						title: t("users:manageUser.sections.attributes.title", "User Attributes"),
						description: t("users:manageUser.sections.attributes.description", "View and manage user attribute values."),
						headerAction: !isEditMode && hasEditableFields ? /* @__PURE__ */ jsx(Button, {
							variant: "outlined",
							size: "small",
							onClick: () => setIsEditMode(true),
							children: t("common:actions.edit", "Edit")
						}) : void 0,
						children: !isEditMode ? /* @__PURE__ */ jsx(Stack, {
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
								return /* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
									variant: "caption",
									color: "text.secondary",
									children: attributeLabel
								}), /* @__PURE__ */ jsx(Typography, {
									variant: "body1",
									children: displayValue
								})] }, key);
							}) : /* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								children: t("users:manageUser.sections.attributes.empty", "No attributes available")
							})
						}) : /* @__PURE__ */ jsxs(Box, {
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
								userTypeDetails?.schema ? Object.entries(userTypeDetails.schema).filter(([, fieldDef]) => !((fieldDef.type === "string" || fieldDef.type === "number") && fieldDef.credential)).map(([fieldName, fieldDef]) => renderSchemaField_default(fieldName, fieldDef, control, errors, resolveDisplayName)) : /* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									color: "text.secondary",
									children: t("users:manageUser.sections.attributes.noSchema", "No schema available for editing")
								}),
								updateUserMutation.error && /* @__PURE__ */ jsx(Alert, {
									severity: "error",
									sx: { mt: 2 },
									children: /* @__PURE__ */ jsx(Typography, {
										variant: "body2",
										sx: {
											fontWeight: "bold",
											mb: .5
										},
										children: updateUserMutation.error.message
									})
								}),
								/* @__PURE__ */ jsxs(Stack, {
									direction: "row",
									spacing: 2,
									justifyContent: "flex-end",
									sx: { mt: 2 },
									children: [/* @__PURE__ */ jsx(Button, {
										variant: "outlined",
										onClick: handleCancel,
										disabled: isSubmitting,
										startIcon: /* @__PURE__ */ jsx(X, { size: 16 }),
										children: t("common:actions.cancel", "Cancel")
									}), /* @__PURE__ */ jsx(Button, {
										type: "submit",
										variant: "contained",
										startIcon: isSubmitting ? null : /* @__PURE__ */ jsx(Save, { size: 16 }),
										disabled: isSubmitting,
										children: isSubmitting ? t("common:status.saving", "Saving...") : t("common:actions.save", "Save Changes")
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx(SettingsCard, {
						title: t("users:manageUser.sections.organizationUnit.title", "Organization Unit"),
						description: t("users:manageUser.sections.organizationUnit.description", "The organization unit this user belongs to."),
						children: /* @__PURE__ */ jsxs(Stack, {
							spacing: 2,
							children: [/* @__PURE__ */ jsxs(FormControl, {
								fullWidth: true,
								children: [/* @__PURE__ */ jsx(FormLabel, {
									htmlFor: "ou-handle-input",
									children: t("users:manageUser.sections.organizationUnit.handleLabel", "Handle")
								}), /* @__PURE__ */ jsx(TextField, {
									id: "ou-handle-input",
									value: user.ouHandle ?? "-",
									fullWidth: true,
									size: "small",
									slotProps: { input: {
										readOnly: true,
										endAdornment: user.ouHandle ? /* @__PURE__ */ jsx(InputAdornment, {
											position: "end",
											children: /* @__PURE__ */ jsx(Tooltip, {
												title: copiedField === "ouHandle" ? t("common:actions.copied") : t("users:manageUser.sections.organizationUnit.copyHandle", "Copy Organization Unit Handle"),
												children: /* @__PURE__ */ jsx(IconButton, {
													"aria-label": t("users:manageUser.sections.organizationUnit.copyHandle", "Copy Organization Unit Handle"),
													onClick: () => {
														handleCopyToClipboard(user.ouHandle, "ouHandle").catch(() => null);
													},
													edge: "end",
													children: copiedField === "ouHandle" ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
												})
											})
										}) : void 0
									} },
									sx: { "& input": {
										fontFamily: "monospace",
										fontSize: "0.875rem"
									} }
								})]
							}), /* @__PURE__ */ jsxs(FormControl, {
								fullWidth: true,
								children: [/* @__PURE__ */ jsx(FormLabel, {
									htmlFor: "ou-id-input",
									children: t("users:manageUser.sections.organizationUnit.idLabel", "ID")
								}), /* @__PURE__ */ jsx(TextField, {
									id: "ou-id-input",
									value: user.ouId,
									fullWidth: true,
									size: "small",
									slotProps: { input: {
										readOnly: true,
										endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
											position: "end",
											children: /* @__PURE__ */ jsx(Tooltip, {
												title: copiedField === "ouId" ? t("common:actions.copied") : t("users:manageUser.sections.organizationUnit.copyId", "Copy Organization Unit ID"),
												children: /* @__PURE__ */ jsx(IconButton, {
													"aria-label": t("users:manageUser.sections.organizationUnit.copyId", "Copy Organization Unit ID"),
													onClick: () => {
														handleCopyToClipboard(user.ouId, "ouId").catch(() => null);
													},
													edge: "end",
													children: copiedField === "ouId" ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
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
					/* @__PURE__ */ jsxs(SettingsCard, {
						title: t("users:manageUser.sections.dangerZone.title", "Danger Zone"),
						description: t("users:manageUser.sections.dangerZone.description", "Irreversible and destructive actions."),
						children: [
							/* @__PURE__ */ jsx(Typography, {
								variant: "h6",
								gutterBottom: true,
								color: "error",
								children: t("users:manageUser.sections.dangerZone.deleteUser", "Delete User")
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								sx: { mb: 3 },
								children: t("users:manageUser.sections.dangerZone.deleteUserDescription", "Once deleted, this user cannot be recovered. All associated data will be permanently removed.")
							}),
							/* @__PURE__ */ jsx(Button, {
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
		/* @__PURE__ */ jsx(UserDeleteDialog, {
			open: deleteDialogOpen,
			userId: userId ?? null,
			onClose: () => setDeleteDialogOpen(false),
			onSuccess: handleDeleteSuccess
		})
	] });
}

//#endregion
export { UserEditPage as default };