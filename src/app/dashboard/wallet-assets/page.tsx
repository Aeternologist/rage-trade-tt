'use client';

import { TokenTable } from '@/features/TokenTable';
import { useAccountTokensContext } from '@/widgets/AccountInfo';

const WalletAssets = () => {
    const { tokenDetails } = useAccountTokensContext();
    return (
        <TokenTable
            tokenDetails={tokenDetails.filter((token) =>
                Number(token.tokenBalance),
            )}
        />
    );
};

export default WalletAssets