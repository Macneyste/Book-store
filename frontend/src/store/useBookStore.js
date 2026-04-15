import { create } from 'zustand';

// Store-kan waa meesha dhexe ee frontend-ku ka maamulayo xogta books-ka.
// Halkii page walba state u gaar ah ka samaysan lahaa, halkan ayaan ku haynaynaa
// books-ka, loading-ka, error-ka, iyo function-ka xogta keenaya.
const useBookStore = create((set) => ({
  // books: liiska buugaagta ee API-ga kasoo laabanaya.
  books: [],

  // isLoading: wuxuu sheegaa in request-ku wali socdo iyo in kale.
  isLoading: false,

  // isCreating: wuxuu sheegaa in POST request-ka abuurista book-ga uu socdo iyo in kale.
  isCreating: false,

  // error: fariinta qaladka haddii request-ku fashilmo.
  error: '',

  // createError: qaladka gaarka u ah abuurista book-ga cusub.
  createError: '',

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
      }));

      return { success: true, book: data };
    } catch (error) {
      const message = error.message || 'Something went wrong while creating the book';
      set({ createError: message, isCreating: false });
      return { success: false, error: message };
    }
  },
}));

export default useBookStore;
