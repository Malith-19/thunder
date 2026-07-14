import * as _nuxt_schema from '@nuxt/schema';
import { ThunderIDNuxtConfig, ThunderIDSessionPayload, ThunderIDSSRData } from '../dist/runtime/types.js';

declare const _default: _nuxt_schema.NuxtModule<ThunderIDNuxtConfig, ThunderIDNuxtConfig, false>;

declare module '@nuxt/schema' {
    interface NuxtConfig {
        thunderid?: ThunderIDNuxtConfig;
    }
    interface NuxtOptions {
        thunderid?: ThunderIDNuxtConfig;
    }
    interface PublicRuntimeConfig {
        thunderid: {
            afterSignInUrl: string;
            afterSignOutUrl: string;
            applicationId?: string;
            baseUrl: string;
            clientId: string;
            platform?: ThunderIDNuxtConfig['platform'];
            preferences?: ThunderIDNuxtConfig['preferences'];
            scopes: string[];
            signInUrl?: string;
            signUpUrl?: string;
        };
    }
    interface RuntimeConfig {
        thunderid: {
            clientSecret: string;
            sessionSecret: string;
        };
    }
}
declare module 'h3' {
    interface H3EventContext {
        thunderid?: {
            isSignedIn?: boolean;
            session?: ThunderIDSessionPayload | {
                sub?: string;
            } | null;
            ssr?: ThunderIDSSRData;
        };
    }
}

export { _default as default };
