import { Globe, MCP, PuzzleIcon } from "@wso2/oxygen-ui-icons-react";
import { jsx } from "react/jsx-runtime";

//#region src/config/resource-server-types.tsx
const ResourceServerTypeMetadataList = [
	{
		value: "API",
		icon: /* @__PURE__ */ jsx(Globe, { size: 32 }),
		titleKey: "resourceServers:create.type.api.title",
		titleFallback: "API",
		descriptionKey: "resourceServers:create.type.api.description"
	},
	{
		value: "MCP",
		icon: /* @__PURE__ */ jsx(MCP, { size: 32 }),
		titleKey: "resourceServers:create.type.mcp.title",
		titleFallback: "MCP",
		descriptionKey: "resourceServers:create.type.mcp.description"
	},
	{
		value: "CUSTOM",
		icon: /* @__PURE__ */ jsx(PuzzleIcon, { size: 32 }),
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
export { resource_server_types_default as default, getResourceServerTypeIcon, getResourceServerTypeLabel };