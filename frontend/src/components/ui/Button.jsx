import React from 'react';

const Button = ({text, onClick, type, className}) => {
    return (
        <button onClick={onClick} type={type} className={className + ' px-4 py-1 shadow-md hover:bg-primary-dark font-text font-bold text-light hover:text-light light-mode:hover:text-dark rounded-md cursor-pointer'}>
            {text}            
        </button>
    );
};

export default Button;