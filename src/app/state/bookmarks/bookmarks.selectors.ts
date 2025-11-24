import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksState } from './bookmarks.reducer';
import { Bookmark } from '../../core/models/bookmark.model';
import Fuse from 'fuse.js';

export interface GroupedBookmarks {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}

export const selectBookmarksState = createFeatureSelector<BookmarksState>('bookmarks');

export const selectAllBookmarks = createSelector(selectBookmarksState, (state) => state.bookmarks);
export const selectLoading = createSelector(selectBookmarksState, (state) => state.loading);
export const selectSearchQuery = createSelector(selectBookmarksState, (state) => state.searchQuery);

export const selectFilteredBookmarks = createSelector(selectAllBookmarks, selectSearchQuery, (bookmarks, query) => {
  if (!query.trim()) return bookmarks;

  const fuse = new Fuse(bookmarks, {
    keys: ['name', 'url'],
    threshold: 0.4,
    ignoreLocation: true,
  });

  return fuse.search(query).map((result) => result.item);
});

export const selectGroupedBookmarks = createSelector(selectFilteredBookmarks, (bookmarks): GroupedBookmarks => {
  const groups: GroupedBookmarks = { today: [], yesterday: [], older: [] };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  bookmarks.forEach((b) => {
    const date = new Date(b.createdAt);

    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    const isYesterday =
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate();

    if (isToday) groups.today.push(b);
    else if (isYesterday) groups.yesterday.push(b);
    else groups.older.push(b);
  });

  return groups;
});
