import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import { AppContext } from '../context/context';

const NoFoundPage = () => {
    const navigate = useNavigate();
    const { menuOpen } = useContext(AppContext);

    const handleBackToHome = () => {
        navigate("/");
    }
    
    return (
        <>
            <div className='container-404 w-full h-screen flex flex-col justify-center items-center'>
                <h1 className='font-title font-bold text-4xl text-center text-light light-mode:text-dark-black mb-5'>Page introuvable</h1>
                <iframe src="https://giphy.com/embed/jU9OCvBiO1besabUKU" onClick={() => console.log("click")} className="rounded-2xl w-[95%] md:w-1/2 lg:w-1/2 xl:w-1/3 object-cover" allowFullScreen></iframe>
                <h2 className='font-title font-bold text-2xl text-center text-light light-mode:text-primary mb-5 mt-5'>Vous êtes perdu ? Félicitation vous êtes un.e aventurier.e !</h2>
                < Button onClick={() => handleBackToHome()} text="Retour à l'accueil" type="button" className="book-card-button bg-primary" />
            </div>
            <Modal />
            {menuOpen && (
                <BurgerMenu />
            )}
        </>
    );
};

export default NoFoundPage;