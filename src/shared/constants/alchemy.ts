import type { SupportedChainsId } from './supportedTokens';

export const ALCHEMY_NETWORK_NAMES_BY_CHAIN_ID = {
    '1': 'eth-mainnet',
    '10': 'opt-mainnet',
    '137': 'polygon-mainnet',
    '42161': 'arb-mainnet',
} as const satisfies Record<SupportedChainsId, string>;
export type AlchemyNetworkName =
    (typeof ALCHEMY_NETWORK_NAMES_BY_CHAIN_ID)[SupportedChainsId];
