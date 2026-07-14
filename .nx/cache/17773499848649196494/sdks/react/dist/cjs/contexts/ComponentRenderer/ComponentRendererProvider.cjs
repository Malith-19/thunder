const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_ComponentRendererContext = require('./ComponentRendererContext.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/ComponentRenderer/ComponentRendererProvider.tsx
const ComponentRendererProvider = ({ renderers, children }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ComponentRendererContext.default.Provider, {
	value: renderers,
	children
});
var ComponentRendererProvider_default = ComponentRendererProvider;

//#endregion
exports.default = ComponentRendererProvider_default;
//# sourceMappingURL=ComponentRendererProvider.cjs.map