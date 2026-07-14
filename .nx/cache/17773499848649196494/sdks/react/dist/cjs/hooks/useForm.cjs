const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/hooks/useForm.ts
/**
* Generic form hook that provides comprehensive form state management and validation.
*
* @template T - The type of form values (must extend Record<string, string>)
* @param config - Configuration options for the form
* @returns Form state and methods
*
* @example
* ```tsx
* interface LoginForm {
*   username: string;
*   password: string;
* }
*
* const {
*   values,
*   touched,
*   errors,
*   isValid,
*   setValue,
*   handleSubmit,
*   getFieldProps
* } = useForm<LoginForm>({
*   initialValues: { username: '', password: '' },
*   fields: [
*     { name: 'username', required: true },
*     { name: 'password', required: true }
*   ]
* });
*
* const onSubmit = handleSubmit((values) => {
*   console.log('Form submitted:', values);
* });
*
* return (
*   <form onSubmit={onSubmit}>
*     <input {...getFieldProps('username')} />
*     <input {...getFieldProps('password')} type="password" />
*     <button type="submit" disabled={!isValid}>Submit</button>
*   </form>
* );
* ```
*/
const useForm = (config = {}) => {
	const { initialValues = {}, fields = [], validator, validateOnChange = false, validateOnBlur = true, requiredMessage = "This field is required" } = config;
	const [values, setFormValues] = (0, react.useState)({ ...initialValues });
	const [touched, setFormTouched] = (0, react.useState)({});
	const [errors, setFormErrors] = (0, react.useState)({});
	const [isSubmitted, setIsSubmitted] = (0, react.useState)(false);
	const getFieldConfig = (0, react.useCallback)((name) => fields.find((field) => field.name === name), [fields]);
	const validateField = (0, react.useCallback)((name) => {
		const value = values[name] || "";
		const fieldConfig = getFieldConfig(name);
		if (fieldConfig?.required && (!value || value.trim() === "")) return requiredMessage;
		if (fieldConfig?.validator) {
			const fieldError = fieldConfig.validator(value);
			if (fieldError) return fieldError;
		}
		return null;
	}, [
		values,
		getFieldConfig,
		requiredMessage
	]);
	const validateForm = (0, react.useCallback)(() => {
		const newErrors = {};
		fields.forEach((field) => {
			const error = validateField(field.name);
			if (error) newErrors[field.name] = error;
		});
		if (validator) {
			const globalErrors = validator(values);
			Object.keys(globalErrors).forEach((key) => {
				if (globalErrors[key]) newErrors[key] = globalErrors[key];
			});
		}
		return {
			errors: newErrors,
			isValid: Object.keys(newErrors).length === 0
		};
	}, [
		fields,
		validateField,
		validator,
		values
	]);
	const isValid = Object.keys(errors).length === 0;
	const setValue = (0, react.useCallback)((name, value) => {
		setFormValues((prev) => ({
			...prev,
			[name]: value
		}));
		if (validateOnChange) {
			const error = validateField(name);
			setFormErrors((prev) => {
				const newErrors = { ...prev };
				if (error) newErrors[name] = error;
				else delete newErrors[name];
				return newErrors;
			});
		}
	}, [validateField, validateOnChange]);
	const setValues = (0, react.useCallback)((newValues) => {
		setFormValues((prev) => ({
			...prev,
			...newValues
		}));
	}, []);
	const setTouched = (0, react.useCallback)((name, isTouched = true) => {
		setFormTouched((prev) => ({
			...prev,
			[name]: isTouched
		}));
		if (validateOnBlur && isTouched) {
			const error = validateField(name);
			setFormErrors((prev) => {
				const newErrors = { ...prev };
				if (error) newErrors[name] = error;
				else delete newErrors[name];
				return newErrors;
			});
		}
	}, [validateField, validateOnBlur]);
	const setTouchedFields = (0, react.useCallback)((touchedFields) => {
		setFormTouched((prev) => ({
			...prev,
			...touchedFields
		}));
	}, []);
	const touchAllFields = (0, react.useCallback)(() => {
		setFormTouched(fields.reduce((acc, field) => {
			acc[field.name] = true;
			return acc;
		}, {}));
		setFormErrors(validateForm().errors);
	}, [fields, validateForm]);
	const setError = (0, react.useCallback)((name, error) => {
		setFormErrors((prev) => ({
			...prev,
			[name]: error
		}));
	}, []);
	const setErrors = (0, react.useCallback)((newErrors) => {
		setFormErrors((prev) => ({
			...prev,
			...newErrors
		}));
	}, []);
	const clearErrors = (0, react.useCallback)(() => {
		setFormErrors({});
	}, []);
	const reset = (0, react.useCallback)(() => {
		setFormValues({ ...initialValues });
		setFormTouched({});
		setFormErrors({});
		setIsSubmitted(false);
	}, [initialValues]);
	const handleSubmit = (0, react.useCallback)((onSubmit) => async (e) => {
		if (e) e.preventDefault();
		setIsSubmitted(true);
		touchAllFields();
		if (validateForm().isValid) await onSubmit(values);
	}, [
		values,
		touchAllFields,
		validateForm
	]);
	return {
		clearErrors,
		errors,
		getFieldProps: (0, react.useCallback)((name) => {
			const fieldConfig = getFieldConfig(name);
			return {
				error: touched[name] ? errors[name] : void 0,
				name,
				onBlur: () => setTouched(name, true),
				onChange: (value) => setValue(name, value),
				required: fieldConfig?.required || false,
				touched: touched[name] || false,
				value: values[name] || ""
			};
		}, [
			values,
			errors,
			touched,
			setValue,
			setTouched,
			getFieldConfig
		]),
		handleSubmit,
		isSubmitted,
		isValid,
		reset,
		setError,
		setErrors,
		setTouched,
		setTouchedFields,
		setValue,
		setValues,
		touchAllFields,
		touched,
		validateField,
		validateForm,
		values
	};
};
var useForm_default = useForm;

//#endregion
exports.default = useForm_default;
exports.useForm = useForm;
//# sourceMappingURL=useForm.cjs.map