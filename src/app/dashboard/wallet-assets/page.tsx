'use client';

import { useAccountTokensContext } from '@/widgets/AccountInfo';
import { TokenTable } from '@/features/TokenTable';
import { WithdrawDialog } from '@/features/Withdraw';

const WalletAssets = () => {
    const { tokenDetails } = useAccountTokensContext();
    return (
        <TokenTable
            tokenDetails={tokenDetails.filter((token) =>
                Number(token.tokenBalance),
            )}
        >
            {(tokenAddr, chainId) => (
                <WithdrawDialog
                    className="w-full"
                    variant="secondary"
                    size="small"
                    defaultTokenAddr={tokenAddr}
                    defaultChainId={chainId}
                >
                    Withdraw
                </WithdrawDialog>
            )}
        </TokenTable>
    );
};

export default WalletAssets;
