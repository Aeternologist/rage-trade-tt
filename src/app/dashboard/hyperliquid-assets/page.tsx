'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccountTokensContext } from '@/widgets/AccountInfo';
import { TokenTable } from '@/features/TokenTable';
import { WithdrawDialog } from '@/features/Withdraw';
import { getHyperliquidBalancesQuery } from '@/entities/HyperliquidDetails';

const HyperliquidAssets = () => {
    const {
        hyperliquidBalance,
        hyperliquidDetailBySymbol,
        hyperliquidDetails,
    } = useAccountTokensContext();
    const kek = useQuery(
        getHyperliquidBalancesQuery(
            '0x0E9F6CdcafA80aF5c97fe6c0e6C750860eb48AE7',
        ),
    );
    return <TokenTable tokenDetails={hyperliquidDetails}></TokenTable>;
};

export default HyperliquidAssets;
