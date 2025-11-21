import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../../../core/models/bookmark.model';
import { BookmarkApiService } from '../../../core/services/bookmark-api.service';
import { BookmarkDetailsComponent } from '../bookmark-details/bookmark-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookmarkFormComponent } from '../bookmark-form/bookmark-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
  standalone: true,
  imports: [CommonModule, BookmarkDetailsComponent, MatIconModule, MatButtonModule],
})
export class BookmarkListComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(
    private bookmarkApiService: BookmarkApiService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    this.bookmarkApiService.loadBookmarks().subscribe((data) => {
      this.bookmarks = data;
    });
  }

  addBookmark() {
    const dialogRef = this.dialog.open(BookmarkFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newBookmark = {
          id: Date.now(),
          name: result.name,
          url: result.url,
          createdAt: 1,
        };

        this.bookmarks.push(newBookmark);
      }
    });
  }
}
