'use client';

import dynamic from 'next/dynamic';
import { z } from 'zod';
import type { SupportedChainsId } from '@/shared/constants/supportedTokens';
import { LocalForageStore } from '@/shared/lib/localforage';
import type { Address } from '@/shared/lib/zod';

const TokenMetadata = z.object({
    decimals: z.number().nullable(),
    logo: z.string().nullable(),
    name: z.string().nullable(),
    symbol: z.string().nullable(),
});

const TokenMetadataKey = z
    .string()
    .refine((str): str is `${SupportedChainsId}-${Address}` =>
        /\d+-0x\w+/.test(str),
    );
export type TokenMetadataKey = z.infer<typeof TokenMetadataKey>;

const TokensMetadataLocalStore = z.object({
    tokenMetadata: z.record(TokenMetadataKey, TokenMetadata),
    expires: z.number(),
});
export type TokensMetadataLocalStore = z.infer<typeof TokensMetadataLocalStore>;

export const tokensMetadataLocalStore =
    typeof window !== 'undefined' ?
    new LocalForageStore({
        name: 'Tokens Metadata',
        description: 'Store metadata for Tokens',
        schema: TokensMetadataLocalStore,
    }) : undefined;
