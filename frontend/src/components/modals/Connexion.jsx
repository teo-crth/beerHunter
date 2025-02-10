import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context/context';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from '../ui/Button';
import { connexionUser } from '../../api/user/oneUserCrud';

const Connexion = () => {
    const { closeModal, openModal, setUser } = useContext(AppContext);

    const handleSignupClick = () => {
        closeModal();
        openModal('signup');
    };

        const handleSubmit = (values) => {
            const password = values.password.trim();
            const email = values.email;    
    
            connexionUser(email, password)
                .then((data) => {
                    setUser(data);
                    closeModal();
                    setIsLogin(true);
    
                })
                .catch((error) => {
                    console.error("Erreur Objet", error);
                    closeModal();
                    openModal('errorMessage', 'Erreur lors de la connexion, mot de passe ou email incorrect');
                });
        };

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Adresse email invalide').required('Champ obligatoire'),
                    password: Yup.string().required('Champ obligatoire')
                        .min(12, 'Mot de passe trop court - 12 caractères minimum.')
                        .matches(/[a-zA-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule et une lettre minuscule.')
                        .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre.')
                        .matches(/^\S*$/, 'Le mot de passe ne doit pas contenir d\'espaces.')
                        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Le mot de passe doit contenir au moins un caractère spécial.'),
                    })}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className='container-form w-120 flex flex-col items-center justify-center text-center gap-0.5 shadow-md bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
                        <h3 className='font-text font-bold text-xl'>Se connecter</h3>
                        <label className="mt-[5px]" htmlFor="email">Email</label>
                        <input id="email" type="text" className='border border-light light-mode:border-dark-black rounded-md' {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.email}</div>
                        ) : null}

                        <label className="mt-[5px]" htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" className='border border-light light-mode:border-dark-black rounded-md' {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.password}</div>
                        ) : null}


                        <div className="container-buttons flex gap-3 justify-center items-center mt-[15px]">
                            <Button type='submit' className='bg-primary hover:bg-secondary' text="Se connecter" />
                            <Button onClick={closeModal} type="button" className='bg-primary hover:bg-secondary' text="Annuler" />
                        </div>
                        <p className='font-text text-xs text-gray-200' onClick={handleSignupClick}>Vous n'avez pas de compte ? Inscrivez-vous</p>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Connexion;