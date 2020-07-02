import React from "react";
import { Genre } from "../constants/types";
import GenreTag from "./genre-tag";
import FavouriteButton from "./favourite-btn";

interface IMovieOverview {
    genres: Genre[];
    overview: string;
    favourite: boolean;
    movieId: number;
    markMovieAsFavourite: (movieId: number, favourite: boolean) => void;
}

export default function MovieOverview({ genres, overview, markMovieAsFavourite, favourite, movieId }: IMovieOverview) {
    return (
        <>
            <div style={{height: '100%'}}>
                <div style={{height: '25%', padding: '2vh 0'}}>
                    {genres.map(genre => <GenreTag key={genre.id} genre={genre} />)}
                </div>
                <div style={{height: '50%', overflowY: 'auto', overflowX: 'hidden'}}>
                    <br/>
                    <p style={{textAlign: 'justify', fontSize: '.65vw'}}>{overview}</p>
                </div>
                <div style={{padding: '1vh'}} >
                    <FavouriteButton addMovieToFavourites={markMovieAsFavourite} isFavourite={favourite} movieId={movieId}/>
                </div>
            </div>
        </>
    );
}
