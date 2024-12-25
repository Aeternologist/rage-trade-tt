import { z } from 'zod';
import { Address } from '../lib/zod';

export const HyperliquidTokenDetails = z.object({
    name: z.string(),
    maxSupply: z.string(),
    totalSupply: z.string(),
    circulatingSupply: z.string(),
    szDecimals: z.number(),
    weiDecimals: z.number(),
    midPx: z.string(),
    markPx: z.string(),
    prevDayPx: z.string(),
    genesis: z
        .object({
            userBalances: z.tuple([z.string(), z.string()]).array(),
            existingTokenBalances: z.unknown(),
        })
        .nullable(),
    deployer: z.string().nullable(),
    deployGas: z.string().nullable(),
    deployTime: z.string().datetime({ offset: true, local: true }).nullable(),
    seededUsdc: z.string(),
    nonCirculatingUserBalances: z.unknown(),
    futureEmissions: z.string(),
});
export type HyperliquidTokenDetails = z.infer<typeof HyperliquidTokenDetails>;

export const getHyperliquidTokenDetails = (tokenId: Address) =>
    fetch(`https://api.hyperliquid.xyz/info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'tokenDetails',
            tokenId,
        }),
    })
        .then((res) => res.json())
        .then((res) => HyperliquidTokenDetails.parse(res));
