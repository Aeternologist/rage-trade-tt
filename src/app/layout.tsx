import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { type ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';
import './globals.css';
import { Providers } from './providers';
import { getConfig } from './wagmi.config';

export const metadata: Metadata = {
    title: 'Rage trade TT',
    description: 'Rage Trade | Technical Task',
    icons: {
        icon: {
            type: 'image/svg+xml',
            url: '/favicon.svg',
        },
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    const initialState = cookieToInitialState(
        getConfig(),
        headers().get('cookie'),
    );
    return (
        <html lang="en">
            <body>
                <Providers initialState={initialState}>
                    <div className="grid min-h-dvh grid-rows-[max-content_1fr] bg-gray-12">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
