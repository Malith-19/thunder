const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/components/create-translation/InitializeLanguage.tsx
/**
* Step component for the language creation wizard that lets the user choose how
* to initialize the new language's translation keys.
*
* Presents two card options — copying from English (en-US) or starting with
* empty values — and shows a progress bar while keys are being written to the
* server.
*
* @param props - The component props
* @param props.populateFromEnglish - Whether the user has chosen to copy from English
* @param props.onPopulateChange - Callback invoked when the initialization strategy changes
* @param props.isCreating - Whether language creation is currently in progress
* @param props.progress - Creation progress percentage (0–100)
*
* @returns JSX element rendering the initialization strategy selector
*
* @example
* ```tsx
* import InitializeLanguage from './InitializeLanguage';
*
* function Wizard() {
*   const [populate, setPopulate] = useState(true);
*   return (
*     <InitializeLanguage
*       populateFromEnglish={populate}
*       onPopulateChange={setPopulate}
*       isCreating={false}
*       progress={0}
*     />
*   );
* }
* ```
*
* @public
*/
function InitializeLanguage({ populateFromEnglish, onPopulateChange, isCreating, progress }) {
	const { t } = (0, react_i18next.useTranslation)("translations");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.initialize.title")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.initialize.subtitle")
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				spacing: 2,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Card, {
					variant: "outlined",
					onClick: () => !isCreating && onPopulateChange(true),
					sx: {
						borderColor: populateFromEnglish ? "primary.main" : "divider",
						borderWidth: populateFromEnglish ? 2 : 1,
						cursor: isCreating ? "default" : "pointer",
						opacity: isCreating ? .6 : 1
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CardActionArea, {
						disabled: isCreating,
						sx: { p: 2.5 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
							spacing: .5,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "body1",
								fontWeight: 600,
								children: t("language.create.initialize.copyFromEnglish.label")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "body2",
								color: "text.secondary",
								children: t("language.create.initialize.copyFromEnglish.description")
							})]
						})
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Card, {
					variant: "outlined",
					onClick: () => !isCreating && onPopulateChange(false),
					sx: {
						borderColor: !populateFromEnglish ? "primary.main" : "divider",
						borderWidth: !populateFromEnglish ? 2 : 1,
						cursor: isCreating ? "default" : "pointer",
						opacity: isCreating ? .6 : 1
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CardActionArea, {
						disabled: isCreating,
						sx: { p: 2.5 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
							spacing: .5,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "body1",
								fontWeight: 600,
								children: t("language.create.initialize.startEmpty.label")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "body2",
								color: "text.secondary",
								children: t("language.create.initialize.startEmpty.description")
							})]
						})
					})
				})]
			}),
			isCreating && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 1
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						gap: 1
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						children: [
							t("language.add.adding"),
							" (",
							progress,
							"%)"
						]
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.LinearProgress, {
					variant: "determinate",
					value: progress
				})]
			})
		]
	});
}

//#endregion
exports.default = InitializeLanguage;