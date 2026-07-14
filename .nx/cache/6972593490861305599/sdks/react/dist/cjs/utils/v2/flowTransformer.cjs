const require_resolveTranslationsInArray = require('./resolveTranslationsInArray.cjs');

//#region src/utils/v2/flowTransformer.ts
/**
* Create a mapping from ref to identifier based on data.inputs array.
* This handles cases where meta.components use 'ref' to reference inputs,
* and data.inputs contain the actual 'identifier' field.
*
* @param response - The flow response object
* @returns Map of ref to identifier
*/
const createInputRefMapping = (response) => {
	const mapping = /* @__PURE__ */ new Map();
	if (response?.data?.inputs && Array.isArray(response.data.inputs)) response.data.inputs.forEach((input) => {
		if (input.ref && input.identifier) mapping.set(input.ref, input.identifier);
	});
	return mapping;
};
/**
* Create a mapping from action ref to nextNode based on data.actions array.
* This handles cases where meta.components reference actions by ref,
* and data.actions contain the actual nextNode field for routing.
*
* @param response - The flow response object
* @returns Map of action ref to nextNode
*/
const createActionRefMapping = (response) => {
	const mapping = /* @__PURE__ */ new Map();
	if (response?.data?.actions && Array.isArray(response.data.actions)) response.data.actions.forEach((action) => {
		if (action.ref && action.nextNode) mapping.set(action.ref, action.nextNode);
	});
	return mapping;
};
/**
* Apply input ref mapping to components recursively.
* This ensures that component.ref values are mapped to the correct identifier
* from data.inputs, enabling proper form submission.
*
* @param components - Array of components to transform
* @param refMapping - Map of ref to identifier
* @param actionMapping - Map of action ref to nextNode
* @param inputsData - Array of input data for resolving SELECT options
* @returns Transformed components with correct identifiers and action references
*/
const applyInputRefMapping = (components, refMapping, actionMapping, inputsData = []) => components.map((component) => {
	const transformedComponent = { ...component };
	if (transformedComponent.ref && refMapping.has(transformedComponent.ref)) transformedComponent.ref = refMapping.get(transformedComponent.ref);
	if (transformedComponent.type === "SELECT" && component.id) {
		const inputData = inputsData.find((input) => input.ref === component.id);
		if (inputData?.options) transformedComponent.options = inputData.options.map((opt) => {
			if (typeof opt === "string") return {
				label: opt,
				value: opt
			};
			const value = typeof opt.value === "object" ? JSON.stringify(opt.value) : String(opt.value || "");
			return {
				label: typeof opt.label === "object" ? JSON.stringify(opt.label) : String(opt.label || value),
				value
			};
		});
	}
	if (transformedComponent.type === "ACTION" && transformedComponent.id && actionMapping.has(transformedComponent.id)) transformedComponent.actionRef = actionMapping.get(transformedComponent.id);
	if (transformedComponent.components && Array.isArray(transformedComponent.components)) transformedComponent.components = applyInputRefMapping(transformedComponent.components, refMapping, actionMapping, inputsData);
	return transformedComponent;
});
/**
* Transform and resolve translations in components from flow response.
* This function extracts components from the response meta structure and optionally resolves
* any translation strings within them. It also handles mapping of input refs to identifiers
* and action refs to nextNode values.
*
* @param response - The flow response object containing components in meta structure
* @param t - Translation function from useTranslation hook
* @param resolveTranslations - Whether to resolve translation strings or keep them as i18n keys (default: true)
* @returns Array of flow components with resolved or unresolved translations
*/
const transformComponents = (response, t, resolveTranslations = true, meta) => {
	if (!response?.data?.meta?.components) return [];
	let { components } = response.data.meta;
	const refMapping = createInputRefMapping(response);
	const actionMapping = createActionRefMapping(response);
	const inputsData = response?.data?.inputs || [];
	if (refMapping.size > 0 || actionMapping.size > 0 || inputsData.length > 0) components = applyInputRefMapping(components, refMapping, actionMapping, inputsData);
	return resolveTranslations ? require_resolveTranslationsInArray.default(components, t, void 0, meta) : components;
};
/**
* Extract error message from flow error response.
*
* Resolution order:
* 1. Structured `error` object: try i18n lookup via `t(error.message.key)`.
* 2. Fallback to `defaultValue` from `message`, then `description`.
* 3. Standard `Error.message`.
* 4. Generic translated fallback via `defaultErrorKey`.
*/
const extractErrorMessage = (error, t, defaultErrorKey = "errors.flow.generic") => {
	if (error && typeof error === "object" && error.error) {
		const flowError = error.error;
		if (flowError?.message?.key) {
			const translated = t(flowError.message.key);
			if (translated && translated !== flowError.message.key) return translated;
			const systemKey = `system.${flowError.message.key}`;
			const systemTranslated = t(systemKey);
			if (systemTranslated && systemTranslated !== systemKey) return systemTranslated;
		}
		const fallback = flowError?.message?.defaultValue ?? flowError?.description?.defaultValue;
		if (fallback) return fallback;
	}
	if (error && typeof error === "object" && error.failureReason) return error.failureReason;
	if (error instanceof Error && error.message) return error.message;
	return t(defaultErrorKey);
};
/**
* Check if a response is an error response and extract the error message.
* This function identifies error responses by checking for ERROR status and failure reasons.
*
* @param response - The flow response to check
* @param t - Translation function for error messages
* @param defaultErrorKey - Default translation key for generic errors
* @returns Error message string if response is an error, null otherwise
*/
const checkForErrorResponse = (response, t, defaultErrorKey = "errors.flow.generic") => {
	if (response?.flowStatus === "ERROR") return extractErrorMessage(response, t, defaultErrorKey);
	return null;
};
/**
* Generic flow response normalizer that handles both success and error responses.
* This is the main transformer function that should be used by all flow components.
*
* @param response - The raw flow response from the API
* @param t - Translation function from useTranslation hook
* @param options - Configuration options for transformation behavior
* @returns Normalized flow response with executionId and transformed components
* @throws {any} The original response if it's an error and throwOnError is true
*/
const normalizeFlowResponse = (response, t, options = {}, meta) => {
	const { throwOnError = true, defaultErrorKey = "errors.flow.generic", resolveTranslations = true } = options;
	if (checkForErrorResponse(response, t, defaultErrorKey) && throwOnError) throw response;
	const additionalData = response?.data?.additionalData ?? {};
	if (typeof additionalData["consentPrompt"] === "string") try {
		const parsed = JSON.parse(additionalData["consentPrompt"]);
		additionalData["consentPrompt"] = { purposes: Array.isArray(parsed) ? parsed : [] };
	} catch {}
	return {
		additionalData,
		components: transformComponents(response, t, resolveTranslations, meta),
		executionId: response.executionId
	};
};

//#endregion
exports.extractErrorMessage = extractErrorMessage;
exports.normalizeFlowResponse = normalizeFlowResponse;
//# sourceMappingURL=flowTransformer.cjs.map