import React, { useContext} from 'react';
import { AppContext } from '../../context/context';

const ValidationDeleteProfil = () => {

    const { toggleModal } = useContext(AppContext);

    const handleClick = () => {
        toggleModal();
    };

    return (
        <div className="container-modal bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0">
            <div className='flex flex-col items-center justify-center gap-2 shadow-md bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
                <p>Êtes-vous sûr de vouloir supprimer votre profil ?</p>
                <button className='p-3 font-bold font-text rounded-md'>Supprimer</button>
                <button onClick={handleClick} className='font-bold font-text p-3 rounded-md'>Annuler</button>
            </div>
        </div>
    );
};

export default ValidationDeleteProfil;