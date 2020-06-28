import React from "react";
import { Genre } from "../constants/types";
import GenreTag from "./genre-tag";
import {
    HeartFilled
} from "@ant-design/icons"
import Logo from "./logo";

interface IMovieOverview {
    genres: Genre[];
    overview: string;
}

export default function MovieOverview({ genres, overview }: IMovieOverview) {
    return (
        <>
            <div style={{height: '100%'}}>
                <div style={{height: '20%'}}>
                    {genres.map(genre => <GenreTag key={genre.id} genre={genre} />)}
                </div>
                <div style={{height: '60%'}}>
                    <br/>
                    <p style={{textAlign: 'justify', fontSize: '1rem'}}>{overview}</p>
                </div>
                <div style={{height: '20%'}}>
                    <HeartFilled />
                    {/*TODO do favourite and login later*/}
                    <Logo />
                </div>
            </div>
        </>
    );
}
