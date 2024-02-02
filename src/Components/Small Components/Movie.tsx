import { MovieTypeProps } from "../../Types";

function Movie({
    movie,
    currentClickedMovie,
    setCurrentClickedMovie,
    setOpenRateSection,
}: MovieTypeProps) {
    function handleStats() {
        setCurrentClickedMovie(movie);
        if (currentClickedMovie?.imdbID === movie.imdbID) {
            setOpenRateSection((prev) => !prev);
            return;
        }
        setOpenRateSection(true);
    }

    return (
        <div
            className={`flex p-4 pl-6 items-center border-color-background-500 border-b-[1px] hover:bg-gray-600 cursor-pointer duration-300 ${
                currentClickedMovie?.imdbID === movie.imdbID
                    ? "bg-gray-600"
                    : ""
            }`}
            onClick={() => handleStats()}
        >
            <div className="w-12 mr-5">
                <img src={movie.Poster} alt={movie.Title} className="w-full" />
            </div>
            <div>
                <h3 className=" text-lg">{movie.Title}</h3>
                <p className="mt-2 text-sm">📆 {movie.Year}</p>
            </div>
        </div>
    );
}

export default Movie;
