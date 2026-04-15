import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard.jsx';
import ConfirmationDialog from '../components/ConfirmationDialog.jsx';
import UpdateBookModal from '../components/UpdateBookModal.jsx';
import useBookStore from '../store/useBookStore.js';

// HomePage waa page-ka ugu weyn ee user-ku arko marka uu galo app-ka.
// Waxay soo bandhigaysaa books-ka backend-ka laga keenay, stats kooban,
// iyo qaybo sample ah oo muujinaya sida dashboard-ku u shaqayn karo.
function HomePage() {
  const navigate = useNavigate();

  // Zustand selectors-kan waxay store-ka ka soo saarayaan qaybo yar oo aan u baahannahay.
  // Habkan wuxuu ka dhigaa component-ka mid nadiif ah oo state-ka si dhexe uga isticmaala.
  const books = useBookStore((state) => state.books);
  const isLoading = useBookStore((state) => state.isLoading);
  const isUpdating = useBookStore((state) => state.isUpdating);
  const isDeleting = useBookStore((state) => state.isDeleting);
  const error = useBookStore((state) => state.error);
  const updateError = useBookStore((state) => state.updateError);
  const deleteError = useBookStore((state) => state.deleteError);
  const fetchBooks = useBookStore((state) => state.fetchBooks);
  const updateBook = useBookStore((state) => state.updateBook);
  const deleteBook = useBookStore((state) => state.deleteBook);
  const setActiveBook = useBookStore((state) => state.setActiveBook);
  const clearBookActionErrors = useBookStore((state) => state.clearBookActionErrors);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);

  // useEffect-kan wuxuu shaqeeyaa marka page-ku furmo.
  // Ujeeddadiisu waa inuu API-ga ka soo qaado books-ka oo store-ka ku shubo.
  useEffect(() => {
    // AbortController wuxuu naga caawinayaa joojinta request-ka haddii page-ku xirmo
    // ka hor inta response-ku soo laaban, taasoo yareyneysa warnings-ka console-ka.
    const controller = new AbortController();
    fetchBooks(controller.signal);

    // Cleanup-kan wuxuu joojinayaa request-ka marka component-ku unmount noqdo.
    return () => {
      controller.abort();
    };
  }, [fetchBooks]);

  // Stats-kan waxaa si toos ah looga xisaabinayaa books-ka store-ka ku jira.
  // Hadda sample ahaan waxaan borrowedBooks uga dhignay 0 maadaama backend-ku
  // wali uusan bixin field muujinaysa buug amaah ku maqan.
  const totalBooks = books.length;
  const availableBooks = books.length;
  const borrowedBooks = 0;
  const stats = [
    { label: 'Total Books', value: totalBooks },
    { label: 'Available', value: availableBooks },
    { label: 'Borrowed', value: borrowedBooks },
  ];

  // Handler-kan wuxuu user-ka geeynayaa page-ka details-ka isagoo store-ka
  // ku sii dhigaya book-ga la doortay si transition-ku u noqdo mid jilicsan.
  const handleViewDetails = (book) => {
    setActiveBook(book);
    navigate(`/books/${book._id}`);
  };

  // Edit button-ka marka la taabto, modal-ka update-ga ayaan furnaa.
  const handleOpenEditModal = (book) => {
    clearBookActionErrors();
    setBookToEdit(book);
  };

  // Close-kan wuxuu xirayaa modal-ka update-ga.
  const handleCloseEditModal = () => {
    if (isUpdating) {
      return;
    }

    setBookToEdit(null);
    clearBookActionErrors();
  };

  // Delete button-ka marka la taabto, confirmation dialog-ka ayaan furnaa.
  const handleOpenDeleteDialog = (book) => {
    clearBookActionErrors();
    setBookToDelete(book);
  };

  // Close-kan wuxuu xiraa confirmation dialog-ka marka delete-ku aanu socon.
  const handleCloseDeleteDialog = () => {
    if (isDeleting) {
      return;
    }

    setBookToDelete(null);
    clearBookActionErrors();
  };

  // Function-kan wuxuu dhammaystirayaa delete functionality-ga adigoo
  // marka hore helaya xaqiijinta user-ka kadibna API-ga wacaya.
  const handleConfirmDelete = async () => {
    if (!bookToDelete) {
      return;
    }

    const result = await deleteBook(bookToDelete._id);

    if (result.success) {
      setBookToDelete(null);
    }
  };

  // Function-kan wuxuu update modal-ka ka helaa data cusub, kadib store-ka ayuu u diraa.
  const handleUpdateBook = async (bookId, bookData) => {
    const result = await updateBook(bookId, bookData);

    if (result.success) {
      setBookToEdit(null);
    }

    return result;
  };

  return (
    <>
      {/* Qaybtan sare waa hero section-ka page-ka oo sharxaya app-ka */}
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

      {/* Qaybtan waxay soo bandhigaysaa stats kooban oo laga sameeyay books-ka jira */}
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

      {/* Qaybtan waa meesha books-ka backend-ka laga keenay lagu taxayo */}
      <section
        id="books"
        className="mt-8 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8"
      >
        {/* Header-ka qaybta books-ka */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
              Sample Books
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Recent Book Records
            </h2>
          </div>

          {/* Button-kan wuxuu user-ka u diraa page-ka lagu darayo book cusub */}
          <Link
            to="/add-book"
            className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Add New Book
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Marka request-ku socdo, fariin loading ah ayaan muujineynaa */}
          {isLoading ? (
            <article className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5 text-sm text-slate-600">
              Loading books...
            </article>
          ) : null}

          {/* Haddii fetch-ku qalad galo, fariin qalad ah ayaan soo bandhigaynaa */}
          {!isLoading && error ? (
            <article className="rounded-[1.5rem] border border-red-200 bg-red-50 p-5 text-sm text-red-600">
              {error}
            </article>
          ) : null}

          {/* Haddii API-gu shaqeeyo laakiin books la waayo, fariin madhan ayaan muujineynaa */}
          {!isLoading && !error && books.length === 0 ? (
            <article className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5 text-sm text-slate-600">
              No books found in the database.
            </article>
          ) : null}

          {/* Haddii books jiraan, mid walba card gooni ah ayaan uga sameyneynaa */}
          {!isLoading && !error
            ? books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onViewDetails={handleViewDetails}
                  onEdit={handleOpenEditModal}
                  onDelete={handleOpenDeleteDialog}
                />
              ))
            : null}
        </div>
      </section>

      {/* Qaybtan hoose waa placeholder loogu talagalay section kale oo mustaqbalka lagu dari karo */}
      <section
        id="contact"
        className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-6 text-center text-sm text-slate-600 sm:p-8"
      >
        Sample contact area for your next frontend section.
      </section>

      {/* Confirmation dialog-kan wuxuu dhammaystirayaa delete flow-ga */}
      <ConfirmationDialog
        isOpen={Boolean(bookToDelete)}
        title="Delete this book?"
        message={
          bookToDelete
            ? `Ma hubtaa inaad tirtirayso "${bookToDelete.title}"? Marka la tirtiro dib looma soo celin karo.`
            : ''
        }
        confirmLabel="Delete Book"
        isConfirming={isDeleting}
        errorMessage={deleteError}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteDialog}
      />

      {/* Modal-kan wuxuu qabtaa design-ka iyo functionality-ga update-ga */}
      <UpdateBookModal
        isOpen={Boolean(bookToEdit)}
        book={bookToEdit}
        isUpdating={isUpdating}
        errorMessage={updateError}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateBook}
      />
    </>
  );
}

export default HomePage;
