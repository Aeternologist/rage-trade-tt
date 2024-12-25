'use client';

import {
    useContext,
    createContext,
    useContextSelector,
} from 'use-context-selector';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import { invariant } from '@/shared/lib/react';
import type { Address } from '@/shared/lib/zod';
import type { HyperliquidDetails, TokenDetails } from '../types';

type AccountTokensContext = {
    tokenDetailByAddress: Record<
        SupportedChainsId,
        Record<Address, TokenDetails>
    >;
    hyperliquidDetailBySymbol: Record<string, HyperliquidDetails>;
    tokenDetails: TokenDetails[];
    hyperliquidDetails: HyperliquidDetails[];
    walletBalance: number;
    hyperliquidBalance: number;
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
