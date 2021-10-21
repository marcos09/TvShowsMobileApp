import {TvShow} from './TvShowType';
import {Person} from './PersonType';

interface SearchShowSingleResult {
	score: number;
	show: TvShow;
}

interface SearchPeopleSingleResult {
	score: number;
	person: Person;
}

export type {SearchPeopleSingleResult, SearchShowSingleResult};
