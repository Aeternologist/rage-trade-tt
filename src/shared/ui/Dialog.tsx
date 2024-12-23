import {
    forwardRef,
    useId,
    type MouseEventHandler,
    type ReactNode,
    type RefObject,
} from 'react';
import { cn } from '../lib/css';
import { CloseIcon } from './CloseIcon';
import { IconButton } from './IconButton';

const Dialog = forwardRef<
    HTMLDialogElement,
    { children: ReactNode; className?: string }
>(({ children, className }, ref) => {
    const dialogFormId = useId();
    const dialogElement = (ref as RefObject<HTMLDialogElement> | undefined)
        ?.current;

    const handleCloseModal: MouseEventHandler<HTMLDialogElement> = (e) => {
        dialogElement && e.target === dialogElement && dialogElement.close();
    };

    return (
        <dialog
            ref={ref}
            className={cn(
                'w-[336px] rounded border-0.5 border-gray-10 bg-gray-13/90 backdrop:bg-black/30 backdrop:backdrop-blur-[7.5px]',

                className,
            )}
            onClick={handleCloseModal}
        >
            <IconButton
                form={dialogFormId}
                variant="secondary"
                size="small"
                round
                className="float-end mr-3 mt-3 bg-transparent p-1 text-gray-3"
            >
                <CloseIcon />
            </IconButton>
            <form
                id={dialogFormId}
                className="place-items-start p-3"
                method="dialog"
            >
                {children}
            </form>
        </dialog>
    );
});

Dialog.displayName = 'Dialog';
export { Dialog };
