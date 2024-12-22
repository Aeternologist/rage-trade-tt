'use client';

import { useRef } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { NetworkButton } from '@/entities/NetworkButton';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { Dialog } from '@/shared/ui/Dialog';
import { useSignIn } from './useSignIn';

export const SwitchNetwork = (props: ButtonProps) => {
    const { chainId, address } = useAccount();
    const { chains, switchChainAsync, status } = useSwitchChain();
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
                    Switch network
                </h2>
                <menu className="grid w-full gap-y-4">
                    {chains.map((chain) => (
                        <li className="contents" key={chain.id}>
                            <NetworkButton
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
