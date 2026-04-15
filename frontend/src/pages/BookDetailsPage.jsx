import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ConfirmationDialog from '../components/ConfirmationDialog.jsx';
import UpdateBookModal from '../components/UpdateBookModal.jsx';
import useBookStore from '../store/useBookStore.js';

// Helper-kan wuxuu taariikhda details page-ka uga dhigaa qaab saaxiibtinimo leh.
function formatDate(dateValue) {
  if (!dateValue) {
    return 'N/A';
  }

  return new Date(dateValue).toLocaleString();
}

// BookDetailsPage-kan wuxuu soo bandhigayaa hal book oo faahfaahsan.
// Waxaa laga soo galayaa More button-ka card-ka.
function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const books = useBookStore((state) => state.books);
  const activeBook = useBookStore((state) => state.activeBook);
  const isFetchingBook = useBookStore((state) => state.isFetchingBook);
  const isUpdating = useBookStore((state) => state.isUpdating);
  const isDeleting = useBookStore((state) => state.isDeleting);
  const detailError = useBookStore((state) => state.detailError);
  const updateError = useBookStore((state) => state.updateError);
  const deleteError = useBookStore((state) => state.deleteError);
  const fetchBookById = useBookStore((state) => state.fetchBookById);
  const setActiveBook = useBookStore((state) => state.setActiveBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const deleteBook = useBookStore((state) => state.deleteBook);
  const clearBookActionErrors = useBookStore((state) => state.clearBookActionErrors);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // selectedBook-kan wuxuu marka hore ka eegaa list-ka store-ka ku jira,
  // haddii aan laga helinna activeBook-ka ayuu isticmaalayaa.
  const bookFromList = books.find((item) => item._id === id);
  const selectedBook = bookFromList ?? (activeBook?._id === id ? activeBook : null);

  // useEffect-kan wuxuu xaqiijiyaa in page-ku helo book-ga saxda ah,
  // xitaa haddii user-ku si toos ah URL uga soo galo browser-ka.
  useEffect(() => {
    if (bookFromList) {
      const shouldSyncActiveBook =
        !activeBook ||
        activeBook._id !== bookFromList._id ||
        activeBook.updatedAt !== bookFromList.updatedAt;

      if (shouldSyncActiveBook) {
        setActiveBook(bookFromList);
      }

      return undefined;
    }

    const controller = new AbortController();
    fetchBookById(id, controller.signal);

    return () => {
      controller.abort();
    };
  }, [id, bookFromList, activeBook, fetchBookById, setActiveBook]);

  // Handler-kan wuxuu furayaa modal-ka update-ga marka details page-ka laga joogo.
  const handleOpenEditModal = () => {
    if (!selectedBook) {
      return;
    }

    clearBookActionErrors();
    setBookToEdit(selectedBook);
  };

  const handleCloseEditModal = () => {
    if (isUpdating) {
      return;
    }

    setBookToEdit(null);
    clearBookActionErrors();
  };

  const handleUpdateBook = async (bookId, bookData) => {
    const result = await updateBook(bookId, bookData);

    if (result.success) {
      setActiveBook(result.book);
      setBookToEdit(null);
    }

    return result;
  };

  // Dialog-kan wuxuu xaqiijinayaa kahor inta book-ga la tirtirin.
  const handleOpenDeleteDialog = () => {
    clearBookActionErrors();
    setShowDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) {
      return;
    }

    setShowDeleteDialog(false);
    clearBookActionErrors();
  };

  const handleConfirmDelete = async () => {
    if (!selectedBook) {
      return;
    }

    const result = await deleteBook(selectedBook._id);

    if (result.success) {
      navigate('/');
    }
  };

  if (isFetchingBook && !selectedBook) {
    return (
      <section className="rounded-[2rem] bg-white p-8 text-sm text-slate-600 shadow-lg shadow-slate-200/70">
        Loading book details...
      </section>
    );
  }

  if (detailError && !selectedBook) {
    return (
      <section className="rounded-[2rem] border border-red-200 bg-red-50 p-8 shadow-lg shadow-red-100/70">
        <p className="text-sm font-semibold text-red-600">{detailError}</p>
        <Link
          to="/"
          className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  if (!selectedBook) {
    return (
      <section className="rounded-[2rem] bg-white p-8 shadow-lg shadow-slate-200/70">
        <h1 className="text-2xl font-black text-slate-900">Book not found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Book-ga aad raadineyso lama helin. Waxaa laga yaabaa in la tirtiro ama link-gu qaldan yahay.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Hero section-kan sare wuxuu soo bandhigayaa cinwaanka book-ga iyo actions-ka ugu muhiimsan */}
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#111827_0%,_#1f2937_55%,_#7c2d12_100%)] px-6 py-8 text-white shadow-2xl sm:px-8">
        <Link
          to="/"
          className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-200 transition hover:bg-white/15"
        >
          Back to Home
        </Link>
        <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
          {selectedBook.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          Faahfaahinta buuggan waxaad ka arki kartaa page-kan, waxaana sidoo kale laga sameyn karaa
          update ama delete adigoon dib ugu noqon liiska books-ka.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleOpenEditModal}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-orange-50"
          >
            Edit Book
          </button>
          <button
            type="button"
            onClick={handleOpenDeleteDialog}
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Delete Book
          </button>
        </div>
      </section>

      {/* Qaybtan hoose bidix waxaa yaal cover-ka, midigtana faahfaahinta buuxda ee book-ga */}
      <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
          <div className="rounded-[1.6rem] bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-6">
            {selectedBook.cover_image_url ? (
              <img
                src={selectedBook.cover_image_url}
                alt={selectedBook.title}
                className="mx-auto h-80 w-56 rounded-[1rem] object-cover shadow-[12px_0_0_#d6d3d1,22px_0_0_#f4f4f5]"
              />
            ) : (
              <div className="mx-auto flex h-80 w-56 items-center justify-center rounded-[1rem] bg-[#1f2937] shadow-[12px_0_0_#d6d3d1,22px_0_0_#f4f4f5]">
                <div className="px-5 text-center">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Book Store
                  </p>
                  <h2 className="mt-5 text-3xl font-black leading-none text-orange-300">
                    DETAILS
                  </h2>
                  <p className="mt-2 text-base font-semibold text-slate-200">
                    {selectedBook.author}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Price
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">${selectedBook.price}</h2>
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
              Book Information
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              Detailed Overview
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Title
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900">{selectedBook.title}</p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Author
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900">{selectedBook.author}</p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Language
                </p>
                <p className="mt-3 text-lg font-bold text-slate-900">{selectedBook.language}</p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Uploaded
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {formatDate(selectedBook.createdAt)}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
              Description
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">
              About This Book
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
              {selectedBook.description}
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Last Updated
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-700">
                {formatDate(selectedBook.updatedAt)}
              </p>
            </div>
          </article>
        </div>
      </section>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        title="Delete this book?"
        message={`Ma hubtaa inaad tirtirayso "${selectedBook.title}"? Markii la tirtiro dib looma soo celin karo.`}
        confirmLabel="Delete Book"
        isConfirming={isDeleting}
        errorMessage={deleteError}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteDialog}
      />

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

export default BookDetailsPage;
