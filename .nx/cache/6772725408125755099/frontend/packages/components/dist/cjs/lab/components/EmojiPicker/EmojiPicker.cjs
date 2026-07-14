const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_emojis = require('./emojis.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/EmojiPicker/EmojiPicker.tsx
const EMOJI_CATEGORIES = require_emojis.default;
/**
* Probes each emoji once via an offscreen canvas. Emojis that are unsupported
* by the OS font render as a monochromatic "NO GLYPH" box — supported ones
* produce at least one coloured pixel. Result is cached for the session.
*/
let supportedCategories = null;
function getSupportedCategories() {
	if (supportedCategories) return supportedCategories;
	if (typeof document === "undefined") return EMOJI_CATEGORIES;
	const canvas = document.createElement("canvas");
	canvas.width = 20;
	canvas.height = 20;
	const ctx = canvas.getContext("2d");
	if (!ctx) return EMOJI_CATEGORIES;
	const hasGlyph = (char) => {
		ctx.clearRect(0, 0, 20, 20);
		ctx.font = "14px serif";
		ctx.fillText(char, 0, 16);
		const { data } = ctx.getImageData(0, 0, 20, 20);
		for (let i = 0; i < data.length; i += 4) {
			const [r, g, b, a] = [
				data[i],
				data[i + 1],
				data[i + 2],
				data[i + 3]
			];
			if (a > 0 && (Math.abs(r - g) > 10 || Math.abs(g - b) > 10 || Math.abs(r - b) > 10)) return true;
		}
		return false;
	};
	supportedCategories = EMOJI_CATEGORIES.map((cat) => ({
		...cat,
		emojis: cat.emojis.filter((e) => hasGlyph(e.char))
	})).filter((cat) => cat.emojis.length > 0);
	return supportedCategories;
}
const CATEGORY_ICON_MAP = new Map([
	["Smileys & Emotion", __wso2_oxygen_ui_icons_react.Smile],
	["People & Body", __wso2_oxygen_ui_icons_react.User],
	["Animals & Nature", __wso2_oxygen_ui_icons_react.PawPrint],
	["Food & Drink", __wso2_oxygen_ui_icons_react.UtensilsCrossed],
	["Travel & Places", __wso2_oxygen_ui_icons_react.Plane],
	["Activities", __wso2_oxygen_ui_icons_react.Trophy],
	["Objects", __wso2_oxygen_ui_icons_react.Lightbulb],
	["Symbols", __wso2_oxygen_ui_icons_react.Hash],
	["Flags", __wso2_oxygen_ui_icons_react.Flag]
]);
const CATEGORY_I18N_KEYS = {
	"Smileys & Emotion": "emoji_picker.categories.smileys_emotion",
	"People & Body": "emoji_picker.categories.people_body",
	"Animals & Nature": "emoji_picker.categories.animals_nature",
	"Food & Drink": "emoji_picker.categories.food_drink",
	"Travel & Places": "emoji_picker.categories.travel_places",
	Activities: "emoji_picker.categories.activities",
	Objects: "emoji_picker.categories.objects",
	Symbols: "emoji_picker.categories.symbols",
	Flags: "emoji_picker.categories.flags"
};
/**
* A pure emoji-grid panel with a category filter bar and search.
* Contains no dialog chrome — embed this inside a dialog or any other container.
*
* - Category tabs scroll the grid to that section and highlight as you scroll.
* - Typing in the search field shows filtered results across all categories.
* - Clicking an emoji tile fires {@link EmojiPickerProps.onChange} immediately.
*
* @public
*/
function EmojiPicker({ value = "", onChange }) {
	const { t } = (0, react_i18next.useTranslation)("elements");
	const [search, setSearch] = (0, react.useState)("");
	const allCategories = getSupportedCategories();
	const [activeCategory, setActiveCategory] = (0, react.useState)(allCategories[0]?.label ?? "");
	const scrollContainerRef = (0, react.useRef)(null);
	const sectionRefs = (0, react.useRef)(/* @__PURE__ */ new Map());
	const isScrollingProgrammatically = (0, react.useRef)(false);
	const pendingScrollLabel = (0, react.useRef)(null);
	const isSearchingRef = (0, react.useRef)(false);
	const isSearching = search.trim().length > 0;
	(0, react.useEffect)(() => {
		isSearchingRef.current = isSearching;
	}, [isSearching]);
	const searchResults = (0, react.useMemo)(() => {
		const query = search.trim().toLowerCase();
		if (!query) return [];
		return allCategories.map((cat) => ({
			...cat,
			emojis: cat.emojis.filter((e) => e.keywords.toLowerCase().includes(query) || e.char === query)
		})).filter((cat) => cat.emojis.length > 0);
	}, [search, allCategories]);
	const displayedSections = isSearching ? searchResults : allCategories;
	(0, react.useEffect)(() => {
		if (isSearching) return;
		const container = scrollContainerRef.current;
		if (!container) return;
		const observer = new IntersectionObserver((entries) => {
			if (isScrollingProgrammatically.current) return;
			const intersecting = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
			if (intersecting.length > 0) {
				const label = intersecting[0].target.dataset["categoryLabel"];
				if (label) setActiveCategory(label);
			}
		}, {
			root: container,
			rootMargin: "0px 0px -70% 0px",
			threshold: 0
		});
		sectionRefs.current.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [isSearching]);
	const scrollToLabel = (0, react.useCallback)((label) => {
		isScrollingProgrammatically.current = true;
		const el = sectionRefs.current.get(label);
		if (el && scrollContainerRef.current && typeof scrollContainerRef.current.scrollTo === "function") scrollContainerRef.current.scrollTo({
			top: el.offsetTop,
			behavior: "smooth"
		});
		setTimeout(() => {
			isScrollingProgrammatically.current = false;
		}, 600);
	}, []);
	const handleCategoryClick = (0, react.useCallback)((label) => {
		setActiveCategory(label);
		if (isSearchingRef.current) {
			pendingScrollLabel.current = label;
			setSearch("");
		} else scrollToLabel(label);
	}, [scrollToLabel]);
	(0, react.useEffect)(() => {
		if (!isSearching && pendingScrollLabel.current) {
			const label = pendingScrollLabel.current;
			pendingScrollLabel.current = null;
			scrollToLabel(label);
		}
	}, [isSearching, scrollToLabel]);
	const setSectionRef = (0, react.useCallback)((label, el) => {
		if (el) sectionRefs.current.set(label, el);
		else sectionRefs.current.delete(label);
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
		sx: { minWidth: 0 },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			spacing: 1.5,
			sx: { p: 1.5 },
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					fullWidth: true,
					size: "small",
					"aria-label": t("emoji_picker.search.label", "Search emojis"),
					placeholder: t("emoji_picker.search.placeholder", "Search emojis..."),
					value: search,
					onChange: (e) => setSearch(e.target.value),
					slotProps: {
						input: { startAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
							position: "start",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Search, { size: 16 })
						}) },
						htmlInput: { "aria-label": t("emoji_picker.search.label", "Search emojis") }
					}
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						overflowX: "auto",
						pb: 1,
						"&::-webkit-scrollbar": { display: "none" },
						scrollbarWidth: "none"
					},
					children: allCategories.filter((cat) => CATEGORY_ICON_MAP.has(cat.label)).map((cat) => {
						const { label } = cat;
						const Icon = CATEGORY_ICON_MAP.get(label);
						const isActive = !isSearching && activeCategory === label;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
							title: t(CATEGORY_I18N_KEYS[label] ?? label, label),
							placement: "top",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
								component: "button",
								type: "button",
								onClick: () => handleCategoryClick(label),
								sx: {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexShrink: 0,
									width: 40,
									height: 44,
									border: "none",
									borderBottom: "2px solid",
									borderColor: isActive ? "primary.main" : "transparent",
									background: "none",
									cursor: "pointer",
									color: isActive ? "primary.main" : "text.secondary",
									transition: "color 0.15s, border-color 0.15s",
									"&:hover": {
										color: "primary.main",
										bgcolor: "action.hover"
									}
								},
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, { size: 20 })
							})
						}, label);
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					ref: scrollContainerRef,
					sx: {
						height: 260,
						overflowY: "auto",
						pr: .5
					},
					children: displayedSections.length > 0 ? displayedSections.map((section) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
						sx: { mb: 1.5 },
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							ref: (el) => setSectionRef(section.label, el),
							"data-category-label": section.label,
							variant: "caption",
							color: "text.secondary",
							sx: {
								fontWeight: 600,
								letterSpacing: "0.05em",
								textTransform: "uppercase",
								mb: .5,
								display: "block"
							},
							children: t(CATEGORY_I18N_KEYS[section.label] ?? section.label, section.label)
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
							sx: {
								display: "flex",
								flexWrap: "wrap",
								gap: .5
							},
							children: section.emojis.map((emoji) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
								onClick: () => onChange(emoji.char),
								title: emoji.keywords,
								sx: {
									width: 36,
									height: 36,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "1.375rem",
									cursor: "pointer",
									borderRadius: 1,
									border: "2px solid",
									borderColor: value === emoji.char ? "primary.main" : "transparent",
									bgcolor: value === emoji.char ? "primary.light" : "transparent",
									transition: "all 0.1s",
									"&:hover": {
										bgcolor: "action.hover",
										borderColor: "primary.light"
									}
								},
								children: emoji.char
							}, emoji.char))
						})]
					}, section.label)) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						sx: {
							textAlign: "center",
							py: 3
						},
						children: t("emoji_picker.empty_state.message", "No emojis found for \"{{search}}\"", { search })
					})
				})
			]
		})
	});
}

//#endregion
exports.default = EmojiPicker;