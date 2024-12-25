import Image from 'next/image';
import { TextCircle } from 'solar-icon-set';
import { NETWORK_ICON_BY_ID } from '../constants/networkIcons';
import type { SupportedChainsId } from '../constants/supportedTokens';
import { TOKEN_ICON_BY_SYM } from '../constants/tokenIcons';
import { cn } from '../lib/css';

export const NetworkIcon = ({
    size,
    chainId,
    className,
}: {
    size?: number;
    chainId: SupportedChainsId;
    className?: string;
}) => {
    const Icon = NETWORK_ICON_BY_ID[chainId];

    return (
        <Icon
            className={cn('absolute bottom-0 right-0 rounded-full', className)}
            width={size}
            height={size}
        />
    );
};
