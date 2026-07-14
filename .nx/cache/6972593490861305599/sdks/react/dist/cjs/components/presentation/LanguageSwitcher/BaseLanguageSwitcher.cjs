const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Check = require('../../primitives/Icons/Check.cjs');
const require_ChevronDown = require('../../primitives/Icons/ChevronDown.cjs');
const require_BaseLanguageSwitcher_styles = require('./BaseLanguageSwitcher.styles.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);
let __floating_ui_react = require("@floating-ui/react");
__floating_ui_react = require_rolldown_runtime.__toESM(__floating_ui_react);

//#region src/components/presentation/LanguageSwitcher/BaseLanguageSwitcher.tsx
/**
* Pure-UI language switcher dropdown.
* Accepts resolved `LanguageOption[]` (code + displayName + emoji) and delegates
* language switching to the `onLanguageChange` callback.
*
* Supports render props for full UI customisation.
*/
const BaseLanguageSwitcher = ({ children, className, currentLanguage, isLoading = false, languages, onLanguageChange }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseLanguageSwitcher_styles.default(theme, colorScheme);
	const [isOpen, setIsOpen] = (0, react.useState)(false);
	const hasMultipleLanguages = languages.length > 1;
	(0, react.useEffect)(() => {
		if (!hasMultipleLanguages && isOpen) setIsOpen(false);
	}, [hasMultipleLanguages, isOpen]);
	const { refs, floatingStyles, context } = (0, __floating_ui_react.useFloating)({
		middleware: [
			(0, __floating_ui_react.offset)(4),
			(0, __floating_ui_react.flip)(),
			(0, __floating_ui_react.shift)()
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		whileElementsMounted: __floating_ui_react.autoUpdate
	});
	const { getReferenceProps, getFloatingProps } = (0, __floating_ui_react.useInteractions)([
		(0, __floating_ui_react.useClick)(context, { enabled: hasMultipleLanguages }),
		(0, __floating_ui_react.useDismiss)(context, { enabled: hasMultipleLanguages }),
		(0, __floating_ui_react.useRole)(context, {
			enabled: hasMultipleLanguages,
			role: "listbox"
		})
	]);
	const currentOption = languages.find((l) => l.code === currentLanguage);
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children({
		currentLanguage,
		isLoading,
		languages,
		onLanguageChange
	}) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)(styles["root"], className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			ref: refs.setReference,
			type: "button",
			disabled: isLoading,
			"aria-label": "Switch language",
			...getReferenceProps(),
			className: styles["trigger"],
			children: [
				currentOption && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: styles["triggerEmoji"],
					children: currentOption.emoji
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: styles["triggerLabel"],
					children: currentOption?.displayName ?? currentLanguage
				}),
				hasMultipleLanguages && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ChevronDown.default, {})
			]
		}), isOpen && hasMultipleLanguages && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingPortal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingFocusManager, {
			context,
			modal: false,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: refs.setFloating,
				style: floatingStyles,
				...getFloatingProps(),
				className: styles["content"],
				role: "listbox",
				"aria-label": "Select language",
				children: languages.map((lang) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "option",
					"aria-selected": lang.code === currentLanguage,
					className: (0, __emotion_css.cx)(styles["option"], lang.code === currentLanguage && styles["optionActive"]),
					onClick: () => {
						onLanguageChange(lang.code);
						setIsOpen(false);
					},
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: styles["optionEmoji"],
							children: lang.emoji
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: styles["optionLabel"],
							children: lang.displayName
						}),
						lang.code === currentLanguage && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: styles["checkIcon"],
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Check.default, {})
						})
					]
				}, lang.code))
			})
		}) })]
	});
};
var BaseLanguageSwitcher_default = BaseLanguageSwitcher;

//#endregion
exports.default = BaseLanguageSwitcher_default;
//# sourceMappingURL=BaseLanguageSwitcher.cjs.map