import useTranslation_default from "../../../hooks/useTranslation.js";
import BaseLanguageSwitcher_default from "./BaseLanguageSwitcher.js";
import useFlowMeta_default from "../../../contexts/FlowMeta/useFlowMeta.js";
import { resolveLocaleDisplayName, resolveLocaleEmoji } from "@thunderid/browser";
import { useEffect, useMemo } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/LanguageSwitcher/LanguageSwitcher.tsx
/**
* A v2 LanguageSwitcher component that reads available languages from `FlowMetaContext`
* and switches both the UI language (via `I18nContext`) and the flow metadata translations
* (by re-fetching `GET /flow/meta` with the new language).
*
* Must be rendered inside a `FlowMetaProvider`.
*
* @example
* ```tsx
* // Default dropdown UI
* <LanguageSwitcher />
*
* // Custom UI with render props
* <LanguageSwitcher>
*   {({languages, currentLanguage, onLanguageChange}) => (
*     <div>
*       {languages.map(lang => (
*         <button
*           key={lang.code}
*           onClick={() => onLanguageChange(lang.code)}
*           style={{fontWeight: lang.code === currentLanguage ? 'bold' : 'normal'}}
*         >
*           {lang.emoji} {lang.displayName}
*         </button>
*       ))}
*     </div>
*   )}
* </LanguageSwitcher>
* ```
*/
const LanguageSwitcher = ({ children, className }) => {
	const { meta, switchLanguage, isLoading } = useFlowMeta_default();
	const { currentLanguage } = useTranslation_default();
	const availableLanguageCodes = meta?.i18n?.languages ?? [];
	const effectiveLanguageCodes = useMemo(() => availableLanguageCodes.length > 0 ? availableLanguageCodes : [currentLanguage], [availableLanguageCodes, currentLanguage]);
	const languages = useMemo(() => effectiveLanguageCodes.map((code) => ({
		code,
		displayName: resolveLocaleDisplayName(code, code) || code,
		emoji: resolveLocaleEmoji(code)
	})), [effectiveLanguageCodes]);
	useEffect(() => {
		if (availableLanguageCodes.length > 0 && !availableLanguageCodes.includes(currentLanguage)) switchLanguage(availableLanguageCodes[0]);
	}, [
		availableLanguageCodes,
		currentLanguage,
		switchLanguage
	]);
	const handleLanguageChange = (language) => {
		if (language !== currentLanguage) switchLanguage(language);
	};
	return /* @__PURE__ */ jsx(BaseLanguageSwitcher_default, {
		currentLanguage,
		isLoading,
		languages,
		onLanguageChange: handleLanguageChange,
		className,
		children
	});
};
var LanguageSwitcher_default = LanguageSwitcher;

//#endregion
export { LanguageSwitcher_default as default };
//# sourceMappingURL=LanguageSwitcher.js.map