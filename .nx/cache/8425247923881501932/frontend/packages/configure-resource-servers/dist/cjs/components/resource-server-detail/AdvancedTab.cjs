const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useUpdateResourceServer = require('../../api/useUpdateResourceServer.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);

//#region src/components/resource-server-detail/AdvancedTab.tsx
function AdvancedTab({ resourceServer, onRefresh }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("AdvancedTab");
	const updateRs = require_useUpdateResourceServer.default();
	const [identifier, setIdentifier] = (0, react.useState)(resourceServer.identifier ?? "");
	const [identifierDirty, setIdentifierDirty] = (0, react.useState)(false);
	const handleIdentifierSave = () => {
		updateRs.mutate({
			id: resourceServer.id,
			data: {
				name: resourceServer.name,
				description: resourceServer.description ?? null,
				identifier: identifier || null,
				ouId: resourceServer.ouId
			}
		}, {
			onSuccess: () => {
				showToast(t("resourceServers:edit.advanced.identifier.saved", "Identifier saved."), "success");
				setIdentifierDirty(false);
				onRefresh();
			},
			onError: (err) => {
				logger.error("Failed to save identifier", { error: err });
				showToast(t("resourceServers:edit.advanced.identifier.saveError", "Failed to save identifier."), "error");
			}
		});
	};
	const handleIdentifierDiscard = () => {
		setIdentifier(resourceServer.identifier ?? "");
		setIdentifierDirty(false);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
		spacing: 3,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
			title: t("resourceServers:edit.advanced.identifier.title", "Configurations"),
			description: t("resourceServers:edit.advanced.identifier.description", "Configuration settings for this resource server."),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				spacing: 2,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					label: t("resourceServers:edit.advanced.identifier.label", "Identifier (Audience)"),
					value: identifier,
					onChange: (e) => {
						setIdentifier(e.target.value);
						setIdentifierDirty(true);
					},
					fullWidth: true,
					size: "small",
					helperText: t("resourceServers:edit.advanced.identifier.hint", "A unique value that identifies this resource server. When set as an URI,enables RFC 8707 resource indicator support in OAuth2 authorization requests."),
					disabled: resourceServer.isReadOnly
				}), !resourceServer.isReadOnly && identifierDirty && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						gap: 1
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
						variant: "outlined",
						size: "small",
						onClick: handleIdentifierDiscard,
						disabled: updateRs.isPending,
						children: t("common:discard", "Discard")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
						variant: "contained",
						size: "small",
						onClick: handleIdentifierSave,
						disabled: updateRs.isPending,
						children: updateRs.isPending ? t("common:saving", "Saving…") : t("common:save", "Save")
					})]
				})]
			})
		})
	});
}

//#endregion
exports.default = AdvancedTab;