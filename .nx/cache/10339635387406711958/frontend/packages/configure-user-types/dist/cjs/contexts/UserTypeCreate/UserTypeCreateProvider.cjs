const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_UserTypeCreateContext = require('./UserTypeCreateContext.cjs');
const require_user_type_create_flow = require('../../models/user-type-create-flow.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/UserTypeCreate/UserTypeCreateProvider.tsx
/**
* Initial state values for user type creation.
*
* @internal
*/
const INITIAL_STATE = {
	currentStep: require_user_type_create_flow.UserTypeCreateFlowStep.NAME,
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
	const [currentStep, setCurrentStep] = (0, react.useState)(INITIAL_STATE.currentStep);
	const [name, setName] = (0, react.useState)(INITIAL_STATE.name);
	const [ouId, setOuId] = (0, react.useState)(INITIAL_STATE.ouId);
	const [allowSelfRegistration, setAllowSelfRegistration] = (0, react.useState)(INITIAL_STATE.allowSelfRegistration);
	const [properties, setProperties] = (0, react.useState)(INITIAL_STATE.properties);
	const [enumInput, setEnumInput] = (0, react.useState)(INITIAL_STATE.enumInput);
	const [displayAttribute, setDisplayAttribute] = (0, react.useState)(INITIAL_STATE.displayAttribute);
	const [error, setError] = (0, react.useState)(INITIAL_STATE.error);
	const reset = (0, react.useCallback)(() => {
		setCurrentStep(INITIAL_STATE.currentStep);
		setName(INITIAL_STATE.name);
		setOuId(INITIAL_STATE.ouId);
		setAllowSelfRegistration(INITIAL_STATE.allowSelfRegistration);
		setProperties(INITIAL_STATE.properties);
		setEnumInput(INITIAL_STATE.enumInput);
		setDisplayAttribute(INITIAL_STATE.displayAttribute);
		setError(INITIAL_STATE.error);
	}, []);
	const contextValue = (0, react.useMemo)(() => ({
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UserTypeCreateContext.default.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
exports.default = UserTypeCreateProvider;