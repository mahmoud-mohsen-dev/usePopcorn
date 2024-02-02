import { MySetStateType, WatchedListType, watchedListProps } from "../../Types";
import WatchedMovie from "../Small Components/WatchedMovie";
import RateSection from "./RateSection";

type AddedProps = {
    openRateSection: boolean;
    setWatchedMovies: MySetStateType<WatchedListType>;
};

type ListWatchedProps = AddedProps & watchedListProps;

function WatchedList({
    movies,
    openRateSection,
    currentClickedMovie,
    setOpenRateSection,
    setWatchedMovies,
    setCurrentClickedMovie,
}: ListWatchedProps) {
    // console.log(movies);

    const calcAverage = (lists: WatchedListType, name: string) => {
        const total = lists.reduce((acc, curr) => acc + curr[name], 0);
        return isNaN(total / movies.length) ? 0 : total / movies.length;
    };

    return openRateSection ? (
        <RateSection
            currentClickedMovie={currentClickedMovie}
            movies={movies}
            onSetWatched={setOpenRateSection}
            setWatchedMovies={setWatchedMovies}
        />
    ) : (
        <div>
            <div className="px-4 py-3 bg-gray-600 cursor-default">
                <h2 className=" uppercase mb-1 text-lg">Movies you watched</h2>
                <div className="flex justify-between flex-wrap">
                    <span>#️⃣ {movies.length} movies</span>
                    <span>
                        ⭐ {calcAverage(movies, "imdbRating").toFixed(2)}
                    </span>
                    <span>
                        🌟 {calcAverage(movies, "userRating").toFixed(2)}
                    </span>
                    <span>
                        ⏳ {calcAverage(movies, "runtime").toFixed(0)} min
                    </span>
                </div>
            </div>

            {movies.map((watchedMovie) => {
                return (
                    <WatchedMovie
                        key={watchedMovie.imdbID}
                        watchedMovie={watchedMovie}
                        setWatchedMovies={setWatchedMovies}
                        setOpenRateSection={setOpenRateSection}
                        setCurrentClickedMovie={setCurrentClickedMovie}
                    />
                );
            })}
        </div>
    );
}

export default WatchedList;
