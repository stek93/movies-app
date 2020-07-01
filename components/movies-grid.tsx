import React from "react";
import { Movie, MoviesResponse } from "../constants/types";
import { Button, Col, List, Row, Spin } from "antd";
import MovieCard from "./movie-card";
import { LoadingOutlined } from "@ant-design/icons";
import styles from './movies-grid.module.css';

interface IMoviesGrid {
    moviesResponse: MoviesResponse;
    loadMoreItems: () => void;
    currentPage: number;
    pageLoading: boolean;
    buttonLoading: boolean;
    loadMovie: () => void;
}

export default function MoviesGrid({ moviesResponse, loadMoreItems, currentPage, pageLoading, buttonLoading, loadMovie } : IMoviesGrid) {
    const movies: Movie[] = moviesResponse?.results;
    const remainingPages = moviesResponse?.total_pages - currentPage;
    const loadMore = remainingPages > 0 ? (
        <div className={styles.loadMoreDiv}>
            <Button className={styles.loadMoreBtn} onClick={() => loadMoreItems()} loading={buttonLoading}>Load more</Button>
        </div>
    ) : null;

    const loadingBar = (
        <Row align="middle" justify="center" className={styles.loadingBarRow}>
            <Col>
                <Spin indicator={
                    <LoadingOutlined className={styles.loadingBar} spin />}
                />
            </Col>
        </Row>);

    const moviesList = (
        <List
            grid={ {
                gutter: 16,
                sm: 1,
                md: 3,
                xxl: 5
            } }
            loadMore={loadMore}
            dataSource={ movies }
            renderItem={ movie => (
                <List.Item>
                    <MovieCard movie={movie} key={movie.id} loadMovie={loadMovie} />
                </List.Item>
            ) }
        />
    );

    return (
        pageLoading ? loadingBar : moviesList
    );
}