import ThunderIDContext_default from "./ThunderIDContext.js";
import FlowMetaContext_default from "../FlowMeta/FlowMetaContext.js";
import I18nContext_default from "../I18n/I18nContext.js";
import { resolveFlowTemplateLiterals } from "@thunderid/browser";
import { useContext } from "react";

//#region src/contexts/ThunderID/useThunderID.ts
const useThunderID = () => {
	const context = useContext(ThunderIDContext_default);
	if (!context) throw new Error("useThunderID must be used within an ThunderIDProvider");
	const flowMetaContext = useContext(FlowMetaContext_default);
	const i18nContext = useContext(I18nContext_default);
	const meta = flowMetaContext?.meta ?? null;
	const isMetaLoading = flowMetaContext?.isLoading ?? false;
	return {
		...context,
		isMetaLoading,
		meta,
		resolveFlowTemplateLiterals: (text) => resolveFlowTemplateLiterals(text, {
			meta,
			t: i18nContext?.t ?? ((key) => key)
		})
	};
};
var useThunderID_default = useThunderID;

//#endregion
export { useThunderID_default as default };
//# sourceMappingURL=useThunderID.js.map