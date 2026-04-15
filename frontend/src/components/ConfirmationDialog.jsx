import { useEffect } from 'react';

// ConfirmationDialog-kan wuxuu user-ka ka codsanayaa xaqiijin kahor
// inta aanan samayn action halis yar leh sida delete.
function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  isConfirming = false,
  errorMessage = '',
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    // Escape key-ga wuxuu user-ka siinayaa waddo degdeg ah oo uu modal-ka ku xiro.
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6">
      {/* Backdrop-kan marka la taabto wuxuu xiraa dialog-ka */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Box-kan dhexe waa meesha fariinta iyo buttons-ku kasoo muuqdaan */}
      <div className="relative w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-900/15 sm:p-7">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-700">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-none stroke-current stroke-[1.8]"
          >
            <path d="M12 8v5" />
            <path d="M12 16.2h.01" />
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>

        <h2 className="mt-5 text-2xl font-black text-slate-900">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">{message}</p>

        {errorMessage ? (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isConfirming}
            onClick={onConfirm}
            className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
          >
            {isConfirming ? 'Please wait...' : confirmLabel}
          </button>
          <button
            type="button"
            disabled={isConfirming}
            onClick={onClose}
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-stone-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
