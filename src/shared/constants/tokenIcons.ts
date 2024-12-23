import type { ComponentType, SVGProps } from 'react';
import {
    ArbitrumIcon,
    BTCIcon,
    EthereumIcon,
    HyperliquidIcon,
    USDCIcon,
} from '../ui/TokenIcons';

export const TOKEN_ICON_BY_SYM: Record<
    string,
    ComponentType<SVGProps<SVGSVGElement>> | undefined
> = {
    ETH: EthereumIcon,
    WETH: EthereumIcon,
    USDC: USDCIcon,
    BTC: BTCIcon,
    WBTC: BTCIcon,
    HYPE: HyperliquidIcon,
};
