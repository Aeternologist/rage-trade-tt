import { Profile } from '@/features/Profile';
import { Button } from '@/shared/ui/Button';
import { HyperliquidIcon } from '@/shared/ui/TokenIcons';

export const WalletsPanel = ({ balance }: { balance: string }) => {
    return (
        <div className="flex gap-x-3">
            <div className="flex items-center gap-x-2 border border-gray-9 p-2">
                <span className="text-xs font-semibold text-secondary">
                    Balance
                </span>
                <span className="text-sm font-semibold text-primary">
                    ${balance}
                </span>
            </div>
            <div className="flex items-center gap-x-2 border border-gray-9">
                <Profile
                    aria-checked
                    variant="secondary"
                    className="h-full bg-transparent p-0 px-2 aria-checked:bg-gray-9"
                >
                    <span className="text-sm font-semibold text-primary">
                        ${balance}
                    </span>
                </Profile>
            </div>
            <div className="flex items-center gap-x-2 border border-gray-9">
                <Button
                    variant="secondary"
                    className="h-full bg-transparent p-0 px-2 aria-checked:bg-gray-9"
                    leftIcon={<HyperliquidIcon />}
                >
                    <span className="text-xs font-semibold text-secondary">
                        Hyperliquid
                    </span>
                    <span className="text-sm font-semibold text-primary">
                        ${0}
                    </span>
                </Button>
            </div>
        </div>
    );
};
