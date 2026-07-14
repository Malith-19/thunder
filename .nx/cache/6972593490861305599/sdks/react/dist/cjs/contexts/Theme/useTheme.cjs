const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_ThemeContext = require('./ThemeContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/Theme/useTheme.ts
const useTheme = () => {
	const context = (0, react.useContext)(require_ThemeContext.default);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
var useTheme_default = useTheme;

//#endregion
exports.default = useTheme_default;
//# sourceMappingURL=useTheme.cjs.map