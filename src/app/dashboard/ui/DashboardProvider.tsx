'use client';

import { useQueries } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { formatUnits } from 'viem';
import { useAccount, useBalance, useChains, type Register } from 'wagmi';
import { AccountTokensContextProvider } from '@/widgets/AccountInfo';
import type { TokenDetails } from '@/widgets/AccountInfo/model/context';
import { getTokenBalancesQuery } from '@/entities/TokenDetails';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import { formatBalance } from '@/shared/lib/react';
import { useNativeCurrencyDetails } from '../model/useNativeCurrencyDetails';
import { useReadSupportedContracts } from '../model/useReadSupportedContracts';
import { useTokensPrice } from '../model/useTokensPrice';


export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const { chain, connector, address, isDisconnected } = useAccount();
    const chains = useChains();

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
        isDisconnected && redirect('/auth');
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