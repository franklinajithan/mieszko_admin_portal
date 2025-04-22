// src/store/slices/filterSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  // Add other filter criteria if needed, e.g., category, price range, etc.
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      // Reset other filters if added
    },
  },
});

export const { setSearchQuery, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
