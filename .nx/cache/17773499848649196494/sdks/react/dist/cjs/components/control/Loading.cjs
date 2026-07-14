const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../contexts/ThunderID/useThunderID.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/control/Loading.tsx
/**
* A component that only renders its children when the ThunderID is loading.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { Loading } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <Loading fallback={<p>Finished Loading...</p>}>
*       <p>Loading...</p>
*     </Loading>
*   );
* }
* ```
*/
const Loading = ({ children, fallback = null }) => {
	const { isLoading } = require_useThunderID.default();
	if (!isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
};
Loading.displayName = "Loading";
var Loading_default = Loading;

//#endregion
exports.default = Loading_default;
//# sourceMappingURL=Loading.cjs.map