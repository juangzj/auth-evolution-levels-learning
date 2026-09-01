interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const styles = {
    success: "border-green-500 bg-green-50 text-green-800",
    error: "border-red-500 bg-red-50 text-red-800",
    info: "border-blue-500 bg-blue-50 text-blue-800",
    warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
  };

  return (
    <div
      className={`flex w-80 items-start justify-between rounded-lg border-l-4 p-4 shadow-lg ${styles[type]}`}
    >
      <p className="text-sm font-medium">{message}</p>

      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
    </div>
  );
}
