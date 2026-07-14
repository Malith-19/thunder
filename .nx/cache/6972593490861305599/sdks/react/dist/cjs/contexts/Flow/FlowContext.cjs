const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/Flow/FlowContext.ts
/**
* Context for managing authentication flow UI state.
* This context handles titles, messages, navigation, and loading states
* for authentication flows like SignIn, SignUp, organization signin, etc.
*/
const FlowContext = (0, react.createContext)(void 0);
FlowContext.displayName = "FlowContext";
var FlowContext_default = FlowContext;

//#endregion
exports.default = FlowContext_default;
//# sourceMappingURL=FlowContext.cjs.map