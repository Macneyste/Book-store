import { create } from 'zustand';

// Store-kan waa meesha dhexe ee frontend-ku ka maamulayo xogta books-ka.
// Halkii page walba state u gaar ah ka samaysan lahaa, halkan ayaan ku haynaynaa
// books-ka, loading-ka, error-ka, iyo function-ka xogta keenaya.
const useBookStore = create((set) => ({
  // books: liiska buugaagta ee API-ga kasoo laabanaya.
  books: [],

  // isLoading: wuxuu sheegaa in request-ku wali socdo iyo in kale.
  isLoading: false,

  // error: fariinta qaladka haddii request-ku fashilmo.
  error: '',

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
}));

export default useBookStore;
