import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/css';

const iconButtonVariants = cva(
    'inline-flex items-center text-primary justify-center rounded-lg gap-x-2 transition-colors focus-visible:outline disabled:pointer-events-none disabled:opacity-40',
    {
        variants: {
            variant: {
                primary:
                    'bg-brand-0 focus-visible:outline-brand-2 hover:bg-brand-1',
                secondary:
                    'bg-gray-9 focus-visible:outline-gray-6  hover:bg-gray-8',
                tertiary:
                    'bg-gray-13 focus-visible:outline-gray-6 hover:bg-gray-8',
            },
            size: {
                small: 'p-2.5',
                medium: 'p-3',
                large: 'p-3.5',
            },
            round: {
                false: null,
                true: 'rounded-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'medium',
            round: false,
        },
    },
);

const IconButton = ({
    className,
    children,
    variant,
    size,
    round,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof iconButtonVariants>) => {
    return (
        <button
            className={cn(
                iconButtonVariants({ variant, size, round }),
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

IconButton.displayName = 'IconButton';
export { IconButton };
