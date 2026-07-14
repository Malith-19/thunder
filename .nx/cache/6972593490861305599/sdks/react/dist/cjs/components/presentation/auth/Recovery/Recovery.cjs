const require_rolldown_runtime = require('../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../contexts/ThunderID/useThunderID.cjs');
const require_Recovery = require('./v1/Recovery.cjs');
const require_Recovery$1 = require('./v2/Recovery.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const { platform } = require_useThunderID.default();
	if (platform === __thunderid_browser.Platform.ThunderID) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Recovery$1.default, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Recovery.default, { ...props });
};
var Recovery_default$2 = Recovery;

//#endregion
exports.default = Recovery_default$2;
//# sourceMappingURL=Recovery.cjs.map