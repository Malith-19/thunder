const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useCreateOrganizationUnit = require('../api/useCreateOrganizationUnit.cjs');
const require_useOrganizationUnit = require('../contexts/useOrganizationUnit.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let __hookform_resolvers_zod = require("@hookform/resolvers/zod");
__hookform_resolvers_zod = require_rolldown_runtime.__toESM(__hookform_resolvers_zod);
let __thunderid_utils = require("@thunderid/utils");
__thunderid_utils = require_rolldown_runtime.__toESM(__thunderid_utils);
let react_hook_form = require("react-hook-form");
react_hook_form = require_rolldown_runtime.__toESM(react_hook_form);
let zod = require("zod");
zod = require_rolldown_runtime.__toESM(zod);

//#region src/pages/CreateOrganizationUnitPage.tsx
/**
* Creates a Zod schema for the create organization unit form with i18n support.
* Validates name, handle, description, and parent fields.
*/
const createFormSchema = (t) => zod.z.object({
	name: zod.z.string().trim().min(1, t("organizationUnits:edit.general.name.validations.required")),
	handle: zod.z.string().trim().min(1, t("organizationUnits:edit.general.handle.validations.required")).regex(/^[a-z0-9-]+$/, t("organizationUnits:edit.general.handle.validations.format")),
	description: zod.z.string().optional(),
	parentId: zod.z.string().nullable()
});
function CreateOrganizationUnitPage() {
	const navigate = (0, react_router.useNavigate)();
	const location = (0, react_router.useLocation)();
	const { t } = (0, react_i18next.useTranslation)();
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const logger = (0, __thunderid_logger_react.useLogger)("CreateOrganizationUnitPage");
	const createOrganizationUnit = require_useCreateOrganizationUnit.default();
	const { resetTreeState } = require_useOrganizationUnit.default();
	const navigationState = location.state;
	const preselectedParentId = navigationState?.parentId ?? null;
	const parentDisplayName = navigationState?.parentName ?? null;
	const parentDisplayHandle = navigationState?.parentHandle ?? null;
	const [error, setError] = (0, react.useState)(null);
	const isHandleManuallyEditedRef = (0, react.useRef)(false);
	const { control, handleSubmit, setValue, formState: { errors, isValid } } = (0, react_hook_form.useForm)({
		resolver: (0, __hookform_resolvers_zod.zodResolver)((0, react.useMemo)(() => createFormSchema(t), [t])),
		mode: "onChange",
		defaultValues: {
			name: "",
			handle: "",
			description: "",
			parentId: preselectedParentId
		}
	});
	const nameSuggestions = (0, react.useMemo)(() => (0, __thunderid_utils.generateRandomHumanReadableIdentifiers)(), []);
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.LinearProgress, {
			variant: "determinate",
			value: 100,
			sx: { height: 6 }
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: {
				flex: 1,
				display: "flex",
				flexDirection: "row"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					flex: 1,
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						p: 4,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
						direction: "row",
						alignItems: "center",
						spacing: 2,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							onClick: handleClose,
							sx: {
								bgcolor: "background.paper",
								"&:hover": { bgcolor: "action.hover" },
								boxShadow: 1
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.X, { size: 24 })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "h5",
							children: t("organizationUnits:create.title")
						})]
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						flex: 1,
						display: "flex",
						minHeight: 0
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						sx: {
							flex: 1,
							display: "flex",
							flexDirection: "column",
							py: 8,
							px: 20
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
							sx: {
								width: "100%",
								maxWidth: 800,
								display: "flex",
								flexDirection: "column"
							},
							children: [error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
								severity: "error",
								sx: { my: 3 },
								onClose: () => setError(null),
								children: error
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									handleSubmit(onSubmit)(e).catch((err) => {
										logger.error("Form submission error", { error: err });
									});
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
									direction: "column",
									spacing: 4,
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
											variant: "h1",
											gutterBottom: true,
											children: t("organizationUnits:create.heading")
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
											fullWidth: true,
											required: true,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
												htmlFor: "ou-name-input",
												children: t("organizationUnits:edit.general.name.label")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
												name: "name",
												control,
												render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
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
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
											direction: "column",
											spacing: 2,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
												direction: "row",
												alignItems: "center",
												spacing: 1,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Lightbulb, {
													size: 20,
													color: theme.vars?.palette.warning.main
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
													variant: "body2",
													color: "text.secondary",
													children: t("organizationUnits:create.suggestions.label")
												})]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
												sx: {
													display: "flex",
													flexWrap: "wrap",
													gap: 1
												},
												children: nameSuggestions.map((suggestion) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
													label: suggestion,
													onClick: () => handleNameSuggestionClick(suggestion),
													variant: "outlined",
													clickable: true,
													sx: { "&:hover": {
														bgcolor: "primary.main",
														color: "text.primary",
														borderColor: "primary.main"
													} }
												}, suggestion))
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
											fullWidth: true,
											required: true,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
												htmlFor: "ou-handle-input",
												children: t("organizationUnits:edit.general.handle.label")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
												name: "handle",
												control,
												render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
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
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
											fullWidth: true,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
												htmlFor: "ou-description-input",
												children: t("organizationUnits:edit.general.description.label")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
												name: "description",
												control,
												render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
													...field,
													fullWidth: true,
													id: "ou-description-input",
													placeholder: t("organizationUnits:edit.general.description.placeholder"),
													multiline: true,
													rows: 3
												})
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
											fullWidth: true,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
												htmlFor: "ou-parent-input",
												children: t("organizationUnits:edit.general.parent.label")
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
												id: "ou-parent-input",
												fullWidth: true,
												value: parentDisplayName ? `${parentDisplayName}${parentDisplayHandle ? ` (${parentDisplayHandle})` : ""}` : t("organizationUnits:edit.general.ou.noParent.label"),
												slotProps: { input: { readOnly: true } },
												helperText: t("organizationUnits:edit.general.parent.hint")
											})]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
											sx: {
												mt: 4,
												display: "flex",
												justifyContent: "flex-start",
												gap: 2
											},
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
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
exports.default = CreateOrganizationUnitPage;