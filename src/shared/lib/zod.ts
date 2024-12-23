import { error } from 'console';
import { z, type ZodTypeAny } from 'zod';

export const Address = z
    .string()
    .refine((val): val is `0x${string}` => val.startsWith('0x'));
export type Address = z.infer<typeof Address>;

export const ContractReadResponseSuccess = z.object({
    result: z.unknown(),
    status: z.literal('success'),
    error: z.undefined(),
});

export const ContractReadResponseError = z.object({
    result: z.undefined(),
    status: z.literal('failure'),
    error: z.unknown(),
});

export const ContractReadResponse = z.discriminatedUnion('status', [
    ContractReadResponseSuccess,
    ContractReadResponseError,
]);
export type ContractReadResponse = z.infer<typeof ContractReadResponse>;

export const AlchemyResponseSuccess = <S extends ZodTypeAny>(schema: S) =>
    z.object({
        jsonrpc: z.string(),
        id: z.number(),
        result: schema,
        error: z.undefined(),
    });

export const AlchemyResponseError = z.object({
    jsonrpc: z.string(),
    id: z.number(),
    result: z.undefined(),
    error: z.object({
        code: z.number(),
        message: z.string(),
    }),
});

export const AlchemyResponse = <S extends ZodTypeAny>(schema: S) =>
    z.union([AlchemyResponseSuccess(schema), AlchemyResponseError]);
