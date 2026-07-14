const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_OrganizationUnitsTreeView = require('../components/OrganizationUnitsTreeView.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/pages/OrganizationUnitsListPage.tsx
function OrganizationUnitsListPage() {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: t("organizationUnits:listing.title") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.SubHeader, { children: t("organizationUnits:listing.subtitle") })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationUnitsTreeView.default, {})] });
}

//#endregion
exports.default = OrganizationUnitsListPage;