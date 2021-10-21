import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TvShow} from '../Types/TvShowType';

interface FavoritesState {
	favoritesData: TvShow[];
	favoritesIds: number[];
}

const initialState: FavoritesState = {
	favoritesData: [],
	favoritesIds: [],
};

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState: initialState,
	reducers: {
		addFavorite: (state, action: PayloadAction<TvShow>) => {
			state.favoritesData.push(action.payload);
			state.favoritesIds = state.favoritesIds.concat([action.payload.id]);
		},
		deleteFavorite: (state, action: PayloadAction<TvShow>) => {
			state.favoritesData = state.favoritesData.filter(
				favorite => favorite.id !== action.payload.id
			);
			state.favoritesIds = state.favoritesIds.filter(
				favoriteID => favoriteID !== action.payload.id
			);
		},
	},
});

export const {addFavorite, deleteFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;
