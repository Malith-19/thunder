const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../contexts/Theme/useTheme.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/ImageComponent.tsx
const DEFAULT_EMOJI_CONTAINER_HEIGHT = "4em";
/**
* Image component for sign-up forms.
*/
const ImageComponent = ({ component }) => {
	const { theme } = require_useTheme.default();
	const config = component.config || {};
	const src = config["src"] || "";
	const alt = config["alt"] || config["label"] || "Image";
	const width = config["width"] || "100%";
	const height = config["height"] || "auto";
	const variant = component.variant?.toLowerCase() || "image_block";
	const imageStyle = {
		borderRadius: theme.vars.borderRadius.small,
		display: "block",
		margin: variant === "image_block" ? "1rem auto" : "0"
	};
	if (!src) return null;
	if ((0, __thunderid_browser.isEmojiUri)(src)) {
		const toCSSLength = (value) => /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
		const cssWidth = toCSSLength(width);
		const cssHeight = toCSSLength(height);
		const isConcrete = (v) => v !== "auto" && !v.endsWith("%");
		let containerHeight;
		if (isConcrete(cssHeight)) containerHeight = cssHeight;
		else if (isConcrete(cssWidth)) containerHeight = cssWidth;
		else containerHeight = DEFAULT_EMOJI_CONTAINER_HEIGHT;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: { textAlign: "center" },
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: {
					...imageStyle,
					containerType: "size",
					display: "inline-grid",
					height: containerHeight,
					placeItems: "center",
					width: cssWidth
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					"aria-label": alt,
					role: "img",
					style: {
						fontSize: "100cqmin",
						lineHeight: 1
					},
					children: (0, __thunderid_browser.extractEmojiFromUri)(src)
				})
			})
		}, component.id);
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		style: { textAlign: "center" },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
			src,
			alt,
			height,
			width,
			style: imageStyle,
			onError: (e) => {
				e.currentTarget.style.display = "none";
			}
		})
	}, component.id);
};
var ImageComponent_default = ImageComponent;

//#endregion
exports.default = ImageComponent_default;
//# sourceMappingURL=ImageComponent.cjs.map