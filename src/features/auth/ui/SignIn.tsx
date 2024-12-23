'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Button, type ButtonProps } from '@/shared/ui/Button';
import { ConnectWallet } from './ConnectWallet';
import { useSignIn } from './useSignIn';

export const SignIn = (props: ButtonProps) => {
    const { isConnected, chainId, address } = useAccount();
    const { status: authStatus } = useSession();
    const signIn = useSignIn();
    const router = useRouter();

    useEffect(() => {
        isConnected &&
            authStatus === 'authenticated' &&
            router.push('/dashboard');
    }, [isConnected, authStatus]);
    return !isConnected ? (
        <ConnectWallet {...props} />
    ) : authStatus === 'unauthenticated' ? (
        <Button {...props} onClick={() => signIn(chainId!, address!)}>
            Sign Message to Login
        </Button>
    ) : (
        <Link href="/dashboard">To app</Link>
    );
};
