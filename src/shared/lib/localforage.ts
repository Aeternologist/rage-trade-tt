'use client;';

import localforage from 'localforage';
import { z } from 'zod';

interface StoreOptions<T extends ReturnType<typeof z.object>> {
    name: string;
    description?: string;
    schema: T;
}

export class LocalForageStore<T extends ReturnType<typeof z.object>> {
    private readonly instance: LocalForage;
    private readonly schema: T;

    constructor(options: StoreOptions<T>) {
        this.instance = localforage.createInstance({
            name: process.env.NEXT_PUBLIC_APP_NAME,
            storeName: options.name,
            description: options.description,
        });
        this.schema = options.schema;
    }

    setItem<K extends keyof z.infer<T>>(
        key: K extends string ? K : never,
        value: z.infer<T>[K],
    ): Promise<void> {
        return this.instance.setItem(key, value).catch(this.clear);
    }

    getItem<K extends keyof z.infer<T>>(
        key: K extends string ? K : never,
    ): Promise<z.infer<T>[K] | undefined> {
        return this.instance
            .getItem(key)
            .then((value) => {
                if (value === null) return undefined;

                return this.schema.shape[key].parse(value) as z.infer<T>[K];
            })
            .catch((e) => {
                console.log(e);
                this.clear();
                return undefined;
            });
    }

    removeItem<K extends keyof z.infer<T>>(
        key: K extends string ? K : never,
    ): Promise<void> {
        return this.instance.removeItem(key).catch(this.clear);
    }

    clear(): Promise<void> {
        return this.instance.clear().catch(this.instance.dropInstance);
    }

    getAllItems(): Promise<z.infer<T> | undefined> {
        const items: Record<string, unknown> = {};
        return this.instance
            .iterate((value, key) => (items[key] = value))
            .then(() => this.schema.parse(items))
            .catch(() => {
                this.clear();
                return undefined;
            });
    }
}
