import { Component, OnInit } from '@angular/core';
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
import { map, take } from 'rxjs';
import { normalizeUrl } from '../../../shared/utils/normalize-url';

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
    this.patchForm();
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  private patchForm() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;

      this.store
        .select(selectAllBookmarks)
        .pipe(
          map((bookmarks) => bookmarks.find((bookmark) => bookmark.id === id) ?? null),
          take(1),
        )
        .subscribe((b) => {
          this.bookmark = b;

          if (b) {
            this.form.patchValue({
              name: b.name,
              url: b.url,
            });
          }
        });
    }
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    if (this.form.invalid) return;

    let payload: Bookmark;
    const normalizedUrl = normalizeUrl(this.form.value.url);

    if (this.isEdit && this.bookmark) {
      payload = {
        ...this.bookmark,
        name: this.form.value.name,
        url: normalizedUrl,
      };

      this.store.dispatch(updateBookmark({ bookmark: payload }));
    } else {
      payload = {
        id: crypto.randomUUID(),
        name: this.form.value.name,
        url: normalizedUrl,
        createdAt: Date.now(),
      };

      this.store.dispatch(addBookmark({ bookmark: payload }));
    }

    this.router.navigateByUrl('/');
  }
}
