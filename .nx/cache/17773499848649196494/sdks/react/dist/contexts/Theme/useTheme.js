import ThemeContext_default from "./ThemeContext.js";
import { useContext } from "react";

//#region src/contexts/Theme/useTheme.ts
const useTheme = () => {
	const context = useContext(ThemeContext_default);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
var useTheme_default = useTheme;

//#endregion
export { useTheme_default as default };
//# sourceMappingURL=useTheme.js.map