'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { ConnectWallet } from './ConnectWallet';
import { useSignIn } from './useSignIn';

export const SignIn = (props: ButtonProps) => {
    const account = useAccount();
    const { status: authStatus } = useSession();
    const signIn = useSignIn();

    return !account.isConnected ? (
        <ConnectWallet {...props} />
    ) : authStatus === 'unauthenticated' ? (
        <Button
            {...props}
            onClick={() => signIn(account.chainId!, account.address!)}
        >
            Sign Message to Login
        </Button>
    ) : (
        <Link href="/dashboard">To app</Link>
    );
};
