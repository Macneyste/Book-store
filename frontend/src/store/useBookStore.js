import { create } from 'zustand';

// Store-kan waa meesha dhexe ee frontend-ku ka maamulayo xogta books-ka.
// Halkii page walba state u gaar ah ka samaysan lahaa, halkan ayaan ku haynaynaa
// books-ka, loading-ka, error-ka, iyo function-ka xogta keenaya.
const useBookStore = create((set) => ({
  // books: liiska buugaagta ee API-ga kasoo laabanaya.
  books: [],

  // activeBook: book-ga hadda detail ahaan ama edit ahaan loo isticmaalayo.
  activeBook: null,

  // isLoading: wuxuu sheegaa in request-ku wali socdo iyo in kale.
  isLoading: false,

  // isFetchingBook: wuxuu sheegaa in hal book detail-kiisa la soo qaadayo.
  isFetchingBook: false,

  // isCreating: wuxuu sheegaa in POST request-ka abuurista book-ga uu socdo iyo in kale.
  isCreating: false,

  // isUpdating: wuxuu sheegaa in PUT request-ka update-ku socdo iyo in kale.
  isUpdating: false,

  // isDeleting: wuxuu sheegaa in DELETE request-ka tirtiriddu socoto iyo in kale.
  isDeleting: false,

  // error: fariinta qaladka haddii request-ku fashilmo.
  error: '',

  // detailError: qaladka gaar u ah helidda hal book.
  detailError: '',

  // createError: qaladka gaarka u ah abuurista book-ga cusub.
  createError: '',

  // updateError: qaladka gaar u ah update-ga.
  updateError: '',

  // deleteError: qaladka gaar u ah delete-ga.
  deleteError: '',

  // setActiveBook: function-kan wuxuu store-ka ku dhigaa book la doortay.
  setActiveBook: (book) => {
    set({ activeBook: book ?? null });
  },

  // clearBookActionErrors: wuxuu nadiifiyaa qaladaadka actions-ka si modal/dialog
  // cusub loogu furo state nadiif ah.
  clearBookActionErrors: () => {
    set({
      createError: '',
      updateError: '',
      deleteError: '',
      detailError: '',
    });
  },

  // fetchBooks: function-kan wuxuu kasoo qaadaa books-ka backend API-ga.
  // signal-ka waxaa loo isticmaalaa in request-ka la joojiyo marka component-ku
  // unmount noqdo si console-ka uga yaraado errors-ka aan muhiimka ahayn.
  fetchBooks: async (signal) => {
    try {
      // Marka fetch-ku bilaabanayo, waxaan shidnay loading-ka, qaladkiina nadiifinay.
      set({ isLoading: true, error: '' });

      const response = await fetch('/api/books', { signal });

      // Haddii server-ku response xun celiyo, qalad gaar ah ayaan tuuraynaa.
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      // Halkan waxaan u badaleynaa response-ka JSON si aan u helno books-ka dhabta ah.
      const data = await response.json();

      // Marka xogtu timaado, store-ka waxaan ku shubaynaa books-ka cusub.
      set({ books: data, isLoading: false });
    } catch (error) {
      // AbortError waa qalad caadi ah oo yimaada marka request la joojiyo,
      // sidaas darteed ma rabno inuu user-ka u muuqdo sida qalad dhab ah.
      if (error.name === 'AbortError') {
        set({ isLoading: false });
        return;
      }

      // Haddii qalad dhab ahi dhaco, fariin cad ayaan store-ka ku kaydinaynaa.
      set({
        error: error.message || 'Something went wrong while fetching books',
        isLoading: false,
      });
    }
  },

  // fetchBookById: function-kan wuxuu keenayaa hal book detail-kiisa.
  // Waxaa loo isticmaalaa page-ka details-ka ama marka user-ku si toos ah URL u furo.
  fetchBookById: async (id, signal) => {
    try {
      set({ isFetchingBook: true, detailError: '' });

      const response = await fetch(`/api/books/${id}`, { signal });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch book details');
      }

      set((state) => {
        const existingIndex = state.books.findIndex((book) => book._id === data._id);
        const nextBooks =
          existingIndex >= 0
            ? state.books.map((book) => (book._id === data._id ? data : book))
            : [data, ...state.books];

        return {
          books: nextBooks,
          activeBook: data,
          isFetchingBook: false,
        };
      });

      return { success: true, book: data };
    } catch (error) {
      if (error.name === 'AbortError') {
        set({ isFetchingBook: false });
        return { success: false, aborted: true };
      }

      const message = error.message || 'Something went wrong while fetching the book';
      set({ detailError: message, isFetchingBook: false });
      return { success: false, error: message };
    }
  },

  // createBook: function-kan wuxuu backend-ka ugu diraa book cusub si database-ka loogu kaydiyo.
  // Marka uu guuleysto, book-ga cusub si toos ah ayuu ugu daraa liiska books-ka store-ka ku jira.
  createBook: async (bookData) => {
    try {
      set({ isCreating: true, createError: '' });

      const payload = {
        ...bookData,
        price: Number(bookData.price),
        cover_image_url: bookData.cover_image_url?.trim() || undefined,
      };

      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create book');
      }

      set((state) => ({
        books: [data, ...state.books],
        isCreating: false,
        activeBook: data,
      }));

      return { success: true, book: data };
    } catch (error) {
      const message = error.message || 'Something went wrong while creating the book';
      set({ createError: message, isCreating: false });
      return { success: false, error: message };
    }
  },

  // updateBook: function-kan wuxuu book jira ku sameeyaa wax-ka-beddel.
  // Haddii request-ku guuleysto, liiska books-ka iyo activeBook labadaba waa la cusboonaysiiyaa.
  updateBook: async (id, bookData) => {
    try {
      set({ isUpdating: true, updateError: '' });

      const payload = {
        ...bookData,
        price: Number(bookData.price),
        cover_image_url: bookData.cover_image_url?.trim() || undefined,
      };

      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update book');
      }

      set((state) => ({
        books: state.books.map((book) => (book._id === data._id ? data : book)),
        activeBook: state.activeBook?._id === data._id ? data : state.activeBook,
        isUpdating: false,
      }));

      return { success: true, book: data };
    } catch (error) {
      const message = error.message || 'Something went wrong while updating the book';
      set({ updateError: message, isUpdating: false });
      return { success: false, error: message };
    }
  },

  // deleteBook: function-kan wuxuu tirtiraa hal book.
  // Marka uu guuleysto, book-ga waxa laga saarayaa liiska si UI-gu isla markiiba isu beddelo.
  deleteBook: async (id) => {
    try {
      set({ isDeleting: true, deleteError: '' });

      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete book');
      }

      set((state) => ({
        books: state.books.filter((book) => book._id !== id),
        activeBook: state.activeBook?._id === id ? null : state.activeBook,
        isDeleting: false,
      }));

      return { success: true, message: data.message };
    } catch (error) {
      const message = error.message || 'Something went wrong while deleting the book';
      set({ deleteError: message, isDeleting: false });
      return { success: false, error: message };
    }
  },
}));

export default useBookStore;
