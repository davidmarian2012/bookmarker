import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Bookmark } from '../../../core/models/bookmark.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class BookmarkDetailsComponent implements OnInit {
  @Input() bookmark: Bookmark | null = null;
  @Output() updated = new EventEmitter<Bookmark>();
  @Output() deleted = new EventEmitter<string>();

  constructor(
    private router: Router,
    private dialogService: MatDialog,
  ) {}

  ngOnInit() {}

  openUrl() {
    if (!this.bookmark?.url) return;

    let url = this.bookmark.url.trim();

    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    window.open(url, '_blank');
  }

  openEdit() {
    this.router.navigate(['/bookmarks/edit', this.bookmark?.id]);
  }

  confirmDelete() {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      width: '350px',
      autoFocus: false,
      restoreFocus: false,
      data: {
        title: 'Delete Bookmark',
        message: `Are you sure you want to delete "${this.bookmark?.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleted.emit(this.bookmark?.id);
      }
    });
  }
}
