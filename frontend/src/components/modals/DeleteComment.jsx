import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import { deleteComment } from '../../api/user_comments/commentsCrud';
// import onDeleteSuccess from '../profil/CommentsCard';
import Button from '../ui/Button';

const DeleteComment = ({ text }) => {
    const { user, closeModal, openModal } = useContext(AppContext);
    // const commentId = parseInt(text);
    console.log('text', text);
    const { commentId, onDeleteSuccess } = text;
    console.log('commentId', commentId);
    
    
    
    const handleDeleteClick = async () => {
        try {
            await deleteComment(commentId)
            closeModal();
            openModal('successMessage', 'Commentaire supprimé avec succès');
            onDeleteSuccess(commentId);

        } catch (error) {
            console.error("Erreur Objet", error);
            closeModal();
            openModal('errorMessage', 'Erreur lors de la suppression du commentaire');
        };

    };

    return (
        <div className='flex flex-col items-center justify-center text-center gap-2 shadow-md bg-dark-black light-mode:bg-light text-light light-mode:text-dark rounded-lg p-5'>
            <p>Êtes-vous sûr de vouloir supprimer ce commentaire ?</p>
            <div className="container-buttons flex gap-3 justify-center items-center">
                <Button onClick={handleDeleteClick} className='bg-red-700' text="Supprimer" />
                <Button onClick={closeModal} type="button" className='bg-primary' text="Annuler" />
            </div>
        </div>
    );
};

export default DeleteComment;