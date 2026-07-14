const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_PageLoadingAnimation = require('../lab/components/PageLoadingAnimation.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let __thunderid_i18n = require("@thunderid/i18n");
__thunderid_i18n = require_rolldown_runtime.__toESM(__thunderid_i18n);
let __thunderid_utils = require("@thunderid/utils");
__thunderid_utils = require_rolldown_runtime.__toESM(__thunderid_utils);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/I18nTextInput/I18nTextInput.tsx
const DEFAULT_LABELS = {
	triggerTooltip: "Configure translation",
	popoverTitle: "Translation",
	createTitle: "Create New Translation",
	createTooltip: "Create a new translation key",
	languageLabel: "Language",
	keyLabel: "Translation Key",
	selectKeyPlaceholder: "Select a translation key",
	valueLabel: "Translation Value",
	resolvedValueLabel: "Resolved value",
	keyRequiredError: "Translation key is required",
	valueRequiredError: "Translation value is required",
	invalidKeyFormatError: "Key may only contain letters, numbers, dots, hyphens, and underscores",
	cancelLabel: "Cancel",
	createLabel: "Create",
	closeLabel: "Close",
	unknownError: "An unknown error occurred"
};
/**
* Sanitizes a string for use as a translation key.
* Replaces spaces with underscores, lowercases, and strips invalid characters.
*/
function sanitizeTranslationKey(key) {
	return key.trim().toLowerCase().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
}
/**
* Content component for the i18n popover with select and create modes.
*/
function I18nContent({ i18nKey, isActive, isCreateMode, onChange, onCreateModeChange, defaultNewKey = void 0, labels, onTranslationCreated = void 0 }) {
	const { i18n } = (0, react_i18next.useTranslation)();
	const { data: languagesData } = (0, __thunderid_i18n.useGetLanguages)();
	const { data: translationsData, isLoading } = (0, __thunderid_i18n.useGetTranslations)({
		language: __thunderid_i18n.I18nDefaultConstants.FALLBACK_LANGUAGE,
		namespace: __thunderid_i18n.NamespaceConstants.CUSTOM_NAMESPACE,
		enabled: isActive
	});
	const updateTranslation = (0, __thunderid_i18n.useUpdateTranslation)({ onMutationSuccess: () => {
		onTranslationCreated?.();
	} });
	const sanitizedDefaultKey = defaultNewKey ? sanitizeTranslationKey(defaultNewKey) : "";
	const [newKey, setNewKey] = (0, react.useState)(sanitizedDefaultKey);
	const [newValue, setNewValue] = (0, react.useState)("");
	const [selectedLanguage, setSelectedLanguage] = (0, react.useState)(__thunderid_i18n.I18nDefaultConstants.FALLBACK_LANGUAGE);
	const [error, setError] = (0, react.useState)(null);
	const availableKeys = (0, react.useMemo)(() => {
		if (!translationsData?.translations) return [];
		const keys = [];
		Object.entries(translationsData.translations).forEach(([namespace, translations]) => {
			keys.push(...Object.keys(translations).map((key) => `${namespace}:${key}`));
		});
		return keys;
	}, [translationsData]);
	const resolvedValue = (0, react.useMemo)(() => {
		if (!i18nKey || !translationsData?.translations) return "";
		const colonIdx = i18nKey.indexOf(":");
		if (colonIdx !== -1) {
			const ns = i18nKey.slice(0, colonIdx);
			const bareKey = i18nKey.slice(colonIdx + 1);
			return translationsData.translations[ns]?.[bareKey] ?? "";
		}
		let found = "";
		Object.values(translationsData.translations).some((translations) => {
			if (translations[i18nKey]) {
				found = translations[i18nKey];
				return true;
			}
			return false;
		});
		return found;
	}, [i18nKey, translationsData]);
	const availableLanguages = (0, react.useMemo)(() => {
		if (languagesData?.languages && languagesData.languages.length > 0) return languagesData.languages;
		return [__thunderid_i18n.I18nDefaultConstants.FALLBACK_LANGUAGE];
	}, [languagesData]);
	const resetCreateForm = (0, react.useCallback)(() => {
		setNewKey(sanitizedDefaultKey);
		setNewValue("");
		setSelectedLanguage(__thunderid_i18n.I18nDefaultConstants.FALLBACK_LANGUAGE);
		setError(null);
	}, [sanitizedDefaultKey]);
	const handleCreate = (0, react.useCallback)(() => {
		if (!newKey.trim()) {
			setError(labels.keyRequiredError);
			return;
		}
		if (!newValue.trim()) {
			setError(labels.valueRequiredError);
			return;
		}
		if (!/^[a-zA-Z0-9._-]+$/.test(newKey)) {
			setError(labels.invalidKeyFormatError);
			return;
		}
		updateTranslation.mutate({
			language: selectedLanguage,
			namespace: __thunderid_i18n.NamespaceConstants.CUSTOM_NAMESPACE,
			key: newKey,
			value: newValue
		}, {
			onSuccess: () => {
				i18n.addResourceBundle(selectedLanguage, __thunderid_i18n.NamespaceConstants.CUSTOM_NAMESPACE, { [newKey]: newValue }, true, true);
				onChange(`${__thunderid_i18n.NamespaceConstants.CUSTOM_NAMESPACE}:${newKey}`);
				onCreateModeChange(false);
				resetCreateForm();
			},
			onError: (err) => {
				setError(err.message ?? labels.unknownError);
			}
		});
	}, [
		newKey,
		newValue,
		selectedLanguage,
		updateTranslation,
		onChange,
		onCreateModeChange,
		resetCreateForm,
		labels,
		i18n
	]);
	if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_PageLoadingAnimation.default, {});
	if (isCreateMode) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [
			error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				severity: "error",
				onClose: () => setError(null),
				children: error
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.languageLabel
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Autocomplete, {
				options: availableLanguages,
				value: selectedLanguage,
				onChange: (_e, newLang) => setSelectedLanguage(newLang ?? __thunderid_i18n.I18nDefaultConstants.FALLBACK_LANGUAGE),
				renderInput: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					...params,
					size: "small"
				}),
				disableClearable: true
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.keyLabel
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
				fullWidth: true,
				size: "small",
				value: newKey,
				onChange: (e) => {
					setNewKey(e.target.value);
					if (error) setError(null);
				},
				placeholder: "e.g., user.firstName"
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.valueLabel
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
				fullWidth: true,
				size: "small",
				multiline: true,
				rows: 2,
				value: newValue,
				onChange: (e) => {
					setNewValue(e.target.value);
					if (error) setError(null);
				},
				placeholder: "e.g., First Name"
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					gap: 1,
					justifyContent: "flex-end"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					variant: "text",
					onClick: () => {
						onCreateModeChange(false);
						resetCreateForm();
					},
					children: labels.cancelLabel
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					variant: "contained",
					onClick: handleCreate,
					disabled: updateTranslation.isPending || !newKey.trim() || !newValue.trim(),
					children: updateTranslation.isPending ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 }) : labels.createLabel
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.keyLabel
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Autocomplete, {
				options: availableKeys,
				value: i18nKey === "" ? null : i18nKey,
				onChange: (_e, selected) => onChange(selected ?? ""),
				renderInput: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					...params,
					placeholder: labels.selectKeyPlaceholder,
					size: "small"
				}),
				renderOption: ({ key,...props }, option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
					...props,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: option })
				}, key)
			})] }),
			i18nKey && resolvedValue && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					p: 1.5,
					backgroundColor: "action.hover",
					borderRadius: 1,
					border: "1px solid",
					borderColor: "divider"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "text.secondary",
					sx: {
						display: "block",
						mb: .5
					},
					children: labels.resolvedValueLabel
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					sx: { wordBreak: "break-word" },
					children: resolvedValue
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
					title: labels.createTooltip,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
						variant: "text",
						startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.PlusIcon, { size: 16 }),
						onClick: () => onCreateModeChange(true),
						children: labels.createTitle
					})
				})
			})
		]
	});
}
/**
* Popover with i18n key selection and creation UI.
*/
function I18nPopover({ open, anchorEl, onClose, value, onChange, defaultNewKey = void 0, labels, onTranslationCreated = void 0 }) {
	const [isCreateMode, setIsCreateMode] = (0, react.useState)(false);
	const handleClose = (0, react.useCallback)(() => {
		setIsCreateMode(false);
		onClose();
	}, [onClose]);
	const i18nKey = (0, react.useMemo)(() => __thunderid_utils.I18N_KEY_PATTERN.exec(value.trim())?.[1] ?? "", [value]);
	const handleChange = (0, react.useCallback)((key) => {
		onChange(key ? `{{t(${key})}}` : "");
	}, [onChange]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Popover, {
		open,
		anchorEl,
		onClose: handleClose,
		anchorOrigin: {
			vertical: "top",
			horizontal: "right"
		},
		transformOrigin: {
			vertical: "top",
			horizontal: "left"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Card, {
			sx: { width: 400 },
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CardHeader, {
				title: isCreateMode ? labels.createTitle : labels.popoverTitle,
				action: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					"aria-label": labels.closeLabel,
					onClick: handleClose,
					size: "small",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.XIcon, {})
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CardContent, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(I18nContent, {
				i18nKey,
				isActive: open,
				isCreateMode,
				onChange: handleChange,
				onCreateModeChange: setIsCreateMode,
				defaultNewKey,
				labels,
				onTranslationCreated
			}) })]
		})
	});
}
/**
* A text input with an i18n button that opens a popover for selecting or creating translation
* keys. The component is i18n-namespace-agnostic — callers pass their own UI strings via the
* optional `labels` prop and wire up post-create cache invalidation via `onTranslationCreated`.
*/
function I18nTextInput({ label, value, onChange, placeholder = void 0, defaultNewKey = void 0, labels: labelsProp = void 0, onTranslationCreated = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { resolve } = (0, __thunderid_hooks.useTemplateLiteralResolver)();
	const [iconButtonEl, setIconButtonEl] = (0, react.useState)(null);
	const [isPopoverOpen, setIsPopoverOpen] = (0, react.useState)(false);
	const labels = (0, react.useMemo)(() => ({
		...DEFAULT_LABELS,
		...labelsProp
	}), [labelsProp]);
	const isDynamic = (0, __thunderid_utils.isI18nTemplatePattern)(value);
	const resolvedValue = isDynamic ? resolve(value, { t }) ?? "" : "";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: label }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
				fullWidth: true,
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				size: "small",
				sx: isDynamic ? { "& .MuiOutlinedInput-root": {
					backgroundColor: "rgba(var(--mui-palette-primary-mainChannel) / 0.1)",
					"& fieldset": { borderColor: "primary.main" },
					"&:hover fieldset": { borderColor: "primary.dark" },
					"&.Mui-focused fieldset": { borderColor: "primary.main" }
				} } : void 0,
				InputProps: { endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
					position: "end",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: labels.triggerTooltip,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							ref: setIconButtonEl,
							onClick: () => setIsPopoverOpen(!isPopoverOpen),
							size: "small",
							edge: "end",
							color: isDynamic ? "primary" : "default",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.SquareFunction, { size: 16 })
						})
					})
				}) }
			}),
			isDynamic && resolvedValue && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					mt: 1,
					p: 1.5,
					backgroundColor: "action.hover",
					borderRadius: 1,
					border: "1px solid",
					borderColor: "divider"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "text.secondary",
					sx: {
						display: "block",
						mb: .5
					},
					children: labels.resolvedValueLabel
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					sx: { wordBreak: "break-word" },
					children: resolvedValue
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(I18nPopover, {
				open: isPopoverOpen,
				anchorEl: iconButtonEl,
				onClose: () => setIsPopoverOpen(false),
				value,
				onChange,
				defaultNewKey,
				labels,
				onTranslationCreated
			})
		]
	});
}

//#endregion
exports.default = I18nTextInput;