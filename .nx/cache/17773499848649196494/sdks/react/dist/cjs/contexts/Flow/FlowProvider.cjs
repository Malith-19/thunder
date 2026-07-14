const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_FlowContext = require('./FlowContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/Flow/FlowProvider.tsx
/**
* Provider component for flow context.
* Manages shared UI state for authentication flows including titles, messages, and navigation.
*/
const FlowProvider = ({ children, initialStep = null, initialTitle = "", initialSubtitle, onFlowChange }) => {
	const [currentStep, setCurrentStepState] = (0, react.useState)(initialStep);
	const [title, setTitle] = (0, react.useState)(initialTitle);
	const [subtitle, setSubtitle] = (0, react.useState)(initialSubtitle);
	const [messages, setMessages] = (0, react.useState)([]);
	const [error, setError] = (0, react.useState)(null);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [showBackButton, setShowBackButton] = (0, react.useState)(false);
	const [onGoBack, setOnGoBack] = (0, react.useState)(void 0);
	/**
	* Set the current flow step and notify listeners.
	*/
	const setCurrentStep = (0, react.useCallback)((step) => {
		setCurrentStepState(step);
		if (step) {
			setTitle(step.title);
			setSubtitle(step.subtitle);
			setShowBackButton(step.canGoBack ?? false);
		}
		onFlowChange?.(step);
	}, [onFlowChange]);
	/**
	* Add a message to the message list.
	*/
	const addMessage = (0, react.useCallback)((message) => {
		const messageWithId = {
			...message,
			id: message.id ?? `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
		};
		setMessages((prev) => [...prev, messageWithId]);
	}, []);
	/**
	* Remove a specific message by ID.
	*/
	const removeMessage = (0, react.useCallback)((messageId) => {
		setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
	}, []);
	/**
	* Clear all messages.
	*/
	const clearMessages = (0, react.useCallback)(() => {
		setMessages([]);
	}, []);
	/**
	* Reset the flow context to initial state.
	*/
	const reset = (0, react.useCallback)(() => {
		setCurrentStepState(initialStep);
		setTitle(initialTitle);
		setSubtitle(initialSubtitle);
		setMessages([]);
		setError(null);
		setIsLoading(false);
		setShowBackButton(false);
		setOnGoBack(void 0);
	}, [
		initialStep,
		initialTitle,
		initialSubtitle
	]);
	/**
	* Navigate to a different authentication flow.
	*/
	const navigateToFlow = (0, react.useCallback)((flowType, options) => {
		const stepId = `${flowType}-${Date.now()}`;
		setCurrentStep({
			canGoBack: flowType !== "signin",
			id: stepId,
			metadata: options?.metadata,
			subtitle: options?.subtitle,
			title: options?.title ?? "",
			type: flowType
		});
		clearMessages();
		setError(null);
	}, [setCurrentStep, clearMessages]);
	const contextValue = (0, react.useMemo)(() => ({
		addMessage,
		clearMessages,
		currentStep,
		error,
		isLoading,
		messages,
		navigateToFlow,
		onGoBack,
		removeMessage,
		reset,
		setCurrentStep,
		setError,
		setIsLoading,
		setOnGoBack,
		setShowBackButton,
		setSubtitle,
		setTitle,
		showBackButton,
		subtitle,
		title
	}), [
		currentStep,
		setCurrentStep,
		title,
		subtitle,
		messages,
		addMessage,
		removeMessage,
		clearMessages,
		error,
		isLoading,
		showBackButton,
		onGoBack,
		reset,
		navigateToFlow
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowContext.default.Provider, {
		value: contextValue,
		children
	});
};
var FlowProvider_default = FlowProvider;

//#endregion
exports.default = FlowProvider_default;
//# sourceMappingURL=FlowProvider.cjs.map