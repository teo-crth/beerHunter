import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../context/context';
import { Formik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import { changeOneUser } from '../../api/user/oneUserCrud';
import { fetchAllCities } from '../../api/city/cityCrud';

import Button from '../ui/Button';

const EditForm = () => {
    const {
        user,
        setUser,
        closeModal,
        openModal,
    } = useContext(AppContext);

    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (cities.length === 0) {
            fetchAllCities()
                .then(data => setCities(data))
                .catch(error => console.error(error));
        }
    }, [cities]);

    // Form submission handler
    const handleSubmit = (values) => {
        console.log('Submitting:', values);

        const id =  user.id;
        const email = values.email;
        const name = values.name;
        const theme = values.theme === "Sombre" ? "dark" : "light";
        const birth_date = values.birth_date;
        const city = values.city;
        const address = values.address;
        
        // Ajouter l'image de profil, si présente
        const formDataPicture = new FormData();
        if (values.profilePicture) {
            formDataPicture.append('profilePicture', values.profilePicture);
        }

        changeOneUser(id, email, name, theme, birth_date, city, address, formDataPicture)
            .then((data) => {
                console.log(data);
                setUser(data);
                closeModal();
                openModal({ type: 'successMessage', text: 'Profil modifié !' });
            })
            .catch((error) => {
                console.error(error);
                closeModal();
                openModal({ type: 'errorMessage', text: 'Un problème est survenu, veuillez rééssayer' });
            });
    };

    const formatDate = dayjs(user?.birth_date).format('DD/MM/YYYY');

    return (
        <div className="container-modal bg-gray-700/50 absolute flex justify-center items-center w-full h-full top-0 left-0">
            <Formik
                initialValues={{
                    name: user.name,
                    email: user.email,
                    birth_date: formatDate,
                    theme: user.theme === "dark" ? "Sombre" : "Clair",
                    city: user.city ? user.city.id : '',
                    address: user.address,
                    profilePicture: null,
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(50, 'Ne doit pas dépasser 50 caractères')
                        .required('Champ obligatoire'),
                    email: Yup.string().email('Email invalide').required('Champ obligatoire'),
                    address: Yup.string().max(255, 'Ne doit pas dépasser 255 caractères'),
                    birth_date: Yup.string()
                        .matches(
                            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
                            "Le format de la date doit être jj/mm/aaaa"
                        )
                        .test('age', 'Vous devez avoir plus de 18 ans', (value) => {
                            if (!value) return false;

                            const [day, month, year] = value.split('/').map((item) => parseInt(item, 10));
                            const birthDate = new Date(year, month - 1, day);
                            const age = new Date().getFullYear() - birthDate.getFullYear();
                            const m = new Date().getMonth() - birthDate.getMonth();
                            return age > 18 || (age === 18 && m >= 0);
                        })
                        .required('Champ obligatoire'),
                    city: Yup.string().required('Champ obligatoire'),
                    profilePicture: Yup.mixed()
                        .test('fileSize', 'Le fichier est trop grand, 5 MO maximum', value => value && value.size <= 5 * 1024 * 1024) // 5 MB limit
                })}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit} className='container-form w-120  z-50 flex flex-col items-center justify-center text-center gap-0.5 shadow-xs shadow-primary bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
                        <h3 className='font-text font-bold text-xl'>Modifier votre profil</h3>

                        {/* Champ image de profil */}
                        {formik.values.profilePicture && (
                            <img
                                src={URL.createObjectURL(formik.values.profilePicture)}
                                alt="Profile preview"
                                className="preview-img w-15 h-15 rounded-full border-2 border-primary"
                            />
                        )}

                        <label className="mt-[5px]" htmlFor="profilePicture">Image de profil</label>
                        <input
                            id="profilePicture"
                            name="profilePicture"
                            type="file"
                            className='border border-light light-mode:border-dark-black rounded-md'
                            onChange={(event) => {
                                formik.setFieldValue("profilePicture", event.currentTarget.files[0]);
                            }}
                        />
                        {formik.touched.profilePicture && formik.errors.profilePicture ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.profilePicture}</div>
                        ) : null}

                        <label className="mt-[5px]" htmlFor="name">Nom</label>
                        <input
                            id="name"
                            type="text"
                            className='border border-light light-mode:border-dark-black rounded-md'
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.name}</div>
                        ) : null}

                        <label className="mt-[5px]" htmlFor="email">Email</label>
                        <input id="email" type="email" className='border border-light light-mode:border-dark-black rounded-md' {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.email}</div>
                        ) : null}

                        <label className="mt-[5px]" htmlFor="birth_date">Date de naissance</label>
                        <input id="birth_date" type="text" className='border border-light light-mode:border-dark-black rounded-md' {...formik.getFieldProps('birth_date')} />
                        {formik.touched.birth_date && formik.errors.birth_date ? (
                            <div className='text-error text-xs text-red-400'>{formik.errors.birth_date}</div>
                        ) : null}

                        <label className="mt-[5px]" htmlFor="city">Ville</label>
                        <select
                            id="city"
                            className='border border-light light-mode:border-dark-black text-light light-mode:text-dark-black rounded-md'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            name="city"
                        >
                            <option className="bg-dark-black light-mode:bg-light font-text text-light light-mode:text-dark-black" value="">
                                Choisir une ville
                            </option>
                            {cities.map((city) => (
                                <option
                                    className="bg-dark-black light-mode:bg-light font-text text-light light-mode:text-dark-black"
                                    key={city.id}
                                    value={city.id}
                                >
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.city && formik.errors.city && (
                            <div className="text-error text-xs text-red-400">{formik.errors.city}</div>
                        )}

                        <label className="mt-[5px]" htmlFor="address">Adresse</label>
                        <input id="address" type="text" className='border border-light light-mode:border-dark-black rounded-md' {...formik.getFieldProps('address')} />

                        <label className="mt-[5px]" htmlFor="theme">Thème</label>
                        <select
                            id="theme"
                            className='border border-light light-mode:border-dark-black text-light light-mode:text-dark-black rounded-md'
                            value={formik.values.theme}
                            onChange={formik.handleChange}
                            name="theme"
                        >
                            <option className="bg-dark-black light-mode:bg-light font-text text-light light-mode:text-dark-black" value="">Choisir un thème</option>
                            <option className="bg-dark-black light-mode:bg-light font-text text-light light-mode:text-dark-black" value="dark">Sombre</option>
                            <option className="bg-dark-black light-mode:bg-light font-text text-light light-mode:text-dark-black" value="light">Clair</option>
                        </select>

                        <div className="container-buttons flex gap-3 justify-center items-center mt-[15px]">
                            <Button type='submit' className='bg-primary hover:bg-secondary' text="Modifier" />
                            <Button onClick={closeModal} type="button" className='bg-primary hover:bg-secondary' text="Annuler" />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default EditForm;
