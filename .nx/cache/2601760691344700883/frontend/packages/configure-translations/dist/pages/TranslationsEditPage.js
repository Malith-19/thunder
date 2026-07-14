import NamespaceSelector from "../components/edit-translation/NamespaceSelector.js";
import TranslationEditorCard from "../components/edit-translation/TranslationEditorCard.js";
import TranslationEditorHeader from "../components/edit-translation/TranslationEditorHeader.js";
import { useCallback, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { I18nDefaultConstants, NamespaceConstants, useGetTranslations, useUpdateTranslation } from "@thunderid/i18n";
import { useLogger } from "@thunderid/logger/react";
import { Alert, PageContent, Snackbar, useColorScheme } from "@wso2/oxygen-ui";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

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
	const { t } = useTranslation("translations");
	const navigate = useNavigate();
	const logger = useLogger("TranslationsEditPage");
	const { language: languageParam } = useParams();
	const selectedLanguage = languageParam ?? null;
	const { mode, systemMode } = useColorScheme();
	const colorMode = ((mode === "system" ? systemMode : mode) ?? "light") === "dark" ? "dark" : "light";
	const [selectedNamespace, setSelectedNamespace] = useState(null);
	const [editView, setEditView] = useState("fields");
	const [search, setSearch] = useState("");
	const [localChanges, setLocalChanges] = useState({});
	const [isSaving, setIsSaving] = useState(false);
	const [toast, setToast] = useState({
		open: false,
		message: "",
		severity: "success"
	});
	const { data: translationsData, isLoading: translationsLoading } = useGetTranslations({
		language: selectedLanguage ?? "",
		enabled: !!selectedLanguage
	});
	const { data: defaultTranslationsData } = useGetTranslations({
		language: "en",
		enabled: !!selectedLanguage && selectedLanguage !== "en"
	});
	const updateTranslation = useUpdateTranslation();
	const namespaces = useMemo(() => {
		if (!translationsData?.translations) return [];
		const ns = Object.keys(translationsData?.translations ?? {});
		return ns.includes(NamespaceConstants.CUSTOM_NAMESPACE) ? ns : [...ns, NamespaceConstants.CUSTOM_NAMESPACE];
	}, [translationsData]);
	const [prevLanguage, setPrevLanguage] = useState(selectedLanguage);
	if (prevLanguage !== selectedLanguage) {
		setPrevLanguage(selectedLanguage);
		setSelectedNamespace(null);
		setLocalChanges({});
		setSearch("");
	}
	if (namespaces.length > 0 && !selectedNamespace) setSelectedNamespace(namespaces[0]);
	const [prevNamespace, setPrevNamespace] = useState(selectedNamespace);
	if (prevNamespace !== selectedNamespace) {
		setPrevNamespace(selectedNamespace);
		setLocalChanges({});
		setSearch("");
	}
	const serverValues = useMemo(() => translationsData?.translations?.[selectedNamespace ?? ""] ?? {}, [translationsData, selectedNamespace]);
	const currentValues = useMemo(() => ({
		...serverValues,
		...localChanges
	}), [serverValues, localChanges]);
	const dirtyKeys = useMemo(() => Object.keys(localChanges).filter((k) => localChanges[k] !== serverValues[k]), [localChanges, serverValues]);
	const hasDirtyChanges = dirtyKeys.length > 0;
	const handleFieldChange = useCallback((key, value) => {
		setLocalChanges((prev) => ({
			...prev,
			[key]: value
		}));
	}, []);
	const handleResetField = useCallback((key) => {
		setLocalChanges((prev) => {
			const next = { ...prev };
			delete next[key];
			return next;
		});
	}, []);
	const handleJsonChange = useCallback((changes) => {
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
	const isCustomNamespace = selectedNamespace === NamespaceConstants.CUSTOM_NAMESPACE;
	return /* @__PURE__ */ jsxs(PageContent, {
		fullWidth: true,
		sx: {
			display: "flex",
			flexDirection: "column",
			flex: 1,
			minHeight: 0
		},
		children: [
			/* @__PURE__ */ jsx(TranslationEditorHeader, {
				selectedLanguage,
				hasDirtyChanges,
				dirtyCount: dirtyKeys.length,
				isSaving,
				isFallbackLanguage: selectedLanguage === I18nDefaultConstants.FALLBACK_LANGUAGE,
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
			/* @__PURE__ */ jsx(NamespaceSelector, {
				namespaces,
				value: selectedNamespace,
				loading: isLoading,
				onChange: setSelectedNamespace
			}),
			/* @__PURE__ */ jsx(TranslationEditorCard, {
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
			/* @__PURE__ */ jsx(Snackbar, {
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
				children: /* @__PURE__ */ jsx(Alert, {
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
export { TranslationsEditPage as default };