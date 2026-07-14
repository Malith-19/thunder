import ComponentRendererContext_default from "./ComponentRendererContext.js";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/ComponentRenderer/ComponentRendererProvider.tsx
const ComponentRendererProvider = ({ renderers, children }) => /* @__PURE__ */ jsx(ComponentRendererContext_default.Provider, {
	value: renderers,
	children
});
var ComponentRendererProvider_default = ComponentRendererProvider;

//#endregion
export { ComponentRendererProvider_default as default };
//# sourceMappingURL=ComponentRendererProvider.js.map