import axios from 'axios';

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

