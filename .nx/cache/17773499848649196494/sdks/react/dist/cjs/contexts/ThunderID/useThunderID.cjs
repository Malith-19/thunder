const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_ThunderIDContext = require('./ThunderIDContext.cjs');
const require_FlowMetaContext = require('../FlowMeta/FlowMetaContext.cjs');
const require_I18nContext = require('../I18n/I18nContext.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/ThunderID/useThunderID.ts
const useThunderID = () => {
	const context = (0, react.useContext)(require_ThunderIDContext.default);
	if (!context) throw new Error("useThunderID must be used within an ThunderIDProvider");
	const flowMetaContext = (0, react.useContext)(require_FlowMetaContext.default);
	const i18nContext = (0, react.useContext)(require_I18nContext.default);
	const meta = flowMetaContext?.meta ?? null;
	const isMetaLoading = flowMetaContext?.isLoading ?? false;
	return {
		...context,
		isMetaLoading,
		meta,
		resolveFlowTemplateLiterals: (text) => (0, __thunderid_browser.resolveFlowTemplateLiterals)(text, {
			meta,
			t: i18nContext?.t ?? ((key) => key)
		})
	};
};
var useThunderID_default = useThunderID;

//#endregion
exports.default = useThunderID_default;
//# sourceMappingURL=useThunderID.cjs.map