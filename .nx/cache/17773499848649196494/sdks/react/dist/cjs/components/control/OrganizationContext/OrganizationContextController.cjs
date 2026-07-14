const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/control/OrganizationContext/OrganizationContextController.tsx
const OrganizationContextController = ({ targetOrganizationId, isSourceSignedIn, children }) => {
	const { isInitialized, isSignedIn, switchOrganization, isLoading } = require_useThunderID.default();
	const hasAuthenticatedRef = (0, react.useRef)(false);
	const isAuthenticatingRef = (0, react.useRef)(false);
	/**
	* Handle the organization switch when:
	* - Current instance is initialized and NOT signed in
	* - Source provider IS signed in
	* Uses the `switchOrganization` function from the ThunderID context.
	*/
	(0, react.useEffect)(() => {
		const performOrganizationSwitch = async () => {
			if (hasAuthenticatedRef.current || isAuthenticatingRef.current) return;
			if (!isInitialized || isLoading) return;
			if (isSignedIn) {
				hasAuthenticatedRef.current = true;
				return;
			}
			if (!isSourceSignedIn) return;
			try {
				isAuthenticatingRef.current = true;
				hasAuthenticatedRef.current = true;
				await switchOrganization({
					id: targetOrganizationId,
					name: "",
					orgHandle: ""
				});
			} catch (error) {
				console.error("Linked organization authentication failed:", error);
				hasAuthenticatedRef.current = false;
			} finally {
				isAuthenticatingRef.current = false;
			}
		};
		performOrganizationSwitch();
	}, [
		isInitialized,
		isSignedIn,
		isLoading,
		isSourceSignedIn,
		targetOrganizationId,
		switchOrganization
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
};
var OrganizationContextController_default = OrganizationContextController;

//#endregion
exports.default = OrganizationContextController_default;
//# sourceMappingURL=OrganizationContextController.cjs.map