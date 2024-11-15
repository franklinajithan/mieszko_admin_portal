// src/store/selectors/filterSelectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectSearchQuery = (state) => state.filter.searchQuery;

export const selectFilteredRows = createSelector(
  [(state, rows) => rows, selectSearchQuery],
  (rows, searchQuery) => {
    return rows.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);
