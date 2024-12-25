import type { ComponentType, ReactNode, SVGProps } from 'react';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import type { Address } from '@/shared/lib/zod';

export type NavigationPanelLink = {
    href: string;
    prefix?: ReactNode;
    children?: ReactNode;
    suffix?: ReactNode;
};

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

export type HyperliquidDetails = {
    address: Address;
    name: string;
    symbol: string;
    logo?: string;
    price: number;
    tokenBalance: string;
    usdBalance: number;
    chainId?: undefined;
    decimals?: undefined;
};
