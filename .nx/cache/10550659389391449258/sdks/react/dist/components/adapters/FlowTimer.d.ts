/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { FC, ReactNode } from 'react';
/**
 * Render props exposed by FlowTimer when using the render-prop pattern.
 */
export interface FlowTimerRenderProps {
    /** Human-readable formatted time string (e.g. "2:30" or "Timed out"). */
    formattedTime: string;
    /** Whether the timer has expired. */
    isExpired: boolean;
    /** Remaining time in seconds. 0 when expired. */
    remaining: number;
}
/**
 * Props for the FlowTimer component.
 */
export interface FlowTimerProps {
    /**
     * Render-props callback. When provided, the default countdown display is replaced
     * with whatever JSX the callback returns.
     *
     * @example
     * ```tsx
     * <FlowTimer expiresIn={300}>
     *   {({ remaining, isExpired, formattedTime }) => (
     *     <span style={{ color: isExpired ? 'red' : 'inherit' }}>
     *       {isExpired ? 'Session expired' : `Time left: ${formattedTime}`}
     *     </span>
     *   )}
     * </FlowTimer>
     * ```
     */
    children?: (props: FlowTimerRenderProps) => ReactNode;
    /** Initial number of seconds for the countdown. 0 or negative means no timer. */
    expiresIn?: number;
    /** Text template for the countdown display. Use {time} as a placeholder. */
    textTemplate?: string;
}
/**
 * Flow countdown timer component.
 *
 * Displays a countdown from the given number of seconds. When the time expires,
 * shows "Timed out". Returns null if expiresIn <= 0.
 */
declare const FlowTimer: FC<FlowTimerProps>;
export default FlowTimer;
//# sourceMappingURL=FlowTimer.d.ts.map