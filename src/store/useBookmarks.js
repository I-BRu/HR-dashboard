import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBookmarks = create(
  persist(
    (set) => ({
      bookmarks: [],
      addBookmark: (user) =>
        set((state) =>
          state.bookmarks.find((u) => u.id === user.id)
            ? state
            : { bookmarks: [...state.bookmarks, user] }
        ),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((u) => u.id !== id),
        })),
    }),
    {
      name: 'bookmarks-storage', // key in localStorage
    }
  )
);
