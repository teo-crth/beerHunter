import axios from 'axios';

// Base URL de l'API Google Books
const GOOGLE_KEY = import.meta.env.GOOGLE_KEY;
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchGoogleBars = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/places?latitude=${latitude}&longitude=${longitude}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching bars:', error);
        throw error;
    }
}

export const fetchBarMainImage = async (photo_reference) => {
    try {
        // Requête avec axios
        const response = await axios.get(`${BASE_URL}/api/place/photo?photo_reference=${photo_reference}`);
        // const response = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${GOOGLE_KEY}`);        
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image principale du bar:', error);
        throw error;
    }
}

export const fetchOneGoogleBar = async (place_id) => {
    try {
        // Requête avec axios
        // const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_KEY}`);
        const response = await axios.get(`${BASE_URL}/api/place/details?place_id=${place_id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du bar:', error);
        throw error;
    }
}