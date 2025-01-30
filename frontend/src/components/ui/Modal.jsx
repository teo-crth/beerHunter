import React, { useContext } from 'react';
import { AppContext } from '../../context/context';

import EditForm from '../modals/EditForm';
import EditPassword from '../modals/EditPassword';
import DeleteProfil from '../modals/DeleteProfil';
import MessageModal from '../modals/MessageModal';

const Modal = () => {
  const { closeModal, modalState } = useContext(AppContext);
  const type = modalState.type;  
  const isOpen = modalState.isOpen;
  const text = modalState.text;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0" onClick={closeModal}>
      <div className={`modal ${type} w-120  z-50 flex flex-col items-center justify-center text-center gap-0.5 shadow-xs shadow-primary bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5`} onClick={(e) => e.stopPropagation()}>
          { type === 'editUser' && <EditForm />}
          { type === 'editPassword' && <EditPassword />}
          { type === 'deleteProfil' && <DeleteProfil />}
          { type === 'errorMessage' || type === 'successMessage' ? <MessageModal text={text} type={type} onClose={closeModal} isOpen={isOpen} /> : null}
      </div>
    </div>
  );
};

export default Modal;