import FlowContext_default from "./FlowContext.js";
import { useCallback, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/Flow/FlowProvider.tsx
/**
* Provider component for flow context.
* Manages shared UI state for authentication flows including titles, messages, and navigation.
*/
const FlowProvider = ({ children, initialStep = null, initialTitle = "", initialSubtitle, onFlowChange }) => {
	const [currentStep, setCurrentStepState] = useState(initialStep);
	const [title, setTitle] = useState(initialTitle);
	const [subtitle, setSubtitle] = useState(initialSubtitle);
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showBackButton, setShowBackButton] = useState(false);
	const [onGoBack, setOnGoBack] = useState(void 0);
	/**
	* Set the current flow step and notify listeners.
	*/
	const setCurrentStep = useCallback((step) => {
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
	const addMessage = useCallback((message) => {
		const messageWithId = {
			...message,
			id: message.id ?? `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
		};
		setMessages((prev) => [...prev, messageWithId]);
	}, []);
	/**
	* Remove a specific message by ID.
	*/
	const removeMessage = useCallback((messageId) => {
		setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
	}, []);
	/**
	* Clear all messages.
	*/
	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);
	/**
	* Reset the flow context to initial state.
	*/
	const reset = useCallback(() => {
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
	const navigateToFlow = useCallback((flowType, options) => {
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
	const contextValue = useMemo(() => ({
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
	return /* @__PURE__ */ jsx(FlowContext_default.Provider, {
		value: contextValue,
		children
	});
};
var FlowProvider_default = FlowProvider;

//#endregion
export { FlowProvider_default as default };
//# sourceMappingURL=FlowProvider.js.map