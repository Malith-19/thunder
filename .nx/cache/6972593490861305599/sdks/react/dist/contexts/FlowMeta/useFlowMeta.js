import FlowMetaContext_default from "./FlowMetaContext.js";
import { useContext } from "react";

//#region src/contexts/FlowMeta/useFlowMeta.ts
const useFlowMeta = () => {
	const context = useContext(FlowMetaContext_default);
	if (!context) throw new Error("useFlowMeta must be used within a FlowMetaProvider");
	return context;
};
var useFlowMeta_default = useFlowMeta;

//#endregion
export { useFlowMeta_default as default };
//# sourceMappingURL=useFlowMeta.js.map