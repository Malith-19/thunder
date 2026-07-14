import resource_server_types_default from "../../config/resource-server-types.js";
import { Box, Card, CardContent, Stack, Typography } from "@wso2/oxygen-ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/create-resource-server/ConfigureType.tsx
function ConfigureType({ selectedType, onSelect }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 3,
		children: [/* @__PURE__ */ jsxs(Stack, {
			direction: "column",
			spacing: .5,
			children: [/* @__PURE__ */ jsx(Typography, {
				variant: "h1",
				children: t("resourceServers:create.type.title", "What type of resource server are you adding?")
			}), /* @__PURE__ */ jsx(Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("resourceServers:create.type.subtitle", "Select the type that best describes this resource server.")
			})]
		}), /* @__PURE__ */ jsx(Box, {
			sx: {
				display: "grid",
				gridTemplateColumns: {
					xs: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)"
				},
				gap: 2
			},
			children: resource_server_types_default.map((option) => {
				const isSelected = selectedType === option.value;
				return /* @__PURE__ */ jsx(Card, {
					variant: "outlined",
					role: "button",
					tabIndex: 0,
					"aria-pressed": isSelected,
					onClick: () => onSelect(option.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							onSelect(option.value);
						}
					},
					sx: {
						borderRadius: 2,
						borderWidth: isSelected ? 2 : 1,
						borderColor: isSelected ? "primary.main" : "divider",
						cursor: "pointer",
						bgcolor: isSelected ? "action.selected" : "background.paper",
						transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s",
						"&:hover": {
							borderColor: "primary.main",
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							transform: "translateY(-2px)"
						},
						"&:focus-visible": {
							outline: "none",
							borderColor: "primary.main",
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							transform: "translateY(-2px)"
						}
					},
					children: /* @__PURE__ */ jsx(CardContent, {
						sx: {
							p: 2.5,
							"&:last-child": { pb: 2.5 }
						},
						children: /* @__PURE__ */ jsxs(Stack, {
							direction: "column",
							spacing: 2,
							children: [/* @__PURE__ */ jsx(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: 48,
									height: 48
								},
								children: option.icon
							}), /* @__PURE__ */ jsxs(Stack, {
								direction: "column",
								spacing: .75,
								children: [/* @__PURE__ */ jsx(Typography, {
									variant: "subtitle1",
									sx: {
										fontWeight: 600,
										lineHeight: 1.3
									},
									children: t(option.titleKey)
								}), /* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									color: "text.secondary",
									sx: { lineHeight: 1.5 },
									children: t(option.descriptionKey)
								})]
							})]
						})
					})
				}, option.value);
			})
		})]
	});
}

//#endregion
export { ConfigureType as default };