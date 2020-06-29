import Head from 'next/head'
import React, { useEffect, useState } from "react";
import SideMenu from "../layouts/side-menu";
import { Layout } from 'antd';
import { InferGetStaticPropsType, NextPageContext } from "next";
import { AppProps, Movie } from "../constants/types";
import MoviesGrid from "../components/movies-grid";
import { getGenres, getMoviesByGenreId, getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from "../services/api";
import HeaderMenu from "../layouts/header-menu";
import { AppRoutePaths } from "../constants/AppRoutes";
import AuthService from "../services/AuthService";
import { useRouter } from "next/router";
import { useUserState } from "../services/UserContext";
import SearchService from "../services/SearchService";

const { Content } = Layout;

export const getServerSideProps = async (context: NextPageContext) => {
    const authenticated = AuthService.isAuthenticated(context);

    const responseMovies: AppProps = await getTrendingMovies();
    const responseGenres: AppProps = await getGenres();

    const error = {
        isError: responseGenres.error.isError && responseMovies.error.isError
    };

    return {
        props: {
            movies: responseMovies.movies,
            genres: responseGenres.genres,
            error: error,
            authenticated
        }
    }
}

const loadMoviesListDependingOnMenuItem = async (category: string, key: string): Promise<Movie[]> => {
    if (category == AppRoutePaths.TrendingMovies) {
        return ((await getTrendingMovies()).movies);
    } else if (category == AppRoutePaths.TopRatedMovies) {
        return ((await getTopRatedMovies()).movies);
    } else if (category == AppRoutePaths.UpcomingMovies) {
        return ((await getUpcomingMovies()).movies);
    } else {
        return ((await getMoviesByGenreId(key)).movies);
    }
}

export default function Home({ movies, genres, error, authenticated }: InferGetStaticPropsType<typeof getServerSideProps>) {
    const[moviesState, setMoviesState] = useState<Movie[]>(movies);
    const [selectedGenre, setSelected] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [state, dispatch] = useUserState()
    
    useEffect(() => {
        if (!authenticated) {
            router.push("/login")
        }
    }, []);

    const handleCategoryChange = async (category: string, key: string) => {
        setLoading(true);
        dispatch({ type: 'setCurrentMenuItem', payload: { currentMenuKey: key, currentMenuCategory: category } })

        if (category == AppRoutePaths.FavouriteMovies) {
            setMoviesState(state.favouriteMovies);
        } else {
            setMoviesState(await (loadMoviesListDependingOnMenuItem(category, key)));
        }
    }

    const handleMoviesSearch = async (searchTerm: string) => {
        try {
            setMoviesState((await SearchService.doSearch(searchTerm)))
        } catch (e) {
            console.log(e);
        }
    }

    const handleMoviesListReAppear = async () => {
        try {
            if(state.currentMenuCategory == AppRoutePaths.FavouriteMovies) {
                setMoviesState(state.favouriteMovies);
            } else {
                setMoviesState(await (loadMoviesListDependingOnMenuItem(state.currentMenuCategory, state.currentMenuKey)));
            }
        } catch (e) {
            console.log(e)
        }
    }


    if (error.isError) {
        // FIXME handle this the right way
        console.log('Errror');
    }

    return (
        <>
            <div className="container">
                <Head>
                    <title>Movies App</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <Layout style={ { minHeight: '100vh' } }>
                        <HeaderMenu  searchMovies={handleMoviesSearch} restartMoviesList={handleMoviesListReAppear}/>
                        <Layout className="site-layout">
                            <SideMenu changeCategory={handleCategoryChange} genres={genres}/>
                            <Content>
                                <div className="site-layout-background">
                                    <MoviesGrid movies={moviesState} />
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </main>
            </div>
        </>
    )
}