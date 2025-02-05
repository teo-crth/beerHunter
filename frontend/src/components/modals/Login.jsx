import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import { Formik } from 'formik';
import * as Yup from 'yup';

import connexionUser from '../../api/user/connexionUser';

const Login = () => {

    const { isModalOpen, setIsModalOpen, toggleModal } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');

        connexionUser({ 
            email: values.email,
            password: values.password
        })
            .then((data) => {
                console.log(data);
                toggleModal();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Formik
            initialValues={{ email: '', password: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email('Adresse email invalide').required('Champ obligatoire'),
                password: Yup.string().required('Champ obligatoire')
                    .min(12, 'Mot de passe trop court - 12 caractères minimum.')
                    .matches(/[a-zA-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule et une lettre minuscule.')
                    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre.')
                    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Le mot de passe doit contenir au moins un caractère spécial.'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="pl-2" id="email" type="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='text-error'>{formik.errors.email}</div>
                    ) : null}

                    <label htmlFor="password">Mot de passe</label>
                    <input className="pl-2" id="password" type="password" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='text-error'>{formik.errors.password}</div>
                    ) : null}

                    <button type="submit" onclick={handleSubmit}>Connexion</button>
                </form>
            )}
        </Formik>
    );
};

export default Login;