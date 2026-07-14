const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_FlowContext = require('./FlowContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/Flow/useFlow.ts
/**
* Hook to access the flow context.
* Must be used within a FlowProvider.
*
* @example
* ```tsx
* const MyAuthComponent = () => {
*   const { title, setTitle, addMessage, isLoading } = useFlow();
*
*   const handleSuccess = () => {
*     addMessage({
*       type: 'success',
*       message: 'Authentication successful!'
*     });
*   };
*
*   return (
*     <div>
*       <h1>{title}</h1>
*       {isLoading && <p>Loading...</p>}
*     </div>
*   );
* };
* ```
*
* @returns The flow context value
* @throws Error if used outside of FlowProvider
*/
const useFlow = () => {
	const context = (0, react.useContext)(require_FlowContext.default);
	if (!context) throw new Error("useFlow must be used within a FlowProvider");
	return context;
};
var useFlow_default = useFlow;

//#endregion
exports.default = useFlow_default;
//# sourceMappingURL=useFlow.cjs.map