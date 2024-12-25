import {
    forwardRef,
    useId,
    useRef,
    type ChangeEventHandler,
    type FormHTMLAttributes,
    type MouseEventHandler,
    type ReactNode,
    type RefObject,
} from 'react';
import { cn } from '../lib/css';
import { Button, type ButtonProps } from './Button';
import { CloseIcon } from './CloseIcon';
import { DialogContextProvider, useDialogContext } from './DialogContext';
import { IconButton } from './IconButton';

const DialogContainer = forwardRef<
    HTMLDialogElement,
    {
        children: ReactNode;
        className?: string;
    }
>(({ children, className }, ref) => {
    const { closeDialog } = useDialogContext();
    return (
        <dialog
            ref={ref}
            className={cn(
                'overflow-visible rounded border-0.5 border-gray-10 bg-gray-13/90',
                'opacity-0 transition-[opacity,overlay,display,transform] duration-500 transition-discrete open:opacity-100 starting:opacity-0 starting:open:opacity-0',
                '-translate-y-14 open:translate-y-0 starting:translate-y-14 starting:open:translate-y-14',
                'backdrop:bg-black/30 backdrop:opacity-0 backdrop:backdrop-blur-[7.5px] backdrop:duration-500 open:backdrop:opacity-100 starting:backdrop:opacity-0 starting:open:backdrop:opacity-0',
                className,
            )}
            onClick={(e) =>
                ref &&
                'current' in ref &&
                ref.current === e.target &&
                closeDialog()
            }
        >
            {children}
        </dialog>
    );
});

DialogContainer.displayName = 'DialogContainer';

const DialogTrigger = ({
    openDialog,
    onBeforeOpenDialog,
    ...props
}: {
    openDialog: () => void;
    onBeforeOpenDialog?: () => void;
} & ButtonProps) => {
    return (
        <Button
            {...props}
            onClick={() => {
                onBeforeOpenDialog?.();
                openDialog();
            }}
        />
    );
};

const DialogForm = ({
    className,
    children,
    ...props
}: {
    className?: string;
    children: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>) => {
    const { formId } = useDialogContext();
    return (
        <form
            id={formId}
            className={cn('w-[336px] place-items-center p-3', className)}
            method="dialog"
            {...props}
        >
            {children}
        </form>
    );
};

DialogForm.displayName = 'DialogForm';

const DialogCloseButton = () => {
    const { closeDialog, formId } = useDialogContext();
    return (
        <IconButton
            form={formId}
            type="reset"
            variant="secondary"
            size="small"
            round
            className="float-end mr-3 mt-3 bg-transparent p-1 text-gray-3"
            onClick={() => closeDialog()}
        >
            <CloseIcon />
        </IconButton>
    );
};

DialogCloseButton.displayName = 'DialogCloseButton';

const Dialog = ({
    children,
    dialogClassName,
    buttonText,
    ...props
}: {
    children: ReactNode;
    dialogClassName?: string;
    buttonText?: ReactNode;
} & ButtonProps & { onBeforeOpenDialog?: () => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openDialog = () => {
        dialogRef.current?.showModal();
    };
    const formId = useId();

    return (
        <DialogContextProvider
            value={{
                openDialog,
                closeDialog: (returnValue?: string) =>
                    dialogRef.current?.close(returnValue),
                formId,
            }}
        >
            <DialogTrigger openDialog={openDialog} {...props}>
                {buttonText}
            </DialogTrigger>
            <DialogContainer ref={dialogRef} className={dialogClassName}>
                {children}
            </DialogContainer>{' '}
        </DialogContextProvider>
    );
};

Dialog.displayName = 'Dialog';
export { Dialog, DialogCloseButton, DialogForm };
