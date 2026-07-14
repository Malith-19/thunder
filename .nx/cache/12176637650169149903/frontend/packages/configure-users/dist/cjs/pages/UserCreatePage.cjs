const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useCreateUser = require('../api/useCreateUser.cjs');
const require_useGetUserType = require('../api/useGetUserType.cjs');
const require_useGetUserTypes = require('../api/useGetUserTypes.cjs');
const require_useGetChildOrganizationUnits = require('../configure-organization-units/dist/api/useGetChildOrganizationUnits.cjs');
const require_ConfigureOrganizationUnit = require('../components/create-user/ConfigureOrganizationUnit.cjs');
const require_ConfigureUserDetails = require('../components/create-user/ConfigureUserDetails.cjs');
const require_ConfigureUserType = require('../components/create-user/ConfigureUserType.cjs');
const require_user_create_flow = require('../models/user-create-flow.cjs');
const require_useUserCreate = require('../contexts/UserCreate/useUserCreate.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
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
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/pages/UserCreatePage.tsx
function UserCreatePage() {
	const { t } = (0, react_i18next.useTranslation)();
	const navigate = (0, react_router.useNavigate)();
	const logger = (0, __thunderid_logger_react.useLogger)("UserCreatePage");
	const createUserMutation = require_useCreateUser.default();
	const { currentStep, setCurrentStep, selectedSchema, setSelectedSchema, selectedOuId, setSelectedOuId, formValues, setFormValues, error, setError } = require_useUserCreate.default();
	const { data: userTypesData } = require_useGetUserTypes.default();
	const { data: userTypeDetails, isLoading: isSchemaLoading } = require_useGetUserType.default(selectedSchema?.id);
	const { data: childOuData, isLoading: isChildOuLoading, error: childOuError } = require_useGetChildOrganizationUnits.useGetChildOrganizationUnits(selectedSchema?.ouId, {
		limit: 1,
		offset: 0
	});
	const tokenOuId = (0, __thunderid_react.useThunderID)().user?.ouId ?? null;
	const isChildOuForbidden = childOuError?.response?.status === 403;
	const isChildOuProbeFailed = !!childOuError && !isChildOuForbidden;
	const userTypes = (0, react.useMemo)(() => userTypesData?.types ?? [], [userTypesData]);
	const hasChildOUs = !isChildOuLoading && !childOuError && (childOuData?.totalResults ?? 0) > 0;
	const activeSteps = (0, react.useMemo)(() => {
		const base = [require_user_create_flow.UserCreateFlowStep.USER_TYPE];
		if (hasChildOUs) base.push(require_user_create_flow.UserCreateFlowStep.ORGANIZATION_UNIT);
		base.push(require_user_create_flow.UserCreateFlowStep.USER_DETAILS);
		return base;
	}, [hasChildOUs]);
	const steps = (0, react.useMemo)(() => {
		const map = { USER_TYPE: { label: t("users:createWizard.steps.userType") } };
		if (hasChildOUs) map.ORGANIZATION_UNIT = { label: t("users:createWizard.steps.organizationUnit") };
		map.USER_DETAILS = { label: t("users:createWizard.steps.userDetails") };
		return map;
	}, [t, hasChildOUs]);
	const [validationError, setValidationError] = (0, react.useState)(null);
	const [snackbarOpen, setSnackbarOpen] = (0, react.useState)(false);
	const [stepReady, setStepReady] = (0, react.useState)({
		USER_TYPE: false,
		ORGANIZATION_UNIT: false,
		USER_DETAILS: false
	});
	const handleClose = () => {
		if (createUserMutation.isPending) return;
		Promise.resolve(navigate("/users")).catch((_error) => {
			logger.error("Failed to navigate to users page", { error: _error });
		});
	};
	const handleStepReadyChange = (0, react.useCallback)((step, isReady) => {
		setStepReady((prev) => ({
			...prev,
			[step]: isReady
		}));
	}, []);
	const handleUserTypeStepReadyChange = (0, react.useCallback)((isReady) => {
		handleStepReadyChange(require_user_create_flow.UserCreateFlowStep.USER_TYPE, isReady);
	}, [handleStepReadyChange]);
	const handleOrganizationUnitStepReadyChange = (0, react.useCallback)((isReady) => {
		handleStepReadyChange(require_user_create_flow.UserCreateFlowStep.ORGANIZATION_UNIT, isReady);
	}, [handleStepReadyChange]);
	const handleUserDetailsStepReadyChange = (0, react.useCallback)((isReady) => {
		handleStepReadyChange(require_user_create_flow.UserCreateFlowStep.USER_DETAILS, isReady);
	}, [handleStepReadyChange]);
	const handleSchemaChange = (0, react.useCallback)((schema) => {
		if (schema?.id !== selectedSchema?.id) {
			setFormValues({});
			setSelectedOuId(null);
			setStepReady((prev) => ({
				...prev,
				ORGANIZATION_UNIT: false,
				USER_DETAILS: false
			}));
		}
		setSelectedSchema(schema);
	}, [
		selectedSchema,
		setSelectedSchema,
		setSelectedOuId,
		setFormValues
	]);
	const handleSubmit = async () => {
		setValidationError(null);
		setError(null);
		if (!selectedSchema) {
			setValidationError(t("users:createWizard.validationErrors.userTypeRequired"));
			setSnackbarOpen(true);
			return;
		}
		const trimmedOuId = (selectedOuId ?? selectedSchema.ouId)?.trim();
		if (!trimmedOuId) {
			setValidationError(t("users:createWizard.validationErrors.ouIdMissing"));
			setSnackbarOpen(true);
			return;
		}
		const filteredAttributes = Object.fromEntries(Object.entries(formValues).filter(([, v]) => v !== "" && v !== void 0 && v !== null));
		const requestBody = {
			ouId: trimmedOuId,
			type: selectedSchema.name,
			attributes: filteredAttributes
		};
		try {
			await createUserMutation.mutateAsync(requestBody);
			await navigate("/users");
		} catch (submitError) {
			logger.error("Failed to create user or navigate", { error: submitError });
		}
	};
	const handleNextStep = () => {
		switch (currentStep) {
			case require_user_create_flow.UserCreateFlowStep.USER_TYPE:
				if (selectedSchema?.ouId && isChildOuLoading) return;
				if (isChildOuProbeFailed) {
					setError(t("users:createWizard.errors.childOuProbeFailed"));
					return;
				}
				if (hasChildOUs) setCurrentStep(require_user_create_flow.UserCreateFlowStep.ORGANIZATION_UNIT);
				else if (isChildOuForbidden) if (tokenOuId) {
					setSelectedOuId(tokenOuId);
					setCurrentStep(require_user_create_flow.UserCreateFlowStep.USER_DETAILS);
				} else setError(t("users:createWizard.errors.noOuAccess"));
				else {
					setSelectedOuId(selectedSchema?.ouId ?? null);
					setCurrentStep(require_user_create_flow.UserCreateFlowStep.USER_DETAILS);
				}
				break;
			case require_user_create_flow.UserCreateFlowStep.ORGANIZATION_UNIT:
				setCurrentStep(require_user_create_flow.UserCreateFlowStep.USER_DETAILS);
				break;
			case require_user_create_flow.UserCreateFlowStep.USER_DETAILS:
				handleSubmit().catch(() => {});
				break;
			default: break;
		}
	};
	const handlePrevStep = () => {
		switch (currentStep) {
			case require_user_create_flow.UserCreateFlowStep.ORGANIZATION_UNIT:
				setCurrentStep(require_user_create_flow.UserCreateFlowStep.USER_TYPE);
				break;
			case require_user_create_flow.UserCreateFlowStep.USER_DETAILS:
				if (hasChildOUs) setCurrentStep(require_user_create_flow.UserCreateFlowStep.ORGANIZATION_UNIT);
				else setCurrentStep(require_user_create_flow.UserCreateFlowStep.USER_TYPE);
				break;
			default: break;
		}
	};
	const renderStepContent = () => {
		switch (currentStep) {
			case require_user_create_flow.UserCreateFlowStep.USER_TYPE: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureUserType.default, {
				schemas: userTypes,
				selectedSchema,
				onSchemaChange: handleSchemaChange,
				onReadyChange: handleUserTypeStepReadyChange
			});
			case require_user_create_flow.UserCreateFlowStep.ORGANIZATION_UNIT:
				if (!selectedSchema?.ouId) {
					setCurrentStep(require_user_create_flow.UserCreateFlowStep.USER_TYPE);
					return null;
				}
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureOrganizationUnit.default, {
					rootOuId: selectedSchema.ouId,
					selectedOuId: selectedOuId ?? "",
					onOuIdChange: setSelectedOuId,
					onReadyChange: handleOrganizationUnitStepReadyChange
				}, selectedSchema.ouId);
			case require_user_create_flow.UserCreateFlowStep.USER_DETAILS:
				if (isSchemaLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						textAlign: "center",
						py: 4
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("common:status.loading")
					})
				});
				if (!userTypeDetails) return null;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureUserDetails.default, {
					schema: userTypeDetails,
					defaultValues: formValues,
					onFormValuesChange: setFormValues,
					onReadyChange: handleUserDetailsStepReadyChange
				}, selectedSchema?.id);
			default: return null;
		}
	};
	const getStepProgress = () => {
		return (activeSteps.indexOf(currentStep) + 1) / activeSteps.length * 100;
	};
	const getBreadcrumbSteps = () => {
		const currentIndex = activeSteps.indexOf(currentStep);
		return activeSteps.slice(0, currentIndex + 1);
	};
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};
	const isLastStep = currentStep === activeSteps[activeSteps.length - 1];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.LinearProgress, {
				variant: "determinate",
				value: getStepProgress(),
				sx: { height: 6 }
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
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
							"aria-label": t("common:actions.close"),
							onClick: handleClose,
							sx: {
								bgcolor: "background.paper",
								"&:hover": { bgcolor: "action.hover" },
								boxShadow: 1
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.X, { size: 24 })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Breadcrumbs, {
							separator: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronRight, { size: 16 }),
							"aria-label": "breadcrumb",
							children: getBreadcrumbSteps().map((step, index, array) => {
								return index === array.length - 1 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "h5",
									color: "text.primary",
									children: steps[step]?.label
								}, step) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "h5",
									color: "inherit",
									role: "button",
									tabIndex: 0,
									onClick: () => setCurrentStep(step),
									onKeyDown: (e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											setCurrentStep(step);
										}
									},
									sx: {
										cursor: "pointer",
										"&:hover": { textDecoration: "underline" }
									},
									children: steps[step]?.label
								}, step);
							})
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
							px: 20,
							mx: currentStep !== require_user_create_flow.UserCreateFlowStep.USER_DETAILS ? "auto" : 0,
							alignItems: "flex-start"
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
							sx: {
								width: "100%",
								maxWidth: 800,
								display: "flex",
								flexDirection: "column"
							},
							children: [
								error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
									severity: "error",
									sx: { my: 3 },
									onClose: () => setError(null),
									children: error
								}),
								createUserMutation.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
									severity: "error",
									sx: { mb: 3 },
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
										variant: "body2",
										sx: {
											fontWeight: "bold",
											mb: .5
										},
										children: createUserMutation.error.message
									})
								}),
								renderStepContent(),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
									direction: "row",
									justifyContent: "flex-end",
									alignItems: "center",
									spacing: 2,
									sx: { mt: 4 },
									children: [currentStep !== require_user_create_flow.UserCreateFlowStep.USER_TYPE && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
										variant: "text",
										onClick: handlePrevStep,
										disabled: createUserMutation.isPending,
										children: t("common:actions.back")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
										variant: "contained",
										disabled: !stepReady[currentStep] || createUserMutation.isPending || currentStep === require_user_create_flow.UserCreateFlowStep.USER_TYPE && Boolean(selectedSchema?.ouId) && isChildOuLoading,
										sx: { minWidth: 140 },
										onClick: handleNextStep,
										children: (() => {
											if (!isLastStep) return t("common:actions.continue");
											if (createUserMutation.isPending) return t("common:status.saving");
											return t("users:createUser.title");
										})()
									})]
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Snackbar, {
				open: snackbarOpen,
				autoHideDuration: 6e3,
				onClose: handleCloseSnackbar,
				anchorOrigin: {
					vertical: "top",
					horizontal: "right"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					onClose: handleCloseSnackbar,
					severity: "error",
					sx: { width: "100%" },
					children: validationError
				})
			})
		]
	});
}

//#endregion
exports.default = UserCreatePage;