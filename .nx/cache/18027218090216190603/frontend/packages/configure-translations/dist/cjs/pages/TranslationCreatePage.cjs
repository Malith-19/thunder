const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_translation_create_flow = require('../models/translation-create-flow.cjs');
const require_InitializeLanguage = require('../components/create-translation/InitializeLanguage.cjs');
const require_ReviewLocaleCode = require('../components/create-translation/ReviewLocaleCode.cjs');
const require_SelectCountry = require('../components/create-translation/SelectCountry.cjs');
const require_SelectLanguage = require('../components/create-translation/SelectLanguage.cjs');
const require_useTranslationCreate = require('../contexts/TranslationCreate/useTranslationCreate.cjs');
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
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/pages/TranslationCreatePage.tsx
const STEPS = [
	require_translation_create_flow.TranslationCreateFlowStep.COUNTRY,
	require_translation_create_flow.TranslationCreateFlowStep.LANGUAGE,
	require_translation_create_flow.TranslationCreateFlowStep.LOCALE_CODE,
	require_translation_create_flow.TranslationCreateFlowStep.INITIALIZE
];
/**
* Full-page wizard for creating a new translation language.
*
* Guides the user through four sequential steps: choosing a country, selecting
* the language variant, reviewing or overriding the derived BCP 47 locale code,
* and choosing how to initialize the translation keys. On completion it writes
* all keys to the server and navigates to the edit page for the new language.
*
* @returns JSX element rendering the multi-step language creation page
*
* @example
* ```tsx
* // Rendered automatically by the router at /translations/create
* import TranslationCreatePage from './TranslationCreatePage';
*
* function App() {
*   return <TranslationCreatePage />;
* }
* ```
*
* @public
*/
function TranslationCreatePage() {
	const { t } = (0, react_i18next.useTranslation)("translations");
	const navigate = (0, react_router.useNavigate)();
	const logger = (0, __thunderid_logger_react.useLogger)("TranslationCreatePage");
	const { refetch: fetchEnTranslations } = (0, __thunderid_i18n.useGetTranslations)({
		language: __thunderid_i18n.I18nDefaultConstants.FALLBACK_LANGUAGE,
		enabled: false
	});
	const createTranslations = (0, __thunderid_i18n.useCreateTranslations)();
	const { currentStep, setCurrentStep, selectedCountry, setSelectedCountry, selectedLocale, setSelectedLocale, localeCodeOverride, setLocaleCodeOverride, localeCode, populateFromEnglish, setPopulateFromEnglish, isCreating, setIsCreating, progress, setProgress, error, setError } = require_useTranslationCreate.default();
	const [stepReady, setStepReady] = (0, react.useState)({
		COUNTRY: false,
		LANGUAGE: false,
		LOCALE_CODE: true,
		INITIALIZE: true
	});
	const [prevCountry, setPrevCountry] = (0, react.useState)(selectedCountry);
	if (prevCountry !== selectedCountry) {
		setPrevCountry(selectedCountry);
		setSelectedLocale(null);
		setStepReady((prev) => ({
			...prev,
			LANGUAGE: false
		}));
	}
	const stepLabels = {
		COUNTRY: t("language.create.steps.country"),
		LANGUAGE: t("language.create.steps.language"),
		LOCALE_CODE: t("language.create.steps.localeCode"),
		INITIALIZE: t("language.create.steps.initialize")
	};
	const stepProgress = (STEPS.indexOf(currentStep) + 1) / STEPS.length * 100;
	const getBreadcrumbSteps = () => STEPS.slice(0, STEPS.indexOf(currentStep) + 1);
	const handleCountryReady = (0, react.useCallback)((isReady) => {
		setStepReady((prev) => ({
			...prev,
			COUNTRY: isReady
		}));
	}, []);
	const handleLanguageReady = (0, react.useCallback)((isReady) => {
		setStepReady((prev) => ({
			...prev,
			LANGUAGE: isReady
		}));
	}, []);
	const handleLocaleCodeReady = (0, react.useCallback)((isReady) => {
		setStepReady((prev) => ({
			...prev,
			LOCALE_CODE: isReady
		}));
	}, []);
	const handleClose = () => {
		(async () => {
			await navigate("/translations");
		})().catch((_error) => {
			logger.error("Failed to navigate to translations page", { error: _error });
		});
	};
	const handleCreate = async () => {
		if (!localeCode) return;
		setError(null);
		setIsCreating(true);
		setProgress(0);
		const { data: enData, error: enError } = await fetchEnTranslations();
		if (enError || !enData) {
			logger.error("Failed to fetch en-US translations", { error: enError });
			setError(t("language.add.error"));
			setIsCreating(false);
			return;
		}
		const translations = {};
		Object.entries(enData.translations).forEach(([ns, nsValues]) => {
			translations[ns] = {};
			Object.entries(nsValues).forEach(([key, val]) => {
				translations[ns][key] = populateFromEnglish ? val : "";
			});
		});
		try {
			await createTranslations.mutateAsync({
				language: localeCode,
				translations
			});
			setProgress(100);
		} catch (_err) {
			logger.error("Failed to create translations", { error: _err });
			setError(t("language.add.error"));
			setIsCreating(false);
			return;
		}
		try {
			await navigate(`/translations/${localeCode}`);
		} catch (_err) {
			logger.error("Translations created but navigation failed", {
				error: _err,
				localeCode
			});
			setIsCreating(false);
		}
	};
	const handleNext = () => {
		const idx = STEPS.indexOf(currentStep);
		if (idx < STEPS.length - 1) {
			if (currentStep === require_translation_create_flow.TranslationCreateFlowStep.LANGUAGE) setLocaleCodeOverride(selectedLocale?.code ?? "");
			setCurrentStep(STEPS[idx + 1]);
		} else handleCreate().catch((_error) => {
			logger.error("Failed to create translation", { error: _error });
		});
	};
	const handleBack = () => {
		const idx = STEPS.indexOf(currentStep);
		if (idx > 0) setCurrentStep(STEPS[idx - 1]);
	};
	const renderStepContent = () => {
		switch (currentStep) {
			case require_translation_create_flow.TranslationCreateFlowStep.COUNTRY: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SelectCountry.default, {
				selectedCountry,
				onCountryChange: setSelectedCountry,
				onReadyChange: handleCountryReady
			});
			case require_translation_create_flow.TranslationCreateFlowStep.LANGUAGE:
				if (!selectedCountry) return null;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SelectLanguage.default, {
					selectedCountry,
					selectedLocale,
					onLocaleChange: setSelectedLocale,
					onReadyChange: handleLanguageReady
				});
			case require_translation_create_flow.TranslationCreateFlowStep.LOCALE_CODE:
				if (!selectedLocale) return null;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ReviewLocaleCode.default, {
					derivedLocale: selectedLocale,
					localeCode: localeCodeOverride,
					onLocaleCodeChange: setLocaleCodeOverride,
					onReadyChange: handleLocaleCodeReady
				});
			case require_translation_create_flow.TranslationCreateFlowStep.INITIALIZE: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InitializeLanguage.default, {
				populateFromEnglish,
				onPopulateChange: setPopulateFromEnglish,
				isCreating,
				progress
			});
			default: return null;
		}
	};
	const isFirstStep = currentStep === require_translation_create_flow.TranslationCreateFlowStep.COUNTRY;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			height: "100vh",
			display: "flex",
			flexDirection: "column",
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.LinearProgress, {
			variant: "determinate",
			value: stepProgress,
			sx: {
				height: 6,
				flexShrink: 0
			}
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				flex: 1,
				display: "flex",
				flexDirection: "column",
				minHeight: 0
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					p: 4,
					display: "flex",
					alignItems: "center",
					gap: 2,
					flexShrink: 0
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					onClick: handleClose,
					disabled: isCreating,
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
							children: stepLabels[step]
						}, step) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "h5",
							onClick: () => !isCreating && setCurrentStep(step),
							sx: { cursor: isCreating ? "default" : "pointer" },
							children: stepLabels[step]
						}, step);
					})
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					flex: 1,
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					py: 8,
					px: 20,
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
							sx: { mb: 3 },
							onClose: () => setError(null),
							children: error
						}),
						renderStepContent(),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
							sx: {
								mt: 4,
								display: "flex",
								justifyContent: isFirstStep ? "flex-end" : "space-between",
								gap: 2
							},
							children: [!isFirstStep && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
								variant: "outlined",
								onClick: handleBack,
								sx: { minWidth: 100 },
								disabled: isCreating,
								children: t("common:actions.back", { ns: "common" })
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
								variant: "contained",
								onClick: handleNext,
								sx: { minWidth: 100 },
								disabled: !stepReady[currentStep] || isCreating,
								children: currentStep === require_translation_create_flow.TranslationCreateFlowStep.INITIALIZE ? t("language.create.createButton") : t("common:actions.continue", { ns: "common" })
							})]
						})
					]
				})
			})]
		})]
	});
}

//#endregion
exports.default = TranslationCreatePage;