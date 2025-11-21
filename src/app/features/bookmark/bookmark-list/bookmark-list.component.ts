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
import { selectAllBookmarks, selectLoading } from '../../../state/bookmarks/bookmarks.selectors';
import { Observable } from 'rxjs';
import { addBookmark, deleteBookmark, loadBookmarks, updateBookmark } from '../../../state/bookmarks/bookmarks.actions';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  standalone: true,
  imports: [CommonModule, BookmarkDetailsComponent, MatIconModule, MatButtonModule],
})
export class BookmarkListComponent implements OnInit {
  bookmarks$!: Observable<Bookmark[]>;
  loading$!: Observable<boolean>;

  constructor(
    private store: Store,
    private dialogService: MatDialog,
  ) {}

  ngOnInit() {
    this.bookmarks$ = this.store.select(selectAllBookmarks);
    this.loading$ = this.store.select(selectLoading);

    this.store.dispatch(loadBookmarks());
  }

  addBookmark() {
    const dialogRef = this.dialogService.open(BookmarkFormComponent);

    dialogRef.afterClosed().subscribe((bookmark) => {
      this.store.dispatch(addBookmark({ bookmark }));
    });
  }

  onBookmarkUpdated(updated: Bookmark) {
    this.store.dispatch(updateBookmark({ bookmark: updated }));
  }

  onBookmarkDeleted(id: string) {
    this.store.dispatch(deleteBookmark({ id }));
  }
}
