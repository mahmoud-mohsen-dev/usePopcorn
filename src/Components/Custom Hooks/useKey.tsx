import { useEffect, useRef } from "react";

export function useKey(
    key: string,
    actionKeyDown: () => void,
    onMount?: () => void
) {
    const countRef = useRef(0);

    useEffect(() => {
        if (countRef.current === 0 && onMount) {
            onMount();
            countRef.current++;
        }
        const callBack = (e: KeyboardEvent) => {
            if (e.key === key) actionKeyDown();
        };
        document.addEventListener("keydown", callBack);

        return () => document.removeEventListener("keydown", callBack);
    }, [key, actionKeyDown, onMount]);
}
