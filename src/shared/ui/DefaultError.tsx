import { useEffect } from 'react';
import { Button } from './Button';

export const DefaultError = ({
    error,
    reset,
}: {
    error: unknown;
    reset: () => void;
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <div className="grid place-items-center gap-y-4 rounded border border-gray-13">
            <h2>Something went wrong!</h2>
            <strong>Error: {JSON.stringify(error)}</strong>
            <Button variant="secondary" size="large" onClick={() => reset()}>
                Try again
            </Button>
        </div>
    );
};
