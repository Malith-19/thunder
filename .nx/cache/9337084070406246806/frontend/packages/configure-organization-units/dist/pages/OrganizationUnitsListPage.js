import OrganizationUnitsTreeView from "../components/OrganizationUnitsTreeView.js";
import { useTranslation } from "react-i18next";
import { PageContent, PageTitle } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/pages/OrganizationUnitsListPage.tsx
function OrganizationUnitsListPage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsxs(PageTitle, { children: [/* @__PURE__ */ jsx(PageTitle.Header, { children: t("organizationUnits:listing.title") }), /* @__PURE__ */ jsx(PageTitle.SubHeader, { children: t("organizationUnits:listing.subtitle") })] }), /* @__PURE__ */ jsx(OrganizationUnitsTreeView, {})] });
}

//#endregion
export { OrganizationUnitsListPage as default };