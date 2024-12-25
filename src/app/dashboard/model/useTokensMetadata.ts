'use client';

import { useQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    tokensMetadataLocalStore,
    type TokensMetadataLocalStore,
} from '@/entities/TokenDetails';
import { getTokenMetadataQuery } from '@/entities/TokenDetails/model/queries';
import {
    SUPPORTED_CONTRACTS_INFO,
    type SupportedChainsId,
} from '@/shared/constants/supportedTokens';

const getTokenMetadataQueriesOptions = (
    chainId: SupportedChainsId,
    cachedTokensMetadata?: TokensMetadataLocalStore['tokenMetadata'],
) =>
    SUPPORTED_CONTRACTS_INFO[chainId].map((contract) =>
        getTokenMetadataQuery({
            chainId,
            tokenAddr: contract.address,
            initialData:
                cachedTokensMetadata?.[`${chainId}-${contract.address}`],
        }),
    );

export const useTokensMetadata = (chainIds: SupportedChainsId[]) => {
    const [cachedState, setCachedState] = useState<{
        isCacheLoaded: boolean;
        cachedTokensMetadata:
            | TokensMetadataLocalStore['tokenMetadata']
            | undefined;
    }>({
        isCacheLoaded: false,
        cachedTokensMetadata: undefined,
    });

    useEffect(() => {
        const getCachedData = async () => {
            const cachedTokensMetadata =
                await tokensMetadataLocalStore.getItem('tokenMetadata');
            setCachedState({ isCacheLoaded: true, cachedTokensMetadata });
        };
        getCachedData();
    }, []);

    const queriesData = useQueries({
        queries: cachedState.isCacheLoaded
            ? chainIds.flatMap((chainId) =>
                  getTokenMetadataQueriesOptions(
                      chainId,
                      cachedState.cachedTokensMetadata,
                  ),
              )
            : [],
    });

    const tokensMetadata = queriesData.reduce<
        TokensMetadataLocalStore['tokenMetadata']
    >((acc, { data }) => {
        const cacheKey = data?.cacheKey;
        cacheKey && (acc[cacheKey] = data);
        return acc;
    }, {});

    useEffect(() => {
        if (
            queriesData.length &&
            queriesData.every((result) => !result.isFetching)
        ) {
            tokensMetadataLocalStore.setItem('tokenMetadata', tokensMetadata);
        }
    }, [queriesData]);

    const getLogoBySymbol = (symbol: string | null | undefined) =>
        (symbol &&
            queriesData.find(({ data }) => data?.symbol === symbol && data.logo)
                ?.data?.logo) ||
        undefined;
    return { tokensMetadata, getLogoBySymbol };
};
