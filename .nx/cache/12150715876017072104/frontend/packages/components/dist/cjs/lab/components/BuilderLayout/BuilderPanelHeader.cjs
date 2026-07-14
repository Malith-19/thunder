const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/lab/components/BuilderLayout/BuilderPanelHeader.tsx
/**
* Reusable header for builder side panels.
*
* Renders a back-navigation button, an optional panel-collapse toggle, and an
* inline-editable title with an optional URL-friendly handle displayed below it.
*
* @param props - Props injected to the component.
* @returns The BuilderPanelHeader component.
*/
function BuilderPanelHeader({ title = "", handle = "", onBack = void 0, onPanelToggle = void 0, onTitleChange = void 0, backLabel = "Back", hidePanelTooltip = "Hide panel", editTitleTooltip = "Edit title", saveTitleTooltip = "Save", cancelEditTooltip = "Cancel",...rest }) {
	const [isEditing, setIsEditing] = (0, react.useState)(false);
	const [editedTitle, setEditedTitle] = (0, react.useState)(title);
	const inputRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => {
		setEditedTitle(title);
	}, [title]);
	(0, react.useEffect)(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);
	const handleEditClick = (0, react.useCallback)(() => {
		setIsEditing(true);
	}, []);
	const handleSave = (0, react.useCallback)(() => {
		const trimmed = editedTitle.trim();
		if (!trimmed) return;
		if (trimmed !== title) onTitleChange?.(trimmed);
		setIsEditing(false);
	}, [
		editedTitle,
		title,
		onTitleChange
	]);
	const handleCancel = (0, react.useCallback)(() => {
		setEditedTitle(title);
		setIsEditing(false);
	}, [title]);
	const handleKeyDown = (0, react.useCallback)((event) => {
		if (event.key === "Enter") handleSave();
		else if (event.key === "Escape") handleCancel();
	}, [handleSave, handleCancel]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			pb: 1.5,
			borderBottom: "1px solid",
			borderColor: "divider",
			mb: 1,
			flexShrink: 0,
			display: "flex",
			justifyContent: "space-between"
		},
		...rest,
		children: [title && (isEditing ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			direction: "row",
			alignItems: "center",
			spacing: .5,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					inputRef,
					value: editedTitle,
					onChange: (e) => setEditedTitle(e.target.value),
					onKeyDown: handleKeyDown,
					size: "small",
					variant: "outlined",
					fullWidth: true,
					sx: { "& .MuiInputBase-input": {
						py: .5,
						fontSize: "1rem",
						fontWeight: 600
					} }
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
					title: saveTitleTooltip,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
						size: "small",
						onClick: handleSave,
						color: "primary",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 16 })
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
					title: cancelEditTooltip,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
						size: "small",
						onClick: handleCancel,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.X, { size: 16 })
					})
				})
			]
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			direction: "column",
			spacing: 0,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				spacing: .5,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "h6",
					sx: { fontWeight: 600 },
					children: title
				}), onTitleChange && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
					title: editTitleTooltip,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
						size: "small",
						"aria-label": editTitleTooltip,
						onClick: handleEditClick,
						sx: { p: .25 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Edit, { size: 14 })
					})
				})]
			}), handle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "text.secondary",
				children: handle
			})]
		})), (onBack !== void 0 || onPanelToggle !== void 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			sx: { mb: 1 },
			children: [onBack !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: onBack,
				variant: "text",
				size: "small",
				startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 14 }),
				sx: {
					textTransform: "none",
					fontSize: "0.8rem",
					color: "text.secondary",
					whiteSpace: "nowrap"
				},
				children: backLabel
			}), onPanelToggle !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
				title: hidePanelTooltip,
				placement: "right",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					onClick: onPanelToggle,
					size: "small",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronLeftIcon, { size: 16 })
				})
			})]
		})]
	});
}
var BuilderPanelHeader_default = (0, react.memo)(BuilderPanelHeader);

//#endregion
exports.default = BuilderPanelHeader_default;