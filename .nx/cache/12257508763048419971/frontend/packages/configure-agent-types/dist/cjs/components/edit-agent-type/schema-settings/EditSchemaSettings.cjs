const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_invalidateI18nCache = require('../../../utils/invalidateI18nCache.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/edit-agent-type/schema-settings/EditSchemaSettings.tsx
/**
* Schema settings tab content for the Agent Type edit page.
* Displays the property editor cards for defining agent type schema fields.
*/
function EditSchemaSettings({ properties, onPropertiesChange, agentTypeName }) {
	const { t } = (0, react_i18next.useTranslation)();
	const [enumInput, setEnumInput] = (0, react.useState)({});
	const [credentialRemoveDialogOpen, setCredentialRemoveDialogOpen] = (0, react.useState)(false);
	const [pendingCredentialRemoveId, setPendingCredentialRemoveId] = (0, react.useState)(null);
	const handlePropertyChange = (propertyId, field, value) => {
		onPropertiesChange(properties.map((prop) => prop.id === propertyId ? {
			...prop,
			[field]: value,
			...field === "type" && {
				enum: value === "enum" ? prop.enum : [],
				regex: "",
				unique: value === "string" || value === "number" || value === "enum" ? prop.unique : false,
				credential: value === "string" || value === "number" ? prop.credential : false
			}
		} : prop));
	};
	const handleRemoveProperty = (propertyId) => {
		onPropertiesChange(properties.filter((prop) => prop.id !== propertyId));
		const newEnumInput = { ...enumInput };
		delete newEnumInput[propertyId];
		setEnumInput(newEnumInput);
	};
	const handleAddProperty = () => {
		const maxId = properties.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);
		const newProperty = {
			id: String(maxId + 1),
			name: "",
			displayName: "",
			type: "string",
			required: false,
			unique: false,
			credential: false,
			enum: [],
			regex: ""
		};
		onPropertiesChange([...properties, newProperty]);
	};
	const handleAddEnumValue = (propertyId) => {
		const inputValue = enumInput[propertyId]?.trim();
		if (!inputValue) return;
		if (properties.find((p) => p.id === propertyId)?.enum.includes(inputValue)) return;
		onPropertiesChange(properties.map((prop) => prop.id === propertyId ? {
			...prop,
			enum: [...prop.enum, inputValue]
		} : prop));
		setEnumInput({
			...enumInput,
			[propertyId]: ""
		});
	};
	const handleRemoveEnumValue = (propertyId, enumValue) => {
		onPropertiesChange(properties.map((prop) => prop.id === propertyId ? {
			...prop,
			enum: prop.enum.filter((val) => val !== enumValue)
		} : prop));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [
		properties.map((property) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Paper, {
			variant: "outlined",
			sx: {
				position: "relative",
				p: 3,
				mb: 2,
				borderRadius: 2,
				transition: "border-color 0.2s",
				"&:hover": { borderColor: "primary.main" },
				"&:hover .property-delete-btn": { opacity: 1 }
			},
			children: [properties.length > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
				title: t("agentTypes:removeProperty", "Remove property"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					className: "property-delete-btn",
					size: "small",
					color: "error",
					onClick: () => handleRemoveProperty(property.id),
					sx: {
						position: "absolute",
						top: 8,
						right: 8,
						opacity: 0,
						transition: "opacity 0.2s"
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Trash2, { size: 16 })
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				spacing: 2,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
						sx: {
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								md: "1fr 1fr"
							},
							gap: 2
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
							fullWidth: true,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("agentTypes:propertyName") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
								value: property.name,
								onChange: (e) => handlePropertyChange(property.id, "name", e.target.value),
								placeholder: t("agentTypes:propertyNamePlaceholder", "e.g., email, age, address"),
								size: "small"
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
							fullWidth: true,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("agentTypes:propertyType", "Type") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
								value: property.type,
								onChange: (e) => handlePropertyChange(property.id, "type", e.target.value),
								size: "small",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
										value: "string",
										children: t("agentTypes:types.string", "String")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
										value: "number",
										children: t("agentTypes:types.number", "Number")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
										value: "boolean",
										children: t("agentTypes:types.boolean", "Boolean")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
										value: "enum",
										children: t("agentTypes:types.enum", "Enum")
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.I18nTextInput, {
						label: t("agentTypes:displayName", "Display Name"),
						value: property.displayName,
						onChange: (newValue) => handlePropertyChange(property.id, "displayName", newValue),
						placeholder: t("agentTypes:displayNamePlaceholder", "e.g., First Name"),
						onTranslationCreated: require_invalidateI18nCache.invalidateI18nCache,
						labels: {
							triggerTooltip: t("agentTypes:displayNameI18n.tooltip", "Configure translation"),
							popoverTitle: t("agentTypes:displayNameI18n.title", "Translation"),
							createTitle: t("agentTypes:displayNameI18n.createTitle", "Create New Translation"),
							createTooltip: t("agentTypes:displayNameI18n.createTooltip", "Create a new translation key"),
							languageLabel: t("agentTypes:displayNameI18n.language", "Language"),
							keyLabel: t("agentTypes:displayNameI18n.i18nKey", "Translation Key"),
							selectKeyPlaceholder: t("agentTypes:displayNameI18n.selectKey", "Select a translation key"),
							valueLabel: t("agentTypes:displayNameI18n.translationValue", "Translation Value"),
							resolvedValueLabel: t("agentTypes:displayNameI18n.resolvedValue", "Resolved value"),
							keyRequiredError: t("agentTypes:displayNameI18n.keyRequired", "Translation key is required"),
							valueRequiredError: t("agentTypes:displayNameI18n.valueRequired", "Translation value is required"),
							invalidKeyFormatError: t("agentTypes:displayNameI18n.invalidKeyFormat", "Key may only contain letters, numbers, dots, hyphens, and underscores"),
							cancelLabel: t("common:cancel", "Cancel"),
							createLabel: t("common:create", "Create"),
							closeLabel: t("common:close", "Close"),
							unknownError: t("common:errors.unknown", "An unknown error occurred")
						},
						defaultNewKey: agentTypeName.trim() && property.name.trim() ? `${agentTypeName.trim()}.${property.name.trim()}` : void 0
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
						sx: {
							display: "flex",
							gap: 3
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: t("agentTypes:tooltips.required", "This field must be provided when creating a user"),
								placement: "top",
								arrow: true,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
									control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
										checked: property.required,
										onChange: (e) => handlePropertyChange(property.id, "required", e.target.checked)
									}),
									label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
										direction: "row",
										alignItems: "center",
										spacing: .5,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("common:form.required", "Required") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							}),
							(property.type === "string" || property.type === "number" || property.type === "enum") && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: t("agentTypes:tooltips.unique", "Each user must have a distinct value for this field"),
								placement: "top",
								arrow: true,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
									control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
										checked: property.unique,
										disabled: property.credential,
										onChange: (e) => handlePropertyChange(property.id, "unique", e.target.checked)
									}),
									label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
										direction: "row",
										alignItems: "center",
										spacing: .5,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("agentTypes:unique", "Unique") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							}),
							(property.type === "string" || property.type === "number") && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: t("agentTypes:tooltips.credential", "Values will be hashed and not returned in API responses"),
								placement: "top",
								arrow: true,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
									control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
										checked: property.credential,
										onChange: ({ target: { checked } }) => {
											if (!checked) {
												setPendingCredentialRemoveId(property.id);
												setCredentialRemoveDialogOpen(true);
												return;
											}
											onPropertiesChange(properties.map((prop) => prop.id === property.id ? {
												...prop,
												credential: checked,
												unique: false
											} : prop));
										}
									}),
									label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
										direction: "row",
										alignItems: "center",
										spacing: .5,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("agentTypes:credential", "Credential") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							})
						]
					}),
					property.credential && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
						severity: "info",
						variant: "outlined",
						children: t("agentTypes:credentialHint", "This field will be treated as a secret. Values will be hashed and cannot be retrieved.")
					}),
					property.type === "string" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
						fullWidth: true,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("agentTypes:regexPattern", "Regular Expression Pattern (Optional)") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
							value: property.regex,
							onChange: (e) => handlePropertyChange(property.id, "regex", e.target.value),
							placeholder: t("agentTypes:regexPlaceholder", "e.g., ^[a-zA-Z0-9]+$"),
							size: "small"
						})]
					}),
					property.type === "enum" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
						fullWidth: true,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("agentTypes:enumValues", "Allowed Values (Enum)") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
								sx: {
									display: "flex",
									gap: 1,
									mb: 1
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
									value: enumInput[property.id] ?? "",
									onChange: (e) => setEnumInput({
										...enumInput,
										[property.id]: e.target.value
									}),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											handleAddEnumValue(property.id);
										}
									},
									placeholder: t("agentTypes:enumPlaceholder", "Add value and press Enter"),
									size: "small",
									fullWidth: true
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
									variant: "outlined",
									size: "small",
									onClick: () => handleAddEnumValue(property.id),
									children: t("common:actions.add", "Add")
								})]
							}),
							property.enum.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
								direction: "row",
								spacing: 1,
								flexWrap: "wrap",
								useFlexGap: true,
								children: property.enum.map((val) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
									label: val,
									onDelete: () => handleRemoveEnumValue(property.id, val),
									size: "small"
								}, val))
							})
						]
					})
				]
			})]
		}, property.id)),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
			variant: "outlined",
			startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 16 }),
			onClick: handleAddProperty,
			fullWidth: true,
			sx: {
				py: 1.5,
				mb: 2,
				borderStyle: "dashed",
				"&:hover": { borderStyle: "dashed" }
			},
			children: t("agentTypes:addProperty", "Add Property")
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
			open: credentialRemoveDialogOpen,
			onClose: () => {
				setCredentialRemoveDialogOpen(false);
				setPendingCredentialRemoveId(null);
			},
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("agentTypes:removeCredentialDialog.title", "Remove Credential Flag") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContent, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContentText, { children: t("agentTypes:removeCredentialDialog.description", "Removing the credential flag will cause this field to no longer be hashed or protected. Existing hashed values may become inaccessible. Are you sure you want to proceed?") }) }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					onClick: () => {
						setCredentialRemoveDialogOpen(false);
						setPendingCredentialRemoveId(null);
					},
					children: t("common:actions.cancel", "Cancel")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					color: "warning",
					variant: "contained",
					onClick: () => {
						if (pendingCredentialRemoveId) onPropertiesChange(properties.map((prop) => prop.id === pendingCredentialRemoveId ? {
							...prop,
							credential: false
						} : prop));
						setCredentialRemoveDialogOpen(false);
						setPendingCredentialRemoveId(null);
					},
					children: t("agentTypes:removeCredentialDialog.confirm", "Remove Credential")
				})] })
			]
		})
	] });
}

//#endregion
exports.default = EditSchemaSettings;