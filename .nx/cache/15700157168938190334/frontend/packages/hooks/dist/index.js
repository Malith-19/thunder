import { TEMPLATE_LITERAL_REGEX, isI18nTemplatePattern, parseTemplateLiteral } from "@thunderid/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createLogger } from "@thunderid/logger";
import { useTranslation } from "react-i18next";

//#region src/useTemplateLiteralResolver.ts
/**
* React hook to resolve template literals in strings
*
* This hook returns a resolve function that can parse strings containing template literals
* wrapped in double braces and extract the keys for use with translation functions.
*
* Supported patterns:
* - `{{ t(signin:heading) }}` -> extracts "signin:heading" for translation
* - `{{ context(user:name) }}` -> extracts "user:name" for context resolution (future)
*
* @returns Object containing the resolve function
*
* @example
* ```typescript
* const { resolve } = useTemplateLiteralResolver();
* const output = resolve('{{ t(signin:heading) }}'); // "signin:heading"
*
* const { t } = useTranslation();
* const translatedText = t(output); // Use with your translation function
* ```
*
* @example
* ```typescript
* // For non-template strings
* const { resolve } = useTemplateLiteralResolver();
* const output = resolve('plain text'); // 'plain text'
* ```
*/
function useTemplateLiteralResolver() {
	return {
		resolve: useMemo(() => (value, handlers) => {
			if (!value || typeof value !== "string") return;
			const match = TEMPLATE_LITERAL_REGEX.exec(value);
			if (!match) return value;
			const parsed = parseTemplateLiteral(match[1].trim());
			if (parsed.key && handlers?.[parsed.type]) return handlers[parsed.type](parsed.key);
			return parsed.key ?? value;
		}, []),
		resolveAll: useMemo(() => (value, handlers) => {
			if (!value || typeof value !== "string") return;
			return value.replace(/\{\{\s*([^}]+)\s*\}\}/g, (fullMatch, inner) => {
				const parsed = parseTemplateLiteral(inner.trim());
				if (parsed.key && handlers?.[parsed.type]) return handlers[parsed.type](parsed.key);
				return fullMatch;
			});
		}, [])
	};
}

//#endregion
//#region src/useResolveDisplayName.ts
/**
* React hook that provides a memoized function for resolving display names,
* handling both plain text and i18n template patterns (e.g. `{{t(namespace:key)}}`).
*
* For i18n patterns, it checks whether the translation actually resolved to a
* meaningful value (not just the raw key) before returning it.
*
* @param options - Options containing template literal handlers.
* @returns Object containing the resolveDisplayName function.
*
* @example
* ```tsx
* const { t } = useTranslation();
* const { resolveDisplayName } = useResolveDisplayName({ handlers: { t } });
* resolveDisplayName('First Name');          // "First Name"
* resolveDisplayName('{{t(custom:fname)}}'); // "First Name" (if translation exists)
* resolveDisplayName('{{t(custom:fname)}}'); // "" (if translation key is missing)
* ```
*/
function useResolveDisplayName({ handlers }) {
	const { resolve } = useTemplateLiteralResolver();
	return { resolveDisplayName: useCallback((displayName) => {
		if (!displayName.trim()) return "";
		if (isI18nTemplatePattern(displayName)) {
			const resolved = resolve(displayName, handlers);
			const rawKey = resolve(displayName);
			const keyWithoutNs = rawKey?.includes(":") ? rawKey.split(":").pop() : rawKey;
			if (!resolved || resolved === rawKey || resolved === keyWithoutNs) return "";
			return resolved;
		}
		return displayName;
	}, [handlers, resolve]) };
}

