import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {getShowsFromAPI} from '../../Services/ShowsService';
import {FullscreenContentLayout} from '../../Components/FullscreenContentLayout';

import {styles} from './Styles';
import {TvShow} from '../../Types/TvShowType';
import {TvShowsListComponent} from '../../Components/TvShowsList/TvShowsListComponent';

const HomeScreen = ({navigation}) => {
	const [shows, setShows] = useState<Array<TvShow>>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [nextDataPage, setNextDataPage] = useState(0);

	const fetchShows = () => {
		getShowsFromAPI(nextDataPage).then((result: TvShow[]) => {
			setLoading(false);
			setShows(shows.concat(result));
		});
		setNextDataPage(nextDataPage + 1);
	};

	/**
	 * Function to load tv shows when the app loads first time or when users
	 * scroll down to the end of the list
	 */
	useEffect(() => {
		setLoading(true);
		fetchShows();
	}, []);

	const ListFooterComponent = () => {
		return (
			<View style={styles.listFooterContainer}>
				<Text style={styles.footerTextStyle}>
					Loading more items...
				</Text>
				<ActivityIndicator />
			</View>
		);
	};

	return (
		<FullscreenContentLayout loading={loading}>
			<TvShowsListComponent
				shows={shows}
				listFooter={<ListFooterComponent />}
				navigation={navigation}
				onEndReached={fetchShows}
			/>
		</FullscreenContentLayout>
	);
};

export {HomeScreen};
