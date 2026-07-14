const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useCreateResourceServer = require('../api/useCreateResourceServer.cjs');
const require_deriveHandle = require('../utils/deriveHandle.cjs');
const require_ConfigureName = require('../components/create-resource-server/ConfigureName.cjs');
const require_ConfigureOrgUnit = require('../components/create-resource-server/ConfigureOrgUnit.cjs');
const require_permission_constants = require('../constants/permission-constants.cjs');
const require_ConfigureSeparator = require('../components/create-resource-server/ConfigureSeparator.cjs');
const require_ConfigureType = require('../components/create-resource-server/ConfigureType.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let __thunderid_configure_organization_units = require("@thunderid/configure-organization-units");
__thunderid_configure_organization_units = require_rolldown_runtime.__toESM(__thunderid_configure_organization_units);

//#region src/pages/CreateResourceServerPage.tsx
const ResourceServerCreateStep = {
	TYPE: "TYPE",
	NAME: "NAME",
	SEPARATOR: "SEPARATOR",
	ORGANIZATION_UNIT: "ORGANIZATION_UNIT"
};
function CreateResourceServerPage() {
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("CreateResourceServerPage");
	const createResourceServer = require_useCreateResourceServer.default();
	const { hasMultipleOUs, isLoading: isOuLoading, ouList } = (0, __thunderid_configure_organization_units.useHasMultipleOUs)();
	const [currentStep, setCurrentStep] = (0, react.useState)(ResourceServerCreateStep.TYPE);
	const [selectedType, setSelectedType] = (0, react.useState)(void 0);
	const [name, setName] = (0, react.useState)("");
	const [handle, setHandle] = (0, react.useState)("");
	const [delimiter, setDelimiter] = (0, react.useState)(require_permission_constants.DEFAULT_PERMISSION_DELIMITER);
	const [ouId, setOuId] = (0, react.useState)("");
	const [error, setError] = (0, react.useState)(null);
	const [handleEdited, setHandleEdited] = (0, react.useState)(false);
	const [stepReady, setStepReady] = (0, react.useState)({
		TYPE: false,
		NAME: false,
		SEPARATOR: false,
		ORGANIZATION_UNIT: false
	});
	const handleDelimiterChange = (0, react.useCallback)((newDelimiter) => {
		setDelimiter(newDelimiter);
		if (!handleEdited && name) setHandle(require_deriveHandle.deriveHandle(name, newDelimiter));
	}, [handleEdited, name]);
	const steps = (0, react.useMemo)(() => ({
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
	const handleStepReadyChange = (0, react.useCallback)((step, isReady) => {
		setStepReady((prev) => ({
			...prev,
			[step]: isReady
		}));
	}, []);
	const handleNameReadyChange = (0, react.useCallback)((isReady) => handleStepReadyChange(ResourceServerCreateStep.NAME, isReady), [handleStepReadyChange]);
	const handleSeparatorReadyChange = (0, react.useCallback)((isReady) => handleStepReadyChange(ResourceServerCreateStep.SEPARATOR, isReady), [handleStepReadyChange]);
	const handleOuReadyChange = (0, react.useCallback)((isReady) => handleStepReadyChange(ResourceServerCreateStep.ORGANIZATION_UNIT, isReady), [handleStepReadyChange]);
	const handleTypeSelect = (0, react.useCallback)((value) => {
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
			case ResourceServerCreateStep.TYPE: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureType.default, {
				selectedType,
				onSelect: handleTypeSelect
			});
			case ResourceServerCreateStep.NAME: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureName.default, {
				name,
				handle,
				delimiter,
				handleEdited,
				onHandleEditedChange: setHandleEdited,
				onNameChange: setName,
				onHandleChange: setHandle,
				onReadyChange: handleNameReadyChange
			});
			case ResourceServerCreateStep.SEPARATOR: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureSeparator.default, {
				delimiter,
				handle,
				onDelimiterChange: handleDelimiterChange,
				onReadyChange: handleSeparatorReadyChange
			});
			case ResourceServerCreateStep.ORGANIZATION_UNIT: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ConfigureOrgUnit.default, {
				selectedOuId: ouId,
				onOuIdChange: setOuId,
				onReadyChange: handleOuReadyChange
			});
			default: return null;
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.LinearProgress, {
			variant: "determinate",
			value: getProgress(),
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
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Breadcrumbs, {
							separator: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronRight, { size: 16 }),
							"aria-label": "breadcrumb",
							children: getBreadcrumbSteps().map((step, index, array) => {
								return index === array.length - 1 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "h5",
									color: "text.primary",
									children: steps[step].label
								}, step) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "h5",
									onClick: () => setCurrentStep(step),
									sx: { cursor: "pointer" },
									children: steps[step].label
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
							mx: "auto"
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
									sx: { mb: 4 },
									onClose: () => setError(null),
									children: error
								}),
								renderStep(),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
									sx: {
										mt: 4,
										display: "flex",
										justifyContent: currentStep === ResourceServerCreateStep.TYPE ? "flex-end" : "space-between",
										gap: 2
									},
									children: [currentStep !== ResourceServerCreateStep.TYPE && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
										variant: "outlined",
										onClick: handleBack,
										sx: { minWidth: 100 },
										disabled: createResourceServer.isPending,
										children: t("common:actions.back", "Back")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
										sx: {
											display: "flex",
											alignItems: "center",
											gap: 2
										},
										children: [createResourceServer.isPending && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 20 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
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
exports.default = CreateResourceServerPage;