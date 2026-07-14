import { navigateTo } from "#app";
import { ThunderIDRuntimeError } from "@thunderid/browser";
import { BaseSignInButton } from "@thunderid/vue";
import { defineComponent, h, ref } from "vue";
import { useThunderID } from "#imports";
const SignInButton = defineComponent({
  emits: ["click", "error"],
  name: "SignInButton",
  props: {
    signInOptions: { default: void 0, type: Object }
  },
  setup(props, { slots, emit, attrs }) {
    const { signIn, signInUrl, signInOptions: contextSignInOptions } = useThunderID();
    const isLoading = ref(false);
    const handleSignIn = async (e) => {
      try {
        isLoading.value = true;
        if (signInUrl) {
          await navigateTo(signInUrl, { external: true });
        } else {
          await signIn(props.signInOptions ?? contextSignInOptions);
        }
        if (e) emit("click", e);
      } catch (error) {
        emit("error", error);
        throw new ThunderIDRuntimeError(
          `Sign in failed: ${error instanceof Error ? error.message : String(error)}`,
          "SignInButton-handleSignIn-RuntimeError-001",
          "nuxt",
          "Something went wrong while trying to sign in. Please try again later."
        );
      } finally {
        isLoading.value = false;
      }
    };
    return () => {
      const slotContent = slots.default ? () => slots.default({ isLoading: isLoading.value }) : void 0;
      return h(
        BaseSignInButton,
        {
          class: attrs.class,
          isLoading: isLoading.value,
          onClick: handleSignIn,
          style: attrs.style
        },
        slotContent
      );
    };
  }
});
export default SignInButton;
