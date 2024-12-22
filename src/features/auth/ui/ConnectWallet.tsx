'use client';

import { useRef } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { ConnectorButton } from './ConnectorButton';
import { useSignIn } from './useSignIn';

export const ConnectWallet = (props: ButtonProps) => {
    const { connectors, connectAsync, status, error } = useConnect();
    const account = useAccount();
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
            <Dialog ref={dialogRef}>
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
                                    disabled={status === 'pending'}
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
            </Dialog>
        </>
    );
};
