import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { BaseCreateOrganization } from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useOrganization } from "#imports";
const CreateOrganization = defineComponent({
  name: "CreateOrganization",
  props: {
    className: { default: "", type: String },
    description: { default: "Create a new sub-organization.", type: String },
    title: { default: "Create Organization", type: String }
  },
  setup(props, { slots }) {
    const { createOrganization } = useOrganization();
    return () => h(
      BaseCreateOrganization,
      {
        class: withVendorCSSClassPrefix("create-organization--styled"),
        className: props.className,
        description: props.description,
        onCreate: createOrganization ? async (name) => {
          await createOrganization({ description: "", name, parentId: "", type: "TENANT" }, "");
        } : void 0,
        title: props.title
      },
      slots
    );
  }
});
export default CreateOrganization;
