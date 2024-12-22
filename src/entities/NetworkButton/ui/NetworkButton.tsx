import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/css';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { NETWORK_BUTTON_VARIANTS } from '../constants';
import type { NetworkName } from '../types';

export const NetworkButton = ({
    network,
    checked,
    children,
    ...props
}: {
    network: NetworkName;
    checked?: boolean;
    children?: ReactNode;
    className?: string;
} & ButtonProps) => {
    const { className, Icon, text } = NETWORK_BUTTON_VARIANTS[network];
    return (
        <Button
            className={cn(
                'border border-gray-10 bg-gray-12 aria-checked:pointer-events-none hover:[&:not(:disabled)]:bg-gray-10/50',
                className,
            )}
            variant="secondary"
            leftIcon={<Icon />}
            size="medium"
            aria-checked={checked}
            {...props}
        >
            {children || text}
        </Button>
    );
};
