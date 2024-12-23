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

    return (
        <div className={cn('relative w-7', className)}>
            {TokenIcon ? (
                <TokenIcon className={cn('rounded-full', className)} />
            ) : (
                <TextCircle
                    className={cn(className)}
                    size={24}
                    iconStyle="BoldDuotone"
                />
            )}
            <NetworkIcon
                className="absolute bottom-0 right-0 rounded-full"
                width={12}
                height={12}
            />
        </div>
    );
};
