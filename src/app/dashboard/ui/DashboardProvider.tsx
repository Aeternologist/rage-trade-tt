'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { formatUnits } from 'viem';
import { useAccount, useChains, type Register } from 'wagmi';
import {
    AccountTokensContextProvider,
    type TokenDetails,
} from '@/widgets/AccountInfo';
import type { TokenMetadataKey } from '@/entities/TokenDetails/model/localStore';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import { formatBalance } from '@/shared/lib/react';
import type { Address } from '@/shared/lib/zod';
import { useHyperliquidDetails } from '../model/useHyperliquidDetails';
import { useNativeCurrencyDetails } from '../model/useNativeCurrencyDetails';
import { useReadSupportedContracts } from '../model/useReadSupportedContracts';
import { useTokensMetadata } from '../model/useTokensMetadata';
import { useTokensPrice } from '../model/useTokensPrice';

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const { chain, connector, address, isDisconnected } = useAccount();
    const chains = useChains();
    const router = useRouter();
    const chainIds = chains.map((chain) => chain.id) as SupportedChainsId[];
    const { tokensMetadata, getLogoBySymbol } = useTokensMetadata(chainIds);

    const accountTokensData = useReadSupportedContracts({
        chainIds,
        address,
    });

    const tokenPricesByChainId = useTokensPrice(chainIds);

    const {
        nativeCurrencyDetails,
        nativeCurrencyDetailByAddress,
        nativeCurrencyTotalUsdBalance,
    } = useNativeCurrencyDetails(
        chains as Register['config']['chains'],
        address,
    );

    const accountBalancesInfo = accountTokensData?.reduce<{
        tokenDetails: TokenDetails[];
        tokenDetailByAddress: Record<
            SupportedChainsId,
            Record<Address, TokenDetails>
        >;
        walletBalance: number;
    }>(
        (acc, token) => {
            const tokenMetadataKey =
                `${token.chainId}-${token.address}` satisfies TokenMetadataKey;
            const tokenMetadata = tokensMetadata[tokenMetadataKey];

            const tokenPrice =
                tokenPricesByChainId[token.chainId]?.[token.address]?.usd;

            const tokenBalance = formatUnits(
                token.tokenBalance,
                tokenMetadata?.decimals || 18,
            );

            const usdBalance = tokenPrice
                ? formatBalance(Number(tokenBalance) * tokenPrice, 2)
                : 0;

            const tokenDetails = {
                address: token.address,
                chainId: token.chainId,
                name: tokenMetadata?.name || '',
                symbol: tokenMetadata?.symbol || '',
                decimals: tokenMetadata?.decimals || 18,
                logo:
                    tokenMetadata?.logo ||
                    getLogoBySymbol(tokenMetadata?.symbol),
                price: formatBalance(tokenPrice || 0, 2),
                tokenBalance: tokenBalance,
                usdBalance: usdBalance || 0,
            };

            acc.tokenDetails.push(tokenDetails);
            acc.tokenDetailByAddress[token.chainId][token.address] =
                tokenDetails;
            acc.walletBalance += usdBalance;
            return acc;
        },
        {
            tokenDetails: nativeCurrencyDetails,
            tokenDetailByAddress: nativeCurrencyDetailByAddress,
            walletBalance: nativeCurrencyTotalUsdBalance,
        },
    );

    const {
        hyperliquidDetails,
        hyperliquidBalance,
        hyperliquidDetailBySymbol,
    } = useHyperliquidDetails(address!, getLogoBySymbol);

    useEffect(() => {
        isDisconnected && router.push('/auth');
    }, [isDisconnected]);

    return (
        <AccountTokensContextProvider
            value={{
                tokenDetailByAddress:
                    accountBalancesInfo?.tokenDetailByAddress || {
                        '1': {},
                        '10': {},
                        '42161': {},
                    },
                hyperliquidDetailBySymbol,
                tokenDetails: accountBalancesInfo?.tokenDetails || [],
                hyperliquidDetails,
                walletBalance: accountBalancesInfo?.walletBalance || 0,
                hyperliquidBalance,
                totalBalance:
                    hyperliquidBalance +
                    (accountBalancesInfo?.walletBalance || 0),
            }}
        >
            {children}
        </AccountTokensContextProvider>
    );
};
