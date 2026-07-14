const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/config/resource-server-types.tsx
const ResourceServerTypeMetadataList = [
	{
		value: "API",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Globe, { size: 32 }),
		titleKey: "resourceServers:create.type.api.title",
		titleFallback: "API",
		descriptionKey: "resourceServers:create.type.api.description"
	},
	{
		value: "MCP",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.MCP, { size: 32 }),
		titleKey: "resourceServers:create.type.mcp.title",
		titleFallback: "MCP",
		descriptionKey: "resourceServers:create.type.mcp.description"
	},
	{
		value: "CUSTOM",
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.PuzzleIcon, { size: 32 }),
		titleKey: "resourceServers:create.type.custom.title",
		titleFallback: "Custom",
		descriptionKey: "resourceServers:create.type.custom.description"
	}
];
const CUSTOM_METADATA = ResourceServerTypeMetadataList.find((m) => m.value === "CUSTOM");
function getResourceServerTypeMetadata(type) {
	return ResourceServerTypeMetadataList.find((m) => m.value === type) ?? CUSTOM_METADATA;
}
function getResourceServerTypeIcon(type) {
	return getResourceServerTypeMetadata(type).icon;
}
function getResourceServerTypeLabel(type, t) {
	const meta = getResourceServerTypeMetadata(type);
	return t(meta.titleKey, meta.titleFallback);
}
var resource_server_types_default = ResourceServerTypeMetadataList;

//#endregion
exports.default = resource_server_types_default;
exports.getResourceServerTypeIcon = getResourceServerTypeIcon;
exports.getResourceServerTypeLabel = getResourceServerTypeLabel;