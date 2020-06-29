import React from "react";
import { Badge, Card } from "antd";
import { Movie } from "../constants/types";
import styles from './movie-card.module.css';
import Link from "next/link";
import { AppRoutes } from "../constants/AppRoutes";

const API_KEY = process.env.API_KEY;
const PHOTOS_BASE_URL = AppRoutes.PhotosBaseURL;
const PHOTO_CARD_SIZE = "w342";

const { Meta } = Card;

interface IMovie {
    movie: Movie
}

export default function MovieCard({ movie }: IMovie) {

    let averageCount: number | string;
    if (movie.vote_average) {
        averageCount = Number(movie.vote_average).toFixed(1);
    } else {
        averageCount = 'N/A';
    }

    let countColor: string = 'orange';
    if (movie.vote_average <= 6.5) {
        countColor = 'red';
    } else if (movie.vote_average >= 8.5) {
        countColor = 'green';
    }


    return (
        <Link href="/movies/[id]" as={`/movies/${movie.id}`}>
            <Badge count={ averageCount } offset={ [ -120, 0 ] } style={ { backgroundColor: countColor } }>
                <Card
                    hoverable
                    className={styles.card}
                    cover={ <img alt={ movie.title } src={ `${PHOTOS_BASE_URL}/${PHOTO_CARD_SIZE}${movie.poster_path}?api_key=${API_KEY}` }/> }>
                    <div className={styles.meta}>
                        <Meta className={styles.meta} title={ <span className={styles.title}>{movie.title}</span> } description={ movie.release_date?.split('-')[0] } />
                    </div>
                </Card>
            </Badge>
        </Link>
    );
}