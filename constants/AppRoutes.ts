export enum AppRoutes {
    MoviesBaseURL = "https://api.themoviedb.org/3",
    PhotosBaseURL = "http://image.tmdb.org/t/p/",
    AuthNewTokenURI = "/authentication/token/new",
    AuthLoginURI = "/authentication/token/validate_with_login",
    AuthNewSessionURI = "/authentication/session/new",
    TrendingMoviesURI = "/trending/movie",
    TopRatedMoviesURI = "/movie/top_rated",
    UpcomingMoviesURI = "/movie/upcoming",
    DiscoverMoviesURI = "/discover/movie",
    FavouriteMoviesURI = "/account/{account_id}/favorite/movies",
    SearchMoviesURI = "/search/movie",
}

export enum AppRoutePaths {
    TrendingMovies = "Trending",
    TopRatedMovies = "Top Rated",
    UpcomingMovies = "Upcoming",
    FavouriteMovies = "Favourites",
    MovieGenres = "Genres"
}