export interface TvShow {
	id: number;
	url: string;
	name: string;
	type: string;
	language: string;
	genres: Array<string>;
	status: string;
	runtime: number;
	averageRuntime: number;
	premiered: Date | string;
	ended: Date | string;
	officialSite: string;
	schedule: {
		time: string;
		days: Array<string>;
	};
	rating: {
		average: number;
	};
	image: {
		medium: string;
		original: string;
	};
	summary: string;
}
