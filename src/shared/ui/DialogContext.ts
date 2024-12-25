import { createContext, useContext } from 'use-context-selector';
import { invariant } from '../lib/react';

type DialogContext = {
    openDialog: () => void;
    closeDialog: (returnValue?: string) => void;
    formId?: string;
};

const dialogContext = createContext<DialogContext | null>(null);

const useDialogContext = () => {
    const value = useContext(dialogContext);
    return (value ||
        invariant(
            value,
            'DialogContext not passed, please wrap your components with <DialogContextProvider />',
        )) as DialogContext;
};

const DialogContextProvider = dialogContext.Provider;

DialogContextProvider.displayName = 'DialogContextProvider';

export { DialogContextProvider, useDialogContext };
