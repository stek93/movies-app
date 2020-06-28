import React from "react";
import { Movie } from "../constants/types";
import MovieThumbnail from "./movie-thumbnail";

interface IMoviesList {
    movies: Movie[];
}

export default function MoviesRecommendations({ movies }: IMoviesList) {
    // sort by average vote score descending
    movies.sort((a, b) => b.vote_average - a.vote_average)
    return (
        <div style={{textAlign: 'center'}}>
            { movies.map(movie => <MovieThumbnail key={movie.id} movie={movie} />) }
        </div>
    );
}