import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../core/models/bookmark.model';

export const loadBookmarks = createAction('[Bookmarks] Load');
export const loadBookmarksSuccess = createAction('[Bookmarks] Load Success', props<{ bookmarks: Bookmark[] }>());

export const addBookmark = createAction('[Bookmarks] Add', props<{ bookmark: Bookmark }>());
export const addBookmarkSuccess = createAction('[Bookmarks] Add Success', props<{ bookmark: Bookmark }>());

export const updateBookmark = createAction('[Bookmarks] Update', props<{ bookmark: Bookmark }>());
export const updateBookmarkSuccess = createAction('[Bookmarks] Update Success', props<{ bookmark: Bookmark }>());

export const deleteBookmark = createAction('[Bookmarks] Delete', props<{ id: string }>());
export const deleteBookmarkSuccess = createAction('[Bookmarks] Delete Success', props<{ id: string }>());
