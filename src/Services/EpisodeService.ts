import {getJsonResponse} from './CommonHTTPService';
import {Episode} from '../Types/EpisodeType';

const getEpisodeDetail = async (episodeID: number): Promise<Episode> => {
	return getJsonResponse(
		`https://api.tvmaze.com/episodes/${episodeID}?embed[]=show`
	);
};

export {getEpisodeDetail};
