import { invalidateI18nCache } from "../../utils/invalidateI18nCache.js";
import { useTranslation } from "react-i18next";
import { useResolveDisplayName } from "@thunderid/hooks";
import { Alert, Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormLabel, IconButton, MenuItem, Paper, Select, Stack, TextField, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Info, Plus, Trash2 } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { I18nTextInput } from "@thunderid/components";

//#region src/components/create-user-type/ConfigureProperties.tsx
/**
* Step 3 of the user type creation wizard: configure schema properties.
*
* @public
*/
function ConfigureProperties({ properties, onPropertiesChange, enumInput, onEnumInputChange, displayAttribute, onDisplayAttributeChange, onReadyChange = void 0, userTypeName = void 0 }) {
	const { t } = useTranslation();
	const { resolveDisplayName } = useResolveDisplayName({ handlers: { t } });
	const nextId = useRef(properties.length + 1);
	const eligibleDisplayProperties = useMemo(() => properties.filter((p) => (p.type === "string" || p.type === "number" || p.type === "enum") && !p.credential && p.name.trim().length > 0), [properties]);
	const userClearedRef = useRef(false);
	const handleDisplayAttributeChange = useCallback((value) => {
		if (!value) userClearedRef.current = true;
		else userClearedRef.current = false;
		onDisplayAttributeChange(value);
	}, [onDisplayAttributeChange]);
	useEffect(() => {
		const eligibleNames = eligibleDisplayProperties.map((p) => p.name.trim());
		if (eligibleNames.length === 1 && !displayAttribute && !userClearedRef.current) onDisplayAttributeChange(eligibleNames[0]);
		else if (displayAttribute && !eligibleNames.includes(displayAttribute)) onDisplayAttributeChange("");
	}, [
		eligibleDisplayProperties,
		displayAttribute,
		onDisplayAttributeChange
	]);
	useEffect(() => {
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
	return /* @__PURE__ */ jsxs(Stack, {
		direction: "column",
		spacing: 4,
		"data-testid": "configure-properties",
		children: [
			/* @__PURE__ */ jsxs(Stack, {
				direction: "column",
				spacing: 1,
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h1",
					gutterBottom: true,
					children: t("userTypes:createWizard.properties.title")
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "subtitle1",
					color: "text.secondary",
					children: t("userTypes:createWizard.properties.subtitle")
				})]
			}),
			properties.map((property) => /* @__PURE__ */ jsxs(Paper, {
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
					properties.length > 1 && /* @__PURE__ */ jsx(Tooltip, {
						title: t("userTypes:removeProperty"),
						children: /* @__PURE__ */ jsx(IconButton, {
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
							children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
						})
					}),
					/* @__PURE__ */ jsxs(Box, {
						sx: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 2
						},
						children: [/* @__PURE__ */ jsxs(FormControl, { children: [/* @__PURE__ */ jsx(FormLabel, { children: t("userTypes:propertyName") }), /* @__PURE__ */ jsx(TextField, {
							value: property.name,
							onChange: (e) => handlePropertyChange(property.id, "name", e.target.value),
							placeholder: t("userTypes:propertyNamePlaceholder"),
							size: "small"
						})] }), /* @__PURE__ */ jsxs(FormControl, { children: [/* @__PURE__ */ jsx(FormLabel, { children: t("userTypes:propertyType") }), /* @__PURE__ */ jsxs(Select, {
							value: property.type,
							onChange: (e) => handlePropertyChange(property.id, "type", e.target.value),
							size: "small",
							children: [
								/* @__PURE__ */ jsx(MenuItem, {
									value: "string",
									children: t("userTypes:types.string")
								}),
								/* @__PURE__ */ jsx(MenuItem, {
									value: "number",
									children: t("userTypes:types.number")
								}),
								/* @__PURE__ */ jsx(MenuItem, {
									value: "boolean",
									children: t("userTypes:types.boolean")
								}),
								/* @__PURE__ */ jsx(MenuItem, {
									value: "enum",
									children: t("userTypes:types.enum")
								})
							]
						})] })]
					}),
					/* @__PURE__ */ jsx(Box, {
						sx: { mt: 2 },
						children: /* @__PURE__ */ jsx(I18nTextInput, {
							label: t("userTypes:displayName", "Display Name"),
							value: property.displayName,
							onChange: (newValue) => handlePropertyChange(property.id, "displayName", newValue),
							placeholder: t("userTypes:displayNamePlaceholder", "e.g., First Name"),
							onTranslationCreated: invalidateI18nCache,
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
					/* @__PURE__ */ jsxs(Box, {
						sx: {
							mt: 2.5,
							display: "flex",
							gap: 3
						},
						children: [
							/* @__PURE__ */ jsx(Tooltip, {
								title: t("userTypes:tooltips.required"),
								placement: "top",
								arrow: true,
								children: /* @__PURE__ */ jsx(FormControlLabel, {
									control: /* @__PURE__ */ jsx(Checkbox, {
										checked: property.required,
										onChange: (e) => handlePropertyChange(property.id, "required", e.target.checked)
									}),
									label: /* @__PURE__ */ jsxs(Stack, {
										direction: "row",
										alignItems: "center",
										spacing: .5,
										children: [/* @__PURE__ */ jsx("span", { children: t("common:form.required") }), /* @__PURE__ */ jsx(Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							}),
							supportsUnique(property.type) && /* @__PURE__ */ jsx(Tooltip, {
								title: t("userTypes:tooltips.unique"),
								placement: "top",
								arrow: true,
								children: /* @__PURE__ */ jsx(FormControlLabel, {
									control: /* @__PURE__ */ jsx(Checkbox, {
										checked: property.unique,
										disabled: property.credential,
										onChange: (e) => handlePropertyChange(property.id, "unique", e.target.checked)
									}),
									label: /* @__PURE__ */ jsxs(Stack, {
										direction: "row",
										alignItems: "center",
										spacing: .5,
										children: [/* @__PURE__ */ jsx("span", { children: t("userTypes:unique") }), /* @__PURE__ */ jsx(Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							}),
							supportsCredential(property.type) && /* @__PURE__ */ jsx(Tooltip, {
								title: t("userTypes:tooltips.credential"),
								placement: "top",
								arrow: true,
								children: /* @__PURE__ */ jsx(FormControlLabel, {
									control: /* @__PURE__ */ jsx(Checkbox, {
										checked: property.credential,
										onChange: (e) => handlePropertyChange(property.id, "credential", e.target.checked)
									}),
									label: /* @__PURE__ */ jsxs(Stack, {
										direction: "row",
										alignItems: "center",
										spacing: .5,
										children: [/* @__PURE__ */ jsx("span", { children: t("userTypes:credential") }), /* @__PURE__ */ jsx(Info, {
											size: 14,
											color: "inherit"
										})]
									})
								})
							})
						]
					}),
					property.credential && /* @__PURE__ */ jsx(Alert, {
						severity: "info",
						variant: "outlined",
						sx: { mt: 2 },
						children: t("userTypes:credentialHint")
					}),
					property.type === "string" && /* @__PURE__ */ jsxs(FormControl, {
						fullWidth: true,
						sx: { mt: 2.5 },
						children: [/* @__PURE__ */ jsx(FormLabel, { children: t("userTypes:regexPattern") }), /* @__PURE__ */ jsx(TextField, {
							value: property.regex,
							onChange: (e) => handlePropertyChange(property.id, "regex", e.target.value),
							placeholder: t("userTypes:regexPlaceholder"),
							size: "small"
						})]
					}),
					property.type === "enum" && /* @__PURE__ */ jsxs(FormControl, {
						fullWidth: true,
						sx: { mt: 2.5 },
						children: [
							/* @__PURE__ */ jsx(FormLabel, { children: t("userTypes:enumValues") }),
							/* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "flex",
									gap: 1
								},
								children: [/* @__PURE__ */ jsx(TextField, {
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
								}), /* @__PURE__ */ jsx(Button, {
									variant: "outlined",
									onClick: () => handleAddEnumValue(property.id),
									children: t("common:actions.add")
								})]
							}),
							property.enum.length > 0 && /* @__PURE__ */ jsx(Box, {
								sx: {
									mt: 1.5,
									display: "flex",
									flexWrap: "wrap",
									gap: 1
								},
								children: property.enum.map((val) => /* @__PURE__ */ jsx(Chip, {
									label: val,
									size: "small",
									onDelete: () => handleRemoveEnumValue(property.id, val)
								}, val))
							})
						]
					})
				]
			}, property.id)),
			/* @__PURE__ */ jsx(Button, {
				variant: "outlined",
				startIcon: /* @__PURE__ */ jsx(Plus, { size: 16 }),
				onClick: handleAddProperty,
				fullWidth: true,
				sx: {
					py: 1.5,
					borderStyle: "dashed",
					"&:hover": { borderStyle: "dashed" }
				},
				children: t("userTypes:addProperty")
			}),
			eligibleDisplayProperties.length > 0 && /* @__PURE__ */ jsx(Paper, {
				variant: "outlined",
				sx: {
					px: 3,
					py: 3,
					borderRadius: 2
				},
				children: /* @__PURE__ */ jsxs(FormControl, {
					fullWidth: true,
					children: [
						/* @__PURE__ */ jsx(FormLabel, { children: t("userTypes:displayAttribute", "Display Attribute") }),
						/* @__PURE__ */ jsx(Typography, {
							variant: "body2",
							color: "text.secondary",
							sx: { mb: 1 },
							children: t("userTypes:displayAttributeHint", "The property used to display user names in listings and references")
						}),
						/* @__PURE__ */ jsxs(Select, {
							value: displayAttribute,
							onChange: (e) => handleDisplayAttributeChange(e.target.value),
							size: "small",
							displayEmpty: true,
							renderValue: (selected) => {
								const value = typeof selected === "string" ? selected : "";
								if (!value) return /* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									color: "text.secondary",
									children: t("userTypes:selectDisplayAttribute", "Select a display attribute")
								});
								const matchedProp = eligibleDisplayProperties.find((p) => p.name.trim() === value);
								const resolved = matchedProp?.displayName ? resolveDisplayName(matchedProp.displayName) : "";
								return resolved && resolved !== value ? `${resolved} (${value})` : value;
							},
							children: [/* @__PURE__ */ jsx(MenuItem, {
								value: "",
								children: /* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									color: "text.secondary",
									children: t("common:none", "None")
								})
							}), eligibleDisplayProperties.map((prop) => {
								const name = prop.name.trim();
								const resolved = prop.displayName ? resolveDisplayName(prop.displayName) : "";
								return /* @__PURE__ */ jsx(MenuItem, {
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
export { ConfigureProperties as default };