const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_ResourceServersList = require('../components/ResourceServersList.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/pages/ResourceServersListPage.tsx
function ResourceServersListPage() {
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("ResourceServersListPage");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: t("resourceServers:listing.title", "Resource Servers") }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.SubHeader, { children: t("resourceServers:listing.subtitle", "Define resource servers and their resources to manage access control.") }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Actions, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
			direction: "row",
			spacing: 2,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "contained",
				startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 18 }),
				onClick: () => {
					(async () => {
						await navigate("/resource-servers/create");
					})().catch((err) => {
						logger.error("Failed to navigate to create resource server page", { error: err });
					});
				},
				children: t("resourceServers:listing.addResourceServer", "Add resource server")
			})
		}) })
	] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ResourceServersList.default, {})] });
}

//#endregion
exports.default = ResourceServersListPage;