export function invariant(
    condition: unknown,
    message?: string,
): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

export const formatBalance = (val: number, decimal: number) =>
    Math.round(val * 10 ** decimal) / 10 ** decimal;

export const addThousandSeparators = (val: number | string) =>
    `${val}`.replace(/(?<!\.\d+)\B(?=(\d{3})+(?!\d))/g, ',');
