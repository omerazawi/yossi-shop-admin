import React, { useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import './PopUp.css';

export default function PopUp() {
  const {
    setMessage,
    message,
    status,
    setConfirmDialog,
    confirmDialog
  } = useContext(GlobalContext);

  if (!message && !confirmDialog.isOpen) return null;

  return (
    <div className='pop-up'>
      <div className="status">
        <div className="status-img">
          {!confirmDialog.isOpen && <img src={status === "success" ? "/good.png" : "/error.png"} width={100} alt="Status" />}
        </div>
        <div className="message">
          <p>{confirmDialog.isOpen ? confirmDialog.message : message}</p>
        </div>
        {confirmDialog.isOpen ? (
          <div className="pop-buttons">
            <button 
              className="confirm-btn"
              onClick={() => {
                confirmDialog.onConfirm();
                setConfirmDialog({ isOpen: false, message: '', onConfirm: () => {} });
              }}>
              אישור
            </button>
            <button 
              className="cancel-btn"
              onClick={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: () => {} })}>
              ביטול
            </button>
          </div>
        ) : (
          <div className="pop-buttons">
          <button className="cancel-btn" onClick={() => setMessage("")}>סגירה</button>
          </div>
        )}
      </div>
    </div>
  );
}
