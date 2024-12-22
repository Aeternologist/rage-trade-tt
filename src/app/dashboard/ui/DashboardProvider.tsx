'use client';

import type { ReactNode } from 'react';
import { formatUnits } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { AccountTokensContextProvider } from '@/widgets/AccountInfo';
import type { TokenDetails } from '@/widgets/AccountInfo/model/context';
import { formatBalance } from '@/shared/lib/react';
import { useReadSupportedContracts } from '../model/useReadSupportedContracts';
import { useTokensPrice } from '../model/useTokensPrice';

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const { chain, connector, address } = useAccount();
    const { data: accountBalance } = useBalance({ address });
    const accountTokensData = useReadSupportedContracts({
        chainId: chain?.id,
        address,
    });

    const { tokenPrices, nativeTokenPrice } = useTokensPrice(chain?.id);

    const nativeTokenBalance =
        accountBalance &&
        formatUnits(accountBalance?.value, accountBalance?.decimals);

    const nativeTokenDetails: TokenDetails = {
        name: chain?.nativeCurrency.name,
        symbol: chain?.nativeCurrency.symbol,
        tokenBalance: nativeTokenBalance,
        usdBalance:
            nativeTokenPrice && nativeTokenBalance
                ? formatBalance(
                      Number(nativeTokenBalance) * nativeTokenPrice.usd,
                      2,
                  )
                : 0,
    };

    console.log(tokenPrices);

    const accountBalancesInfo = accountTokensData?.reduce<{
        tokenDetails: TokenDetails[];
        totalBalance: number;
    }>(
        (acc, token) => {
            const tokenPrice = tokenPrices?.[token.address]?.usd;
            const usdBalance = tokenPrice
                ? formatBalance(Number(token.tokenBalance) * tokenPrice, 2)
                : 0;
            acc.tokenDetails.push({
                name: token.name,
                symbol: token.symbol,
                tokenBalance: token.tokenBalance,
                usdBalance: usdBalance || 0,
            });
            acc.totalBalance = acc.totalBalance + usdBalance;
            return acc;
        },
        {
            tokenDetails: [nativeTokenDetails],
            totalBalance: nativeTokenDetails.usdBalance,
        },
    );

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
