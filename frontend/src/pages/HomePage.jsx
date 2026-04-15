import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBookStore from '../store/useBookStore.js';

function HomePage() {
  const books = useBookStore((state) => state.books);
  const isLoading = useBookStore((state) => state.isLoading);
  const error = useBookStore((state) => state.error);
  const fetchBooks = useBookStore((state) => state.fetchBooks);

  useEffect(() => {
    const controller = new AbortController();
    fetchBooks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchBooks]);

  const totalBooks = books.length;
  const availableBooks = books.length;
  const borrowedBooks = 0;
  const stats = [
    { label: 'Total Books', value: totalBooks },
    { label: 'Available', value: availableBooks },
    { label: 'Borrowed', value: borrowedBooks },
  ];

  return (
    <>
      <section className="rounded-[2rem] bg-slate-900 px-6 py-8 text-white shadow-2xl sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
          Sample Example
        </p>
        <h1 className="mt-4 bg-gradient-to-r from-orange-300 via-amber-100 to-white bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
          Book Store
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
          Tani waa sample page fudud oo aad ka sii bilaabi karto frontend-kaaga.
          Waxay ku tusaysaa stats, sample books, iyo qaab nadiif ah oo aad sii
          ballaarin karto.
        </p>
      </section>

      <section id="stats" className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.5rem] bg-white p-6 shadow-lg shadow-slate-200/70"
          >
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{item.value}</h2>
          </article>
        ))}
      </section>

      <section
        id="books"
        className="mt-8 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
              Sample Books
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Recent Book Records
            </h2>
          </div>
          <Link
            to="/add-book"
            className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Add New Book
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {isLoading ? (
            <article className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5 text-sm text-slate-600">
              Loading books...
            </article>
          ) : null}

          {!isLoading && error ? (
            <article className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm text-red-600">
              {error}
            </article>
          ) : null}

          {!isLoading && !error && books.length === 0 ? (
            <article className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5 text-sm text-slate-600">
              No books found in the database.
            </article>
          ) : null}

          {!isLoading && !error
            ? books.map((book) => (
                <article
                  key={book._id}
                  className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{book.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">Author: {book.author}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Language: {book.language}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Price: ${book.price}
                      </p>
                    </div>

                    <span className="inline-flex w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                      Available
                    </span>
                  </div>
                </article>
              ))
            : null}
        </div>
      </section>

      <section
        id="contact"
        className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-600 sm:p-8"
      >
        Sample contact area for your next frontend section.
      </section>
    </>
  );
}

export default HomePage;
