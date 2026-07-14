const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Avatar_styles = require('./Avatar.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Avatar/Avatar.tsx
const Avatar = ({ alt = "User avatar", background = "random", className = "", imageUrl, name, size = 64, variant = "circular", isLoading = false }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const generateBackgroundColor = (inputString) => {
		const hash = inputString.split("").reduce((acc, char) => {
			const charCode = char.charCodeAt(0);
			return (acc << 5) - acc + charCode & 4294967295;
		}, 0);
		const seed = Math.abs(hash);
		const generateColor = (offset) => {
			const hue1 = (seed + offset) % 360;
			const hue2 = (hue1 + 60 + seed % 120) % 360;
			const saturation = 70 + seed % 20;
			return `hsl(${hue1}, ${saturation}%, ${55 + seed % 15}%), hsl(${hue2}, ${saturation}%, ${60 + (seed + offset) % 15}%)`;
		};
		return `linear-gradient(${45 + seed % 91}deg, ${generateColor(seed)})`;
	};
	const styles = require_Avatar_styles.default(theme, colorScheme, size, variant, (0, react.useMemo)(() => {
		if (!name || imageUrl) return;
		if (background === "random") return generateBackgroundColor(name);
		if (background === "none") return;
		return background;
	}, [
		background,
		name,
		imageUrl
	]));
	const isDefaultState = !imageUrl && !name && !isLoading;
	const getInitials = (fullName) => fullName.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
	const renderContent = () => {
		if (imageUrl) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
			src: imageUrl,
			alt,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("avatar", "image")), styles["image"])
		});
		if (name) return getInitials(name);
		if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("avatar", "skeleton")), styles["skeleton"]) });
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 640 640",
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("avatar", "icon")), styles["icon"]),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" })
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("avatar")), styles["avatar"], styles["variant"], (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("avatar", null, variant)), isDefaultState && (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("avatar", "default")), className),
		children: renderContent()
	});
};

//#endregion
exports.Avatar = Avatar;
//# sourceMappingURL=Avatar.cjs.map