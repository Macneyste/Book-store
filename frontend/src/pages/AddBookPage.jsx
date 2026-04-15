import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookStore from '../store/useBookStore.js';

const publishingTips = [
  'Ku qor cinwaan gaaban oo si cad u qeexaya magaca buugga.',
  'Hubi in image URL-ku yahay link toos ah oo ku dhammaan kara sawir.',
  'Description-ku ha noqdo mid kooban laakiin sharxaya waxa buuggu ka hadlayo.',
];

const initialFormData = {
  title: '',
  author: '',
  description: '',
  language: '',
  price: '',
  cover_image_url: '',
};

// AddBookPage waa page-ka loogu talagalay in user-ku ku buuxiyo form
// si uu u abuuro book cusub. Halkan waxaan diiradda saarnay design muuqaal
// ahaan ka nadiifsan, si page-ku u ekaado form dhab ah oo admin isticmaali karo.
function AddBookPage() {
  const navigate = useNavigate();
  const createBook = useBookStore((state) => state.createBook);
  const isCreating = useBookStore((state) => state.isCreating);
  const createError = useBookStore((state) => state.createError);
  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState('');

  // Function-kan wuxuu maamulaa isbeddel kasta oo ka yimaada inputs-ka form-ka.
  // Waxa uu keydiyaa xogta cusub ee user-ku galinayo si preview-gu isla markiiba u cusboonaado.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // Function-kan wuxuu hubiyaa in fields-ka muhiimka ahi buuxaan kahor inta request la dirin.
  const validateForm = () => {
    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.description.trim() ||
      !formData.language.trim() ||
      !formData.price
    ) {
      return 'Please fill in title, author, description, language, and price.';
    }

    return '';
  };

  // submit-kan wuxuu backend-ka u diraa book-ga cusub.
  // Haddii request-ku guuleysto, user-ka waxaa dib loogu celinayaa Home page-ka.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formError = validateForm();

    if (formError) {
      setValidationError(formError);
      return;
    }

    setValidationError('');

    const result = await createBook({
      title: formData.title.trim(),
      author: formData.author.trim(),
      description: formData.description.trim(),
      language: formData.language.trim(),
      price: formData.price,
      cover_image_url: formData.cover_image_url.trim(),
    });

    if (result.success) {
      setFormData(initialFormData);
      navigate('/');
    }
  };

  const previewTitle = formData.title.trim() || 'Your next featured book';
  const previewAuthor = formData.author.trim() || 'Add author name here';
  const previewPrice = formData.price || '20';
  const previewImage = formData.cover_image_url.trim();

  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      {/* Qaybtan bidix waxay xambaarsan tahay header-ka iyo form-ka book-ga cusub */}
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#111827_0%,_#1f2937_55%,_#7c2d12_100%)] px-6 py-8 text-white shadow-2xl sm:px-8">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">
            Add Book
          </p>
          <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
            Design cusub oo loogu talagalay gelinta buug cusub.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Ku buuxi xogta book-ga, geli sawirka cover-ka, kadibna sii gudub
            si aad ugu darto liiska Book Store-kaaga. Qaybtan waxaa loo habeeyay
            si admin-ku si degdeg ah oo nadiif ah uga shaqeyn karo.
          </p>
        </div>

        {/* Card-kan waa form-ka ugu weyn ee xogta book-ga lagu gelinayo */}
        <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                Book Details
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Create New Book
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Fields-ka calaamadsan waa kuwa ugu muhiimsan.
            </p>
          </div>

          {/* Form-kan wuxuu soo ururinayaa xogta muhiimka ah ee book cusub */}
          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* Haddii validation ama backend error dhaco, fariin cad ayaan user-ka tusineynaa */}
            {validationError || createError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:col-span-2">
                {validationError || createError}
              </div>
            ) : null}

            {/* Field-ka title */}
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Title
              <input
                name="title"
                type="text"
                placeholder="Atomic Habits"
                value={formData.title}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            {/* Field-ka author */}
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Author
              <input
                name="author"
                type="text"
                placeholder="James Clear"
                value={formData.author}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            {/* Description-ka wuxuu qaadanayaa text dheer, sidaas darteed textarea ayaan adeegsanay */}
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Description
              <textarea
                name="description"
                rows="5"
                placeholder="Ku qor sharaxaad kooban oo ku saabsan buugga..."
                value={formData.description}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            {/* Field-ka language */}
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Language
              <input
                name="language"
                type="text"
                placeholder="English"
                value={formData.language}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            {/* Field-ka price */}
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Price
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="20"
                value={formData.price}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            {/* Field-kan waa meesha aad ka gelin karto link-ga sawirka book-ga */}
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Cover Image URL
              <input
                name="cover_image_url"
                type="url"
                placeholder="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80"
                value={formData.cover_image_url}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            {/* Action buttons-kan waa kuwa hoose ee form-ka */}
            <div className="flex flex-wrap items-center gap-3 pt-2 sm:col-span-2">
              <button
                type="submit"
                disabled={isCreating}
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {isCreating ? 'Saving...' : 'Save Book'}
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-stone-50"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Qaybtan midig waxay soo bandhigaysaa preview iyo talooyin si page-ku u dareemo mid buuxa */}
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/70 sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                Live Preview
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Book Cover Preview
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Preview
            </span>
          </div>

          <div className="mt-6 rounded-[1.6rem] bg-[linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] p-6">
            {previewImage ? (
              <img
                src={previewImage}
                alt={previewTitle}
                className="mx-auto h-72 w-48 rounded-[1rem] object-cover shadow-[12px_0_0_#d6d3d1,22px_0_0_#f4f4f5]"
              />
            ) : (
              <div className="mx-auto flex h-72 w-48 items-center justify-center rounded-[1rem] bg-[#1f2937] shadow-[12px_0_0_#d6d3d1,22px_0_0_#f4f4f5]">
                <div className="px-5 text-center">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Book Store
                  </p>
                  <h3 className="mt-5 text-3xl font-black leading-none text-orange-300">
                    NEW
                  </h3>
                  <p className="mt-3 text-lg font-bold text-sky-300">BOOK</p>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Title:</span> {previewTitle}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Author:</span> {previewAuthor}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Price:</span> ${previewPrice}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#fff7ed] p-6 shadow-lg shadow-orange-100/70 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
            Publishing Tips
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Kahor intaadan save-gareyn
          </h2>

          <div className="mt-5 space-y-3">
            {publishingTips.map((tip) => (
              <div
                key={tip}
                className="rounded-2xl border border-orange-200 bg-white/80 px-4 py-3 text-sm leading-7 text-slate-700"
              >
                {tip}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-900 px-4 py-4 text-sm leading-7 text-slate-200">
            <p className="font-semibold text-white">Sample cover URL</p>
            <p className="mt-2 break-all text-orange-200">
              https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddBookPage;
