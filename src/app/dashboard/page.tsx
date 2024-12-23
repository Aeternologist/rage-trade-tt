'use client';

import { useAccountTokensContext } from '@/widgets/AccountInfo';
import { Profile } from '@/features/Profile';
import { TokenTable } from '@/features/TokenTable';
import { addThousandSeparators } from '@/shared/lib/react';
import { Button } from '@/shared/ui/Button';
import { HyperliquidIcon } from '@/shared/ui/TokenIcons';

const Dashboard = () => {
    const { tokenDetails, totalBalance } = useAccountTokensContext();
    return (
        <section className="grid gap-y-4 bg-gray-11 px-4 py-6">
            <div className="flex gap-x-3">
                <div className="flex items-center gap-x-2 border border-gray-9 p-2">
                    <span className="text-xs font-semibold text-secondary">
                        Balance
                    </span>
                    <span className="text-sm font-semibold text-primary">
                        ${addThousandSeparators(totalBalance)}
                    </span>
                </div>
                <div className="flex items-center gap-x-2 border border-gray-9">
                    <Profile
                        aria-checked
                        variant="secondary"
                        className="h-full bg-transparent p-0 px-2 aria-checked:bg-gray-9"
                    >
                        <span className="text-sm font-semibold text-primary">
                            ${addThousandSeparators(totalBalance)}
                        </span>
                    </Profile>
                </div>
                <div className="flex items-center gap-x-2 border border-gray-9">
                    <Button
                        variant="secondary"
                        className="h-full bg-transparent p-0 px-2 aria-checked:bg-gray-9"
                        leftIcon={<HyperliquidIcon />}
                    >
                        <span className="text-xs font-semibold text-secondary">
                            Hyperliquid
                        </span>
                        <span className="text-sm font-semibold text-primary">
                            ${0}
                        </span>
                    </Button>
                </div>
            </div>
            <TokenTable
                tokenDetails={tokenDetails.filter((token) =>
                    Number(token.tokenBalance),
                )}
            />
        </section>
    );
};

export default Dashboard;
