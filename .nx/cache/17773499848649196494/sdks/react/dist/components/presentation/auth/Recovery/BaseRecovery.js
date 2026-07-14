import useThunderID_default from "../../../../contexts/ThunderID/useThunderID.js";
import BaseRecovery_default from "./v1/BaseRecovery.js";
import BaseRecovery_default$1 from "./v2/BaseRecovery.js";
import { Platform } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/Recovery/BaseRecovery.tsx
const BaseRecovery = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(BaseRecovery_default$1, { ...props });
	return /* @__PURE__ */ jsx(BaseRecovery_default, { ...props });
};
var BaseRecovery_default$2 = BaseRecovery;

//#endregion
export { BaseRecovery_default$2 as default };
//# sourceMappingURL=BaseRecovery.js.map