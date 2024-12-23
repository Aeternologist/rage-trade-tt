import { useQueries, useQuery } from '@tanstack/react-query';
import type { Register } from 'wagmi';
import {
    getPlatformAssetsQuery,
    getTokensPriceByAddressesQuery,
    getTokensPriceByIdsQuery,
} from '@/entities/TokenDetails';
import { type TokenId, type TokenPriceByAddress } from '@/shared/api';
import {
    NATIVE_CURRENCY_COINGECKO_ID,
    SUPPORTED_CONTRACTS_INFO,
    type SupportedChainsId,
} from '@/shared/constants/supportedTokens';

export const useTokensPrice = (chainIds: SupportedChainsId[]) => {
    const { data: assets } = useQuery(getPlatformAssetsQuery());

    const tokenPricesArr = useQueries({
        queries: chainIds.map((chainId) =>
            getTokensPriceByAddressesQuery({
                addresses: SUPPORTED_CONTRACTS_INFO[chainId]?.map(
                    (c) => c.address,
                ),
                assetPlatformId: assets?.[chainId],
                enabled: Boolean(assets),
            }),
        ),
    });

    const tokenPricesByChainId = tokenPricesArr.reduce(
        (acc, tokenPrices, index) => {
            acc[chainIds[index]] = tokenPrices.data;
            return acc;
        },
        {} as Record<SupportedChainsId, TokenPriceByAddress | undefined>,
    );

    return tokenPricesByChainId;
};
