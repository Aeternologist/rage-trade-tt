import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import { AccountInfo } from '@/widgets/AccountInfo';
import { Header } from '@/shared/ui/Header';
import { Logo } from '@/shared/ui/Logo';
import { DashboardNavigationPanel } from './ui/DashboardNavigationPanel';
import { DashboardProvider } from './ui/DashboardProvider';

export const metadata: Metadata = {
    title: 'Rage trade',
    description: 'Rage Trade | Technical Task',
    icons: {
        icon: {
            type: 'image/svg+xml',
            url: '/favicon.svg',
        },
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DashboardProvider>
            <Header>
                <Logo />
                <AccountInfo></AccountInfo>
            </Header>
            <main className="m-2 flex flex-col rounded border border-gray-10">
                <DashboardNavigationPanel>{children}</DashboardNavigationPanel>
            </main>
        </DashboardProvider>
    );
}
