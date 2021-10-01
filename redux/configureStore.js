import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {userData} from './userData'
import {userSystemData} from './userSystemData'

import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';

export const ConfigureStore = () => {
    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config, {
            userData, userSystemData
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor = persistStore(store);
    return { persistor, store };
}