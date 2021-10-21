export interface Person {
	id: number;
	url: string;
	name: string;
	country: {
		name: string;
		code: string;
		timezone: string;
	};
	birthday: string | Date;
	deathday: string | Date;
	gender: 'Male' | 'Female';
	image: {
		medium: string;
		original: string;
	};
	updated: number;
}
