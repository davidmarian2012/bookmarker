import { createAction, props } from '@ngrx/store';
import { Bookmark } from '../../core/models/bookmark.model';

export const loadBookmarks = createAction('[Bookmarks] Load');
export const loadBookmarksSuccess = createAction('[Bookmarks] Load Success', props<{ bookmarks: Bookmark[] }>());
export const loadBookmarksFailure = createAction('[Bookmarks] Load Failure', props<{ error: any }>());

export const addBookmark = createAction('[Bookmarks] Add', props<{ bookmark: Bookmark }>());
export const updateBookmark = createAction('[Bookmarks] Update', props<{ bookmark: Bookmark }>());
export const deleteBookmark = createAction('[Bookmarks] Delete', props<{ id: number }>());

export const setSearchQuery = createAction('[Bookmarks] Set Search Query', props<{ query: string }>());
