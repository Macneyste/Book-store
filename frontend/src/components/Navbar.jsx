import { Link, NavLink } from 'react-router-dom';

// Icon-kan yar wuxuu u taagan yahay Home button-ka navbar-ka.
// Waxaan u samaynay SVG si aan icon dibadda uga import-gareyn.
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

// Icon-kan wuxuu u taagan yahay Add Book button-ka.
// Waxaa loo sameeyay qaab plus-sign ah si uu user-ka ugu iftiimiyo action-ka abuurista.
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

// Navbar-kan waa qaybta kore ee app-ka.
// Wuxuu hayaa magaca BookStore iyo navigation-ka pages-ka muhiimka ah.
function Navbar() {
  // Function-kan wuxuu go'aamiyaa style-ka link kasta iyadoo la eegayo
  // haddii route-kaas hadda la joogo iyo in kale. Taasi waxay ka dhigaysaa
  // button-ka active-ka ah inuu si muuqata uga duwanaado kuwa kale.
  const navLinkClassName = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-base font-medium transition ${
      isActive
        ? 'border-slate-900 bg-slate-900 text-white'
        : 'border-slate-300 bg-white/75 text-slate-900 hover:bg-white'
    }`;

  return (
    <header className="mb-8">
      {/* nav-kan waa wrapper-ka menu-ga oo dhan */}
      <nav className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-slate-300 bg-[#d7dbe2]/80 px-6 py-3 shadow-sm backdrop-blur">
        {/* Magaca bidix ee BookStore marka la taabto wuxuu user-ka geeynayaa home route-ka */}
        <Link to="/" className="relative flex items-center">
          {/* Circle-ka huruudka ahi waa accent yar oo design-ka qurxinaya */}
          <span className="absolute left-[-14px] top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-yellow-200/35 blur-[1px]" />
          <span className="relative text-[2rem] font-black tracking-tight">
            <span className="text-teal-500">Book</span>
            <span className="text-slate-800">Store</span>
          </span>
        </Link>

        {/* Qaybtan midig waxaa yaal navigation buttons-ka muhiimka ah */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Home route */}
          <NavLink to="/" end className={navLinkClassName}>
            <HomeIcon />
            <span>Home</span>
          </NavLink>

          {/* Add Book route */}
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
