'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { type ReactNode, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';
import { getConfig } from '../wagmi.config';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function Web3Provider(props: {
    children: ReactNode;
    initialState?: State;
}) {
    const [config] = useState(() => getConfig());
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }),
    );
    const { status } = useSession();

    return (
        <WagmiProvider config={config} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                {props.children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </WagmiProvider>
    );
}
