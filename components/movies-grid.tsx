import React from "react";
import { Movie } from "../constants/types";
import { List } from "antd";
import MovieCard from "./movie-card";

interface IMoviesGrid {
    movies: Movie[];
}

export default function MoviesGrid(data: IMoviesGrid) {

    return (
        <List
            grid={ {
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 3,
                xxl: 5,
            } }
            dataSource={ data.movies }
            renderItem={ movie => (
                <List.Item>
                    <MovieCard movie={movie} key={movie.id}/>
                </List.Item>
            ) }
        />
    );
}