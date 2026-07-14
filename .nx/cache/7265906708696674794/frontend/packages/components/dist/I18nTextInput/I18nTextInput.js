import PageLoadingAnimation from "../lab/components/PageLoadingAnimation.js";
import { useCallback, useMemo, useState } from "react";
import { useTemplateLiteralResolver } from "@thunderid/hooks";
import { I18nDefaultConstants, NamespaceConstants, useGetLanguages, useGetTranslations, useUpdateTranslation } from "@thunderid/i18n";
import { I18N_KEY_PATTERN, isI18nTemplatePattern } from "@thunderid/utils";
import { Alert, Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, FormControl, FormLabel, IconButton, InputAdornment, Popover, TextField, Tooltip, Typography } from "@wso2/oxygen-ui";
import { PlusIcon, SquareFunction, XIcon } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";

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
	const { i18n } = useTranslation();
	const { data: languagesData } = useGetLanguages();
	const { data: translationsData, isLoading } = useGetTranslations({
		language: I18nDefaultConstants.FALLBACK_LANGUAGE,
		namespace: NamespaceConstants.CUSTOM_NAMESPACE,
		enabled: isActive
	});
	const updateTranslation = useUpdateTranslation({ onMutationSuccess: () => {
		onTranslationCreated?.();
	} });
	const sanitizedDefaultKey = defaultNewKey ? sanitizeTranslationKey(defaultNewKey) : "";
	const [newKey, setNewKey] = useState(sanitizedDefaultKey);
	const [newValue, setNewValue] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState(I18nDefaultConstants.FALLBACK_LANGUAGE);
	const [error, setError] = useState(null);
	const availableKeys = useMemo(() => {
		if (!translationsData?.translations) return [];
		const keys = [];
		Object.entries(translationsData.translations).forEach(([namespace, translations]) => {
			keys.push(...Object.keys(translations).map((key) => `${namespace}:${key}`));
		});
		return keys;
	}, [translationsData]);
	const resolvedValue = useMemo(() => {
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
	const availableLanguages = useMemo(() => {
		if (languagesData?.languages && languagesData.languages.length > 0) return languagesData.languages;
		return [I18nDefaultConstants.FALLBACK_LANGUAGE];
	}, [languagesData]);
	const resetCreateForm = useCallback(() => {
		setNewKey(sanitizedDefaultKey);
		setNewValue("");
		setSelectedLanguage(I18nDefaultConstants.FALLBACK_LANGUAGE);
		setError(null);
	}, [sanitizedDefaultKey]);
	const handleCreate = useCallback(() => {
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
			namespace: NamespaceConstants.CUSTOM_NAMESPACE,
			key: newKey,
			value: newValue
		}, {
			onSuccess: () => {
				i18n.addResourceBundle(selectedLanguage, NamespaceConstants.CUSTOM_NAMESPACE, { [newKey]: newValue }, true, true);
				onChange(`${NamespaceConstants.CUSTOM_NAMESPACE}:${newKey}`);
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
	if (isLoading) return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	if (isCreateMode) return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [
			error && /* @__PURE__ */ jsx(Alert, {
				severity: "error",
				onClose: () => setError(null),
				children: error
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.languageLabel
			}), /* @__PURE__ */ jsx(Autocomplete, {
				options: availableLanguages,
				value: selectedLanguage,
				onChange: (_e, newLang) => setSelectedLanguage(newLang ?? I18nDefaultConstants.FALLBACK_LANGUAGE),
				renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
					...params,
					size: "small"
				}),
				disableClearable: true
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.keyLabel
			}), /* @__PURE__ */ jsx(TextField, {
				fullWidth: true,
				size: "small",
				value: newKey,
				onChange: (e) => {
					setNewKey(e.target.value);
					if (error) setError(null);
				},
				placeholder: "e.g., user.firstName"
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.valueLabel
			}), /* @__PURE__ */ jsx(TextField, {
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
			/* @__PURE__ */ jsxs(Box, {
				sx: {
					display: "flex",
					gap: 1,
					justifyContent: "flex-end"
				},
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "text",
					onClick: () => {
						onCreateModeChange(false);
						resetCreateForm();
					},
					children: labels.cancelLabel
				}), /* @__PURE__ */ jsx(Button, {
					variant: "contained",
					onClick: handleCreate,
					disabled: updateTranslation.isPending || !newKey.trim() || !newValue.trim(),
					children: updateTranslation.isPending ? /* @__PURE__ */ jsx(CircularProgress, { size: 16 }) : labels.createLabel
				})]
			})
		]
	});
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "subtitle2",
				gutterBottom: true,
				children: labels.keyLabel
			}), /* @__PURE__ */ jsx(Autocomplete, {
				options: availableKeys,
				value: i18nKey === "" ? null : i18nKey,
				onChange: (_e, selected) => onChange(selected ?? ""),
				renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
					...params,
					placeholder: labels.selectKeyPlaceholder,
					size: "small"
				}),
				renderOption: ({ key,...props }, option) => /* @__PURE__ */ jsx("li", {
					...props,
					children: /* @__PURE__ */ jsx("span", { children: option })
				}, key)
			})] }),
			i18nKey && resolvedValue && /* @__PURE__ */ jsxs(Box, {
				sx: {
					p: 1.5,
					backgroundColor: "action.hover",
					borderRadius: 1,
					border: "1px solid",
					borderColor: "divider"
				},
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "caption",
					color: "text.secondary",
					sx: {
						display: "block",
						mb: .5
					},
					children: labels.resolvedValueLabel
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					sx: { wordBreak: "break-word" },
					children: resolvedValue
				})]
			}),
			/* @__PURE__ */ jsx(Divider, {}),
			/* @__PURE__ */ jsx(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				},
				children: /* @__PURE__ */ jsx(Tooltip, {
					title: labels.createTooltip,
					children: /* @__PURE__ */ jsx(Button, {
						variant: "text",
						startIcon: /* @__PURE__ */ jsx(PlusIcon, { size: 16 }),
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
	const [isCreateMode, setIsCreateMode] = useState(false);
	const handleClose = useCallback(() => {
		setIsCreateMode(false);
		onClose();
	}, [onClose]);
	const i18nKey = useMemo(() => I18N_KEY_PATTERN.exec(value.trim())?.[1] ?? "", [value]);
	const handleChange = useCallback((key) => {
		onChange(key ? `{{t(${key})}}` : "");
	}, [onChange]);
	return /* @__PURE__ */ jsx(Popover, {
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
		children: /* @__PURE__ */ jsxs(Card, {
			sx: { width: 400 },
			children: [/* @__PURE__ */ jsx(CardHeader, {
				title: isCreateMode ? labels.createTitle : labels.popoverTitle,
				action: /* @__PURE__ */ jsx(IconButton, {
					"aria-label": labels.closeLabel,
					onClick: handleClose,
					size: "small",
					children: /* @__PURE__ */ jsx(XIcon, {})
				})
			}), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(I18nContent, {
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
	const { t } = useTranslation();
	const { resolve } = useTemplateLiteralResolver();
	const [iconButtonEl, setIconButtonEl] = useState(null);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const labels = useMemo(() => ({
		...DEFAULT_LABELS,
		...labelsProp
	}), [labelsProp]);
	const isDynamic = isI18nTemplatePattern(value);
	const resolvedValue = isDynamic ? resolve(value, { t }) ?? "" : "";
	return /* @__PURE__ */ jsxs(FormControl, {
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(FormLabel, { children: label }),
			/* @__PURE__ */ jsx(TextField, {
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
				InputProps: { endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
					position: "end",
					children: /* @__PURE__ */ jsx(Tooltip, {
						title: labels.triggerTooltip,
						children: /* @__PURE__ */ jsx(IconButton, {
							ref: setIconButtonEl,
							onClick: () => setIsPopoverOpen(!isPopoverOpen),
							size: "small",
							edge: "end",
							color: isDynamic ? "primary" : "default",
							children: /* @__PURE__ */ jsx(SquareFunction, { size: 16 })
						})
					})
				}) }
			}),
			isDynamic && resolvedValue && /* @__PURE__ */ jsxs(Box, {
				sx: {
					mt: 1,
					p: 1.5,
					backgroundColor: "action.hover",
					borderRadius: 1,
					border: "1px solid",
					borderColor: "divider"
				},
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "caption",
					color: "text.secondary",
					sx: {
						display: "block",
						mb: .5
					},
					children: labels.resolvedValueLabel
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					sx: { wordBreak: "break-word" },
					children: resolvedValue
				})]
			}),
			/* @__PURE__ */ jsx(I18nPopover, {
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
export { I18nTextInput as default };