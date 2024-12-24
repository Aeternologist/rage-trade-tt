'use client';

import { useRef } from 'react';
import { useAccount, useConnect, useSwitchChain } from 'wagmi';
import { useAccountTokensContext } from '@/widgets/AccountInfo';
import { ConnectorButton } from '@/features/auth/ui/ConnectorButton';
import { useSignIn } from '@/features/auth/ui/useSignIn';
import { NetworkButton } from '@/entities/NetworkButton';
import { addThousandSeparators, formatBalance } from '@/shared/lib/react';
import { AssetIcon } from '@/shared/ui/AssetIcon';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import {
    ArbitrumNetworkIcon,
    EthereumNetworkIcon,
    OptimismNetworkIcon,
} from '@/shared/ui/NetworkIcons';
import { WalletIcon } from '@/shared/ui/WalletIcon';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/shadcn/table';

const WithdrawDialog = (props: ButtonProps) => {
    const { chainId, address } = useAccount();
    const { chains, switchChainAsync } = useSwitchChain();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openModal = () => {
        dialogRef.current?.showModal();
    };
    const signIn = useSignIn();

    return (
        <>
            <Button
                {...props}
                onClick={openModal}
                disabled={status === 'pending'}
            />
            <Dialog className="w-[437px] gap-y-4" ref={dialogRef}>
                <h2 className="font-semibold text-primary">Withdraw</h2>
                <span className="flex w-full items-center text-center text-xs text-secondary before:mr-4 before:flex-1 before:border-t before:border-gray-10 after:ml-4 after:flex-1 after:border-t after:border-gray-10">
                    Network
                </span>
                <menu className="flex w-full justify-center gap-y-1 border-b border-dashed border-gray-10 py-4">
                    {chains.map((chain) => (
                        <li className="contents" key={chain.id}>
                            <NetworkButton
                                type="button"
                                network={chain.name}
                                checked={chain.id === chainId}
                                disabled={status === 'pending'}
                                onClick={() =>
                                    switchChainAsync({
                                        chainId: chain.id,
                                    }).then(() => signIn(chain.id, address!))
                                }
                            />
                        </li>
                    ))}
                </menu>
            </Dialog>
        </>
    );
};

function Dashboard() {
    const { tokenDetails, totalBalance } = useAccountTokensContext();
    const { connector } = useAccount();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Wallet</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead>Chain</TableHead>
                    <TableHead>Balance</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="flex items-center gap-x-3 text-sm font-semibold text-primary">
                        <WalletIcon
                            src={connector?.icon}
                            alt={connector?.name}
                            size={16}
                        />
                        {connector?.name}
                    </TableCell>
                    <TableCell className="text-xs font-semibold">
                        <span className="bg-quaternary/15 inline-flex items-center justify-center rounded-lg px-2 py-1 text-primary">
                            20%
                        </span>
                    </TableCell>
                    <TableCell className="flex flex-wrap place-content-center gap-x-1">
                        <OptimismNetworkIcon />
                        <ArbitrumNetworkIcon />
                        <EthereumNetworkIcon />
                    </TableCell>
                    <TableCell>
                        <div className="grid place-items-start justify-center text-xs font-semibold text-primary">
                            ${addThousandSeparators(totalBalance)} USDC
                            <span className="text-xxs font-semibold text-secondary">
                                ${addThousandSeparators(totalBalance)}
                            </span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <WithdrawDialog>Withdraw</WithdrawDialog>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default Dashboard;
