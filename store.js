import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducer';

const persistConfig = {
 key: 'root',
 storage,
 whitelist: ['signup']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
 reducer: persistedReducer,
});

export const persistor = persistStore(store);
