const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_UserCreateContext = require('./UserCreateContext.cjs');
const require_user_create_flow = require('../../models/user-create-flow.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/UserCreate/UserCreateProvider.tsx
/**
* Initial state values for user creation.
*
* @internal
*/
const INITIAL_STATE = {
	currentStep: require_user_create_flow.UserCreateFlowStep.USER_TYPE,
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
	const [currentStep, setCurrentStep] = (0, react.useState)(INITIAL_STATE.currentStep);
	const [selectedSchema, setSelectedSchema] = (0, react.useState)(INITIAL_STATE.selectedSchema);
	const [selectedOuId, setSelectedOuId] = (0, react.useState)(INITIAL_STATE.selectedOuId);
	const [formValues, setFormValues] = (0, react.useState)(INITIAL_STATE.formValues);
	const [error, setError] = (0, react.useState)(INITIAL_STATE.error);
	const reset = (0, react.useCallback)(() => {
		setCurrentStep(INITIAL_STATE.currentStep);
		setSelectedSchema(INITIAL_STATE.selectedSchema);
		setSelectedOuId(INITIAL_STATE.selectedOuId);
		setFormValues(INITIAL_STATE.formValues);
		setError(INITIAL_STATE.error);
	}, []);
	const contextValue = (0, react.useMemo)(() => ({
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UserCreateContext.default.Provider, {
		value: contextValue,
		children
	});
}

//#endregion
exports.default = UserCreateProvider;