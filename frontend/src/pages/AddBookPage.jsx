// AddBookPage waa page-ka loogu talagalay in user-ku ku buuxiyo form
// si uu u abuuro book cusub. Hadda waa sample UI diyaar u ah in mustaqbalka
// lagu xiro POST request ama Zustand action.
function AddBookPage() {
  return (
    // Section-kan guud wuxuu xambaarsan yahay card-ka form-ka oo dhan.
    <section className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
      {/* Header-kan wuxuu sharxayaa ujeeddada page-kan */}
      <div className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
          Add Book
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Create New Book</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Tani waa sample page aad ku dari karto form-ka buugaagta cusub.
          Hadda waa navigation demo si React Router kuuugu shaqeeyo si sax ah.
        </p>
      </div>

      {/* Form-kan wuxuu soo ururinayaa xogta muhiimka ah ee book cusub */}
      <form className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Field-ka title */}
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Title
          <input
            type="text"
            placeholder="Enter book title"
            className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-orange-400"
          />
        </label>

        {/* Field-ka author */}
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Author
          <input
            type="text"
            placeholder="Enter author name"
            className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-orange-400"
          />
        </label>

        {/* Description-ka wuxuu qaadanayaa text dheer, sidaas darteed textarea ayaan adeegsanay */}
        <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
          Description
          <textarea
            rows="4"
            placeholder="Enter short description"
            className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-orange-400"
          />
        </label>

        {/* Field-ka language */}
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Language
          <input
            type="text"
            placeholder="English"
            className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-orange-400"
          />
        </label>

        {/* Field-ka price */}
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Price
          <input
            type="number"
            placeholder="20"
            className="rounded-xl border border-slate-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-orange-400"
          />
        </label>

        {/* Button-kan mustaqbalka waxaa lagu xiri karaa submit handler */}
        <div className="sm:col-span-2">
          <button
            type="button"
            className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Save Book
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddBookPage;
