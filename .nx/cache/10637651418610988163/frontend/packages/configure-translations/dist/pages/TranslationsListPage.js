import TranslationsList from "../components/TranslationsList.js";
import { useCallback } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { Button, PageContent, PageTitle } from "@wso2/oxygen-ui";
import { Plus } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

//#region src/pages/TranslationsListPage.tsx
/**
* Page that lists all configured translation languages in a data grid.
*
* Displays each language with its flag emoji, display name, and BCP 47 code.
* Provides an "Add Language" action that navigates to the creation wizard, and
* a per-row actions menu with an "Edit" option that navigates to the edit page
* for that language.
*
* @returns JSX element rendering the translations list page
*
* @example
* ```tsx
* // Rendered automatically by the router at /translations
* import TranslationsListPage from './TranslationsListPage';
*
* function App() {
*   return <TranslationsListPage />;
* }
* ```
*
* @public
*/
function TranslationsListPage() {
	const { t } = useTranslation("translations");
	const navigate = useNavigate();
	const logger = useLogger("TranslationsListPage");
	const handleAddLanguage = useCallback(() => {
		(async () => {
			await navigate("/translations/create");
		})().catch((_error) => {
			logger.error("Failed to navigate to translation create page", { error: _error });
		});
	}, [navigate, logger]);
	return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsxs(PageTitle, { children: [
		/* @__PURE__ */ jsx(PageTitle.Header, { children: t("page.title") }),
		/* @__PURE__ */ jsx(PageTitle.SubHeader, { children: t("page.subtitle") }),
		/* @__PURE__ */ jsx(PageTitle.Actions, { children: /* @__PURE__ */ jsx(Button, {
			variant: "contained",
			startIcon: /* @__PURE__ */ jsx(Plus, { size: 18 }),
			onClick: handleAddLanguage,
			children: t("listing.addLanguage")
		}) })
	] }), /* @__PURE__ */ jsx(TranslationsList, {})] });
}

//#endregion
export { TranslationsListPage as default };