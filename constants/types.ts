export interface ILogin {
    username: string,
    password: string,
    request_token?: string
}

export interface AuthToken {
    success?: boolean,
    expires_at?: string,
    request_token?: string
}

export interface SessionToken {
    success?: boolean,
    session_id?: string
}

export interface AppProps {
    moviesResponse?: MoviesResponse,
    movie?: Movie,
    genres?: Genre[],
    error: ApiError,
    dates?: UpcomingDate,
    authenticated?: boolean,
    currentSearchContext?: Search
}

export interface Search {
    searchType?: string
    query?: Object,
    searchTerm?: string
}

export interface ApiError {
    isError?: boolean;
}

export interface MoviesResponse {
    page?: number;
    results?: Movie[];
    total_results?: number;
    total_pages?: number;
    dates?: UpcomingDate;
}

export interface UpcomingDate {
    maximum?: string;
    minimum?: string;
}

export interface GenresResponse {
    genres?: Genre[];
}

export interface Movie {
    adult?: boolean;
    backdrop_path?: string | null;
    belongs_to_collection?: object | null;
    budget?: number;
    genres?: Genre[];
    homepage?: string | null;
    id?: number;
    imdb_id?: string | null;
    original_language?: string;
    original_title?: string;
    overview?: string | null;
    popularity?: number;
    poster_path?: string | null;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    release_date?: string;
    revenue?: number;
    runtime?: number | null;
    spoken_languages?: SpokenLanguage[];
    status?: Status;
    tagline?: string | null;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    videos?: Videos;
    similar?: SimilarMovies;
    credits?: Credits;
}

export interface Credits {
    id?: number;
    cast?: Cast[];
    crew?: Crew[];
}

export interface Cast {
    id?: number;
    cast_id?: number;
    character?: string;
    credit_id?: string;
    gender?: number | null;
    name?: string;
    order?: number;
    profile_path?: string | null;
}

export interface Crew {
    id?: number;
    credit_id?: string;
    department?: string;
    gender?: number | null;
    job?: string;
    name?: string;
    profile_path?: string | null;
}

export interface SimilarMovies {
    page?: number;
    total_pages?: number;
    total_results?: number;
    results?: Movie[];
}

export interface Videos {
    id?: number;
    results?: Video[];
}

export interface Video {
    id?: string;
    iso_639_1?: string;
    iso_3166_1?: string;
    key?: string;
    name?: string;
    site?: string;
    size?: VideoSize;
    type?: VideoType;
}

export interface Genre {
    id: number;
    name: string
}

export interface ProductionCompany {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
}

export interface ProductionCountry {
    iso_3166_1?: string;
    name?: string;
}

export interface SpokenLanguage {
    iso_639_1?: string;
}

type Status = 'Rumored' | 'Planned' | 'In Production' | 'Post' | 'Production' | 'Released' | 'Canceled';

type VideoSize = 360 | 480 | 720 | 1080;

type VideoType = 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers';

export type TimeWindow = 'day' | 'week';