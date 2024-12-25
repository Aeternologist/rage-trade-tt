import { forwardRef, type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/shared/lib/css';

type InputAddons = {
    label?: ReactNode;
    icon?: ReactNode;
    labelHint?: ReactNode;
    inputHint?: ReactNode;
    leftAddon?: ReactNode;
    rightAddon?: ReactNode;
    button?: ReactNode;
    inputClassName?: string;
};

const Input = forwardRef<
    HTMLInputElement,
    ComponentProps<'input'> & InputAddons
>(
    (
        {
            className,
            type,
            label,
            icon,
            labelHint,
            inputHint,
            leftAddon,
            rightAddon,
            button,
            inputClassName,
            ...props
        },
        ref,
    ) => {
        return (
            <label className={cn('grid content-stretch', className)}>
                {(label || labelHint || icon) && (
                    <span className="flex justify-between">
                        {label}
                        {labelHint}
                        {icon}
                    </span>
                )}
                <span className="flex rounded-md border border-gray-10 transition-[box-shadow,border-color] focus-within:border-secondary-4 focus-within:outline-none focus-within:ring-4 focus-within:ring-[hsla(186.667,_68%,_69%,_0.1)]">
                    {leftAddon}
                    <input
                        className={cn(
                            'flex min-h-9 w-full rounded-md bg-gray-11 px-3 text-base text-primary ring-0 placeholder:text-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                            inputClassName,
                        )}
                        type={type}
                        ref={ref}
                        {...props}
                    />
                    {rightAddon}
                    {button}
                </span>
                {inputHint}
            </label>
        );
    },
);
Input.displayName = 'Input';

export { Input };
