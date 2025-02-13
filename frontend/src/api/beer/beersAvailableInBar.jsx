import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllBeersAvailable = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/beersavailable`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bieres disponibles :', error);
        throw error;
    }
}

export const fetchBeersAvailableForOneBar = async (bar_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/beersavailable/bar/${bar_id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bieres disponibles :', error);
        throw error;
    }
}

export const createBeersAvailable = async (beersAvailable) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/beers-available`, beersAvailable, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création des bieres disponibles :', error);
        throw error;
    }
}