import axios, { AxiosInstance } from "axios";
import { ApiError, AppProps, Genre, GenresResponse, Movie, MoviesResponse, TimeWindow, UpcomingDate } from "../constants/types";
import { AppRoutes } from "../constants/AppRoutes";

const API_KEY = process.env.API_KEY;
const MOVIES_BASE_URL = AppRoutes.MoviesBaseURL;
const PHOTOS_BASE_URL = AppRoutes.PhotosBaseURL;
const TRENDING_MOVIES = AppRoutes.TrendingMoviesURI;
const TOP_RATED_MOVIES = AppRoutes.TopRatedMoviesURI;
const UPCOMING_MOVIES = AppRoutes.UpcomingMoviesURI;
const DISCOVER_MOVIES = AppRoutes.DiscoverMoviesURI;
const FAVOURITE_MOVIES = AppRoutes.FavouriteMoviesURI;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: MOVIES_BASE_URL,
    params: {
        api_key: API_KEY
    }
});

export async function getTrendingMovies(page: number = 1, time: TimeWindow = 'day'): Promise<AppProps> {
    let movies: Movie[] = [];
    let error: ApiError = {
        isError: false
    }

    try {
        movies = (
            await axiosInstance.get<MoviesResponse>(`${TRENDING_MOVIES}/${time}`
                )).data.results;
    } catch (e) {
        error.isError = true;
    }

    return {
        movies,
        error,
    }
}

export async function getTopRatedMovies(page: number = 1): Promise<AppProps> {
    let movies: Movie[] = [];
    let error: ApiError = {
        isError: false
    };

    try {
        movies = (
            await axiosInstance.get<MoviesResponse>(TOP_RATED_MOVIES, {
                params: {
                    page: page } }
                )).data.results;
    } catch (e) {
        error.isError = true;
    }

    return {
        movies,
        error,
    }
}

export async function getUpcomingMovies(page: number = 1): Promise<AppProps> {
    let movies: Movie[] = [];
    let dates: UpcomingDate;
    let error: ApiError = {
        isError: false
    };

    try {
        const response = (
            await axiosInstance.get<MoviesResponse>(UPCOMING_MOVIES, {
                params: {
                    page: page } }
                )).data;
        movies = response.results;
        dates = response.dates;
    } catch (e) {
        error.isError = true;
    }

    return {
        movies,
        dates,
        error,
    }
}

export async function getGenres(): Promise<AppProps> {
    let genres: Genre[];
    let error: ApiError = {
        isError: false
    }

    try {
        genres = (
            await axiosInstance.get<GenresResponse>('/genre/movie/list')
        ).data.genres;
    } catch (e) {
        error.isError = true;
    }

    return {
        genres,
        error,
    }
}

export async function getMovieById(id: number): Promise<AppProps> {
    let movie: Movie = {};
    let error: ApiError = {
        isError: false
    }

    try {
        movie = (await axiosInstance.get<Movie>(`/movie/${id}`, {
            params: {
                append_to_response: 'videos,credits,similar',
            }
        })).data;
    } catch (e) {
        error.isError = true;
    }

    return {
        movie,
        error
    }
}

export async function getMoviesByGenreId(genreId: string): Promise<AppProps> {
    let movies: Movie[] = [];
    let error: ApiError = {
        isError: false
    };

    try {
        movies = (await axiosInstance.get<MoviesResponse>(DISCOVER_MOVIES, {
            params: {
                with_genres: genreId
            }
        })).data.results;
    } catch (e) {
        error.isError = true;
    }

    return {
        movies,
        error
    }
}

export async function getFavouriteMovies(sessionID: string): Promise<AppProps> {
    let movies: Movie[] = [];
    let error: ApiError = {
        isError: false
    };

    try {
        movies = (await axiosInstance.get<MoviesResponse>(FAVOURITE_MOVIES, {
            params: {
                session_id: sessionID
            }
        })).data.results;
    } catch (e) {
        error.isError = true;
    }

    return {
        movies,
        error,
    }
}

export async function discoverMovies(query: Object): Promise<AppProps> {
    let movies: Movie[] = [];
    let error: ApiError = {
        isError: false
    };

    try {
        movies = (await axiosInstance.get<MoviesResponse>(DISCOVER_MOVIES, {
            params: query
        })).data.results;
    } catch (e) {
        error.isError = true;
    }

    return {
        movies,
        error,
    }
}

export async function searchMovies(searchTerm: string): Promise<AppProps> {
    let movies: Movie[] = [];
    let error: ApiError = {
        isError: false
    };

    try {
        movies = (await axiosInstance.get<MoviesResponse>(AppRoutes.SearchMoviesURI, {
            params: {
                query: searchTerm
            }
        })).data.results.sort((a, b) => b.vote_average - a.vote_average);
    } catch (e) {
        error.isError = true;
    }

    return {
        movies,
        error,
    }
}