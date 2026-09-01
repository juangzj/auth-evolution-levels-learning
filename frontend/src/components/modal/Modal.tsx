import type { ModalProps } from "./modal-props.types";

export const Modal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

        <p className="mt-2 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-md border px-4 py-2">
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
