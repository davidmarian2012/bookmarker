import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookmarkActions from './bookmarks.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { BookmarkApiService } from '../../core/services/bookmark-api.service';

@Injectable()
export class BookmarksEffects {
  constructor(
    private actions$: Actions,
    private bookmarkApiService: BookmarkApiService,
  ) {}

  load$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.loadBookmarks),
        switchMap(() =>
          this.bookmarkApiService
            .getAll()
            .pipe(map((bookmarks) => BookmarkActions.loadBookmarksSuccess({ bookmarks }))),
        ),
      ),
    { functional: true },
  );

  add$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.addBookmark),
        mergeMap(({ bookmark }) =>
          this.bookmarkApiService
            .add(bookmark)
            .pipe(map((created) => BookmarkActions.addBookmarkSuccess({ bookmark: created }))),
        ),
      ),
    { functional: true },
  );

  update$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.updateBookmark),
        mergeMap(({ bookmark }) =>
          this.bookmarkApiService
            .edit(bookmark)
            .pipe(map((updated) => BookmarkActions.updateBookmarkSuccess({ bookmark: updated }))),
        ),
      ),
    { functional: true },
  );

  delete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.deleteBookmark),
        mergeMap(({ id }) =>
          this.bookmarkApiService.delete(id).pipe(map(() => BookmarkActions.deleteBookmarkSuccess({ id }))),
        ),
      ),
    { functional: true },
  );
}
