import { z } from 'zod';

export const PlatformName = z.string().brand('PlatformName');
export type PlatformName = z.infer<typeof PlatformName>;

const PlatformAssetsSchema = z
    .object({
        id: z.string(),
        chain_identifier: z.number().nullable(),
        name: PlatformName,
        shortname: z.string().optional(),
        native_coin_id: z.string().optional(),
    })
    .array();
export type PlatformAssetsSchema = z.infer<typeof PlatformAssetsSchema>;

export const getPlatformAssets = () =>
    fetch(
        `https://api.coingecko.com/api/v3/asset_platforms?include_platform=true&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`,
        { method: 'GET', headers: { accept: 'application/json' } },
    )
        .then((res) => res.json())
        .then((res) => PlatformAssetsSchema.parse(res));
