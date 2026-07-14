import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Button_default from "../Button/Button.js";
import Dialog_styles_default from "./Dialog.styles.js";
import X_default from "../Icons/X.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { cloneElement, createContext, forwardRef, isValidElement, useContext, useLayoutEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useId, useInteractions, useMergeRefs, useRole } from "@floating-ui/react";

//#region src/components/primitives/Dialog/Dialog.tsx
function useDialog({ initialOpen = false, open: controlledOpen, onOpenChange: setControlledOpen } = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
	const [labelId, setLabelId] = useState();
	const [descriptionId, setDescriptionId] = useState();
	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = setControlledOpen ?? setUncontrolledOpen;
	const data = useFloating({
		onOpenChange: setOpen,
		open
	});
	const { context } = data;
	const interactions = useInteractions([
		useClick(context, { enabled: controlledOpen == null }),
		useDismiss(context, { outsidePressEvent: "mousedown" }),
		useRole(context)
	]);
	return useMemo(() => ({
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
const DialogContext = createContext(null);
const useDialogContext = () => {
	const context = useContext(DialogContext);
	if (context == null) throw new Error("Dialog components must be wrapped in <Dialog />");
	return context;
};
function Dialog({ children,...options }) {
	const dialog = useDialog(options);
	return /* @__PURE__ */ jsx(DialogContext.Provider, {
		value: dialog,
		children
	});
}
const DialogTrigger = forwardRef(({ children, asChild = false,...props }, propRef) => {
	const context = useDialogContext();
	const childrenRef = children.ref;
	const ref = useMergeRefs([
		context.refs.setReference,
		propRef,
		childrenRef
	]);
	if (asChild && isValidElement(children)) return cloneElement(children, context.getReferenceProps({
		ref,
		...props,
		...children.props,
		"data-state": context.open ? "open" : "closed"
	}));
	return /* @__PURE__ */ jsx("button", {
		ref,
		"data-state": context.open ? "open" : "closed",
		...context.getReferenceProps(props),
		children
	});
});
const DialogContent = forwardRef((props, propRef) => {
	const { context: floatingContext,...context } = useDialogContext();
	const { theme, colorScheme } = useTheme_default();
	const styles = Dialog_styles_default(theme, colorScheme);
	const ref = useMergeRefs([context.refs.setFloating, propRef]);
	if (!floatingContext.open) return null;
	return /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx(FloatingOverlay, {
		className: cx(withVendorCSSClassPrefix(bem("dialog", "overlay")), styles["overlay"]),
		lockScroll: true,
		children: /* @__PURE__ */ jsx(FloatingFocusManager, {
			context: floatingContext,
			initialFocus: -1,
			children: /* @__PURE__ */ jsx("div", {
				ref,
				className: cx(withVendorCSSClassPrefix(bem("dialog", "content")), styles["content"], props.className),
				"aria-labelledby": context.labelId,
				"aria-describedby": context.descriptionId,
				...context.getFloatingProps(props),
				children: props.children
			})
		})
	}) });
});
const DialogHeading = forwardRef(({ children,...props }, ref) => {
	const context = useDialogContext();
	const { theme, colorScheme } = useTheme_default();
	const styles = Dialog_styles_default(theme, colorScheme);
	const id = useId();
	useLayoutEffect(() => {
		context.setLabelId(id);
		return () => {
			context.setLabelId(void 0);
		};
	}, [id, context.setLabelId]);
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("dialog", "header")), styles["header"]),
		children: [/* @__PURE__ */ jsx("h2", {
			...props,
			ref,
			id,
			className: cx(withVendorCSSClassPrefix(bem("dialog", "title")), styles["headerTitle"]),
			children
		}), /* @__PURE__ */ jsx(Button_default, {
			color: "tertiary",
			variant: "icon",
			size: "small",
			shape: "round",
			onClick: () => {
				context.setOpen(false);
			},
			"aria-label": "Close",
			children: /* @__PURE__ */ jsx(X_default, {
				width: 16,
				height: 16
			})
		})]
	});
});
const DialogDescription = forwardRef(({ children,...props }, ref) => {
	const context = useDialogContext();
	const { theme, colorScheme } = useTheme_default();
	const styles = Dialog_styles_default(theme, colorScheme);
	const id = useId();
	useLayoutEffect(() => {
		context.setDescriptionId(id);
		return () => {
			context.setDescriptionId(void 0);
		};
	}, [id, context.setDescriptionId]);
	return /* @__PURE__ */ jsx("p", {
		...props,
		ref,
		id,
		className: cx(withVendorCSSClassPrefix(bem("dialog", "description")), styles["description"], props.className),
		children
	});
});
const DialogClose = forwardRef(({ children, asChild = false,...props }, propRef) => {
	const context = useDialogContext();
	const childrenRef = children?.ref;
	const ref = useMergeRefs([propRef, childrenRef]);
	const handleClick = (event) => {
		context.setOpen(false);
		props.onClick?.(event);
	};
	if (asChild && isValidElement(children)) return cloneElement(children, {
		ref,
		...props,
		...children.props,
		onClick: handleClick
	});
	return /* @__PURE__ */ jsx(Button_default, {
		...props,
		ref,
		onClick: handleClick,
		className: cx(withVendorCSSClassPrefix(bem("dialog", "close")), props.className),
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
export { Dialog_default as default };
//# sourceMappingURL=Dialog.js.map