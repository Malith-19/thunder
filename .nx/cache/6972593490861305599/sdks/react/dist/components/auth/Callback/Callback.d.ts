import { FC } from 'react';
import { TokenCallbackProps } from './TokenCallback';
import { OAuthCallbackProps } from './OAuthCallback';
/**
 * Props for the unified Callback component, combining properties for both Token and OAuth callbacks.
 */
export type CallbackProps = OAuthCallbackProps & TokenCallbackProps;
/**
 * A unified Callback component that automatically routes to either OAuthCallback or TokenCallback
 * based on the presence of URL parameters ('code' for OAuth, 'token' for token-based flows).
 */
export declare const Callback: FC<CallbackProps>;
export default Callback;
//# sourceMappingURL=Callback.d.ts.map