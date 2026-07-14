import emojis_default from "./emojis.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, InputAdornment, Stack, TextField, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Flag, Hash, Lightbulb, PawPrint, Plane, Search, Smile, Trophy, User, UtensilsCrossed } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/lab/components/EmojiPicker/EmojiPicker.tsx
const EMOJI_CATEGORIES = emojis_default;
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
	["Smileys & Emotion", Smile],
	["People & Body", User],
	["Animals & Nature", PawPrint],
	["Food & Drink", UtensilsCrossed],
	["Travel & Places", Plane],
	["Activities", Trophy],
	["Objects", Lightbulb],
	["Symbols", Hash],
	["Flags", Flag]
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
	const { t } = useTranslation("elements");
	const [search, setSearch] = useState("");
	const allCategories = getSupportedCategories();
	const [activeCategory, setActiveCategory] = useState(allCategories[0]?.label ?? "");
	const scrollContainerRef = useRef(null);
	const sectionRefs = useRef(/* @__PURE__ */ new Map());
	const isScrollingProgrammatically = useRef(false);
	const pendingScrollLabel = useRef(null);
	const isSearchingRef = useRef(false);
	const isSearching = search.trim().length > 0;
	useEffect(() => {
		isSearchingRef.current = isSearching;
	}, [isSearching]);
	const searchResults = useMemo(() => {
		const query = search.trim().toLowerCase();
		if (!query) return [];
		return allCategories.map((cat) => ({
			...cat,
			emojis: cat.emojis.filter((e) => e.keywords.toLowerCase().includes(query) || e.char === query)
		})).filter((cat) => cat.emojis.length > 0);
	}, [search, allCategories]);
	const displayedSections = isSearching ? searchResults : allCategories;
	useEffect(() => {
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
	const scrollToLabel = useCallback((label) => {
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
	const handleCategoryClick = useCallback((label) => {
		setActiveCategory(label);
		if (isSearchingRef.current) {
			pendingScrollLabel.current = label;
			setSearch("");
		} else scrollToLabel(label);
	}, [scrollToLabel]);
	useEffect(() => {
		if (!isSearching && pendingScrollLabel.current) {
			const label = pendingScrollLabel.current;
			pendingScrollLabel.current = null;
			scrollToLabel(label);
		}
	}, [isSearching, scrollToLabel]);
	const setSectionRef = useCallback((label, el) => {
		if (el) sectionRefs.current.set(label, el);
		else sectionRefs.current.delete(label);
	}, []);
	return /* @__PURE__ */ jsx(Stack, {
		sx: { minWidth: 0 },
		children: /* @__PURE__ */ jsxs(Stack, {
			spacing: 1.5,
			sx: { p: 1.5 },
			children: [
				/* @__PURE__ */ jsx(TextField, {
					fullWidth: true,
					size: "small",
					"aria-label": t("emoji_picker.search.label", "Search emojis"),
					placeholder: t("emoji_picker.search.placeholder", "Search emojis..."),
					value: search,
					onChange: (e) => setSearch(e.target.value),
					slotProps: {
						input: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, {
							position: "start",
							children: /* @__PURE__ */ jsx(Search, { size: 16 })
						}) },
						htmlInput: { "aria-label": t("emoji_picker.search.label", "Search emojis") }
					}
				}),
				/* @__PURE__ */ jsx(Box, {
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
						return /* @__PURE__ */ jsx(Tooltip, {
							title: t(CATEGORY_I18N_KEYS[label] ?? label, label),
							placement: "top",
							children: /* @__PURE__ */ jsx(Box, {
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
								children: /* @__PURE__ */ jsx(Icon, { size: 20 })
							})
						}, label);
					})
				}),
				/* @__PURE__ */ jsx(Box, {
					ref: scrollContainerRef,
					sx: {
						height: 260,
						overflowY: "auto",
						pr: .5
					},
					children: displayedSections.length > 0 ? displayedSections.map((section) => /* @__PURE__ */ jsxs(Box, {
						sx: { mb: 1.5 },
						children: [/* @__PURE__ */ jsx(Typography, {
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
						}), /* @__PURE__ */ jsx(Box, {
							sx: {
								display: "flex",
								flexWrap: "wrap",
								gap: .5
							},
							children: section.emojis.map((emoji) => /* @__PURE__ */ jsx(Box, {
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
					}, section.label)) : /* @__PURE__ */ jsx(Typography, {
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
export { EmojiPicker as default };