import { GetStaticProps, InferGetStaticPropsType } from "next";
import { AppProps, Movie } from "../../constants/types";
import { getMovieById, getTrendingMovies } from "../../services/api";
import { Col, Divider, Row } from "antd";
import Head from "next/head";
import React from "react";
import MovieCast from "../../components/movie-cast";
import MoviesRecommendations from "../../components/movies-recommendations";
import { AppRoutes } from "../../constants/AppRoutes";
import MovieShortOverview from "../../components/movie-short-overview";
import MovieOverview from "../../components/movie-overview";
import { useRouter } from "next/router";

const API_KEY = process.env.API_KEY;
const PHOTOS_BASE_URL = AppRoutes.PhotosBaseURL;
const PHOTO_SIZE = "original";

export const getStaticProps: GetStaticProps = async (context: any) => {
    // const authenticated = AuthService.isAuthenticated(context);
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
    const router = useRouter();

    // useEffect(() => {
    //     if (!authenticated) {
    //         router.push("/login")
    //     }
    // }, []);

    return (
        <>
            <Head>
                <title>{movie.title} | Movies App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div style={{height: '100vh', width: '100%', backgroundColor: 'black', color: 'white'}}>
                <Row align="bottom" style={{backgroundImage: `linear-gradient(to bottom, rgba(24, 19, 11, 0.52), rgba(0, 0, 0, 1)), url(${PHOTOS_BASE_URL}/${PHOTO_SIZE}${movie.backdrop_path}?api_key=${API_KEY})`, backgroundSize: 'cover', height: '50%', width: '100%'}}>
                    <Col span={12} offset={6}>
                        <Row>
                            <Col span={8}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <img alt={movie.title} src={`${PHOTOS_BASE_URL}/${PHOTO_SIZE}${movie.poster_path}?api_key=${API_KEY}`} style={{width: '80%'}}/>
                                </div>
                            </Col>
                            <Col span={16}>
                                <div style={{height: '100%', paddingTop: '2em'}}>
                                    <div style={{height: '25%'}}>
                                        <Row style={{borderBottom: '1px solid white'}}>
                                            <Col>
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
                                    <div style={{height: '75%'}}>
                                        <MovieOverview genres={movie.genres} overview={movie.overview} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: '20vh'}}>
                    <Col span={12} offset={6}>
                        <div style={{height:'19vh', paddingTop: '1em'}}>
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
            </div>
        </>
    );
}