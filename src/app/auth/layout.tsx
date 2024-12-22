import type { Metadata } from 'next';
import { type ReactNode } from 'react';
import { Wallet } from 'solar-icon-set';
import { SignIn } from '@/features/auth/ui/SignIn';
import { Header } from '@/shared/ui/Header';
import { Logo } from '@/shared/ui/Logo';

export const metadata: Metadata = {
    title: 'Rage trade Auth',
    description: 'Rage Trade | Technical Task',
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header>
                <Logo />
                <SignIn leftIcon={<Wallet iconStyle="BoldDuotone" />}>
                    Connect Wallet
                </SignIn>
            </Header>
            <main className="m-2 flex flex-col rounded border border-gray-10 px-4 py-6">
                {children}
            </main>
        </>
    );
}
