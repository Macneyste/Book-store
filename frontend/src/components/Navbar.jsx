const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Books', href: '#books' },
  { label: 'Stats', href: '#stats' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  return (
    <header className="mb-8">
      <nav className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white/90 px-5 py-4 shadow-lg shadow-slate-200/60 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
              BS
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                BSMS
              </p>
              <h2 className="text-lg font-bold text-slate-900">Library Frontend</h2>
            </div>
          </a>

          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 sm:hidden">
            Menu
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:bg-stone-100 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
            Add Book
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
