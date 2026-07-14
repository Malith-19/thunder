import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import BaseRecovery_default from "./BaseRecovery.js";
import { EmbeddedFlowType } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/Recovery/v1/Recovery.tsx
/**
* Recovery component for ThunderID V1 that provides an embedded account/password recovery flow.
*/
const Recovery = ({ className, size = "medium", afterRecoveryUrl, onError, onComplete, children,...rest }) => {
	const { recover, isInitialized } = useThunderID_default();
	const handleInitialize = async (payload) => {
		return await recover(payload || { flowType: EmbeddedFlowType.Recovery });
	};
	const handleOnSubmit = async (payload) => await recover(payload);
	const handleComplete = (response) => {
		onComplete?.(response);
		if (afterRecoveryUrl) window.location.href = afterRecoveryUrl;
	};
	return /* @__PURE__ */ jsx(BaseRecovery_default, {
		afterRecoveryUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onError,
		onComplete: handleComplete,
		className,
		size,
		isInitialized,
		showLogo: true,
		showTitle: false,
		showSubtitle: false,
		children,
		...rest
	});
};
var Recovery_default = Recovery;

//#endregion
export { Recovery_default as default };
//# sourceMappingURL=Recovery.js.map