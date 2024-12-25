'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { Copy } from 'solar-icon-set';
import { useAccount, useDisconnect } from 'wagmi';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { IconButton } from '@/shared/ui/IconButton';
import { WalletIcon } from '@/shared/ui/WalletIcon';
import { DefaultWalletIcon } from '@/shared/ui/WalletIcons';
import { ProfilePopover } from './ProfilePopover';

export const Profile = ({
    compact,
    children,
    balance,
    ...props
}: {
    compact?: boolean;
    children: ReactNode;
    balance?: string;
} & ButtonProps) => {
    const { chain, connector, address: accountAddress } = useAccount();
    return (
        <>
            <Button
                popoverTarget="walletInfo"
                variant="secondary"
                size="small"
                leftIcon={
                    <WalletIcon
                        src={connector?.icon}
                        alt={connector?.name}
                        size={16}
                    />
                }
                {...props}
            >
                {!compact && (
                    <span className="text-xs font-semibold text-secondary">
                        {connector?.name}
                    </span>
                )}
                {balance}
            </Button>
            <ProfilePopover balance={balance}>{children}</ProfilePopover>
        </>
    );
};
