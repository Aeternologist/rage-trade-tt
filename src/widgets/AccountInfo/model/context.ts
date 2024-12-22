'use client';

import { useContext, createContext } from 'use-context-selector';
import { invariant } from '@/shared/lib/react';
import type { Address } from '@/shared/lib/zod';

export type TokenDetails = {
    name?: string;
    symbol?: string;
    tokenBalance?: string;
    usdBalance: number;
};

type AccountTokensContext = {
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
