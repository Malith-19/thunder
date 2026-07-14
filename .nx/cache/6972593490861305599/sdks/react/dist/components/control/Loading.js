import useThunderID_default from "../../contexts/ThunderID/useThunderID.js";
import { Fragment, jsx } from "react/jsx-runtime";

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
	const { isLoading } = useThunderID_default();
	if (!isLoading) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment, { children });
};
Loading.displayName = "Loading";
var Loading_default = Loading;

//#endregion
export { Loading_default as default };
//# sourceMappingURL=Loading.js.map