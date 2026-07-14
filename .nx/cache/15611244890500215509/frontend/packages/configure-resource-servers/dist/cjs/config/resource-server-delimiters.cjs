
//#region src/config/resource-server-delimiters.ts
const DELIMITER_OPTIONS = [
	{
		value: ":",
		labelKey: "resourceServers:create.separator.colon",
		labelFallback: "Colon ( : )"
	},
	{
		value: ".",
		labelKey: "resourceServers:create.separator.dot",
		labelFallback: "Dot ( . )"
	},
	{
		value: "/",
		labelKey: "resourceServers:create.separator.slash",
		labelFallback: "Slash ( / )"
	},
	{
		value: "-",
		labelKey: "resourceServers:create.separator.hyphen",
		labelFallback: "Hyphen ( - )"
	},
	{
		value: "_",
		labelKey: "resourceServers:create.separator.underscore",
		labelFallback: "Underscore ( _ )"
	}
];

//#endregion
exports.DELIMITER_OPTIONS = DELIMITER_OPTIONS;