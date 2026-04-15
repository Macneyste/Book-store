import Navbar from './components/Navbar.jsx';

const sampleStats = [
  { label: 'Total Books', value: '128' },
  { label: 'Available', value: '96' },
  { label: 'Borrowed', value: '32' },
];

const sampleBooks = [
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Self Development',
    status: 'Available',
  },
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    category: 'Productivity',
    status: 'Borrowed',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    category: 'Novel',
    status: 'Available',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-8">
        <Navbar />

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
          {sampleStats.map((item) => (
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
            <button className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
              Add New Book
            </button>
          </div>

          <div className="mt-6 grid gap-4">
            {sampleBooks.map((book) => (
              <article
                key={book.title}
                className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{book.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">Author: {book.author}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Category: {book.category}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                      book.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {book.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-600 sm:p-8"
        >
          Sample contact area for your next frontend section.
        </section>
      </main>
    </div>
  );
}

export default App;
