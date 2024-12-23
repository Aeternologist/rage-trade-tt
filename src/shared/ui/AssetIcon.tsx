import { TextCircle } from 'solar-icon-set';
import { NETWORK_ICON_BY_ID } from '../constants/networkIcons';
import type { SupportedChainsId } from '../constants/supportedTokens';
import { TOKEN_ICON_BY_SYM } from '../constants/tokenIcons';
import { cn } from '../lib/css';

export const AssetIcon = ({
    symbol,
    chainId,
    className,
}: {
    symbol: string;
    chainId: SupportedChainsId;
    className?: string;
}) => {
    const TokenIcon = TOKEN_ICON_BY_SYM[symbol];
    const NetworkIcon = NETWORK_ICON_BY_ID[chainId];

    return TokenIcon ? (
        <div className={cn('relative w-7', className)}>
            <TokenIcon className={cn('rounded-full', className)} />
            <NetworkIcon
                className="absolute rounded-full right-0 bottom-0"
                width={12}
                height={12}
            />
        </div>
    ) : (
        <TextCircle
            className={cn(className)}
            size={24}
            iconStyle="BoldDuotone"
        />
    );
};
