import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.reducer';
import { groupBookmarks } from '../../shared/utils/group-bookmarks';
import Fuse from 'fuse.js';

export const selectBookmarksState = createFeatureSelector<BookmarksState>('bookmarks');

export const selectAllBookmarks = createSelector(selectBookmarksState, (state) => state.bookmarks);
export const selectLoading = createSelector(selectBookmarksState, (state) => state.loading);
export const selectSearchQuery = createSelector(selectBookmarksState, (state) => state.searchQuery);

export const selectFuse = createSelector(
  selectAllBookmarks,
  (bookmarks) =>
    new Fuse(bookmarks, {
      keys: ['name', 'url'],
      threshold: 0.4,
      ignoreLocation: true,
    }),
);

export const selectFilteredBookmarks = createSelector(
  selectFuse,
  selectSearchQuery,
  selectAllBookmarks,
  (fuse, query, bookmarks) => {
    if (!query.trim()) return bookmarks;

    return fuse.search(query).map((result) => result.item);
  },
);

export const selectGroupedBookmarks = createSelector(selectFilteredBookmarks, (bookmarks) => groupBookmarks(bookmarks));
