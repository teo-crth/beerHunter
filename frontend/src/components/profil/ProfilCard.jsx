import React from 'react';
import { AppContext } from '../../context/context';

const Profil = ({ user }) => {
    return (
        <div className='container-profilCard flex flex-col'>
            <div className="container-modify-icons cursor-pointer flex gap-2 justify-start">
                <div className='w-2 h-2 bg-light rounded-full'></div>
                <div className='w-2 h-2 bg-light rounded-full'></div>
                <div className='w-2 h-2 bg-light rounded-full'></div>
            </div>
            <div className="container-img">
                <img src={user.profil_picture ? user.profil_picture : '../../assets/default-profil-picture.webp'} alt='photo de profil' className='w-full rounded-full shadow-2xs'/>
            </div>
            <h2>{user.name}</h2>
            <h2>profil nom</h2>
        </div>
    );
};

export default Profil;