import moment from "moment";
import { discoverMovies, searchMovies } from "./api";
import { Movie } from "../constants/types";

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
            // first item in list of regex patterns
            case 0:
                const firstDayOfYear = this.getFirstDayOfGivenYear(tokenizedTerm[1]);
                if (tokenizedTerm[0] == "after") {
                    result.query['release_date.gte'] = firstDayOfYear
                } else {
                    result.query['release_date.lte'] = firstDayOfYear
                }
                break;
            // second item in list of regex patterns
            case 1:
                if (tokenizedTerm[0] == "older") {
                    const year = moment().subtract(tokenizedTerm[2], "year").format("YYYY");
                    result.query['release_date.lte'] = this.getFirstDayOfGivenYear(year);
                } else {
                    const year = moment().add(tokenizedTerm[2], "year").format("YYYY");
                    result.query['release_date.gte'] = this.getFirstDayOfGivenYear(year)
                }
                break;
            // third item in list of regex patterns
            case 2:
                result.query['vote_average.gte'] = tokenizedTerm[0]
                result.shouldFilterResults = true;
                result.rating = Number(tokenizedTerm[0]);
                break;
            case 3:
                if (tokenizedTerm[1] == "least") {
                    result.query['vote_average.gte'] = tokenizedTerm[2];
                } else {
                    result.query['vote_average.lte'] = tokenizedTerm[2];
                }
                break;
        }

        // sort DESC search query
        result.query['sort_by'] = 'vote_average.desc';
        return result;
    }

    public async doSearch(searchTerm: string): Promise<Movie[]> {
        for (const pattern of this.regexPatterns) {
            let index = this.regexPatterns.indexOf(pattern);
            if (pattern.test(searchTerm)) {
                try {
                    const createdQuery:IQuery = this.createQuery(searchTerm, index);
                    if (createdQuery.shouldFilterResults) {
                        console.log(createdQuery.rating);
                        return ((await discoverMovies(createdQuery.query)).movies).filter(movie => {
                            const top = createdQuery.rating + 0.9; // 6 -> 6.9 (top border)
                            const bottom = Math.round(createdQuery.rating * 10) / 10; // 6 -> 6.0 (bottom border)
                            const movieAverage = Math.round(movie.vote_average * 10) / 10; // to make sure every number is rounded to 1 decimal
                            return movieAverage >= bottom && movieAverage <= top;
                        });
                    } else {
                        return (await discoverMovies(createdQuery.query)).movies;
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {
                return ((await searchMovies(searchTerm)).movies);
            }
        }
    }
}

export default new SearchService();