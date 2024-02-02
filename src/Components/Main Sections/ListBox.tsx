import ToggleBtn from "../Small Components/ToggleBtn";
import { useState } from "react";

function ListBox({ children }) {
    const [showMovies, setMovies] = useState(true);

    return (
        <div className=" bg-gray-700 relative overflow-hidden w-full lg:w-4/12 lg:min-h-view-70 rounded-lg">
            <ToggleBtn
                onClick={() => setMovies((prev) => !prev)}
                onShow={showMovies}
            />
            {showMovies && children}
        </div>
    );
}

export default ListBox;
