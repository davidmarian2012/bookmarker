import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from '../models/bookmark.model';

@Injectable({ providedIn: 'root' })
export class BookmarkApiService {
  constructor(private http: HttpClient) {}

  loadBookmarks() {
    return this.http.get<Bookmark[]>('bookmarks.json');
  }
}
