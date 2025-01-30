import axios from 'axios';
import { createCommentImage, fetchImagesOfOneComment } from './imagesCommentCrud';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchCommentsOfOneUser = async (userId) => {
    try {
        // Requête avec axios
        const response = await axios.get(`${BASE_URL}/api/users/${userId}/comments`);
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        throw error;
    }
}

export const fetchAllComments = async () => {
    try {
        // Requête avec axios
        const response = await axios.get(`${BASE_URL}/api/comments`);
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        throw error;
    }
}

export const fetchOneComment = async (commentId) => {
    try {
        // Requête avec axios
        const response = await axios.get(`${BASE_URL}/api/comments/${commentId}`);
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du commentaire:', error);
        throw error;
    }
}

export const addComment = async (text, rate, user_id, bar_id, image) => {

    if (image) {
        try {
            const imageResponse = await createCommentImage(commentId, image);
            image = imageResponse.image;
            image_id = imageResponse.id;
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'image:', error);
            throw error;
        }
    } else {
        image_id = null;
    }

    try {
        // Requête avec axios
        const response = await axios.post(`${BASE_URL}/api/comments`, {
            text,
            rate,
            user_id,
            bar_id,
            comment_image_id: image_id
        });
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
        throw error;
    }
}

export const editComment = async (commentId, text, rate) => {
 
    try {
        // Requête avec axios
        const response = await axios.put(`${BASE_URL}/api/comments/${commentId}`, {
            text,
            rate
        });
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la modification du commentaire:', error);
        throw error;
    }
}


export const deleteComment = async (commentId) => {
    try {
        // Requête avec axios
        const response = await axios.delete(`${BASE_URL}/api/comments/${commentId}`);
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
        throw error;
    }
}

