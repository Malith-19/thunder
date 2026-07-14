import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import { useEffect, useRef } from "react";
import { Fragment, jsx } from "react/jsx-runtime";

//#region src/components/control/OrganizationContext/OrganizationContextController.tsx
const OrganizationContextController = ({ targetOrganizationId, isSourceSignedIn, children }) => {
	const { isInitialized, isSignedIn, switchOrganization, isLoading } = useThunderID_default();
	const hasAuthenticatedRef = useRef(false);
	const isAuthenticatingRef = useRef(false);
	/**
	* Handle the organization switch when:
	* - Current instance is initialized and NOT signed in
	* - Source provider IS signed in
	* Uses the `switchOrganization` function from the ThunderID context.
	*/
	useEffect(() => {
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
	return /* @__PURE__ */ jsx(Fragment, { children });
};
var OrganizationContextController_default = OrganizationContextController;

//#endregion
export { OrganizationContextController_default as default };
//# sourceMappingURL=OrganizationContextController.js.map