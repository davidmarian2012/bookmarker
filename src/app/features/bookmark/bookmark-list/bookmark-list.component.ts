import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../../core/models/bookmark.model';
import { BookmarkDetailsComponent } from '../bookmark-details/bookmark-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  selectFilteredBookmarks,
  selectGroupedBookmarks,
  selectLoading,
  selectSearchQuery,
} from '../../../state/bookmarks/bookmarks.selectors';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, Subject, takeUntil } from 'rxjs';
import {
  deleteBookmark,
  loadBookmarks,
  setSearchQuery,
  updateBookmark,
} from '../../../state/bookmarks/bookmarks.actions';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SubscribedComponent } from '../../../shared/components/subscribed/subscribed.component';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BookmarkDetailsComponent,
    MatIconModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatInputModule,
  ],
})
export class BookmarkListComponent extends SubscribedComponent implements OnInit {
  bookmarks$!: Observable<Bookmark[]>;
  loading$!: Observable<boolean>;
  groupedBookmarks$!: Observable<any>;
  searchQuery$!: Observable<any>;
  displayData$!: Observable<any>;

  searchInput$ = new Subject<string>();

  constructor(
    private store: Store,
    private router: Router,
  ) {
    super();
  }

  ngOnInit() {
    this.bookmarks$ = this.store.select(selectFilteredBookmarks);
    this.loading$ = this.store.select(selectLoading);
    this.groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
    this.searchQuery$ = this.store.select(selectSearchQuery);

    this.store.dispatch(loadBookmarks());

    this.searchInput$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((query) => this.store.dispatch(setSearchQuery({ query })));

    this.setDisplayData();
  }

  private setDisplayData() {
    this.displayData$ = combineLatest([this.searchQuery$, this.bookmarks$, this.groupedBookmarks$]).pipe(
      map(([query, bookmarks, groups]) => {
        const isSearch = !!query?.length;

        const sections = isSearch
          ? [{ label: 'Search results', items: bookmarks }]
          : [
              { label: 'Today', items: groups?.today ?? [] },
              { label: 'Yesterday', items: groups?.yesterday ?? [] },
              { label: 'Older', items: groups?.older ?? [] },
            ];

        return {
          mode: isSearch ? 'search' : 'groups',
          sections,
          empty: isSearch && bookmarks.length === 0,
        };
      }),
    );
  }

  onSearch(query: string) {
    this.searchInput$.next(query);
  }

  addBookmark() {
    this.router.navigate(['/bookmarks/add']);
  }

  onBookmarkDeleted(id: string) {
    this.store.dispatch(deleteBookmark({ id }));
  }
}
