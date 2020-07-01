import moment from "moment";
import { discoverMovies, searchMovies } from "./api";
import { AppProps } from "../constants/types";
import { AppRoutePaths } from "../constants/AppRoutes";

interface IQuery {
    query: Object,
    shouldFilterResults: boolean,
    rating?: number
}

class SearchService {

    private regexPatterns = [
        /^\b(after |before )\b\d*$/,
        /^\b(older than \d* years?|newer than \d* years?)\b$/,
        /^\d* stars?$/,
        /^\b(at least \d* stars?|at most \d* stars?)\b\d*$/
    ];

    private getFirstDayOfGivenYear(year: string): string {
        return moment([year]).format("YYYY-MM-DD");
    }

    private createQuery(searchTerm, index): IQuery {
        let query = {};
        const result: IQuery = {
            query,
            shouldFilterResults: false
        };
        const tokenizedTerm: string[] = searchTerm.split(" ");
        switch (index) {
            // 1st item in list of regex patterns
            case 0:
                const firstDayOfYear = this.getFirstDayOfGivenYear(tokenizedTerm[1]);
                if (tokenizedTerm[0] == "after") {
                    result.query['release_date.gte'] = firstDayOfYear
                } else {
                    result.query['release_date.lte'] = firstDayOfYear
                }
                break;
            // 2nd item in list of regex patterns
            case 1:
                if (tokenizedTerm[0] == "older") {
                    const year = moment().subtract(tokenizedTerm[2], "year").format("YYYY");
                    result.query['release_date.lte'] = this.getFirstDayOfGivenYear(year);
                } else {
                    const year = moment().add(tokenizedTerm[2], "year").format("YYYY");
                    result.query['release_date.gte'] = this.getFirstDayOfGivenYear(year)
                }
                break;
            // 3rd item in list of regex patterns
            case 2:
                result.query['vote_average.gte'] = tokenizedTerm[0]
                result.shouldFilterResults = true;
                result.rating = Number(tokenizedTerm[0]);
                break;
            // 4th item in list of regex patterns
            case 3:
                if (tokenizedTerm[1] == "least") {
                    result.query['vote_average.gte'] = tokenizedTerm[2];
                } else {
                    result.query['vote_average.lte'] = tokenizedTerm[2];
                }
                break;
        }

        // sort by vote average DESC
        result.query['sort_by'] = 'vote_average.desc';
        return result;
    }

    private setDiscoverSearchContext(searchResponse, query) {
        searchResponse.currentSearchContext = {};
        searchResponse.currentSearchContext.searchType = AppRoutePaths.DiscoverMovies;
        searchResponse.currentSearchContext.query = query;
    }

    private setSearchMoviesContext(searchResponse, searchTerm) {
        searchResponse.currentSearchContext = {};
        searchResponse.currentSearchContext.searchType = AppRoutePaths.SearchMovies;
        searchResponse.currentSearchContext.searchTerm = searchTerm;
    }

    public async doSearch(searchTerm: string): Promise<AppProps> {
        for (const pattern of this.regexPatterns) {
            let index = this.regexPatterns.indexOf(pattern);
            if (pattern.test(searchTerm)) {
                try {
                    const createdQuery:IQuery = this.createQuery(searchTerm, index);
                    if (createdQuery.shouldFilterResults) {
                        console.log(createdQuery.rating);
                        let searchResponse: AppProps = ((await discoverMovies(createdQuery.query)));
                        searchResponse.moviesResponse.results.filter(movie => {
                            const top = createdQuery.rating + 0.9; // 6 -> 6.9 (top border)
                            const bottom = Math.round(createdQuery.rating * 10) / 10; // 6 -> 6.0 (bottom border)
                            const movieAverage = Math.round(movie.vote_average * 10) / 10; // to make sure every number is rounded to 1 decimal
                            return movieAverage >= bottom && movieAverage <= top;
                        })

                        this.setDiscoverSearchContext(searchResponse, createdQuery.query);
                        return searchResponse;
                    } else {
                        let searchResponse: AppProps = (await discoverMovies(createdQuery.query));
                        this.setDiscoverSearchContext(searchResponse, createdQuery.query);
                        return searchResponse;
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                let searchResponse: AppProps = (await searchMovies(searchTerm));
                this.setSearchMoviesContext(searchResponse, searchTerm);
                return searchResponse;
            }
        }
    }
}

export default new SearchService();