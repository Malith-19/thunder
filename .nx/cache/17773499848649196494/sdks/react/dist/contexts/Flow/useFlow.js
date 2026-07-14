import FlowContext_default from "./FlowContext.js";
import { useContext } from "react";

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
	const context = useContext(FlowContext_default);
	if (!context) throw new Error("useFlow must be used within a FlowProvider");
	return context;
};
var useFlow_default = useFlow;

//#endregion
export { useFlow_default as default };
//# sourceMappingURL=useFlow.js.map