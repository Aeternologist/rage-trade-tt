import type { UseQueryOptions } from '@tanstack/react-query';
import {
    getPlatformAssets,
    getTokenIds,
    TokenId,
    type PlatformAssetsSchema,
    type TokensSchema,
    getTokenPriceByAddresses,
    getTokenPriceByIds,
    type TokenPriceByIdSchema,
    type TokenPriceByAddressSchema,
} from '@/shared/api';
import {
    SUPPORTED_CHAIN_IDS,
    type SupportedChainsId,
    SUPPORTED_CONTRACTS_INFO,
    SUPPORTED_ADDRESSES_SET,
} from '@/shared/constants/supportedTokens';
import type { Address } from '@/shared/lib/zod';

type PlatformAssetNameById = Record<SupportedChainsId, string>;
type TokenByAddress = Record<Address, TokensSchema[number]>;

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
        TokenPriceByAddressSchema,
        Error,
        TokenPriceByAddressSchema
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
