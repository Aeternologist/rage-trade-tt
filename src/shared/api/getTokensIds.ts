import { z } from 'zod';
import { Address } from '../lib/zod';
import { PlatformName } from './getPlatformAssets';


export const TokenId = z.string().brand('TokenId');
export type TokenId = z.infer<typeof TokenId>;

export const TokensSchema = z
    .object({
        id: TokenId,
        symbol: z.string(),
        name: z.string(),
        platforms: z.record(PlatformName, Address),
    })
    .array();
export type TokensSchema = z.infer<typeof TokensSchema>;

export const getTokenIds = () =>
    fetch(
        `https://api.coingecko.com/api/v3/coins/list?include_platform=true&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`,
        { method: 'GET', headers: { accept: 'application/json' } },
    )
        .then((res) => res.json())
        .then((res) => TokensSchema.parse(res));