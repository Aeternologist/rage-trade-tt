import { z } from 'zod';
import type { AlchemyNetworkName } from '../constants/alchemy';
import { Address, AlchemyResponse, AlchemyResponseSuccess } from '../lib/zod';
import { PlatformName } from './getPlatformAssets';

export const TokenMetadata = AlchemyResponseSuccess(
    z.object({
        decimals: z.number().nullable(),
        logo: z.string().nullable(),
        name: z.string().nullable(),
        symbol: z.string().nullable(),
    }),
);
export type TokenMetadata = z.infer<typeof TokenMetadata>;

export const getTokenMetadata = ({
    network,
    tokenAddr,
}: {
    network: AlchemyNetworkName;
    tokenAddr: Address;
}) =>
    fetch(
        `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
        {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'alchemy_getTokenMetadata',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: [tokenAddr],
                id: 1,
            }),
            redirect: 'follow',
        },
    )
        .then((res) => res.json())
        .then((res) => TokenMetadata.parse(res).result);
