'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { Wallet } from 'solar-icon-set';
import { useAccount, useChains } from 'wagmi';
import { Profile } from '@/features/Profile';
import { SwitchNetwork } from '@/features/auth';
import { ConnectWallet } from '@/features/auth/ui/ConnectWallet';
import { SUPPORTED_CONTRACTS_INFO } from '@/shared/constants/supportedTokens';
import { useAccountTokensContext } from '../model/context';

export const AccountInfo = () => {
    const { chainId } = useAccount();
    const chains = useChains();
    const isWrongChain = chains.every(({ id }) => id !== chainId);
    const { totalBalance } = useAccountTokensContext();

    return isWrongChain ? (
        <SwitchNetwork> Switch network</SwitchNetwork>
    ) : (
        <Profile balance={`$${totalBalance}`.replace('.', ',')} compact>
            <ConnectWallet className='!text-xxs font-normal hover:bg-transparent text-brand-0 p-0 bg-transparent underline'>Switch</ConnectWallet>
        </Profile>
    );
};
