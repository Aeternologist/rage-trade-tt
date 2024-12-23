'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useAccount, useChains, type Register } from 'wagmi';
import { AccountTokensContextProvider } from '@/widgets/AccountInfo';
import type { TokenDetails } from '@/widgets/AccountInfo/model/context';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import { formatBalance } from '@/shared/lib/react';
import { useNativeCurrencyDetails } from '../model/useNativeCurrencyDetails';
import { useReadSupportedContracts } from '../model/useReadSupportedContracts';
import { useTokensPrice } from '../model/useTokensPrice';

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const { chain, connector, address, isDisconnected } = useAccount();
    const chains = useChains();
    const router = useRouter();

    const accountTokensData = useReadSupportedContracts({
        chainIds: chains.map((chain) => chain.id) as SupportedChainsId[],
        address,
    });

    const tokenPricesByChainId = useTokensPrice(
        chains.map((chain) => chain.id) as SupportedChainsId[],
    );

    const { nativeCurrencyDetails, nativeCurrencyTotalUsdBalance } =
        useNativeCurrencyDetails(
            chains as Register['config']['chains'],
            address,
        );

    const accountBalancesInfo = accountTokensData?.reduce<{
        tokenDetails: TokenDetails[];
        totalBalance: number;
    }>(
        (acc, token) => {
            const tokenPrice =
                tokenPricesByChainId[token.chainId]?.[token.address]?.usd;

            const usdBalance = tokenPrice
                ? formatBalance(Number(token.tokenBalance) * tokenPrice, 2)
                : 0;

            acc.tokenDetails.push({
                chainId: token.chainId,
                name: token.name,
                symbol: token.symbol,
                price: formatBalance(tokenPrice || 0, 2),
                tokenBalance: token.tokenBalance,
                usdBalance: usdBalance || 0,
            });
            acc.totalBalance += usdBalance;
            return acc;
        },
        {
            tokenDetails: nativeCurrencyDetails,
            totalBalance: nativeCurrencyTotalUsdBalance,
        },
    );

    useEffect(() => {
        isDisconnected && router.push('/auth');
    }, [isDisconnected]);

    return accountBalancesInfo ? (
        <AccountTokensContextProvider
            value={{
                tokenDetails: accountBalancesInfo.tokenDetails,
                totalBalance: accountBalancesInfo.totalBalance,
            }}
        >
            {children}
        </AccountTokensContextProvider>
    ) : (
        <span>Loading...</span>
    );
};
