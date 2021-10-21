import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/Screens/HomeScreen/HomeScreen';
import {EpisodeDetailScreen} from './src/Screens/EpisodeDetailScreen/EpisodeDetailScreen';
import {SearchScreen} from './src/Screens/SearchScreen/SearchScreen';
import {TvShowDetailScreen} from './src/Screens/TvShowDetailScreen/TvShowDetailScreen';
import {FavoritesScreen} from './src/Screens/FavoritesScreen/FavoritesScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import {store, persistentStore} from './src/Redux';
import {PersistGate} from 'redux-persist/integration/react';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreens = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen
				name='TvShowDetail'
				component={TvShowDetailScreen}
				options={({route}) => ({title: route.params.header_title})}
			/>
			<Stack.Screen
				name='EpisodeDetail'
				component={EpisodeDetailScreen}
				options={({route}) => ({title: route.params.header_title})}
			/>
		</Stack.Navigator>
	);
};

const SearchScreens = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='SearchHome'
				component={SearchScreen}
				options={{
					title: 'Search',
				}}
			/>
			<Stack.Screen
				name='TvShowDetail'
				component={TvShowDetailScreen}
				options={({route}) => ({
					title: route.params.header_title,
				})}
			/>
			<Stack.Screen
				name='EpisodeDetail'
				component={EpisodeDetailScreen}
				options={({route}) => ({
					title: route.params.header_title,
				})}
			/>
		</Stack.Navigator>
	);
};

const FavoriteScreens = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='FavoritesHome'
				component={FavoritesScreen}
				options={{
					title: 'Favorites',
				}}
			/>
			<Stack.Screen
				name='TvShowDetail'
				component={TvShowDetailScreen}
				options={({route}) => ({
					title: route.params.header_title,
				})}
			/>
			<Stack.Screen
				name='EpisodeDetail'
				component={EpisodeDetailScreen}
				options={({route}) => ({
					title: route.params.header_title,
				})}
			/>
		</Stack.Navigator>
	);
};

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistentStore}>
				<NavigationContainer>
					<Tab.Navigator
						screenOptions={({route}) => ({
							headerShown: false,
							tabBarIcon: ({focused, color, size}) => {
								let iconName;
								switch (route.name) {
									case 'TV Shows':
										iconName = focused
											? 'ios-information-circle'
											: 'ios-information-circle-outline';
										break;
									case 'Favorites':
										iconName = 'heart';
										break;
									case 'Search':
										iconName = 'search';
										break;
									default:
										break;
								}
								return (
									<Ionicons
										name={iconName}
										size={size}
										color={color}
									/>
								);
							},
							tabBarActiveTintColor: 'tomato',
							tabBarInactiveTintColor: 'gray',
						})}>
						<Tab.Screen name='TV Shows' component={MainScreens} />
						<Tab.Screen name='Search' component={SearchScreens} />
						<Tab.Screen
							name='Favorites'
							component={FavoriteScreens}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
};

export default App;
