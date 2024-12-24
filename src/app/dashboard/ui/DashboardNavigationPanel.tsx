'use client';

import Image from 'next/image';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';
import { useAccount } from 'wagmi';
import {
    useAccountTokensContext,
    NavigationPanel,
    type NavigationPanelLink,
} from '@/widgets/AccountInfo';
import { addThousandSeparators } from '@/shared/lib/react';
import { HyperliquidIcon } from '@/shared/ui/TokenIcons';
import { DefaultWalletIcon } from '@/shared/ui/WalletIcons';

export const DashboardNavigationPanel = ({
    children,
}: {
    children?: ReactNode;
}) => {
    const { totalBalance } = useAccountTokensContext();
    const activeSegment = useSelectedLayoutSegment();
    const { connector } = useAccount();

    const links = [
        {
            href: '/dashboard',
            children: 'Balance',
            suffix: `$${addThousandSeparators(totalBalance)}`,
        },
        {
            href: '/dashboard/wallet-assets',
            prefix: connector?.icon ? (
                <Image
                    src={connector.icon}
                    alt={connector.name}
                    width={24}
                    height={24}
                />
            ) : (
                <DefaultWalletIcon />
            ),
            children: connector?.name,
            suffix: `$${addThousandSeparators(totalBalance)}`,
        },
        {
            href: '/dashboard/hyperliquid-assets',
            prefix: <HyperliquidIcon />,
            children: 'Hyperliquid',
            suffix: `$${addThousandSeparators(totalBalance)}`,
        },
    ] as const satisfies NavigationPanelLink[];

    return (
        <section className="grid gap-y-4 bg-gray-11 px-4 py-6">
            <NavigationPanel
                activeLink={activeSegment || 'dashboard'}
                links={links}
            />
            {children}
        </section>
    );
};
