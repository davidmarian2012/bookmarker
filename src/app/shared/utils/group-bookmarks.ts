import { Bookmark } from '../../core/models/bookmark.model';

export function groupBookmarks(bookmarks: Bookmark[]) {
  const groups = {
    today: [] as Bookmark[],
    yesterday: [] as Bookmark[],
    older: [] as Bookmark[],
  };
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  for (const bookmark of bookmarks) {
    const date = new Date(bookmark.createdAt);

    if (date >= today) groups.today.push(bookmark);
    else if (date >= yesterday) groups.yesterday.push(bookmark);
    else groups.older.push(bookmark);
  }

  return groups;
}
