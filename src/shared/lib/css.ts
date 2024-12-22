import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) =>
    inputs.filter(Boolean).length > 1
        ? twMerge(clsx(inputs))
        : typeof inputs[0] !== 'string'
          ? clsx(inputs[0])
          : inputs[0];
