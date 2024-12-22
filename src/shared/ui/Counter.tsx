import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/css';

const counterVariants = cva(
    'px-1.5 py-0.5 font-semibold text-xxs whitespace-nowrap rounded-full',
    {
        variants: {
            variant: {
                default: 'text-gray-13 bg-gray-0',
                brand: 'text-primary bg-brand-0',
                tinted: 'text-red-1 bg-red-3',
                filled: 'text-green-1 bg-green-3',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

const Counter = ({
    variant,
    className,
    children,
    ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof counterVariants>) => {
    return (
        <span
            className={cn(counterVariants({ variant }), className)}
            {...props}
        >
            {children}
        </span>
    );
};

Counter.displayName = 'Counter';
export { Counter };
