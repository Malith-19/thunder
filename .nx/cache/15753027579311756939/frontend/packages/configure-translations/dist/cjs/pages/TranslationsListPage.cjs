const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_TranslationsList = require('../components/TranslationsList.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
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
	const { t } = (0, react_i18next.useTranslation)("translations");
	const navigate = (0, react_router.useNavigate)();
	const logger = (0, __thunderid_logger_react.useLogger)("TranslationsListPage");
	const handleAddLanguage = (0, react.useCallback)(() => {
		(async () => {
			await navigate("/translations/create");
		})().catch((_error) => {
			logger.error("Failed to navigate to translation create page", { error: _error });
		});
	}, [navigate, logger]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: t("page.title") }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.SubHeader, { children: t("page.subtitle") }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Actions, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
			variant: "contained",
			startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 18 }),
			onClick: handleAddLanguage,
			children: t("listing.addLanguage")
		}) })
	] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TranslationsList.default, {})] });
}

//#endregion
exports.default = TranslationsListPage;