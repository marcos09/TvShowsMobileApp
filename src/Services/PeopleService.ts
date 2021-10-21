import {Person} from '../Types/PersonType';
import {getJsonResponse} from './CommonHTTPService';

const getCastCreditsAndShow = async (personID: number): Promise<Person> => {
	return getJsonResponse(
		`https://api.tvmaze.com/people/${personID}/castcredits?embed=show`
	);
};

export {getCastCreditsAndShow};
