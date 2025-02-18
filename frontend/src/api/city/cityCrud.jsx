import axios from 'axios';

// Base URL de l'API Google Books
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Fonction pour rechercher des livres
export const fetchAllCities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cities`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
