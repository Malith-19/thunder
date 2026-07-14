import useTheme_default from "../../../contexts/Theme/useTheme.js";
import FormControl_default from "../FormControl/FormControl.js";
import InputLabel_default from "../InputLabel/InputLabel.js";
import OtpField_styles_default from "./OtpField.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/OtpField/OtpField.tsx
const OtpField = ({ label, error, className, required, disabled, helperText, length = 6, value = "", onChange, onComplete, type = "text", placeholder = "", style = {}, autoFocus = false, pattern }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = OtpField_styles_default(theme, colorScheme, !!disabled, !!error, length);
	const [otp, setOtp] = useState(Array(length).fill(""));
	const inputRefs = useRef([]);
	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, length);
	}, [length]);
	useEffect(() => {
		if (value) {
			const newOtp = value.split("").slice(0, length);
			while (newOtp.length < length) newOtp.push("");
			setOtp(newOtp);
		} else setOtp(Array(length).fill(""));
	}, [value, length]);
	useEffect(() => {
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
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("otp-field")), className),
		helperTextAlign: "center",
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: !!error,
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: cx(withVendorCSSClassPrefix(bem("otp-field", "input-container")), styles["inputContainer"]),
			children: Array.from({ length }, (_, index) => /* @__PURE__ */ jsx("input", {
				ref: (el) => {
					if (el) inputRefs.current[index] = el;
				},
				type: type === "password" ? "password" : "text",
				inputMode: type === "number" ? "numeric" : "text",
				value: otp[index] || "",
				onChange: (event) => handleChange(index, event),
				onKeyDown: (event) => handleKeyDown(index, event),
				onPaste: handlePaste,
				className: cx(withVendorCSSClassPrefix(bem("otp-field", "input")), styles["input"], {
					[withVendorCSSClassPrefix(bem("otp-field", "input", "error"))]: !!error,
					[styles["inputError"]]: !!error,
					[withVendorCSSClassPrefix(bem("otp-field", "input", "disabled"))]: !!disabled,
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
export { OtpField_default as default };
//# sourceMappingURL=OtpField.js.map