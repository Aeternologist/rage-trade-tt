import {
    erc20Abi,
    type ContractFunctionParameters,
    type ReadContractParameters,
    type RequiredBy,
} from 'viem';
import type { Register } from 'wagmi';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';
import { z } from 'zod';
import type { Address } from '../lib/zod';

export const SupportedTokens = z.enum([
    'USDC',
    'WBTC',
    'WETH',
    'LINK',
    'UNI',
    'USDT',
    'ARB',
    'SOL',
]);
export type SupportedTokens = z.infer<typeof SupportedTokens>;

export const SUPPORTED_CHAIN_IDS = [
    1, 42161, 10, 137,
] satisfies Register['config']['chains'][number]['id'][];
export type SupportedChainsId = (typeof SUPPORTED_CHAIN_IDS)[number];

export type SupportedChainContract = RequiredBy<
    Partial<ReadContractParameters<typeof erc20Abi>>,
    'address' | 'abi'
> & { name: SupportedTokens };

export const SUPPORTED_CONTRACTS_INFO = {
    [mainnet.id]: [
        {
            name: 'USDC',
            address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            abi: erc20Abi,
        },
        {
            name: 'WBTC',
            address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            abi: erc20Abi,
        },
        {
            name: 'WETH',
            address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            abi: erc20Abi,
        },
        {
            name: 'LINK',
            address: '0x514910771af9ca656af840dff83e8264ecf986ca',
            abi: erc20Abi,
        },
        {
            name: 'UNI',
            address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
            abi: erc20Abi,
        },
        {
            name: 'USDT',
            address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            abi: erc20Abi,
        },
        {
            name: 'ARB',
            address: '0xb50721bcf8d664c30412cfbc6cf7a15145234ad1',
            abi: erc20Abi,
        },
        {
            name: 'SOL',
            address: '0xD31a59c85aE9D8edEFeC411D448f90841571b89c',
            abi: erc20Abi,
        },
    ],
    [arbitrum.id]: [
        {
            name: 'USDC',
            address: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
            abi: erc20Abi,
        },
        {
            name: 'WBTC',
            address: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
            abi: erc20Abi,
        },
        {
            name: 'WETH',
            address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
            abi: erc20Abi,
        },
        {
            name: 'LINK',
            address: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
            abi: erc20Abi,
        },
        {
            name: 'UNI',
            address: '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0',
            abi: erc20Abi,
        },
        {
            name: 'USDT',
            address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
            abi: erc20Abi,
        },
        {
            name: 'ARB',
            address: '0x912ce59144191c1204e64559fe8253a0e49e6548',
            abi: erc20Abi,
        },
    ],
    [optimism.id]: [
        {
            name: 'USDC',
            address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
            abi: erc20Abi,
        },
        {
            name: 'WBTC',
            address: '0x68f180fcce6836688e9084f035309e29bf0a2095',
            abi: erc20Abi,
        },
        {
            name: 'WETH',
            address: '0x4200000000000000000000000000000000000006',
            abi: erc20Abi,
        },
        {
            name: 'LINK',
            address: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
            abi: erc20Abi,
        },
        {
            name: 'UNI',
            address: '0x6fd9d7ad17242c41f7131d257212c54a0e816691',
            abi: erc20Abi,
        },
        {
            name: 'USDT',
            address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
            abi: erc20Abi,
        },
    ],
    [polygon.id]: [
        {
            name: 'USDT',
            address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            abi: erc20Abi,
        },
        {
            name: 'ARB',
            address: '0x7E4c577ca35913af564ee2a24d882a4946Ec492B',
            abi: erc20Abi,
        },
    ],
} as const satisfies Record<SupportedChainsId, SupportedChainContract[]>;

export const NATIVE_TOKENS_COINGECKO_ID = {
    [mainnet.id]: 'ethereum',
    [arbitrum.id]: 'arbitrum',
    [optimism.id]: 'optimism',
    [polygon.id]: 'matic-network',
} as const satisfies Record<SupportedChainsId, string>;

export const SUPPORTED_ADDRESSES_SET = Object.values(
    SUPPORTED_CONTRACTS_INFO,
).reduce((acc, contracts) => {
    contracts.forEach((contract) => acc.add(contract.address as Address));
    return acc;
}, new Set<Address>());
