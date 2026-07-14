import { FormControl, IconButton, InputAdornment, TextField, Tooltip } from "@wso2/oxygen-ui";
import { Check, Copy } from "@wso2/oxygen-ui-icons-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";

//#region src/components/permission-catalog/SelectedScopesField.tsx
function SelectedScopesField({ selected }) {
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);
	const timerRef = useRef(void 0);
	useEffect(() => () => clearTimeout(timerRef.current), []);
	const scopes = selected.flatMap((entry) => entry.permissions).join(" ");
	const handleCopy = () => {
		navigator.clipboard.writeText(scopes).then(() => {
			setCopied(true);
			clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => setCopied(false), 1500);
		}).catch(() => {});
	};
	return /* @__PURE__ */ jsx(FormControl, {
		fullWidth: true,
		children: /* @__PURE__ */ jsx(TextField, {
			id: "permission-catalog-scopes",
			size: "small",
			value: scopes,
			placeholder: t("resourceServers:permissionCatalog.scopes.placeholder", "No permissions selected"),
			InputProps: {
				readOnly: true,
				sx: { fontFamily: "monospace" },
				endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
					position: "end",
					children: /* @__PURE__ */ jsx(Tooltip, {
						title: copied ? t("resourceServers:permissionCatalog.scopes.copied", "Copied") : "",
						open: copied,
						children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(IconButton, {
							size: "small",
							disabled: scopes === "",
							onClick: handleCopy,
							"aria-label": t("resourceServers:permissionCatalog.scopes.copy", "Copy scopes"),
							children: copied ? /* @__PURE__ */ jsx(Check, { size: 16 }) : /* @__PURE__ */ jsx(Copy, { size: 16 })
						}) })
					})
				})
			}
		})
	});
}

//#endregion
export { SelectedScopesField as default };