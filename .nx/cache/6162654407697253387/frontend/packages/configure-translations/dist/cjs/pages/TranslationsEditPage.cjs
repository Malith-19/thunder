const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_NamespaceSelector = require('../components/edit-translation/NamespaceSelector.cjs');
const require_TranslationEditorCard = require('../components/edit-translation/TranslationEditorCard.cjs');
const require_TranslationEditorHeader = require('../components/edit-translation/TranslationEditorHeader.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_i18n = require("@thunderid/i18n");
__thunderid_i18n = require_rolldown_runtime.__toESM(__thunderid_i18n);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/pages/TranslationsEditPage.tsx
/**
* Page for editing translation key-value pairs for a specific language.
*
* Reads the target language from the URL parameter. Displays a namespace
* selector, a fields/JSON tab editor with local dirty-change tracking, and a
* live gate preview panel. Supports saving individual field changes,
* discarding all local edits, and resetting the namespace to the default
* English values.
*
* @returns JSX element rendering the translations edit page
*
* @example
* ```tsx
* // Rendered automatically by the router at /translations/:language
* import TranslationsEditPage from './TranslationsEditPage';
*
* function App() {
*   return <TranslationsEditPage />;
* }
* ```
*
* @public
*/
function TranslationsEditPage() {
	const { t } = (0, react_i18next.useTranslation)("translations");
	const navigate = (0, react_router.useNavigate)();
	const logger = (0, __thunderid_logger_react.useLogger)("TranslationsEditPage");
	const { language: languageParam } = (0, react_router.useParams)();
	const selectedLanguage = languageParam ?? null;
	const { mode, systemMode } = (0, __wso2_oxygen_ui.useColorScheme)();
	const colorMode = ((mode === "system" ? systemMode : mode) ?? "light") === "dark" ? "dark" : "light";
	const [selectedNamespace, setSelectedNamespace] = (0, react.useState)(null);
	const [editView, setEditView] = (0, react.useState)("fields");
	const [search, setSearch] = (0, react.useState)("");
	const [localChanges, setLocalChanges] = (0, react.useState)({});
	const [isSaving, setIsSaving] = (0, react.useState)(false);
	const [toast, setToast] = (0, react.useState)({
		open: false,
		message: "",
		severity: "success"
	});
	const { data: translationsData, isLoading: translationsLoading } = (0, __thunderid_i18n.useGetTranslations)({
		language: selectedLanguage ?? "",
		enabled: !!selectedLanguage
	});
	const { data: defaultTranslationsData } = (0, __thunderid_i18n.useGetTranslations)({
		language: "en",
		enabled: !!selectedLanguage && selectedLanguage !== "en"
	});
	const updateTranslation = (0, __thunderid_i18n.useUpdateTranslation)();
	const namespaces = (0, react.useMemo)(() => {
		if (!translationsData?.translations) return [];
		const ns = Object.keys(translationsData?.translations ?? {});
		return ns.includes(__thunderid_i18n.NamespaceConstants.CUSTOM_NAMESPACE) ? ns : [...ns, __thunderid_i18n.NamespaceConstants.CUSTOM_NAMESPACE];
	}, [translationsData]);
	const [prevLanguage, setPrevLanguage] = (0, react.useState)(selectedLanguage);
	if (prevLanguage !== selectedLanguage) {
		setPrevLanguage(selectedLanguage);
		setSelectedNamespace(null);
		setLocalChanges({});
		setSearch("");
	}
	if (namespaces.length > 0 && !selectedNamespace) setSelectedNamespace(namespaces[0]);
	const [prevNamespace, setPrevNamespace] = (0, react.useState)(selectedNamespace);
	if (prevNamespace !== selectedNamespace) {
		setPrevNamespace(selectedNamespace);
		setLocalChanges({});
		setSearch("");
	}
	const serverValues = (0, react.useMemo)(() => translationsData?.translations?.[selectedNamespace ?? ""] ?? {}, [translationsData, selectedNamespace]);
	const currentValues = (0, react.useMemo)(() => ({
		...serverValues,
		...localChanges
	}), [serverValues, localChanges]);
	const dirtyKeys = (0, react.useMemo)(() => Object.keys(localChanges).filter((k) => localChanges[k] !== serverValues[k]), [localChanges, serverValues]);
	const hasDirtyChanges = dirtyKeys.length > 0;
	const handleFieldChange = (0, react.useCallback)((key, value) => {
		setLocalChanges((prev) => ({
			...prev,
			[key]: value
		}));
	}, []);
	const handleResetField = (0, react.useCallback)((key) => {
		setLocalChanges((prev) => {
			const next = { ...prev };
			delete next[key];
			return next;
		});
	}, []);
	const handleJsonChange = (0, react.useCallback)((changes) => {
		setLocalChanges(changes);
	}, []);
	const handleSave = async () => {
		if (!selectedLanguage || !selectedNamespace || dirtyKeys.length === 0) return;
		setIsSaving(true);
		const failed = (await Promise.allSettled(dirtyKeys.map((key) => updateTranslation.mutateAsync({
			language: selectedLanguage,
			namespace: selectedNamespace,
			key,
			value: localChanges[key]
		})))).filter((r) => r.status === "rejected").length;
		setIsSaving(false);
		if (failed > 0) setToast({
			open: true,
			message: t("editor.jsonSaveError"),
			severity: "error"
		});
		else {
			setLocalChanges({});
			setToast({
				open: true,
				message: t("editor.jsonSaveSuccess"),
				severity: "success"
			});
		}
	};
	const handleDiscard = () => {
		setLocalChanges({});
	};
	const handleResetToDefault = async () => {
		if (!selectedLanguage || !selectedNamespace) return;
		const defaultValues = defaultTranslationsData?.translations?.[selectedNamespace] ?? {};
		const entries = Object.entries(defaultValues);
		if (entries.length === 0) return;
		setIsSaving(true);
		const failed = (await Promise.allSettled(entries.map(([key, value]) => updateTranslation.mutateAsync({
			language: selectedLanguage,
			namespace: selectedNamespace,
			key,
			value
		})))).filter((r) => r.status === "rejected").length;
		setIsSaving(false);
		setLocalChanges({});
		if (failed > 0) setToast({
			open: true,
			message: t("editor.jsonSaveError"),
			severity: "error"
		});
		else setToast({
			open: true,
			message: t("editor.jsonSaveSuccess"),
			severity: "success"
		});
	};
	const handleTabChange = (_, v) => {
		setEditView(v);
		setSearch("");
	};
	const handleBack = () => {
		(async () => {
			await navigate("/translations");
		})().catch((_error) => {
			logger.error("Failed to navigate back to translations list", { error: _error });
		});
	};
	const isLoading = !!selectedLanguage && translationsLoading;
	const isCustomNamespace = selectedNamespace === __thunderid_i18n.NamespaceConstants.CUSTOM_NAMESPACE;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, {
		fullWidth: true,
		sx: {
			display: "flex",
			flexDirection: "column",
			flex: 1,
			minHeight: 0
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TranslationEditorHeader.default, {
				selectedLanguage,
				hasDirtyChanges,
				dirtyCount: dirtyKeys.length,
				isSaving,
				isFallbackLanguage: selectedLanguage === __thunderid_i18n.I18nDefaultConstants.FALLBACK_LANGUAGE,
				hasNamespace: !!selectedNamespace,
				onBack: handleBack,
				onDiscard: handleDiscard,
				onResetToDefault: () => {
					handleResetToDefault().catch((_error) => logger.error("Failed to reset to default", { error: _error }));
				},
				onSave: () => {
					handleSave().catch((_error) => logger.error("Failed to save translations", { error: _error }));
				}
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_NamespaceSelector.default, {
				namespaces,
				value: selectedNamespace,
				loading: isLoading,
				onChange: setSelectedNamespace
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TranslationEditorCard.default, {
				selectedLanguage,
				isLoading,
				editView,
				search,
				currentValues,
				serverValues,
				isCustomNamespace,
				colorMode,
				onTabChange: handleTabChange,
				onSearchChange: setSearch,
				onFieldChange: handleFieldChange,
				onResetField: handleResetField,
				onJsonChange: handleJsonChange
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Snackbar, {
				open: toast.open,
				autoHideDuration: 3e3,
				onClose: () => setToast((prev) => ({
					...prev,
					open: false
				})),
				anchorOrigin: {
					vertical: "bottom",
					horizontal: "center"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: toast.severity,
					onClose: () => setToast((prev) => ({
						...prev,
						open: false
					})),
					children: toast.message
				})
			})
		]
	});
}

//#endregion
exports.default = TranslationsEditPage;