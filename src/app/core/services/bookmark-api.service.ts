import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from '../models/bookmark.model';

@Injectable({ providedIn: 'root' })
export class BookmarkApiService {
  private readonly url = 'http://localhost:3000/bookmarks';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Bookmark[]>(this.url);
  }

  add(bookmark: Bookmark) {
    return this.http.post<Bookmark>(this.url, bookmark);
  }

  update(bookmark: Bookmark) {
    return this.http.put<Bookmark>(this.url + '/' + bookmark.id, bookmark);
  }

  delete(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}
