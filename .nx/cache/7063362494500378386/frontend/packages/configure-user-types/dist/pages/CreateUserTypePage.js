import useCreateUserType from "../api/useCreateUserType.js";
import ConfigureGeneral from "../components/create-user-type/ConfigureGeneral.js";
import ConfigureName from "../components/create-user-type/ConfigureName.js";
import ConfigureProperties from "../components/create-user-type/ConfigureProperties.js";
import { UserTypeCreateFlowStep } from "../models/user-type-create-flow.js";
import useUserTypeCreate from "../contexts/UserTypeCreate/useUserTypeCreate.js";
import { useTranslation } from "react-i18next";
import { useLogger } from "@thunderid/logger/react";
import { Alert, AppBreadcrumbs, Box, Button, IconButton, LinearProgress, Snackbar, Stack, Typography } from "@wso2/oxygen-ui";
import { X } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/pages/CreateUserTypePage.tsx
function CreateUserTypePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const logger = useLogger("CreateUserTypePage");
	const createUserTypeMutation = useCreateUserType();
	const { currentStep, setCurrentStep, name, setName, ouId, setOuId, allowSelfRegistration, setAllowSelfRegistration, properties, setProperties, enumInput, setEnumInput, displayAttribute, setDisplayAttribute, error, setError } = useUserTypeCreate();
	const steps = useMemo(() => ({
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
	const [validationError, setValidationError] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [stepReady, setStepReady] = useState({
		NAME: false,
		GENERAL: false,
		PROPERTIES: false
	});
	const handleClose = () => {
		navigate("/user-types");
	};
	const handleStepReadyChange = useCallback((step, isReady) => {
		setStepReady((prev) => ({
			...prev,
			[step]: isReady
		}));
	}, []);
	const handleNameStepReadyChange = useCallback((isReady) => {
		handleStepReadyChange(UserTypeCreateFlowStep.NAME, isReady);
	}, [handleStepReadyChange]);
	const handleGeneralStepReadyChange = useCallback((isReady) => {
		handleStepReadyChange(UserTypeCreateFlowStep.GENERAL, isReady);
	}, [handleStepReadyChange]);
	const handlePropertiesStepReadyChange = useCallback((isReady) => {
		handleStepReadyChange(UserTypeCreateFlowStep.PROPERTIES, isReady);
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
			case UserTypeCreateFlowStep.NAME:
				setCurrentStep(UserTypeCreateFlowStep.GENERAL);
				break;
			case UserTypeCreateFlowStep.GENERAL:
				setCurrentStep(UserTypeCreateFlowStep.PROPERTIES);
				break;
			case UserTypeCreateFlowStep.PROPERTIES:
				handleSubmit().catch(() => {});
				break;
			default: break;
		}
	};
	const handlePrevStep = () => {
		switch (currentStep) {
			case UserTypeCreateFlowStep.GENERAL:
				setCurrentStep(UserTypeCreateFlowStep.NAME);
				break;
			case UserTypeCreateFlowStep.PROPERTIES:
				setCurrentStep(UserTypeCreateFlowStep.GENERAL);
				break;
			default: break;
		}
	};
	const renderStepContent = () => {
		switch (currentStep) {
			case UserTypeCreateFlowStep.NAME: return /* @__PURE__ */ jsx(ConfigureName, {
				name,
				onNameChange: setName,
				onReadyChange: handleNameStepReadyChange
			});
			case UserTypeCreateFlowStep.GENERAL: return /* @__PURE__ */ jsx(ConfigureGeneral, {
				ouId,
				onOuIdChange: setOuId,
				allowSelfRegistration,
				onAllowSelfRegistrationChange: setAllowSelfRegistration,
				onReadyChange: handleGeneralStepReadyChange
			});
			case UserTypeCreateFlowStep.PROPERTIES: return /* @__PURE__ */ jsx(ConfigureProperties, {
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
			UserTypeCreateFlowStep.NAME,
			UserTypeCreateFlowStep.GENERAL,
			UserTypeCreateFlowStep.PROPERTIES
		];
		const currentIndex = allSteps.indexOf(currentStep);
		return allSteps.slice(0, currentIndex + 1);
	};
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};
	const isLastStep = currentStep === UserTypeCreateFlowStep.PROPERTIES;
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		},
		children: [
			/* @__PURE__ */ jsx(LinearProgress, {
				variant: "determinate",
				value: getStepProgress(),
				sx: { height: 6 }
			}),
			/* @__PURE__ */ jsxs(Box, {
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
							"aria-label": t("common:actions.close"),
							onClick: handleClose,
							sx: {
								bgcolor: "background.paper",
								"&:hover": { bgcolor: "action.hover" },
								boxShadow: 1
							},
							children: /* @__PURE__ */ jsx(X, { size: 24 })
						}), /* @__PURE__ */ jsx(AppBreadcrumbs, { items: getBreadcrumbSteps().map((step, index, array) => ({
							key: step,
							label: steps[step].label,
							onClick: index < array.length - 1 ? () => setCurrentStep(step) : void 0
						})) })]
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
							px: 20,
							mx: currentStep === UserTypeCreateFlowStep.NAME ? "auto" : 0,
							alignItems: "flex-start"
						},
						children: /* @__PURE__ */ jsxs(Box, {
							sx: {
								width: "100%",
								maxWidth: 800,
								display: "flex",
								flexDirection: "column"
							},
							children: [
								error && /* @__PURE__ */ jsx(Alert, {
									severity: "error",
									sx: { my: 3 },
									onClose: () => setError(null),
									children: error
								}),
								createUserTypeMutation.error && /* @__PURE__ */ jsx(Alert, {
									severity: "error",
									sx: { mb: 3 },
									children: /* @__PURE__ */ jsx(Typography, {
										variant: "body2",
										sx: {
											fontWeight: "bold",
											mb: .5
										},
										children: createUserTypeMutation.error.message
									})
								}),
								renderStepContent(),
								/* @__PURE__ */ jsxs(Stack, {
									direction: "row",
									justifyContent: "flex-end",
									alignItems: "center",
									spacing: 2,
									sx: { mt: 4 },
									children: [currentStep !== UserTypeCreateFlowStep.NAME && /* @__PURE__ */ jsx(Button, {
										variant: "text",
										onClick: handlePrevStep,
										disabled: createUserTypeMutation.isPending,
										children: t("common:actions.back")
									}), /* @__PURE__ */ jsx(Button, {
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
			/* @__PURE__ */ jsx(Snackbar, {
				open: snackbarOpen,
				autoHideDuration: 6e3,
				onClose: handleCloseSnackbar,
				anchorOrigin: {
					vertical: "top",
					horizontal: "right"
				},
				children: /* @__PURE__ */ jsx(Alert, {
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
export { CreateUserTypePage as default };