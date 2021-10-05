import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {userSystemData} from './userSystemData'
import { cartData } from './cartData';
import { wishData } from './wishData';
import { prodData } from './prodData';

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
            userSystemData, cartData, wishData, prodData
        }),
        applyMiddleware(thunk, logger)
    );
    const persistor = persistStore(store);
    return { persistor, store };
}