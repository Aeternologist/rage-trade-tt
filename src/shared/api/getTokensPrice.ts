import { z } from 'zod';
import { Address } from '../lib/zod';
import { TokenId } from './getTokensIds';

const TokenPriceByAddressSchema = z.record(
    Address,
    z.object({
        usd: z.number(),
    }),
);
export type TokenPriceByAddressSchema = z.infer<
    typeof TokenPriceByAddressSchema
>;

const TokenPriceByIdSchema = z.record(
    TokenId,
    z.object({
        usd: z.number(),
    }),
);
export type TokenPriceByIdSchema = z.infer<typeof TokenPriceByIdSchema>;

export const getTokenPriceByIds = (tokenIds: TokenId[] | TokenId) =>
    fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds}&vs_currencies=usd&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`,
        { method: 'GET', headers: { accept: 'application/json' } },
    )
        .then((res) => res.json())
        .then((res) => TokenPriceByIdSchema.parse(res));

export const getTokenPriceByAddresses = ({
    assetPlatformId,
    addresses,
}: {
    assetPlatformId: string;
    addresses: Address[] | Address;
}) =>
    fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/${assetPlatformId}?contract_addresses=${addresses}&vs_currencies=usd&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`,
        { method: 'GET', headers: { accept: 'application/json' } },
    )
        .then((res) => res.json())
        .then((res) => TokenPriceByAddressSchema.parse(res));
