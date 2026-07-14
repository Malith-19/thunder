import useCreateResourceServer from "../api/useCreateResourceServer.js";
import { deriveHandle } from "../utils/deriveHandle.js";
import ConfigureName from "../components/create-resource-server/ConfigureName.js";
import ConfigureOrgUnit from "../components/create-resource-server/ConfigureOrgUnit.js";
import { DEFAULT_PERMISSION_DELIMITER } from "../constants/permission-constants.js";
import ConfigureSeparator from "../components/create-resource-server/ConfigureSeparator.js";
import ConfigureType from "../components/create-resource-server/ConfigureType.js";
import { useToast } from "@thunderid/contexts";
import { Alert, Box, Breadcrumbs, Button, CircularProgress, IconButton, LinearProgress, Stack, Typography } from "@wso2/oxygen-ui";
import { ChevronRight, X } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { useNavigate } from "react-router";
import { useHasMultipleOUs } from "@thunderid/configure-organization-units";

//#region src/pages/CreateResourceServerPage.tsx
const ResourceServerCreateStep = {
	TYPE: "TYPE",
	NAME: "NAME",
	SEPARATOR: "SEPARATOR",
	ORGANIZATION_UNIT: "ORGANIZATION_UNIT"
};
function CreateResourceServerPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("CreateResourceServerPage");
	const createResourceServer = useCreateResourceServer();
	const { hasMultipleOUs, isLoading: isOuLoading, ouList } = useHasMultipleOUs();
	const [currentStep, setCurrentStep] = useState(ResourceServerCreateStep.TYPE);
	const [selectedType, setSelectedType] = useState(void 0);
	const [name, setName] = useState("");
	const [handle, setHandle] = useState("");
	const [delimiter, setDelimiter] = useState(DEFAULT_PERMISSION_DELIMITER);
	const [ouId, setOuId] = useState("");
	const [error, setError] = useState(null);
	const [handleEdited, setHandleEdited] = useState(false);
	const [stepReady, setStepReady] = useState({
		TYPE: false,
		NAME: false,
		SEPARATOR: false,
		ORGANIZATION_UNIT: false
	});
	const handleDelimiterChange = useCallback((newDelimiter) => {
		setDelimiter(newDelimiter);
		if (!handleEdited && name) setHandle(deriveHandle(name, newDelimiter));
	}, [handleEdited, name]);
	const steps = useMemo(() => ({
		TYPE: {
			label: t("resourceServers:create.steps.type", "Type"),
			order: 1
		},
		NAME: {
			label: t("resourceServers:create.steps.name", "Name"),
			order: 2
		},
		SEPARATOR: {
			label: t("resourceServers:create.steps.separator", "Permission Delimiter"),
			order: 3
		},
		ORGANIZATION_UNIT: {
			label: t("resourceServers:create.steps.organizationUnit", "Organization"),
			order: 4
		}
	}), [t]);
	const effectiveOuId = hasMultipleOUs ? ouId : ouList[0]?.id ?? "";
	const handleClose = () => {
		(async () => {
			await navigate("/resource-servers");
		})().catch((err) => {
			logger.error("Failed to navigate to resource servers list", { error: err });
		});
	};
	const handleStepReadyChange = useCallback((step, isReady) => {
		setStepReady((prev) => ({
			...prev,
			[step]: isReady
		}));
	}, []);
	const handleNameReadyChange = useCallback((isReady) => handleStepReadyChange(ResourceServerCreateStep.NAME, isReady), [handleStepReadyChange]);
	const handleSeparatorReadyChange = useCallback((isReady) => handleStepReadyChange(ResourceServerCreateStep.SEPARATOR, isReady), [handleStepReadyChange]);
	const handleOuReadyChange = useCallback((isReady) => handleStepReadyChange(ResourceServerCreateStep.ORGANIZATION_UNIT, isReady), [handleStepReadyChange]);
	const handleTypeSelect = useCallback((value) => {
		setSelectedType(value);
		handleStepReadyChange(ResourceServerCreateStep.TYPE, true);
	}, [handleStepReadyChange]);
	const isLastStep = currentStep === ResourceServerCreateStep.ORGANIZATION_UNIT || currentStep === ResourceServerCreateStep.SEPARATOR && !hasMultipleOUs;
	const handleNext = () => {
		setError(null);
		if (currentStep === ResourceServerCreateStep.TYPE) {
			setCurrentStep(ResourceServerCreateStep.NAME);
			return;
		}
		if (currentStep === ResourceServerCreateStep.NAME) {
			setCurrentStep(ResourceServerCreateStep.SEPARATOR);
			return;
		}
		if (currentStep === ResourceServerCreateStep.SEPARATOR && !isOuLoading && hasMultipleOUs) {
			setCurrentStep(ResourceServerCreateStep.ORGANIZATION_UNIT);
			return;
		}
		const resolvedOuId = effectiveOuId;
		if (!resolvedOuId) return;
		const payload = {
			name: name.trim(),
			handle: handle.trim() || null,
			ouId: resolvedOuId,
			type: selectedType,
			delimiter
		};
		createResourceServer.mutate(payload, {
			onSuccess: (created) => {
				showToast(t("resourceServers:create.success", "Resource server created successfully."), "success");
				(async () => {
					await navigate(`/resource-servers/${created.id}?tab=resources`);
				})().catch((err) => {
					logger.error("Failed to navigate after create", { error: err });
				});
			},
			onError: (err) => {
				logger.error("Failed to create resource server", { error: err });
				setError(err.message);
			}
		});
	};
	const handleBack = () => {
		if (currentStep === ResourceServerCreateStep.ORGANIZATION_UNIT) setCurrentStep(ResourceServerCreateStep.SEPARATOR);
		else if (currentStep === ResourceServerCreateStep.SEPARATOR) setCurrentStep(ResourceServerCreateStep.NAME);
		else if (currentStep === ResourceServerCreateStep.NAME) setCurrentStep(ResourceServerCreateStep.TYPE);
	};
	const isNextDisabled = createResourceServer.isPending || !stepReady[currentStep] || isLastStep && isOuLoading;
	const getProgress = () => {
		const totalSteps = hasMultipleOUs ? 4 : 3;
		return steps[currentStep].order / totalSteps * 100;
	};
	const getBreadcrumbSteps = () => {
		const all = [
			ResourceServerCreateStep.TYPE,
			ResourceServerCreateStep.NAME,
			ResourceServerCreateStep.SEPARATOR
		];
		if (hasMultipleOUs) all.push(ResourceServerCreateStep.ORGANIZATION_UNIT);
		const idx = all.indexOf(currentStep);
		return all.slice(0, idx + 1);
	};
	const renderStep = () => {
		switch (currentStep) {
			case ResourceServerCreateStep.TYPE: return /* @__PURE__ */ jsx(ConfigureType, {
				selectedType,
				onSelect: handleTypeSelect
			});
			case ResourceServerCreateStep.NAME: return /* @__PURE__ */ jsx(ConfigureName, {
				name,
				handle,
				delimiter,
				handleEdited,
				onHandleEditedChange: setHandleEdited,
				onNameChange: setName,
				onHandleChange: setHandle,
				onReadyChange: handleNameReadyChange
			});
			case ResourceServerCreateStep.SEPARATOR: return /* @__PURE__ */ jsx(ConfigureSeparator, {
				delimiter,
				handle,
				onDelimiterChange: handleDelimiterChange,
				onReadyChange: handleSeparatorReadyChange
			});
			case ResourceServerCreateStep.ORGANIZATION_UNIT: return /* @__PURE__ */ jsx(ConfigureOrgUnit, {
				selectedOuId: ouId,
				onOuIdChange: setOuId,
				onReadyChange: handleOuReadyChange
			});
			default: return null;
		}
	};
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		},
		children: [/* @__PURE__ */ jsx(LinearProgress, {
			variant: "determinate",
			value: getProgress(),
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
						}), /* @__PURE__ */ jsx(Breadcrumbs, {
							separator: /* @__PURE__ */ jsx(ChevronRight, { size: 16 }),
							"aria-label": "breadcrumb",
							children: getBreadcrumbSteps().map((step, index, array) => {
								return index === array.length - 1 ? /* @__PURE__ */ jsx(Typography, {
									variant: "h5",
									color: "text.primary",
									children: steps[step].label
								}, step) : /* @__PURE__ */ jsx(Typography, {
									variant: "h5",
									onClick: () => setCurrentStep(step),
									sx: { cursor: "pointer" },
									children: steps[step].label
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
							mx: "auto"
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
									sx: { mb: 4 },
									onClose: () => setError(null),
									children: error
								}),
								renderStep(),
								/* @__PURE__ */ jsxs(Box, {
									sx: {
										mt: 4,
										display: "flex",
										justifyContent: currentStep === ResourceServerCreateStep.TYPE ? "flex-end" : "space-between",
										gap: 2
									},
									children: [currentStep !== ResourceServerCreateStep.TYPE && /* @__PURE__ */ jsx(Button, {
										variant: "outlined",
										onClick: handleBack,
										sx: { minWidth: 100 },
										disabled: createResourceServer.isPending,
										children: t("common:actions.back", "Back")
									}), /* @__PURE__ */ jsxs(Box, {
										sx: {
											display: "flex",
											alignItems: "center",
											gap: 2
										},
										children: [createResourceServer.isPending && /* @__PURE__ */ jsx(CircularProgress, { size: 20 }), /* @__PURE__ */ jsx(Button, {
											variant: "contained",
											disabled: isNextDisabled,
											sx: { minWidth: 100 },
											onClick: handleNext,
											children: isLastStep ? createResourceServer.isPending ? t("resourceServers:create.creating", "Creating…") : t("resourceServers:create.submit", "Create resource server") : t("common:actions.continue", "Continue")
										})]
									})]
								})
							]
						})
					})
				})]
			})
		})]
	});
}

//#endregion
export { CreateResourceServerPage as default };