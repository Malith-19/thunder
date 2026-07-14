const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_FlowMetaContext = require('./FlowMetaContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/FlowMeta/useFlowMeta.ts
const useFlowMeta = () => {
	const context = (0, react.useContext)(require_FlowMetaContext.default);
	if (!context) throw new Error("useFlowMeta must be used within a FlowMetaProvider");
	return context;
};
var useFlowMeta_default = useFlowMeta;

//#endregion
exports.default = useFlowMeta_default;
//# sourceMappingURL=useFlowMeta.cjs.map