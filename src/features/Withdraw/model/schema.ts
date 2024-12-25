import { z } from 'zod';
import { Address } from '@/shared/lib/zod';

export const WithdrawData = z.object({
    address: Address,
    tokenAddr: Address,
    amount: z.string().refine((value) => Number(value) > 0),
});
export type WithdrawData = z.infer<typeof WithdrawData>;
