interface AlertProps {
  type: "success" | "error";
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  const styles = {
    success: "border-green-200 bg-green-50 text-green-700",
    error: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div
      role="alert"
      className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}
    >
      {message}
    </div>
  );
}
