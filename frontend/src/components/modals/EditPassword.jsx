import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context/context';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { changeOneUser } from '../../api/user/oneUserCrud';

import Button from '../ui/Button';

const EditForm = () => {
    const {
        isModalEditPasswordProfilOpen,
        setIsModalEditPasswordProfilOpen,
        user,
        setUser
    } = useContext(AppContext);

    const handleCancelClick = () => {
        setIsModalEditPasswordProfilOpen(!isModalEditPasswordProfilOpen);
    };

    // Form submission handler
    const handleSubmit = (values) => {
        console.log('Submitting:', values);

        const formData = new FormData();
        formData.append('id', user.id);
        formData.append('password', values.password);
        formData.append('confirmPassword', values.confirmPassword);

        changeOneUser(formData)
            .then((data) => {
                console.log(data);
                setUser(data);
                toggleModal();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container-modal bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0">
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object({
                    password: Yup.string().required('Champ obligatoire')
                        .min(12, 'Mot de passe trop court - 12 caractères minimum.')
                        .matches(/[a-zA-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule et une lettre minuscule.')
                        .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre.')
                        .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Le mot de passe doit contenir au moins un caractère spécial.'),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Le mot de passe de confirmation doit correspondre au mot de passe.')
                })}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className='container-form w-120 flex flex-col items-center justify-center text-center gap-0.5 shadow-md bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
                        <h3 className='font-text font-bold text-xl'>Modifier votre mot de passe</h3>
                        <label className="mt-[5px]" htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" className='border border-light light-mode:border-dark-black rounded-md' {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.password}</div>
                        ) : null}

                        <label className="mt-[5px]" htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input id="confirmPassword" type="password" className='border border-light light-mode:border-dark-black rounded-md' {...formik.getFieldProps('confirmPassword')} />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.confirmPassword}</div>
                        ) : null}

                        <div className="container-buttons flex gap-3 justify-center items-center mt-[15px]">
                            <Button type='submit' className='bg-primary hover:bg-secondary' text="Modifier" />
                            <Button onClick={handleCancelClick} className='bg-primary hover:bg-secondary' text="Annuler" />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default EditForm;
