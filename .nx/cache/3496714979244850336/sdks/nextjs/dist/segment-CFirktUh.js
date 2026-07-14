import { f as __commonJS } from "./dynamic-rendering-DlX6qWhq.js";

//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/segment.js
var require_segment = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/segment.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		DEFAULT_SEGMENT_KEY: function() {
			return DEFAULT_SEGMENT_KEY;
		},
		PAGE_SEGMENT_KEY: function() {
			return PAGE_SEGMENT_KEY;
		},
		addSearchParamsIfPageSegment: function() {
			return addSearchParamsIfPageSegment;
		},
		isGroupSegment: function() {
			return isGroupSegment;
		},
		isParallelRouteSegment: function() {
			return isParallelRouteSegment;
		}
	});
	function isGroupSegment(segment) {
		return segment[0] === "(" && segment.endsWith(")");
	}
	function isParallelRouteSegment(segment) {
		return segment.startsWith("@") && segment !== "@children";
	}
	function addSearchParamsIfPageSegment(segment, searchParams) {
		if (segment.includes(PAGE_SEGMENT_KEY)) {
			const stringifiedQuery = JSON.stringify(searchParams);
			return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
		}
		return segment;
	}
	const PAGE_SEGMENT_KEY = "__PAGE__";
	const DEFAULT_SEGMENT_KEY = "__DEFAULT__";
}) });

//#endregion
export { require_segment as t };