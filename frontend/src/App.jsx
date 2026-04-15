import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-stone-100 text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 sm:px-8">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
