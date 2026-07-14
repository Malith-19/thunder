import useGetAgentType from "../api/useGetAgentType.js";
import useUpdateAgentType from "../api/useUpdateAgentType.js";
import EditSchemaSettings from "../components/edit-agent-type/schema-settings/EditSchemaSettings.js";
import { useToast } from "@thunderid/contexts";
import { useTranslation } from "react-i18next";
import { PageLoadingAnimation, UnsavedChangesBar } from "@thunderid/components";
import { useLogger } from "@thunderid/logger/react";
import { Alert, Button, PageContent, PageTitle, Stack, Typography } from "@wso2/oxygen-ui";
import { ArrowLeft } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";

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
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("ViewAgentTypePage");
	const { showToast } = useToast();
	const { id } = useParams();
	const listUrl = "/agents";
	const { data: agentType, isLoading, error: fetchError } = useGetAgentType(id);
	const updateAgentTypeMutation = useUpdateAgentType();
	const [editedProperties, setEditedProperties] = useState(null);
	const baseProperties = useMemo(() => agentType ? convertSchemaToProperties(agentType.schema) : [], [agentType]);
	const effectiveProperties = editedProperties ?? baseProperties;
	const effectiveName = agentType?.name ?? "";
	const hasChanges = useMemo(() => editedProperties !== null, [editedProperties]);
	const handleBack = async () => {
		await navigate(listUrl);
	};
	const handlePropertiesChange = useCallback((newProperties) => {
		setEditedProperties(newProperties);
	}, []);
	const handleReset = useCallback(() => {
		setEditedProperties(null);
		updateAgentTypeMutation.reset();
	}, [updateAgentTypeMutation]);
	const handleSave = useCallback(async () => {
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
	if (isLoading) return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	if (fetchError) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "error",
		sx: { mb: 2 },
		children: fetchError.message ?? t("agentTypes:edit.loadError", "Failed to load agent type information")
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("agentTypes:edit.back", "Back to Agents")
	})] });
	if (!agentType) return /* @__PURE__ */ jsxs(PageContent, { children: [/* @__PURE__ */ jsx(Alert, {
		severity: "warning",
		sx: { mb: 2 },
		children: t("agentTypes:edit.notFound", "Agent type not found")
	}), /* @__PURE__ */ jsx(Button, {
		onClick: () => {
			handleBack().catch(() => null);
		},
		startIcon: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
		children: t("agentTypes:edit.back", "Back to Agents")
	})] });
	return /* @__PURE__ */ jsxs(PageContent, { children: [
		/* @__PURE__ */ jsxs(PageTitle, { children: [/* @__PURE__ */ jsx(PageTitle.BackButton, {
			component: /* @__PURE__ */ jsx(Link, { to: listUrl }),
			children: t("agentTypes:edit.back", "Back to Agents")
		}), /* @__PURE__ */ jsx(PageTitle.Header, { children: /* @__PURE__ */ jsx(Stack, {
			direction: "row",
			alignItems: "center",
			spacing: 1,
			mb: 1,
			children: /* @__PURE__ */ jsx(Typography, {
				variant: "h3",
				children: t("agentTypes:edit.title", "Agent Schema")
			})
		}) })] }),
		/* @__PURE__ */ jsx(Stack, {
			spacing: 3,
			mt: 3,
			children: /* @__PURE__ */ jsx(EditSchemaSettings, {
				properties: effectiveProperties,
				onPropertiesChange: handlePropertiesChange,
				agentTypeName: effectiveName
			})
		}),
		hasChanges && /* @__PURE__ */ jsx(UnsavedChangesBar, {
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
export { ViewAgentTypePage as default };