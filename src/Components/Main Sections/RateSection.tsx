import { useEffect, useRef, useState } from "react";
import RatingStars from "../Small Components/RatingStars";
import Loader from "../Small Components/Loader";
import { RateSectionProps, WatchedListType, WatchedType } from "../../Types";
import { useKey } from "../Custom Hooks/useKey";

const Base = "https://www.omdbapi.com/";
const key = "apiKey=ae911bdc";

function RateSection({
    onSetWatched,
    movies,
    currentClickedMovie,
    setWatchedMovies,
}: RateSectionProps) {
    const [rateMovie, setRateMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const refCount = useRef(0);
    // console.log(rateMovie);

    function handleCloseRateSection() {
        onSetWatched(false);
    }

    useEffect(() => {
        const getImdbMovieRating = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `${Base}?${key}&i=${currentClickedMovie.imdbID}`
                );
                const data = await response.json();
                setIsLoading(false);
                setRateMovie(data);

                const indexOfisThereARate = movies.findIndex(
                    (movie) => movie.imdbID === currentClickedMovie.imdbID
                );
                if (movies[indexOfisThereARate]?.userRating > 0) {
                    setStarsCount(movies[indexOfisThereARate].userRating);
                }
                if (!response.ok) {
                    throw new Error("Error fetching Data");
                }
            } catch (err) {
                console.error(err);
            }
        };

        getImdbMovieRating();
    }, [currentClickedMovie?.imdbID, movies]);

    useEffect(() => {
        document.title = `Movie | ${currentClickedMovie.Title}`;

        return (): void => {
            document.title = `usePopcorn`;
        };
    }, [currentClickedMovie.Title]);

    useKey("Escape", handleCloseRateSection);

    useEffect(() => {
        if (starsCount > 0) refCount.current += 1;
    }, [starsCount]);

    function handleAddedRate() {
        const ratedMovie = {
            Poster: rateMovie.Poster,
            Title: rateMovie.Title,
            Year: rateMovie.Year,
            imdbID: rateMovie.imdbID,
            imdbRating: Number(rateMovie.imdbRating),
            runtime: Number(rateMovie.Runtime.split(" ")[0]),
            userRating: starsCount,
            starsCountDecision: refCount,
        };
        setWatchedMovies((prev: WatchedListType) => [...prev, ratedMovie]);
    }

    function countStarsResult(countedStars: number) {
        setStarsCount(countedStars);
    }

    // console.log(starsCount);

    return isLoading ? (
        <Loader />
    ) : (
        <div className=" cursor-default">
            <div
                className="absolute left-2 top-2  cursor-pointer bg-white text-stone-800 w-7 h-7 rounded-full text-2xl leading-none px-1 "
                onClick={handleCloseRateSection}
            >
                &larr;
            </div>
            <div className="flex items-center gap-4 bg-color-background-100 md:max-lg:flex-col">
                <div className=" w-48 md:max-lg:w-full">
                    <img
                        src={rateMovie?.Poster}
                        alt={rateMovie?.Title}
                        className=" w-full"
                    />
                </div>
                <div className="p-4">
                    <h1 className=" text-2xl ">{rateMovie?.Title}</h1>
                    <p className=" mt-5 text-sm text-gray-300">
                        {rateMovie?.Released} &middot; {rateMovie?.Runtime}
                    </p>
                    <p className=" mt-2 text-sm text-gray-300">
                        {rateMovie?.Genre}
                    </p>
                    <p className=" mt-2 text-sm text-gray-300">
                        ⭐ {rateMovie?.imdbRating} IMDB rating
                    </p>
                </div>
            </div>

            <div className="p-7">
                {!movies.some((movie: WatchedType) => {
                    return movie.imdbID === currentClickedMovie.imdbID;
                }) ? (
                    <div className=" bg-color-background-100 rounded-lg p-5">
                        <div className="mb-3">
                            <RatingStars
                                color="#fcd53f"
                                size={41}
                                length={10}
                                fontSize={20}
                                strokeWidth={1}
                                countStarsResult={countStarsResult}
                            />
                        </div>
                        {starsCount > 0 && (
                            <button
                                className=" bg-color-primary py-2 w-full rounded-full hover:bg-color-primary-light active:bg-color-primary font-semibold"
                                onClick={() => {
                                    handleAddedRate();
                                    onSetWatched(false);
                                }}
                            >
                                + Add to list
                            </button>
                        )}
                    </div>
                ) : (
                    <div className=" bg-color-background-100 rounded-lg p-5">
                        Your Rated this movie {starsCount} 🌟
                    </div>
                )}

                <p className=" text-color-text-dark mt-4">{rateMovie?.Plot}</p>
            </div>
        </div>
    );
}

export default RateSection;
