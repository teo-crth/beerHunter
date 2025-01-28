import React from 'react';
import Button from '../ui/Button';

const MessageModal = ({ text, onClose, isOpen, type }) => {
    if (!isOpen) return null;
    
    return (
<div className="modal-overlay bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0" onClick={onClose}>
      <div className={`modal ${type}`}>
        <div className="modal-content">
          {type === "success" ? 
            <h2 className='font-title font-bold text-green-700'>{text}</h2>
             : <h2 className='font-title font-bold text-red-500'>{text}</h2>}
          <Button onClick={onClose} text="Fermer" className='bg-green-700 hover:bg-green-900' />
        </div>
      </div>
    </div>
    );
};

export default MessageModal;