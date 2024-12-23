import {
    ArbitrumNetworkIcon,
    EthereumNetworkIcon,
    OptimismNetworkIcon,
} from '@/shared/ui/NetworkIcons';
import type { NetworkButtonVariants } from './types';

export const NETWORK_BUTTON_VARIANTS = {
    Ethereum: {
        className:
            'aria-checked:border-ethereum/50 aria-checked:bg-ethereum/10 aria-checked:text-ethereum hover:border-ethereum/25 hover:bg-ethereum/5 hover:text-ethereum/50',
        Icon: EthereumNetworkIcon,
        text: 'Ethereum',
    },
    'Arbitrum One': {
        className:
            'aria-checked:border-arbitrum/50 aria-checked:bg-arbitrum/10 aria-checked:text-arbitrum hover:border-arbitrum/25 hover:bg-arbitrum/5 hover:text-arbitrum/50',
        Icon: ArbitrumNetworkIcon,
        text: 'Arbitrum',
    },
    'OP Mainnet': {
        className:
            'aria-checked:border-optimism/50 aria-checked:bg-optimism/10 aria-checked:text-optimism hover:border-optimism/25 hover:bg-optimism/5 hover:text-optimism/50 ',
        Icon: OptimismNetworkIcon,
        text: 'Optimism',
    },
} as const satisfies NetworkButtonVariants;
