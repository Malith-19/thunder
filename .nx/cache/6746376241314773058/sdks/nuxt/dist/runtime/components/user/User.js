import { Fragment, defineComponent, h } from "vue";
import { useThunderID } from "#imports";
const User = defineComponent({
  name: "User",
  setup(_props, { slots }) {
    const { user } = useThunderID();
    return () => {
      if (!user.value) {
        const fallback = slots.fallback?.();
        return fallback ? h(Fragment, {}, fallback) : null;
      }
      const content = slots.default?.({ user: user.value });
      return content ? h(Fragment, {}, content) : null;
    };
  }
});
export default User;
