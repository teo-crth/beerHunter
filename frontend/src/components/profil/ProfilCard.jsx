import React from 'react';
import { AppContext } from '../../context/context';
import dayjs from 'dayjs';

const Profil = ({ user }) => {

    const formatDate = dayjs(user?.birth_date).format('DD/MM/YYYY');
    return (
        <div className='container-profilCard flex flex-col w-80 bg-dark-black rounded-lg items-center justify-start text-light gap-2'>
            <div className="container-modify-icons cursor-pointer flex gap-2 justify-start w-full p-2">
                <div className='w-2 h-2 bg-light rounded-full'></div>
                <div className='w-2 h-2 bg-light rounded-full'></div>
                <div className='w-2 h-2 bg-light rounded-full'></div>
            </div>
            <div className="container-img">
                <img src={user?.profil_picture ? user?.profil_picture : '/src/assets/default-profil-picture.webp'} alt='photo de profil' className='w-25 rounded-full shadow-2xs'/>
            </div>
            <div className="container-info flex flex-col items-center justify-start gap-2">
                <div className="container-name flex flex-col items-center">
                    <h2 >{user?.name}</h2>
                </div>
                <div className="container-email flex flex-col items-center">
                    <h4 className='text-sm text-gray-400'>Email</h4>
                    <h3>{user?.email}</h3>
                </div>
                <div className="container-birth_date flex flex-col items-center">
                    <h4 className='text-sm text-gray-400'>Date de naissance</h4>
                    <h3>{formatDate}</h3>
                </div>
                <div className="container-city flex flex-col items-center">
                    <h4 className='text-sm text-gray-400'>Ville</h4>
                    <h3>{user?.city}</h3>
                </div>
                <div className="container-adresse flex flex-col items-center">
                    <h4 className='text-sm text-gray-400'>Adresse</h4>
                    <h3>{user?.address}</h3>
                </div>
                <div className="container-theme flex flex-col items-center">
                    <h4 className='text-sm text-gray-400'>Thème</h4>
                    <h3>{user?.theme === 'dark' ? "Sombre" : "Clair"}</h3>
                </div>
            </div>
        </div>
    );
};

export default Profil;