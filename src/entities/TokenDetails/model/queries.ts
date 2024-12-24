import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import {
    getPlatformAssets,
    getTokenIds,
    TokenId,
    type PlatformAssetsSchema,
    type TokensSchema,
    getTokenPriceByAddresses,
    getTokenPriceByIds,
    type TokenPriceByIdSchema,
    type TokenPriceByAddress,
    getTokenBalances,
    type TokenBalanceSchema,
    getAccountBalances,
    type AccountBalanceSchema,
    getTokenMetadata,
    type TokenMetadata,
} from '@/shared/api';
import { ALCHEMY_NETWORK_NAMES_BY_CHAIN_ID } from '@/shared/constants/alchemy';
import {
    SUPPORTED_CHAIN_IDS,
    type SupportedChainsId,
    SUPPORTED_CONTRACTS_INFO,
    SUPPORTED_ADDRESSES_SET,
} from '@/shared/constants/supportedTokens';
import type { Address } from '@/shared/lib/zod';
import type { TokenMetadataKey } from './localStore';

type PlatformAssetNameById = Record<SupportedChainsId, string>;
type TokenByAddress = Record<Address, TokensSchema[number]>;
type TokenBalanceByAddress = Record<Address, string>;

export const getTokenMetadataQuery = ({
    chainId,
    tokenAddr,
    initialData,
}: {
    chainId: SupportedChainsId;
    tokenAddr: Address;
    initialData: TokenMetadata['result'] | void;
}) =>
    queryOptions({
        queryKey: [{ type: 'tokenMetadata', chainId, tokenAddr }],
        queryFn: () =>
            getTokenMetadata({
                network: ALCHEMY_NETWORK_NAMES_BY_CHAIN_ID[chainId],
                tokenAddr,
            }),
        select: (data) =>
            data && {
                cacheKey: `${chainId}-${tokenAddr}` satisfies TokenMetadataKey,
                ...data,
            },
        enabled: Boolean(chainId && tokenAddr),
        staleTime: Infinity,
        initialData: initialData,
    });

export const getAccountBalancesQuery = ({
    chainId,
    accountAddr,
}: {
    chainId: SupportedChainsId;
    accountAddr: Address;
}) =>
    ({
        queryKey: [{ type: 'accountBalances', chainId, accountAddr }],
        queryFn: () =>
            getAccountBalances({
                network: ALCHEMY_NETWORK_NAMES_BY_CHAIN_ID[chainId],
                accountAddr,
            }),
        select: (data) => data.result,
        enabled: Boolean(chainId && accountAddr),
    }) satisfies UseQueryOptions<
        AccountBalanceSchema,
        Error,
        AccountBalanceSchema['result']
    >;

export const getTokenBalancesQuery = ({
    chainId,
    accountAddr,
}: {
    chainId: SupportedChainsId;
    accountAddr: Address;
}) =>
    ({
        queryKey: [{ type: 'tokenBalances', chainId, accountAddr }],
        queryFn: () =>
            getTokenBalances({
                network: ALCHEMY_NETWORK_NAMES_BY_CHAIN_ID[chainId],
                accountAddr,
                tokenAddr: SUPPORTED_CONTRACTS_INFO[chainId].map(
                    (contract) => contract.address,
                ),
            }),
        select: (data) => data.result.tokenBalances,
        enabled: Boolean(chainId && accountAddr),
    }) satisfies UseQueryOptions<
        TokenBalanceSchema,
        Error,
        TokenBalanceSchema['result']['tokenBalances']
    >;

export const getPlatformAssetsQuery = () =>
    ({
        queryKey: ['platformAssets'],
        queryFn: getPlatformAssets,
        staleTime: Infinity,
        select: (data) =>
            data.reduce<PlatformAssetNameById>((acc, asset) => {
                SUPPORTED_CHAIN_IDS.includes(
                    asset.chain_identifier as SupportedChainsId,
                ) &&
                    (acc[asset.chain_identifier as SupportedChainsId] =
                        asset.id);
                return acc;
            }, {} as PlatformAssetNameById),
    }) satisfies UseQueryOptions<
        PlatformAssetsSchema,
        Error,
        PlatformAssetNameById
    >;

export const getTokenIdsQuery = () =>
    ({
        queryKey: ['tokenIds'],
        queryFn: getTokenIds,
        staleTime: Infinity,
        select: (data) =>
            data.reduce<{ tokenById: TokenByAddress; tokenIds: TokenId[] }>(
                (acc, token) => {
                    Object.values(token.platforms).forEach((address) => {
                        if (address && SUPPORTED_ADDRESSES_SET.has(address)) {
                            acc.tokenById[address] = token;
                            acc.tokenIds.push(token.id);
                        }
                    });
                    return acc;
                },
                { tokenById: {}, tokenIds: new Array() },
            ),
    }) satisfies UseQueryOptions<
        TokensSchema,
        Error,
        { tokenById: TokenByAddress; tokenIds: TokenId[] }
    >;

export const getTokensPriceByAddressesQuery = ({
    addresses,
    assetPlatformId,
    enabled,
}: {
    addresses: Address[] | Address;
    assetPlatformId: string | undefined;
    enabled?: boolean;
}) =>
    ({
        queryKey: [
            Array.isArray(addresses)
                ? addresses.map((address) => ({
                      type: 'tokenPriceByAddress',
                      address: address,
                  }))
                : { type: 'tokenPriceByAddress', address: addresses },
        ],
        queryFn: () =>
            getTokenPriceByAddresses({
                assetPlatformId: assetPlatformId!,
                addresses: addresses!,
            }),
        staleTime: 1000 * 30,
        enabled: enabled,
    }) satisfies UseQueryOptions<
        TokenPriceByAddress,
        Error,
        TokenPriceByAddress
    >;

export const getTokensPriceByIdsQuery = (tokenIds: TokenId[] | TokenId) =>
    ({
        queryKey: [
            Array.isArray(tokenIds)
                ? tokenIds.map((tokenId) => ({
                      type: 'tokenPriceById',
                      tokenId: tokenId,
                  }))
                : { type: 'tokenPriceById', address: tokenIds },
        ],
        queryFn: () => getTokenPriceByIds(tokenIds),
        staleTime: 1000 * 30,
        enabled: Boolean(tokenIds),
    }) satisfies UseQueryOptions<
        TokenPriceByIdSchema,
        Error,
        TokenPriceByIdSchema
    >;
