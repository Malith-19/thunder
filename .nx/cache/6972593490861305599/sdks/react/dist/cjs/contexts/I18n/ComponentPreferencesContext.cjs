const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/I18n/ComponentPreferencesContext.ts
/**
* Context for component-level preferences overrides.
* Presentational components can provide this context to override the global i18n
* and theme settings for their entire subtree, including all nested components.
*/
const ComponentPreferencesContext = (0, react.createContext)(void 0);
var ComponentPreferencesContext_default = ComponentPreferencesContext;

//#endregion
exports.default = ComponentPreferencesContext_default;
//# sourceMappingURL=ComponentPreferencesContext.cjs.map