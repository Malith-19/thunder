const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_Typography = require('../primitives/Typography/Typography.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/FlowTimer.tsx
/**
* Flow countdown timer component.
*
* Displays a countdown from the given number of seconds. When the time expires,
* shows "Timed out". Returns null if expiresIn <= 0.
*/
const FlowTimer = ({ expiresIn = 0, textTemplate = "Time remaining: {time}", children }) => {
	const [remaining, setRemaining] = (0, react.useState)(expiresIn > 0 ? expiresIn : 0);
	(0, react.useEffect)(() => {
		if (expiresIn <= 0) return;
		setRemaining(expiresIn);
		const interval = setInterval(() => {
			setRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(interval);
	}, [expiresIn]);
	if (expiresIn <= 0) return null;
	const formatTime = (seconds) => {
		if (seconds <= 0) return "Timed out";
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
	const isExpired = remaining <= 0;
	const formattedTime = formatTime(remaining);
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children({
		formattedTime,
		isExpired,
		remaining
	}) });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		variant: "body2",
		children: isExpired ? "Timed out" : textTemplate.replace("{time}", formattedTime)
	});
};
var FlowTimer_default = FlowTimer;

//#endregion
exports.default = FlowTimer_default;
//# sourceMappingURL=FlowTimer.cjs.map