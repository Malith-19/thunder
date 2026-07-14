const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_I18nContext = require('./I18nContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/I18n/useI18n.ts
/**
* Hook for accessing the I18n context directly.
* Provides access to the full i18n context including bundles and all utilities.
*
* @returns The complete I18n context value
* @throws Error if used outside of I18nProvider context
*/
const useI18n = () => {
	const context = (0, react.useContext)(require_I18nContext.default);
	if (!context) throw new Error("useI18n must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.");
	return context;
};
var useI18n_default = useI18n;

//#endregion
exports.default = useI18n_default;
//# sourceMappingURL=useI18n.cjs.map