import { MySetStateType, WatchedListType, WatchedType } from "../../Types";

function WatchedMovie({
    watchedMovie,
    setWatchedMovies,
    setOpenRateSection,
    setCurrentClickedMovie,
}: {
    watchedMovie: WatchedType;
    setWatchedMovies: MySetStateType<WatchedListType>;
    setOpenRateSection: MySetStateType<boolean>;
    setCurrentClickedMovie: MySetStateType<WatchedType>;
}) {
    // console.log(watchedMovie);
    const handleDelete = () => {
        setWatchedMovies((watchedMovies) => {
            return watchedMovies.filter(
                (movie) => movie.imdbID !== watchedMovie.imdbID
            );
        });
    };

    return (
        <div className="flex p-4 pl-6 items-center border-gray-800 border-b-[1px] hover:bg-gray-600 cursor-pointer duration-300">
            <span
                className=" w-full flex"
                onClick={() => {
                    setOpenRateSection(true);
                    setCurrentClickedMovie(watchedMovie);
                }}
            >
                <div className="w-10 mr-5">
                    <img
                        src={watchedMovie.Poster}
                        alt={watchedMovie.Title}
                        className="w-full"
                    />
                </div>
                <div className="mr-auto">
                    <h3 className=" text-lg">{watchedMovie.Title}</h3>
                    <div className=" space-x-4 mt-1">
                        <span>⭐ {watchedMovie.imdbRating}</span>
                        <span>🌟 {watchedMovie.userRating}</span>
                        <span>⏳ {watchedMovie.runtime} min</span>
                    </div>
                </div>
            </span>
            <div
                className=" bg-red-500 w-4 h-4 flex justify-center text-pink-950 rounded-full text-base font-bold leading-3"
                onClick={handleDelete}
            >
                x
            </div>
        </div>
    );
}

export default WatchedMovie;
