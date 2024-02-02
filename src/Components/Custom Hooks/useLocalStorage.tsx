import { WatchedListType } from "../../Types";
import { useState, useEffect } from "react";

type useLocalStorageReturn = [
    WatchedListType,
    React.Dispatch<React.SetStateAction<WatchedListType>>
];

export function useLocalStorage(
    init: [],
    localKeyName: string
): useLocalStorageReturn {
    const [value, setValue] = useState<WatchedListType>(() => {
        const getTheItem = localStorage.getItem(localKeyName);
        return getTheItem ? JSON.parse(getTheItem) : init;
    });
    useEffect(() => {
        localStorage.setItem(localKeyName, JSON.stringify(value));
    }, [init, localKeyName, value]);

    return [value, setValue];
}
