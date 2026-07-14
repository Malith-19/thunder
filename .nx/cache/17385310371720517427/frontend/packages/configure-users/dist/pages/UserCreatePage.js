import useCreateUser from "../api/useCreateUser.js";
import useGetUserType from "../api/useGetUserType.js";
import useGetUserTypes from "../api/useGetUserTypes.js";
import { useGetChildOrganizationUnits } from "../configure-organization-units/dist/api/useGetChildOrganizationUnits.js";
import ConfigureOrganizationUnit from "../components/create-user/ConfigureOrganizationUnit.js";
import ConfigureUserDetails from "../components/create-user/ConfigureUserDetails.js";
import ConfigureUserType from "../components/create-user/ConfigureUserType.js";
import { UserCreateFlowStep } from "../models/user-create-flow.js";
import useUserCreate from "../contexts/UserCreate/useUserCreate.js";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";
import { Alert, Box, Breadcrumbs, Button, IconButton, LinearProgress, Snackbar, Stack, Typography } from "@wso2/oxygen-ui";
import { ChevronRight, X } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { useNavigate } from "react-router";

//#region src/pages/UserCreatePage.tsx
function UserCreatePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const logger = useLogger("UserCreatePage");
	const createUserMutation = useCreateUser();
	const { currentStep, setCurrentStep, selectedSchema, setSelectedSchema, selectedOuId, setSelectedOuId, formValues, setFormValues, error, setError } = useUserCreate();
	const { data: userTypesData } = useGetUserTypes();
	const { data: userTypeDetails, isLoading: isSchemaLoading } = useGetUserType(selectedSchema?.id);
	const { data: childOuData, isLoading: isChildOuLoading, error: childOuError } = useGetChildOrganizationUnits(selectedSchema?.ouId, {
		limit: 1,
		offset: 0
	});
	const tokenOuId = useThunderID().user?.ouId ?? null;
	const isChildOuForbidden = childOuError?.response?.status === 403;
	const isChildOuProbeFailed = !!childOuError && !isChildOuForbidden;
	const userTypes = useMemo(() => userTypesData?.types ?? [], [userTypesData]);
	const hasChildOUs = !isChildOuLoading && !childOuError && (childOuData?.totalResults ?? 0) > 0;
	const activeSteps = useMemo(() => {
		const base = [UserCreateFlowStep.USER_TYPE];
		if (hasChildOUs) base.push(UserCreateFlowStep.ORGANIZATION_UNIT);
		base.push(UserCreateFlowStep.USER_DETAILS);
		return base;
	}, [hasChildOUs]);
	const steps = useMemo(() => {
		const map = { USER_TYPE: { label: t("users:createWizard.steps.userType") } };
		if (hasChildOUs) map.ORGANIZATION_UNIT = { label: t("users:createWizard.steps.organizationUnit") };
		map.USER_DETAILS = { label: t("users:createWizard.steps.userDetails") };
		return map;
	}, [t, hasChildOUs]);
	const [validationError, setValidationError] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [stepReady, setStepReady] = useState({
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
	const handleStepReadyChange = useCallback((step, isReady) => {
		setStepReady((prev) => ({
			...prev,
			[step]: isReady
		}));
	}, []);
	const handleUserTypeStepReadyChange = useCallback((isReady) => {
		handleStepReadyChange(UserCreateFlowStep.USER_TYPE, isReady);
	}, [handleStepReadyChange]);
	const handleOrganizationUnitStepReadyChange = useCallback((isReady) => {
		handleStepReadyChange(UserCreateFlowStep.ORGANIZATION_UNIT, isReady);
	}, [handleStepReadyChange]);
	const handleUserDetailsStepReadyChange = useCallback((isReady) => {
		handleStepReadyChange(UserCreateFlowStep.USER_DETAILS, isReady);
	}, [handleStepReadyChange]);
	const handleSchemaChange = useCallback((schema) => {
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
			case UserCreateFlowStep.USER_TYPE:
				if (selectedSchema?.ouId && isChildOuLoading) return;
				if (isChildOuProbeFailed) {
					setError(t("users:createWizard.errors.childOuProbeFailed"));
					return;
				}
				if (hasChildOUs) setCurrentStep(UserCreateFlowStep.ORGANIZATION_UNIT);
				else if (isChildOuForbidden) if (tokenOuId) {
					setSelectedOuId(tokenOuId);
					setCurrentStep(UserCreateFlowStep.USER_DETAILS);
				} else setError(t("users:createWizard.errors.noOuAccess"));
				else {
					setSelectedOuId(selectedSchema?.ouId ?? null);
					setCurrentStep(UserCreateFlowStep.USER_DETAILS);
				}
				break;
			case UserCreateFlowStep.ORGANIZATION_UNIT:
				setCurrentStep(UserCreateFlowStep.USER_DETAILS);
				break;
			case UserCreateFlowStep.USER_DETAILS:
				handleSubmit().catch(() => {});
				break;
			default: break;
		}
	};
	const handlePrevStep = () => {
		switch (currentStep) {
			case UserCreateFlowStep.ORGANIZATION_UNIT:
				setCurrentStep(UserCreateFlowStep.USER_TYPE);
				break;
			case UserCreateFlowStep.USER_DETAILS:
				if (hasChildOUs) setCurrentStep(UserCreateFlowStep.ORGANIZATION_UNIT);
				else setCurrentStep(UserCreateFlowStep.USER_TYPE);
				break;
			default: break;
		}
	};
	const renderStepContent = () => {
		switch (currentStep) {
			case UserCreateFlowStep.USER_TYPE: return /* @__PURE__ */ jsx(ConfigureUserType, {
				schemas: userTypes,
				selectedSchema,
				onSchemaChange: handleSchemaChange,
				onReadyChange: handleUserTypeStepReadyChange
			});
			case UserCreateFlowStep.ORGANIZATION_UNIT:
				if (!selectedSchema?.ouId) {
					setCurrentStep(UserCreateFlowStep.USER_TYPE);
					return null;
				}
				return /* @__PURE__ */ jsx(ConfigureOrganizationUnit, {
					rootOuId: selectedSchema.ouId,
					selectedOuId: selectedOuId ?? "",
					onOuIdChange: setSelectedOuId,
					onReadyChange: handleOrganizationUnitStepReadyChange
				}, selectedSchema.ouId);
			case UserCreateFlowStep.USER_DETAILS:
				if (isSchemaLoading) return /* @__PURE__ */ jsx(Box, {
					sx: {
						textAlign: "center",
						py: 4
					},
					children: /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("common:status.loading")
					})
				});
				if (!userTypeDetails) return null;
				return /* @__PURE__ */ jsx(ConfigureUserDetails, {
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
						}), /* @__PURE__ */ jsx(Breadcrumbs, {
							separator: /* @__PURE__ */ jsx(ChevronRight, { size: 16 }),
							"aria-label": "breadcrumb",
							children: getBreadcrumbSteps().map((step, index, array) => {
								return index === array.length - 1 ? /* @__PURE__ */ jsx(Typography, {
									variant: "h5",
									color: "text.primary",
									children: steps[step]?.label
								}, step) : /* @__PURE__ */ jsx(Typography, {
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
							mx: currentStep !== UserCreateFlowStep.USER_DETAILS ? "auto" : 0,
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
								createUserMutation.error && /* @__PURE__ */ jsx(Alert, {
									severity: "error",
									sx: { mb: 3 },
									children: /* @__PURE__ */ jsx(Typography, {
										variant: "body2",
										sx: {
											fontWeight: "bold",
											mb: .5
										},
										children: createUserMutation.error.message
									})
								}),
								renderStepContent(),
								/* @__PURE__ */ jsxs(Stack, {
									direction: "row",
									justifyContent: "flex-end",
									alignItems: "center",
									spacing: 2,
									sx: { mt: 4 },
									children: [currentStep !== UserCreateFlowStep.USER_TYPE && /* @__PURE__ */ jsx(Button, {
										variant: "text",
										onClick: handlePrevStep,
										disabled: createUserMutation.isPending,
										children: t("common:actions.back")
									}), /* @__PURE__ */ jsx(Button, {
										variant: "contained",
										disabled: !stepReady[currentStep] || createUserMutation.isPending || currentStep === UserCreateFlowStep.USER_TYPE && Boolean(selectedSchema?.ouId) && isChildOuLoading,
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
export { UserCreatePage as default };