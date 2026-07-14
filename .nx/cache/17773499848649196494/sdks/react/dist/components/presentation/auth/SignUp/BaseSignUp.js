import useThunderID_default from "../../../../contexts/ThunderID/useThunderID.js";
import BaseSignUp_default from "./v1/BaseSignUp.js";
import BaseSignUp_default$1 from "./v2/BaseSignUp.js";
import { Platform } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignUp/BaseSignUp.tsx
const BaseSignUp = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(BaseSignUp_default$1, { ...props });
	return /* @__PURE__ */ jsx(BaseSignUp_default, { ...props });
};
var BaseSignUp_default$2 = BaseSignUp;

//#endregion
export { BaseSignUp_default$2 as default };
//# sourceMappingURL=BaseSignUp.js.map