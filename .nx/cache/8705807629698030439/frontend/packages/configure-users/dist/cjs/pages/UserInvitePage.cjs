const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_CredentialFieldInput = require('../components/CredentialFieldInput.cjs');
const require_OrganizationUnitTreePicker = require('../configure-organization-units/dist/components/OrganizationUnitTreePicker.cjs');
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
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let __thunderid_design = require("@thunderid/design");
__thunderid_design = require_rolldown_runtime.__toESM(__thunderid_design);
let __hookform_resolvers_zod = require("@hookform/resolvers/zod");
__hookform_resolvers_zod = require_rolldown_runtime.__toESM(__hookform_resolvers_zod);
let react_hook_form = require("react-hook-form");
react_hook_form = require_rolldown_runtime.__toESM(react_hook_form);
let zod = require("zod");
zod = require_rolldown_runtime.__toESM(zod);

//#region src/pages/UserInvitePage.tsx
/**
* Derive the current step label from flow components.
* The backend sends HEADING_1 text component as step title.
*/
function deriveStepLabel(components, resolve, t) {
	const heading = components.find((comp) => (String(comp.type) === String(__thunderid_react.EmbeddedFlowComponentType.Text) || comp.type === "TEXT") && comp.variant === "HEADING_1" && typeof comp.label === "string");
	if (heading && typeof heading.label === "string") return t(resolve(heading.label) ?? heading.label);
	return "";
}
const FLOW_NOT_FOUND_ERROR_CODE = "FLM-1003";
function containsFlowNotFoundText(value) {
	return value?.toLowerCase().includes("flow not found") ?? false;
}
function isMissingOnboardingFlow(error) {
	if (!error || typeof error !== "object") return false;
	const flowError = error;
	const { response } = flowError;
	const apiError = response?.data;
	return apiError?.code === FLOW_NOT_FOUND_ERROR_CODE || flowError.code === FLOW_NOT_FOUND_ERROR_CODE || flowError.error?.code === FLOW_NOT_FOUND_ERROR_CODE || containsFlowNotFoundText(apiError?.message) || containsFlowNotFoundText(apiError?.description) || containsFlowNotFoundText(flowError.message) || containsFlowNotFoundText(flowError.error?.message?.defaultValue) || containsFlowNotFoundText(flowError.error?.description?.defaultValue);
}
const getOptionValue = (option) => {
	if (typeof option === "string") return option;
	if (typeof option === "object" && option !== null && "value" in option) {
		const { value } = option;
		if (typeof value === "string") return value;
		return JSON.stringify(value ?? option);
	}
	return JSON.stringify(option);
};
/**
* Returns true if the component tree contains any action or user-input components.
* Inputs are identified by having a `ref` property, actions by having an `eventType` property.
*/
function hasActionsOrInputs(comps) {
	return comps.some((c) => c.ref != null || c.eventType != null || Array.isArray(c.components) && hasActionsOrInputs(c.components));
}
const getOptionLabel = (option) => {
	if (typeof option === "string") return option;
	if (typeof option === "object" && option !== null && "label" in option) {
		const { label } = option;
		if (typeof label === "string") return label;
		return JSON.stringify(label ?? option);
	}
	return JSON.stringify(option);
};
/**
* Inner content component that renders the current flow step's form fields.
*/
function InviteUserStepContent({ renderProps, flowError, handleClose, onResetLocalState }) {
	const { additionalData, values, error, isLoading, components, handleInputChange, handleSubmit, resetFlow, isValid: propsIsValid } = renderProps;
	const { resolveFlowTemplateLiterals: rawResolve } = (0, __thunderid_react.useThunderID)();
	const resolve = (0, react.useCallback)((text) => text ? rawResolve(text) : void 0, [rawResolve]);
	const { t } = (0, react_i18next.useTranslation)();
	const [activeActionId, setActiveActionId] = (0, react.useState)(null);
	const buildFormSchema = (0, react.useMemo)(() => (comps) => {
		const shape = {};
		const processComponents = (compList) => {
			compList.forEach((comp) => {
				if ((String(comp.type) === String(__thunderid_react.EmbeddedFlowComponentType.Block) || comp.type === "BLOCK") && comp.components) processComponents(comp.components);
				else if ((String(comp.type) === String(__thunderid_react.EmbeddedFlowComponentType.TextInput) || comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "PHONE_INPUT" || comp.type === "PASSWORD_INPUT" || comp.type === "SELECT" || comp.type === "OU_SELECT") && comp.ref) {
					let fieldSchema = zod.z.string();
					if (comp.type === "EMAIL_INPUT") fieldSchema = zod.z.string().email("Please enter a valid email address");
					else if (comp.type === "PHONE_INPUT") fieldSchema = zod.z.string().regex(/^\+?[0-9\s\-().]{7,20}$/, "Please enter a valid phone number");
					else if (comp.type === "PASSWORD_INPUT") fieldSchema = zod.z.string();
					const labelText = typeof comp.label === "string" ? comp.label : comp.ref;
					if (comp.required) fieldSchema = fieldSchema.min(1, `${t(resolve(labelText) ?? labelText) ?? comp.ref} is required`);
					else fieldSchema = fieldSchema.optional();
					shape[comp.ref] = fieldSchema;
				}
			});
		};
		processComponents(comps);
		return zod.z.object(shape);
	}, [t, resolve]);
	const formSchema = (0, react.useMemo)(() => {
		if (!components?.length) return zod.z.object({});
		return buildFormSchema(components);
	}, [components, buildFormSchema]);
	const renderFormField = (component, index, formControl, formErrors, isFormLoading, handleInputChangeFn) => {
		const { type, ref, label, placeholder, required, options, hint } = component;
		if (!ref) return null;
		const labelText = typeof label === "string" ? label : "";
		const placeholderText = typeof placeholder === "string" ? placeholder : "";
		if (String(type) === String(__thunderid_react.EmbeddedFlowComponentType.TextInput) || type === "TEXT_INPUT") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			required,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: ref,
				children: resolve(labelText) ?? labelText
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
				name: ref,
				control: formControl,
				rules: { required: required ? `${resolve(labelText) ?? labelText} is required` : false },
				render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					...field,
					fullWidth: true,
					size: "small",
					id: ref,
					type: "text",
					placeholder: resolve(placeholderText) ?? placeholderText,
					autoComplete: "off",
					required,
					variant: "outlined",
					disabled: isFormLoading,
					error: !!formErrors[ref],
					helperText: formErrors[ref]?.message,
					color: formErrors[ref] ? "error" : "primary",
					onChange: (e) => {
						field.onChange(e);
						handleInputChangeFn(ref, e.target.value);
					}
				})
			})]
		}, component.id ?? index);
		if (type === "EMAIL_INPUT") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			required,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: ref,
				children: resolve(labelText) ?? labelText
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
				name: ref,
				control: formControl,
				rules: {
					required: required ? `${resolve(labelText) ?? labelText} is required` : false,
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: "Please enter a valid email address"
					}
				},
				render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					...field,
					fullWidth: true,
					size: "small",
					id: ref,
					type: "email",
					placeholder: resolve(placeholderText) ?? placeholderText,
					autoComplete: "email",
					required,
					variant: "outlined",
					disabled: isFormLoading,
					error: !!formErrors[ref],
					helperText: formErrors[ref]?.message,
					color: formErrors[ref] ? "error" : "primary",
					onChange: (e) => {
						field.onChange(e);
						handleInputChangeFn(ref, e.target.value);
					}
				})
			})]
		}, component.id ?? index);
		if (type === "PHONE_INPUT") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			required,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: ref,
				children: resolve(labelText) ?? labelText
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
				name: ref,
				control: formControl,
				rules: { required: required ? `${resolve(labelText) ?? labelText} is required` : false },
				render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					...field,
					fullWidth: true,
					size: "small",
					id: ref,
					type: "tel",
					placeholder: resolve(placeholderText) ?? placeholderText,
					autoComplete: "tel",
					required,
					variant: "outlined",
					disabled: isFormLoading,
					error: !!formErrors[ref],
					helperText: formErrors[ref]?.message,
					color: formErrors[ref] ? "error" : "primary",
					onChange: (e) => {
						field.onChange(e);
						handleInputChangeFn(ref, e.target.value);
					}
				})
			})]
		}, component.id ?? index);
		if (type === "PASSWORD_INPUT") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			required,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: ref,
				children: resolve(labelText) ?? labelText
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
				name: ref,
				control: formControl,
				rules: { required: required ? `${resolve(labelText) ?? labelText} is required` : false },
				render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CredentialFieldInput.default, {
					id: ref,
					name: field.name,
					value: field.value ?? "",
					placeholder: resolve(placeholderText) ?? placeholderText,
					required: required ?? false,
					error: !!formErrors[ref],
					helperText: formErrors[ref]?.message,
					color: formErrors[ref] ? "error" : "primary",
					ariaLabel: resolve(labelText) ?? labelText,
					onChange: (e) => {
						field.onChange(e);
						handleInputChangeFn(ref, e.target.value);
					},
					onBlur: field.onBlur,
					inputRef: field.ref
				})
			})]
		}, component.id ?? index);
		if (type === "OU_SELECT") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			fullWidth: true,
			required,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: ref,
					children: resolve(labelText) ?? labelText
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
					name: ref,
					control: formControl,
					rules: { required: required ? `${resolve(labelText) ?? labelText} is required` : false },
					render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationUnitTreePicker.OrganizationUnitTreePicker, {
						value: field.value ?? "",
						onChange: (ouId) => {
							field.onChange(ouId);
							handleInputChangeFn(ref, ouId);
						},
						rootOuId: additionalData?.["rootOuId"]
					})
				}),
				formErrors[ref] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "error",
					children: formErrors[ref]?.message
				})
			]
		}, component.id ?? index);
		if (type === "SELECT" && options) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
			fullWidth: true,
			required,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, {
				htmlFor: ref,
				children: resolve(labelText) ?? labelText
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
				name: ref,
				control: formControl,
				rules: { required: required ? `${resolve(labelText) ?? labelText} is required` : false },
				render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
						...field,
						value: field.value ?? "",
						displayEmpty: true,
						size: "small",
						id: ref,
						required,
						fullWidth: true,
						disabled: isFormLoading,
						error: !!formErrors[ref],
						onChange: (e) => {
							field.onChange(e);
							handleInputChangeFn(ref, String(e.target.value));
						},
						renderValue: (selected) => {
							if (!selected || selected === "") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								sx: { color: "text.secondary" },
								children: resolve(placeholderText) ?? "Select an option"
							});
							const selectedOption = options.find((opt) => getOptionValue(opt) === selected);
							return selectedOption ? getOptionLabel(selectedOption) : String(selected);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
							value: "",
							disabled: true,
							children: resolve(placeholderText) ?? "Select an option"
						}), options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
							value: getOptionValue(option),
							children: getOptionLabel(option)
						}, getOptionValue(option)))]
					}),
					formErrors[ref] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "caption",
						color: "error.main",
						sx: { mt: .5 },
						children: formErrors[ref]?.message
					}),
					hint && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "caption",
						color: "text.secondary",
						children: hint
					})
				] })
			})]
		}, component.id ?? index);
		return null;
	};
	const { control, formState: { errors, isValid }, reset, setValue } = (0, react_hook_form.useForm)({
		resolver: (0, __hookform_resolvers_zod.zodResolver)(formSchema),
		mode: "onChange",
		defaultValues: values ?? {}
	});
	(0, react.useEffect)(() => {
		if (!components?.length && Object.keys(values ?? {}).length === 0) reset({});
	}, [
		components,
		values,
		reset
	]);
	(0, react.useEffect)(() => {
		const rootOuId = additionalData?.["rootOuId"];
		if (!rootOuId || !components?.length) return;
		const findOuSelectRef = (comps) => {
			for (const comp of comps) {
				if (comp.type === "OU_SELECT" && comp.ref) return comp.ref;
				if (comp.components) {
					const found = findOuSelectRef(comp.components);
					if (found) return found;
				}
			}
			return null;
		};
		const ouRef = findOuSelectRef(components);
		if (ouRef && !values?.[ouRef]) {
			setValue(ouRef, rootOuId, { shouldValidate: true });
			handleInputChange(ouRef, rootOuId);
		}
	}, [
		additionalData,
		components,
		values,
		setValue,
		handleInputChange
	]);
	if (isLoading && !components?.length) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	if (error && !components?.length) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.AlertTitle, { children: t("users:errors.failed.title", "Error") }), error.message ?? t("users:errors.failed.description", "An error occurred.")]
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			justifyContent: "flex-end"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
			variant: "outlined",
			onClick: handleClose,
			children: t("common:actions.close", "Close")
		})
	})] });
	if (!components?.length) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	const hasInteractiveComponents = hasActionsOrInputs(components);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		(flowError ?? error) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Alert, {
			severity: "error",
			sx: { mb: 2 },
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.AlertTitle, { children: t("users:errors.failed.title", "Error") }), flowError ?? error?.message ?? t("users:errors.failed.description", "An error occurred.")]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
			direction: "column",
			spacing: 4,
			children: components.map((component, index) => {
				if (String(component.type) === String(__thunderid_react.EmbeddedFlowComponentType.Text) || component.type === "TEXT") {
					const variant = typeof component.variant === "string" ? component.variant : void 0;
					const label = typeof component.label === "string" ? component.label : "";
					const align = typeof component.align === "string" ? component.align : void 0;
					if (variant === "HEADING_1") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "h1",
						gutterBottom: true,
						textAlign: align,
						children: resolve(label) ?? label
					}, component.id ?? index);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: variant === "HEADING_2" ? "h2" : "body1",
						color: "text.secondary",
						textAlign: align,
						children: resolve(label) ?? label
					}, component.id ?? index);
				}
				if (component.type === "COPYABLE_TEXT") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_design.CopyableTextAdapter, {
					component,
					resolve,
					additionalData
				}, component.id ?? index);
				if (String(component.type) === String(__thunderid_react.EmbeddedFlowComponentType.Block) || component.type === "BLOCK") {
					const blockComponents = component.components ?? [];
					const isAction = (c) => (String(c.type) === String(__thunderid_react.EmbeddedFlowComponentType.Action) || c.type === "ACTION") && (String(c.eventType) === String(__thunderid_react.EmbeddedFlowEventType.Submit) || c.eventType === "SUBMIT");
					const submitActions = blockComponents.filter(isAction);
					const nestedActions = blockComponents.flatMap((c) => c.type === "STACK" ? (c.components ?? []).filter(isAction) : []);
					const primaryAction = submitActions[0] ?? nestedActions[0];
					if (!primaryAction) return null;
					const isButtonDisabled = isLoading || !isValid || propsIsValid !== void 0 && !propsIsValid;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						component: "form",
						onSubmit: (e) => {
							e.preventDefault();
							if (!isButtonDisabled) handleSubmit(primaryAction, values).catch(() => void 0);
						},
						noValidate: true,
						sx: {
							display: "flex",
							flexDirection: "column",
							width: "100%",
							gap: 2
						},
						children: blockComponents.map((subComponent, compIndex) => {
							const field = renderFormField(subComponent, compIndex, control, errors, isLoading, handleInputChange);
							if (field) return field;
							if (subComponent.type === "STACK") {
								const stackActions = (subComponent.components ?? []).filter(isAction);
								return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
									direction: subComponent.direction ?? "row",
									spacing: 2,
									justifyContent: subComponent.justify ?? "center",
									flexWrap: "wrap",
									sx: { mt: 2 },
									children: stackActions.map((action, actionIndex) => {
										const actionKey = action.id ?? String(actionIndex);
										const actionLabel = typeof action.label === "string" ? action.label : "";
										const isThisActionLoading = isLoading && activeActionId === actionKey;
										return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
											type: "button",
											variant: action.variant === "PRIMARY" ? "contained" : "outlined",
											disabled: isButtonDisabled,
											sx: {
												px: 4,
												py: 1.5
											},
											onClick: () => {
												if (!isButtonDisabled) {
													setActiveActionId(actionKey);
													handleSubmit(action, values).catch(() => void 0);
												}
											},
											children: isThisActionLoading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, {
												size: 16,
												color: "inherit"
											}) : resolve(actionLabel) ?? actionLabel
										}, actionKey);
									})
								}, subComponent.id ?? compIndex);
							}
							if (!isAction(subComponent)) return null;
							const subLabel = typeof subComponent.label === "string" ? subComponent.label : "";
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
								direction: "row",
								spacing: 2,
								justifyContent: "flex-end",
								sx: { mt: 4 },
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
									type: "button",
									variant: subComponent.variant === "PRIMARY" ? "contained" : "outlined",
									disabled: isButtonDisabled,
									sx: { minWidth: 140 },
									onClick: () => {
										if (!isButtonDisabled) handleSubmit(subComponent, values).catch(() => void 0);
									},
									children: isLoading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, {
										size: 20,
										color: "inherit"
									}) : resolve(subLabel) ?? subLabel
								})
							}, subComponent.id ?? compIndex);
						})
					}, component.id ?? index);
				}
				return null;
			})
		}),
		!hasInteractiveComponents && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			direction: "row",
			spacing: 2,
			justifyContent: "center",
			sx: { mt: 4 },
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "outlined",
				onClick: handleClose,
				children: t("common:actions.close", "Close")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "contained",
				onClick: () => {
					resetFlow();
					onResetLocalState();
				},
				children: t("users:addAnother", "Add Another User")
			})]
		})
	] });
}
/** Inner component that bridges InviteUser render props with parent state via useEffect */
function InviteUserFlowBridge({ renderProps, flowError, handleClose, onStepLabelChange, onInviteComplete, onOuStepDetected, onResetLocalState }) {
	const { resolveFlowTemplateLiterals: rawResolve } = (0, __thunderid_react.useThunderID)();
	const resolve = (0, react.useCallback)((text) => text ? rawResolve(text) : void 0, [rawResolve]);
	const { t } = (0, react_i18next.useTranslation)();
	const components = renderProps.components;
	const currentStepLabel = components?.length ? deriveStepLabel(components, resolve, t) : "";
	const isDisplayOnly = !!components?.length && !hasActionsOrInputs(components);
	const currentHasOu = components?.some((c) => c.type === "OU_SELECT" || c.components?.some((sub) => sub.type === "OU_SELECT")) ?? false;
	(0, react.useEffect)(() => {
		if (currentHasOu) onOuStepDetected();
	}, [currentHasOu, onOuStepDetected]);
	(0, react.useEffect)(() => {
		if (currentStepLabel) onStepLabelChange(currentStepLabel);
	}, [currentStepLabel, onStepLabelChange]);
	(0, react.useEffect)(() => {
		if (isDisplayOnly) onInviteComplete();
	}, [isDisplayOnly, onInviteComplete]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InviteUserStepContent, {
		renderProps,
		flowError,
		handleClose,
		onResetLocalState
	});
}
function UserInvitePage() {
	const { t } = (0, react_i18next.useTranslation)();
	const navigate = (0, react_router.useNavigate)();
	const logger = (0, __thunderid_logger_react.useLogger)("UserInvitePage");
	const [flowError, setFlowError] = (0, react.useState)(null);
	const [breadcrumbs, setBreadcrumbs] = (0, react.useState)([]);
	const prevStepLabelRef = (0, react.useRef)("");
	const [hasOuStep, setHasOuStep] = (0, react.useState)(false);
	const handleClose = (0, react.useCallback)(() => {
		(async () => {
			await navigate("/users");
		})().catch((err) => {
			logger.error("Failed to navigate to users page", { error: err });
		});
	}, [navigate, logger]);
	const handleManualCreateFallback = (0, react.useCallback)(() => {
		logger.info("Falling back to manual user creation because the onboarding flow is unavailable");
		(async () => {
			await navigate("/users/create");
		})().catch((err) => {
			logger.error("Failed to navigate to fallback user creation page", { error: err });
		});
	}, [navigate, logger]);
	const handleStepLabelChange = (0, react.useCallback)((label) => {
		if (label !== prevStepLabelRef.current) {
			prevStepLabelRef.current = label;
			setBreadcrumbs((prev) => {
				const existingIndex = prev.indexOf(label);
				if (existingIndex >= 0) return prev.slice(0, existingIndex + 1);
				return [...prev, label];
			});
		}
	}, [setBreadcrumbs]);
	const handleInviteComplete = (0, react.useCallback)(() => {
		if (prevStepLabelRef.current !== "complete") {
			prevStepLabelRef.current = "complete";
			setBreadcrumbs((prev) => [...prev, t("users:invite.steps.complete", "Complete")]);
		}
	}, [setBreadcrumbs, t]);
	const handleOuStepDetected = (0, react.useCallback)(() => {
		setHasOuStep(true);
	}, []);
	const handleResetLocalState = (0, react.useCallback)(() => {
		setBreadcrumbs([]);
		prevStepLabelRef.current = "";
		setHasOuStep(false);
		setFlowError(null);
	}, []);
	const totalSteps = hasOuStep ? 5 : 4;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column"
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.LinearProgress, {
			variant: "determinate",
			value: Math.min(breadcrumbs.length / totalSteps * 100, 100),
			sx: { height: 6 }
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
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
						"aria-label": t("common:actions.close", "Close"),
						onClick: handleClose,
						sx: {
							bgcolor: "background.paper",
							"&:hover": { bgcolor: "action.hover" },
							boxShadow: 1
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.X, { size: 24 })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Breadcrumbs, {
						separator: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronRight, { size: 16 }),
						"aria-label": "breadcrumb",
						children: [breadcrumbs.map((label, index) => {
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "h5",
								color: index === breadcrumbs.length - 1 ? "text.primary" : "inherit",
								children: label
							}, label);
						}), breadcrumbs.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "h5",
							color: "text.primary",
							children: t("users:addUser", "Add User")
						})]
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
						mx: "auto",
						alignItems: "center"
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						sx: {
							width: "100%",
							maxWidth: 800,
							flex: 1,
							display: "flex",
							flexDirection: "column"
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_react.InviteUser, {
							onError: (err) => {
								if (isMissingOnboardingFlow(err)) {
									handleManualCreateFallback();
									return;
								}
								logger.error("User onboarding error", { error: err });
							},
							onFlowChange: (response) => {
								if (isMissingOnboardingFlow(response)) {
									handleManualCreateFallback();
									return;
								}
								const messageKey = response?.error?.message?.key;
								if (messageKey) {
									const translated = t(messageKey);
									if (translated !== messageKey) {
										setFlowError(translated);
										return;
									}
								}
								setFlowError(response?.error?.message?.defaultValue ?? response?.error?.description?.defaultValue ?? null);
							},
							children: (renderProps) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(InviteUserFlowBridge, {
								renderProps,
								flowError,
								handleClose,
								onStepLabelChange: handleStepLabelChange,
								onInviteComplete: handleInviteComplete,
								onOuStepDetected: handleOuStepDetected,
								onResetLocalState: handleResetLocalState
							})
						})
					})
				})
			})]
		})]
	});
}

//#endregion
exports.default = UserInvitePage;