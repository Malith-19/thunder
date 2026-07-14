const require_ArrowLeftRight = require('./ArrowLeftRight.cjs');
const require_ArrowRightLeft = require('./ArrowRightLeft.cjs');

//#region src/components/primitives/Icons/flowIconRegistry.tsx
/**
* Registry of icon components keyed by their lucide-compatible name.
* Add new icons here as needed by flow definitions.
*/
const flowIconRegistry = {
	ArrowLeftRight: require_ArrowLeftRight.default,
	ArrowRightLeft: require_ArrowRightLeft.default
};
var flowIconRegistry_default = flowIconRegistry;

//#endregion
exports.default = flowIconRegistry_default;
//# sourceMappingURL=flowIconRegistry.cjs.map