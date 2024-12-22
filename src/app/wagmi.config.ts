import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { arbitrum, optimism, mainnet, polygon } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

export function getConfig() {
    return createConfig({
        chains: [mainnet, arbitrum, optimism, polygon],
        connectors: [
            walletConnect({
                projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
            }),
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [mainnet.id]: http(),
            [arbitrum.id]: http(),
            [optimism.id]: http(),
            [polygon.id]: http(),
        },
    });
}

declare module 'wagmi' {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}
