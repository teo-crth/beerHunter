import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/context';

const EditProfil = () => {

    const { toggleModal,
        isModalChangeProfilOpen,
        setIsModalChangeProfilOpen,
        isModalDeleteProfilOpen,
        setIsModalDeleteProfilOpen, 
        isModalEditPasswordProfilOpen,
        setIsModalEditPasswordProfilOpen
    } = useContext(AppContext);

    const handleCloseClick = () => {
        toggleModal();
    };

    const handleChangeClick = () => {
        setIsModalChangeProfilOpen(!isModalChangeProfilOpen);
    };

    const handleDeleteClick = () => {
        setIsModalDeleteProfilOpen(!isModalDeleteProfilOpen);
    };

    const handleChangePasswordClick = () => {
        setIsModalEditPasswordProfilOpen(!isModalEditPasswordProfilOpen);
    };

    return (
        <div className='absolute top-5 -mt-5 left-0 w-full h-full bg-dark-black/85 shadow-md light-mode:bg-light text-light light-mode:text-dark-black rounded-lg flex flex-col items-center justify-center gap-2'>
            <div className="container-close-icon absolute top-5 right-5 rounded-full border p-2 w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-primary" onClick={handleCloseClick}><p className='text-light light-mode:text-dark-black'>X</p></div>
            <p className='font-text font-bold cursor-pointer' onClick={handleChangeClick}>Modifier les informations</p>
            <p className='font-text font-bold cursor-pointer' onClick={handleChangePasswordClick}>Modifier votre mot de passe</p>
            <p className='font-text font-bold cursor-pointer' onClick={handleDeleteClick}>Supprimer votre compte</p>
        </div>
    );
};

export default EditProfil;