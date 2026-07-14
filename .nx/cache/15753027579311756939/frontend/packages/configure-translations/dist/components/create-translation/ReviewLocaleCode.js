import { useEffect, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { getDisplayNameForCode, toFlagEmoji } from "@thunderid/i18n";
import { Box, Chip, FormControl, FormLabel, Stack, TextField, Typography, useTheme } from "@wso2/oxygen-ui";
import { Lightbulb } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";

//#region src/components/create-translation/ReviewLocaleCode.tsx
/**
* Step component in the language creation wizard that allows the user to review
* and optionally override the BCP 47 locale code derived from the country and
* language selections.
*
* Shows a preview of the flag emoji and resolved display name for the effective
* locale code, along with a helper tip about the BCP 47 format.
*
* @param props - The component props
* @param props.derivedLocale - Locale derived from the previous wizard steps, used as the default
* @param props.localeCode - Current user-entered override value (controlled)
* @param props.onLocaleCodeChange - Callback invoked when the locale code input changes
* @param props.onReadyChange - Callback invoked when step readiness changes
*
* @returns JSX element rendering the locale code review step
*
* @example
* ```tsx
* import ReviewLocaleCode from './ReviewLocaleCode';
*
* function Wizard() {
*   const [code, setCode] = useState('');
*   return (
*     <ReviewLocaleCode
*       derivedLocale={{code: 'fr-FR', displayName: 'French (France)', flag: '🇫🇷'}}
*       localeCode={code}
*       onLocaleCodeChange={setCode}
*       onReadyChange={(ready) => setStepReady(ready)}
*     />
*   );
* }
* ```
*
* @public
*/
function ReviewLocaleCode({ derivedLocale, localeCode, onLocaleCodeChange, onReadyChange = void 0 }) {
	const theme = useTheme();
	const { t } = useTranslation("translations");
	const effectiveCode = localeCode.trim() || derivedLocale.code;
	const isLocaleCodeValid = /^[A-Za-z]{2,3}(?:-[A-Za-z]{4})?(?:-(?:[A-Za-z]{2}|\d{3}))?$/.test(effectiveCode);
	const resolvedName = useMemo(() => getDisplayNameForCode(effectiveCode), [effectiveCode]);
	const previewFlag = toFlagEmoji(effectiveCode.split("-")[1]?.toUpperCase() ?? "");
	useEffect(() => {
		onReadyChange?.(isLocaleCodeValid);
	}, [isLocaleCodeValid, onReadyChange]);
	return /* @__PURE__ */ jsxs(Stack, {
		spacing: 4,
		children: [
			/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				gutterBottom: true,
				children: t("language.create.localeCode.title")
			}), /* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("language.create.localeCode.subtitle")
			})] }),
			/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsxs(FormControl, {
				required: true,
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: "locale-code-input",
					children: t("language.add.code.label")
				}), /* @__PURE__ */ jsx(TextField, {
					id: "locale-code-input",
					placeholder: derivedLocale.code,
					value: localeCode,
					onChange: (e) => onLocaleCodeChange(e.target.value),
					fullWidth: true
				})]
			}), effectiveCode && /* @__PURE__ */ jsxs(Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				sx: { mt: 1.5 },
				children: [
					/* @__PURE__ */ jsx(Typography, {
						sx: {
							fontSize: "1.1rem",
							lineHeight: 1
						},
						children: previewFlag
					}),
					resolvedName && /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: resolvedName
					}),
					/* @__PURE__ */ jsx(Chip, {
						label: effectiveCode,
						size: "small",
						variant: "outlined",
						sx: {
							fontFamily: "monospace",
							fontSize: "0.7rem"
						}
					})
				]
			})] }),
			/* @__PURE__ */ jsxs(Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				children: [/* @__PURE__ */ jsx(Lightbulb, {
					size: 20,
					color: theme.vars?.palette.warning.main
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					children: t("language.add.code.helperText")
				})]
			})
		]
	});
}

//#endregion
export { ReviewLocaleCode as default };