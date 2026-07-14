const require_rolldown_runtime = require('../../../../../../_virtual/rolldown_runtime.cjs');
const require_useFlow = require('../../../../../../contexts/Flow/useFlow.cjs');
const require_useTheme = require('../../../../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../../../../hooks/useTranslation.cjs');
const require_Button = require('../../../../../primitives/Button/Button.cjs');
const require_FieldFactory = require('../../../../../factories/FieldFactory.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignIn/v1/options/IdentifierFirst.tsx
/**
* Identifier First Sign-In Option Component.
* Handles identifier-first authentication flow (username first, then password).
*/
const IdentifierFirst = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = require_useTheme.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const { setTitle, setSubtitle } = require_useFlow.default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	(0, react.useEffect)(() => {
		setTitle(t("identifier.first.heading"));
		setSubtitle(t("identifier.first.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [formFields.map((param) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: require_FieldFactory.createField({
		className: inputClassName,
		disabled: isLoading,
		label: param.displayName,
		name: param.param,
		onChange: (value) => onInputChange(param.param, value),
		placeholder: t(`elements.fields.generic.placeholder`, { field: (param.displayName || param.param).toLowerCase() }),
		required: authenticator.requiredParams.includes(param.param),
		touched: touchedFields[param.param] || false,
		type: param.type === __thunderid_browser.EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? __thunderid_browser.FieldType.Password : __thunderid_browser.FieldType.Text,
		value: formValues[param.param] || ""
	}) }, param.param)), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("identifier.first.buttons.submit.text")
	})] });
};
var IdentifierFirst_default = IdentifierFirst;

//#endregion
exports.default = IdentifierFirst_default;
//# sourceMappingURL=IdentifierFirst.cjs.map