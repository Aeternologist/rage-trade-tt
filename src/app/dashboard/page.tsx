'use client';

import { useAccount } from 'wagmi';
import { useAccountTokensContext } from '@/widgets/AccountInfo';
import { WithdrawDialog } from '@/features/Withdraw';
import { addThousandSeparators } from '@/shared/lib/react';
import {
    ArbitrumNetworkIcon,
    EthereumNetworkIcon,
    OptimismNetworkIcon,
} from '@/shared/ui/NetworkIcons';
import { HyperliquidIcon } from '@/shared/ui/TokenIcons';
import { WalletIcon } from '@/shared/ui/WalletIcon';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/shadcn/table';

function Dashboard() {
    const { walletBalance, hyperliquidBalance, totalBalance } =
        useAccountTokensContext();
    const { connector } = useAccount();
    const walletAllocation = Math.round((walletBalance * 100) / totalBalance);
    const hyperliquidAllocation = 100 - walletAllocation;

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
                            {walletAllocation}%
                        </span>
                    </TableCell>
                    <TableCell className="flex flex-wrap justify-start gap-x-1">
                        <OptimismNetworkIcon />
                        <ArbitrumNetworkIcon />
                        <EthereumNetworkIcon />
                    </TableCell>
                    <TableCell>
                        <div className="grid place-items-start justify-start text-xs font-semibold text-primary">
                            ${addThousandSeparators(walletBalance)} USDC
                            <span className="text-xxs font-semibold text-secondary">
                                ${addThousandSeparators(walletBalance)}
                            </span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <WithdrawDialog
                            className="w-full"
                            variant="secondary"
                            size="small"
                        >
                            Withdraw
                        </WithdrawDialog>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="flex items-center gap-x-3 text-sm font-semibold text-primary">
                        <HyperliquidIcon />
                        Hyperliquid
                    </TableCell>
                    <TableCell className="text-xs font-semibold">
                        <span className="bg-quaternary/15 inline-flex items-center justify-start rounded-lg px-2 py-1 text-primary">
                            {hyperliquidAllocation}%
                        </span>
                    </TableCell>
                    <TableCell className="flex flex-wrap place-content-start gap-x-1">
                        <ArbitrumNetworkIcon />
                    </TableCell>
                    <TableCell>
                        <div className="grid place-items-start justify-start text-xs font-semibold text-primary">
                            ${addThousandSeparators(hyperliquidBalance)} USDC
                            <span className="text-xxs font-semibold text-secondary">
                                ${addThousandSeparators(hyperliquidBalance)}
                            </span>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default Dashboard;
