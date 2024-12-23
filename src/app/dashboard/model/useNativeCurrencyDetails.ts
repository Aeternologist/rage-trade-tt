import { useQueries, useQuery } from '@tanstack/react-query';
import { formatUnits } from 'viem';
import type { Register } from 'wagmi';
import { symbol } from 'zod';
import type { TokenDetails } from '@/widgets/AccountInfo/model/context';
import {
    getAccountBalancesQuery,
    getTokensPriceByIdsQuery,
} from '@/entities/TokenDetails';
import type { TokenId } from '@/shared/api';
import { NATIVE_CURRENCY_COINGECKO_ID } from '@/shared/constants/supportedTokens';
import type { Address } from '@/shared/lib/zod';
import { formatBalance } from './../../../shared/lib/react';

export const useNativeCurrencyDetails = (
    chains: Register['config']['chains'],
    accountAddr: Address | undefined,
) => {
    const nativeCurrencyIds = chains.map(
        (chain) => NATIVE_CURRENCY_COINGECKO_ID[chain.id],
    );

    const { data: nativeCurrencyPrices } = useQuery(
        getTokensPriceByIdsQuery(nativeCurrencyIds as TokenId[]),
    );

    const nativeCurrencyBalances = useQueries({
        queries: chains.map((chain) =>
            getAccountBalancesQuery({
                chainId: chain.id,
                accountAddr: accountAddr!,
            }),
        ),
    });

    console.log(
        nativeCurrencyBalances.map((n) => formatUnits(BigInt(n.data || 0), 18)),
    );

    const result = nativeCurrencyBalances.reduce(
        (acc, { data }, index) => {
            const currencyInfo = chains[index].nativeCurrency;
            const currencyId = NATIVE_CURRENCY_COINGECKO_ID[chains[index].id];
            const currencyBalance = formatUnits(
                BigInt(data || '0x0'),
                currencyInfo.decimals,
            );

            const currencyPrice =
                nativeCurrencyPrices?.[currencyId as TokenId]?.usd || 0;

            const currencyDetails = {
                chainId: chains[index].id,
                name: currencyInfo.name,
                symbol: currencyInfo.symbol,
                tokenBalance: currencyBalance,
                usdBalance: formatBalance(
                    Number(currencyBalance) * currencyPrice,
                    2,
                ),
            };

            acc.nativeCurrencyDetails.push(currencyDetails);

            acc.nativeCurrencyTotalUsdBalance += currencyDetails.usdBalance;

            return acc;
        },
        {
            nativeCurrencyDetails: new Array<TokenDetails>(),
            nativeCurrencyTotalUsdBalance: 0,
        },
    );

    return result;
};
