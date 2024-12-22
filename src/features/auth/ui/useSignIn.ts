import { getCsrfToken, signIn } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { useSignMessage } from 'wagmi';

export const useSignIn = () => {
    const { signMessageAsync } = useSignMessage();
    const handleSignIn = (chainId: number, address: `0x${string}`) => {
        getCsrfToken()
            .then(async (nonce) => {
                const message = new SiweMessage({
                    domain: window.location.host,
                    uri: window.location.origin,
                    version: '1',
                    address,
                    statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
                    nonce,
                    chainId: chainId,
                });

                const signedMessage = await signMessageAsync({
                    message: message.prepareMessage(),
                });

                const response = await signIn('web3', {
                    message: JSON.stringify(message),
                    signedMessage,
                    redirect: true,
                    callbackUrl: '/dashboard',
                });
                if (response?.error) {
                    throw response.error;
                }
            })
            .catch((e) => console.log('Error Occured', e));
    };
    return handleSignIn;
};
