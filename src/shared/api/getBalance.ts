import { z } from 'zod';
import type { AlchemyNetworkName } from '../constants/alchemy';
import { Address, AlchemyResponseSuccess } from '../lib/zod';

export const AccountBalanceSchema = AlchemyResponseSuccess(z.string());
export type AccountBalanceSchema = z.infer<typeof AccountBalanceSchema>;

export const getAccountBalances = ({
    network,
    accountAddr,
}: {
    network: AlchemyNetworkName;
    accountAddr: Address;
}) =>
    fetch(
        `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
        {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'eth_getBalance',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                params: [accountAddr],
                id: 1,
            }),
        },
    )
        .then((res) => res.json())
        .then((res) => AccountBalanceSchema.parse(res));
