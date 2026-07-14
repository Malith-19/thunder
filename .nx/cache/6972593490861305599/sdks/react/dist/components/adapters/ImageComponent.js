import useTheme_default from "../../contexts/Theme/useTheme.js";
import { extractEmojiFromUri, isEmojiUri } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/adapters/ImageComponent.tsx
const DEFAULT_EMOJI_CONTAINER_HEIGHT = "4em";
/**
* Image component for sign-up forms.
*/
const ImageComponent = ({ component }) => {
	const { theme } = useTheme_default();
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
	if (isEmojiUri(src)) {
		const toCSSLength = (value) => /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
		const cssWidth = toCSSLength(width);
		const cssHeight = toCSSLength(height);
		const isConcrete = (v) => v !== "auto" && !v.endsWith("%");
		let containerHeight;
		if (isConcrete(cssHeight)) containerHeight = cssHeight;
		else if (isConcrete(cssWidth)) containerHeight = cssWidth;
		else containerHeight = DEFAULT_EMOJI_CONTAINER_HEIGHT;
		return /* @__PURE__ */ jsx("div", {
			style: { textAlign: "center" },
			children: /* @__PURE__ */ jsx("span", {
				style: {
					...imageStyle,
					containerType: "size",
					display: "inline-grid",
					height: containerHeight,
					placeItems: "center",
					width: cssWidth
				},
				children: /* @__PURE__ */ jsx("span", {
					"aria-label": alt,
					role: "img",
					style: {
						fontSize: "100cqmin",
						lineHeight: 1
					},
					children: extractEmojiFromUri(src)
				})
			})
		}, component.id);
	}
	return /* @__PURE__ */ jsx("div", {
		style: { textAlign: "center" },
		children: /* @__PURE__ */ jsx("img", {
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
export { ImageComponent_default as default };
//# sourceMappingURL=ImageComponent.js.map