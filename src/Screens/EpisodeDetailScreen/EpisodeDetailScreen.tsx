import React, {useEffect, useState} from 'react';
import {Text, View, Dimensions} from 'react-native';
import Image from 'react-native-scalable-image';
import {FullscreenContentLayout} from '../../Components/FullscreenContentLayout';
import {getEpisodeDetail} from '../../Services/EpisodeService';
import {styles} from './Styles';
import {Episode} from '../../Types/EpisodeType';

const EpisodeDetailScreen = ({route}) => {
	const {episodeID} = route.params;
	const [episode, setEpisode] = useState<Episode>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getEpisodeDetail(episodeID).then(result => {
			setEpisode(result);
			setLoading(false);
		});
	}, []);

	return (
		<FullscreenContentLayout loading={loading}>
			{!!episode && (
				<View>
					{episode.image && (
						<Image
							width={Dimensions.get('window').width}
							source={{
								uri: episode.image.medium,
							}}
						/>
					)}

					<View style={styles.episodeDetailsContainer}>
						<View style={styles.mainEpisodeDataContainer}>
							<View>
								<Image
									width={
										Dimensions.get('window').width / 3 - 15
									}
									source={{
										uri: episode._embedded.show.image
											.medium,
									}}
								/>
							</View>
							<View style={styles.episodeRightTextsContainer}>
								<View>
									<Text style={styles.textTitle}>
										{episode._embedded.show.name}
									</Text>
									<Text style={styles.whiteColor}>
										<Text>Season: </Text>
										{episode.season}
									</Text>
									<Text style={styles.whiteColor}>
										Episode: {episode.number}
									</Text>
								</View>
							</View>
						</View>
						<Text style={styles.whiteColor}>{episode.summary}</Text>
					</View>
				</View>
			)}
		</FullscreenContentLayout>
	);
};

export {EpisodeDetailScreen};
