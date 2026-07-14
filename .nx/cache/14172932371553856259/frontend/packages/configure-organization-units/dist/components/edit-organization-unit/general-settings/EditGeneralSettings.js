import DangerZoneSection from "./DangerZoneSection.js";
import ParentSettingsSection from "./ParentSettingsSection.js";
import QuickCopySection from "./QuickCopySection.js";
import { Stack } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";

//#region src/components/edit-organization-unit/general-settings/EditGeneralSettings.tsx
/**
* Container component for general organization unit settings.
*
* Displays sections for:
* - Quick copy of organization unit identifiers (Handle, ID)
* - Parent Organization Unit information
* - Danger zone (delete organization unit)
*
* @param props - Component props
* @returns General settings sections wrapped in a Stack
*/
function EditGeneralSettings({ organizationUnit, onDeleteClick = void 0 }) {
	const [copiedField, setCopiedField] = useState(null);
	const copyTimeoutRef = useRef(null);
	useEffect(() => () => {
		if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
	}, []);
	return /* @__PURE__ */ jsxs(Stack, {
		spacing: 3,
		children: [
			/* @__PURE__ */ jsx(QuickCopySection, {
				organizationUnit,
				copiedField,
				onCopyToClipboard: useCallback(async (text, fieldName) => {
					await navigator.clipboard.writeText(text);
					setCopiedField(fieldName);
					if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
					copyTimeoutRef.current = setTimeout(() => {
						setCopiedField(null);
					}, 2e3);
				}, [])
			}),
			/* @__PURE__ */ jsx(ParentSettingsSection, { organizationUnit }),
			onDeleteClick && /* @__PURE__ */ jsx(DangerZoneSection, { onDeleteClick })
		]
	});
}

//#endregion
export { EditGeneralSettings as default };