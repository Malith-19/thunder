/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { UseFloatingReturn, UseInteractionsReturn } from '@floating-ui/react';
import { type ButtonHTMLAttributes, type Dispatch, type FC, type ForwardRefExoticComponent, type HTMLProps, type JSX, type ReactNode, type RefAttributes, type SetStateAction } from 'react';
interface DialogOptions {
    initialOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
}
interface DialogHookReturn extends UseFloatingReturn, UseInteractionsReturn {
    descriptionId: string | undefined;
    labelId: string | undefined;
    open: boolean;
    setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
    setLabelId: Dispatch<SetStateAction<string | undefined>>;
    setOpen: (open: boolean) => void;
}
export declare function useDialog({ initialOpen, open: controlledOpen, onOpenChange: setControlledOpen, }?: DialogOptions): DialogHookReturn;
export declare const useDialogContext: () => DialogHookReturn;
export declare function Dialog({ children, ...options }: {
    children: ReactNode;
} & DialogOptions): JSX.Element;
interface DialogTriggerProps {
    asChild?: boolean;
    children: ReactNode;
}
export declare const DialogTrigger: ForwardRefExoticComponent<HTMLProps<HTMLElement> & DialogTriggerProps & RefAttributes<HTMLElement>>;
export declare const DialogContent: ForwardRefExoticComponent<HTMLProps<HTMLDivElement> & RefAttributes<HTMLDivElement>>;
export declare const DialogHeading: ForwardRefExoticComponent<HTMLProps<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>;
export declare const DialogDescription: ForwardRefExoticComponent<HTMLProps<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>;
interface DialogCloseProps {
    asChild?: boolean;
    children?: ReactNode;
}
export declare const DialogClose: ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & DialogCloseProps & RefAttributes<HTMLButtonElement>>;
export interface DialogComponent extends FC<{
    children: ReactNode;
} & DialogOptions> {
    Close: typeof DialogClose;
    Content: typeof DialogContent;
    Description: typeof DialogDescription;
    Heading: typeof DialogHeading;
    Trigger: typeof DialogTrigger;
}
declare const _default: DialogComponent;
export default _default;
//# sourceMappingURL=Dialog.d.ts.map