'use client';

import { useAccountTokensContext } from '@/widgets/AccountInfo';
import { TokenTable } from '@/features/TokenTable';

const HyperliquidAssets = () => {
    const { hyperliquidDetails } = useAccountTokensContext();
    return <TokenTable tokenDetails={hyperliquidDetails}></TokenTable>;
};

export default HyperliquidAssets;
