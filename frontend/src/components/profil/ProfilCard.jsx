import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/context';
import dayjs from 'dayjs';
import EditProfil from '../modals/EditProfil';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Profil = ({ user }) => {

    const { isModalEditOpen, setIsModalEditOpen } = useContext(AppContext);

    const formatDate = dayjs(user?.birth_date).format('DD/MM/YYYY');

    const handleClick = () => {
        setIsModalEditOpen(!isModalEditOpen);
    };

    useEffect(() => {
    }, [isModalEditOpen]);   

    return (
        <>
            <section className='container-profilCard flex flex-col w-80 bg-dark-black light-mode:bg-light light-mode:opacity-90 rounded-lg items-center shadow-md justify-start relative text-light light-mode:text-dark-black gap-2'>
                <div className="container-modify-icons cursor-pointer flex gap-1.5 justify-start w-full p-2" onClick={handleClick}>
                    <div className='w-2 h-2 bg-light light-mode:bg-dark-black rounded-full'></div>
                    <div className='w-2 h-2 bg-light light-mode:bg-dark-black rounded-full'></div>
                    <div className='w-2 h-2 bg-light light-mode:bg-dark-black rounded-full'></div>
                </div>
                { isModalEditOpen ? <EditProfil /> : null}
                <div className="container-img">
                    <img src={`${BASE_URL}${user?.profil_picture}`} alt='photo de profil' className='w-25 rounded-full shadow-2xs'/>
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
                        <h3>{user?.city_name}</h3>
                    </div>
                    <div className="container-adresse flex flex-col items-center">
                        <h4 className='text-sm text-gray-400'>Adresse</h4>
                        <h3>{user?.address}</h3>
                    </div>
                    <div className="container-theme flex flex-col items-center mb-1">
                        <h4 className='text-sm text-gray-400'>Thème</h4>
                        <h3>{user?.theme === 'dark' ? "Sombre" : "Clair"}</h3>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profil;