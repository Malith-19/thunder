import useThunderID_default from "../../../../contexts/ThunderID/useThunderID.js";
import BaseSignIn_default from "./v1/BaseSignIn.js";
import BaseSignIn_default$1 from "./v2/BaseSignIn.js";
import { Platform } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignIn/BaseSignIn.tsx
const BaseSignIn = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(BaseSignIn_default$1, { ...props });
	return /* @__PURE__ */ jsx(BaseSignIn_default, { ...props });
};
var BaseSignIn_default$2 = BaseSignIn;

//#endregion
export { BaseSignIn_default$2 as default };
//# sourceMappingURL=BaseSignIn.js.map