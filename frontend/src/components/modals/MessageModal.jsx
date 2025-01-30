import React from 'react';
import Button from '../ui/Button';

const MessageModal = ({text, onClose, isOpen, type}) => {
    // if (!isOpen) return null;
    
    return (
        <div className="modal-content">
          {type === "successMessage" ? 
            <h2 className='font-title font-bold text-green-700 m-3 text-xl'>{text}</h2>
             : <h2 className='font-title font-bold text-red-500 m-3 text-xl'>{text}</h2>}
          <Button onClick={onClose} text="Fermer" className='bg-primary hover:bg-secondary' />
        </div>
    );
};

export default MessageModal;