import {TvShow} from '../Types/TvShowType';

const sortTvShowsByName = (tvShow1: TvShow, tvShow2: TvShow) => {
	const name1 = tvShow1.name.toLowerCase(),
		name2 = tvShow2.name.toLowerCase();
	if (name1 < name2) {
		return -1;
	}
	if (name1 > name2) {
		return 1;
	}
	return 0;
};

export {sortTvShowsByName};
