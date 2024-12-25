import { z } from 'zod';
import { Address } from '../lib/zod';

export const HyperliquidTokensMetadata = z.object({
    name: z.string(),
    szDecimals: z.number(),
    weiDecimals: z.number(),
    index: z.number(),
    tokenId: Address,
    isCanonical: z.boolean(),
    evmContract: z.unknown(),
    fullName: z.unknown(),
});
export type HyperliquidTokensMetadata = z.infer<
    typeof HyperliquidTokensMetadata
>;

const HyperliquidPairMetadata = z.object({
    name: z.string(),
    tokens: z.tuple([z.number(), z.number()]),
    index: z.number(),
    isCanonical: z.boolean(),
});

export const HyperliquidMetadata = z.object({
    tokens: HyperliquidTokensMetadata.array(),
    universe: HyperliquidPairMetadata.array(),
});
export type HyperliquidMetadata = z.infer<typeof HyperliquidMetadata>;

export const getHyperliquidMetadata = () =>
    fetch(`https://api.hyperliquid.xyz/info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'spotMeta',
        }),
    })
        .then((res) => res.json())
        .then((res) => HyperliquidMetadata.parse(res));
