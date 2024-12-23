import type { ComponentType, SVGProps } from 'react';
import {
    ArbitrumNetworkIcon,
    EthereumNetworkIcon,
    OptimismNetworkIcon,
} from '../ui/NetworkIcons';
import type { SupportedChainsId } from './supportedTokens';

export const NETWORK_ICON_BY_ID: Record<
    SupportedChainsId,
    ComponentType<SVGProps<SVGSVGElement>>
> = {
    '1': EthereumNetworkIcon,
    '10': OptimismNetworkIcon,
    '42161': ArbitrumNetworkIcon,
};
