import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchAllBeers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/beers`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bieres :', error);
        throw error;
    }
};

export const fetchOneBeer = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/beers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de la bière :', error);
        throw error;
    }
};

export const fetchBeersOftype = async (type) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/beers/type/${type}`);        
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bieres :', error);
        throw error;
    }
}