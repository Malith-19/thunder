import { Fragment, defineComponent, h } from "vue";
import { useOrganization } from "#imports";
const Organization = defineComponent({
  name: "Organization",
  setup(_props, { slots }) {
    const { currentOrganization } = useOrganization();
    return () => {
      if (!currentOrganization?.value) {
        const fallback = slots.fallback?.();
        return fallback ? h(Fragment, {}, fallback) : null;
      }
      const content = slots.default?.({ organization: currentOrganization.value });
      return content ? h(Fragment, {}, content) : null;
    };
  }
});
export default Organization;
