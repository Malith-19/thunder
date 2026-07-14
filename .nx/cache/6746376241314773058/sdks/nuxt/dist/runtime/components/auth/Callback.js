import { navigateTo } from "#app";
import { defineComponent, onMounted } from "vue";
const error = (msg, ...args) => {
  console.error(`[@thunderid/nuxt] Callback: ${msg}`, ...args);
};
const Callback = defineComponent({
  name: "Callback",
  props: {
    onError: { default: void 0, type: Function },
    onNavigate: { default: void 0, type: Function }
  },
  setup(props) {
    const navigate = (path) => {
      if (props.onNavigate) {
        props.onNavigate(path);
      } else {
        navigateTo(path);
      }
    };
    onMounted(() => {
      let returnPath = "/";
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");
        const nonce = urlParams.get("nonce");
        const oauthError = urlParams.get("error");
        const errorDescription = urlParams.get("error_description");
        if (!code && !state && !oauthError) {
          return;
        }
        if (!state) {
          throw new Error("Missing OAuth state parameter - possible security issue");
        }
        const storedData = sessionStorage.getItem(`thunderid_oauth_${state}`);
        if (!storedData) {
          if (oauthError) {
            const errorMsg = errorDescription || oauthError || "OAuth authentication failed";
            const err = new Error(errorMsg);
            props.onError?.(err);
            const params2 = new URLSearchParams();
            params2.set("error", oauthError);
            if (errorDescription) {
              params2.set("error_description", errorDescription);
            }
            navigate(`/?${params2.toString()}`);
            return;
          }
          throw new Error("Invalid OAuth state - possible CSRF attack");
        }
        const { path, timestamp } = JSON.parse(storedData);
        returnPath = path || "/";
        const MAX_STATE_AGE = 3e5;
        if (Date.now() - timestamp > MAX_STATE_AGE) {
          sessionStorage.removeItem(`thunderid_oauth_${state}`);
          throw new Error("OAuth state expired - please try again");
        }
        sessionStorage.removeItem(`thunderid_oauth_${state}`);
        if (oauthError) {
          const errorMsg = errorDescription || oauthError || "OAuth authentication failed";
          const err = new Error(errorMsg);
          props.onError?.(err);
          const params2 = new URLSearchParams();
          params2.set("error", oauthError);
          if (errorDescription) {
            params2.set("error_description", errorDescription);
          }
          navigate(`${returnPath}?${params2.toString()}`);
          return;
        }
        if (!code) {
          throw new Error("Missing OAuth authorization code");
        }
        const params = new URLSearchParams();
        params.set("code", code);
        if (nonce) {
          params.set("nonce", nonce);
        }
        navigate(`${returnPath}?${params.toString()}`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "OAuth callback processing failed";
        error("OAuth callback error:", err);
        props.onError?.(err instanceof Error ? err : new Error(errorMessage));
        const params = new URLSearchParams();
        params.set("error", "callback_error");
        params.set("error_description", errorMessage);
        navigate(`${returnPath}?${params.toString()}`);
      }
    });
    return () => null;
  }
});
export default Callback;
