import { addThousandSeparators, formatBalance } from '@/shared/lib/react';

export const TokenBalanceInfo = ({
    tokenBalance,
    symbol,
}: {
    tokenBalance: string | number;
    symbol: string;
}) => {
    return (
        <div className="mb-6 flex w-full justify-center gap-x-1 rounded-md border border-gray-10 px-3 py-2 text-xs font-semibold text-secondary">
            Available Balance
            <span className="ml-1 text-primary">
                {tokenBalance} {symbol}
            </span>
        </div>
    );
};
