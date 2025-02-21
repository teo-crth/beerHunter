import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router';

const NoFoundPage = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    }
    return (
        <>
            <Header />
            <div className='container-404 w-full h-screen flex flex-col justify-center items-center'>
                <h1 className='font-title font-bold text-4xl text-center text-light light-mode:text-dark-black mb-5'>Page introuvable</h1>
                <iframe src="https://giphy.com/embed/jU9OCvBiO1besabUKU" width="480" height="269" frameBorder="0" className="giphy-embed rounded-2xl" allowFullScreen></iframe>
                <h2 className='font-title font-bold text-2xl text-center text-light light-mode:text-primary mb-5 mt-5'>Vous êtes perdu ? Félicitation vous êtes un aventurier !</h2>
                < Button onClick={() => handleBackToHome()} text="Retour à l'accueil" type="button" className="book-card-button bg-primary" />
            </div>
            <Footer />
        </>
    );
};

export default NoFoundPage;