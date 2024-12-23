import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { arbitrum, optimism, mainnet } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

export function getConfig() {
    return createConfig({
        chains: [mainnet, arbitrum, optimism],
        connectors: [
            walletConnect({
                projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
            }),
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        pollingInterval: 30_000,
        transports: {
            [mainnet.id]: http(
                `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            ),
            [arbitrum.id]: http(
                `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            ),
            [optimism.id]: http(
                `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            ),
            /*             [polygon.id]: http(
                `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
            ), */
        },
    });
}

declare module 'wagmi' {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}
