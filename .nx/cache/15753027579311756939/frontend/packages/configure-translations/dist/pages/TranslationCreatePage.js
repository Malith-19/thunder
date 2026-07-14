import { TranslationCreateFlowStep } from "../models/translation-create-flow.js";
import InitializeLanguage from "../components/create-translation/InitializeLanguage.js";
import ReviewLocaleCode from "../components/create-translation/ReviewLocaleCode.js";
import SelectCountry from "../components/create-translation/SelectCountry.js";
import SelectLanguage from "../components/create-translation/SelectLanguage.js";
import useTranslationCreate from "../contexts/TranslationCreate/useTranslationCreate.js";
import { useCallback, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { I18nDefaultConstants, useCreateTranslations, useGetTranslations } from "@thunderid/i18n";
import { useLogger } from "@thunderid/logger/react";
import { Alert, Box, Breadcrumbs, Button, IconButton, LinearProgress, Typography } from "@wso2/oxygen-ui";
import { ChevronRight, X } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

//#region src/pages/TranslationCreatePage.tsx
const STEPS = [
	TranslationCreateFlowStep.COUNTRY,
	TranslationCreateFlowStep.LANGUAGE,
	TranslationCreateFlowStep.LOCALE_CODE,
	TranslationCreateFlowStep.INITIALIZE
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
	const { t } = useTranslation("translations");
	const navigate = useNavigate();
	const logger = useLogger("TranslationCreatePage");
	const { refetch: fetchEnTranslations } = useGetTranslations({
		language: I18nDefaultConstants.FALLBACK_LANGUAGE,
		enabled: false
	});
	const createTranslations = useCreateTranslations();
	const { currentStep, setCurrentStep, selectedCountry, setSelectedCountry, selectedLocale, setSelectedLocale, localeCodeOverride, setLocaleCodeOverride, localeCode, populateFromEnglish, setPopulateFromEnglish, isCreating, setIsCreating, progress, setProgress, error, setError } = useTranslationCreate();
	const [stepReady, setStepReady] = useState({
		COUNTRY: false,
		LANGUAGE: false,
		LOCALE_CODE: true,
		INITIALIZE: true
	});
	const [prevCountry, setPrevCountry] = useState(selectedCountry);
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
	const handleCountryReady = useCallback((isReady) => {
		setStepReady((prev) => ({
			...prev,
			COUNTRY: isReady
		}));
	}, []);
	const handleLanguageReady = useCallback((isReady) => {
		setStepReady((prev) => ({
			...prev,
			LANGUAGE: isReady
		}));
	}, []);
	const handleLocaleCodeReady = useCallback((isReady) => {
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
			if (currentStep === TranslationCreateFlowStep.LANGUAGE) setLocaleCodeOverride(selectedLocale?.code ?? "");
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
			case TranslationCreateFlowStep.COUNTRY: return /* @__PURE__ */ jsx(SelectCountry, {
				selectedCountry,
				onCountryChange: setSelectedCountry,
				onReadyChange: handleCountryReady
			});
			case TranslationCreateFlowStep.LANGUAGE:
				if (!selectedCountry) return null;
				return /* @__PURE__ */ jsx(SelectLanguage, {
					selectedCountry,
					selectedLocale,
					onLocaleChange: setSelectedLocale,
					onReadyChange: handleLanguageReady
				});
			case TranslationCreateFlowStep.LOCALE_CODE:
				if (!selectedLocale) return null;
				return /* @__PURE__ */ jsx(ReviewLocaleCode, {
					derivedLocale: selectedLocale,
					localeCode: localeCodeOverride,
					onLocaleCodeChange: setLocaleCodeOverride,
					onReadyChange: handleLocaleCodeReady
				});
			case TranslationCreateFlowStep.INITIALIZE: return /* @__PURE__ */ jsx(InitializeLanguage, {
				populateFromEnglish,
				onPopulateChange: setPopulateFromEnglish,
				isCreating,
				progress
			});
			default: return null;
		}
	};
	const isFirstStep = currentStep === TranslationCreateFlowStep.COUNTRY;
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			height: "100vh",
			display: "flex",
			flexDirection: "column",
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ jsx(LinearProgress, {
			variant: "determinate",
			value: stepProgress,
			sx: {
				height: 6,
				flexShrink: 0
			}
		}), /* @__PURE__ */ jsxs(Box, {
			sx: {
				flex: 1,
				display: "flex",
				flexDirection: "column",
				minHeight: 0
			},
			children: [/* @__PURE__ */ jsxs(Box, {
				sx: {
					p: 4,
					display: "flex",
					alignItems: "center",
					gap: 2,
					flexShrink: 0
				},
				children: [/* @__PURE__ */ jsx(IconButton, {
					onClick: handleClose,
					disabled: isCreating,
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
							children: stepLabels[step]
						}, step) : /* @__PURE__ */ jsx(Typography, {
							variant: "h5",
							onClick: () => !isCreating && setCurrentStep(step),
							sx: { cursor: isCreating ? "default" : "pointer" },
							children: stepLabels[step]
						}, step);
					})
				})]
			}), /* @__PURE__ */ jsx(Box, {
				sx: {
					flex: 1,
					display: "flex",
					flexDirection: "column",
					overflowY: "auto",
					py: 8,
					px: 20,
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
							sx: { mb: 3 },
							onClose: () => setError(null),
							children: error
						}),
						renderStepContent(),
						/* @__PURE__ */ jsxs(Box, {
							sx: {
								mt: 4,
								display: "flex",
								justifyContent: isFirstStep ? "flex-end" : "space-between",
								gap: 2
							},
							children: [!isFirstStep && /* @__PURE__ */ jsx(Button, {
								variant: "outlined",
								onClick: handleBack,
								sx: { minWidth: 100 },
								disabled: isCreating,
								children: t("common:actions.back", { ns: "common" })
							}), /* @__PURE__ */ jsx(Button, {
								variant: "contained",
								onClick: handleNext,
								sx: { minWidth: 100 },
								disabled: !stepReady[currentStep] || isCreating,
								children: currentStep === TranslationCreateFlowStep.INITIALIZE ? t("language.create.createButton") : t("common:actions.continue", { ns: "common" })
							})]
						})
					]
				})
			})]
		})]
	});
}

//#endregion
export { TranslationCreatePage as default };