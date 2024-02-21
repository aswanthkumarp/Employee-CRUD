import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 export const Toast = () => {
  return (
    <>
      <ToastContainer />
    </>
  );
};

export const showToast = (message, type = 'success', options = {}) => {
  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'warning':
      toast.warn(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};


