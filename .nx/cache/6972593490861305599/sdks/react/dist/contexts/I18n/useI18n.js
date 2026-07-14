import I18nContext_default from "./I18nContext.js";
import { useContext } from "react";

//#region src/contexts/I18n/useI18n.ts
/**
* Hook for accessing the I18n context directly.
* Provides access to the full i18n context including bundles and all utilities.
*
* @returns The complete I18n context value
* @throws Error if used outside of I18nProvider context
*/
const useI18n = () => {
	const context = useContext(I18nContext_default);
	if (!context) throw new Error("useI18n must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.");
	return context;
};
var useI18n_default = useI18n;

//#endregion
export { useI18n_default as default };
//# sourceMappingURL=useI18n.js.map