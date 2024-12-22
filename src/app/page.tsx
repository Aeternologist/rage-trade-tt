import { ConnectWallet } from '@/features/auth/ui/ConnectWallet';

function App() {
    return (
        <div className="m-auto grid w-[350px] gap-y-2 rounded border border-gray-10 p-4 text-center">
            <h2 className="font-semibold text-gray-1">Connect Your Wallet</h2>
            <p className="mb-2 whitespace-pre-line text-xs text-gray-4">
                {
                    'This page requires access to your wallet.\nPlease connect your wallet to continue'
                }
            </p>
            <ConnectWallet className="w-full" size="small">
                Connect Your Wallet
            </ConnectWallet>
        </div>
    );
}

export default App;
