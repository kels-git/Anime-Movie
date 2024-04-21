import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  animeDetails: {} as any,
};

export const animeDetailsDisplay = createSlice({
  name: 'animeDetails',
  initialState,
  reducers: {
    addAnimeDetailDisplay: (state, action) => {
      state.animeDetails = action.payload;
    },
  },
});

export const {addAnimeDetailDisplay} = animeDetailsDisplay.actions;

export default animeDetailsDisplay.reducer;
