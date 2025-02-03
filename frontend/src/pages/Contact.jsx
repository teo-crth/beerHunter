import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Button from '../components/ui/Button';

const Contact = () => {
    const [state, handleSubmit] = useForm("xanqjakq");

    const handleClick = () => {
        window.location.href = '/';
    };

    if (state.succeeded) {
        return (
            <div className="container-contact flex flex-col items-center justify-center w-full light-mode:bg-amber-100 p-5 h-full">
                <div className="container-messageContact border bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg shadow-md p-5 flex flex-col items-center justify-center w-80">
                    <p className='font-title font-bold text-2xl text-center p-5 text-green-600'>Email envoyé !</p>
                    <Button text="Retour à l'accueil" className='bg-primary hover:bg-secondary' onClick={handleClick} />
                </div>
            </div>           
        );
    }

    return (
        <div className='container-contact min-h-dvh flex flex-col items-center justify-start w-full light-mode:bg-light p-5 h-full'>
            <h1 className='font-title font-bold text-2xl mb-5 text-light light-mode:text-dark-black'>Nous contacter</h1>
            <form onSubmit={handleSubmit} className='container-form w-full md:w-1/2 lg:w-1/3 min-h-100 flex flex-col items-start justify-between text-center gap-0.5 shadow-md bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
                <h3 className='font-text font-bold text-xl text-center w-full'>Formulaire de contact</h3>
                
                <label className="mt-[5px]" htmlFor="email">Email</label>
                <input
                    placeholder='ILoveBiere@gmail.com'
                    id="email"
                    type="email"
                    name="email"
                    className='pl-2 border border-light light-mode:border-dark-black rounded-md'
                    required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />

                <label className="mt-[5px]" htmlFor="objet">Objet du message</label>
                <input
                    id="objet"
                    type="text"
                    placeholder='Je veux plus de bière dans ma vie'
                    name="objet"
                    className='pl-2 border border-light light-mode:border-dark-black rounded-md w-full'
                    required
                />
                <ValidationError prefix="Objet" field="objet" errors={state.errors} />

                <label className="mt-[5px]" htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="C'est ici qu'il faut nous déclarer votre flamme"
                    className='min-h-30 pl-2 border border-light light-mode:border-dark-black rounded-md w-full'
                    required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />

                <div className="container-buttons flex gap-3 justify-center items-center mt-[15px] w-full">
                    <Button type='submit' disabled={state.submitting} className='bg-primary hover:bg-secondary' text="Envoyer" />
                </div>
            </form>
        </div>
    );
};

export default Contact;
