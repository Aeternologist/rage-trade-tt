import { queryOptions } from '@tanstack/react-query';
import {
    getHyperliquidBalances,
    getHyperliquidMetadata,
    getHyperliquidTokenDetails,
    type HyperliquidTokensMetadata,
} from '@/shared/api';
import type { HyperliquidBalances } from '@/shared/api/getHyperliquidBalances';
import { Address } from './../../../shared/lib/zod';

export const getHyperliquidBalancesQuery = (user: Address) =>
    queryOptions({
        queryKey: [{ type: 'hyperliquidBalances', user }],
        queryFn: () => getHyperliquidBalances(user),
        enabled: Boolean(user),
        select: (data) =>
            data.balances.reduce(
                (acc, token) => {
                    acc.balancesBySymbol[token.coin] = token;
                    return acc;
                },
                {
                    balancesBySymbol: {} as Record<
                        string,
                        HyperliquidBalances['balances'][number]
                    >,
                    originalData: data,
                },
            ),
    });

export const getHyperliquidDetailsQuery = (tokenId: Address) =>
    queryOptions({
        queryKey: [{ type: 'hyperliquidDetails', tokenId }],
        queryFn: () => getHyperliquidTokenDetails(tokenId),
        enabled: Boolean(tokenId),
    });

export const getHyperliquidMetadataQuery = () =>
    queryOptions({
        queryKey: ['hyperliquidMetadata'],
        queryFn: () => getHyperliquidMetadata(),
        staleTime: Infinity,
        select: (data) =>
            data.tokens.reduce(
                (acc, token) => {
                    acc.metadataBySymbol[token.name] = token;
                    return acc;
                },
                {
                    metadataBySymbol: {} as Record<
                        string,
                        HyperliquidTokensMetadata
                    >,
                    originalData: data,
                },
            ),
    });
