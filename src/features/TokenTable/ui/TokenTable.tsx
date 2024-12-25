import type { TokenDetails } from '@/widgets/AccountInfo/model/context';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import { addThousandSeparators, formatBalance } from '@/shared/lib/react';
import type { Address } from '@/shared/lib/zod';
import { AssetIcon } from '@/shared/ui/AssetIcon';
import { NetworkIcon } from '@/shared/ui/NetworkIcon';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/shadcn/table';

export const TokenTable = ({
    tokenDetails,
    children,
}: {
    tokenDetails: TokenDetails[];
    children: (tokenAddr: Address, chainId: SupportedChainsId) => JSX.Element;
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Assets</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tokenDetails.map((token) => (
                    <TableRow key={`${token.chainId}-${token.symbol}`}>
                        <TableCell className="grid grid-cols-[min-content_1fr] grid-rows-2 items-center gap-x-3 font-semibold">
                            <div className="relative row-span-full w-7">
                                <AssetIcon
                                    symbol={token.symbol}
                                    logo={token.logo}
                                />
                                <NetworkIcon
                                    chainId={token.chainId}
                                    className="absolute bottom-0 right-0 rounded-full"
                                    size={12}
                                />
                            </div>
                            {token.symbol}
                            <span className="text-xxs font-normal text-secondary">
                                {token.name}
                            </span>
                        </TableCell>
                        <TableCell className="text-xs font-semibold">
                            <div className="grid">
                                <span className="text-xxs font-normal text-secondary">
                                    ${addThousandSeparators(token.usdBalance)}
                                </span>
                                {`${formatBalance(Number(token.tokenBalance), 3) || '<0.001'} ${token.symbol}`}
                            </div>
                        </TableCell>
                        <TableCell className="text-xs font-semibold">
                            ${addThousandSeparators(token.price)}
                        </TableCell>
                        <TableCell className="text-right">
                            {children(token.address, token.chainId)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
