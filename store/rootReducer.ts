import {combineReducers} from 'redux';
import animeDetailSliceReducer from '../store-features/animeDetails/animeDetailsSlice';
import animeFvouriteSliceReducer from '../store-features/animeFavorite/animeFavoruiteSlice';

const rootReducer = combineReducers({
  animeDetailSlice: animeDetailSliceReducer,
  animeFavoruiteSlice: animeFvouriteSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