//#endregion
//#region src/useCopyToClipboard.ts
/**
* Custom hook to copy text to clipboard with fallback support
*
* Provides a copy function that uses the modern Clipboard API with
* a fallback to document.execCommand for older browsers.
* Manages the copied state that automatically resets after a delay.
*
* @param options - Configuration options for the hook
* @returns Object containing the copied state and copy function
*
* @example
* ```typescript
* const { copied, copy } = useCopyToClipboard({
*   resetDelay: 2000,
*   onCopy: () => console.log('Copied!')
* });
*
* // In your component
* <button onClick={() => copy('Hello World')}>
*   {copied ? 'Copied!' : 'Copy'}
* </button>
* ```
*/
function useCopyToClipboard(options = {}) {
	const { resetDelay = 2e3, onCopy } = options;
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef(null);
	/**
	*  Clean up timeout on unmount to prevent memory leaks.
	*/
	useEffect(() => () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);
	return {
		copied,
		copy: useCallback(async (text) => {
			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				onCopy?.();
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setCopied(false);
				}, resetDelay);
			} catch {
				const textArea = document.createElement("textarea");
				textArea.value = text;
				textArea.style.position = "fixed";
				textArea.style.opacity = "0";
				document.body.appendChild(textArea);
				textArea.select();
				try {
					document.execCommand("copy");
					setCopied(true);
					onCopy?.();
					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					timeoutRef.current = setTimeout(() => {
						setCopied(false);
					}, resetDelay);
				} catch {}
				document.body.removeChild(textArea);
			}
		}, [resetDelay, onCopy])
	};
}

