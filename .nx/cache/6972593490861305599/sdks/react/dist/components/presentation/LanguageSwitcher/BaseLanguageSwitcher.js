import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Check_default from "../../primitives/Icons/Check.js";
import ChevronDown_default from "../../primitives/Icons/ChevronDown.js";
import BaseLanguageSwitcher_styles_default from "./BaseLanguageSwitcher.styles.js";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";
import { FloatingFocusManager, FloatingPortal, autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";

//#region src/components/presentation/LanguageSwitcher/BaseLanguageSwitcher.tsx
/**
* Pure-UI language switcher dropdown.
* Accepts resolved `LanguageOption[]` (code + displayName + emoji) and delegates
* language switching to the `onLanguageChange` callback.
*
* Supports render props for full UI customisation.
*/
const BaseLanguageSwitcher = ({ children, className, currentLanguage, isLoading = false, languages, onLanguageChange }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseLanguageSwitcher_styles_default(theme, colorScheme);
	const [isOpen, setIsOpen] = useState(false);
	const hasMultipleLanguages = languages.length > 1;
	useEffect(() => {
		if (!hasMultipleLanguages && isOpen) setIsOpen(false);
	}, [hasMultipleLanguages, isOpen]);
	const { refs, floatingStyles, context } = useFloating({
		middleware: [
			offset(4),
			flip(),
			shift()
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		whileElementsMounted: autoUpdate
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context, { enabled: hasMultipleLanguages }),
		useDismiss(context, { enabled: hasMultipleLanguages }),
		useRole(context, {
			enabled: hasMultipleLanguages,
			role: "listbox"
		})
	]);
	const currentOption = languages.find((l) => l.code === currentLanguage);
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		currentLanguage,
		isLoading,
		languages,
		onLanguageChange
	}) });
	return /* @__PURE__ */ jsxs("div", {
		className: cx(styles["root"], className),
		children: [/* @__PURE__ */ jsxs("button", {
			ref: refs.setReference,
			type: "button",
			disabled: isLoading,
			"aria-label": "Switch language",
			...getReferenceProps(),
			className: styles["trigger"],
			children: [
				currentOption && /* @__PURE__ */ jsx("span", {
					className: styles["triggerEmoji"],
					children: currentOption.emoji
				}),
				/* @__PURE__ */ jsx("span", {
					className: styles["triggerLabel"],
					children: currentOption?.displayName ?? currentLanguage
				}),
				hasMultipleLanguages && /* @__PURE__ */ jsx(ChevronDown_default, {})
			]
		}), isOpen && hasMultipleLanguages && /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx(FloatingFocusManager, {
			context,
			modal: false,
			children: /* @__PURE__ */ jsx("div", {
				ref: refs.setFloating,
				style: floatingStyles,
				...getFloatingProps(),
				className: styles["content"],
				role: "listbox",
				"aria-label": "Select language",
				children: languages.map((lang) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					role: "option",
					"aria-selected": lang.code === currentLanguage,
					className: cx(styles["option"], lang.code === currentLanguage && styles["optionActive"]),
					onClick: () => {
						onLanguageChange(lang.code);
						setIsOpen(false);
					},
					children: [
						/* @__PURE__ */ jsx("span", {
							className: styles["optionEmoji"],
							children: lang.emoji
						}),
						/* @__PURE__ */ jsx("span", {
							className: styles["optionLabel"],
							children: lang.displayName
						}),
						lang.code === currentLanguage && /* @__PURE__ */ jsx("span", {
							className: styles["checkIcon"],
							children: /* @__PURE__ */ jsx(Check_default, {})
						})
					]
				}, lang.code))
			})
		}) })]
	});
};
var BaseLanguageSwitcher_default = BaseLanguageSwitcher;

//#endregion
export { BaseLanguageSwitcher_default as default };
//# sourceMappingURL=BaseLanguageSwitcher.js.map