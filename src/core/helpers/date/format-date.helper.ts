export const getDayMonthAndHour = (dateToFormat: Date): string => {
    const date = new Date(dateToFormat);

    return (date.toLocaleDateString("fr-FR", {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'}));
}
