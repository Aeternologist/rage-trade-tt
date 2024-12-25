'use client';

import { useState, type ReactNode } from 'react';
import { erc20Abi, parseEther, parseUnits } from 'viem';
import {
    useAccount,
    useSendTransaction,
    useSwitchChain,
    useWriteContract,
} from 'wagmi';
import { useAccountTokensContext } from '@/widgets/AccountInfo';
import type { TokenDetails } from '@/widgets/AccountInfo/model/context';
import {
    NATIVE_ASSET_ADDRESS,
    type SupportedChainsId,
} from '@/shared/constants/supportedTokens';
import { addThousandSeparators, formatBalance } from '@/shared/lib/react';
import { Address } from '@/shared/lib/zod';
import { AssetIcon } from '@/shared/ui/AssetIcon';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { Dialog, DialogCloseButton, DialogForm } from '@/shared/ui/Dialog';
import { Input } from '@/shared/ui/shadcn/input';
import { SelectItem } from '@/shared/ui/shadcn/select';
import { WithdrawData } from '../model/schema';
import { NetworkSelector } from './NetworkSelector';
import { TokenBalanceInfo } from './TokenBalanceInfo';
import { TokenSelector } from './TokenSelector';

const formatTokenBalance = (tokenBalance: string) => {
    const formattedTokenBalance = Number(tokenBalance)
        ? formatBalance(Number(tokenBalance), 3) || '<0.001'
        : 0;
    return formattedTokenBalance
        ? addThousandSeparators(formattedTokenBalance)
        : 0;
};

const renderTokenItems = (
    tokenDetails: TokenDetails[],
    currentChainId: SupportedChainsId | undefined,
    render: ({
        address,
        symbol,
        name,
        logo,
    }: {
        address: Address;
        symbol: string;
        name: string;
        logo?: string;
    }) => JSX.Element,
) =>
    tokenDetails.reduce((acc, { chainId, address, symbol, name, logo }) => {
        chainId === currentChainId &&
            acc.push(render({ address, symbol, name, logo }));
        return acc;
    }, new Array<JSX.Element>());

export const WithdrawDialog = ({
    defaultTokenAddr,
    defaultChainId,
    children,
    onClick,
    ...props
}: {
    defaultTokenAddr?: Address;
    defaultChainId?: SupportedChainsId;
    children?: ReactNode;
} & ButtonProps) => {
    const { tokenDetails, tokenDetailByAddress } = useAccountTokensContext();
    const { chainId, address, isConnecting } = useAccount();
    const [amount, setAmount] = useState<string>('0');
    const [tokenAddr, setTokenAddr] = useState(defaultTokenAddr);
    const { writeContract } = useWriteContract();
    const { sendTransaction } = useSendTransaction();
    const { switchChain } = useSwitchChain();

    const currentToken =
        chainId && tokenAddr
            ? tokenDetailByAddress[chainId as SupportedChainsId][tokenAddr]
            : undefined;

    return (
        <Dialog
            disabled={isConnecting}
            buttonText={children}
            onClick={() => {
                if (defaultChainId && chainId && defaultChainId !== chainId)
                    switchChain({ chainId: defaultChainId });
            }}
            {...props}
        >
            <DialogCloseButton />
            <DialogForm
                className="w-[437px] gap-y-4"
                onSubmit={(e) => {
                    const formData = new FormData(e.currentTarget);
                    const formDataObj = Object.fromEntries(formData);
                    const parsedFormData = WithdrawData.safeParse(formDataObj);
                    if (!parsedFormData.success || !currentToken) {
                        e.preventDefault();
                        return;
                    }
                    const isNativeCurrency =
                        parsedFormData.data.tokenAddr === NATIVE_ASSET_ADDRESS;
                    const parsedAmount = parseUnits(
                        parsedFormData.data.amount,
                        currentToken.decimals,
                    );
                    isNativeCurrency
                        ? sendTransaction({
                              to: parsedFormData.data.address,
                              value: parseEther(parsedFormData.data.amount),
                          })
                        : writeContract({
                              abi: erc20Abi,
                              address: parsedFormData.data.tokenAddr,
                              functionName: 'transferFrom',
                              args: [
                                  address!,
                                  parsedFormData.data.address,
                                  parsedAmount,
                              ],
                          });
                }}
            >
                <h2 className="justify-self-start font-semibold text-primary">
                    Withdraw
                </h2>
                <NetworkSelector
                    chainId={chainId as SupportedChainsId | undefined}
                    onSwitch={() => setTokenAddr(undefined)}
                />
                <Input
                    name="address"
                    type="text"
                    className="my-4 w-full"
                    placeholder="Address"
                />
                <fieldset className="my-4 flex gap-x-2">
                    <TokenSelector
                        tokenAddr={tokenAddr}
                        setTokenAddr={setTokenAddr}
                    >
                        {renderTokenItems(
                            tokenDetails,
                            chainId as SupportedChainsId | undefined,
                            (token) => (
                                <SelectItem
                                    key={token.symbol}
                                    value={token.address}
                                >
                                    <span className="inline-flex items-center gap-x-2 align-middle">
                                        <AssetIcon
                                            symbol={token.symbol}
                                            logo={token.logo}
                                            size={20}
                                        />
                                        {token.symbol}
                                    </span>
                                </SelectItem>
                            ),
                        )}
                    </TokenSelector>
                    <Input
                        className="box-content h-11 flex-1"
                        inputClassName="rounded-r-none"
                        name="amount"
                        autoComplete="off"
                        type="number"
                        inputMode="numeric"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.currentTarget.value)}
                        button={
                            <Button
                                type="button"
                                className="rounded-l-none rounded-r-md"
                                variant="tertiary"
                                onClick={() =>
                                    currentToken &&
                                    setAmount(currentToken.tokenBalance)
                                }
                            >
                                Max
                            </Button>
                        }
                    />
                </fieldset>
                {currentToken && (
                    <TokenBalanceInfo
                        tokenBalance={formatTokenBalance(
                            currentToken.tokenBalance,
                        )}
                        symbol={currentToken.symbol}
                    />
                )}
                <Button className="flex w-full">
                    Withdraw{' '}
                    {Number(amount)
                        ? `${formatTokenBalance(amount)} ${currentToken?.symbol || ''}`
                        : undefined}
                </Button>
            </DialogForm>
        </Dialog>
    );
};
