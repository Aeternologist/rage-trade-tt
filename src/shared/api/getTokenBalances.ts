import { z } from 'zod';
import type { AlchemyNetworkName } from '../constants/alchemy';
import { Address, AlchemyResponseSuccess } from '../lib/zod';

export const TokenBalanceSchema = AlchemyResponseSuccess(
    z.object({
        address: Address,
        tokenBalances: z
            .object({
                contractAddress: Address,
                tokenBalance: z.string(),
            })
            .array(),
        pageKey: z.string().optional(),
    }),
);
export type TokenBalanceSchema = z.infer<typeof TokenBalanceSchema>;

export const getTokenBalances = ({
    network,
    accountAddr,
    tokenAddr,
}: {
    network: AlchemyNetworkName;
    accountAddr: Address;
    tokenAddr?: Address[];
}) =>
    fetch(
        `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
        {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'alchemy_getTokenBalances',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: tokenAddr ? [accountAddr, tokenAddr] : [accountAddr],
                id: 42,
            }),
            redirect: 'follow',
        },
    )
        .then((res) => res.json())
        .then((res) => TokenBalanceSchema.parse(res));
