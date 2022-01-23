export const handleOpenHelper = (
    setModel: (model: any) => void,
    setOpen: (choice: boolean) => void,
    modelSelected?: any
): void => {
    if (modelSelected) setModel(modelSelected);
    setOpen(true);
}

export const handleCloseHelper = (
    setDate: (newDate: Date) => void,
    setModel: (model: any) => void,
    setOpen: (choice: boolean) => void,
    updated?: boolean
): void => {
    if (updated) setDate(new Date());
    setModel(null);
    setOpen(false);
}
