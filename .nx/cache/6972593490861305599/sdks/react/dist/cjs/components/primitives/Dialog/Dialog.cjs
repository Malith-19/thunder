const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Button = require('../Button/Button.cjs');
const require_Dialog_styles = require('./Dialog.styles.cjs');
const require_X = require('../Icons/X.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);
let __floating_ui_react = require("@floating-ui/react");
__floating_ui_react = require_rolldown_runtime.__toESM(__floating_ui_react);

//#region src/components/primitives/Dialog/Dialog.tsx
function useDialog({ initialOpen = false, open: controlledOpen, onOpenChange: setControlledOpen } = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = (0, react.useState)(initialOpen);
	const [labelId, setLabelId] = (0, react.useState)();
	const [descriptionId, setDescriptionId] = (0, react.useState)();
	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = setControlledOpen ?? setUncontrolledOpen;
	const data = (0, __floating_ui_react.useFloating)({
		onOpenChange: setOpen,
		open
	});
	const { context } = data;
	const interactions = (0, __floating_ui_react.useInteractions)([
		(0, __floating_ui_react.useClick)(context, { enabled: controlledOpen == null }),
		(0, __floating_ui_react.useDismiss)(context, { outsidePressEvent: "mousedown" }),
		(0, __floating_ui_react.useRole)(context)
	]);
	return (0, react.useMemo)(() => ({
		open,
		setOpen,
		...interactions,
		...data,
		descriptionId,
		labelId,
		setDescriptionId,
		setLabelId
	}), [
		open,
		setOpen,
		interactions,
		data,
		labelId,
		descriptionId
	]);
}
const DialogContext = (0, react.createContext)(null);
const useDialogContext = () => {
	const context = (0, react.useContext)(DialogContext);
	if (context == null) throw new Error("Dialog components must be wrapped in <Dialog />");
	return context;
};
function Dialog({ children,...options }) {
	const dialog = useDialog(options);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DialogContext.Provider, {
		value: dialog,
		children
	});
}
const DialogTrigger = (0, react.forwardRef)(({ children, asChild = false,...props }, propRef) => {
	const context = useDialogContext();
	const childrenRef = children.ref;
	const ref = (0, __floating_ui_react.useMergeRefs)([
		context.refs.setReference,
		propRef,
		childrenRef
	]);
	if (asChild && (0, react.isValidElement)(children)) return (0, react.cloneElement)(children, context.getReferenceProps({
		ref,
		...props,
		...children.props,
		"data-state": context.open ? "open" : "closed"
	}));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
		ref,
		"data-state": context.open ? "open" : "closed",
		...context.getReferenceProps(props),
		children
	});
});
const DialogContent = (0, react.forwardRef)((props, propRef) => {
	const { context: floatingContext,...context } = useDialogContext();
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Dialog_styles.default(theme, colorScheme);
	const ref = (0, __floating_ui_react.useMergeRefs)([context.refs.setFloating, propRef]);
	if (!floatingContext.open) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingPortal, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingOverlay, {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("dialog", "overlay")), styles["overlay"]),
		lockScroll: true,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingFocusManager, {
			context: floatingContext,
			initialFocus: -1,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref,
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("dialog", "content")), styles["content"], props.className),
				"aria-labelledby": context.labelId,
				"aria-describedby": context.descriptionId,
				...context.getFloatingProps(props),
				children: props.children
			})
		})
	}) });
});
const DialogHeading = (0, react.forwardRef)(({ children,...props }, ref) => {
	const context = useDialogContext();
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Dialog_styles.default(theme, colorScheme);
	const id = (0, __floating_ui_react.useId)();
	(0, react.useLayoutEffect)(() => {
		context.setLabelId(id);
		return () => {
			context.setLabelId(void 0);
		};
	}, [id, context.setLabelId]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("dialog", "header")), styles["header"]),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
			...props,
			ref,
			id,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("dialog", "title")), styles["headerTitle"]),
			children
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
			color: "tertiary",
			variant: "icon",
			size: "small",
			shape: "round",
			onClick: () => {
				context.setOpen(false);
			},
			"aria-label": "Close",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_X.default, {
				width: 16,
				height: 16
			})
		})]
	});
});
const DialogDescription = (0, react.forwardRef)(({ children,...props }, ref) => {
	const context = useDialogContext();
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Dialog_styles.default(theme, colorScheme);
	const id = (0, __floating_ui_react.useId)();
	(0, react.useLayoutEffect)(() => {
		context.setDescriptionId(id);
		return () => {
			context.setDescriptionId(void 0);
		};
	}, [id, context.setDescriptionId]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
		...props,
		ref,
		id,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("dialog", "description")), styles["description"], props.className),
		children
	});
});
const DialogClose = (0, react.forwardRef)(({ children, asChild = false,...props }, propRef) => {
	const context = useDialogContext();
	const childrenRef = children?.ref;
	const ref = (0, __floating_ui_react.useMergeRefs)([propRef, childrenRef]);
	const handleClick = (event) => {
		context.setOpen(false);
		props.onClick?.(event);
	};
	if (asChild && (0, react.isValidElement)(children)) return (0, react.cloneElement)(children, {
		ref,
		...props,
		...children.props,
		onClick: handleClick
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
		...props,
		ref,
		onClick: handleClick,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("dialog", "close")), props.className),
		variant: "text",
		children
	});
});
DialogTrigger.displayName = "DialogTrigger";
DialogContent.displayName = "DialogContent";
DialogHeading.displayName = "DialogHeading";
DialogDescription.displayName = "DialogDescription";
DialogClose.displayName = "DialogClose";
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Heading = DialogHeading;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;
var Dialog_default = Dialog;

//#endregion
exports.default = Dialog_default;
//# sourceMappingURL=Dialog.cjs.map