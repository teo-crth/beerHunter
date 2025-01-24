import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import createOneUser from '../../api/user/createOneUser';
import { city } from '../../api/city/cityCrud';

const SignUp = () => {

    const { isModalOpen, setIsModalOpen, toggleModal } = useContext(AppContext);

    useEffect(() => {
        fetchAllCities()
            .then((data) => {
                console.log(data);
                const city = data;
                return city
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');

        createOneUser({ 
            name: values.name,
            email: values.email,
            birth_date: values.birth_date,
            city: values.city,
            password: values.password,
            confirmPassword: values.confirmPassword
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
            initialValues={{ name: '', email: '', birth_date: '', city: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(50, 'Ne doit pas dépasser 50 caractères')
                    .required('Champ obligatoire'),
                email: Yup.string().email('email invalide').required('Champ obligatoire'),
                birth_date: Yup.string()
                    .matches(
                        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
                        "Le format de la date doit être dd/mm/yyyy"
                    )
                    .test('age', 'Vous devez avoir plus de 18 ans', (value) => {
                        if (!value) return false;

                        const [day, month, year] = value.split('/').map((item) => parseInt(item, 10));
                        const birthDate = new Date(year, month - 1, day); // Mois est 0-indexé

                        const age = today.getFullYear() - birthDate.getFullYear();
                        const m = today.getMonth() - birthDate.getMonth();

                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                            return age - 1 >= 18; // Si l'anniversaire n'est pas encore passé cette année
                        }

                        return age >= 18;
                    })
                    .required('Champ obligatoire'),
                city: Yup.string().required('Champ obligatoire'),
                password: Yup.string().required('Champ obligatoire')
                    .min(12, 'Mot de passe trop court - 12 caractères minimum.')
                    .matches(/[a-zA-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule et une lettre minuscule.')
                    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre.')
                    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Le mot de passe doit contenir au moins un caractère spécial.'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Le mot de passe de confirmation doit correspondre au mot de passe.')
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
                    <label htmlFor="name">Nom</label>
                    <input
                        id="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className='text-error'>{formik.errors.name}</div>
                    ) : null}

                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='text-error'>{formik.errors.email}</div>
                    ) : null}

                    <label htmlFor="birth_date">Date de naissance</label>
                    <input id="birth_date" type="date" {...formik.getFieldProps('birth_date')} />
                    {formik.touched.birth_date && formik.errors.birth_date ? (
                        <div className='text-error'>{formik.errors.birth_date}</div>
                    ) : null}

                    <label htmlFor="city">Ville</label>
                    <select id="city" {...formik.getFieldProps('city')}>
                        <option value="">Choisir une ville</option>
                        {city.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>

                    <label htmlFor="password">Mot de passe</label>
                    <input id="password" type="password" {...formik.getFieldProps('password')} />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='text-error'>{formik.errors.password}</div>
                    ) : null}

                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input id="confirmPassword" type="password" {...formik.getFieldProps('confirmPassword')} />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className='text-error'>{formik.errors.confirmPassword}</div>
                    ) : null}

                    <button type="submit" onclick={handleSubmit}>Inscription</button>
                </form>
            )}
        </Formik>
    );
};

export default SignUp;