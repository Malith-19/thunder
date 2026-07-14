import useUpdateResourceServer from "../../api/useUpdateResourceServer.js";
import { useToast } from "@thunderid/contexts";
import { Box, Button, Stack, TextField } from "@wso2/oxygen-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { SettingsCard } from "@thunderid/components";

//#region src/components/resource-server-detail/AdvancedTab.tsx
function AdvancedTab({ resourceServer, onRefresh }) {
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("AdvancedTab");
	const updateRs = useUpdateResourceServer();
	const [identifier, setIdentifier] = useState(resourceServer.identifier ?? "");
	const [identifierDirty, setIdentifierDirty] = useState(false);
	const handleIdentifierSave = () => {
		updateRs.mutate({
			id: resourceServer.id,
			data: { identifier: identifier || null }
		}, {
			onSuccess: () => {
				showToast(t("resourceServers:edit.advanced.identifier.saved", "Identifier saved."), "success");
				setIdentifierDirty(false);
				onRefresh();
			},
			onError: (err) => {
				logger.error("Failed to save identifier", { error: err });
				showToast(t("resourceServers:edit.advanced.identifier.saveError", "Failed to save identifier."), "error");
			}
		});
	};
	const handleIdentifierDiscard = () => {
		setIdentifier(resourceServer.identifier ?? "");
		setIdentifierDirty(false);
	};
	return /* @__PURE__ */ jsx(Stack, {
		spacing: 3,
		children: /* @__PURE__ */ jsx(SettingsCard, {
			title: t("resourceServers:edit.advanced.identifier.title", "Configurations"),
			description: t("resourceServers:edit.advanced.identifier.description", "Configuration settings for this resource server."),
			children: /* @__PURE__ */ jsxs(Stack, {
				spacing: 2,
				children: [/* @__PURE__ */ jsx(TextField, {
					label: t("resourceServers:edit.advanced.identifier.label", "Identifier (Audience)"),
					value: identifier,
					onChange: (e) => {
						setIdentifier(e.target.value);
						setIdentifierDirty(true);
					},
					fullWidth: true,
					size: "small",
					helperText: t("resourceServers:edit.advanced.identifier.hint", "A unique value that identifies this resource server. When set as an URI,enables RFC 8707 resource indicator support in OAuth2 authorization requests."),
					disabled: resourceServer.isReadOnly
				}), !resourceServer.isReadOnly && identifierDirty && /* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						gap: 1
					},
					children: [/* @__PURE__ */ jsx(Button, {
						variant: "outlined",
						size: "small",
						onClick: handleIdentifierDiscard,
						disabled: updateRs.isPending,
						children: t("common:discard", "Discard")
					}), /* @__PURE__ */ jsx(Button, {
						variant: "contained",
						size: "small",
						onClick: handleIdentifierSave,
						disabled: updateRs.isPending,
						children: updateRs.isPending ? t("common:saving", "Saving…") : t("common:save", "Save")
					})]
				})]
			})
		})
	});
}

//#endregion
export { AdvancedTab as default };