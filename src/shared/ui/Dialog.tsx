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
    { children: ReactNode; dialogClassName?: string; className?: string }
>(({ children, dialogClassName, className }, ref) => {
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
                'open:scale-y-1 rounded border-0.5 border-gray-10 bg-gray-13/90 backdrop:bg-black/30 backdrop:backdrop-blur-[7.5px] backdrop:transition-[opacity,overlay,display,background-color] backdrop:transition-discrete open:opacity-100 starting:scale-y-0 starting:open:opacity-0',

                dialogClassName,
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
                className={cn('w-[336px] place-items-start p-3', className)}
                method="dialog"
            >
                {children}
            </form>
        </dialog>
    );
});

Dialog.displayName = 'Dialog';
export { Dialog };
