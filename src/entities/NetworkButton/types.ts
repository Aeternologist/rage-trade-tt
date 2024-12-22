import type { ComponentType, SVGProps } from 'react';
import type { Register } from 'wagmi';

export type NetworkName = Register['config']['chains'][number]['name'];

export type NetworkButtonVariants = Record<
    NetworkName,
    {
        className: string;
        Icon: ComponentType<SVGProps<SVGSVGElement>>;
        text: string;
    }
>;
