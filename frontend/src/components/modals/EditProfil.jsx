import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/context';
import Button from '../ui/Button';

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
            <Button className='bg-primary hover:bg-secondary' onClick={handleChangeClick} text="Modifier vos informations" />
            <Button className='bg-primary hover:bg-secondary' onClick={handleChangePasswordClick} text="Modifier votre mot de passe" />
            <Button className='bg-red-600 hover:bg-red-800' onClick={handleDeleteClick} text="Supprimer votre compte" />
        </div>
    );
};

export default EditProfil;