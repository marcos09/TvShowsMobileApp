import {
	SearchPeopleSingleResult,
	SearchShowSingleResult,
} from '../Types/SearchResultsType';
import {getJsonResponse} from './CommonHTTPService';

const searchShows = async (
	searchText: string
): Promise<Array<SearchShowSingleResult>> => {
	return getJsonResponse(
		`https://api.tvmaze.com/search/shows?q=${searchText}`
	);
};
const searchPeople = async (
	searchText: string
): Promise<Array<SearchPeopleSingleResult>> => {
	return getJsonResponse(
		`https://api.tvmaze.com/search/people?q=${searchText}`
	);
};

export {searchShows, searchPeople};
