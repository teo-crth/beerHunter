import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllBeers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/beers`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du biere type:', error);
        throw error;
    }
};