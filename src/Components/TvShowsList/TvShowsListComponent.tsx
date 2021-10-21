import React from 'react';
import {FlatList} from 'react-native';
import {addFavorite, deleteFavorite} from '../../Redux/FavoritesSlice';

import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {TvShow} from '../../Types/TvShowType';
import {TvShowCard} from '../../Components/TvShowCard/TvShowCardComponent';

interface TvShowListComponentProps {
	shows: Array<TvShow>;
	listFooter: any;
	navigation: any;
	onEndReached: () => void;
	emptyComponent?: any;
}

const TvShowsListComponent: React.FC<TvShowListComponentProps> = ({
	shows,
	listFooter,
	navigation,
	onEndReached,
	emptyComponent,
}) => {
	const {favoritesIds} = useAppSelector(state => state.favorites);
	const dispatch = useAppDispatch();

	const toggleFavorite = (item: TvShow) => {
		if (favoritesIds.includes(item.id)) {
			dispatch(deleteFavorite(item));
		} else {
			dispatch(addFavorite(item));
		}
	};

	const renderItem = ({item}: {item: TvShow}) => {
		return (
			<TvShowCard
				item={item}
				active={favoritesIds.includes(item.id)}
				onPress={() => {
					navigation.navigate('TvShowDetail', {
						showID: item.id,
						header_title: item.name,
					});
				}}
				onPressAction={toggleFavorite}
			/>
		);
	};

	return (
		<FlatList
			data={shows}
			renderItem={renderItem}
			keyExtractor={item => `show${item.id}`}
			numColumns={3}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
			ListFooterComponent={listFooter}
			ListEmptyComponent={emptyComponent}
		/>
	);
};

export {TvShowsListComponent};
