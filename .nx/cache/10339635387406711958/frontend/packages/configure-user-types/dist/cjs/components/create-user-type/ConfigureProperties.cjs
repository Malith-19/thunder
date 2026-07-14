const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_invalidateI18nCache = require('../../utils/invalidateI18nCache.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);

//#region src/components/create-user-type/ConfigureProperties.tsx
/**
* Step 3 of the user type creation wizard: configure schema properties.
*
* @public
*/
function ConfigureProperties({ properties, onPropertiesChange, enumInput, onEnumInputChange, displayAttribute, onDisplayAttributeChange, onReadyChange = void 0, userTypeName = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { resolveDisplayName } = (0, __thunderid_hooks.useResolveDisplayName)({ handlers: { t } });
	const nextId = (0, react.useRef)(properties.length + 1);
	const eligibleDisplayProperties = (0, react.useMemo)(() => properties.filter((p) => (p.type === "string" || p.type === "number" || p.type === "enum") && !p.credential && p.name.trim().length > 0), [properties]);
	const userClearedRef = (0, react.useRef)(false);
	const handleDisplayAttributeChange = (0, react.useCallback)((value) => {
		if (!value) userClearedRef.current = true;
		else userClearedRef.current = false;
		onDisplayAttributeChange(value);
	}, [onDisplayAttributeChange]);
	(0, react.useEffect)(() => {
		const eligibleNames = eligibleDisplayProperties.map((p) => p.name.trim());
		if (eligibleNames.length === 1 && !displayAttribute && !userClearedRef.current) onDisplayAttributeChange(eligibleNames[0]);
		else if (displayAttribute && !eligibleNames.includes(displayAttribute)) onDisplayAttributeChange("");
	}, [
		eligibleDisplayProperties,
		displayAttribute,
		onDisplayAttributeChange
	]);
	(0, react.useEffect)(() => {
		if (onReadyChange) onReadyChange(properties.some((prop) => prop.name.trim().length > 0));
	}, [properties, onReadyChange]);
	const handleAddProperty = () => {
		const id = String(nextId.current);
		nextId.current += 1;
		const newProperty = {
			id,
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
	const handleRemoveProperty = (id) => {
		onPropertiesChange(properties.filter((prop) => prop.id !== id));
		const newEnumInput = { ...enumInput };
		delete newEnumInput[id];
		onEnumInputChange(newEnumInput);
	};
	const handlePropertyChange = (id, field, value) => {
		onPropertiesChange(properties.map((prop) => prop.id === id ? {
			...prop,
			[field]: value,
			...field === "credential" && value && { unique: false },
			...field === "type" && {
				enum: value === "enum" ? prop.enum : [],
				regex: "",
				unique: value === "string" || value === "number" || value === "enum" ? prop.unique : false,
				credential: value === "string" || value === "number" ? prop.credential : false
			}
		} : prop));
	};
	const handleAddEnumValue = (propertyId) => {
		const inputValue = enumInput[propertyId]?.trim();
		if (!inputValue) return;
		if (properties.find((prop) => prop.id === propertyId)?.enum.includes(inputValue)) return;
		onPropertiesChange(properties.map((prop) => prop.id === propertyId ? {
			...prop,
			enum: [...prop.enum, inputValue]
		} : prop));
		onEnumInputChange({
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
	const supportsUnique = (type) => type === "string" || type === "number" || type === "enum";
	const supportsCredential = (type) => type === "string" || type === "number";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-properties",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "column",
				spacing: 1,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "h1",
					gutterBottom: true,
					children: t("userTypes:createWizard.properties.title")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "subtitle1",
					color: "text.secondary",
					children: t("userTypes:createWizard.properties.subtitle")
				})]
			}),
			properties.map((property) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Paper, {
				variant: "outlined",
				sx: {
					position: "relative",
					px: 3,
					py: 3,
					borderRadius: 2,
					transition: "border-color 0.2s",
					"&:hover": { borderColor: "primary.main" },
					"&:hover .property-delete-btn": { opacity: 1 }
				},
				children: [
					properties.length > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: t("userTypes:removeProperty"),
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
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
						sx: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 2
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("userTypes:propertyName") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
							value: property.name,
							onChange: (e) => handlePropertyChange(property.id, "name", e.target.value),
							placeholder: t("userTypes:propertyNamePlaceholder"),
							size: "small"
						})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("userTypes:propertyType") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
							value: property.type,
							onChange: (e) => handlePropertyChange(property.id, "type", e.target.value),
							size: "small",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
									value: "string",
									children: t("userTypes:types.string")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
									value: "number",
									children: t("userTypes:types.number")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
									value: "boolean",
									children: t("userTypes:types.boolean")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
									value: "enum",
									children: t("userTypes:types.enum")
								})
							]
						})] })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						sx: { mt: 2 },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.I18nTextInput, {
							label: t("userTypes:displayName", "Display Name"),
							value: property.displayName,
							onChange: (newValue) => handlePropertyChange(property.id, "displayName", newValue),
							placeholder: t("userTypes:displayNamePlaceholder", "e.g., First Name"),
							onTranslationCreated: require_invalidateI18nCache.invalidateI18nCache,
							labels: {
								triggerTooltip: t("userTypes:displayNameI18n.tooltip", "Configure translation"),
								popoverTitle: t("userTypes:displayNameI18n.title", "Translation"),
								createTitle: t("userTypes:displayNameI18n.createTitle", "Create New Translation"),
								createTooltip: t("userTypes:displayNameI18n.createTooltip", "Create a new translation key"),
								languageLabel: t("userTypes:displayNameI18n.language", "Language"),
								keyLabel: t("userTypes:displayNameI18n.i18nKey", "Translation Key"),
								selectKeyPlaceholder: t("userTypes:displayNameI18n.selectKey", "Select a translation key"),
								valueLabel: t("userTypes:displayNameI18n.translationValue", "Translation Value"),
								resolvedValueLabel: t("userTypes:displayNameI18n.resolvedValue", "Resolved value"),
								keyRequiredError: t("userTypes:displayNameI18n.keyRequired", "Translation key is required"),
								valueRequiredError: t("userTypes:displayNameI18n.valueRequired", "Translation value is required"),
								invalidKeyFormatError: t("userTypes:displayNameI18n.invalidKeyFormat", "Key may only contain letters, numbers, dots, hyphens, and underscores"),
								cancelLabel: t("common:cancel", "Cancel"),
								createLabel: t("common:create", "Create"),
								closeLabel: t("common:close", "Close"),
								unknownError: t("common:errors.unknown", "An unknown error occurred")
							},
							defaultNewKey: userTypeName && property.name.trim() ? `${userTypeName}.${property.name.trim()}` : void 0
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
						sx: {
							mt: 2.5,
							display: "flex",
							gap: 3
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: t("userTypes:tooltips.required"),
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
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("common:form.required") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							}),
							supportsUnique(property.type) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: t("userTypes:tooltips.unique"),
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
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("userTypes:unique") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							}),
							supportsCredential(property.type) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
								title: t("userTypes:tooltips.credential"),
								placement: "top",
								arrow: true,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
									control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
										checked: property.credential,
										onChange: (e) => handlePropertyChange(property.id, "credential", e.target.checked)
									}),
									label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
										direction: "row",
										alignItems: "center",
										spacing: .5,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("userTypes:credential") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Info, {
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
						sx: { mt: 2 },
						children: t("userTypes:credentialHint")
					}),
					property.type === "string" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
						fullWidth: true,
						sx: { mt: 2.5 },
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("userTypes:regexPattern") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
							value: property.regex,
							onChange: (e) => handlePropertyChange(property.id, "regex", e.target.value),
							placeholder: t("userTypes:regexPlaceholder"),
							size: "small"
						})]
					}),
					property.type === "enum" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
						fullWidth: true,
						sx: { mt: 2.5 },
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("userTypes:enumValues") }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
								sx: {
									display: "flex",
									gap: 1
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
									value: enumInput[property.id] ?? "",
									onChange: (e) => onEnumInputChange({
										...enumInput,
										[property.id]: e.target.value
									}),
									onKeyDown: (e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											handleAddEnumValue(property.id);
										}
									},
									placeholder: t("userTypes:enumPlaceholder"),
									size: "small",
									fullWidth: true
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
									variant: "outlined",
									onClick: () => handleAddEnumValue(property.id),
									children: t("common:actions.add")
								})]
							}),
							property.enum.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
								sx: {
									mt: 1.5,
									display: "flex",
									flexWrap: "wrap",
									gap: 1
								},
								children: property.enum.map((val) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
									label: val,
									size: "small",
									onDelete: () => handleRemoveEnumValue(property.id, val)
								}, val))
							})
						]
					})
				]
			}, property.id)),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "outlined",
				startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 16 }),
				onClick: handleAddProperty,
				fullWidth: true,
				sx: {
					py: 1.5,
					borderStyle: "dashed",
					"&:hover": { borderStyle: "dashed" }
				},
				children: t("userTypes:addProperty")
			}),
			eligibleDisplayProperties.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Paper, {
				variant: "outlined",
				sx: {
					px: 3,
					py: 3,
					borderRadius: 2
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
					fullWidth: true,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("userTypes:displayAttribute", "Display Attribute") }),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "body2",
							color: "text.secondary",
							sx: { mb: 1 },
							children: t("userTypes:displayAttributeHint", "The property used to display user names in listings and references")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
							value: displayAttribute,
							onChange: (e) => handleDisplayAttributeChange(e.target.value),
							size: "small",
							displayEmpty: true,
							renderValue: (selected) => {
								const value = typeof selected === "string" ? selected : "";
								if (!value) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "body2",
									color: "text.secondary",
									children: t("userTypes:selectDisplayAttribute", "Select a display attribute")
								});
								const matchedProp = eligibleDisplayProperties.find((p) => p.name.trim() === value);
								const resolved = matchedProp?.displayName ? resolveDisplayName(matchedProp.displayName) : "";
								return resolved && resolved !== value ? `${resolved} (${value})` : value;
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
								value: "",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
									variant: "body2",
									color: "text.secondary",
									children: t("common:none", "None")
								})
							}), eligibleDisplayProperties.map((prop) => {
								const name = prop.name.trim();
								const resolved = prop.displayName ? resolveDisplayName(prop.displayName) : "";
								return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
									value: name,
									children: resolved && resolved !== name ? `${resolved} (${name})` : name
								}, prop.id);
							})]
						})
					]
				})
			})
		]
	});
}

//#endregion
exports.default = ConfigureProperties;