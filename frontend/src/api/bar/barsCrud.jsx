import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const createBars = async (bars) => {

    console.log('bars recu par axios du front avant envoi au back', bars);
    
    try {
        const response = await axios.post(`${BASE_URL}/api/bars`, bars, {
            headers: {
                'Content-Type': 'application/json',
            }
        });


        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création des bars :', error);
        throw error;
    }
}

export const fetchBarsByCityId = async (cityId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/bars/city/${cityId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bars par ville :', error);
        throw error;
    }
}

