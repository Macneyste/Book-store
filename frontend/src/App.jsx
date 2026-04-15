import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import BookDetailsPage from './pages/BookDetailsPage.jsx';
import HomePage from './pages/HomePage.jsx';

// App waa root component-ka ugu weyn ee frontend-ka.
// Halkan waxaa ku wada nool layout-ka guud iyo route-yada pages-ka.
function App() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      {/* main-kan wuxuu xaddidayaa ballaca page-ka si UI-gu u ahaado nadiif oo dhexe */}
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-8">
        {/* Navbar-ku wuxuu kasoo muuqanayaa dhammaan pages-ka */}
        <Navbar />

        {/* Routes-kan ayaa go'aaminaya page-ka la soo bandhigayo iyadoo lagu salaynayo URL-ka */}
        <Routes>
          {/* Home page-ka ugu weyn */}
          <Route path="/" element={<HomePage />} />

          {/* Page-ka lagu gelinayo book cusub */}
          <Route path="/add-book" element={<AddBookPage />} />

          {/* Page-ka lagu arko faahfaahinta hal book */}
          <Route path="/books/:id" element={<BookDetailsPage />} />

          {/* Haddii user-ku galo route aan jirin, home page ayaan dib ugu celinaynaa */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
