import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchImagesOfOneComment = async (commentId) => {
    try {
        // Requête avec axios
        const response = await axios.get(`${BASE_URL}/api/comments/${commentId}/images`);
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des images:', error);
        throw error;
    }
}

export const createCommentImage = async (commentId, image) => {
    try {
        // Requête avec axios
        const response = await axios.post(`${BASE_URL}/api/comment-images`, {
            user_comment_id: commentId,
            image
        });
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'image:', error);
        throw error;
    }
}

export const deleteCommentImage = async (imageId) => {
    try {
        // Requête avec axios
        const response = await axios.delete(`${BASE_URL}/api/comment-images/${imageId}`);
    
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image:', error);
        throw error;
    }
}