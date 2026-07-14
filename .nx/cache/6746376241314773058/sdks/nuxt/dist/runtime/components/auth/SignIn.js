import { navigateTo } from "#app";
import { BaseSignIn } from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useThunderID } from "#imports";
const SignIn = defineComponent({
  emits: ["error", "success"],
  name: "SignIn",
  props: {
    className: { default: "", type: String },
    size: {
      default: "medium",
      type: String
    },
    variant: {
      default: "outlined",
      type: String
    }
  },
  setup(props, { emit, attrs }) {
    const { signIn, afterSignInUrl, isInitialized, isLoading } = useThunderID();
    const handleInitialize = async () => (
      // Pass flowId='' to trigger the embedded-flow initiation path in useThunderID.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await signIn({ flowId: "" }, {})
    );
    const handleOnSubmit = async (payload, request) => await signIn(payload, request);
    const handleSuccess = async (authData) => {
      emit("success", authData);
      if (authData && afterSignInUrl) {
        if (import.meta.client) {
          const url = new URL(afterSignInUrl, window.location.origin);
          Object.entries(authData).forEach(([key, value]) => {
            if (value !== void 0 && value !== null) {
              url.searchParams.append(key, String(value));
            }
          });
          await navigateTo(url.pathname + url.search + url.hash);
        } else {
          await navigateTo(afterSignInUrl);
        }
      }
    };
    return () => h(BaseSignIn, {
      ...attrs,
      afterSignInUrl,
      class: props.className,
      isLoading: (isLoading?.value ?? false) || !(isInitialized?.value ?? true),
      onError: (err) => emit("error", err),
      onInitialize: handleInitialize,
      onSubmit: handleOnSubmit,
      onSuccess: handleSuccess,
      showLogo: true,
      showSubtitle: true,
      showTitle: true,
      size: props.size,
      variant: props.variant
    });
  }
});
export default SignIn;
