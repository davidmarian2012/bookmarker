import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.reducer';
import { Bookmark } from '../../core/models/bookmark.model';
import { groupBookmarks } from '../../shared/utils/group-bookmarks';
import { searchBookmarks } from '../../shared/utils/search-bookmarks';

export interface GroupedBookmarks {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}

export const selectBookmarksState = createFeatureSelector<BookmarksState>('bookmarks');

export const selectAllBookmarks = createSelector(selectBookmarksState, (state) => state.bookmarks);

export const selectLoading = createSelector(selectBookmarksState, (state) => state.loading);

export const selectSearchQuery = createSelector(selectBookmarksState, (state) => state.searchQuery);

export const selectFilteredBookmarks = createSelector(selectAllBookmarks, selectSearchQuery, (bookmarks, query) =>
  searchBookmarks(bookmarks, query),
);

export const selectGroupedBookmarks = createSelector(selectFilteredBookmarks, (bookmarks) => groupBookmarks(bookmarks));
