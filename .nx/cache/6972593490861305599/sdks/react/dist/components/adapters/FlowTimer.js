import Typography_default from "../primitives/Typography/Typography.js";
import { useEffect, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";

//#region src/components/adapters/FlowTimer.tsx
/**
* Flow countdown timer component.
*
* Displays a countdown from the given number of seconds. When the time expires,
* shows "Timed out". Returns null if expiresIn <= 0.
*/
const FlowTimer = ({ expiresIn = 0, textTemplate = "Time remaining: {time}", children }) => {
	const [remaining, setRemaining] = useState(expiresIn > 0 ? expiresIn : 0);
	useEffect(() => {
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
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		formattedTime,
		isExpired,
		remaining
	}) });
	return /* @__PURE__ */ jsx(Typography_default, {
		variant: "body2",
		children: isExpired ? "Timed out" : textTemplate.replace("{time}", formattedTime)
	});
};
var FlowTimer_default = FlowTimer;

//#endregion
export { FlowTimer_default as default };
//# sourceMappingURL=FlowTimer.js.map