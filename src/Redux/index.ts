import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './FavoritesSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

const reducers = combineReducers({
	favorites: favoritesReducer,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

const persistentStore = persistStore(store);

export {store, persistentStore};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
