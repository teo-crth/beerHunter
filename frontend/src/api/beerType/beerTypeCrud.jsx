import axios from 'axios';

// Base URL de l'API Google Books
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllBeerTypes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/beer-type`);

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du biere type:', error);
        throw error;
    }
};