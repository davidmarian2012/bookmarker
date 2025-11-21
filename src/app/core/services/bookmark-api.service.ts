import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from '../models/bookmark.model';

@Injectable({ providedIn: 'root' })
export class BookmarkApiService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Bookmark[]>('http://localhost:3000/bookmarks');
  }

  add(bookmark: Bookmark) {
    return this.http.post<Bookmark>('http://localhost:3000/bookmarks', bookmark);
  }

  edit(bookmark: Bookmark) {
    return this.http.put<Bookmark>(`http://localhost:3000/bookmarks/${bookmark.id}`, bookmark);
  }

  delete(id: string) {
    return this.http.delete(`http://localhost:3000/bookmarks/${id}`);
  }
}
