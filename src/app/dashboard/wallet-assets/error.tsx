'use client';

import { DefaultError } from '@/shared/ui/DefaultError';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <DefaultError error={error} reset={reset} />;
}
