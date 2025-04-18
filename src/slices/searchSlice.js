import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: ''
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },
    clearSearch: (state) => {
      state.searchQuery = '';
    }
  }
});

export const { setSearchQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;