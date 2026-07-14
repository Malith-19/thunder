import { Fragment, defineComponent, h } from "vue";
import { useThunderID } from "#imports";
const SignedOut = defineComponent({
  name: "SignedOut",
  setup(_props, { slots }) {
    const { isSignedIn } = useThunderID();
    return () => {
      if (isSignedIn.value) {
        const fallback = slots.fallback?.();
        return fallback ? h(Fragment, {}, fallback) : null;
      }
      const content = slots.default?.();
      return content ? h(Fragment, {}, content) : null;
    };
  }
});
export default SignedOut;
