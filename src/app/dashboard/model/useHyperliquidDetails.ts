import { useQueries, useQuery } from '@tanstack/react-query';
import { toHex } from 'viem';
import type { HyperliquidDetails, TokenDetails } from '@/widgets/AccountInfo';
import {
    getHyperliquidBalancesQuery,
    getHyperliquidDetailsQuery,
    getHyperliquidMetadataQuery,
} from '@/entities/HyperliquidDetails';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import type { Address } from '@/shared/lib/zod';

export const useHyperliquidDetails = (
    address: Address,
    getLogoBySymbol: (symbol: string | undefined | null) => string | undefined,
) => {
    const { data: balancesData } = useQuery(
        getHyperliquidBalancesQuery(address),
    );
    const { data: metadata } = useQuery(getHyperliquidMetadataQuery());
    const hyperLiquidTokensDetails = useQueries({
        queries:
            balancesData?.originalData && metadata
                ? balancesData.originalData.balances.map((token) =>
                      getHyperliquidDetailsQuery(
                          metadata.metadataBySymbol[token.coin].tokenId,
                      ),
                  )
                : [],
    });
    const result = hyperLiquidTokensDetails.reduce(
        (acc, { data }) => {
            const tokenMetadata = data && metadata?.metadataBySymbol[data.name];
            const tokenBalanceData =
                data && balancesData?.balancesBySymbol[data.name];

            const tokenPrice = Number(data?.midPx) || 0;
            const tokenTotalBalance = Number(tokenBalanceData?.total) || 0;
            const tokenUsdBalance = tokenPrice * tokenTotalBalance;

            const hyperliquidDetail = {
                address: tokenMetadata?.tokenId || '0x',
                symbol: data?.name || '',
                name: data?.name || '',
                price: tokenPrice,
                tokenBalance: String(tokenTotalBalance),
                usdBalance: tokenUsdBalance,
                logo: getLogoBySymbol(data?.name),
            };
            acc.hyperliquidDetails.push(hyperliquidDetail);
            data?.name &&
                (acc.hyperliquidDetailBySymbol[data.name] = hyperliquidDetail);
            acc.hyperliquidBalance += tokenUsdBalance;
            return acc;
        },
        {
            hyperliquidDetails: new Array<HyperliquidDetails>(),
            hyperliquidDetailBySymbol: {} as Record<string, HyperliquidDetails>,
            hyperliquidBalance: 0,
        },
    );
    return result;
};
