import UserCreateContext_default from "./UserCreateContext.js";
import { UserCreateFlowStep } from "../../models/user-create-flow.js";
import { useCallback, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/UserCreate/UserCreateProvider.tsx
/**
* Initial state values for user creation.
*
* @internal
*/
const INITIAL_STATE = {
	currentStep: UserCreateFlowStep.USER_TYPE,
	selectedSchema: null,
	selectedOuId: null,
	formValues: {},
	error: null
};
/**
* React context provider component that provides user creation state
* to all child components in the wizard flow.
*
* @public
*/
function UserCreateProvider({ children }) {
	const [currentStep, setCurrentStep] = useState(INITIAL_STATE.currentStep);
	const [selectedSchema, setSelectedSchema] = useState(INITIAL_STATE.selectedSchema);
	const [selectedOuId, setSelectedOuId] = useState(INITIAL_STATE.selectedOuId);
	const [formValues, setFormValues] = useState(INITIAL_STATE.formValues);
	const [error, setError] = useState(INITIAL_STATE.error);
	const reset = useCallback(() => {
		setCurrentStep(INITIAL_STATE.currentStep);
		setSelectedSchema(INITIAL_STATE.selectedSchema);
		setSelectedOuId(INITIAL_STATE.selectedOuId);
		setFormValues(INITIAL_STATE.formValues);
		setError(INITIAL_STATE.error);
	}, []);
	const contextValue = useMemo(() => ({
		currentStep,
		setCurrentStep,
		selectedSchema,
		setSelectedSchema,
		selectedOuId,
		setSelectedOuId,
		formValues,
		setFormValues,
		error,
		setError,
		reset
	}), [
		currentStep,
		selectedSchema,
		selectedOuId,
		formValues,
		error,
		reset
	]);
	return /* @__PURE__ */ jsx(UserCreateContext_default.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
export { UserCreateProvider as default };