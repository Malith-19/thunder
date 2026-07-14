import { jsx, jsxs } from "react/jsx-runtime";
import { Box, Card, CardActionArea, CircularProgress, LinearProgress, Stack, Typography } from "@wso2/oxygen-ui";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation("translations");
	return /* @__PURE__ */ jsxs(Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.initialize.title")
			}), /* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.initialize.subtitle")
			})] }),
			/* @__PURE__ */ jsxs(Stack, {
				spacing: 2,
				children: [/* @__PURE__ */ jsx(Card, {
					variant: "outlined",
					onClick: () => !isCreating && onPopulateChange(true),
					sx: {
						borderColor: populateFromEnglish ? "primary.main" : "divider",
						borderWidth: populateFromEnglish ? 2 : 1,
						cursor: isCreating ? "default" : "pointer",
						opacity: isCreating ? .6 : 1
					},
					children: /* @__PURE__ */ jsx(CardActionArea, {
						disabled: isCreating,
						sx: { p: 2.5 },
						children: /* @__PURE__ */ jsxs(Stack, {
							spacing: .5,
							children: [/* @__PURE__ */ jsx(Typography, {
								variant: "body1",
								fontWeight: 600,
								children: t("language.create.initialize.copyFromEnglish.label")
							}), /* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								children: t("language.create.initialize.copyFromEnglish.description")
							})]
						})
					})
				}), /* @__PURE__ */ jsx(Card, {
					variant: "outlined",
					onClick: () => !isCreating && onPopulateChange(false),
					sx: {
						borderColor: !populateFromEnglish ? "primary.main" : "divider",
						borderWidth: !populateFromEnglish ? 2 : 1,
						cursor: isCreating ? "default" : "pointer",
						opacity: isCreating ? .6 : 1
					},
					children: /* @__PURE__ */ jsx(CardActionArea, {
						disabled: isCreating,
						sx: { p: 2.5 },
						children: /* @__PURE__ */ jsxs(Stack, {
							spacing: .5,
							children: [/* @__PURE__ */ jsx(Typography, {
								variant: "body1",
								fontWeight: 600,
								children: t("language.create.initialize.startEmpty.label")
							}), /* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								children: t("language.create.initialize.startEmpty.description")
							})]
						})
					})
				})]
			}),
			isCreating && /* @__PURE__ */ jsxs(Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 1
				},
				children: [/* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						gap: 1
					},
					children: [/* @__PURE__ */ jsx(CircularProgress, { size: 16 }), /* @__PURE__ */ jsxs(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: [
							t("language.add.adding"),
							" (",
							progress,
							"%)"
						]
					})]
				}), /* @__PURE__ */ jsx(LinearProgress, {
					variant: "determinate",
					value: progress
				})]
			})
		]
	});
}

//#endregion
export { InitializeLanguage as default };