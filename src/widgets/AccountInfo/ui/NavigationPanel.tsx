import { NavLink } from '@/shared/ui/NavLink';
import type { NavigationPanelLink } from '../types';

export const NavigationPanel = ({
    links,
    activeLink,
}: {
    links: NavigationPanelLink[];
    activeLink: string;
}) => {
    return (
        <nav className="flex gap-x-3">
            {links.map(({ href, prefix, children, suffix }) => (
                <NavLink
                    key={href}
                    href={href}
                    isActive={href.endsWith(activeLink)}
                >
                    {prefix}
                    {children}
                    <span className="text-sm font-semibold text-primary">
                        {suffix}
                    </span>
                </NavLink>
            ))}
        </nav>
    );
};
