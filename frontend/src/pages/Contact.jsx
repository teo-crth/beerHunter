import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
    const [state, handleSubmit] = useForm("xanqjakq");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    if (state.succeeded) {
        return (
            <div className="container-contact flex flex-col items-center justify-center w-full light-mode:bg-amber-100 p-5 min-h-[calc(100vh-159px)]">
                <div className="container-messageContact border bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg shadow-md p-5 flex flex-col items-center justify-center w-80">
                    <p className='font-title font-bold text-2xl text-center p-5 text-green-600'>Email envoyé !</p>
                    <Button text="Retour à l'accueil" className='bg-primary hover:bg-secondary' onClick={handleClick} />
                </div>
            </div>           
        );
    }

    return (
        <div className='container-contact min-h-[calc(100vh-159px)] flex flex-col items-center justify-start w-full light-mode:bg-light p-5'>
            <h1 className='font-title font-bold text-2xl mb-5 text-light light-mode:text-dark-black'>NOUS CONTACTER</h1>
            <ContactForm handleSubmit={handleSubmit} state={state}/>
            <Modal />
        </div>
    );
};

export default Contact;
