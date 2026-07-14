import ResourceServersList from "../components/ResourceServersList.js";
import { Button, PageContent, PageTitle, Stack } from "@wso2/oxygen-ui";
import { Plus } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { useNavigate } from "react-router";

//#region src/pages/ResourceServersListPage.tsx
function ResourceServersListPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("ResourceServersListPage");
	return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsxs(PageTitle, { children: [
		/* @__PURE__ */ jsx(PageTitle.Header, { children: t("resourceServers:listing.title", "Resource Servers") }),
		/* @__PURE__ */ jsx(PageTitle.SubHeader, { children: t("resourceServers:listing.subtitle", "Define resource servers and their resources to manage access control.") }),
		/* @__PURE__ */ jsx(PageTitle.Actions, { children: /* @__PURE__ */ jsx(Stack, {
			direction: "row",
			spacing: 2,
			children: /* @__PURE__ */ jsx(Button, {
				variant: "contained",
				startIcon: /* @__PURE__ */ jsx(Plus, { size: 18 }),
				onClick: () => {
					(async () => {
						await navigate("/resource-servers/create");
					})().catch((err) => {
						logger.error("Failed to navigate to create resource server page", { error: err });
					});
				},
				children: t("resourceServers:listing.addResourceServer", "Add resource server")
			})
		}) })
	] }), /* @__PURE__ */ jsx(ResourceServersList, {})] });
}

//#endregion
export { ResourceServersListPage as default };