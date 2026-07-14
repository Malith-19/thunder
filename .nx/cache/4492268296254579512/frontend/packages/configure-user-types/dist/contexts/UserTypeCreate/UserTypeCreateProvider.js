import UserTypeCreateContext_default from "./UserTypeCreateContext.js";
import { UserTypeCreateFlowStep } from "../../models/user-type-create-flow.js";
import { useCallback, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/UserTypeCreate/UserTypeCreateProvider.tsx
/**
* Initial state values for user type creation.
*
* @internal
*/
const INITIAL_STATE = {
	currentStep: UserTypeCreateFlowStep.NAME,
	name: "",
	ouId: "",
	allowSelfRegistration: false,
	properties: [{
		id: "1",
		name: "",
		displayName: "",
		type: "string",
		required: false,
		unique: false,
		credential: false,
		enum: [],
		regex: ""
	}],
	enumInput: {},
	displayAttribute: "",
	error: null
};
/**
* React context provider component that provides user type creation state
* to all child components in the wizard flow.
*
* @public
*/
function UserTypeCreateProvider({ children }) {
	const [currentStep, setCurrentStep] = useState(INITIAL_STATE.currentStep);
	const [name, setName] = useState(INITIAL_STATE.name);
	const [ouId, setOuId] = useState(INITIAL_STATE.ouId);
	const [allowSelfRegistration, setAllowSelfRegistration] = useState(INITIAL_STATE.allowSelfRegistration);
	const [properties, setProperties] = useState(INITIAL_STATE.properties);
	const [enumInput, setEnumInput] = useState(INITIAL_STATE.enumInput);
	const [displayAttribute, setDisplayAttribute] = useState(INITIAL_STATE.displayAttribute);
	const [error, setError] = useState(INITIAL_STATE.error);
	const reset = useCallback(() => {
		setCurrentStep(INITIAL_STATE.currentStep);
		setName(INITIAL_STATE.name);
		setOuId(INITIAL_STATE.ouId);
		setAllowSelfRegistration(INITIAL_STATE.allowSelfRegistration);
		setProperties(INITIAL_STATE.properties);
		setEnumInput(INITIAL_STATE.enumInput);
		setDisplayAttribute(INITIAL_STATE.displayAttribute);
		setError(INITIAL_STATE.error);
	}, []);
	const contextValue = useMemo(() => ({
		currentStep,
		setCurrentStep,
		name,
		setName,
		ouId,
		setOuId,
		allowSelfRegistration,
		setAllowSelfRegistration,
		properties,
		setProperties,
		enumInput,
		setEnumInput,
		displayAttribute,
		setDisplayAttribute,
		error,
		setError,
		reset
	}), [
		currentStep,
		name,
		ouId,
		allowSelfRegistration,
		properties,
		enumInput,
		displayAttribute,
		error,
		reset
	]);
	return /* @__PURE__ */ jsx(UserTypeCreateContext_default.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
export { UserTypeCreateProvider as default };