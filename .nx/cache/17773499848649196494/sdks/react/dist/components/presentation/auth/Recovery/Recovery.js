import useThunderID_default from "../../../../contexts/ThunderID/useThunderID.js";
import Recovery_default from "./v1/Recovery.js";
import Recovery_default$1 from "./v2/Recovery.js";
import { Platform } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/Recovery/Recovery.tsx
/**
* Recovery component that provides an embedded account/password recovery flow.
* Routes to the appropriate version-specific implementation based on the platform.
*
* @example
* ```tsx
* import { Recovery } from '@thunderid/react';
*
* const App = () => (
*   <Recovery
*     afterRecoveryUrl="/sign-in"
*     onComplete={(response) => console.log('Recovery complete', response)}
*     onError={(error) => console.error('Recovery failed', error)}
*   />
* );
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* <Recovery>
*   {({ values, fieldErrors, handleInputChange, handleSubmit, isLoading, components }) => (
*     <form onSubmit={(e) => { e.preventDefault(); handleSubmit(components[0], values); }}>
*       ...
*     </form>
*   )}
* </Recovery>
* ```
*/
const Recovery = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(Recovery_default$1, { ...props });
	return /* @__PURE__ */ jsx(Recovery_default, { ...props });
};
var Recovery_default$2 = Recovery;

//#endregion
export { Recovery_default$2 as default };
//# sourceMappingURL=Recovery.js.map