import type { ReactNode } from 'react';

const Header = ({ children }: { children: ReactNode }) => {
    return (
        <header className="flex justify-between border-b border-gray-10 bg-gray-11 px-6 py-3">
            {children}
        </header>
    );
};

Header.displayName = 'Header';
export { Header };
