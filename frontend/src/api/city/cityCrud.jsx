import axios from 'axios';

// Base URL de l'API Google Books
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Fonction pour rechercher des livres
export const fetchAllCities = async () => {
  try {
    const response = await axios.get(BASE_URL/api/cities);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};
