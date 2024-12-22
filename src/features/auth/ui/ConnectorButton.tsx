import Image from 'next/image';
import type { ButtonHTMLAttributes } from 'react';
import type { Connector } from 'wagmi';
import { DefaultWalletIcon, WalletConnectIcon } from '@/shared/ui/WalletIcons';

const DEFAULT_ICONS: Record<string, JSX.Element | undefined> = {
    walletConnect: <WalletConnectIcon />,
};

const getWalletIcon = (id: string) =>
    DEFAULT_ICONS[id] || <DefaultWalletIcon />;

export const ConnectorButton = ({
    connector,
    connected,
    ...props
}: {
    connector: Connector;
    connected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className="relative flex items-center gap-x-2 border-0.5 border-gray-10 bg-gray-12/50 px-4 py-2.5 text-sm font-semibold text-[#0182FF] disabled:opacity-50 aria-checked:pointer-events-none hover:[&:not(:disabled)]:bg-gray-10/50"
            role="radio"
            aria-checked={connected}
            {...props}
        >
            {connector.icon ? (
                <Image
                    src={connector.icon}
                    alt={connector.name}
                    width={24}
                    height={24}
                />
            ) : (
                getWalletIcon(connector.id)
            )}
            {connector.name}
            {connected && (
                <span className="ms-auto inline-flex items-center gap-x-1 text-xs text-green-1 after:inline-block after:size-4 after:rounded-full after:border-4 after:border-green-3 after:bg-green-1">
                    Connected
                </span>
            )}
        </button>
    );
};
