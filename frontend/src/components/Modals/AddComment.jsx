import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../../context/context';
import { useParams } from 'react-router-dom';
import { addComment } from '../../api/user_comments/commentsCrud';
import Button from '../ui/Button';
import { cat } from 'fontawesome';

// addComment = async (text, rate, user_id, bar_id, image) 

const AddComment = () => {
    const { id } = useParams();
    const bar_id = id;

    const { user, closeModal, openModal } = useContext(AppContext);

    const handleSubmit = async (values) => {
        const rate = values.rate;
        const image = values.image;
        const message = values.message;

        try {
            await addComment(message, rate, user.id, bar_id, image);
            closeModal();
            openModal('successMessage', 'Votre commentaire a bien été ajouté.');
        } catch (error) {
            console.error(error);
            openModal('errorMessage', 'Une erreur est survenue, veuillez réessayer plus tard.');
        }
    }
    return (
        <Formik
        initialValues={{
            message: '',
            image: '',
            rate: '',

        }}
        validationSchema={Yup.object({
            message: Yup.string().required('Champ obligatoire')
            .min(2, 'Texte trop court - 2 caractères minimum.')
            .max(300, 'Texte trop long - 300 caractères maximum.')
            .matches(
                /^(?!.*\b(chier|pute|salope|connard|merde|enfoiré|bordel|couille|batard|filsdepute|nique)\b).*$/,
                'Mot interdit, Soyez respectueux.'
              ),
            rate: Yup.number().typeError('La valeur doit être un chiffre entre 0 et 5').required('Champ obligatoire')
            .min(0, 'Note trop basse - 0 minimum.')
            .max(5, 'Note trop haute - 5 maximum.'),
            image: Yup.mixed()
            .nullable()
            .test('fileSize', 'Le fichier est trop grand, 5 MO maximum', value => {                
                if (value && value.size) {
                    return value.size < 5242880; // 5 Mo
                  }
                  return true;
            })
            .optional(),
        })}
        onSubmit={handleSubmit}
    >
        {formik => (
            <form onSubmit={formik.handleSubmit} className='container-form w-120 flex flex-col items-center justify-center text-center gap-0.5 bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
                <h3 className='font-text font-bold text-xl'>Ajoutez un commentaire</h3>
                <label className="mt-[5px]" htmlFor="message">Message</label>
                <textarea id="message" className='border border-light light-mode:border-dark-black rounded-md pl-1 w-[80%]' {...formik.getFieldProps('message')} />
                <p className='w-[80%] text-right right-1 text-xs'>{formik.values.message?.length}/300</p>
                {formik.touched.message && formik.errors.message ? (
                    <div className='text-error text-xs text-red-400'>{formik.errors.message}</div>
                ) : null}

                <label className="mt-[5px]" htmlFor="rate">Note</label>
                <div className="container-rate flex items-center justify-center gap-1">
                    <input id="rate" type="text" className='border border-light light-mode:border-dark-black rounded-md pl-1 max-w-[25%] justify-center text-center' {...formik.getFieldProps('rate')} />
                    <p>/5</p>
                </div>
                {formik.touched.rate && formik.errors.rate ? (
                    <div className='text-error text-xs text-red-400'>{formik.errors.rate}</div>
                ) : null}

                <label className="mt-[5px]" htmlFor="image">Ajoutez une photo (Optionnel)</label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className='border border-light light-mode:border-dark-black rounded-md pl-1'
                    onChange={(event) => {
                        formik.setFieldValue("profil_picture", event.currentTarget.files[0]);
                    }}
                />
                {formik.touched.image && formik.errors.image ? (
                    <div className='text-error text-xs text-red-400'>{formik.errors.image}</div>
                ) : null}

                <div className="container-buttons flex gap-3 justify-center items-center mt-[15px]">
                    <Button type='submit' className='bg-primary hover:bg-secondary' text="Ajouter" />
                    <Button onClick={closeModal} type="button" className='bg-primary hover:bg-secondary' text="Annuler" />
                </div>
            </form>
        )}
    </Formik>
    );
};

export default AddComment;