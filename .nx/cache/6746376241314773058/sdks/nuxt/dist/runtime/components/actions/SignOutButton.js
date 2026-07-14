import { ThunderIDRuntimeError } from "@thunderid/browser";
import { BaseSignOutButton } from "@thunderid/vue";
import { defineComponent, h, ref } from "vue";
import { useThunderID } from "#imports";
const SignOutButton = defineComponent({
  emits: ["click", "error"],
  name: "SignOutButton",
  setup(_, { slots, emit, attrs }) {
    const { signOut } = useThunderID();
    const isLoading = ref(false);
    const handleSignOut = async (e) => {
      try {
        isLoading.value = true;
        await signOut();
        if (e) emit("click", e);
      } catch (error) {
        emit("error", error);
        throw new ThunderIDRuntimeError(
          `Sign out failed: ${error instanceof Error ? error.message : String(error)}`,
          "SignOutButton-handleSignOut-RuntimeError-001",
          "nuxt",
          "Something went wrong while trying to sign out. Please try again later."
        );
      } finally {
        isLoading.value = false;
      }
    };
    return () => {
      const slotContent = slots.default ? () => slots.default({ isLoading: isLoading.value }) : void 0;
      return h(
        BaseSignOutButton,
        {
          class: attrs.class,
          isLoading: isLoading.value,
          onClick: handleSignOut,
          style: attrs.style
        },
        slotContent
      );
    };
  }
});
export default SignOutButton;
