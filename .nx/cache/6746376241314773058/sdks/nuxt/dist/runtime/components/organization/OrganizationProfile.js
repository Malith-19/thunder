import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { BaseOrganizationProfile } from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useOrganization } from "#imports";
const OrganizationProfile = defineComponent({
  name: "OrganizationProfile",
  props: {
    className: { default: "", type: String },
    editable: { default: false, type: Boolean },
    onUpdate: {
      default: void 0,
      type: Function
    },
    title: { default: "Organization Profile", type: String }
  },
  setup(props, { slots }) {
    const { currentOrganization } = useOrganization();
    return () => h(
      BaseOrganizationProfile,
      {
        class: withVendorCSSClassPrefix("organization-profile--styled"),
        className: props.className,
        editable: props.editable,
        onUpdate: props.onUpdate,
        organization: currentOrganization?.value ?? null,
        title: props.title
      },
      slots
    );
  }
});
export default OrganizationProfile;
