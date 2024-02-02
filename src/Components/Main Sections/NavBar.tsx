import { useRef } from "react";
import { MySetStateType } from "../../Types";
import { useKey } from "../Custom Hooks/useKey";

type SearchInputProps = {
    searchInput: string;
    setSearchInput: MySetStateType<string>;
};

function NavBar({ children }) {
    return (
        <div className=" bg-color-primary py-3 px-5 flex justify-between items-center flex-wrap mb-4">
            {children}
        </div>
    );
}

export function Logo() {
    return <h2 className="">🍿 usePopcorn</h2>;
}

export function SearchInput({ searchInput, setSearchInput }: SearchInputProps) {
    const myRef = useRef(null);

    const onMount = () => {
        myRef.current.focus();
    };

    const onKeyDown = () => {
        if (myRef.current === document.activeElement) {
            myRef.current.blur();
            return;
        }
        myRef.current.focus();
        setSearchInput("");
    };

    useKey("Enter", onKeyDown, onMount);

    return (
        <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search movies..."
            ref={myRef}
            className=" shadow-md py-2 px-3 rounded-md bg-color-primary-light placeholder:text-gray-300 w-3/5 sm:w-2/4 md:w-2/6 focus:outline-none focus:border-gray-100 border-transparent border duration-300 "
        />
    );
}

export function ResultHeading({ movies }) {
    return <h3>Found {movies?.length} top results</h3>;
}

export default NavBar;
