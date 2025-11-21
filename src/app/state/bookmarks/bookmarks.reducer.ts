import { createReducer, on } from '@ngrx/store';
import * as BookmarkActions from './bookmarks.actions';
import { Bookmark } from '../../core/models/bookmark.model';

export interface BookmarksState {
  bookmarks: Bookmark[];
  loading: boolean;
}

export const initialState: BookmarksState = {
  bookmarks: [],
  loading: false,
};

export const bookmarksReducer = createReducer(
  initialState,
  on(BookmarkActions.loadBookmarks, (state) => ({
    ...state,
    loading: true,
  })),
  on(BookmarkActions.loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    loading: false,
    bookmarks,
  })),
  on(BookmarkActions.addBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: [...state.bookmarks, bookmark],
  })),
  on(BookmarkActions.updateBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: state.bookmarks.map((b) => (b.id === bookmark.id ? bookmark : b)),
  })),
  on(BookmarkActions.deleteBookmarkSuccess, (state, { id }) => ({
    ...state,
    bookmarks: state.bookmarks.filter((b) => b.id !== id),
  })),
);
