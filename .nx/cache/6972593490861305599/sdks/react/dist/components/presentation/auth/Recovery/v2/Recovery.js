import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import BaseRecovery_default from "./BaseRecovery.js";
import { EmbeddedFlowType } from "@thunderid/browser";
import { useCallback } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/Recovery/v2/Recovery.tsx
/**
* Recovery component for ThunderIDV2 that provides an embedded account/password recovery flow.
*
* @example
* ```tsx
* // Default UI
* <Recovery
*   afterRecoveryUrl="/sign-in"
*   onComplete={(response) => console.log('Recovery complete', response)}
*   onError={(error) => console.error('Recovery failed', error)}
* />
*
* // Custom UI with render props
* <Recovery>
*   {({ values, fieldErrors, handleInputChange, handleSubmit, isLoading, components }) => (
*     <form onSubmit={(e) => { e.preventDefault(); handleSubmit(components[0], values); }}>
*       ...
*     </form>
*   )}
* </Recovery>
* ```
*/
const Recovery = ({ className, size = "medium", afterRecoveryUrl, onError, onComplete, tokenUrlParam, children,...rest }) => {
	const { recover, isInitialized, applicationId } = useThunderID_default();
	return /* @__PURE__ */ jsx(BaseRecovery_default, {
		afterRecoveryUrl,
		onInitialize: useCallback(async (payload) => {
			const urlParams = new URL(window.location.href).searchParams;
			const applicationIdFromUrl = urlParams.get("applicationId");
			const effectiveApplicationId = applicationId ?? applicationIdFromUrl;
			if (tokenUrlParam) {
				const executionId = urlParams.get("executionId");
				const tokenValue = urlParams.get(tokenUrlParam);
				if (executionId && tokenValue) return await recover({
					executionId,
					inputs: { [tokenUrlParam]: tokenValue }
				});
			}
			return await recover(payload ?? {
				flowType: EmbeddedFlowType.Recovery,
				...effectiveApplicationId && { applicationId: effectiveApplicationId }
			});
		}, [
			applicationId,
			tokenUrlParam,
			recover
		]),
		onSubmit: useCallback(async (payload) => await recover(payload), [recover]),
		onError,
		onComplete: useCallback((response) => {
			onComplete?.(response);
			if (afterRecoveryUrl) window.location.href = afterRecoveryUrl;
		}, [onComplete, afterRecoveryUrl]),
		className,
		size,
		isInitialized,
		showTitle: true,
		showSubtitle: true,
		children,
		...rest
	});
};
var Recovery_default = Recovery;

//#endregion
export { Recovery_default as default };
//# sourceMappingURL=Recovery.js.map