import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../../core/models/bookmark.model';
import { BookmarkApiService } from '../../../core/services/bookmark-api.service';
import { BookmarkDetailsComponent } from '../bookmark-details/bookmark-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BookmarkFormComponent } from '../bookmark-form/bookmark-form.component';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  selectAllBookmarks,
  selectGroupedBookmarks,
  selectLoading,
  selectSearchQuery,
} from '../../../state/bookmarks/bookmarks.selectors';
import { Observable } from 'rxjs';
import {
  addBookmark,
  deleteBookmark,
  loadBookmarks,
  setSearchQuery,
  updateBookmark,
} from '../../../state/bookmarks/bookmarks.actions';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

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
export class BookmarkListComponent implements OnInit {
  bookmarks$!: Observable<Bookmark[]>;
  loading$!: Observable<boolean>;
  groupedBookmarks$!: Observable<any>;
  searchQuery$!: Observable<any>;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit() {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
    this.loading$ = this.store.select(selectLoading);
    this.groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
    this.searchQuery$ = this.store.select(selectSearchQuery);

    this.store.dispatch(loadBookmarks());
  }

  onSearch(query: string) {
    this.store.dispatch(setSearchQuery({ query }));
  }

  addBookmark() {
    this.router.navigate(['/bookmarks/add']);
  }

  onBookmarkUpdated(updated: Bookmark) {
    if (updated) {
      this.store.dispatch(updateBookmark({ bookmark: updated }));
    }
  }

  onBookmarkDeleted(id: string) {
    this.store.dispatch(deleteBookmark({ id }));
  }
}
