import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { BaseUserProfile } from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useUser } from "#imports";
const UserProfile = defineComponent({
  name: "UserProfile",
  props: {
    cardLayout: { default: true, type: Boolean },
    className: { default: "", type: String },
    editable: { default: true, type: Boolean },
    hideFields: { default: () => [], type: Array },
    showFields: { default: () => [], type: Array },
    title: { default: "Profile", type: String }
  },
  setup(props, { slots }) {
    const { flattenedProfile, schemas, updateProfile } = useUser();
    return () => h(
      BaseUserProfile,
      {
        cardLayout: props.cardLayout,
        class: withVendorCSSClassPrefix("user-profile--styled"),
        className: props.className,
        editable: props.editable,
        flattenedProfile: flattenedProfile?.value,
        hideFields: props.hideFields,
        onUpdate: updateProfile,
        schemas: schemas?.value,
        showFields: props.showFields,
        title: props.title
      },
      slots
    );
  }
});
export default UserProfile;
