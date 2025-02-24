import React, { useContext } from 'react';
import { AppContext } from '../../context/context';

import EditForm from '../modals/EditForm';
import EditPassword from '../modals/EditPassword';
import DeleteProfil from '../modals/DeleteProfil';
import DeleteComment from '../modals/DeleteComment';
import Connexion from '../modals/Connexion';
import Signup from '../modals/Signup';
import MessageModal from '../modals/MessageModal';
import AddComment from '../modals/AddComment';

const Modal = () => {
  const { closeModal, modalState } = useContext(AppContext);
  const type = modalState.type;
  const isOpen = modalState.isOpen;
  const text = modalState.text;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0 z-50" onClick={closeModal}>
      <div className={`modal ${type} w-[95%] md:w-120 lg:w-120 z-50 flex flex-col items-center justify-center text-center gap-0.5 shadow-xs shadow-primary bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5`} onClick={(e) => e.stopPropagation()}>
          { type === 'editUser' && <EditForm />}
          { type === 'editPassword' && <EditPassword />}
          { type === 'deleteProfil' && <DeleteProfil />}
          { type === 'deleteComment' && <DeleteComment text={text}/>}
          { type === 'login' && <Connexion />}
          { type === 'signup' && <Signup />}
          { type === 'addComment' && <AddComment />}
          { type === 'errorMessage' || type === 'successMessage' ? <MessageModal text={text} type={type} onClose={closeModal} isOpen={isOpen} /> : null}
      </div>
    </div>
  );
};

export default Modal;