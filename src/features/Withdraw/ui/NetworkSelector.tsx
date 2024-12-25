import { useSwitchChain } from 'wagmi';
import { NetworkButton } from '@/entities/NetworkButton';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';

export const NetworkSelector = ({
    chainId,
    onSwitch,
}: {
    chainId?: SupportedChainsId;
    onSwitch: () => void;
}) => {
    const { chains, switchChainAsync, isPending } = useSwitchChain();
    return (
        <>
            <span className="flex w-full items-center text-center text-xs text-secondary before:mr-4 before:flex-1 before:border-t before:border-gray-10 after:ml-4 after:flex-1 after:border-t after:border-gray-10">
                Network
            </span>
            <menu className="flex w-full justify-center gap-x-1 border-b border-dashed border-gray-10 py-4">
                {chains.map((chain) => (
                    <li className="contents" key={chain.id}>
                        <NetworkButton
                            type="button"
                            network={chain.name}
                            checked={chain.id === chainId}
                            disabled={isPending}
                            onClick={() =>
                                switchChainAsync({
                                    chainId: chain.id,
                                }).then(onSwitch)
                            }
                        />
                    </li>
                ))}
            </menu>
        </>
    );
};
