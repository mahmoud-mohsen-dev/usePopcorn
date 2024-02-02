import { MovieslistProps } from "../../Types";
import Movie from "../Small Components/Movie";

function MoviesList({
    movies,
    currentClickedMovie,
    setCurrentClickedMovie,
    setOpenRateSection,
}: MovieslistProps) {
    // console.log(movies);
    return (
        <div>
            {movies?.map((movie) => {
                return (
                    <Movie
                        key={movie.imdbID}
                        movie={movie}
                        currentClickedMovie={currentClickedMovie}
                        setCurrentClickedMovie={setCurrentClickedMovie}
                        setOpenRateSection={setOpenRateSection}
                    />
                );
            })}
        </div>
    );
}

export default MoviesList;
