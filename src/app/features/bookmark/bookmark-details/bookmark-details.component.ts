import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookmarkFormComponent } from '../bookmark-form/bookmark-form.component';
import { Bookmark } from '../../../core/models/bookmark.model';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class BookmarkDetailsComponent implements OnInit {
  @Input() bookmark: Bookmark | null = null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {}

  openEditDialog() {
    const dialogRef = this.dialog.open(BookmarkFormComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.bookmark = this.bookmark;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated values:', result);
        this.router.navigate(['/bookmark-list']);
      }
    });
  }
}
