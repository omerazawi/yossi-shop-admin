import React, { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: () => {} });

  const showConfirmDialog = (message, onConfirm) => {
    setConfirmDialog({ isOpen: true, message, onConfirm });
  };

  const showNotification = (msg, isSuccess = true) => {
    setNotification({ msg, isSuccess });
    setTimeout(() => setNotification(null), 2500);
  };

  const values = {
    isLoading,
    setIsLoading,
    status,
    setStatus,
    message,
    setMessage,
    showConfirmDialog,
    confirmDialog,
    setConfirmDialog,
    showNotification,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};