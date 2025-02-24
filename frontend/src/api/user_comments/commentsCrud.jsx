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

export const fetchCommentsOfOneBar = async (barId) => {
    try {
        // Requête avec axios
        const response = await axios.get(`${BASE_URL}/api/bars/${barId}/comments`);
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
    const token = localStorage.getItem('token').replace(/['"]+/g, '');
    let image_id;

    if (image) {
        try {
            const imageResponse = await createCommentImage(image, token);
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
        console.log('token in addComment', token);
        
        const response = await axios.post(`${BASE_URL}/api/comments`, 
            {
                text,
                rate,
                user_id,
                bar_id,
                comment_image_id: image_id
            },
            { 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    
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
    const token = localStorage.getItem('token').replace(/['"]+/g, '');
    try {
        // Requête avec axios
        const response = await axios.delete(`${BASE_URL}/api/comments/${commentId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
        throw error;
    }
}

