import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchFavoritesBar = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/users/${userId}/favorite-bars`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des bars favoris:', error);
        throw error;
    }
}

export const addFavoriteBar = async (userId, barId) => {
    const token = localStorage.getItem('token').replace(/['"]+/g, '');
    
    console.log('token', token);
    
    try {
        const response = await axios.post(`${BASE_URL}/api/favorite-bars`, 
            {  
                user_id: userId, 
                bar_id: barId 
            }, 
            { 
                headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du bar favori:', error);
        throw error;
    }
}

export const deleteFavoriteBar = async (userId, barId) => {
    const token = localStorage.getItem('token').replace(/['"]+/g, '');
    
    try {
        const response = await axios.delete(`${BASE_URL}/api/users/${userId}/favorite-bars/${barId}`, 
            { 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du bar favori:', error);
        throw error;
    }
}