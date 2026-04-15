import { Link, NavLink } from 'react-router-dom';

function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-current"
    >
      <path d="M12 3.8 3 11.2V13h1.8v7.2h5.8v-4.9h2.8v4.9h5.8V13H21v-1.8L12 3.8Z" />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current stroke-[2]"
    >
      <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function Navbar() {
  const navLinkClassName = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-base font-medium transition ${
      isActive
        ? 'border-slate-900 bg-slate-900 text-white'
        : 'border-slate-300 bg-white/75 text-slate-900 hover:bg-white'
    }`;

  return (
    <header className="mb-8">
      <nav className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-slate-300 bg-[#d7dbe2]/80 px-6 py-3 shadow-sm backdrop-blur">
        <Link to="/" className="relative flex items-center">
          <span className="absolute left-[-14px] top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-yellow-200/35 blur-[1px]" />
          <span className="relative text-[2rem] font-black tracking-tight">
            <span className="text-teal-500">Book</span>
            <span className="text-slate-800">Store</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <NavLink to="/" end className={navLinkClassName}>
            <HomeIcon />
            <span>Home</span>
          </NavLink>

          <NavLink to="/add-book" className={navLinkClassName}>
            <AddIcon />
            <span>Add Book</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
