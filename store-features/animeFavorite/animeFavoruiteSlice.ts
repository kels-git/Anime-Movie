import {createSlice} from '@reduxjs/toolkit';
import {Anime} from '../../src/typings/Anime';

const initialState = {
  selectedFavorites: [] as Anime[],
};

export const animeFavouriteDisplay = createSlice({
  name: 'animeFavourite',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload;
      if (
        !state.selectedFavorites.find(favItem => favItem.title === item.title)
      ) {
        state.selectedFavorites = [...state.selectedFavorites, item];
      }
    },
    removeFromFavorites: (state, action) => {
      const item = action.payload;
      state.selectedFavorites = state.selectedFavorites.filter(
        favItem => favItem.title !== item.title,
      );
    },
  },
});

export const {addToFavorites, removeFromFavorites} =
  animeFavouriteDisplay.actions;

export default animeFavouriteDisplay.reducer;
