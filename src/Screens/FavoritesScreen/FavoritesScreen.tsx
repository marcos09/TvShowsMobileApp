import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import {useAppSelector} from '../../Redux/hooks';
import {Icon} from 'react-native-elements';
import {FullscreenContentLayout} from '../../Components/FullscreenContentLayout';
import {TvShow} from '../../Types/TvShowType';
import {sortTvShowsByName} from '../../Utils';
import {TvShowsListComponent} from '../../Components/TvShowsList/TvShowsListComponent';
import {styles} from './Styles';

const FavoritesScreen = ({navigation}) => {
	const {favoritesData} = useAppSelector(state => state.favorites);
	const [favorites, setFavorites] = useState<TvShow[]>([]);

	useEffect(() => {
		const favoritesSorted = [...favoritesData].sort(sortTvShowsByName);
		setFavorites(favoritesSorted);
	}, [favoritesData]);

	const EmptyFavoriteList = () => {
		return (
			<View style={styles.emptyFavoriteListContainer}>
				<View style={styles.emptyListContentContainer}>
					<Icon
						name='heart'
						size={25}
						type='antdesign'
						color={'white'}
						tvParallaxProperties={undefined}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.textStyle}>
							You don't have any favorite TV Shows yet.{' '}
						</Text>
						<Text style={styles.textStyle}>
							You can start adding new Shows to favorites on the
							TV Show screen{' '}
						</Text>
					</View>
				</View>
			</View>
		);
	};
	return (
		<FullscreenContentLayout>
			<TvShowsListComponent
				shows={favorites}
				listFooter={null}
				navigation={navigation}
				onEndReached={() => {}}
				emptyComponent={EmptyFavoriteList}
			/>
		</FullscreenContentLayout>
	);
};

export {FavoritesScreen};
