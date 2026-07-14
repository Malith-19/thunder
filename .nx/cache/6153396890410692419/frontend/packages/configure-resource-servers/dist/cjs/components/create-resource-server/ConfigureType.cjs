const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_resource_server_types = require('../../config/resource-server-types.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/create-resource-server/ConfigureType.tsx
function ConfigureType({ selectedType, onSelect }) {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 3,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			direction: "column",
			spacing: .5,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h1",
				children: t("resourceServers:create.type.title", "What type of resource server are you adding?")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body1",
				color: "text.secondary",
				children: t("resourceServers:create.type.subtitle", "Select the type that best describes this resource server.")
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: {
				display: "grid",
				gridTemplateColumns: {
					xs: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)"
				},
				gap: 2
			},
			children: require_resource_server_types.default.map((option) => {
				const isSelected = selectedType === option.value;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Card, {
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
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CardContent, {
						sx: {
							p: 2.5,
							"&:last-child": { pb: 2.5 }
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
							direction: "column",
							spacing: 2,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: 48,
									height: 48
								},
								children: option.icon
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
								direction: "column",
								spacing: .75,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "subtitle1",
									sx: {
										fontWeight: 600,
										lineHeight: 1.3
									},
									children: t(option.titleKey)
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
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
exports.default = ConfigureType;