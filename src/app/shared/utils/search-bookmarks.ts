import Fuse from 'fuse.js';
import { Bookmark } from '../../core/models/bookmark.model';

let lastBookmarksRef: Bookmark[] = [];
let fuse: Fuse<Bookmark> | null = null;

export function searchBookmarks(bookmarks: Bookmark[], query: string): Bookmark[] {
  if (!query.trim()) return bookmarks;

  if (bookmarks !== lastBookmarksRef) {
    lastBookmarksRef = bookmarks;
    fuse = new Fuse(bookmarks, {
      keys: ['name', 'url'],
      threshold: 0.4,
      ignoreLocation: true,
    });
  }

  return fuse!.search(query).map((result) => result.item);
}
