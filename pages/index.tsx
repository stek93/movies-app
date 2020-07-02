import Head from 'next/head'
import React, { useEffect, useState } from "react";
import SideMenu from "../layouts/side-menu";
import { Layout } from 'antd';
import { InferGetStaticPropsType, NextPageContext } from "next";
import { AppProps, MoviesResponse, Search } from "../constants/types";
import MoviesGrid from "../components/movies-grid";
import { discoverMovies, getFavouriteMovies, getGenres, getMoviesByGenreId, getTopRatedMovies, getTrendingMovies, getUpcomingMovies, searchMovies } from "../services/api";
import HeaderMenu from "../layouts/header-menu";
import { AppRoutePaths } from "../constants/AppRoutes";
import AuthService from "../services/AuthService";
import { useRouter } from "next/router";
import { useUserState } from "../services/UserContext";
import SearchService from "../services/SearchService";
import LoadingModal from "../components/loading-modal";
import styles from '../styles/index.module.css';

const { Content } = Layout;

export const getServerSideProps = async (context: NextPageContext) => {
    const authenticated = AuthService.isAuthenticated(context);

    const moviesResponse: AppProps = await getTrendingMovies();
    const genresResponse: AppProps = await getGenres();

    const error = {
        isError: genresResponse.error.isError && moviesResponse.error.isError
    };

    return {
        props: {
            moviesResponse: moviesResponse.moviesResponse,
            genres: genresResponse.genres,
            error: error,
            authenticated
        }
    }
}

const loadMoviesListDependingOnMenuItem = async (category: string, key: string, page: number): Promise<MoviesResponse> => {
    if (category == AppRoutePaths.TrendingMovies) {
        return ((await getTrendingMovies(page)).moviesResponse);
    } else if (category == AppRoutePaths.TopRatedMovies) {
        return ((await getTopRatedMovies(page)).moviesResponse);
    } else if (category == AppRoutePaths.UpcomingMovies) {
        return ((await getUpcomingMovies(page)).moviesResponse);
    } else if (category == AppRoutePaths.FavouriteMovies) {
        return ((await getFavouriteMovies(page)).moviesResponse);
    } else {
        return ((await getMoviesByGenreId(key, page)).moviesResponse);
    }
}

const loadMoreMoviesFromCurrentSearch = async (searchType: string, search: Search, page: number): Promise<MoviesResponse> => {
    if (searchType == AppRoutePaths.DiscoverMovies) {
        return ((await discoverMovies(search.query, page)).moviesResponse);
    } else {
        return ((await searchMovies(search.searchTerm, page)).moviesResponse);
    }
}

export default function Home({ moviesResponse, genres, authenticated, error }: InferGetStaticPropsType<typeof getServerSideProps>) {
    const DEFAULT_PAGE: number = 1;

    const[moviesState, setMoviesState] = useState<MoviesResponse>(moviesResponse);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [movieLoading, setMovieLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
    const router = useRouter();
    const [state, dispatch] = useUserState();
    
    useEffect(() => {
        if (!authenticated) {
            router.push("/login")
        }
        setPageLoading(false);
    }, []);

    useEffect(() => {
        if (state.search.searchType) {
            loadMoreMoviesFromCurrentSearch(state.search.searchType, state.search, currentPage).then(response => {
                const newMovies = {
                    ...moviesState,
                    results: [...moviesState.results].concat(response.results)
                }
                setMoviesState(newMovies);
                setButtonLoading(false);
            }).catch(error => console.log(error));
        } else if (currentPage != DEFAULT_PAGE){
            loadMoviesListDependingOnMenuItem(state.category, state.key, currentPage).then(response => {
                const newMovies = {
                    ...moviesState,
                    results: [...moviesState.results].concat(response.results)
                }
                setMoviesState(newMovies);
                setButtonLoading(false);
            }).catch(error => console.log(error));
        }

    }, [currentPage]);

    const handleCategoryChange = async (category: string, key: string) => {
        setPageLoading(true);
        dispatch({ type: 'setCurrentMovieCategory', payload: { key, category } })
        setMoviesState({});
        setCurrentPage(DEFAULT_PAGE)
        setMoviesState(await (loadMoviesListDependingOnMenuItem(category, key, DEFAULT_PAGE)));
        setPageLoading(false);
    }

    const handleMoviesSearch = async (searchTerm: string) => {
        setPageLoading(true);
        try {
            let searchResponse:AppProps = (await SearchService.doSearch(searchTerm));
            const search: Search = {
                searchType: searchResponse.currentSearchContext.searchType,
                query: searchResponse.currentSearchContext.query,
                searchTerm: searchResponse.currentSearchContext.searchTerm
            };

            dispatch({ type: 'setCurrentSearchContext', payload: { search } })
            setMoviesState(searchResponse.moviesResponse);
            setCurrentPage(DEFAULT_PAGE);
            setPageLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const handleMoviesListReAppear = async () => {
        setPageLoading(true);
        const search: Search = {
            searchType: null,
            query: null,
            searchTerm: null,
        };
        dispatch({ type: 'setCurrentSearchContext', payload: { search } })
        setCurrentPage(DEFAULT_PAGE);
        try {
            setMoviesState(await (loadMoviesListDependingOnMenuItem(state.category, state.key, DEFAULT_PAGE)));
            setPageLoading(false);
        } catch (e) {
            console.log(e)
        }
    }

    const handleLoadMoreMovies = async () => {
        setButtonLoading(true);
        setCurrentPage(prevState => prevState + 1);
    }

    const handleMovieLoad = () => {
        setMovieLoading(true);
    }

    // if (error.isError) {
    //     // FIXME handle this the right way
    //     console.log('Errror');
    // }

    return (
        <>
            <div>
                <Head>
                    <title>Space Movies</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <main>
                    <Layout className={styles.layout}>
                        <HeaderMenu  searchMovies={handleMoviesSearch} restartMoviesList={handleMoviesListReAppear} showSearchBar/>
                        <Layout className={styles.siteLayout}>
                            <SideMenu changeCategory={handleCategoryChange} genres={genres}/>
                            <Content>
                                <div className={styles.siteLayoutBackground}>
                                    <LoadingModal visible={movieLoading} />
                                    <MoviesGrid
                                        pageLoading={pageLoading}
                                        buttonLoading={buttonLoading}
                                        moviesResponse={moviesState}
                                        currentPage={currentPage}
                                        loadMoreItems={handleLoadMoreMovies}
                                        loadMovie={handleMovieLoad}
                                    />
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </main>
            </div>
        </>
    )
}