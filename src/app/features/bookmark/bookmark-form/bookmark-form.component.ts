import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Bookmark } from '../../../core/models/bookmark.model';
import { BookmarkApiService } from '../../../core/services/bookmark-api.service';

@Component({
  selector: 'app-bookmark-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss'],
})
export class BookmarkFormComponent implements OnInit {
  @Input() bookmark: Bookmark | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookmarkFormComponent>,
    private bookmarkApiService: BookmarkApiService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [this.bookmark?.name ?? '', Validators.required],
      url: [this.bookmark?.url ?? '', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    if (this.bookmark) {
      this.dialogRef.close({
        id: this.bookmark.id,
        name: this.form.value.name,
        url: this.form.value.url,
      });
    } else {
      this.dialogRef.close({
        name: this.form.value.name,
        url: this.form.value.url,
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
