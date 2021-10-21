import React, {useState} from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	FlatList,
	Text,
	Image,
} from 'react-native';

import {Icon} from 'react-native-elements';
import {EMPTY_IMAGE_URL} from '../../Utils/Constants';
import {styles} from './Styles';
import Accordion from 'react-native-collapsible/Accordion';

interface SeasonsDetailAccordionPropsInterface {
	seasons: any;
	navigation: any;
}

export const SeasonsDetailAccordion: React.FC<SeasonsDetailAccordionPropsInterface> =
	({seasons, navigation}) => {
		const [activeSeasons, setActiveSeasons] = useState<Array<number>>([]);

		const _renderHeader = (content, index, isActive) => {
			return (
				<View style={styles.header}>
					<Text style={styles.headerText}>{content.title}</Text>
					{isActive ? (
						<Icon
							name='chevron-up-outline'
							type='ionicon'
							color='#E0DEC5'
							tvParallaxProperties={undefined}
						/>
					) : (
						<Icon
							name='chevron-forward-outline'
							type='ionicon'
							color='#E0DEC5'
							tvParallaxProperties={undefined}
						/>
					)}
				</View>
			);
		};

		const renderEpisodeItem = ({item}) => {
			return (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('EpisodeDetail', {
							episodeID: item.id,
							header_title: `S${item.season}E${item.number}: ${item.name}`,
						})
					}>
					<View style={styles.episodeRowContainer}>
						<View>
							<Image
								style={{
									width: Dimensions.get('window').width / 3,
									height:
										Dimensions.get('window').width / 3 / 2,
									borderRadius: 15,
								}}
								resizeMode='contain'
								source={{
									uri: item.image
										? item.image.medium
										: EMPTY_IMAGE_URL,
								}}
							/>
						</View>
						<View style={styles.textEpisodeRowContainer}>
							<Text style={styles.whiteColor}>
								S{item.season}E{item.number}
							</Text>
							<Text style={styles.episodeTextDetail}>
								{item.name}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			);
		};

		/*
		 */

		const _renderContent = section => {
			return (
				<FlatList
					data={section.content}
					renderItem={renderEpisodeItem}
				/>
			);
		};

		return (
			<View>
				<Accordion
					sections={seasons}
					activeSections={activeSeasons}
					renderHeader={_renderHeader}
					renderContent={_renderContent}
					onChange={newActiveSeasons =>
						setActiveSeasons(newActiveSeasons)
					}
				/>
			</View>
		);
	};
