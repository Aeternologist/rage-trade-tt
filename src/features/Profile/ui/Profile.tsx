'use client';

import Image from 'next/image';
import { useAccount } from 'wagmi';
import { Button } from '@/shared/ui/Button';
import { DefaultWalletIcon } from '@/shared/ui/WalletIcons';

export const Profile = ({ balance }: { balance: string }) => {
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
        >
            {balance}
        </Button>
    );
};
