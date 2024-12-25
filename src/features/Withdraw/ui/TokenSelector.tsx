import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { Address } from '@/shared/lib/zod';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/shadcn/select';

export const TokenSelector = ({
    tokenAddr,
    setTokenAddr,
    children,
}: {
    tokenAddr: Address | undefined;
    setTokenAddr: Dispatch<SetStateAction<Address | undefined>>;
    children?: ReactNode;
}) => {
    return (
        <Select
            name="tokenAddr"
            value={tokenAddr}
            onValueChange={(value) => setTokenAddr(value as Address)}
        >
            <SelectTrigger className="bg-gray-11">
                <SelectValue
                    className="flex text-base text-primary"
                    placeholder="Select a token"
                />
            </SelectTrigger>
            <SelectContent>{children}</SelectContent>
        </Select>
    );
};
