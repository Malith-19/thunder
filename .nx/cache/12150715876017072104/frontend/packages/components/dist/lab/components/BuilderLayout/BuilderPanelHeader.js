import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from "@wso2/oxygen-ui";
import { ArrowLeft, Check, ChevronLeftIcon, Edit, X } from "@wso2/oxygen-ui-icons-react";
import { jsx, jsxs } from "react/jsx-runtime";

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
	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const inputRef = useRef(null);
	useEffect(() => {
		setEditedTitle(title);
	}, [title]);
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);
	const handleEditClick = useCallback(() => {
		setIsEditing(true);
	}, []);
	const handleSave = useCallback(() => {
		const trimmed = editedTitle.trim();
		if (!trimmed) return;
		if (trimmed !== title) onTitleChange?.(trimmed);
		setIsEditing(false);
	}, [
		editedTitle,
		title,
		onTitleChange
	]);
	const handleCancel = useCallback(() => {
		setEditedTitle(title);
		setIsEditing(false);
	}, [title]);
	const handleKeyDown = useCallback((event) => {
		if (event.key === "Enter") handleSave();
		else if (event.key === "Escape") handleCancel();
	}, [handleSave, handleCancel]);
	return /* @__PURE__ */ jsxs(Box, {
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
		children: [title && (isEditing ? /* @__PURE__ */ jsxs(Stack, {
			direction: "row",
			alignItems: "center",
			spacing: .5,
			children: [
				/* @__PURE__ */ jsx(TextField, {
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
				/* @__PURE__ */ jsx(Tooltip, {
					title: saveTitleTooltip,
					children: /* @__PURE__ */ jsx(IconButton, {
						size: "small",
						onClick: handleSave,
						color: "primary",
						children: /* @__PURE__ */ jsx(Check, { size: 16 })
					})
				}),
				/* @__PURE__ */ jsx(Tooltip, {
					title: cancelEditTooltip,
					children: /* @__PURE__ */ jsx(IconButton, {
						size: "small",
						onClick: handleCancel,
						children: /* @__PURE__ */ jsx(X, { size: 16 })
					})
				})
			]
		}) : /* @__PURE__ */ jsxs(Stack, {
			direction: "column",
			spacing: 0,
			children: [/* @__PURE__ */ jsxs(Stack, {
				direction: "row",
				alignItems: "center",
				spacing: .5,
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h6",
					sx: { fontWeight: 600 },
					children: title
				}), onTitleChange && /* @__PURE__ */ jsx(Tooltip, {
					title: editTitleTooltip,
					children: /* @__PURE__ */ jsx(IconButton, {
						size: "small",
						"aria-label": editTitleTooltip,
						onClick: handleEditClick,
						sx: { p: .25 },
						children: /* @__PURE__ */ jsx(Edit, { size: 14 })
					})
				})]
			}), handle && /* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				color: "text.secondary",
				children: handle
			})]
		})), (onBack !== void 0 || onPanelToggle !== void 0) && /* @__PURE__ */ jsxs(Box, {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			sx: { mb: 1 },
			children: [onBack !== void 0 && /* @__PURE__ */ jsx(Button, {
				onClick: onBack,
				variant: "text",
				size: "small",
				startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 14 }),
				sx: {
					textTransform: "none",
					fontSize: "0.8rem",
					color: "text.secondary",
					whiteSpace: "nowrap"
				},
				children: backLabel
			}), onPanelToggle !== void 0 && /* @__PURE__ */ jsx(Tooltip, {
				title: hidePanelTooltip,
				placement: "right",
				children: /* @__PURE__ */ jsx(IconButton, {
					onClick: onPanelToggle,
					size: "small",
					children: /* @__PURE__ */ jsx(ChevronLeftIcon, { size: 16 })
				})
			})]
		})]
	});
}
var BuilderPanelHeader_default = memo(BuilderPanelHeader);

//#endregion
export { BuilderPanelHeader_default as default };