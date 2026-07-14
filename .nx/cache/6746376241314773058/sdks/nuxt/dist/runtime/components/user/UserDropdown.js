import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { BaseUserDropdown, UserProfile as UserProfileComponent } from "@thunderid/vue";
import { defineComponent, h, ref } from "vue";
import { useThunderID, useUser } from "#imports";
const UserDropdown = defineComponent({
  emits: ["profileClick"],
  name: "UserDropdown",
  props: {
    className: { default: "", type: String }
  },
  setup(props, { slots, emit }) {
    const { user, signOut } = useThunderID();
    useUser();
    const isProfileModalOpen = ref(false);
    return () => h(
      BaseUserDropdown,
      {
        class: withVendorCSSClassPrefix("user-dropdown--styled"),
        className: props.className,
        isProfileModalOpen: isProfileModalOpen.value,
        onProfileClick: () => {
          isProfileModalOpen.value = true;
          emit("profileClick");
        },
        onProfileModalClose: () => {
          isProfileModalOpen.value = false;
        },
        onSignOut: () => {
          signOut();
        },
        // Inline profile content avoids creating a circular dependency on the
        // Nuxt UserProfile container; UserProfileComponent from @thunderid/vue
        // reads its data from the OrganizationProvider / UserProvider context
        // wired up by ThunderIDRoot, so it works identically.
        profileContent: isProfileModalOpen.value ? h(UserProfileComponent, {
          cardLayout: false,
          editable: true
        }) : null,
        user: user.value
      },
      slots
    );
  }
});
export default UserDropdown;
