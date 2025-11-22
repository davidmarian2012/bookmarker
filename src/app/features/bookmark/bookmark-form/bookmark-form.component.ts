import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Bookmark } from '../../../core/models/bookmark.model';
import { addBookmark, updateBookmark } from '../../../state/bookmarks/bookmarks.actions';
import { selectAllBookmarks } from '../../../state/bookmarks/bookmarks.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-bookmark-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent implements OnInit {
  form!: FormGroup;
  bookmark: Bookmark | null = null;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;

      this.store
        .select(selectAllBookmarks)
        .pipe(map((bks) => bks.find((b) => b.id === id) ?? null))
        .subscribe((bm) => {
          this.bookmark = bm;

          if (bm) {
            this.form.patchValue({
              name: bm.name,
              url: bm.url,
            });
          }
        });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/.*)?$/i)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    let payload: Bookmark;

    if (this.isEdit && this.bookmark) {
      payload = {
        ...this.bookmark,
        name: this.form.value.name,
        url: this.form.value.url,
      };

      this.store.dispatch(updateBookmark({ bookmark: payload }));
    } else {
      payload = {
        id: crypto.randomUUID(),
        name: this.form.value.name,
        url: this.form.value.url,
        createdAt: Date.now(),
      };

      this.store.dispatch(addBookmark({ bookmark: payload }));
    }

    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
