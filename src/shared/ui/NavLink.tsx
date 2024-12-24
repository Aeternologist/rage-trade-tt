import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/css';

export const NavLink = ({
    className,
    isActive,
    children,
    href,
    ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
    LinkProps & {
        isActive?: boolean;
        children?: ReactNode;
    }) => {
    return (
        <Link
            className={cn(
                'flex items-center gap-x-2 rounded border border-gray-9 p-2 text-xs font-semibold text-secondary transition-colors hover:bg-gray-9/50',
                isActive && 'bg-gray-9 hover:bg-gray-9',
                className,
            )}
            href={href}
            {...props}
        >
            {children}
        </Link>
    );
};
