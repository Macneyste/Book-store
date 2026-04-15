function MoreIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="8.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
    >
      <path d="M4 20h4l10.4-10.4a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current stroke-[1.8]"
    >
      <path d="M4 7h16" />
      <path d="M9 4h6" />
      <path d="M7.5 7 8.2 20h7.6L16.5 7" />
    </svg>
  );
}

function formatDate(dateValue) {
  if (!dateValue) {
    return 'N/A';
  }

  return new Date(dateValue).toISOString();
}

// BookCard component-kan wuxuu books-ka frontend-ka uga dhigaa muuqaal card ah
// oo la mid ah sample-ka aad rabtay: sawir kore, xogta book-ga bartamaha, iyo actions hoose.
function BookCard({ book, onViewDetails, onEdit, onDelete }) {
  const uploadedAt = formatDate(book.createdAt);
  const updatedAt = formatDate(book.updatedAt);

  return (
    <article className="overflow-hidden rounded-[1.35rem] border border-indigo-100 bg-[#f7f8ff] p-4 shadow-sm">
      <div className="rounded-[1.2rem] bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-6">
        {book.cover_image_url ? (
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="mx-auto h-64 w-auto rounded-md object-contain"
          />
        ) : (
          <div className="mx-auto flex h-64 w-40 items-center justify-center rounded-[0.7rem] bg-[#202124] shadow-[10px_0_0_#d5d5d5,18px_0_0_#efefef]">
            <div className="px-4 text-center">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Book Store
              </p>
              <h3 className="mt-4 text-3xl font-black leading-none text-lime-300">
                BOOK
              </h3>
              <p className="mt-2 text-lg font-bold text-sky-300">CARD</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 border-b border-indigo-100 pb-3">
        <div className="flex items-start justify-between gap-4 text-[1.05rem] font-bold text-indigo-800">
          <p className="leading-8">
            <span className="mr-2">Title:</span>
            {book.title}
          </p>
          <p className="shrink-0 leading-8">
            <span className="mr-2">Price:</span>
            {book.price}
          </p>
        </div>
      </div>

      <div className="space-y-2 py-3 font-mono text-[0.95rem] text-indigo-800">
        <p>Author:{book.author}</p>
        <p>Language:{book.language}</p>
        <p>Uploaded:{uploadedAt}</p>
        <p>Updated:{updatedAt}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-t border-indigo-100 pt-3 text-[0.95rem] text-rose-700">
        <button
          type="button"
          onClick={() => onViewDetails(book)}
          className="inline-flex items-center gap-2 transition hover:text-rose-800"
        >
          <MoreIcon />
          <span>More</span>
        </button>

        <button
          type="button"
          onClick={() => onEdit(book)}
          className="inline-flex items-center gap-2 transition hover:text-rose-800"
        >
          <EditIcon />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(book)}
          className="inline-flex items-center gap-2 transition hover:text-rose-800"
        >
          <DeleteIcon />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}

export default BookCard;
