import {useEffect} from 'react';

export const useDebouncedFunction = (handler: () => void, watchedValue: any[], delay: number) => {
    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            handler();
        }, delay);
        return () => {
            clearTimeout(timeoutHandler);
        };
    }, watchedValue);
}
