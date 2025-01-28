import React, { useContext } from 'react';
import { AppContext } from '../../context/context';

import EditForm from '../modals/EditForm';
import EditPassword from '../modals/EditPassword';
import DeleteProfil from '../modals/DeleteProfil';
import MessageModal from '@components/modals/MessageModal';

const Modal = () => {
  const { closeModal, modalState } = useContext(AppContext);
  const { isOpen, type, text } = modalState;
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0" onClick={closeModal}>
      <div className={`modal ${type}`} onClick={(e) => e.stopPropagation()}>
          { type === 'editUser' && <EditForm />}
          { type === 'editPassword' && <EditPassword />}
          { type === 'deleteProfil' && <DeleteProfil />}
          { type === 'errorMessage' || 'successMessage' && <MessageModal text={text} type={type} />}
      </div>
    </div>
  );
};

export default Modal;