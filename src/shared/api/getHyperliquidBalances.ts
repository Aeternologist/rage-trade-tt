import { z } from 'zod';
import { Address } from '../lib/zod';

const HyperliquidBalances = z.object({
    balances: z
        .object({
            coin: z.string(),
            token: z.number(),
            hold: z.string(),
            total: z.string(),
            entryNtl: z.string(),
        })
        .array(),
});
export type HyperliquidBalances = z.infer<typeof HyperliquidBalances>;

export const getHyperliquidBalances = (user: Address) =>
    fetch(`https://api.hyperliquid.xyz/info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'spotClearinghouseState',
            user,
        }),
    })
        .then((res) => res.json())
        .then((res) => HyperliquidBalances.parse(res));
