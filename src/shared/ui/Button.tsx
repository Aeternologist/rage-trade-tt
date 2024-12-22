import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/css';

const buttonVariants = cva(
    'inline-flex items-center text-primary justify-center font-semibold whitespace-nowrap [&_[role=img]]:!size-[--button-icon-size] rounded gap-x-2 transition-colors focus-visible:outline disabled:pointer-events-none disabled:opacity-40',
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
                small: 'px-3 py-2 text-sm [--button-icon-size:16px]',
                medium: 'px-4 py-2.5 text-base [--button-icon-size:20px]',
                large: 'px-5 py-3 text-sm [--button-icon-size:24px]',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'medium',
        },
    },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        leftIcon?: JSX.Element;
        counter?: ReactNode;
        rightIcon?: JSX.Element;
    };

const Button = ({
    className,
    leftIcon,
    children,
    counter,
    rightIcon,
    variant,
    size,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {leftIcon}
            {children}
            {counter}
            {rightIcon}
        </button>
    );
};

Button.displayName = 'Button';
export { Button };
