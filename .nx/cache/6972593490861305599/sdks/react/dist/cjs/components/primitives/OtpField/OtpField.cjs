const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_FormControl = require('../FormControl/FormControl.cjs');
const require_InputLabel = require('../InputLabel/InputLabel.cjs');
const require_OtpField_styles = require('./OtpField.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/OtpField/OtpField.tsx
const OtpField = ({ label, error, className, required, disabled, helperText, length = 6, value = "", onChange, onComplete, type = "text", placeholder = "", style = {}, autoFocus = false, pattern }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_OtpField_styles.default(theme, colorScheme, !!disabled, !!error, length);
	const [otp, setOtp] = (0, react.useState)(Array(length).fill(""));
	const inputRefs = (0, react.useRef)([]);
	(0, react.useEffect)(() => {
		inputRefs.current = inputRefs.current.slice(0, length);
	}, [length]);
	(0, react.useEffect)(() => {
		if (value) {
			const newOtp = value.split("").slice(0, length);
			while (newOtp.length < length) newOtp.push("");
			setOtp(newOtp);
		} else setOtp(Array(length).fill(""));
	}, [value, length]);
	(0, react.useEffect)(() => {
		if (autoFocus && inputRefs.current[0]) inputRefs.current[0].focus();
	}, [autoFocus]);
	const handleChange = (index, event) => {
		const newValue = event.target.value;
		if (newValue.length > 1) return;
		if (type === "number" && newValue && !/^\d$/.test(newValue)) return;
		if (pattern && newValue && !new RegExp(pattern).test(newValue)) return;
		const newOtp = [...otp];
		newOtp[index] = newValue;
		setOtp(newOtp);
		const otpValue = newOtp.join("");
		onChange?.({ target: { value: otpValue } });
		if (newValue && index < length - 1) inputRefs.current[index + 1]?.focus();
		if (newOtp.every((digit) => digit !== "") && onComplete) onComplete(otpValue);
	};
	const handleKeyDown = (index, event) => {
		if (event.key === "Backspace") {
			if (!otp[index] && index > 0) {
				const newOtp = [...otp];
				newOtp[index - 1] = "";
				setOtp(newOtp);
				inputRefs.current[index - 1]?.focus();
				onChange?.({ target: { value: newOtp.join("") } });
			} else if (otp[index]) {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
				onChange?.({ target: { value: newOtp.join("") } });
			}
		} else if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
		else if (event.key === "ArrowRight" && index < length - 1) inputRefs.current[index + 1]?.focus();
		else if (event.key === "Enter") {
			event.preventDefault();
			if (otp.every((digit) => digit !== "") && onComplete) onComplete(otp.join(""));
		}
	};
	const handlePaste = (event) => {
		event.preventDefault();
		const pastedData = event.clipboardData.getData("text").slice(0, length);
		let validData = "";
		Array.from(pastedData).forEach((char) => {
			if (type === "number" && !/^\d$/.test(char)) return;
			if (pattern && !new RegExp(pattern).test(char)) return;
			validData += char;
		});
		const newOtp = Array(length).fill("");
		for (let i = 0; i < Math.min(validData.length, length); i += 1) newOtp[i] = validData[i];
		setOtp(newOtp);
		onChange?.({ target: { value: newOtp.join("") } });
		const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
		const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
		inputRefs.current[focusIndex]?.focus();
		if (newOtp.every((digit) => digit !== "") && onComplete) onComplete(newOtp.join(""));
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_FormControl.default, {
		error,
		helperText,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("otp-field")), className),
		helperTextAlign: "center",
		style,
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
			required,
			error: !!error,
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("otp-field", "input-container")), styles["inputContainer"]),
			children: Array.from({ length }, (_, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				ref: (el) => {
					if (el) inputRefs.current[index] = el;
				},
				type: type === "password" ? "password" : "text",
				inputMode: type === "number" ? "numeric" : "text",
				value: otp[index] || "",
				onChange: (event) => handleChange(index, event),
				onKeyDown: (event) => handleKeyDown(index, event),
				onPaste: handlePaste,
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("otp-field", "input")), styles["input"], {
					[(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("otp-field", "input", "error"))]: !!error,
					[styles["inputError"]]: !!error,
					[(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("otp-field", "input", "disabled"))]: !!disabled,
					[styles["inputDisabled"]]: !!disabled
				}),
				maxLength: 1,
				placeholder,
				disabled,
				"aria-label": `${label || "OTP"} digit ${index + 1}`,
				"aria-invalid": !!error,
				"aria-required": required,
				autoComplete: "one-time-code"
			}, index))
		})]
	});
};
var OtpField_default = OtpField;

//#endregion
exports.default = OtpField_default;
//# sourceMappingURL=OtpField.cjs.map