import { generateFlattenedUserProfile } from "@thunderid/browser";
import {
  BrandingProvider,
  FlowMetaProvider,
  FlowProvider,
  I18nProvider,
  OrganizationProvider,
  ThemeProvider,
  UserProvider
} from "@thunderid/vue";
import { defineComponent, h } from "vue";
import { useState, useRuntimeConfig } from "#imports";
const ThunderIDRoot = defineComponent({
  name: "ThunderIDRoot",
  setup(_props, { slots }) {
    const userProfileState = useState("thunderid:user-profile");
    const currentOrgState = useState("thunderid:current-org");
    const myOrgsState = useState("thunderid:my-orgs");
    const brandingState = useState("thunderid:branding");
    const authState = useState("thunderid:auth");
    const prefs = useRuntimeConfig().public.thunderid?.preferences;
    const shouldFetchProfile = prefs?.user?.fetchUserProfile !== false;
    const shouldFetchOrgs = prefs?.user?.fetchOrganizations !== false;
    const shouldFetchBranding = prefs?.theme?.inheritFromBranding !== false;
    const themeMode = prefs?.theme?.mode ?? "light";
    const onUpdateProfile = (payload) => {
      const prev = userProfileState.value;
      userProfileState.value = prev ? {
        ...prev,
        flattenedProfile: generateFlattenedUserProfile(payload, prev.schemas),
        profile: payload
      } : {
        flattenedProfile: generateFlattenedUserProfile(payload, []),
        profile: payload,
        schemas: []
      };
      authState.value = { ...authState.value, user: payload };
    };
    const updateProfile = async (requestConfig, _sessionId) => {
      if (_sessionId) {
      }
      try {
        const result = await $fetch("/api/auth/user/profile", {
          body: requestConfig,
          method: "PATCH"
        });
        if (result?.success && result.data?.user) {
          onUpdateProfile(result.data.user);
        }
        return result;
      } catch (err) {
        return { data: { user: {} }, error: String(err), success: false };
      }
    };
    const revalidateProfile = async () => {
      try {
        const res = await $fetch("/api/auth/user/profile");
        if (res) userProfileState.value = res;
      } catch {
      }
    };
    const onOrganizationSwitch = async (organization) => $fetch("/api/auth/organizations/switch", { body: { organization }, method: "POST" });
    const getAllOrganizations = async () => $fetch("/api/auth/organizations");
    const revalidateMyOrganizations = async () => {
      try {
        const res = await $fetch("/api/auth/organizations/me");
        myOrgsState.value = res ?? [];
        return myOrgsState.value;
      } catch {
        return myOrgsState.value;
      }
    };
    const createOrganization = async (payload) => $fetch("/api/auth/organizations", { body: payload, method: "POST" });
    const revalidateCurrentOrganization = async () => {
      try {
        const res = await $fetch("/api/auth/organizations/current");
        currentOrgState.value = res ?? null;
        return currentOrgState.value;
      } catch {
        return currentOrgState.value;
      }
    };
    const revalidateBranding = async () => {
      try {
        const res = await $fetch("/api/auth/branding");
        if (res) brandingState.value = res;
      } catch {
      }
    };
    return () => h(
      I18nProvider,
      { preferences: prefs?.i18n },
      {
        default: () => h(
          FlowMetaProvider,
          { enabled: false },
          {
            default: () => h(
              BrandingProvider,
              {
                // When inheritFromBranding is disabled, pass null so the provider
                // falls back to its own default theme without using SSR-fetched data.
                brandingPreference: shouldFetchBranding ? brandingState.value : null,
                revalidateBranding: shouldFetchBranding ? revalidateBranding : void 0
              },
              {
                default: () => h(
                  ThemeProvider,
                  {
                    // Mirror the same flag used in the Nitro plugin gate.
                    inheritFromBranding: shouldFetchBranding,
                    mode: themeMode
                  },
                  {
                    default: () => h(FlowProvider, null, {
                      default: () => h(
                        UserProvider,
                        {
                          // When fetchUserProfile is false the Nitro plugin
                          // skips SCIM calls, so we must also pass empty values
                          // here to keep SSR and client in sync.
                          flattenedProfile: shouldFetchProfile ? userProfileState.value?.flattenedProfile ?? null : null,
                          onUpdateProfile: shouldFetchProfile ? onUpdateProfile : void 0,
                          profile: shouldFetchProfile ? userProfileState.value : null,
                          revalidateProfile: shouldFetchProfile ? revalidateProfile : void 0,
                          schemas: shouldFetchProfile ? userProfileState.value?.schemas ?? null : null,
                          updateProfile: shouldFetchProfile ? updateProfile : void 0
                        },
                        {
                          default: () => h(
                            OrganizationProvider,
                            {
                              // When fetchOrganizations is false pass empty
                              // values so the provider renders without org data.
                              createOrganization: shouldFetchOrgs ? createOrganization : void 0,
                              currentOrganization: shouldFetchOrgs ? currentOrgState.value : null,
                              getAllOrganizations: shouldFetchOrgs ? getAllOrganizations : void 0,
                              myOrganizations: shouldFetchOrgs ? myOrgsState.value : [],
                              onOrganizationSwitch: shouldFetchOrgs ? onOrganizationSwitch : void 0,
                              revalidateCurrentOrganization: shouldFetchOrgs ? revalidateCurrentOrganization : void 0,
                              revalidateMyOrganizations: shouldFetchOrgs ? revalidateMyOrganizations : void 0
                            },
                            {
                              default: () => slots.default?.()
                            }
                          )
                        }
                      )
                    })
                  }
                )
              }
            )
          }
        )
      }
    );
  }
});
export default ThunderIDRoot;
