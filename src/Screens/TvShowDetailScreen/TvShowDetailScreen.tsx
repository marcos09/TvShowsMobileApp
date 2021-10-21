import React, {useEffect, useState} from 'react';
import {
	Text,
	View,
	Dimensions,
	FlatList,
	ScrollView,
	Linking,
} from 'react-native';
import ScalableImage from 'react-native-scalable-image';
import {getShowDetailWithEpisodesAndCast} from '../../Services/ShowsService';
import {Button, Chip} from 'react-native-elements';
import {FullscreenContentLayout} from '../../Components/FullscreenContentLayout';
import {cardinalToOrdinal} from '../../Utils/NumbersFunctions';

import {styles} from './Styles';
import {ScheduleComponent} from '../../Components/TvShowSchedule/ScheduleComponent';
import {TvShow} from '../../Types/TvShowType';
import {EMPTY_IMAGE_URL} from '../../Utils/Constants';
import {SeasonsDetailAccordion} from '../../Components/SeasonDetail/SeasonsDetailAccordionComponent';

const TvShowDetailScreen = ({route, navigation}) => {
	const {showID} = route.params;
	const [activeSeasons, setActiveSeasons] = useState<Array<number>>([]);
	const [seasons, setSeasons] = useState([]);
	const [show, setShow] = useState<TvShow>(undefined);
	const [loading, setLoading] = useState(true);

	// Function used to load the whole needed data to present show information
	useEffect(() => {
		getShowDetailWithEpisodesAndCast(showID).then(showDetail => {
			setShow(showDetail);
			const result = showDetail._embedded.episodes.reduce(function (
				r,
				a
			) {
				r[a.season] = r[a.season] || [];
				r[a.season].push(a);
				return r;
			},
			Object.create(null));

			const sections = [];
			Object.keys(result).forEach(element => {
				sections.push({
					title: `${cardinalToOrdinal(element)} Season`,
					content: result[element],
				});
			});
			setSeasons(sections);
			setLoading(false);
		});
	}, []);

	const ShowDataComponent = () => {
		return (
			<View style={styles.showDataContainer}>
				{show.image && (
					<ScalableImage
						width={Dimensions.get('window').width}
						source={{
							uri: show.image.original,
						}}
					/>
				)}

				<View style={styles.genericDataContaioner}>
					<View style={styles.summaryContainer}>
						<Text style={styles.fieldTitleText}>Summary:</Text>
						<View style={styles.summaryTextContainer}>
							<Text style={styles.paragraphText}>
								{show.summary}
							</Text>
						</View>
					</View>
					{show.genres && show.genres.length > 0 && (
						<View>
							<Text style={styles.fieldTitleText}>Genres:</Text>
							<View style={styles.genresContainer}>
								<ScrollView horizontal={true}>
									<FlatList
										data={show.genres}
										horizontal={true}
										renderItem={({item}) => (
											<View
												style={
													styles.genresChipsContainer
												}>
												<Chip title={item} key={item} />
											</View>
										)}
									/>
								</ScrollView>
							</View>
						</View>
					)}

					{show.officialSite && (
						<Button
							title='Official Website'
							type='outline'
							onPress={() => Linking.openURL(show.officialSite)}
						/>
					)}

					{show.schedule && !!show.schedule.time && (
						<ScheduleComponent show={show} />
					)}
				</View>
			</View>
		);
	};

	return (
		<FullscreenContentLayout loading={loading}>
			{show && (
				<ScrollView>
					<ShowDataComponent />

					<View style={styles.seasonsContainer}>
						<SeasonsDetailAccordion
							seasons={seasons}
							navigation={navigation}
						/>
					</View>
				</ScrollView>
			)}
		</FullscreenContentLayout>
	);
};

export {TvShowDetailScreen};
