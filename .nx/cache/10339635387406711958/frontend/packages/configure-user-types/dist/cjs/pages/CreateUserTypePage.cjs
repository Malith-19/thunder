const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useCreateUserType = require('../api/useCreateUserType.cjs');
const require_ConfigureGeneral = require('../components/create-user-type/ConfigureGeneral.cjs');
const require_ConfigureName = require('../components/create-user-type/ConfigureName.cjs');
const require_ConfigureProperties = require('../components/create-user-type/ConfigureProperties.cjs');
const require_user_type_create_flow = require('../models/user-type-create-flow.cjs');
const require_useUserTypeCreate = require('../contexts/UserTypeCreate/useUserTypeCreate.cjs');
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

//#region src/pages/CreateUserTypePage.tsx
function CreateUserTypePage() {
	const { t } = (0, react_i18next.useTranslation)();
	const navigate = (0, react_router.useNavigate)();
	const logger = (0, __thunderid_logger_react.useLogger)("CreateUserTypePage");
	const createUserTypeMutation = require_useCreateUserType.default();
	const { currentStep, setCurrentStep, name, setName, ouId, setOuId, allowSelfRegistration, setAllowSelfRegistration, properties, setProperties, enumInput, setEnumInput, displayAttribute, setDisplayAttribute, error, setError } = require_useUserTypeCreate.default();
	const steps = (0, react.useMemo)(() => ({
		NAME: {
			label: t("userTypes:createWizard.steps.name"),
			order: 1
		},
		GENERAL: {
			label: t("userTypes:createWizard.steps.general"),
			order: 2
		},
		PROPERTIES: {
			label: t("userTypes:createWizard.steps.properties"),
			order: 3
		}
	}), [t]);
	const [validationError, setValidationError] = (0, react.useState)(null);
	const [snackbarOpen, setSnackbarOpen] = (0, react.useState)(false);
	const [stepReady, setStepReady] = (0, react.useState)({
		NAME: false,
		GENERAL: false,
		PROPERTIES: false
	});
	const handleClose = () => {
		navigate("/user-types");
	};
	const handleStepReadyChange = (0, react.useCallback)((step, isReady) => {
		setStepReady((prev) => ({
			...prev,
			[step]: isReady
		}));
	}, []);
	const handleNameStepReadyChange = (0, react.useCallback)((isReady) => {
		handleStepReadyChange(require_user_type_create_flow.UserTypeCreateFlowStep.NAME, isReady);
	}, [handleStepReadyChange]);
	const handleGeneralStepReadyChange = (0, react.useCallback)((isReady) => {
		handleStepReadyChange(require_user_type_create_flow.UserTypeCreateFlowStep.GENERAL, isReady);
	}, [handleStepReadyChange]);
	const handlePropertiesStepReadyChange = (0, react.useCallback)((isReady) => {
		handleStepReadyChange(require_user_type_create_flow.UserTypeCreateFlowStep.PROPERTIES, isReady);
	}, [handleStepReadyChange]);
	const handleSubmit = async () => {
		setValidationError(null);
		setError(null);
		if (!name.trim()) {
			setValidationError(t("userTypes:validationErrors.nameRequired"));
			setSnackbarOpen(true);
			return;
		}
		const trimmedOuId = ouId.trim();
		if (!trimmedOuId) {
			setValidationError(t("userTypes:validationErrors.ouIdRequired"));
			setSnackbarOpen(true);
			return;
		}
		const validProperties = properties.filter((prop) => prop.name.trim());
		if (validProperties.length === 0) {
			setValidationError(t("userTypes:validationErrors.propertiesRequired"));
			setSnackbarOpen(true);
			return;
		}
		const propertyNames = validProperties.map((prop) => prop.name.trim());
		const duplicates = propertyNames.filter((propName, index) => propertyNames.indexOf(propName) !== index);
		if (duplicates.length > 0) {
			setValidationError(t("userTypes:validationErrors.duplicateProperties", { duplicates: duplicates.join(", ") }));
			setSnackbarOpen(true);
			return;
		}
		const schema = {};
		validProperties.forEach((prop) => {
			const actualType = prop.type === "enum" ? "string" : prop.type;
			const propDef = {
				type: actualType,
				required: prop.required,
				...prop.displayName.trim() ? { displayName: prop.displayName.trim() } : {}
			};
			if (actualType === "string" || actualType === "number") {
				if (prop.unique) propDef.unique = true;
				if (prop.credential) propDef.credential = true;
			}
			if (actualType === "string") {
				if (prop.type === "enum" || prop.enum.length > 0) propDef.enum = prop.enum;
				if (prop.regex.trim()) propDef.regex = prop.regex;
			}
			if (actualType === "array") propDef.items = { type: "string" };
			else if (actualType === "object") propDef.properties = {};
			schema[prop.name.trim()] = propDef;
		});
		const requestBody = {
			name: name.trim(),
			ouId: trimmedOuId,
			schema
		};
		if (allowSelfRegistration) requestBody.allowSelfRegistration = true;
		if (displayAttribute) requestBody.systemAttributes = { display: displayAttribute };
		try {
			await createUserTypeMutation.mutateAsync(requestBody);
			await navigate("/user-types");
		} catch (submitError) {
			logger.error("Failed to create user type or navigate", {
				error: submitError,
				userTypeName: name
			});
		}
	};
	const handleNextStep = () => {
		switch (currentStep) {
			case require_user_type_create_flow.UserTypeCreateFlowStep.NAME:
				setCurrentStep(require_user_type_create_flow.UserTypeCreateFlowStep.GENERAL);
				break;
			case require_user_type_create_flow.UserTypeCreateFlowStep.GENERAL:
				setCurrentStep(require_user_type_create_flow.UserTypeCreateFlowStep.PROPERTIES);
				break;
			case require_user_type_create_flow.UserTypeCreateFlowStep.PROPERTIES:
				handleSubmit().catch(() => {});
				break;
			default: break;
		}
	};
	const handlePrevStep = () => {
		switch (currentStep) {
			case require_user_type_create_flow.UserTypeCreateFlowStep.GENERAL:
				setCurrentStep(require_user_type_create_flow.UserTypeCreateFlowStep.NAME);
				break;
			case require_user_type_create_flow.UserTypeCreateFlowStep.PROPERTIES:
				setCurrentStep(require_user_type_create_flow.UserTypeCreateFlowStep.GENERAL);
				break;
			default: break;
		}
	};
	const renderStepContent = () => {
		switch (currentStep) {
			case require_user_type_create_flow.UserTypeCreateFlowStep.NAME: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureName.default, {
				name,
				onNameChange: setName,
				onReadyChange: handleNameStepReadyChange
			});
			case require_user_type_create_flow.UserTypeCreateFlowStep.GENERAL: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureGeneral.default, {
				ouId,
				onOuIdChange: setOuId,
				allowSelfRegistration,
				onAllowSelfRegistrationChange: setAllowSelfRegistration,
				onReadyChange: handleGeneralStepReadyChange
			});
			case require_user_type_create_flow.UserTypeCreateFlowStep.PROPERTIES: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureProperties.default, {
				properties,
				onPropertiesChange: setProperties,
				enumInput,
				onEnumInputChange: setEnumInput,
				displayAttribute,
				onDisplayAttributeChange: setDisplayAttribute,
				onReadyChange: handlePropertiesStepReadyChange,
				userTypeName: name.trim()
			});
			default: return null;
		}
	};
	const getStepProgress = () => {
		const stepNames = Object.keys(steps);
		return (stepNames.indexOf(currentStep) + 1) / stepNames.length * 100;
	};
	const getBreadcrumbSteps = () => {
		const allSteps = [
			require_user_type_create_flow.UserTypeCreateFlowStep.NAME,
			require_user_type_create_flow.UserTypeCreateFlowStep.GENERAL,
			require_user_type_create_flow.UserTypeCreateFlowStep.PROPERTIES
		];
		const currentIndex = allSteps.indexOf(currentStep);
		return allSteps.slice(0, currentIndex + 1);
	};
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};
	const isLastStep = currentStep === require_user_type_create_flow.UserTypeCreateFlowStep.PROPERTIES;
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
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.AppBreadcrumbs, { items: getBreadcrumbSteps().map((step, index, array) => ({
							key: step,
							label: steps[step].label,
							onClick: index < array.length - 1 ? () => setCurrentStep(step) : void 0
						})) })]
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
							mx: currentStep === require_user_type_create_flow.UserTypeCreateFlowStep.NAME ? "auto" : 0,
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
								createUserTypeMutation.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
									severity: "error",
									sx: { mb: 3 },
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
										variant: "body2",
										sx: {
											fontWeight: "bold",
											mb: .5
										},
										children: createUserTypeMutation.error.message
									})
								}),
								renderStepContent(),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
									direction: "row",
									justifyContent: "flex-end",
									alignItems: "center",
									spacing: 2,
									sx: { mt: 4 },
									children: [currentStep !== require_user_type_create_flow.UserTypeCreateFlowStep.NAME && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
										variant: "text",
										onClick: handlePrevStep,
										disabled: createUserTypeMutation.isPending,
										children: t("common:actions.back")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
										variant: "contained",
										disabled: !stepReady[currentStep] || createUserTypeMutation.isPending,
										sx: { minWidth: 140 },
										onClick: handleNextStep,
										children: (() => {
											if (!isLastStep) return t("common:actions.continue");
											if (createUserTypeMutation.isPending) return t("common:status.saving");
											return t("userTypes:createUserType");
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
exports.default = CreateUserTypePage;