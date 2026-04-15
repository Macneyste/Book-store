// BookCard component-kan wuxuu qaabilsan yahay inuu soo bandhigo
// hal book oo keliya, isagoo qaata xogta book-ga via props.
// Tani waxay ka dhigaysaa HomePage mid ka nadiifsan oo card-ka books-kana
// meel gaar ah looga maamulo.
function BookCard({ book }) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
      {/* Qaybtan waxay muujinaysaa xogta ugu muhiimsan ee book-ga */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{book.title}</h3>
          <p className="mt-1 text-sm text-slate-600">Author: {book.author}</p>
          <p className="mt-1 text-sm text-slate-600">Language: {book.language}</p>
          <p className="mt-1 text-sm text-slate-600">Price: ${book.price}</p>
        </div>

        {/* Status-kan hadda sample ahaan wuxuu muujinayaa Available */}
        <span className="inline-flex w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          Available
        </span>
      </div>
    </article>
  );
}

export default BookCard;
