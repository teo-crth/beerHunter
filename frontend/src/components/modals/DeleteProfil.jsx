import React, { useContext} from 'react';
import { AppContext } from '../../context/context';
import Button from '../ui/Button';

const ValidationDeleteProfil = () => {

    const { user, toggleModal, isModalDeleteProfilOpen, setIsModalDeleteProfilOpen } = useContext(AppContext);

    const handleClick = () => {
        setIsModalDeleteProfilOpen(!isModalDeleteProfilOpen);
    };

    const handleDeleteClick = () => {
        deleteOneUser(user.id);
        console.log('Profil supprimé');
        setIsModalDeleteProfilOpen(!isModalDeleteProfilOpen);
        toggleModal();

        window.location.href = '/';
    };

    return (
        <div className="container-modal bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0">
            <div className='flex flex-col items-center justify-center text-center gap-2 shadow-md bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
                <p>Êtes-vous sûr de vouloir supprimer votre profil ?</p>
                <div className="container-buttons flex gap-3 justify-center items-center">
                    <Button onClick={handleDeleteClick} className='bg-red-700' text="Supprimer" />
                    <Button onClick={handleClick} className='bg-primary' text="Annuler"/>
                </div>
            </div>
        </div>
    );
};

export default ValidationDeleteProfil;