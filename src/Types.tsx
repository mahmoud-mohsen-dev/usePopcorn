export interface MovieType {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

export type MoviesListType = MovieType[];

export interface WatchedType {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
}

export type WatchedListType = WatchedType[];

export type MySetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type MovieTypeProps = {
    movie: MovieType;
    currentClickedMovie: MovieType;
    setCurrentClickedMovie: MySetStateType<MovieType>;
    setOpenRateSection: MySetStateType<boolean>;
};

export type MovieslistProps = Omit<MovieTypeProps, "movie"> & {
    movies: MoviesListType;
};

export type watchedListProps = Omit<MovieTypeProps, "movie"> & {
    movies: WatchedListType;
};

export type RateSectionProps = {
    movies: WatchedListType;
    currentClickedMovie: MovieType;
    onSetWatched: MySetStateType<boolean>;
    setWatchedMovies: MySetStateType<WatchedListType>;
};
