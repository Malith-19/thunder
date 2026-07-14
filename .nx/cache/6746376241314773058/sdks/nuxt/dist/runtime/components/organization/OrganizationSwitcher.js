import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { BaseOrganizationSwitcher } from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useOrganization } from "#imports";
const OrganizationSwitcher = defineComponent({
  name: "OrganizationSwitcher",
  props: {
    className: { default: "", type: String }
  },
  setup(props, { slots }) {
    const { currentOrganization, myOrganizations, isLoading, switchOrganization } = useOrganization();
    return () => h(
      BaseOrganizationSwitcher,
      {
        class: withVendorCSSClassPrefix("organization-switcher--styled"),
        className: props.className,
        currentOrganization: currentOrganization?.value ?? null,
        isLoading: isLoading?.value ?? false,
        onSwitch: switchOrganization,
        organizations: myOrganizations?.value ?? []
      },
      slots
    );
  }
});
export default OrganizationSwitcher;
