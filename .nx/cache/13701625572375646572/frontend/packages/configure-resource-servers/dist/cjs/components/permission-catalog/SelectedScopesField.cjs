const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/permission-catalog/SelectedScopesField.tsx
function SelectedScopesField({ selected }) {
	const { t } = (0, react_i18next.useTranslation)();
	const [copied, setCopied] = (0, react.useState)(false);
	const timerRef = (0, react.useRef)(void 0);
	(0, react.useEffect)(() => () => clearTimeout(timerRef.current), []);
	const scopes = selected.flatMap((entry) => entry.permissions).join(" ");
	const handleCopy = () => {
		navigator.clipboard.writeText(scopes).then(() => {
			setCopied(true);
			clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => setCopied(false), 1500);
		}).catch(() => {});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControl, {
		fullWidth: true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
			id: "permission-catalog-scopes",
			size: "small",
			value: scopes,
			placeholder: t("resourceServers:permissionCatalog.scopes.placeholder", "No permissions selected"),
			InputProps: {
				readOnly: true,
				sx: { fontFamily: "monospace" },
				endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
					position: "end",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: copied ? t("resourceServers:permissionCatalog.scopes.copied", "Copied") : "",
						open: copied,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							disabled: scopes === "",
							onClick: handleCopy,
							"aria-label": t("resourceServers:permissionCatalog.scopes.copy", "Copy scopes"),
							children: copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 16 })
						}) })
					})
				})
			}
		})
	});
}

//#endregion
exports.default = SelectedScopesField;