import type { ComponentType, ReactNode, SVGProps } from "react";


export type NavigationPanelLink = {
    href: string;
    prefix?: ReactNode;
    children?: ReactNode;
    suffix?: ReactNode;
};