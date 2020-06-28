import { Movie } from "../constants/types";
import Link from "next/link";
import { Card } from "antd";
import React from "react";
import { AppRoutes } from "../constants/AppRoutes";

const API_KEY = process.env.API_KEY;
const PHOTOS_BASE_URL = AppRoutes.PhotosBaseURL;
const PHOTO_CARD_SIZE = "w342";

interface IMovieThumbnail {
    movie: Movie
}

export default function MovieThumbnail({movie}: IMovieThumbnail) {
    return (
        <Link href="/movies/[id]" as={`/movies/${movie.id}`} key={movie.id}>
            <Card
                hoverable
                style={{display: 'inline-block', width: '14%', backgroundColor: 'transparent', borderColor: 'transparent', marginRight: '2em'}}
                cover={ <img alt={ movie.title } src={ `${PHOTOS_BASE_URL}/${PHOTO_CARD_SIZE}${movie.poster_path}?api_key=${API_KEY}` }/> } />
        </Link>
    );
}