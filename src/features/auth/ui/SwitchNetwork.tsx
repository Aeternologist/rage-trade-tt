'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { NetworkButton } from '@/entities/NetworkButton';
import type { ButtonProps } from '@/shared/ui/Button';
import { Dialog, DialogCloseButton, DialogForm } from '@/shared/ui/Dialog';
import { useSignIn } from './useSignIn';

export const SwitchNetwork = (props: ButtonProps) => {
    const { chainId, address } = useAccount();
    const { chains, switchChainAsync, isPending } = useSwitchChain();
    const signIn = useSignIn();

    return (
        <Dialog disabled={isPending} {...props}>
            <DialogCloseButton />
            <DialogForm>
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
            </DialogForm>
        </Dialog>
    );
};
