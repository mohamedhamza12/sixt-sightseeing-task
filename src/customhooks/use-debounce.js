import { useMemo } from 'react';

export default function useDebounce(callback, delay) {
    const debounce = () => {
        let timeoutId = null;
        return function (value) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => callback(value), delay);
        }
    }

    return useMemo(debounce, []);
}