import {TvShow} from '../Types/TvShowType';
import {getJsonResponse} from './CommonHTTPService';

const getShowsFromAPI = async (pageNumber = 0): Promise<Array<TvShow>> => {
	return getJsonResponse(`https://api.tvmaze.com/shows?page=${pageNumber}`);
};

const getShowDetailWithEpisodesAndCast = async (
	showID: number
): Promise<Array<TvShow>> => {
	return getJsonResponse(
		`https://api.tvmaze.com/shows/${showID}?embed[]=episodes&embed[]=cast`
	);
};

export {getShowsFromAPI, getShowDetailWithEpisodesAndCast};
