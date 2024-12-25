import type { ReactNode } from 'react';
import { Copy } from 'solar-icon-set';
import { useAccount, useDisconnect, useSwitchAccount } from 'wagmi';
import { cn } from '@/shared/lib/css';
import { IconButton } from '@/shared/ui/IconButton';
import { WalletIcon } from '@/shared/ui/WalletIcon';

export const ProfilePopover = ({
    balance,
    children,
}: {
    balance?: string;
    children?: ReactNode;
}) => {
    const { disconnect } = useDisconnect();
    const { connector, address } = useAccount();
    return (
        <section
            className={cn(
                'absolute inset-auto right-1 top-1 m-0 w-[300px] grid-cols-2 grid-rows-2 items-center justify-items-end rounded border border-gray-10 bg-gray-9 p-4 popover-open:grid',
                'opacity-0 transition-[opacity,overlay,display,transform] duration-500 transition-discrete popover-open:opacity-100 starting:opacity-0 starting:popover-open:opacity-0',
                'translate-y-14 popover-open:translate-y-0 starting:-translate-y-14 starting:popover-open:-translate-y-14',
                'backdrop:bg-black/30 backdrop:opacity-0 backdrop:backdrop-blur-[7.5px] backdrop:duration-500 popover-open:backdrop:opacity-100 starting:backdrop:opacity-0 starting:popover-open:backdrop:opacity-0',
            )}
            id="walletInfo"
            popover=""
        >
            <span className="flex gap-x-1 justify-self-start text-xs font-semibold text-[hsl(210,_100%,_50%)]">
                <WalletIcon
                    src={connector?.icon}
                    alt={connector?.name}
                    size={16}
                />
                {connector?.name}
            </span>
            <strong className="text-primary">{balance}</strong>
            <i className="inline-flex gap-x-1 justify-self-start text-xs lowercase not-italic text-secondary">
                {address?.replace(/^(.{4}).+(.{4})$/, '$1...$2')}{' '}
                <IconButton
                    onClick={() => navigator.clipboard.writeText(address!)}
                    className="max-h-4 bg-transparent p-0"
                    variant="tertiary"
                    size="small"
                    round
                >
                    <Copy iconStyle="Linear" size={16} />
                </IconButton>
            </i>
            <menu className="flex gap-x-2">
                <li className="contents">{children}</li>
                <li className="contents">
                    <button
                        onClick={() => disconnect()}
                        className="text-xxs text-red-1 underline"
                    >
                        Disconnect
                    </button>
                </li>
            </menu>
        </section>
    );
};
