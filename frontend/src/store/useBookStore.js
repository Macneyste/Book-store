import { create } from 'zustand';

const useBookStore = create((set) => ({
  books: [],
  isLoading: false,
  error: '',
  fetchBooks: async (signal) => {
    try {
      set({ isLoading: true, error: '' });

      const response = await fetch('/api/books', { signal });

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      set({ books: data, isLoading: false });
    } catch (error) {
      if (error.name === 'AbortError') {
        set({ isLoading: false });
        return;
      }

      set({
        error: error.message || 'Something went wrong while fetching books',
        isLoading: false,
      });
    }
  },
}));

export default useBookStore;
