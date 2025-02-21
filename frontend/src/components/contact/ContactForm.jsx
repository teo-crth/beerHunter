import React from 'react';
import { ValidationError } from '@formspree/react';
import Button from '../ui/Button';

const ContactForm = ({handleSubmit, state}) => {
    return (
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
    );
};

export default ContactForm;