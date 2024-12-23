'use client';

import type { ReactNode } from 'react';
import { useAccountTokensContext, WalletsPanel } from '@/widgets/AccountInfo';
import { addThousandSeparators } from '@/shared/lib/react';

export const DashboardWalletsPanel = ({
    children,
}: {
    children?: ReactNode;
}) => {
    const { totalBalance } = useAccountTokensContext();
    return (
        <section className="grid gap-y-4 bg-gray-11 px-4 py-6">
            <WalletsPanel balance={addThousandSeparators(totalBalance)} />
            {children}
        </section>
    );
};
