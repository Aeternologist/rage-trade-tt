'use client';

import { useAccount, useConnect } from 'wagmi';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { Dialog, DialogCloseButton, DialogForm } from '@/shared/ui/Dialog';
import { ConnectorButton } from './ConnectorButton';
import { useSignIn } from './useSignIn';

export const ConnectWallet = ({ children, ...props }: ButtonProps) => {
    const { connectors, connectAsync, isPending, error } = useConnect();
    const account = useAccount();
    const signIn = useSignIn();

    return (
        <Dialog buttonText={children} {...props} disabled={isPending}>
            <DialogCloseButton />
            <DialogForm>
                <h2 className="mb-4 font-semibold text-primary">
                    Connect Your Wallet
                </h2>
                <menu className="grid w-full gap-y-4">
                    {connectors
                        .toSorted((a, b) => a.name.localeCompare(b.name))
                        .map((connector) => (
                            <li className="contents" key={connector.uid}>
                                <ConnectorButton
                                    connector={connector}
                                    connected={
                                        connector.uid === account.connector?.uid
                                    }
                                    disabled={isPending}
                                    onClick={() =>
                                        connectAsync({ connector }).then(
                                            ({ chainId, accounts }) =>
                                                signIn(chainId, accounts[0]),
                                        )
                                    }
                                />
                            </li>
                        ))}
                </menu>
            </DialogForm>
        </Dialog>
    );
};
