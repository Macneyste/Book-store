import { useEffect, useState } from 'react';

const emptyFormData = {
  title: '',
  author: '',
  description: '',
  language: '',
  price: '',
  cover_image_url: '',
};

// Helper-kan wuxuu ka sameeyaa state diyaar u ah form-ka iyadoo laga duulayo book-ga la edit-gareynayo.
function createFormState(book) {
  if (!book) {
    return emptyFormData;
  }

  return {
    title: book.title ?? '',
    author: book.author ?? '',
    description: book.description ?? '',
    language: book.language ?? '',
    price: book.price ?? '',
    cover_image_url: book.cover_image_url ?? '',
  };
}

// UpdateBookModal-kan wuxuu user-ka siinayaa form muuqaal fiican leh
// si uu book jira ugu sameeyo wax-ka-beddel isagoo aan page-ka ka bixin.
function UpdateBookModal({
  isOpen,
  book,
  isUpdating,
  errorMessage,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState(emptyFormData);
  const [validationError, setValidationError] = useState('');

  // Marka modal-ka furmo ama book-ga la beddelo, form-ka waxaan ku shubaynaa xogta book-gaas.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData(createFormState(book));
    setValidationError('');
  }, [book, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const previewTitle = formData.title.trim() || 'Updated book title';
  const previewAuthor = formData.author.trim() || 'Author name';
  const previewPrice = formData.price || '20';
  const previewImage = formData.cover_image_url.trim();

  // handleChange-kan wuxuu update gareeyaa input kasta oo user-ku beddelo.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  // validateForm-kan wuxuu xaqiijiyaa in fields-ka muhiimka ahi madhnaan.
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

  // submit-kan wuxuu form data-ga cusub u diraa component-ka kore si API request-ka loo sameeyo.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formError = validateForm();

    if (formError) {
      setValidationError(formError);
      return;
    }

    setValidationError('');

    const result = await onSubmit(book._id, {
      title: formData.title.trim(),
      author: formData.author.trim(),
      description: formData.description.trim(),
      language: formData.language.trim(),
      price: formData.price,
      cover_image_url: formData.cover_image_url.trim(),
    });

    if (result?.success) {
      onClose();
    }
  };

  if (!isOpen || !book) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/45 px-4 py-8">
      {/* Backdrop-kan wuxuu user-ka siinayaa meel uu ka xiro modal-ka */}
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Qaybtan bidix waxaa yaal form-ka, midigtana live preview-ga */}
      <div className="relative mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-900/15 sm:p-8">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                Update Book
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Edit Existing Book
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-stone-50 hover:text-slate-700"
            >
              <span className="sr-only">Close update modal</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current stroke-[2]"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
            {validationError || errorMessage ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:col-span-2">
                {validationError || errorMessage}
              </div>
            ) : null}

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Title
              <input
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Author
              <input
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Description
              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Language
              <input
                name="language"
                type="text"
                value={formData.language}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Price
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Cover Image URL
              <input
                name="cover_image_url"
                type="url"
                value={formData.cover_image_url}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 pt-2 sm:col-span-2">
              <button
                type="submit"
                disabled={isUpdating}
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isUpdating ? 'Updating...' : 'Update Book'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isUpdating}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-stone-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-900/15 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
              Live Preview
            </p>
            <h3 className="mt-2 text-2xl font-black text-slate-900">
              Updated Book Card
            </h3>

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
                    <h4 className="mt-5 text-3xl font-black leading-none text-orange-300">
                      UPDATE
                    </h4>
                    <p className="mt-2 text-base font-semibold text-slate-200">
                      {previewAuthor}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3 rounded-[1.5rem] border border-slate-200 bg-stone-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Title
                  </p>
                  <h4 className="mt-2 text-2xl font-black text-slate-900">
                    {previewTitle}
                  </h4>
                </div>
                <div className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                  ${previewPrice}
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Author: <span className="font-semibold text-slate-800">{previewAuthor}</span>
              </p>
              <p className="text-sm text-slate-600">
                Language: <span className="font-semibold text-slate-800">{formData.language || 'N/A'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookModal;
