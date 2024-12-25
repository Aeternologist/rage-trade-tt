import Image from 'next/image';
import { TextCircle } from 'solar-icon-set';
import { NETWORK_ICON_BY_ID } from '../constants/networkIcons';
import type { SupportedChainsId } from '../constants/supportedTokens';
import { TOKEN_ICON_BY_SYM } from '../constants/tokenIcons';
import { cn } from '../lib/css';

export const AssetIcon = ({
    symbol,
    logo,
    size,
    className,
}: {
    symbol: string;
    logo?: string;
    size?: number;
    className?: string;
}) => {
    const DefaultTokenIcon = TOKEN_ICON_BY_SYM[symbol];
    const FallBackTokenIcon = TextCircle;

    return logo ? (
        <Image
            width={size || 24}
            height={size || 24}
            src={logo}
            alt={symbol}
            className={cn('rounded-full h-full', className)}
        />
    ) : DefaultTokenIcon ? (
        <DefaultTokenIcon className={cn('rounded-full', className)} />
    ) : (
        <FallBackTokenIcon
            className={cn(className)}
            size={size || 24}
            iconStyle="BoldDuotone"
        />
    );
};
