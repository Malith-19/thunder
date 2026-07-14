import { navigateTo } from "#app";
import { ThunderIDRuntimeError } from "@thunderid/browser";
import { BaseSignUpButton } from "@thunderid/vue";
import { defineComponent, h, ref } from "vue";
import { useThunderID } from "#imports";
const SignUpButton = defineComponent({
  emits: ["click", "error"],
  name: "SignUpButton",
  setup(_, { slots, emit, attrs }) {
    const { signUp, signUpUrl } = useThunderID();
    const isLoading = ref(false);
    const handleSignUp = async (e) => {
      try {
        isLoading.value = true;
        if (signUpUrl) {
          await navigateTo(signUpUrl, { external: true });
        } else {
          await signUp();
        }
        if (e) emit("click", e);
      } catch (error) {
        emit("error", error);
        throw new ThunderIDRuntimeError(
          `Sign up failed: ${error instanceof Error ? error.message : String(error)}`,
          "SignUpButton-handleSignUp-RuntimeError-001",
          "nuxt",
          "Something went wrong while trying to sign up. Please try again later."
        );
      } finally {
        isLoading.value = false;
      }
    };
    return () => {
      const slotContent = slots.default ? () => slots.default({ isLoading: isLoading.value }) : void 0;
      return h(
        BaseSignUpButton,
        {
          class: attrs.class,
          isLoading: isLoading.value,
          onClick: handleSignUp,
          style: attrs.style
        },
        slotContent
      );
    };
  }
});
export default SignUpButton;
