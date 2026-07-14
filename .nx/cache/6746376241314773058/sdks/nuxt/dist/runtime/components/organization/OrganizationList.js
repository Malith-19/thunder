import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { BaseOrganizationList } from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useOrganization } from "#imports";
const OrganizationList = defineComponent({
  emits: ["select"],
  name: "OrganizationList",
  props: {
    className: { default: "", type: String }
  },
  setup(props, { slots, emit }) {
    const { myOrganizations, isLoading, switchOrganization } = useOrganization();
    const handleSelect = async (org) => {
      emit("select", org);
      await switchOrganization(org);
    };
    return () => h(
      BaseOrganizationList,
      {
        class: withVendorCSSClassPrefix("organization-list--styled"),
        className: props.className,
        isLoading: isLoading?.value ?? false,
        onSelect: handleSelect,
        organizations: myOrganizations?.value ?? []
      },
      slots
    );
  }
});
export default OrganizationList;
