import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/context';
import Button from '../ui/Button';

const MessageModal = ({text, onClose, isOpen, type}) => {
  const { openModal } = useContext(AppContext);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (text.includes('Inscription réussie, connectez-vous !')) return setIsSignup(true);
  }, [text]);

  return (
    <div className="modal-content ">
      {type === "successMessage" ? 
        <h2 className='font-title font-bold text-green-700 m-3 text-xl'>{text}</h2>
        : <h2 className='font-title font-bold text-red-500 m-3 text-xl'>{text}</h2>
      }
      <div className="container-buttons flex justify-center items-center gap-5 w-full sm:flex-col md:flex-col lg:flex-row xl:flex-row">
        { isSignup && <Button onClick={() => openModal('login')} text="Se connecter" className='bg-primary hover:bg-secondary' />}
        <Button onClick={onClose} text="Fermer" className='bg-primary hover:bg-secondary' />
      </div>
    </div>
  );
};

export default MessageModal;