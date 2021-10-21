import React, {useEffect, useState} from 'react';
import {
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Linking,
	Image,
	ActivityIndicator,
	Keyboard,
} from 'react-native';
import {SearchBar, Button, Avatar, Overlay, Card} from 'react-native-elements';
import {FullscreenContentLayout} from '../../Components/FullscreenContentLayout';
import RaitingScore from '../../Components/RaitingScore/RaitingScore';
import {searchPeople, searchShows} from '../../Services/SearchService';
import {ScrollView, Dimensions} from 'react-native';
import {EMPTY_IMAGE_URL} from '../../Utils/Constants';
import {Person} from '../../Types/PersonType';
import {
	SearchShowSingleResult,
	SearchPeopleSingleResult,
} from '../../Types/SearchResultsType';
import {styles} from './Styles';
import {getCastCreditsAndShow} from '../../Services/PeopleService';

const SearchScreen = ({navigation}) => {
	const [searchInputValue, setSearchInputValue] = useState('');
	const [showsSearchResults, setShowsSearchResults] = useState<
		Array<SearchShowSingleResult>
	>([]);
	const [peopleSearchResults, setPeopleSearchResults] = useState<
		Array<SearchPeopleSingleResult>
	>([]);
	const [loading, setLoading] = useState(false);
	const [loadingPeopleDetail, setLoadingPeopleDetail] = useState(false);
	const [closeKeyboardEvent, setCloseKeyboardEvent] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
	const [credits, setCredits] = useState(null);

	const handleRequestError = error => {
		console.error(error);
	};

	//Fetch search data after close the keyboard
	useEffect(() => {
		if (searchInputValue && closeKeyboardEvent) {
			setLoading(true);
			searchShows(searchInputValue)
				.then(showsResults => {
					setShowsSearchResults(showsResults);
					searchPeople(searchInputValue)
						.then(peopleResults => {
							setPeopleSearchResults(peopleResults);
							setLoading(false);
						})
						.catch(handleRequestError);
				})
				.catch(handleRequestError)
				.finally(() => {
					setLoading(false);
					setCloseKeyboardEvent(false);
				});
		}
	}, [closeKeyboardEvent, searchInputValue]);

	// Function used to detect when users close the keyboard and then trigger a new search after that.
	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () =>
			setCloseKeyboardEvent(false)
		);
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
			setCloseKeyboardEvent(true)
		);

		return () => {
			hideSubscription.remove();
			showSubscription.remove();
		};
	}, []);

	// Function used to load people data when they are selected
	useEffect(() => {
		if (selectedPerson) {
			setLoadingPeopleDetail(true);
			getCastCreditsAndShow(selectedPerson.id).then(result => {
				setCredits(result);
				setLoadingPeopleDetail(false);
			});
		}
	}, [selectedPerson]);

	const clearSearchResults = () => {
		setCredits(null);
		setSelectedPerson(null);
		setPeopleSearchResults([]);
		setShowsSearchResults([]);
	};

	const renderShowItem = (item: SearchShowSingleResult) => {
		return (
			<TouchableOpacity
				onPress={(): void => {
					navigation.navigate('TvShowDetail', {
						showID: item.show.id,
						header_title: item.show.name,
					});
				}}>
				<View style={styles.showItemRowContainer}>
					<View style={styles.showRowContainer}>
						<Image
							style={styles.imageContainer}
							source={{
								uri: item.show.image
									? item.show.image.original
									: EMPTY_IMAGE_URL,
							}}
							resizeMode={'contain'}
						/>
					</View>

					<View style={styles.showDetailContainer}>
						<Text style={styles.textShowTitle}>
							{item.show.name}
						</Text>

						{item.show.premiered && (
							<Text style={styles.whiteColor}>
								{item.show.premiered}-{item.show.ended || 'Now'}
							</Text>
						)}

						{item.show.officialSite && (
							<Button
								title='Official Website'
								type='clear'
								onPress={() =>
									Linking.openURL(item.show.officialSite)
								}
							/>
						)}
					</View>
					<View style={styles.showRowContainer}>
						{item.show.rating.average && (
							<RaitingScore
								averageScore={item.show.rating.average}
								maxScore={10}
							/>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const renderPeopleItem = (item: SearchPeopleSingleResult) => {
		return (
			<TouchableOpacity
				key={`people-${item.person.id}`}
				onPress={() => {
					setSelectedPerson(item.person);
				}}>
				<View style={styles.personItem}>
					<Avatar
						rounded
						size='large'
						source={{
							uri: item.person.image
								? item.person.image.original
								: EMPTY_IMAGE_URL,
						}}
					/>
					<Text style={styles.personNameText}>
						{item.person.name}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	const renderCastCredits = ({item}) => {
		return (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('TvShowDetail', {
						showID: item._embedded.show.id,
						header_title: item._embedded.show.name,
					})
				}>
				<View style={styles.castCreditContainer}>
					<Image
						style={styles.imageContainer}
						source={{
							uri: item._embedded.show.image
								? item._embedded.show.image.original
								: EMPTY_IMAGE_URL,
						}}
						resizeMode={'contain'}
					/>
					<Text style={styles.castTitleText}>
						{item._embedded.show.name}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
	const ModalPersonDetail = () => (
		<Overlay
			isVisible={true}
			onBackdropPress={() => {
				setSelectedPerson(null);
				setCredits(null);
			}}
			overlayStyle={styles.modalPersonDetail}>
			<ScrollView>
				<View style={styles.personModalContainer}>
					<Card.Title>{selectedPerson?.name} </Card.Title>

					<Image
						style={{
							width: Dimensions.get('screen').width * 0.75,
							height: Dimensions.get('screen').width * 0.9,
						}}
						source={{
							uri: selectedPerson?.image
								? selectedPerson.image.original
								: EMPTY_IMAGE_URL,
						}}
					/>
					{loadingPeopleDetail && (
						<View>
							<ActivityIndicator size={'large'} />
							<Text>Loading profile data</Text>
						</View>
					)}
					{credits && (
						<View>
							<Text style={styles.whiteColor}>Cast credits</Text>
							<FlatList
								ListEmptyComponent={
									<Text>
										There's no cast credits associated to
										this person
									</Text>
								}
								data={credits}
								renderItem={renderCastCredits}
								horizontal={true}
								style={styles.castCreditsListContainer}
							/>
						</View>
					)}
				</View>
			</ScrollView>
		</Overlay>
	);

	return (
		<FullscreenContentLayout>
			<View style={styles.contentLayout}>
				<SearchBar
					placeholder='Search TV programs or people'
					value={searchInputValue}
					onClear={clearSearchResults}
					onChangeText={(search: string) => {
						setSearchInputValue(search);
					}}
				/>
				{loading ? (
					<View style={styles.loadingSpinnerContainer}>
						<ActivityIndicator size='large' />
					</View>
				) : (
					<View>
						<FlatList
							ListHeaderComponent={
								<ScrollView
									horizontal={true}
									style={styles.peopleList}>
									{peopleSearchResults.map(item => {
										return renderPeopleItem(item);
									})}
								</ScrollView>
							}
							style={styles.resultContainer}
							data={showsSearchResults}
							renderItem={({item}) => renderShowItem(item)}
							keyExtractor={item => `show'${item.show.id}`}
						/>
						{!!selectedPerson && <ModalPersonDetail />}
					</View>
				)}
			</View>
		</FullscreenContentLayout>
	);
};

export {SearchScreen};