//#endregion
//#region src/useDataGridLocaleText.ts
const logger = createLogger({ level: "warn" });
/**
* Helper function to safely extract and cast function values from translation resources
*
* @template T - The function type to cast to
* @param commonBundle - The common namespace resource bundle
* @param key - The key of the function in the resource bundle (e.g., 'dataTable.toolbarFiltersTooltipActive')
* @returns The function cast to type T, or undefined if not found or invalid
*
* @remarks
* This helper provides a consistent way to handle type assertions for function values
* that cannot be accessed via i18next's t() function. It performs runtime validation
* to ensure the value is actually a function before casting, preventing runtime errors
* if the translation resource structure changes.
*
* Expected common bundle structure (flat with dot notation keys):
* - Keys should map to either string values (handled by i18next t() function)
* - Or function values that accept parameters and return strings
*
* @example
* ```typescript
* // Valid function in translation resource
* {
*   'dataTable.toolbarFiltersTooltipActive': (count: number) => `${count} active filter${count !== 1 ? 's' : ''}`
* }
* ```
*/
function getTranslationFunction(commonBundle, key) {
	const value = commonBundle[key];
	if (typeof value === "function") return value;
	if (value !== void 0) logger.warn(`Translation key '${key}' exists but is not a function. Expected a function, got ${typeof value}.`);
}
/**
* Custom hook to get localized text for MUI DataGrid
* @returns Localized text object for DataGrid
*/
function useDataGridLocaleText() {
	const { t, i18n } = useTranslation();
	return useMemo(() => {
		const commonBundle = i18n.getResourceBundle(i18n.language, "common") ?? {};
		return {
			noRowsLabel: t("common:dataTable.noRowsLabel"),
			noResultsOverlayLabel: t("common:dataTable.noResultsOverlayLabel"),
			noColumnsOverlayLabel: t("common:dataTable.noColumnsOverlayLabel"),
			noColumnsOverlayManageColumns: t("common:dataTable.noColumnsOverlayManageColumns"),
			toolbarDensity: t("common:dataTable.toolbarDensity"),
			toolbarDensityLabel: t("common:dataTable.toolbarDensityLabel"),
			toolbarDensityCompact: t("common:dataTable.toolbarDensityCompact"),
			toolbarDensityStandard: t("common:dataTable.toolbarDensityStandard"),
			toolbarDensityComfortable: t("common:dataTable.toolbarDensityComfortable"),
			toolbarColumns: t("common:dataTable.toolbarColumns"),
			toolbarColumnsLabel: t("common:dataTable.toolbarColumnsLabel"),
			toolbarFilters: t("common:dataTable.toolbarFilters"),
			toolbarFiltersLabel: t("common:dataTable.toolbarFiltersLabel"),
			toolbarFiltersTooltipHide: t("common:dataTable.toolbarFiltersTooltipHide"),
			toolbarFiltersTooltipShow: t("common:dataTable.toolbarFiltersTooltipShow"),
			toolbarFiltersTooltipActive: getTranslationFunction(commonBundle, "dataTable.toolbarFiltersTooltipActive"),
			toolbarQuickFilterPlaceholder: t("common:dataTable.toolbarQuickFilterPlaceholder"),
			toolbarQuickFilterLabel: t("common:dataTable.toolbarQuickFilterLabel"),
			toolbarQuickFilterDeleteIconLabel: t("common:dataTable.toolbarQuickFilterDeleteIconLabel"),
			toolbarExport: t("common:dataTable.toolbarExport"),
			toolbarExportLabel: t("common:dataTable.toolbarExportLabel"),
			toolbarExportCSV: t("common:dataTable.toolbarExportCSV"),
			toolbarExportPrint: t("common:dataTable.toolbarExportPrint"),
			columnsManagementSearchTitle: t("common:dataTable.columnsManagementSearchTitle"),
			columnsManagementNoColumns: t("common:dataTable.columnsManagementNoColumns"),
			columnsManagementShowHideAllText: t("common:dataTable.columnsManagementShowHideAllText"),
			columnsManagementReset: t("common:dataTable.columnsManagementReset"),
			filterPanelAddFilter: t("common:dataTable.filterPanelAddFilter"),
			filterPanelRemoveAll: t("common:dataTable.filterPanelRemoveAll"),
			filterPanelDeleteIconLabel: t("common:dataTable.filterPanelDeleteIconLabel"),
			filterPanelLogicOperator: t("common:dataTable.filterPanelLogicOperator"),
			filterPanelOperator: t("common:dataTable.filterPanelOperator"),
			filterPanelOperatorAnd: t("common:dataTable.filterPanelOperatorAnd"),
			filterPanelOperatorOr: t("common:dataTable.filterPanelOperatorOr"),
			filterPanelColumns: t("common:dataTable.filterPanelColumns"),
			filterPanelInputLabel: t("common:dataTable.filterPanelInputLabel"),
			filterPanelInputPlaceholder: t("common:dataTable.filterPanelInputPlaceholder"),
			filterOperatorContains: t("common:dataTable.filterOperatorContains"),
			filterOperatorDoesNotContain: t("common:dataTable.filterOperatorDoesNotContain"),
			filterOperatorEquals: t("common:dataTable.filterOperatorEquals"),
			filterOperatorDoesNotEqual: t("common:dataTable.filterOperatorDoesNotEqual"),
			filterOperatorStartsWith: t("common:dataTable.filterOperatorStartsWith"),
			filterOperatorEndsWith: t("common:dataTable.filterOperatorEndsWith"),
			filterOperatorIs: t("common:dataTable.filterOperatorIs"),
			filterOperatorNot: t("common:dataTable.filterOperatorNot"),
			filterOperatorAfter: t("common:dataTable.filterOperatorAfter"),
			filterOperatorOnOrAfter: t("common:dataTable.filterOperatorOnOrAfter"),
			filterOperatorBefore: t("common:dataTable.filterOperatorBefore"),
			filterOperatorOnOrBefore: t("common:dataTable.filterOperatorOnOrBefore"),
			filterOperatorIsEmpty: t("common:dataTable.filterOperatorIsEmpty"),
			filterOperatorIsNotEmpty: t("common:dataTable.filterOperatorIsNotEmpty"),
			filterOperatorIsAnyOf: t("common:dataTable.filterOperatorIsAnyOf"),
			filterValueAny: t("common:dataTable.filterValueAny"),
			filterValueTrue: t("common:dataTable.filterValueTrue"),
			filterValueFalse: t("common:dataTable.filterValueFalse"),
			columnMenuLabel: t("common:dataTable.columnMenuLabel"),
			columnMenuShowColumns: t("common:dataTable.columnMenuShowColumns"),
			columnMenuManageColumns: t("common:dataTable.columnMenuManageColumns"),
			columnMenuFilter: t("common:dataTable.columnMenuFilter"),
			columnMenuHideColumn: t("common:dataTable.columnMenuHideColumn"),
			columnMenuUnsort: t("common:dataTable.columnMenuUnsort"),
			columnMenuSortAsc: t("common:dataTable.columnMenuSortAsc"),
			columnMenuSortDesc: t("common:dataTable.columnMenuSortDesc"),
			columnHeaderFiltersTooltipActive: getTranslationFunction(commonBundle, "dataTable.columnHeaderFiltersTooltipActive"),
			columnHeaderFiltersLabel: t("common:dataTable.columnHeaderFiltersLabel"),
			columnHeaderSortIconLabel: t("common:dataTable.columnHeaderSortIconLabel"),
			footerRowSelected: getTranslationFunction(commonBundle, "dataTable.footerRowSelected"),
			footerTotalRows: t("common:dataTable.footerTotalRows"),
			footerTotalVisibleRows: getTranslationFunction(commonBundle, "dataTable.footerTotalVisibleRows"),
			checkboxSelectionHeaderName: t("common:dataTable.checkboxSelectionHeaderName"),
			checkboxSelectionSelectAllRows: t("common:dataTable.checkboxSelectionSelectAllRows"),
			checkboxSelectionUnselectAllRows: t("common:dataTable.checkboxSelectionUnselectAllRows"),
			checkboxSelectionSelectRow: t("common:dataTable.checkboxSelectionSelectRow"),
			checkboxSelectionUnselectRow: t("common:dataTable.checkboxSelectionUnselectRow"),
			booleanCellTrueLabel: t("common:dataTable.booleanCellTrueLabel"),
			booleanCellFalseLabel: t("common:dataTable.booleanCellFalseLabel"),
			actionsCellMore: t("common:dataTable.actionsCellMore"),
			pinToLeft: t("common:dataTable.pinToLeft"),
			pinToRight: t("common:dataTable.pinToRight"),
			unpin: t("common:dataTable.unpin"),
			treeDataGroupingHeaderName: t("common:dataTable.treeDataGroupingHeaderName"),
			treeDataExpand: t("common:dataTable.treeDataExpand"),
			treeDataCollapse: t("common:dataTable.treeDataCollapse"),
			groupingColumnHeaderName: t("common:dataTable.groupingColumnHeaderName"),
			groupColumn: getTranslationFunction(commonBundle, "dataTable.groupColumn"),
			unGroupColumn: getTranslationFunction(commonBundle, "dataTable.unGroupColumn"),
			detailPanelToggle: t("common:dataTable.detailPanelToggle"),
			expandDetailPanel: t("common:dataTable.expandDetailPanel"),
			collapseDetailPanel: t("common:dataTable.collapseDetailPanel"),
			paginationRowsPerPage: t("common:dataTable.paginationRowsPerPage"),
			paginationDisplayedRows: getTranslationFunction(commonBundle, "dataTable.paginationDisplayedRows"),
			rowReorderingHeaderName: t("common:dataTable.rowReorderingHeaderName"),
			aggregationMenuItemHeader: t("common:dataTable.aggregationMenuItemHeader"),
			aggregationFunctionLabelSum: t("common:dataTable.aggregationFunctionLabelSum"),
			aggregationFunctionLabelAvg: t("common:dataTable.aggregationFunctionLabelAvg"),
			aggregationFunctionLabelMin: t("common:dataTable.aggregationFunctionLabelMin"),
			aggregationFunctionLabelMax: t("common:dataTable.aggregationFunctionLabelMax"),
			aggregationFunctionLabelSize: t("common:dataTable.aggregationFunctionLabelSize")
		};
	}, [t, i18n]);
}

//#endregion
export { useCopyToClipboard, useDataGridLocaleText, useResolveDisplayName, useTemplateLiteralResolver };