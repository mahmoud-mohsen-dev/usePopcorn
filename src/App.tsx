import { useState } from "react";
import MoviesList from "./Components/Main Sections/MoviesList";
import NavBar from "./Components/Main Sections/NavBar";
import WatchedList from "./Components/Main Sections/WatchedList";
import ListBox from "./Components/Main Sections/ListBox";
import ErrorMessage from "./Components/Small Components/ErrorMessage";
import Loader from "./Components/Small Components/Loader";
import {
    Logo,
    SearchInput,
    ResultHeading,
} from "./Components/Main Sections/NavBar";
import Main from "./Components/Main Sections/Main";
import { useMovies } from "./Components/Custom Hooks/useMovies";
import { useLocalStorage } from "./Components/Custom Hooks/useLocalStorage";

function App() {
    const [currentClickedMovie, setCurrentClickedMovie] = useState(null);
    const [openRateSection, setOpenRateSection] = useState(false);
    const [searchInput, setSearchInput] = useState("the lord of rings");
    const [movies, showLoader, error] = useMovies(
        searchInput,
        setOpenRateSection
    );
    const [watchedMovies, setWatchedMovies] = useLocalStorage([], "watched");

    return (
        <div className=" text-stone-50  font-medium  bg-color-background-900 min-h-screen md:gap-5 pb-4">
            <NavBar>
                <Logo />
                <SearchInput
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                />
                <ResultHeading movies={movies} />
            </NavBar>

            <Main>
                <ListBox>
                    {error && <ErrorMessage message={error} />}

                    {showLoader && !error && <Loader />}

                    {!error && !showLoader && (
                        <MoviesList
                            movies={movies}
                            currentClickedMovie={currentClickedMovie}
                            setCurrentClickedMovie={setCurrentClickedMovie}
                            setOpenRateSection={setOpenRateSection}
                        />
                    )}
                </ListBox>

                <ListBox>
                    <WatchedList
                        movies={watchedMovies}
                        openRateSection={openRateSection}
                        currentClickedMovie={currentClickedMovie}
                        setOpenRateSection={setOpenRateSection}
                        setWatchedMovies={setWatchedMovies}
                        setCurrentClickedMovie={setCurrentClickedMovie}
                    />
                </ListBox>
            </Main>
        </div>
    );
}

export default App;
