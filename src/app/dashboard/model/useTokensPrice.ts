import { useQuery } from '@tanstack/react-query';
import {
    getPlatformAssetsQuery,
    getTokensPriceByAddressesQuery,
    getTokensPriceByIdsQuery,
} from '@/entities/TokenDetails';
import { type TokenId } from '@/shared/api';
import {
    NATIVE_TOKENS_COINGECKO_ID,
    SUPPORTED_CONTRACTS_INFO,
    type SupportedChainsId,
} from '@/shared/constants/supportedTokens';

export const useTokensPrice = (chainId: SupportedChainsId | undefined) => {
    const { data: assets } = useQuery(getPlatformAssetsQuery());

    const nativeTokenId = chainId && NATIVE_TOKENS_COINGECKO_ID[chainId];

    const { data: nativeTokenData } = useQuery(
        getTokensPriceByIdsQuery(nativeTokenId as TokenId),
    );

    const { data: tokenPrices } = useQuery(
        getTokensPriceByAddressesQuery({
            addresses: SUPPORTED_CONTRACTS_INFO[chainId!]?.map(
                (c) => c.address,
            ),
            assetPlatformId: assets?.[chainId!],
            enabled: Boolean(assets && chainId),
        }),
    );
    return {
        tokenPrices,
        nativeTokenPrice: nativeTokenData?.[nativeTokenId as TokenId],
    };
};
