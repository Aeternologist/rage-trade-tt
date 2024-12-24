import Image from 'next/image';
import { TextCircle } from 'solar-icon-set';
import { NETWORK_ICON_BY_ID } from '../constants/networkIcons';
import type { SupportedChainsId } from '../constants/supportedTokens';
import { TOKEN_ICON_BY_SYM } from '../constants/tokenIcons';
import { cn } from '../lib/css';

export const AssetIcon = ({
    symbol,
    logo,
    chainId,
    className,
}: {
    symbol: string;
    logo?: string;
    chainId: SupportedChainsId;
    className?: string;
}) => {
    const NetworkIcon = NETWORK_ICON_BY_ID[chainId];
    const DefaultTokenIcon = TOKEN_ICON_BY_SYM[symbol];
    const FallBackTokenIcon = TextCircle;
    
    const tokenIcon = logo ? (
        <Image
            src={logo}
            alt={symbol}
            className={cn('rounded-full', className)}
        />
    ) : DefaultTokenIcon ? (
        <DefaultTokenIcon className={cn('rounded-full', className)} />
    ) : (
        <FallBackTokenIcon
            className={cn(className)}
            size={24}
            iconStyle="BoldDuotone"
        />
    );

    return (
        <div className={cn('relative w-7', className)}>
            {tokenIcon}
            <NetworkIcon
                className="absolute bottom-0 right-0 rounded-full"
                width={12}
                height={12}
            />
        </div>
    );
};
