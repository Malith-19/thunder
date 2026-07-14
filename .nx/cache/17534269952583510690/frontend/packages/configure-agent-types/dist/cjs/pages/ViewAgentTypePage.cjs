const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useGetAgentType = require('../api/useGetAgentType.cjs');
const require_useUpdateAgentType = require('../api/useUpdateAgentType.cjs');
const require_EditSchemaSettings = require('../components/edit-agent-type/schema-settings/EditSchemaSettings.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/pages/ViewAgentTypePage.tsx
/**
* Convert API schema to editable property inputs.
*/
function convertSchemaToProperties(schema) {
	return Object.entries(schema).map(([key, value], index) => ({
		id: `${index}`,
		name: key,
		displayName: "displayName" in value ? value.displayName ?? "" : "",
		type: value.type === "string" && "enum" in value && Array.isArray(value.enum) && value.enum.length > 0 ? "enum" : value.type,
		required: value.required ?? false,
		unique: "unique" in value ? value.unique ?? false : false,
		credential: "credential" in value ? value.credential ?? false : false,
		enum: "enum" in value ? value.enum ?? [] : [],
		regex: "regex" in value ? value.regex ?? "" : "",
		..."items" in value ? { items: value.items } : {},
		..."properties" in value ? { properties: value.properties } : {}
	}));
}
/**
* Convert editable property inputs back to API schema format.
*/
function convertPropertiesToSchema(properties) {
	const schema = {};
	properties.filter((prop) => prop.name.trim()).forEach((prop) => {
		const propDef = {
			type: prop.type === "enum" ? "string" : prop.type,
			required: prop.required,
			...prop.displayName.trim() ? { displayName: prop.displayName.trim() } : {}
		};
		if (prop.unique) propDef.unique = true;
		if ((prop.type === "string" || prop.type === "number" || prop.type === "enum") && prop.credential) propDef.credential = true;
		if (prop.type === "string" || prop.type === "enum") {
			if (prop.enum.length > 0) propDef.enum = prop.enum;
			if (prop.regex.trim()) propDef.regex = prop.regex;
		}
		if (prop.type === "array") propDef.items = prop.items ?? { type: "string" };
		else if (prop.type === "object") propDef.properties = prop.properties ?? {};
		schema[prop.name.trim()] = propDef;
	});
	return schema;
}
function ViewAgentTypePage() {
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("ViewAgentTypePage");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const { id } = (0, react_router.useParams)();
	const listUrl = "/agents";
	const { data: agentType, isLoading, error: fetchError } = require_useGetAgentType.default(id);
	const updateAgentTypeMutation = require_useUpdateAgentType.default();
	const [editedProperties, setEditedProperties] = (0, react.useState)(null);
	const baseProperties = (0, react.useMemo)(() => agentType ? convertSchemaToProperties(agentType.schema) : [], [agentType]);
	const effectiveProperties = editedProperties ?? baseProperties;
	const effectiveName = agentType?.name ?? "";
	const hasChanges = (0, react.useMemo)(() => editedProperties !== null, [editedProperties]);
	const handleBack = async () => {
		await navigate(listUrl);
	};
	const handlePropertiesChange = (0, react.useCallback)((newProperties) => {
		setEditedProperties(newProperties);
	}, []);
	const handleReset = (0, react.useCallback)(() => {
		setEditedProperties(null);
		updateAgentTypeMutation.reset();
	}, [updateAgentTypeMutation]);
	const handleSave = (0, react.useCallback)(async () => {
		if (!id || !agentType) return;
		const name = agentType.name.trim();
		const ouId = agentType.ouId.trim();
		const trimmedNames = effectiveProperties.filter((p) => p.name.trim()).map((p) => p.name.trim());
		const duplicates = trimmedNames.filter((n, i) => trimmedNames.indexOf(n) !== i);
		if (duplicates.length > 0) {
			showToast(t("agentTypes:validationErrors.duplicateProperties", { duplicates: [...new Set(duplicates)].join(", ") }), "error");
			return;
		}
		const schema = convertPropertiesToSchema(effectiveProperties);
		try {
			const preservedSystemAttributes = agentType.systemAttributes?.display ? { systemAttributes: { display: agentType.systemAttributes.display } } : {};
			await updateAgentTypeMutation.mutateAsync({
				agentTypeId: id,
				data: {
					name,
					ouId,
					...preservedSystemAttributes,
					schema
				}
			});
			setEditedProperties(null);
		} catch (err) {
			logger.error("Failed to update agent type", { error: err });
			showToast(err instanceof Error ? err.message : t("agentTypes:edit.saveError", "Failed to save agent type"), "error");
		}
	}, [
		id,
		agentType,
		effectiveProperties,
		updateAgentTypeMutation,
		logger,
		showToast,
		t
	]);
	if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			minHeight: "400px"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, {})
	});
	if (fetchError) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: fetchError.message ?? t("agentTypes:edit.loadError", "Failed to load agent type information")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("agentTypes:edit.back", "Back to Agents")
	})] });
	if (!agentType) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("agentTypes:edit.notFound", "Agent type not found")
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 }),
		children: t("agentTypes:edit.back", "Back to Agents")
	})] });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageContent, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.BackButton, {
			component: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.Link, { to: listUrl }),
			children: t("agentTypes:edit.back", "Back to Agents")
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
			direction: "row",
			alignItems: "center",
			spacing: 1,
			mb: 1,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "h3",
				children: t("agentTypes:edit.title", "Agent Schema")
			})
		}) })] }),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Stack, {
			spacing: 3,
			mt: 3,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EditSchemaSettings.default, {
				properties: effectiveProperties,
				onPropertiesChange: handlePropertiesChange,
				agentTypeName: effectiveName
			})
		}),
		hasChanges && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.UnsavedChangesBar, {
			message: t("agentTypes:edit.unsavedChanges", "You have unsaved changes"),
			resetLabel: t("common:actions.reset", "Reset"),
			saveLabel: t("common:actions.save", "Save"),
			savingLabel: t("common:status.saving", "Saving..."),
			isSaving: updateAgentTypeMutation.isPending,
			onReset: handleReset,
			onSave: () => {
				handleSave().catch(() => null);
			}
		})
	] });
}

//#endregion
exports.default = ViewAgentTypePage;