import axios from 'axios';

// Base URL de l'API Google Books
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Fonction pour rechercher des livres
export const fetchOneUser = async (userId, setUser) => {
  try {
    // Requête avec axios
    const response = await axios.get(`${BASE_URL}/api/users/${userId}`);
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};

export const createOneUser = async (email, password, confirmPassword, name, cityId) => {
  try {
    // Requête avec axios
    const response = await axios.post(`${BASE_URL}/api/users`, {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      cityId: cityId,
      theme: 'dark'
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};

export const changeOneUser = async (id, email, name, theme, birth_date, cityId, address, profil_picture) => {

const formData = new FormData();

// Ajouter les autres champs dans le FormData
formData.append('email', email);
formData.append('name', name);
formData.append('theme', theme);
formData.append('birth_date', birth_date);
formData.append('cityId', cityId);
formData.append('address', address);

// Si un fichier de profil est présent, l'ajouter à formData
if (profil_picture) {
  formData.append('profil_picture', profil_picture);
}

  
  try {
    // Requête avec axios
    const response = await axios.put(`${BASE_URL}/api/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important de spécifier multipart/form-data
      }
    });
    console.log('response serveur', response);
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};

export const changeUserPassword = async (password, confirmPassword, id) => {
  try {
    // Requête avec axios
    const response = await axios.put(`${BASE_URL}/api/passwordUsers/${id}`, {
      password: password,
      confirmPassword: confirmPassword
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};

export const deleteOneUser = async (userId) => {
  try {
    // Requête avec axios
    const response = await axios.delete(`${BASE_URL}/api/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};

export const connexionUser = async (email, password) => {
  try {
    // Requête avec axios
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

