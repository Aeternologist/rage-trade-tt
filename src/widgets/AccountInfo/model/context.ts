'use client';

import {
    useContext,
    createContext,
    useContextSelector,
} from 'use-context-selector';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import { invariant } from '@/shared/lib/react';
import type { Address } from '@/shared/lib/zod';

export type TokenDetails = {
    address: Address;
    chainId: SupportedChainsId;
    name: string;
    symbol: string;
    decimals: number;
    logo?: string;
    price: number;
    tokenBalance: string;
    usdBalance: number;
};

type AccountTokensContext = {
    tokenDetailByAddress: Record<
        SupportedChainsId,
        Record<Address, TokenDetails>
    >;
    tokenDetails: TokenDetails[];
    totalBalance: number;
};

export const accountTokensContext = createContext<AccountTokensContext | null>(
    null,
);

export const useAccountTokensContext = () => {
    const value = useContext(accountTokensContext);
    return (value ||
        invariant(
            value,
            'AccountTokensContext context not passed, please wrap your components with <AccountTokensContextProvider />',
        )) as AccountTokensContext;
};

export const AccountTokensContextProvider = accountTokensContext.Provider;
