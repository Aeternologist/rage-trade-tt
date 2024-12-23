'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { DefaultWalletIcon } from '@/shared/ui/WalletIcons';

export const Profile = ({
    compact,
    children,
    ...props
}: {
    compact?: boolean;
    children: ReactNode;
} & ButtonProps) => {
    const { chain, connector, address: accountAddress } = useAccount();

    return (
        <Button
            leftIcon={
                connector?.icon ? (
                    <Image
                        className="rounded-sm"
                        src={connector?.icon}
                        width={16}
                        height={16}
                        alt={connector.name}
                    />
                ) : (
                    <DefaultWalletIcon />
                )
            }
            {...props}
        >
            {!compact && (
                <span className="text-xs font-semibold text-secondary">
                    {connector?.name}
                </span>
            )}
            {children}
        </Button>
    );
};
