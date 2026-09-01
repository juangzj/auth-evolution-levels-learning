import { useState } from "react";

import { NotificationContext } from "./notifications.context";

import { ToastContainer } from "../components/toast/ToastContainer";

interface ToastData {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string, type: ToastData["type"]) => {
    const id = Date.now();

    setToasts((previousToasts) => [
      ...previousToasts,
      {
        id,
        message,
        type,
      },
    ]);

    setTimeout(() => {
      setToasts((previousToasts) =>
        previousToasts.filter((toast) => toast.id !== id),
      );
    }, 4000);
  };

  const showSuccess = (message: string) => {
    showToast(message, "success");
  };

  const showError = (message: string) => {
    showToast(message, "error");
  };

  const showInfo = (message: string) => {
    showToast(message, "info");
  };

  const showWarning = (message: string) => {
    showToast(message, "warning");
  };

  const removeToast = (id: number) => {
    setToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id !== id),
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        showSuccess,
        showError,
        showInfo,
        showWarning,
      }}
    >
      {children}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </NotificationContext.Provider>
  );
}
