import { Fragment, defineComponent, h } from "vue";
import { useThunderID } from "#imports";
const Loading = defineComponent({
  name: "Loading",
  setup(_props, { slots }) {
    const { isLoading } = useThunderID();
    return () => {
      if (!isLoading.value) {
        const fallback = slots.fallback?.();
        return fallback ? h(Fragment, {}, fallback) : null;
      }
      const content = slots.default?.();
      return content ? h(Fragment, {}, content) : null;
    };
  }
});
export default Loading;
