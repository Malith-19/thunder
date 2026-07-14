import { navigateTo } from "#app";
import {
  EmbeddedFlowResponseType,
  EmbeddedFlowType
} from "@thunderid/browser";
import { BaseSignUp } from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useThunderID } from "#imports";
const SignUp = defineComponent({
  name: "SignUp",
  props: {
    afterSignUpUrl: { default: void 0, type: String },
    buttonClassName: { default: "", type: String },
    className: { default: "", type: String },
    errorClassName: { default: "", type: String },
    inputClassName: { default: "", type: String },
    messageClassName: { default: "", type: String },
    onComplete: { default: void 0, type: Function },
    onError: { default: void 0, type: Function },
    shouldRedirectAfterSignUp: { default: true, type: Boolean },
    showSubtitle: { default: true, type: Boolean },
    showTitle: { default: true, type: Boolean },
    size: { default: "medium", type: String },
    variant: { default: "outlined", type: String }
  },
  setup(props, { slots }) {
    const { signUp, isInitialized, applicationId } = useThunderID();
    const handleInitialize = async (payload) => {
      let applicationIdFromUrl = null;
      if (import.meta.client) {
        const urlParams = new URL(window.location.href).searchParams;
        applicationIdFromUrl = urlParams.get("applicationId");
      }
      const effectiveApplicationId = applicationId || applicationIdFromUrl || void 0;
      const initialPayload = payload || {
        flowType: EmbeddedFlowType.Registration,
        ...effectiveApplicationId && { applicationId: effectiveApplicationId }
      };
      return await signUp(initialPayload);
    };
    const handleOnSubmit = async (payload) => await signUp(payload);
    const handleComplete = async (response) => {
      props.onComplete?.(response);
      const oauthRedirectUrl = response?.redirectUrl;
      if (props.shouldRedirectAfterSignUp && oauthRedirectUrl) {
        await navigateTo(oauthRedirectUrl, { external: true });
        return;
      }
      if (props.shouldRedirectAfterSignUp && response?.type !== EmbeddedFlowResponseType.Redirection && props.afterSignUpUrl) {
        await navigateTo(props.afterSignUpUrl, { external: true });
      }
      if (props.shouldRedirectAfterSignUp && response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL && !response.data.redirectURL.includes("oauth") && !response.data.redirectURL.includes("auth")) {
        await navigateTo(response.data.redirectURL, { external: true });
      }
    };
    return () => h(
      BaseSignUp,
      {
        afterSignUpUrl: props.afterSignUpUrl,
        buttonClassName: props.buttonClassName,
        className: props.className,
        errorClassName: props.errorClassName,
        inputClassName: props.inputClassName,
        isInitialized: isInitialized?.value ?? false,
        messageClassName: props.messageClassName,
        onComplete: handleComplete,
        onError: props.onError,
        onInitialize: handleInitialize,
        onSubmit: handleOnSubmit,
        showSubtitle: props.showSubtitle,
        showTitle: props.showTitle,
        size: props.size,
        variant: props.variant
      },
      slots.default ? { default: (renderProps) => slots.default(renderProps) } : void 0
    );
  }
});
export default SignUp;
