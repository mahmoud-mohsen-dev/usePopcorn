import { useState, useEffect } from "react";
import { MoviesListType, MySetStateType } from "../../Types";

const base = "https://www.omdbapi.com/";
const key = "apiKey=ae911bdc";

export function useMovies(
    searchInput: string,
    setOpenRateSection: MySetStateType<boolean>
): [MoviesListType, boolean, string] {
    const [movies, setMovies] = useState<MoviesListType | []>([]);
    const [showLoader, setShowLoader] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function getMovies() {
            try {
                setShowLoader(true);
                setError("");
                const res = await fetch(`${base}?${key}&s=${searchInput}`, {
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error("Something Went Wrong");
                }
                const data = await res.json();

                if (data.Response === "False") {
                    throw new Error("Movie not found");
                }
                setMovies(data.Search);
            } catch (err) {
                // console.error(err.message);
                if (err.message.toLowerCase() === "failed to fetch") {
                    setError(
                        "You are offline! checkout Your Internet Connection"
                    );
                    return;
                }

                if (err.message !== "The user aborted a request.") {
                    setError(err.message);
                    return;
                }
                console.log(err.message);
            } finally {
                setShowLoader(false);
            }
        }

        if (searchInput.length > 3) {
            getMovies();
        }
        if (searchInput.length === 0) {
            setMovies([]);
        }

        setOpenRateSection(false);

        return function () {
            controller.abort();
        };
    }, [searchInput, setOpenRateSection]);

    return [movies, showLoader, error];
}
