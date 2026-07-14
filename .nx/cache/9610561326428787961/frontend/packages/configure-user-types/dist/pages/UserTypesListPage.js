import UserTypesList from "../components/UserTypesList.js";
import { useTranslation } from "react-i18next";
import { useLogger } from "@thunderid/logger/react";
import { Button, PageContent, PageTitle } from "@wso2/oxygen-ui";
import { Plus } from "@wso2/oxygen-ui-icons-react";
import { useNavigate } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/pages/UserTypesListPage.tsx
function UserTypesListPage() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("UserTypesListPage");
	return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsxs(PageTitle, { children: [
		/* @__PURE__ */ jsx(PageTitle.Header, { children: t("userTypes:title") }),
		/* @__PURE__ */ jsx(PageTitle.SubHeader, { children: t("userTypes:subtitle") }),
		/* @__PURE__ */ jsx(PageTitle.Actions, { children: /* @__PURE__ */ jsx(Button, {
			variant: "contained",
			startIcon: /* @__PURE__ */ jsx(Plus, { size: 18 }),
			onClick: () => {
				const handler = async () => {
					await navigate("/user-types/create");
				};
				handler().catch((error) => {
					logger.error("Failed to navigate to create user type page", { error });
				});
			},
			children: t("userTypes:createUserType")
		}) })
	] }), /* @__PURE__ */ jsx(UserTypesList, {})] });
}

//#endregion
export { UserTypesListPage as default };