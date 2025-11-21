import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.reducer';

export const selectBookmarksState = createFeatureSelector<BookmarksState>('bookmarks');

export const selectAllBookmarks = createSelector(selectBookmarksState, (state) => state.bookmarks);

export const selectLoading = createSelector(selectBookmarksState, (state) => state.loading);
