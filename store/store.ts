import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import animeDetailSliceReducer from '../store-features/animeDetails/animeDetailsSlice';
import animeFvouriteSliceReducer from '../store-features/animeFavorite/animeFavoruiteSlice';

const rootPersistConfig = {
  key: 'anime-app',
  storage: AsyncStorage,
  blacklist: [''],
};

const reducers = combineReducers({
  animeDetailSlice: animeDetailSliceReducer,
  animeFavoruiteSlice: animeFvouriteSliceReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middlewares.push(createDebugger());
    }
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export {store, persistor};
