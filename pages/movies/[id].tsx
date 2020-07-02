import { GetStaticProps, InferGetStaticPropsType } from "next";
import { AppProps, Movie } from "../../constants/types";
import { findFavouriteByMovieId, getMovieById, getTrendingMovies, markMovieAsFavourite } from "../../services/api";
import { Col, Divider, Layout, Row } from "antd";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import MovieCast from "../../components/movie-cast";
import MoviesRecommendations from "../../components/movies-recommendations";
import { AppRoutes } from "../../constants/AppRoutes";
import MovieShortOverview from "../../components/movie-short-overview";
import MovieOverview from "../../components/movie-overview";
import styles from '../../styles/id.module.css';
import HeaderMenu from "../../layouts/header-menu";

const API_KEY = process.env.API_KEY;
const PHOTOS_BASE_URL = AppRoutes.PhotosBaseURL;
const PHOTO_SIZE = "original";

const { Content } = Layout;

export const getStaticProps: GetStaticProps = async (context: any) => {
    const response: AppProps = await getMovieById(context.params.id);

    return {
        props: {
            movie: response.movie,
            error: response.error,
        }
    }
}

export const getStaticPaths = async () => {
    const popularMovies: Movie[] = (await getTrendingMovies()).moviesResponse.results;

    return {
        paths: popularMovies.map(movie => `/movies/${movie.id}`),
        fallback: true,
    }
}

export default function _Movie({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
    const [favourite, setFavourite] = useState<boolean>(false);
    const [trailersModalVisible, setTrailersModalVisible] = useState<boolean>(false);

    const handleFavouriteMovie = async (movieId: number, favourite: boolean) => {
        markMovieAsFavourite(favourite, movieId).then(_ => {
            setFavourite(favourite);
        });
    };

    const handleLoadTrailers = () => {
        setTrailersModalVisible(true);
    };

    const handleCloseTrailersModal = () => {
        setTrailersModalVisible(false);
    }

    useEffect(() => {
        findFavouriteByMovieId(movie.id).then(response => {
            if(response != null) {
                setFavourite(true);
            }
        })
    }, [favourite]);


    return (
        <>
            <Head>
                <title>{movie?.title} | Space Movies</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Layout className={styles.mainLayout}>
                    <HeaderMenu />
                    <Layout className={styles.contentLayout}>
                        <Content>
                            <Row
                                align="bottom"
                                style={{backgroundImage: `linear-gradient(to bottom, rgba(24, 19, 11, 0.52), rgba(0, 0, 0, 1)), url(${PHOTOS_BASE_URL}/${PHOTO_SIZE}${movie.backdrop_path}?api_key=${API_KEY})`}}
                                className={styles.mainRow}>
                                <Col span={12} offset={6}>
                                    <Row>
                                        <Col span={8}>
                                            <div className={styles.imgContainer}>
                                                <img
                                                    alt={movie.title} src={`${PHOTOS_BASE_URL}/${PHOTO_SIZE}${movie.poster_path}?api_key=${API_KEY}`}
                                                    className={styles.img}/>
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <div style={{height: '100%', paddingTop: '2em'}}>
                                                <div style={{height: '30%'}}>
                                                    <Row style={{borderBottom: '1px solid white'}}>
                                                        <Col style={{width: '100%'}}>
                                                            <MovieShortOverview
                                                                title={movie.title}
                                                                runtime={movie.runtime}
                                                                release_date={movie.release_date}
                                                                popularity={movie.popularity}
                                                                vote_average={movie.vote_average}
                                                                vote_count={movie.vote_count} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div style={{height: '70%'}}>
                                                    <MovieOverview
                                                        genres={movie.genres}
                                                        overview={movie.overview}
                                                        favourite={favourite}
                                                        markMovieAsFavourite={handleFavouriteMovie}
                                                        movieId={movie.id}/>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{height: '22vh'}}>
                                <Col span={12} offset={6}>
                                    <div style={{height:'21vh', paddingTop: '1em'}}>
                                        <Divider orientation="left" style={{color: 'white', fontSize: '1.5em'}}>
                                            Cast
                                        </Divider>
                                        <div style={{overflow: 'auto', height: '90%'}}>
                                            <MovieCast cast={movie.credits.cast} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{height: '30vh'}}>
                                <Col span={12} offset={6}>
                                    <br/>
                                    <div style={{height:'28vh', paddingTop: '1em'}}>
                                        <Divider orientation="left" style={{color: 'white', fontSize: '1.5em'}}>
                                            Movies you may like
                                        </Divider>
                                        <div style={{overflow: 'auto', height: '80%'}}>
                                            <MoviesRecommendations movies={movie.similar.results} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </main>

        </>
    );
}