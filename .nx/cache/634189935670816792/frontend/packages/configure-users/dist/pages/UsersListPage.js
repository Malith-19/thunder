import UsersList from "../components/UsersList.js";
import { useTranslation } from "react-i18next";
import { Button, InputAdornment, PageContent, PageTitle, Stack, TextField } from "@wso2/oxygen-ui";
import { Plus, Search } from "@wso2/oxygen-ui-icons-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";
import { useNavigate } from "react-router";

//#region src/pages/UsersListPage.tsx
function UsersListPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("UsersListPage");
	return /* @__PURE__ */ jsxs(PageContent, { children: [
		/* @__PURE__ */ jsxs(PageTitle, { children: [
			/* @__PURE__ */ jsx(PageTitle.Header, { children: t("users:title") }),
			/* @__PURE__ */ jsx(PageTitle.SubHeader, { children: t("users:subtitle") }),
			/* @__PURE__ */ jsx(PageTitle.Actions, { children: /* @__PURE__ */ jsx(Button, {
				variant: "contained",
				startIcon: /* @__PURE__ */ jsx(Plus, { size: 20 }),
				onClick: () => {
					(async () => {
						await navigate("/users/invite");
					})().catch((error) => {
						logger.error("Failed to navigate to add user page", { error });
					});
				},
				children: t("users:addUser")
			}) })
		] }),
		/* @__PURE__ */ jsx(Stack, {
			direction: "row",
			spacing: 2,
			mb: 4,
			flexWrap: "wrap",
			useFlexGap: true,
			children: /* @__PURE__ */ jsx(TextField, {
				placeholder: t("users:searchUsers"),
				size: "small",
				sx: {
					flexGrow: 1,
					minWidth: 300
				},
				InputProps: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, {
					position: "start",
					children: /* @__PURE__ */ jsx(Search, { size: 16 })
				}) }
			})
		}),
		/* @__PURE__ */ jsx(UsersList, {})
	] });
}

//#endregion
export { UsersListPage as default };