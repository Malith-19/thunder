import useCreateOrganizationUnit from "../api/useCreateOrganizationUnit.js";
import useOrganizationUnit from "../contexts/useOrganizationUnit.js";
import { useTranslation } from "react-i18next";
import { Alert, Box, Button, Chip, FormControl, FormLabel, IconButton, LinearProgress, Stack, TextField, Typography, useTheme } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { Lightbulb, X } from "@wso2/oxygen-ui-icons-react";
import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateRandomHumanReadableIdentifiers } from "@thunderid/utils";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

//#region src/pages/CreateOrganizationUnitPage.tsx
/**
* Creates a Zod schema for the create organization unit form with i18n support.
* Validates name, handle, description, and parent fields.
*/
const createFormSchema = (t) => z.object({
	name: z.string().trim().min(1, t("organizationUnits:edit.general.name.validations.required")),
	handle: z.string().trim().min(1, t("organizationUnits:edit.general.handle.validations.required")).regex(/^[a-z0-9-]+$/, t("organizationUnits:edit.general.handle.validations.format")),
	description: z.string().optional(),
	parentId: z.string().nullable()
});
function CreateOrganizationUnitPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const theme = useTheme();
	const logger = useLogger("CreateOrganizationUnitPage");
	const createOrganizationUnit = useCreateOrganizationUnit();
	const { resetTreeState } = useOrganizationUnit();
	const navigationState = location.state;
	const preselectedParentId = navigationState?.parentId ?? null;
	const parentDisplayName = navigationState?.parentName ?? null;
	const parentDisplayHandle = navigationState?.parentHandle ?? null;
	const [error, setError] = useState(null);
	const isHandleManuallyEditedRef = useRef(false);
	const { control, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
		resolver: zodResolver(useMemo(() => createFormSchema(t), [t])),
		mode: "onChange",
		defaultValues: {
			name: "",
			handle: "",
			description: "",
			parentId: preselectedParentId
		}
	});
	const nameSuggestions = useMemo(() => generateRandomHumanReadableIdentifiers(), []);
	/**
	* Generates a handle from the name by lowercasing and replacing spaces with hyphens.
	*/
	const generateHandleFromName = (nameValue) => nameValue.toLowerCase().replace(/\s+/g, "-");
	const listUrl = "/organization-units";
	const handleClose = () => {
		(async () => {
			await navigate(listUrl);
		})().catch((_error) => {
			logger.error("Failed to navigate back to organization units list", { error: _error });
		});
	};
	const handleNameChange = (newName) => {
		setValue("name", newName, { shouldValidate: true });
		if (!isHandleManuallyEditedRef.current) setValue("handle", generateHandleFromName(newName), { shouldValidate: true });
	};
	const handleHandleChange = (newHandle) => {
		setValue("handle", newHandle, { shouldValidate: true });
		isHandleManuallyEditedRef.current = true;
	};
	const handleNameSuggestionClick = (suggestion) => {
		setValue("name", suggestion, { shouldValidate: true });
		if (!isHandleManuallyEditedRef.current) setValue("handle", generateHandleFromName(suggestion), { shouldValidate: true });
	};
	const onSubmit = (data) => {
		setError(null);
		const requestData = {
			handle: data.handle,
			name: data.name,
			description: data.description?.trim() ? data.description.trim() : null,
			parent: data.parentId
		};
		createOrganizationUnit.mutate(requestData, {
			onSuccess: () => {
				resetTreeState();
				(async () => {
					await navigate(listUrl);
				})().catch((_error) => {
					logger.error("Failed to navigate after creating organization unit", { error: _error });
				});
			},
			onError: (err) => {
				setError(err.message ?? t("organizationUnits:create.error"));
			}
		});
	};
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		},
		children: [/* @__PURE__ */ jsx(LinearProgress, {
			variant: "determinate",
			value: 100,
			sx: { height: 6 }
		}), /* @__PURE__ */ jsx(Box, {
			sx: {
				flex: 1,
				display: "flex",
				flexDirection: "row"
			},
			children: /* @__PURE__ */ jsxs(Box, {
				sx: {
					flex: 1,
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ jsx(Box, {
					sx: {
						p: 4,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: /* @__PURE__ */ jsxs(Stack, {
						direction: "row",
						alignItems: "center",
						spacing: 2,
						children: [/* @__PURE__ */ jsx(IconButton, {
							onClick: handleClose,
							sx: {
								bgcolor: "background.paper",
								"&:hover": { bgcolor: "action.hover" },
								boxShadow: 1
							},
							children: /* @__PURE__ */ jsx(X, { size: 24 })
						}), /* @__PURE__ */ jsx(Typography, {
							variant: "h5",
							children: t("organizationUnits:create.title")
						})]
					})
				}), /* @__PURE__ */ jsx(Box, {
					sx: {
						flex: 1,
						display: "flex",
						minHeight: 0
					},
					children: /* @__PURE__ */ jsx(Box, {
						sx: {
							flex: 1,
							display: "flex",
							flexDirection: "column",
							py: 8,
							px: 20
						},
						children: /* @__PURE__ */ jsxs(Box, {
							sx: {
								width: "100%",
								maxWidth: 800,
								display: "flex",
								flexDirection: "column"
							},
							children: [error && /* @__PURE__ */ jsx(Alert, {
								severity: "error",
								sx: { my: 3 },
								onClose: () => setError(null),
								children: error
							}), /* @__PURE__ */ jsx("form", {
								onSubmit: (e) => {
									e.preventDefault();
									handleSubmit(onSubmit)(e).catch((err) => {
										logger.error("Form submission error", { error: err });
									});
								},
								children: /* @__PURE__ */ jsxs(Stack, {
									direction: "column",
									spacing: 4,
									children: [
										/* @__PURE__ */ jsx(Typography, {
											variant: "h1",
											gutterBottom: true,
											children: t("organizationUnits:create.heading")
										}),
										/* @__PURE__ */ jsxs(FormControl, {
											fullWidth: true,
											required: true,
											children: [/* @__PURE__ */ jsx(FormLabel, {
												htmlFor: "ou-name-input",
												children: t("organizationUnits:edit.general.name.label")
											}), /* @__PURE__ */ jsx(Controller, {
												name: "name",
												control,
												render: ({ field }) => /* @__PURE__ */ jsx(TextField, {
													...field,
													fullWidth: true,
													id: "ou-name-input",
													onChange: (e) => handleNameChange(e.target.value),
													placeholder: t("organizationUnits:edit.general.name.placeholder"),
													error: !!errors.name,
													helperText: errors.name?.message
												})
											})]
										}),
										/* @__PURE__ */ jsxs(Stack, {
											direction: "column",
											spacing: 2,
											children: [/* @__PURE__ */ jsxs(Stack, {
												direction: "row",
												alignItems: "center",
												spacing: 1,
												children: [/* @__PURE__ */ jsx(Lightbulb, {
													size: 20,
													color: theme.vars?.palette.warning.main
												}), /* @__PURE__ */ jsx(Typography, {
													variant: "body2",
													color: "text.secondary",
													children: t("organizationUnits:create.suggestions.label")
												})]
											}), /* @__PURE__ */ jsx(Box, {
												sx: {
													display: "flex",
													flexWrap: "wrap",
													gap: 1
												},
												children: nameSuggestions.map((suggestion) => /* @__PURE__ */ jsx(Chip, {
													label: suggestion,
													onClick: () => handleNameSuggestionClick(suggestion),
													variant: "outlined",
													clickable: true,
													sx: { "&:hover": {
														bgcolor: "primary.main",
														color: "primary.contrastText",
														borderColor: "primary.main"
													} }
												}, suggestion))
											})]
										}),
										/* @__PURE__ */ jsxs(FormControl, {
											fullWidth: true,
											required: true,
											children: [/* @__PURE__ */ jsx(FormLabel, {
												htmlFor: "ou-handle-input",
												children: t("organizationUnits:edit.general.handle.label")
											}), /* @__PURE__ */ jsx(Controller, {
												name: "handle",
												control,
												render: ({ field }) => /* @__PURE__ */ jsx(TextField, {
													...field,
													fullWidth: true,
													id: "ou-handle-input",
													onChange: (e) => handleHandleChange(e.target.value),
													placeholder: t("organizationUnits:edit.general.handle.placeholder"),
													error: !!errors.handle,
													helperText: errors.handle?.message ?? t("organizationUnits:edit.general.handle.hint")
												})
											})]
										}),
										/* @__PURE__ */ jsxs(FormControl, {
											fullWidth: true,
											children: [/* @__PURE__ */ jsx(FormLabel, {
												htmlFor: "ou-description-input",
												children: t("organizationUnits:edit.general.description.label")
											}), /* @__PURE__ */ jsx(Controller, {
												name: "description",
												control,
												render: ({ field }) => /* @__PURE__ */ jsx(TextField, {
													...field,
													fullWidth: true,
													id: "ou-description-input",
													placeholder: t("organizationUnits:edit.general.description.placeholder"),
													multiline: true,
													rows: 3
												})
											})]
										}),
										/* @__PURE__ */ jsxs(FormControl, {
											fullWidth: true,
											children: [/* @__PURE__ */ jsx(FormLabel, {
												htmlFor: "ou-parent-input",
												children: t("organizationUnits:edit.general.parent.label")
											}), /* @__PURE__ */ jsx(TextField, {
												id: "ou-parent-input",
												fullWidth: true,
												value: parentDisplayName ? `${parentDisplayName}${parentDisplayHandle ? ` (${parentDisplayHandle})` : ""}` : t("organizationUnits:edit.general.ou.noParent.label"),
												slotProps: { input: { readOnly: true } },
												helperText: t("organizationUnits:edit.general.parent.hint")
											})]
										}),
										/* @__PURE__ */ jsx(Box, {
											sx: {
												mt: 4,
												display: "flex",
												justifyContent: "flex-start",
												gap: 2
											},
											children: /* @__PURE__ */ jsx(Button, {
												type: "submit",
												variant: "contained",
												disabled: createOrganizationUnit.isPending || !isValid,
												sx: { minWidth: 100 },
												children: createOrganizationUnit.isPending ? t("common:status.saving") : t("common:actions.create")
											})
										})
									]
								})
							})]
						})
					})
				})]
			})
		})]
	});
}

//#endregion
export { CreateOrganizationUnitPage as default };